import urllib.request
import json
import subprocess
import os

EMOTION_PROFILES = [
    # DEIGN LAZARO
    {
        "key": "deign_dramatic",
        "name": "Deign Lazaro - Dramatic & Intriguing",
        "description": "Dramatic, mysterious, and authoritative documentary opening style for high-stakes intrigue.",
        "personality": "A captivating, dramatic documentary narrator with authoritative presence, thoughtful pacing, and deep resonance.",
        "sample_source": r"C:\Users\Deign\AppData\Roaming\sh.voicebox.app\profiles\e5feeb41-11c2-4a4b-a04d-519eed791e45\24ab82b3-133e-4ccf-a4cd-e904e7faaed8.wav",
        "ref_text": "Good morning, my name is Dean Lazaro and I work at Alpha Premiere",
        "scenes": ["Scene01"]
    },
    {
        "key": "deign_technical",
        "name": "Deign Lazaro - Authoritative & Technical",
        "description": "Focused, authoritative cybersecurity and network systems specialist.",
        "personality": "A focused, authoritative cybersecurity and network systems specialist. Direct, confident, and steady.",
        "sample_source": r"C:\Users\Deign\AppData\Roaming\sh.voicebox.app\profiles\e5feeb41-11c2-4a4b-a04d-519eed791e45\24ab82b3-133e-4ccf-a4cd-e904e7faaed8.wav",
        "ref_text": "Good morning, my name is Dean Lazaro and I work at Alpha Premiere",
        "scenes": ["Scene05"]
    },
    {
        "key": "deign_observational",
        "name": "Deign Lazaro - Observational & Dynamic",
        "description": "Grounded, conversational documentary guide with dynamic observational pacing.",
        "personality": "An engaging, observant documentary guide with dynamic energy and natural, conversational cadence.",
        "sample_source": r"C:\Users\Deign\AppData\Roaming\sh.voicebox.app\profiles\e5feeb41-11c2-4a4b-a04d-519eed791e45\24ab82b3-133e-4ccf-a4cd-e904e7faaed8.wav",
        "ref_text": "Good morning, my name is Dean Lazaro and I work at Alpha Premiere",
        "scenes": ["Scene09"]
    },
    {
        "key": "deign_tribute",
        "name": "Deign Lazaro - Poignant Tribute",
        "description": "Warm, sincere, and heartfelt documentary tribute to unsung heroes.",
        "personality": "A sincere, deeply respectful and heartfelt documentary narrator delivering a memorable, emotional tribute.",
        "sample_source": r"C:\Users\Deign\AppData\Roaming\sh.voicebox.app\profiles\e5feeb41-11c2-4a4b-a04d-519eed791e45\24ab82b3-133e-4ccf-a4cd-e904e7faaed8.wav",
        "ref_text": "Good morning, my name is Dean Lazaro and I work at Alpha Premiere",
        "scenes": ["Scene13"]
    },
    # FAIJAH NONOY
    {
        "key": "faijah_warm",
        "name": "Faijah Nonoy - Warm & Conversational",
        "description": "Warm, welcoming, and expressive narrator with genuine admiration.",
        "personality": "A warm, welcoming, and expressive narrator with genuine admiration and natural, relatable cadence.",
        "sample_source": r"C:\Users\Deign\AppData\Roaming\sh.voicebox.app\profiles\f1b69865-63a7-475e-b28f-77ac1d6daa8f\61a041c2-f1a1-439d-ab8e-7880c2f62cef.wav",
        "ref_text": "Good morning. My name is Fajah, and I work at Alpha Premiere",
        "scenes": ["Scene02"]
    },
    {
        "key": "faijah_professional",
        "name": "Faijah Nonoy - Crisp & Professional",
        "description": "Crisp, structured, and articulate IT identity management specialist.",
        "personality": "A crisp, methodical, and articulate IT professional explaining user provisioning and digital identity systems.",
        "sample_source": r"C:\Users\Deign\AppData\Roaming\sh.voicebox.app\profiles\f1b69865-63a7-475e-b28f-77ac1d6daa8f\61a041c2-f1a1-439d-ab8e-7880c2f62cef.wav",
        "ref_text": "Good morning. My name is Fajah, and I work at Alpha Premiere",
        "scenes": ["Scene06"]
    },
    {
        "key": "faijah_reflective",
        "name": "Faijah Nonoy - Philosophical & Reflective",
        "description": "Calm, contemplative, and resonant voice on invisible labor.",
        "personality": "A calm, contemplative, and resonant voice exploring the profound paradox of silent IT infrastructure.",
        "sample_source": r"C:\Users\Deign\AppData\Roaming\sh.voicebox.app\profiles\f1b69865-63a7-475e-b28f-77ac1d6daa8f\61a041c2-f1a1-439d-ab8e-7880c2f62cef.wav",
        "ref_text": "Good morning. My name is Fajah, and I work at Alpha Premiere",
        "scenes": ["Scene10"]
    },
    # SEAN VASQUEZ
    {
        "key": "sean_storyteller",
        "name": "Sean Vasquez - Reflective Storyteller",
        "description": "Reflective, nostalgic, and thoughtful storytelling on beginnings.",
        "personality": "A warm, reflective, and appreciative storyteller recounting unexpected beginnings and organic journeys.",
        "sample_source": r"C:\Users\Deign\AppData\Roaming\sh.voicebox.app\profiles\1b65c6db-7a55-4d5a-93d7-04aea732f828\a98fa93a-aeac-4f80-8bbf-e22d81f5e67b.wav",
        "ref_text": "Good morning, my name is Shanmak Vaskes and I work at Alpapa",
        "scenes": ["Scene03"]
    },
    {
        "key": "sean_pragmatic",
        "name": "Sean Vasquez - Grounded & Pragmatic",
        "description": "Dynamic, practical, and empathetic tech communicator addressing physical IT.",
        "personality": "A grounded, practical, and empathetic tech communicator addressing everyday physical equipment and real-world friction.",
        "sample_source": r"C:\Users\Deign\AppData\Roaming\sh.voicebox.app\profiles\1b65c6db-7a55-4d5a-93d7-04aea732f828\a98fa93a-aeac-4f80-8bbf-e22d81f5e67b.wav",
        "ref_text": "Good morning, my name is Shanmak Vaskes and I work at Alpapa",
        "scenes": ["Scene07"]
    },
    {
        "key": "sean_introspective",
        "name": "Sean Vasquez - Introspective & Sincere",
        "description": "Honest, introspective, and mature reflection on boundaries and burnout.",
        "personality": "An honest, mature, and introspective narrator reflecting on boundaries, work-life balance, and continuous growth.",
        "sample_source": r"C:\Users\Deign\AppData\Roaming\sh.voicebox.app\profiles\1b65c6db-7a55-4d5a-93d7-04aea732f828\a98fa93a-aeac-4f80-8bbf-e22d81f5e67b.wav",
        "ref_text": "Good morning, my name is Shanmak Vaskes and I work at Alpapa",
        "scenes": ["Scene11"]
    },
    # RAINEER ROSADO
    {
        "key": "raineer_urgent",
        "name": "Raineer Rosado - Urgent & Resilient",
        "description": "Intense, serious, and gripping storyteller conveying security incident response.",
        "personality": "An intense, serious, and gripping storyteller conveying high-stakes crisis response, cyber threats, and resilience.",
        "sample_source": r"C:\Users\Deign\AppData\Roaming\sh.voicebox.app\profiles\e9933da2-f948-4571-8116-3bd440874046\95f174c1-8999-409e-a6af-9d1c1285b20d.wav",
        "ref_text": "Good morning, my name is Reiner Siyaosado, and I work at Alp",
        "scenes": ["Scene04"]
    },
    {
        "key": "raineer_resourceful",
        "name": "Raineer Rosado - Wry & Resourceful",
        "description": "Relatable, candid, and intellectually curious troubleshooter celebrating learning.",
        "personality": "A candid, witty, and intellectually curious troubleshooter celebrating problem-solving, Googling errors, and hands-on learning.",
        "sample_source": r"C:\Users\Deign\AppData\Roaming\sh.voicebox.app\profiles\e9933da2-f948-4571-8116-3bd440874046\95f174c1-8999-409e-a6af-9d1c1285b20d.wav",
        "ref_text": "Good morning, my name is Reiner Siyaosado, and I work at Alp",
        "scenes": ["Scene08"]
    },
    {
        "key": "raineer_empowering",
        "name": "Raineer Rosado - Passionate & Empowering",
        "description": "Powerful, commanding speaker articulating the core purpose of technology stewardship.",
        "personality": "A powerful, rhythmic, and commanding speaker articulating the core purpose, mission, and dignity of technology stewardship.",
        "sample_source": r"C:\Users\Deign\AppData\Roaming\sh.voicebox.app\profiles\e9933da2-f948-4571-8116-3bd440874046\95f174c1-8999-409e-a6af-9d1c1285b20d.wav",
        "ref_text": "Good morning, my name is Reiner Siyaosado, and I work at Alp",
        "scenes": ["Scene12"]
    }
]

