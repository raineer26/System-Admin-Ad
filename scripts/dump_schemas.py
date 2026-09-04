import urllib.request
import json

req = urllib.request.urlopen("http://127.0.0.1:3900/openapi.json")
schema = json.loads(req.read().decode())
components = schema.get("components", {}).get("schemas", {})

print("=== Body_create_profile_profiles_post ===")
print(json.dumps(components.get("Body_create_profile_profiles_post", {}), indent=2))

print("\n=== SpeechRequest ===")
print(json.dumps(components.get("SpeechRequest", {}), indent=2))

print("\n=== GET /profiles response schema ===")
print(json.dumps(components.get("Profile", components.get("ProfileResponse", {})), indent=2))
