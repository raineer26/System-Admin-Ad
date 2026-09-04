import os
import sys
import json
import time
import wave
import urllib.request
from pathlib import Path

VOICESTUDIO_BASE = "http://127.0.0.1:3900"
OUT_DIR = Path("public/audio/dubbing")
TEMP_DIR = OUT_DIR / "temp"
OUT_DIR.mkdir(parents=True, exist_ok=True)
TEMP_DIR.mkdir(parents=True, exist_ok=True)

with open("public/audio/dubbing/voicestudio_emotion_profiles.json", "r") as f:
    PROFILES = json.load(f)

SCENES = [
    {
        "id": "Scene01",
        "speaker": "Deign Lazaro",
        "profile_key": "deign_dramatic",
        "emotion_label": "Dramatic & Intriguing",
        "output_filename": "scene_01_opening_deign.wav",
        "chunks": [
            "Every organization depends on technology. Websites. Networks. Accounts. Computers. Classrooms.",
            "Most of the time, we don't think about the people behind these systems. We simply expect everything to work.",
            "But when something goes wrong, someone has to be there to find the problem, understand it, and make things work again. This is where system administration comes in. Meet Jansen Lee."
        ]
    },
    {
        "id": "Scene02",
        "speaker": "Faijah Nonoy",
        "profile_key": "faijah_warm",
        "emotion_label": "Warm & Conversational",
        "output_filename": "scene_02_who_is_jansen_faijah.wav",
        "chunks": [
            "Jansen is a webmaster and graphic designer at BSOP. Although system administrator is not his official job title, many of his responsibilities are closely connected to system administration and IT support.",
            "Jansen has been working at BSOP for around seven or eight years. He is a graduate of College of St. Benito, where he studied Multimedia Arts."
        ]
    },
    {
        "id": "Scene03",
        "speaker": "Sean Vasquez",
        "profile_key": "sean_storyteller",
        "emotion_label": "Reflective Storyteller",
        "output_filename": "scene_03_how_it_started_sean.wav",
        "chunks": [
            "His journey into technology management wasn't something he originally planned. It started during a fellowship, when a previous supervisor was looking for someone to redesign the organization's website.",
            "What began as a simple volunteer task eventually became a long-term responsibility. Today, Jansen helps maintain many of the digital systems and technology used throughout BSOP."
        ]
    },
    {
        "id": "Scene04",
        "speaker": "Raineer Rosado",
        "profile_key": "raineer_urgent",
        "emotion_label": "Urgent & Resilient",
        "output_filename": "scene_04_the_website_raineer.wav",
        "chunks": [
            "One of his main responsibilities is maintaining the organization's websites. A website isn't something that can simply be created and forgotten.",
            "It needs regular maintenance, updates, content management, and security checks to keep it functioning properly. Jansen works with WordPress to maintain the website and make sure its different parts continue to work as expected.",
            "But maintaining a website also means being prepared when something goes wrong. At one point, Jansen experienced having his website hacked. When something like that happens, the problem becomes more than just a technical inconvenience.",
            "It can affect the people who depend on the website for information and access. This is one of the realities of managing technology.",
            "Problems don't always happen at convenient times, and sometimes they require immediate attention. But the website is only one part of the system."
        ]
    },
    {
        "id": "Scene05",
        "speaker": "Deign Lazaro",
        "profile_key": "deign_technical",
        "emotion_label": "Authoritative & Technical",
        "output_filename": "scene_05_the_network_deign.wav",
        "chunks": [
            "Another important responsibility is helping maintain BSOP's network. Every day, students and staff rely on the organization's network to access online resources, communicate, and perform their work. One example is the organization's Wi-Fi access.",
            "Not every device should automatically be allowed to connect. Registered devices belonging to authorized students and staff are given access, helping keep the network controlled and secure.",
            "For the user, connecting to Wi-Fi may seem like a simple process. But behind that simple connection are configurations, access controls, monitoring, and maintenance."
        ]
    },
    {
        "id": "Scene06",
        "speaker": "Faijah Nonoy",
        "profile_key": "faijah_professional",
        "emotion_label": "Crisp & Professional",
        "output_filename": "scene_06_user_management_faijah.wav",
        "chunks": [
            "Another important part of managing an organization's technology is managing its users. Students and staff need accounts that allow them to access institutional services and resources. Jansen manages these accounts through Google Admin.",
            "Through the institution's dedicated email system, student and staff accounts can be created and managed according to their needs.",
            "Again, this is something users may rarely think about. For a student, an institutional email account may simply be an email address. But behind that account is a system that needs to be organized, maintained, and managed."
        ]
    },
    {
        "id": "Scene07",
        "speaker": "Sean Vasquez",
        "profile_key": "sean_pragmatic",
        "emotion_label": "Grounded & Pragmatic",
        "output_filename": "scene_07_the_hardware_sean.wav",
        "chunks": [
            "And technology doesn't only exist online. A large part of IT support involves the physical equipment that people use every day.",
            "Computers, projectors, televisions, printers, cables, photography equipment, and online classroom equipment all need to be monitored and maintained.",
            "If a projector isn't working, a classroom may not be able to conduct its presentation. If a computer has a problem, an employee's work may be interrupted. If a printer stops functioning, an entire process can be delayed.",
            "This is why equipment monitoring and maintenance are also important responsibilities. Jansen helps keep track of these resources and assists when technical problems occur."
        ]
    },
    {
        "id": "Scene08",
        "speaker": "Raineer Rosado",
        "profile_key": "raineer_resourceful",
        "emotion_label": "Wry & Resourceful",
        "output_filename": "scene_08_troubleshooting_raineer.wav",
        "chunks": [
            "And then there is one of the most familiar parts of IT work: troubleshooting. Sometimes, a computer simply doesn't work the way it should.",
            "A program might stop responding. A device might not connect. A website might behave unexpectedly. Or a piece of classroom equipment might suddenly stop working. When these problems happen, the solution isn't always something you already know.",
            "Sometimes, troubleshooting starts with identifying the problem. Then comes research. Jansen explains that when he encounters something he doesn't know how to fix, he usually looks for information online.",
            "He uses resources such as Google and W3Schools to find solutions and understand technical problems. He also uses tools such as WordPress for website management and Photoshop for his design work.",
            "This highlights an important part of working in technology. You don't necessarily need to know everything. You need to know how to learn, where to look for information, and how to apply what you find."
        ]
    },
    {
        "id": "Scene09",
        "speaker": "Deign Lazaro",
        "profile_key": "deign_observational",
        "emotion_label": "Observational & Dynamic",
        "output_filename": "scene_09_day_in_the_life_deign.wav",
        "chunks": [
            "A system administrator's work can also change from one day to another. On a normal day, Jansen may spend most of his time in front of his laptop.",
            "He may work on the website, create designs, manage accounts, schedule online meetings, or assist office colleagues with computer problems.",
            "But sometimes, his work takes him away from his desk. BSOP also has hybrid classrooms, where technology plays an important role in connecting people inside and outside the classroom.",
            "Jansen sometimes checks these classrooms to make sure the equipment and setup are working properly. This means checking the technology before it becomes a problem for the people who depend on it."
        ]
    },
    {
        "id": "Scene10",
        "speaker": "Faijah Nonoy",
        "profile_key": "faijah_reflective",
        "emotion_label": "Philosophical & Reflective",
        "output_filename": "scene_10_invisible_work_faijah.wav",
        "chunks": [
            "And that's one of the interesting things about system administration. When everything is working, the work can be almost invisible.",
            "People don't think about the network when they are connected. They don't think about the account system when they successfully log in.",
            "They don't think about the website when it loads normally. They don't think about the projector when it turns on exactly when it should.",
            "They simply expect everything to work. And that's the goal. System administration isn't always about being the person everyone notices.",
            "It's about making sure the systems people rely on are available, functional, secure, and maintained."
        ]
    },
    {
        "id": "Scene11",
        "speaker": "Sean Vasquez",
        "profile_key": "sean_introspective",
        "emotion_label": "Introspective & Sincere",
        "output_filename": "scene_11_work_life_sean.wav",
        "chunks": [
            "Of course, being responsible for technology can sometimes affect a person's work-life balance. Jansen shared that when he was just starting, he sometimes worked beyond regular office hours.",
            "Over time, however, he learned to set boundaries and avoid working outside his scheduled hours whenever possible.",
            "His experience shows that technology work isn't only about technical skills. It also involves responsibility, problem-solving, communication, continuous learning, and knowing how to manage your own time."
        ]
    },
    {
        "id": "Scene12",
        "speaker": "Raineer Rosado",
        "profile_key": "raineer_empowering",
        "emotion_label": "Passionate & Empowering",
        "output_filename": "scene_12_system_admin_definition_raineer.wav",
        "chunks": [
            "Jansen's story also shows that system administration isn't always defined by a job title. You don't necessarily have to be called a system administrator to perform responsibilities that are part of system administration.",
            "In his case, maintaining websites, managing user accounts, supporting computers, monitoring equipment, helping maintain the network, checking hybrid classrooms, and responding to security problems all contribute to keeping an organization connected and operational.",
            "At its core, system administration is about responsibility. It's about keeping systems available. Keeping users connected. Maintaining technology.",
            "Protecting access. Solving problems. And making sure that when people need technology to work, it is there for them."
        ]
    },
    {
        "id": "Scene13",
        "speaker": "Deign Lazaro",
        "profile_key": "deign_tribute",
        "emotion_label": "Poignant Tribute",
        "output_filename": "scene_13_closing_deign.wav",
        "chunks": [
            "Jansen may describe himself as a webmaster and graphic designer. But behind those roles is someone who has taken on many of the responsibilities that keep an organization's technology running.",
            "And that is what makes system administration unique. The work is often invisible. But the impact isn't. Because when technology works, people can focus on what they actually need to do.",
            "And sometimes, the best sign that a system administrator is doing their job well... is that nobody notices them at all."
        ]
    }
]

