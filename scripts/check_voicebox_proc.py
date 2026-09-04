import subprocess

out = subprocess.check_output(['tasklist', '/v', '/fo', 'csv']).decode('utf-8', errors='ignore')
for line in out.splitlines():
    if 'voicebox' in line.lower() or 'python' in line.lower():
        print(line)