def main():
    res = urllib.request.urlopen("http://127.0.0.1:17493/profiles")
    existing = json.loads(res.read().decode())
    existing_by_name = {p["name"]: p for p in existing}

    created_map = {}

    for ep in EMOTION_PROFILES:
        name = ep["name"]
        if name in existing_by_name:
            pid = existing_by_name[name]["id"]
            print(f"[Found Existing] {name} -> {pid}")
            created_map[ep["key"]] = {
                "id": pid,
                "name": name,
                "scenes": ep["scenes"],
                "personality": ep["personality"]
            }
            continue

        payload = {
            "name": name,
            "description": ep["description"],
            "language": "en",
            "voice_type": "cloned",
            "default_engine": "qwen",
            "personality": ep["personality"]
        }
        req = urllib.request.Request(
            "http://127.0.0.1:17493/profiles",
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST"
        )
        with urllib.request.urlopen(req) as r:
            pdata = json.loads(r.read().decode())
            pid = pdata["id"]
            print(f"[Created Profile] {name} -> {pid}")

        # Attach sample
        cmd = [
            "curl.exe", "-s", "-X", "POST",
            f"http://127.0.0.1:17493/profiles/{pid}/samples",
            "-F", f"file=@{ep['sample_source']}",
            "-F", f"reference_text={ep['ref_text']}"
        ]
        subprocess.run(cmd, check=True)
        print(f"  Attached audio sample to {name}")

        created_map[ep["key"]] = {
            "id": pid,
            "name": name,
            "scenes": ep["scenes"],
            "personality": ep["personality"]
        }

    os.makedirs("public/audio/dubbing", exist_ok=True)
    with open("public/audio/dubbing/emotion_profiles.json", "w", encoding="utf-8") as f:
        json.dump(created_map, f, indent=2)

    print("\nSuccessfully registered all emotional voice profiles in Voicebox!")
    for k, v in created_map.items():
        print(f"  [{k}] {v['name']} ({v['id']}) -> Scenes: {', '.join(v['scenes'])}")

if __name__ == "__main__":
    main()
