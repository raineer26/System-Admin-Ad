import urllib.request
import json
import uuid
from pathlib import Path

VOICESTUDIO_BASE = "http://127.0.0.1:3900"
SRC_AUDIO = Path(r"C:\Users\Deign\Downloads\jobelle assign\original audio\tests")

PROFILES_CONFIG = [
    {
        "key": "deign",
        "name": "Deign Lazaro",
        "wav": SRC_AUDIO / "ref_Deign_en.wav",
        "ref_text": "Good morning, my name is Dean Lazaro and I work at Alpha Premiere Group. Today is Thursday and the weather is clear. I am recording the sample so my voice can be cloned for internal reuse.",
        "personality": "Authoritative, captivating documentary narrator with steady cadence and deep resonance.",
    },
    {
        "key": "faijah",
        "name": "Faijah Nonoy",
        "wav": SRC_AUDIO / "ref_Faijah_en.wav",
        "ref_text": "Good morning. My name is Fajah, and I work at Alpha Premiere Group. Today is Thursday and the weather is clear. I'm recording this sample so my voice can be cloned for internal use. Our team handles IT administration, software development and proper team marketing.",
        "personality": "Warm, conversational, and expressive documentary guide with articulate pacing.",
    },
    {
        "key": "sean",
        "name": "Sean Vasquez",
        "wav": SRC_AUDIO / "ref_Vasquez_en.wav",
        "ref_text": "Good morning, my name is Shanmak Vaskes and I work at Alpapamil Group. Today is Thursday and the weather is clear. I am recording the sample so my voice can be cloned for internal use.",
        "personality": "Thoughtful, grounded, and sincere storyteller with authentic delivery.",
    },
    {
        "key": "raineer",
        "name": "Raineer Rosado",
        "wav": SRC_AUDIO / "ref_Rain_en.wav",
        "ref_text": "Good morning, my name is Reiner Siyaosado, and I work at AlphaPimer Group. Today is Thursday and the weather is clear. I am recording this sample so my voice can be cloned for internal use. Our team handles IT administration, software development, and property market",
        "personality": "Dynamic, energetic, and resilient documentary narrator with sharp clarity.",
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

def get_existing_profiles():
    req = urllib.request.urlopen(f"{VOICESTUDIO_BASE}/profiles")
    return json.loads(req.read().decode("utf-8"))

def main():
    print("=== Checking Existing VoiceStudio Profiles ===")
    existing = get_existing_profiles()
    existing_map = {p["name"]: p["id"] for p in existing}
    for name, pid in existing_map.items():
        print(f" - {name}: {pid}")
        
    profile_ids = {}
    
    for cfg in PROFILES_CONFIG:
        name = cfg["name"]
        key = cfg["key"]
        wav_path = cfg["wav"]
        ref_text = cfg["ref_text"]
        personality = cfg["personality"]
        
        if name in existing_map:
            pid = existing_map[name]
            print(f"[Exists] {name} -> ID: {pid}")
            profile_ids[key] = pid
            continue
            
        print(f"[Creating] {name} from {wav_path.name}...")
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
        print(f" -> Created successfully! ID: {pid}")
        profile_ids[key] = pid

    out_json = Path("public/audio/dubbing/voicestudio_profiles.json")
    out_json.parent.mkdir(parents=True, exist_ok=True)
    with open(out_json, "w") as f:
        json.dump(profile_ids, f, indent=2)
    print(f"\nSaved profile IDs mapping to {out_json}")

if __name__ == "__main__":
    main()
