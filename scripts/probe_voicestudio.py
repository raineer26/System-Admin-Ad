import urllib.request
import urllib.error
import json

for port in [3900, 3902]:
    print(f"\n--- TESTING PORT {port} ---")
    for path in ["", "/", "/api", "/docs", "/openapi.json", "/health", "/status", "/models", "/voices", "/api/voices", "/api/models", "/api/health", "/api/status", "/v1/audio/speech"]:
        url = f"http://127.0.0.1:{port}{path}"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            res = urllib.request.urlopen(req, timeout=2)
            ct = res.headers.get("Content-Type", "")
            print(f"[{port}] {path:20s} -> HTTP {res.status} ({ct})")
        except urllib.error.HTTPError as e:
            print(f"[{port}] {path:20s} -> HTTP {e.code}")
        except Exception as e:
            # print(f"[{port}] {path:20s} -> Err: {e}")
            pass
