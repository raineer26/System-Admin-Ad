import sqlite3

conn = sqlite3.connect(r'C:\Users\Deign\AppData\Roaming\sh.voicebox.app\voicebox.db')
cur = conn.cursor()
cur.execute("SELECT id, profile_id, text, instruct, duration, status FROM generations WHERE duration > 1.0 ORDER BY created_at DESC LIMIT 10")
for row in cur.fetchall():
    print(row)
