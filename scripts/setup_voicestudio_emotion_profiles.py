import urllib.request
import json
import uuid
from pathlib import Path

VOICESTUDIO_BASE = "http://127.0.0.1:3900"
TRIM_DIR = Path("public/audio/dubbing/trimmed_refs")

EMOTION_PROFILES = [
    # DEIGN LAZARO (4 scenes)
    {
        "key": "deign_dramatic",
        "name": "Deign Lazaro - Dramatic & Intriguing",
        "speaker": "Deign Lazaro",
        "emotion": "Dramatic & Intriguing",
        "scene": "Scene01",
        "wav": TRIM_DIR / "ref_Deign_10s.wav",
        "ref_text": "Good morning, my name is Dean Lazaro and I work at Alpha Premiere Group. Today is Thursday and the weather is clear.",
        "personality": "Cinematic, mysterious, and authoritative documentary opening tone building dramatic curiosity.",
        "speed": 0.98,
        "guidance_scale": 2.2
    },
    {
        "key": "deign_technical",
        "name": "Deign Lazaro - Authoritative & Technical",
        "speaker": "Deign Lazaro",
        "emotion": "Authoritative & Technical",
        "scene": "Scene05",
        "wav": TRIM_DIR / "ref_Deign_10s.wav",
        "ref_text": "Good morning, my name is Dean Lazaro and I work at Alpha Premiere Group. Today is Thursday and the weather is clear.",
        "personality": "Focused, authoritative cybersecurity and campus network systems narrator.",
        "speed": 1.0,
        "guidance_scale": 2.0
    },
    {
        "key": "deign_observational",
        "name": "Deign Lazaro - Observational & Dynamic",
        "speaker": "Deign Lazaro",
        "emotion": "Observational & Dynamic",
        "scene": "Scene09",
        "wav": TRIM_DIR / "ref_Deign_10s.wav",
        "ref_text": "Good morning, my name is Dean Lazaro and I work at Alpha Premiere Group. Today is Thursday and the weather is clear.",
        "personality": "Grounded, observant documentary guide with dynamic observational pacing.",
        "speed": 1.02,
        "guidance_scale": 2.0
    },
    {
        "key": "deign_tribute",
        "name": "Deign Lazaro - Poignant Tribute",
        "speaker": "Deign Lazaro",
        "emotion": "Poignant Tribute",
        "scene": "Scene13",
        "wav": TRIM_DIR / "ref_Deign_10s.wav",
        "ref_text": "Good morning, my name is Dean Lazaro and I work at Alpha Premiere Group. Today is Thursday and the weather is clear.",
        "personality": "Heartfelt, deeply respectful and poignant documentary tribute to unsung heroes.",
        "speed": 0.95,
        "guidance_scale": 2.2
    },

    # FAIJAH NONOY (3 scenes)
    {
        "key": "faijah_warm",
        "name": "Faijah Nonoy - Warm & Conversational",
        "speaker": "Faijah Nonoy",
        "emotion": "Warm & Conversational",
        "scene": "Scene02",
        "wav": TRIM_DIR / "ref_Faijah_10s.wav",
        "ref_text": "Good morning. My name is Fajah, and I work at Alpha Premiere Group. Today is Thursday and the weather is clear.",
        "personality": "Warm, conversational, and respectful documentary guide introducing Jansen's journey.",
        "speed": 1.0,
        "guidance_scale": 2.0
    },
    {
        "key": "faijah_professional",
        "name": "Faijah Nonoy - Crisp & Professional",
        "speaker": "Faijah Nonoy",
        "emotion": "Crisp & Professional",
        "scene": "Scene06",
        "wav": TRIM_DIR / "ref_Faijah_10s.wav",
        "ref_text": "Good morning. My name is Fajah, and I work at Alpha Premiere Group. Today is Thursday and the weather is clear.",
        "personality": "Organized, crisp, and articulate tone detailing institutional user access management.",
        "speed": 1.02,
        "guidance_scale": 2.0
    },
    {
        "key": "faijah_reflective",
        "name": "Faijah Nonoy - Philosophical & Reflective",
        "speaker": "Faijah Nonoy",
        "emotion": "Philosophical & Reflective",
        "scene": "Scene10",
        "wav": TRIM_DIR / "ref_Faijah_10s.wav",
        "ref_text": "Good morning. My name is Fajah, and I work at Alpha Premiere Group. Today is Thursday and the weather is clear.",
        "personality": "Philosophical, calm, and resonant voiceover exploring the invisible nature of sysadmin work.",
        "speed": 0.96,
        "guidance_scale": 2.2
    },

    # SEAN VASQUEZ (3 scenes)
    {
        "key": "sean_storyteller",
        "name": "Sean Vasquez - Reflective Storyteller",
        "speaker": "Sean Vasquez",
        "emotion": "Reflective Storyteller",
        "scene": "Scene03",
        "wav": TRIM_DIR / "ref_Vasquez_10s.wav",
        "ref_text": "Good morning, my name is Shanmak Vaskes and I work at Alpapamil Group. Today is Thursday and the weather is clear.",
        "personality": "Engaging, reflective, and appreciative storytelling on unexpected beginnings.",
        "speed": 0.98,
        "guidance_scale": 2.0
    },
    {
        "key": "sean_pragmatic",
        "name": "Sean Vasquez - Grounded & Pragmatic",
        "speaker": "Sean Vasquez",
        "emotion": "Grounded & Pragmatic",
        "scene": "Scene07",
        "wav": TRIM_DIR / "ref_Vasquez_10s.wav",
        "ref_text": "Good morning, my name is Shanmak Vaskes and I work at Alpapamil Group. Today is Thursday and the weather is clear.",
        "personality": "Pragmatic, grounded, and dynamic voiceover emphasizing physical hardware realities.",
        "speed": 1.0,
        "guidance_scale": 2.0
    },
    {
        "key": "sean_introspective",
        "name": "Sean Vasquez - Introspective & Sincere",
        "speaker": "Sean Vasquez",
        "emotion": "Introspective & Sincere",
        "scene": "Scene11",
        "wav": TRIM_DIR / "ref_Vasquez_10s.wav",
        "ref_text": "Good morning, my name is Shanmak Vaskes and I work at Alpapamil Group. Today is Thursday and the weather is clear.",
        "personality": "Introspective, mature, and sincere reflection on boundaries and work-life balance.",
        "speed": 0.96,
        "guidance_scale": 2.2
    },

    # RAINEER ROSADO (3 scenes)
    {
        "key": "raineer_urgent",
        "name": "Raineer Rosado - Urgent & Resilient",
        "speaker": "Raineer Rosado",
        "emotion": "Urgent & Resilient",
        "scene": "Scene04",
        "wav": TRIM_DIR / "ref_Rain_10s.wav",
        "ref_text": "Good morning, my name is Reiner Siyaosado, and I work at AlphaPimer Group. Today is Thursday and the weather is clear.",
        "personality": "Serious, urgent, and resilient delivery recounting the website security breach.",
        "speed": 1.02,
        "guidance_scale": 2.2
    },
    {
        "key": "raineer_resourceful",
        "name": "Raineer Rosado - Wry & Resourceful",
        "speaker": "Raineer Rosado",
        "emotion": "Wry & Resourceful",
        "scene": "Scene08",
        "wav": TRIM_DIR / "ref_Rain_10s.wav",
        "ref_text": "Good morning, my name is Reiner Siyaosado, and I work at AlphaPimer Group. Today is Thursday and the weather is clear.",
        "personality": "Relatable, slightly wry, and resourceful celebrating problem-solving and curiosity.",
        "speed": 1.0,
        "guidance_scale": 2.0
    },
    {
        "key": "raineer_empowering",
        "name": "Raineer Rosado - Passionate & Empowering",
        "speaker": "Raineer Rosado",
        "emotion": "Passionate & Empowering",
        "scene": "Scene12",
        "wav": TRIM_DIR / "ref_Rain_10s.wav",
        "ref_text": "Good morning, my name is Reiner Siyaosado, and I work at AlphaPimer Group. Today is Thursday and the weather is clear.",
        "personality": "Passionate, empowering, and commanding delivery summarizing the mission of system administration.",
        "speed": 1.0,
        "guidance_scale": 2.2
    }
]