def synthesize_chunk(voice_id, text, speed, guidance_scale, target_wav):
    if target_wav.is_file() and target_wav.stat().st_size > 5000:
        print(f"  [Cached] {target_wav.name} exists ({target_wav.stat().st_size} bytes)")
        return True

    payload = {
        "model": "omnivoice",
        "input": text,
        "voice": voice_id,
        "response_format": "wav",
        "speed": speed,
        "guidance_scale": guidance_scale,
        "num_step": 32
    }

    req = urllib.request.Request(
        f"{VOICESTUDIO_BASE}/v1/audio/speech",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=60) as res:
            audio_bytes = res.read()
            elapsed = time.time() - t0
            with open(target_wav, "wb") as f:
                f.write(audio_bytes)
            print(f"  Generated {target_wav.name} ({len(audio_bytes)} bytes in {elapsed:.2f}s)")
            return True
    except Exception as e:
        print(f"  Error synthesizing chunk: {e}", file=sys.stderr)
        return False

def concat_wavs(wav_files, out_wav, silence_duration=0.30):
    if len(wav_files) == 1:
        if wav_files[0] != out_wav:
            with open(wav_files[0], "rb") as fin, open(out_wav, "wb") as fout:
                fout.write(fin.read())
        return

    with wave.open(str(wav_files[0]), "rb") as w:
        params = w.getparams()
        framerate = w.getframerate()
        nchannels = w.getnchannels()
        sampwidth = w.getsampwidth()

    silence_frames = int(framerate * silence_duration)
    silence_bytes = b"\x00" * (silence_frames * nchannels * sampwidth)

    with wave.open(str(out_wav), "wb") as out_w:
        out_w.setparams(params)
        for i, wf in enumerate(wav_files):
            with wave.open(str(wf), "rb") as in_w:
                out_w.writeframes(in_w.readframes(in_w.getnframes()))
            if i < len(wav_files) - 1:
                out_w.writeframes(silence_bytes)

