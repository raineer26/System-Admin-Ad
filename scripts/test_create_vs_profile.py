import urllib.request
import json
import uuid
from pathlib import Path

VOICESTUDIO_BASE = "http://127.0.0.1:3900"

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

ref_wav = Path(r"C:\Users\Deign\Downloads\jobelle assign\original audio\tests\ref_Deign_en.wav")
ref_text = "Good morning, my name is Dean Lazaro and I work at Alpha Premiere Group. Today is Thursday and the weather is clear. I am recording the sample so my voice can be cloned for internal reuse."

print(f"Creating profile for Deign Lazaro using {ref_wav.name} via urllib...")

with open(ref_wav, "rb") as f:
    wav_bytes = f.read()

fields = {
    "name": "Deign Lazaro",
    "ref_text": ref_text,
    "language": "English",
    "kind": "clone",
    "personality": "Authoritative, engaging documentary narrator with steady cadence."
}
files = {
    "ref_audio": (ref_wav.name, wav_bytes, "audio/wav")
}

resp = post_multipart(f"{VOICESTUDIO_BASE}/profiles", fields, files)
print("Profile creation response:")
print(json.dumps(resp, indent=2))

profile_id = resp.get("id") or resp.get("profile_id")

# Now synthesize test audio
print(f"\nSynthesizing test speech with profile {profile_id}...")
speech_payload = {
    "model": "omnivoice",
    "input": "Every organization depends on technology. Websites. Networks. Accounts. Computers.",
    "voice": profile_id,
    "response_format": "wav"
}

req_s = urllib.request.Request(
    f"{VOICESTUDIO_BASE}/v1/audio/speech",
    data=json.dumps(speech_payload).encode("utf-8"),
    headers={"Content-Type": "application/json"},
    method="POST"
)

with urllib.request.urlopen(req_s, timeout=60) as res:
    audio_data = res.read()
    print(f"Success! Generated {len(audio_data)} bytes of audio.")

out_file = Path("public/audio/dubbing/test_deign_vs.wav")
with open(out_file, "wb") as f:
    f.write(audio_data)
print(f"Saved to {out_file}")
