import urllib.request
import json
import uuid
from pathlib import Path

VOICESTUDIO_BASE = "http://127.0.0.1:3900"
TRIM_DIR = Path("public/audio/dubbing/trimmed_refs")

CONFIGS = [
    {
        "key": "deign",
        "name": "Deign Lazaro",
        "wav": TRIM_DIR / "ref_Deign_10s.wav",
        "ref_text": "Good morning, my name is Dean Lazaro and I work at Alpha Premiere Group. Today is Thursday and the weather is clear.",
        "personality": "Authoritative, engaging documentary narrator with steady cadence."
    },
    {
        "key": "faijah",
        "name": "Faijah Nonoy",
        "wav": TRIM_DIR / "ref_Faijah_10s.wav",
        "ref_text": "Good morning. My name is Fajah, and I work at Alpha Premiere Group. Today is Thursday and the weather is clear.",
        "personality": "Warm, conversational, and expressive documentary guide with articulate pacing."
    },
    {
        "key": "sean",
        "name": "Sean Vasquez",
        "wav": TRIM_DIR / "ref_Vasquez_10s.wav",
        "ref_text": "Good morning, my name is Shanmak Vaskes and I work at Alpapamil Group. Today is Thursday and the weather is clear.",
        "personality": "Thoughtful, grounded, and sincere storyteller with authentic delivery."
    },
    {
        "key": "raineer",
        "name": "Raineer Rosado",
        "wav": TRIM_DIR / "ref_Rain_10s.wav",
        "ref_text": "Good morning, my name is Reiner Siyaosado, and I work at AlphaPimer Group. Today is Thursday and the weather is clear.",
        "personality": "Dynamic, energetic, and resilient documentary narrator with sharp clarity."
    }
]

def post_multipart(url, fields, files):
    boundary = uuid.uuid4().hex
    body = bytearray()
    
    for name, value in fields.items():
        body.extend(f"--{boundary}\r\n".encode("utf-8"))
        body.extend(f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode("utf-8"))
        body.extend(f"{value}\r\n".encode("utf-8"))
        
    for name, (filename, content, content_type) in files.items():
        body.extend(f"--{boundary}\r\n".encode("utf-8"))
        body.extend(f'Content-Disposition: form-data; name="{name}"; filename="{filename}"\r\n'.encode("utf-8"))
        body.extend(f"Content-Type: {content_type}\r\n\r\n".encode("utf-8"))
        body.extend(content)
        body.extend(b"\r\n")
        
    body.extend(f"--{boundary}--\r\n".encode("utf-8"))
    
    req = urllib.request.Request(
        url,
        data=bytes(body),
        headers={
            "Content-Type": f"multipart/form-data; boundary={boundary}",
            "Content-Length": str(len(body))
        },
        method="POST"
    )
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))

# 1. Fetch existing and delete any old ones with same name
req = urllib.request.urlopen(f"{VOICESTUDIO_BASE}/profiles")
existing = json.loads(req.read().decode("utf-8"))
for p in existing:
    pname = p.get("name")
    pid = p.get("id")
    if pname in ["Deign Lazaro", "Faijah Nonoy", "Sean Vasquez", "Raineer Rosado"]:
        try:
            d_req = urllib.request.Request(f"{VOICESTUDIO_BASE}/profiles/{pid}", method="DELETE")
            urllib.request.urlopen(d_req, timeout=10)
            print(f"Deleted old profile {pname} ({pid})")
        except Exception as e:
            print(f"Failed to delete {pname}: {e}")

# 2. Re-create all 4 with clean 10s audio
new_profiles = {}
for cfg in CONFIGS:
    name = cfg["name"]
    key = cfg["key"]
    wav_path = cfg["wav"]
    ref_text = cfg["ref_text"]
    personality = cfg["personality"]
    
    with open(wav_path, "rb") as f:
        wav_bytes = f.read()
        
    fields = {
        "name": name,
        "ref_text": ref_text,
        "language": "English",
        "kind": "clone",
        "personality": personality
    }
    files = {
        "ref_audio": (wav_path.name, wav_bytes, "audio/wav")
    }
    
    resp = post_multipart(f"{VOICESTUDIO_BASE}/profiles", fields, files)
    pid = resp.get("id") or resp.get("profile_id")
    print(f"Created {name} -> ID: {pid}")
    new_profiles[key] = pid

manifest_path = Path("public/audio/dubbing/voicestudio_profiles.json")
with open(manifest_path, "w") as f:
    json.dump(new_profiles, f, indent=2)
print(f"\nSaved updated mapping to {manifest_path}")
