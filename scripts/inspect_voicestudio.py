import urllib.request
import json

def get_json(url):
    req = urllib.request.urlopen(url)
    return json.loads(req.read().decode())

print("=== LOADED MODELS ===")
try:
    print(json.dumps(get_json("http://127.0.0.1:3900/model/loaded"), indent=2))
except Exception as e:
    print("Error:", e)

print("\n=== INSTALLED / AVAILABLE MODELS ===")
try:
    models = get_json("http://127.0.0.1:3900/models")
    print(f"Found {len(models)} models:")
    for m in models:
        # print installed ones or first few
        is_inst = m.get("is_installed", m.get("installed", False))
        name = m.get("name") or m.get("id") or m.get("repo_id")
        engine = m.get("engine") or m.get("type")
        print(f" - {name} | installed={is_inst} | engine={engine}")
except Exception as e:
    print("Error:", e)

print("\n=== EXISTING PROFILES / VOICES ===")
try:
    profiles = get_json("http://127.0.0.1:3900/profiles")
    print(f"Found {len(profiles)} profiles:")
    for p in profiles:
        pid = p.get("id") or p.get("profile_id")
        name = p.get("name")
        print(f" - {pid} | {name}")
except Exception as e:
    print("Error:", e)

print("\n=== OPENAI VOICES (/v1/audio/voices) ===")
try:
    voices = get_json("http://127.0.0.1:3900/v1/audio/voices")
    print(f"Found {len(voices)} voices:")
    for v in voices:
        print(f" - {v.get('voice_id') or v.get('id')} | {v.get('name')}")
except Exception as e:
    print("Error:", e)
