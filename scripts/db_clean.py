import sqlite3
import urllib.request
import json
import sys

db_path = r'C:\Users\Deign\AppData\Roaming\sh.voicebox.app\voicebox.db'
conn = sqlite3.connect(db_path)
cur = conn.cursor()

cur.execute("SELECT id, status, text, instruct, error FROM generations WHERE status = 'generating'")
rows = cur.fetchall()
print(f"Currently generating jobs ({len(rows)}):")
for r in rows:
    print(r)

for gid, status, text, instruct, error in rows:
    try:
        req = urllib.request.Request(f"http://127.0.0.1:17493/generate/{gid}/cancel", method="POST")
        urllib.request.urlopen(req, timeout=5)
        print(f"Sent cancel request for {gid}")
    except Exception as e:
        print(f"Error cancelling {gid}: {e}")

# Check last 5 finished
cur.execute("SELECT id, status, duration, error, text FROM generations ORDER BY created_at DESC LIMIT 5")
print("\nLast 5 generations:")
for r in cur.fetchall():
    print(r)
