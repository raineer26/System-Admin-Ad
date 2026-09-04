import urllib.request
import json

req = urllib.request.urlopen("http://127.0.0.1:3900/openapi.json")
schema = json.loads(req.read().decode())

print("Title:", schema.get("info", {}).get("title"))
print("Version:", schema.get("info", {}).get("version"))
print("\n--- ENDPOINTS ---")
for path, methods in sorted(schema.get("paths", {}).items()):
    for method, details in methods.items():
        summary = details.get("summary", "")
        print(f"{method.upper():6s} {path:35s} - {summary}")
