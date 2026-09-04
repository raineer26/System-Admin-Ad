from pathlib import Path
import os
import subprocess

src_dir = Path(r"C:\Users\Deign\Downloads\jobelle assign\original audio")
print(f"Directory: {src_dir}")

for f in src_dir.iterdir():
    if f.is_file() and f.suffix.lower() in [".m4a", ".mp3", ".wav"]:
        print(f" - {f.name} ({f.stat().st_size} bytes)")