def post_multipart(url, fields, files):
    boundary = uuid.uuid4().hex
    body = bytearray()
    for name, value in fields.items():
        body.extend(f"--{boundary}\r\n".encode("utf-8"))
        body.extend(f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode("utf-8"))
        body.extend(f"{value}\r\n".encode("utf-8"))
        
    for name, (filename, content, content_type) in files.items():
        body.extend(f"--{boundary}\r\n".encode("utf-8"))
        body.extend(f'Content-Disposition: form-data; name="{name}"; filename="{filename}"\r\n'.encode("utf-8"))
        body.extend(f"Content-Type: {content_type}\r\n\r\n".encode("utf-8"))
        body.extend(content)
        body.extend(b"\r\n")
        
    body.extend(f"--{boundary}--\r\n".encode("utf-8"))
    
    req = urllib.request.Request(
        url,
        data=bytes(body),
        headers={
            "Content-Type": f"multipart/form-data; boundary={boundary}",
            "Content-Length": str(len(body))
        },
        method="POST"
    )
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))

def main():
    print("=== Registering 13 Emotional Profiles in VoiceStudio ===")
    req = urllib.request.urlopen(f"{VOICESTUDIO_BASE}/profiles")
    existing = json.loads(req.read().decode("utf-8"))
    existing_map = {p["name"]: p["id"] for p in existing}

    profile_map = {}

    for pcfg in EMOTION_PROFILES:
        pname = pcfg["name"]
        key = pcfg["key"]
        wav_path = pcfg["wav"]
        ref_text = pcfg["ref_text"]
        personality = pcfg["personality"]
        
        if pname in existing_map:
            pid = existing_map[pname]
            print(f"[Cached] {pname} -> ID: {pid}")
            profile_map[key] = {
                "id": pid,
                "name": pname,
                "speaker": pcfg["speaker"],
                "emotion": pcfg["emotion"],
                "scene": pcfg["scene"],
                "speed": pcfg["speed"],
                "guidance_scale": pcfg["guidance_scale"]
            }
            continue

        print(f"[Creating] {pname}...")
        with open(wav_path, "rb") as f:
            wav_bytes = f.read()

        fields = {
            "name": pname,
            "ref_text": ref_text,
            "language": "English",
            "kind": "clone",
            "personality": personality
        }
        files = {
            "ref_audio": (wav_path.name, wav_bytes, "audio/wav")
        }

        resp = post_multipart(f"{VOICESTUDIO_BASE}/profiles", fields, files)
        pid = resp.get("id") or resp.get("profile_id")
        print(f" -> Created ID: {pid}")
        profile_map[key] = {
            "id": pid,
            "name": pname,
            "speaker": pcfg["speaker"],
            "emotion": pcfg["emotion"],
            "scene": pcfg["scene"],
            "speed": pcfg["speed"],
            "guidance_scale": pcfg["guidance_scale"]
        }

    out_file = Path("public/audio/dubbing/voicestudio_emotion_profiles.json")
    with open(out_file, "w") as f:
        json.dump(profile_map, f, indent=2)
    print(f"\nAll 13 profiles registered and mapped in {out_file}!")

if __name__ == "__main__":
    main()