def get_wav_duration(wav_path):
    with wave.open(str(wav_path), "rb") as w:
        frames = w.getnframes()
        rate = w.getframerate()
        return frames / float(rate)

def main():
    print("===========================================================================")
    print(" VoiceStudio Multi-Character Emotional Dubbing Pipeline — All 13 Scenes")
    print("===========================================================================\n")

    manifest = {}

    for idx, scene in enumerate(SCENES, start=1):
        scene_id = scene["id"]
        speaker = scene["speaker"]
        pkey = scene["profile_key"]
        emotion = scene["emotion_label"]
        out_name = scene["output_filename"]
        chunks = scene["chunks"]
        
        pinfo = PROFILES[pkey]
        voice_id = pinfo["id"]
        speed = pinfo.get("speed", 1.0)
        guidance = pinfo.get("guidance_scale", 2.0)
        
        final_wav = OUT_DIR / out_name
        print(f"\n--- [{idx}/13] Processing {scene_id}: {speaker} [{emotion}] -> {out_name} ---")

        chunk_files = []
        success = True

        for c_idx, text in enumerate(chunks, start=1):
            c_wav = TEMP_DIR / f"{scene_id}_vs_c{c_idx}.wav"
            print(f" Chunk {c_idx}/{len(chunks)}: \"{text[:45]}...\"")
            ok = synthesize_chunk(voice_id, text, speed, guidance, c_wav)
            if not ok:
                success = False
                break
            chunk_files.append(c_wav)

        if success and chunk_files:
            concat_wavs(chunk_files, final_wav, silence_duration=0.30)
            dur = get_wav_duration(final_wav)
            frames = int(dur * 30)
            print(f"  ==> [COMPLETED] {out_name}: {dur:.2f}s ({frames} frames)")
            manifest[scene_id] = {
                "speaker": speaker,
                "emotion": emotion,
                "filename": out_name,
                "duration_seconds": round(dur, 2),
                "duration_frames": frames,
                "fps": 30
            }
        else:
            print(f"  ==> [FAILED] {scene_id} could not be completed.", file=sys.stderr)

    manifest_file = OUT_DIR / "manifest.json"
    with open(manifest_file, "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"\n===========================================================================")
    print(f" Dubbing Complete! Manifest saved to {manifest_file}")
    print("===========================================================================")

if __name__ == "__main__":
    main()
