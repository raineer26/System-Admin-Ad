import urllib.request
import json
import time

VOICEBOX_BASE = "http://127.0.0.1:17493"
# Faijah Nonoy - Warm & Conversational
profile_id = "b34b760d-f1f0-48ba-a5bf-bebe595641c2"
text = "Jansen is a webmaster and graphic designer at BSOP."

payload = {
    "profile_id": profile_id,
    "text": text,
    "instruct": None,
    "engine": "qwen",
    "model_size": "1.7B",
    "normalize": True,
    "crossfade_ms": 50
}

req = urllib.request.Request(
    f"{VOICEBOX_BASE}/generate",
    data=json.dumps(payload).encode("utf-8"),
    headers={"Content-Type": "application/json"},
    method="POST"
)

with urllib.request.urlopen(req, timeout=10) as res:
    data = json.loads(res.read().decode())
    gen_id = data["id"]
    print(f"Submitted test job: {gen_id}")

for i in range(30):
    time.sleep(2)
    req = urllib.request.urlopen(f"{VOICEBOX_BASE}/history/{gen_id}", timeout=5)
    hist = json.loads(req.read().decode())
    st = hist.get("status")
    dur = hist.get("duration")
    print(f"Poll {i+1}: status={st}, duration={dur}")
    if st == "completed":
        print(f"SUCCESS! Completed in {(i+1)*2}s with duration {dur}s")
        break
    elif st == "failed":
        print(f"FAILED: {hist.get('error')}")
        break
