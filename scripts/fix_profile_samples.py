import sqlite3

conn = sqlite3.connect(r'C:\Users\Deign\AppData\Roaming\sh.voicebox.app\voicebox.db')
cur = conn.cursor()

# Get original reference texts
SPEAKER_TEXTS = {
    "Deign": "Good morning, my name is Dean Lazaro and I work at Alpha Premiere Group. Today is Thursday and the weather is clear. I am recording the sample so my voice can be cloned for internal reuse.",
    "Faijah": "Good morning. My name is Fajah, and I work at Alpha Premiere Group. Today is Thursday and the weather is clear. I'm recording this sample so my voice can be cloned for internal use. Our team handles IT administration, software development and proper team marketing.",
    "Sean": "Good morning, my name is Shanmak Vaskes and I work at Alpapamil Group. Today is Thursday and the weather is clear. I am recording the sample so my voice can be cloned for internal use.",
    "Raineer": "Good morning, my name is Reiner Siyaosado, and I work at AlphaPimer Group. Today is Thursday and the weather is clear. I am recording this sample so my voice can be cloned for internal use. Our team handles IT administration, software development, and property market"
}

cur.execute("SELECT ps.id, p.name, ps.reference_text FROM profile_samples ps JOIN profiles p ON ps.profile_id = p.id")
rows = cur.fetchall()

updated = 0
for sid, pname, current_ref in rows:
    for speaker, full_text in SPEAKER_TEXTS.items():
        if speaker in pname and "-" in pname: # only emotional profiles
            cur.execute("UPDATE profile_samples SET reference_text = ? WHERE id = ?", (full_text, sid))
            print(f"Updated {pname} -> full ref_text ({len(full_text)} chars)")
            updated += 1

conn.commit()
print(f"Total updated: {updated}")
