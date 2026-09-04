import sqlite3

conn = sqlite3.connect(r'C:\Users\Deign\AppData\Roaming\sh.voicebox.app\voicebox.db')
cur = conn.cursor()
cur.execute("SELECT p.name, ps.profile_id, ps.audio_path, ps.reference_text FROM profile_samples ps JOIN profiles p ON ps.profile_id = p.id")
for row in cur.fetchall():
    print(row)
