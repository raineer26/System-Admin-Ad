import subprocess
import os

print("--- NETSTAT LISTENING PORTS ---")
out = subprocess.check_output(["netstat", "-ano"]).decode("utf-8", errors="ignore")
ports = set()
for line in out.splitlines():
    if "LISTENING" in line:
        parts = line.split()
        if len(parts) >= 5:
            addr = parts[1]
            pid = parts[4]
            port = addr.split(":")[-1]
            if port not in ports:
                ports.add(port)
                print(f"Port {port:6s} -> PID {pid}")

print("\n--- PROCESS LIST ---")
out2 = subprocess.check_output(["tasklist", "/v", "/fo", "csv"]).decode("utf-8", errors="ignore")
for line in out2.splitlines():
    low = line.lower()
    if any(k in low for k in ["voice", "studio", "python", "electron", "gradio", "uvicorn", "fastapi"]):
        print(line)
