import sqlite3

conn = sqlite3.connect(r'C:\Users\Deign\AppData\Roaming\sh.voicebox.app\voicebox.db')
cur = conn.cursor()
cur.execute("SELECT id, text, duration, status, error, created_at FROM generations WHERE id = ?", ('59ffa03f-b6f5-42d7-a43f-e5957fe2437c',))
print(cur.fetchone())
