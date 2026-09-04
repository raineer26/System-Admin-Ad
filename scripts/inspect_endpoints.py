import urllib.request
import json

req = urllib.request.urlopen("http://127.0.0.1:3900/openapi.json")
schema = json.loads(req.read().decode())

def inspect_endpoint(path, method="post"):
    p = schema.get("paths", {}).get(path, {}).get(method)
    if not p:
        print(f"Not found: {method.upper()} {path}")
        return
    print(f"\n==================== {method.upper()} {path} ====================")
    print("Summary:", p.get("summary"))
    print("Description:", p.get("description"))
    rb = p.get("requestBody", {})
    content = rb.get("content", {})
    for ctype, info in content.items():
        print(f"Content-Type: {ctype}")
        schema_ref = info.get("schema", {})
        print("Schema:", json.dumps(schema_ref, indent=2))

inspect_endpoint("/profiles", "post")
inspect_endpoint("/v1/audio/speech", "post")
inspect_endpoint("/v1/audio/voices", "get")
inspect_endpoint("/profiles", "get")
inspect_endpoint("/transcribe", "post")
