import os
from pathlib import Path

base = Path(r'C:\Users\Deign\AppData\Roaming\sh.voicebox.app')
p = base / r'profiles\b34b760d-f1f0-48ba-a5bf-bebe595641c2\4fda25c4-537b-47af-9796-18bab5db73dc.wav'
print(f"Path: {p}")
print(f"Exists: {p.exists()}")
if p.exists():
    print(f"Size: {p.stat().st_size}")
