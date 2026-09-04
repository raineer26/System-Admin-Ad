import urllib.request
import json
import time

url = "http://127.0.0.1:3900/v1/audio/speech"
payload = {
    "model": "omnivoice",
    "input": "Every organization depends on technology. Websites. Networks. Accounts. Computers.",
    "voice": "demo0001",
    "response_format": "wav"
}

print("Submitting speech request to VoiceStudio...")
start = time.time()
req = urllib.request.Request(
    url,
    data=json.dumps(payload).encode("utf-8"),
    headers={"Content-Type": "application/json"},
    method="POST"
)

with urllib.request.urlopen(req, timeout=60) as res:
    audio_data = res.read()
    elapsed = time.time() - start
    print(f"Success! Received {len(audio_data)} bytes in {elapsed:.2f}s")

with open("public/audio/dubbing/test_voicestudio_demo.wav", "wb") as f:
    f.write(audio_data)
print("Saved to public/audio/dubbing/test_voicestudio_demo.wav")
