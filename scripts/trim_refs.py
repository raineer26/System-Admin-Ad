import wave
import urllib.request
import json
import uuid
from pathlib import Path

VOICESTUDIO_BASE = "http://127.0.0.1:3900"
SRC_AUDIO = Path(r"C:\Users\Deign\Downloads\jobelle assign\original audio\tests")
TRIM_DIR = Path("public/audio/dubbing/trimmed_refs")
TRIM_DIR.mkdir(parents=True, exist_ok=True)

def trim_wav(in_path, out_path, max_sec=10.0):
    with wave.open(str(in_path), "rb") as w:
        params = w.getparams()
        rate = w.getframerate()
        max_frames = int(max_sec * rate)
        nframes = min(w.getnframes(), max_frames)
        frames = w.readframes(nframes)
        
    with wave.open(str(out_path), "wb") as out_w:
        out_w.setparams(params)
        out_w.writeframes(frames)
    dur = nframes / float(rate)
    print(f"Trimmed {in_path.name} -> {out_path.name} ({dur:.2f}s)")
    return out_path

# Trim Faijah to 10s: "Good morning. My name is Fajah, and I work at Alpha Premiere Group. Today is Thursday and the weather is clear."
faijah_wav = trim_wav(SRC_AUDIO / "ref_Faijah_en.wav", TRIM_DIR / "ref_Faijah_10s.wav", 10.0)
faijah_text = "Good morning. My name is Fajah, and I work at Alpha Premiere Group. Today is Thursday and the weather is clear."

# Trim Rain to 10s: "Good morning, my name is Reiner Siyaosado, and I work at AlphaPimer Group. Today is Thursday and the weather is clear."
rain_wav = trim_wav(SRC_AUDIO / "ref_Rain_en.wav", TRIM_DIR / "ref_Rain_10s.wav", 10.0)
rain_text = "Good morning, my name is Reiner Siyaosado, and I work at AlphaPimer Group. Today is Thursday and the weather is clear."

# Vasquez is 15s, let's also trim to 10s for super crisp alignment
vasquez_wav = trim_wav(SRC_AUDIO / "ref_Vasquez_en.wav", TRIM_DIR / "ref_Vasquez_10s.wav", 10.0)
vasquez_text = "Good morning, my name is Shanmak Vaskes and I work at Alpapamil Group. Today is Thursday and the weather is clear."

# Deign is 15s, let's also trim to 10s
deign_wav = trim_wav(SRC_AUDIO / "ref_Deign_en.wav", TRIM_DIR / "ref_Deign_10s.wav", 10.0)
deign_text = "Good morning, my name is Dean Lazaro and I work at Alpha Premiere Group. Today is Thursday and the weather is clear."

print("\nAll 4 reference samples trimmed to 10.0s sentences.")
