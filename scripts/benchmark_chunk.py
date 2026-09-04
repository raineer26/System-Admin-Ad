import urllib.request
import json
import time

VOICEBOX_BASE = "http://127.0.0.1:17493"
# Faijah Nonoy - Warm & Conversational
profile_id = "b34b760d-f1f0-48ba-a5bf-bebe595641c2"
text = "Jansen is a webmaster and graphic designer at BSOP. Although system administrator is not his official job title, many of his responsibilities are closely connected to system administration and IT support."

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
    print(f"Submitted 28-word job: {gen_id}")

start_time = time.time()
for i in range(150): # up to 300s (5 mins)
    time.sleep(2)
    elapsed = int(time.time() - start_time)
    req = urllib.request.urlopen(f"{VOICEBOX_BASE}/history/{gen_id}", timeout=5)
    hist = json.loads(req.read().decode())
    st = hist.get("status")
    dur = hist.get("duration")
    if i % 10 == 0:
        print(f"[{elapsed}s] status={st}, duration={dur}")
    if st == "completed":
        print(f"\nSUCCESS! Completed in {elapsed}s with duration {dur:.2f}s!")
        break
    elif st == "failed":
        print(f"\nFAILED in {elapsed}s: {hist.get('error')}")
        break
