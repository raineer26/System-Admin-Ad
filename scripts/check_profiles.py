import urllib.request
import json

res = urllib.request.urlopen('http://127.0.0.1:17493/profiles')
profiles = json.loads(res.read().decode())
for p in profiles:
    print(f"{p['id']} | samples={p['sample_count']} | type={p['voice_type']} | {p['name']}")
