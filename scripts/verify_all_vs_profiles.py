import urllib.request
import json
import time
import wave
from pathlib import Path

VOICESTUDIO_BASE = "http://127.0.0.1:3900"

with open("public/audio/dubbing/voicestudio_profiles.json", "r") as f:
    PROFILES = json.load(f)

TEST_LINES = {
    "deign": ("Deign Lazaro", "Every organization depends on technology. Websites. Networks. Accounts. Computers."),
    "faijah": ("Faijah Nonoy", "Jansen is a webmaster and graphic designer at BSOP."),
    "sean": ("Sean Vasquez", "His journey into technology management wasn't something he originally planned."),
    "raineer": ("Raineer Rosado", "One of his main responsibilities is maintaining the organization's websites.")
}

OUT_DIR = Path("public/audio/dubbing/test_samples")
OUT_DIR.mkdir(parents=True, exist_ok=True)

print("=== Testing All 4 Cloned Voice Profiles in VoiceStudio ===")
for key, pid in PROFILES.items():
    name, text = TEST_LINES[key]
    print(f"\n--- Testing {name} ({pid}) ---")
    start = time.time()
    
    payload = {
        "model": "omnivoice",
        "input": text,
        "voice": pid,
        "response_format": "wav"
    }
    req = urllib.request.Request(
        f"{VOICESTUDIO_BASE}/v1/audio/speech",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    with urllib.request.urlopen(req, timeout=60) as res:
        audio_data = res.read()
    elapsed = time.time() - start
    
    out_wav = OUT_DIR / f"test_{key}.wav"
    with open(out_wav, "wb") as f:
        f.write(audio_data)
        
    with wave.open(str(out_wav), "rb") as w:
        dur = w.getnframes() / float(w.getframerate())
        
    print(f" -> SUCCESS in {elapsed:.2f}s! Generated {dur:.2f}s audio ({len(audio_data)} bytes)")
