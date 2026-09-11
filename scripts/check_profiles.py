import urllib.request
import json

res = urllib.request.urlopen('http://127.0.0.1:3900/profiles')
profiles = json.loads(res.read().decode())
print(f"Total profiles: {len(profiles)}")
for p in profiles:
    print(f"{p['id']} | {p['name']} | ref: {p.get('ref_audio_path')}")
