import urllib.request
import json
import uuid
from pathlib import Path

VOICESTUDIO_BASE = "http://127.0.0.1:3900"
ref_wav = Path(r"C:\Users\Deign\AppData\Roaming\OmniVoice\voices\1b3e828b.wav")

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
    with urllib.request.urlopen(req, timeout=30) as res:
        return json.loads(res.read().decode("utf-8"))

# Check if Lorraine already exists
req = urllib.request.urlopen(f"{VOICESTUDIO_BASE}/profiles")
existing = json.loads(req.read().decode("utf-8"))
lorraine_pid = None
for p in existing:
    if "lorraine" in p.get("name", "").lower():
        lorraine_pid = p.get("id")
        print(f"Found existing Lorraine profile: {lorraine_pid} ({p['name']})")
        break

if not lorraine_pid:
    with open(ref_wav, "rb") as f:
        wav_bytes = f.read()

    fields = {
        "name": "Lorraine Isabel Cabigon",
        "ref_text": "Good morning. Please tap your ID card to record your time in. Your attendance has been logged successfully.",
        "language": "English",
        "kind": "clone",
        "personality": "Composed, articulate, and engaging creative director with confident cadence."
    }
    files = {
        "ref_audio": ("ref_lorraine.wav", wav_bytes, "audio/wav")
    }
    resp = post_multipart(f"{VOICESTUDIO_BASE}/profiles", fields, files)
    lorraine_pid = resp.get("id") or resp.get("profile_id")
    print(f"Created new Lorraine profile: {lorraine_pid} -> {resp}")
