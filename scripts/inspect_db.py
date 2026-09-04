import sqlite3

conn = sqlite3.connect(r'C:\Users\Deign\AppData\Roaming\sh.voicebox.app\voicebox.db')
cur = conn.cursor()
cur.execute("SELECT name, sql FROM sqlite_master WHERE type='table'")
for name, sql in cur.fetchall():
    print(f"TABLE: {name}\n{sql}\n")
