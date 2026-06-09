# 🛡️ The Real 90-Day Hacking Roadmap — No BS

> *"Hacking is not a talent you are born with. It is the brutal, relentless refusal to quit when things don't work."*

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Who This Is For](#-who-this-is-for)
- [Before You Begin — Kill Tutorial Hell](#-before-you-begin--kill-tutorial-hell)
- [The Roadmap at a Glance](#-the-roadmap-at-a-glance)
- [Month 1 — Build the Foundation](#-month-1--build-the-foundation-weeks-14)
  - [Week 1 — Mindset & The Battlefield](#week-1--mindset--the-battlefield)
  - [Week 2 — Networking (The Architecture of the Internet)](#week-2--networking-the-architecture-of-the-internet)
  - [Week 3 — Linux & The Terminal](#week-3--linux--the-terminal)
  - [Week 4 — Web Fundamentals](#week-4--web-fundamentals)
- [Month 2 — Draw Your Weapons](#-month-2--draw-your-weapons-weeks-58)
  - [Week 5 — Web Vulnerabilities (OWASP Top 10)](#week-5--web-vulnerabilities-owasp-top-10)
  - [Week 6 — Hacker Methodology & Exploitation](#week-6--hacker-methodology--exploitation)
  - [Week 7 — Cryptography](#week-7--cryptography)
  - [Week 8 — System Security & Defense (Blue Team)](#week-8--system-security--defense-blue-team)
- [Month 3 — Become Dangerous](#-month-3--become-dangerous-weeks-912)
  - [Week 9 — Network Security & Advanced Attacks](#week-9--network-security--advanced-attacks)
  - [Week 10 — Master the Big Four Tools](#week-10--master-the-big-four-tools)
  - [Week 11 — CTFs, Capture the Flag & Bug Bounties](#week-11--ctfs-capture-the-flag--bug-bounties)
  - [Week 12 — Professionalism, Reporting & The Interview](#week-12--professionalism-reporting--the-interview)
- [The Mindset Manifesto](#-the-mindset-manifesto)
- [Ethics & Responsibility](#-ethics--responsibility)
- [Resources & Tools Summary](#-resources--tools-summary)

---

## 🎯 Overview

This is a **definitive 12-week, step-by-step blueprint** to go from absolute zero to executing real tactical exploits and landing a job in cybersecurity.

No gatekeeping. No academic filler. No Hollywood garbage.

Just a clear, week-by-week plan that will take you from staring at a blinking cursor with no idea what you're doing — to becoming a professional ethical hacker ready for the real world.

**Commitment required:** ~90 days of focused, daily effort.

---

## 🙋 Who This Is For

- Complete beginners who don't know where to start
- People trapped in **tutorial hell** — watching videos endlessly but never actually doing anything
- Anyone who's installed Kali Linux, opened the terminal, and frozen in panic
- Self-taught learners who want a structured, no-nonsense path into cybersecurity

---

## 🚫 Before You Begin — Kill Tutorial Hell

> You go on YouTube and one person tells you to learn Python. Another says Linux. Another says don't touch a keyboard until you've memorized the entire OSI model.

This is how people spend 50+ hours watching videos, install Kali Linux, stare at the terminal, and realize they have **absolutely no idea what they're doing.**

**That stops today.**

Close the other 15 tabs. Follow this roadmap. Do the assignments. Build real skills.

---

## 🗺️ The Roadmap at a Glance

| Week | Topic | Milestone |
|------|-------|-----------|
| 1 | Mindset & CIA Triad | Think like a threat actor |
| 2 | Networking & OSI Model | Understand the internet's architecture |
| 3 | Linux & The Terminal | Live in the command line |
| 4 | Web Fundamentals | See the web as raw HTTP traffic |
| 5 | OWASP Top 10 | Manually execute SQLi & XSS |
| 6 | Hacker Methodology & Metasploit | Pop your first root shell |
| 7 | Cryptography | Crack a real password hash |
| 8 | System Security & Blue Team | Harden an OS, build the castle |
| 9 | Network Security & IDS/IPS | Watch your own attacks get detected |
| 10 | Wireshark, Burp Suite, Nmap, Hydra | Master the professional toolkit |
| 11 | CTFs & Bug Bounties | Hack a full machine end-to-end |
| 12 | Report Writing & Interviews | Write a Fortune 500-ready pentest report |

---

## 🏗️ Month 1 — Build the Foundation (Weeks 1–4)

---

### Week 1 — Mindset & The Battlefield

> Your first week has **nothing** to do with hacking. Put the keyboard away.

#### 🎭 Types of Hackers

| Type | Description |
|------|-------------|
| **White Hat** | Ethical hackers / penetration testers hired legally to break into systems and find vulnerabilities |
| **Black Hat** | Criminals — ransomware gangs, data thieves, nation-state actors |
| **Gray Hat** | Wild cards — break rules without permission, but report the flaw instead of exploiting it |

#### 🔺 The CIA Triad — The Holy Trinity of Cybersecurity

Every single cyber attack in human history is an attack on one of these three pillars:

**Confidentiality** — Data should only be seen by authorized users.
> *Example: A hacker intercepts your network traffic and reads your bank statement. They didn't steal money — they just looked. That's a breach.*

**Integrity** — Data must be accurate and unaltered.
> *Example: A hacker changes a patient's blood type in a hospital database. No data was stolen — but someone could die. That's broken integrity.*

**Availability** — Systems must be accessible when needed.
> *Example: A DDoS attack takes your bank's website offline. Your money is safe, but you can't access it. That's broken availability.*

#### 🧠 Key Terminology to Master

| Term | Definition |
|------|------------|
| **Malware** | Software designed to damage, disrupt, or destroy systems |
| **Phishing** | Psychological manipulation to steal credentials |
| **Ransomware** | Encrypts your data and holds the decryption key for ransom |

#### 📝 Week 1 Assignment
Look at every piece of technology around you and ask: *"How could someone compromise the CIA triad here?"*

By the end of this week, you won't be a hacker yet — but you'll have stopped looking at the internet like a consumer and started looking at it like a **predator**.

---

### Week 2 — Networking (The Architecture of the Internet)

> *"90% of beginners quit in week two. Don't be 90%."*

If you do not understand networking, you will **never** be a hacker. Period. You cannot break into a building if you don't understand the roads, the doors, and how the security cameras communicate.

#### 📚 The OSI Model — 7 Layers of How Data Travels

The OSI model explains how a piece of data moves from an application on your screen down into electrical signals on a copper wire, across the ocean, and back up into a browser on the other side of the world.

| Layer | Name | Hacker Relevance |
|-------|------|-----------------|
| 7 | Application | Attack web apps (SQLi, XSS) |
| 6 | Presentation | Encryption/encoding attacks |
| 5 | Session | Session hijacking |
| 4 | Transport | TCP/UDP manipulation |
| 3 | Network | IP spoofing, MITM |
| 2 | Data Link | ARP spoofing |
| 1 | Physical | Rogue devices, cable taps |

> If hackers can't break your application at Layer 7, they'll try to intercept your connection at Layer 3 — or physically plug a rogue device into your hardware at Layer 1.

#### 🚪 Ports & Protocols — The 65,535 Doors

Think of an IP address as the street address of an apartment building. Ports are the individual rooms.

| Port | Protocol | Service |
|------|----------|---------|
| 80 | HTTP | Web traffic (unencrypted) |
| 443 | HTTPS | Web traffic (encrypted) |
| 21 | FTP | File transfers |
| 22 | SSH | Secure remote login |
| 3389 | RDP | Remote Desktop Protocol |

> When a hacker wants to break into a server, the first thing they do is scan all 65,000 doors to see which ones are **unlocked**.

#### 🔍 Other Critical Concepts
- **DNS** — Translates domain names (google.com) into IP addresses
- **DHCP** — How your router assigns you an IP address in the first place
- **TCP/IP Model** — The practical model that governs real-world internet traffic

#### 📝 Week 2 Assignment
Understand the complete packet flow: *What actually happens when you type google.com and hit Enter?* Trace every step from your keyboard to the response landing in your browser.

---

### Week 3 — Linux & The Terminal

> *"Windows hides complexity. Hackers want raw, unfiltered control."*

If you're using Windows — that's fine for gaming and YouTube. But Windows is a consumer OS designed to hide the complex stuff. Hackers use **Linux**.

#### 🐧 Which Linux to Install?

| Option | Best For |
|--------|----------|
| **Ubuntu** | Learning the ropes comfortably |
| **Kali Linux** | Jumping straight in — comes preloaded with 600+ pen testing tools |

Install on a **Virtual Machine (VM)** — don't wipe your main system.

#### ⌨️ Essential Terminal Commands

| Command | Purpose |
|---------|---------|
| `ls` | List files in a directory |
| `cd` | Change directories — navigate the system |
| `grep` | Search through massive amounts of text for a specific string or password |
| `chmod` | Change file permissions — turn a text file into an executable |
| `sudo` | Execute commands as root (superuser) |
| `find` | Search for files across the filesystem |
| `cat` | Read contents of a file |
| `nano` / `vim` | Text editors inside the terminal |

#### 🔑 Linux File System Structure

There is no "C: drive" in Linux. Everything starts at `/` — the **root**.

```
/
├── /bin    — Essential binaries (commands)
├── /etc    — Configuration files
├── /home   — User home directories
├── /var    — Variable data (logs, databases)
├── /root   — Root user's home directory
└── /tmp    — Temporary files (great for staging payloads)
```

#### ⚡ Privilege Escalation — The Ultimate Goal

Almost every hack ends with **privilege escalation**: starting as a restricted normal user and finding a flaw that elevates you to **root** — the absolute god of the system.

#### 📝 Week 3 Assignment
Open a Linux terminal. Navigate through 5 different directories. Create a **hidden file** (prefix with `.`). Write a secret message inside it. Change the permissions so only root can read it — **all without touching the mouse**.

---

### Week 4 — Web Fundamentals

> *"Every company in the world has a website. For a hacker, a website is a front door with a million different locks waiting to be tested."*

#### 🌐 Front End vs. Back End

| Layer | What It Is | What Hackers Target |
|-------|-----------|---------------------|
| **Front End** | HTML, CSS, JavaScript — what you see | Client-side logic, input fields |
| **Back End** | Databases, server logic, PHP/Python | SQL databases, authentication systems |

#### 📡 The HTTP Request/Response Cycle

The internet is a massive conversation:
1. You click a link → Your browser sends an **HTTP Request** to a server
2. The server processes it → Sends an **HTTP Response** (usually a web page)

**Critical question:** *What happens if we intercept that request before it leaves our computer? What if we change the data?*

#### 🍪 Cookies & Sessions

HTTP is **stateless** — it has no memory. Every time you load a new page, the server forgets who you are. So how does Instagram keep you logged in?

**Session cookies.** When you log in, the server gives your browser a tiny piece of text — a VIP wristband. Every click, your browser shows it saying *"it's still me."*

> **What happens if a hacker steals your VIP wristband?**
> They don't need your password. They inject your cookie into their browser, and the server lets them straight into your account.

#### 📝 Week 4 Assignment
Right-click any webpage → **Inspect Element** → **Network Tab**. Log into a website and watch the raw HTTP requests leave your computer in real time. Look at the headers. Look at your cookies in plain text.

Once you see the web not as pretty pictures but as a **constant flow of raw text**, you will never look at the internet the same way again.

---

## ⚔️ Month 2 — Draw Your Weapons (Weeks 5–8)

---

### Week 5 — Web Vulnerabilities (OWASP Top 10)

> *"Hackers don't guess randomly. They follow the Bible of web hacking — the OWASP Top 10."*

The [OWASP Top 10](https://owasp.org/www-project-top-ten/) is a globally recognized document listing the 10 most critical security risks to web applications.

#### 💉 SQL Injection (SQLi) — The King

A **database** is like a massive filing cabinet. A **web application** is the clerk standing at the desk. When you type a username and password, you hand a note to the clerk.

*But what if you write malicious code on that note?*

```sql
-- Normal login attempt:
username = admin
password = password123

-- SQL Injection attack:
username = ' OR 1=1 --
password = anything
```

Because the web app lacks **input sanitization**, it reads the injection as a system instruction: *"Give me every single file in the entire cabinet right now."* The database dumps millions of usernames, passwords, emails, and credit card numbers.

You didn't crack a password. You **manipulated the fundamental logic of the system**.

#### 📜 Cross-Site Scripting (XSS) — Weaponized Trust

If SQLi is an attack on the database, **XSS is an attack on the users**.

A hacker leaves a hidden `<script>` tag as a comment on a public forum. Every innocent user who visits that page silently executes the script in their own browser — which quietly steals their session cookies and emails them to the attacker.

**The user sees nothing. The website sees nothing.**

#### 🔓 Other Critical Vulnerabilities

| Vulnerability | Description |
|---------------|-------------|
| **Broken Authentication** | Bypassing logins via default credentials, credential stuffing, session fixation |
| **Security Misconfiguration** | Lazy devs leaving default admin passwords or open cloud storage buckets |
| **CSRF (Cross-Site Request Forgery)** | Tricking your authenticated browser into sending unauthorized requests to another site |
| **Insecure Direct Object Reference** | Accessing other users' data by modifying IDs in URLs |

#### 📝 Week 5 Assignment
Download **DVWA (Damn Vulnerable Web App)** or **OWASP Juice Shop**. Host it locally. Then:
- Manually execute a SQL injection to dump the database
- Trigger an XSS popup

See with your own eyes exactly how fragile the internet is when you know where to push.

---

### Week 6 — Hacker Methodology & Exploitation

> *"Real hacking is not smashing a keyboard. It is highly structured, systematic, and patient."*

#### 🎯 The Cyber Kill Chain — 4 Phases

**Phase 1: Footprinting & Reconnaissance** *(Never touch the target)*
- Scrape LinkedIn for employee names and email formats
- Use OSINT (Open Source Intelligence) to identify server technologies
- Search public DNS records
- Look for leaked employee passwords in old data breaches on the dark web
- *You are gathering ammunition. You are building a profile of the enemy.*

**Phase 2: Scanning** *(Touch the perimeter)*
Using **Nmap** (Network Mapper) — the digital submarine sonar ping:
```bash
nmap -sV -O -A <target IP>
# -sV  : Detect service versions
# -O   : Detect operating system
# -A   : Aggressive scan (OS, versions, scripts, traceroute)
```
Nmap tells you exactly what software runs behind each open port (e.g., Apache 2.4.49) and what OS the server is running. You are **mapping the exact shape of the fortress walls**.

**Phase 3: Enumeration** *(Extract actionable intel)*
- Can you get a list of usernames from the server?
- Are there hidden directories?
- Are there network shares with anonymous access?
- You're pulling the **exact blueprints of the vault** before you try to pick the lock.

**Phase 4: Exploitation** *(The breach)*
Using **Metasploit** — the world's most powerful exploitation framework:

| Component | Role |
|-----------|------|
| **Exploit** | The mechanism — the exact code that breaks the lock |
| **Payload** | The bullet — what you drop inside the server once the door is open |
| **Meterpreter Reverse Shell** | Forces the target to **connect back to you**, bypassing inbound firewall rules |

```bash
msfconsole
use exploit/multi/handler
set PAYLOAD windows/meterpreter/reverse_tcp
set LHOST <your IP>
set LPORT 4444
exploit
```

#### 📝 Week 6 Assignment
Boot **Metasploitable 2** in your virtual lab. Run an aggressive Nmap scan. Identify a vulnerable service. Load Metasploit, configure your exploit, set your payload, and execute a remote code execution attack.

When you see that command prompt pop up giving you **total control over another machine** — you are no longer reading about hacking. You are doing it.

---

### Week 7 — Cryptography

> *"If there were no cryptography, the internet would collapse into total chaos."*

Every Amazon purchase, every bank login, every private message — your data flies across open public wires that thousands of routers and ISPs can see. **Cryptography is the only thing stopping them.**

#### 🔐 Encryption vs. Hashing — Never Mix These Up

**Encryption is a two-way street — a locked box.**

| Type | How It Works | Vulnerability |
|------|-------------|---------------|
| **Symmetric** | Same key encrypts and decrypts — fast but risky if intercepted | Key exchange problem |
| **Asymmetric** | Public key locks, private key unlocks — powers SSL/TLS | Computationally expensive |

Asymmetric encryption is the backbone of HTTPS — the green padlock in your browser. It allows two computers that have **never met** to establish a completely secure connection over a wire being actively wiretapped.

**Hashing is a one-way street — a meat grinder.**

You put a cow in, you get hamburger. You **cannot reverse it**.

When you create an account on a secure website, the site never stores your actual password. It runs it through SHA-256 (or similar) and stores the output hash. At login, it hashes what you typed and compares.

#### 🔓 How Hackers Crack Hashes

They don't reverse the hash — they attack it:

| Attack | Method |
|--------|--------|
| **Brute Force** | Try every possible combination |
| **Dictionary Attack** | Run a list of 10M common passwords through the hash algorithm |
| **Rainbow Tables** | Pre-computed databases of hash values |

**Defense: Salting** — Add a random string to every password before hashing, rendering rainbow tables useless.

#### 📝 Week 7 Assignment
1. Hash a plain-text password using **MD5** and **SHA-256**
2. Take a known hash, load **Hashcat** or **John the Ripper**, feed it **rockyou.txt** wordlist
3. Watch your CPU heat up as it cracks the hash and spits the clear-text password back onto your screen

---

### Week 8 — System Security & Defense (Blue Team)

> *"To be a truly elite hacker, you have to know exactly how the defense is structured. You cannot bypass a system you don't understand."*

#### 🏰 Windows vs. Linux Security Architecture

**Windows — Active Directory**
- Central nervous system of 95% of corporate networks
- Manages every user, every computer, every password in the company
- *If you own Active Directory, you own the company*
- Hacker's ultimate target on corporate networks

**Principle of Least Privilege** — The golden rule of defense:
> A user should only have the absolute bare minimum access rights necessary to do their job — and **not a single permission more**.

#### 🔥 Firewalls

A firewall is the bouncer at the club door — with a strict clipboard of rules (Access Control Lists, or ACLs).

| Rule Type | Direction | Example |
|-----------|-----------|---------|
| **Ingress** | Traffic coming in | Allow port 80 (web), block port 445 (SMB) |
| **Egress** | Traffic going out | Block outbound reverse shell connections |

#### 🛡️ Antivirus vs. EDR (Endpoint Detection & Response)

| Technology | How It Works | Weakness |
|------------|-------------|---------|
| **Old AV** | Matches known virus "signatures" (wanted posters) | Changing one line of malware code bypasses it |
| **Modern EDR** | Monitors **behavior** — an immune system | If a PDF suddenly opens a command prompt and injects code into memory, EDR kills it |

#### ⚙️ System Hardening

Hardening turns a default, vulnerable OS into a **tank**:
- Close every unused port
- Disable every unnecessary service
- Enforce complex password policies
- Implement multi-factor authentication (MFA)
- Remove the attack surface until the hacker has **nowhere left to push**

#### 📝 Week 8 Assignment
Take a default Linux or Windows VM. Install **UFW** (Uncomplicated Firewall) or Windows Defender Firewall. Write custom rules blocking all incoming traffic except one specific port. Create a restricted user account and try — and fail — to access the root directory. Feel what it is like to hit a **brick wall**.

---

## 💣 Month 3 — Become Dangerous (Weeks 9–12)

---

### Week 9 — Network Security & Advanced Attacks

> *"A castle is useless if the roads leading to it are completely unguarded."*

#### 🔍 IDS vs. IPS

Think of your network as a highly secure airport:
- The **firewall** is the security gate — it checks tickets
- But what if someone with a valid ticket brings a weapon inside?

| System | What It Does | Analogy |
|--------|-------------|---------|
| **IDS** (Intrusion Detection System) | Monitors network behavior and **alerts** security team | Security cameras — watches the bank get robbed and calls the police |
| **IPS** (Intrusion Prevention System) | Detects AND **automatically blocks** the attack | Armed guard — sees the threat and instantly severs the connection |

#### 🔒 Enterprise VPNs

Not the YouTube ad VPNs. Real enterprise tunneling protocols:
- **IPsec** — Encrypts entire IP packets
- **OpenVPN** — Open-source, highly configurable
- **WireGuard** — Modern, faster, leaner

These wrap a data packet in a cryptographic shell, allowing a remote worker in a coffee shop to securely tunnel into the corporate vault.

#### ⚡ Advanced Network Attacks

**Man-in-the-Middle (MITM) via ARP Spoofing**
- Silently intercept encrypted traffic
- Strip SSL certificates
- Read clear-text data from victims who think they're secure

**DDoS — The Sledgehammer of the Internet**

| Attack Type | Mechanism |
|-------------|-----------|
| **Volumetric — NTP Amplification** | Send a 10-byte request to a public server, spoof the return address so it sends 10,000-byte response to the victim. Multiplied by millions of servers = digital tsunami |
| **Application Layer — Slowloris** | Opens thousands of connections to a web server but sends data agonizingly slowly. Server runs out of available connections. Legitimate users locked out. |

#### 📝 Week 9 Assignment
Build a virtual network in your lab. Install **Snort** or **Suricata** (open-source IDS). Launch a simulated attack from your Kali machine. Watch the IDS catch you **in real time**.

Learn what your attacks actually look like to the **blue team**.

---

### Week 10 — Master the Big Four Tools

> *"If you do not master these four tools, you will not survive in this industry."*

#### 🔬 Weapon 1: Wireshark — The Packet Analyzer

Wireshark lets you **see the Matrix**. When you open it on a busy network, your screen floods with tens of thousands of packets per minute.

Key skills:
- Use **display filters** to isolate a single malicious TCP handshake from millions of packets
- Extract downloaded files directly from raw `.pcap` captures
- Pull malware out of network traffic to analyze it safely

```
# Wireshark filter examples:
tcp.port == 80          # Show only HTTP traffic
http.request.method == "POST"  # Show only POST requests
ip.addr == 192.168.1.1  # Show traffic to/from a specific IP
```

#### 🕷️ Weapon 2: Burp Suite — The Web Proxy

Burp Suite sits between your browser and the internet — **intercepting every request before it leaves your machine**.

Real attack example:
1. You add a $2,000 laptop to your cart and click checkout
2. Burp Suite **freezes the request** on your screen
3. You find the parameter `price=2000` in the raw HTTP request
4. You change it to `price=1`
5. You click Forward — the server receives it, assumes it's legitimate, and charges **$1**

*That is the terrifying power of an intercepting proxy.*

Master the **Repeater** (replay and modify requests) and **Intruder** (automated fuzzing and brute-force) modules.

#### 🗺️ Weapon 3: Nmap — Network Mapper (Advanced)

You know Nmap scans ports. Now unlock the **Nmap Scripting Engine (NSE)**:

```bash
# Check if a port is vulnerable to specific CVEs:
nmap --script vuln <target>

# Stealth TCP SYN half-open scan (evade detection):
nmap -sS <target>
# You ping the server, it acknowledges you, and you drop the connection
# before the server can log your IP — digital ghosting
```

#### 🪓 Weapon 4: Hydra & Nikto — Brute Force

**Nikto** — Aggressive web server scanner. Points at a site and throws thousands of known malicious requests at it in seconds, hunting for outdated software, dangerous files, and misconfigurations.

**Hydra** — Parallelized login cracker. Feed it:
- A target URL
- A list of 1,000 common usernames
- A list of 10 million leaked passwords

Hydra hammers the login page across dozens of parallel threads until the **door snaps open**.

#### 📝 Week 10 Assignment
1. Capture live network traffic with Wireshark and **extract a hidden password**
2. Intercept a web request with Burp Suite and **bypass a client-side filter**
3. Assemble your full professional toolkit

---

### Week 11 — CTFs, Capture the Flag & Bug Bounties

> *"You are no longer following guided tutorials. You are stepping into the arena."*

#### 🚩 What is a CTF?

A **Capture The Flag** is a purposely vulnerable machine or network designed to be hacked. Your goal:
1. Break in
2. Escalate your privileges
3. Find a hidden text file — `root.txt` — containing a secret string
4. Submit the flag, prove you conquered the machine

#### 🏁 Platforms

| Platform | Difficulty | Style |
|----------|-----------|-------|
| **TryHackMe** | Beginner-friendly | Guided — gives you hints, walks you through scans |
| **Hack The Box** | Advanced | Raw — just an IP address and a blank terminal |

**A typical Hack The Box kill chain:**
1. Run Nmap scan → Find web server
2. Use Burp Suite → Intercept traffic, find hidden directory
3. Discover file upload vulnerability
4. Craft a **malicious PHP reverse shell**, upload it
5. Execute it → Your terminal hangs → **Shell pops**
6. You have a low-level user shell on a remote machine
7. Run **LinPEAS** enumeration scripts to find privilege escalation vectors
8. Find misconfigured cron job / weak permissions / outdated kernel
9. Exploit it → Terminal prompt changes from `$` to `#`
10. Read `root.txt` → Submit flag → Watch your rank climb

> *"The adrenaline rush you get the very first time you pop a reverse shell is indescribable. It is pure euphoria."*

#### 💰 Bug Bounty Programs

Companies like **Apple, Tesla, and the Department of Defense** actively invite hackers to attack their systems. If you find and **ethically report** a bug before a criminal does:
- Sometimes a few hundred dollars
- Sometimes **tens of thousands** for a single critical exploit

| Platform | Link |
|----------|------|
| **HackerOne** | https://hackerone.com |
| **Bugcrowd** | https://bugcrowd.com |

#### 📝 Week 11 Assignment
Complete your first full CTF machine **from start to finish, without looking at a walkthrough**.

You will struggle. You will hit walls. You will get frustrated.
And then you will **break through**.

---

### Week 12 — Professionalism, Reporting & The Interview

> *"Nobody pays you to hack. Companies pay you to write a report explaining how you hacked them and exactly how to fix it."*

If you can hack the Pentagon but can't write a coherent, professional PDF explaining your methodology — **you will never get a job. Period.**

#### 📄 Penetration Testing Report Structure

**Section 1: Executive Summary** *(For CEOs and Board Members)*
- High-level, non-technical overview
- They only care about one thing: *How much money will this vulnerability cost the company, and how do we stop it?*
- No technical jargon. Business risk language only.

**Section 2: Technical Narrative** *(For the Engineering Team)*
- Exact, step-by-step, reproducible breakdown of your exploit
- Complete with:
  - Screenshots of every step
  - Code snippets and commands used
  - **CVSS severity scores** for each vulnerability
  - Specific remediation recommendations

#### 🎤 Preparing for the Interview

Cybersecurity interviews are **notoriously brutal**.

They will ask you:
> *"Walk me through exactly what happens, step-by-step, at the network level, when you type google.com into your browser and press Enter."*

If your answer is *"it loads the website"* — you fail.

The correct answer covers:
1. DNS resolution — domain name → IP address
2. ARP request to the local gateway
3. TCP three-way handshake (SYN → SYN-ACK → ACK)
4. TLS cryptographic negotiation
5. HTTP GET request
6. Routing over the WAN
7. Server response and page rendering

**You must speak the language of engineers.** You must prove you understand the architecture, not just know how to run automated tools.

#### 📝 Week 12 Final Assignment
Take the CTF machine you hacked in Week 11. Write a **professional 5-page penetration testing report** on it. Format it perfectly. Make it look like you're handing it to a **Fortune 500 CEO**.

Because after this week — **you are ready.**

---

## 💪 The Mindset Manifesto

> *Looking down at a 12-week journey like this is overwhelming. You're going to feel an intense wave of imposter syndrome.*

You will think: *"I'm not smart enough for this. I'm not a math genius. I don't think like a computer."*

**Listen carefully.**

Every single elite hacker, every top-tier penetration tester, every security engineer making half a million dollars a year — started exactly where you are sitting right now. Staring at a blinking cursor with **absolutely no idea** what they were doing.

Hacking is not a talent you're born with. It is not an innate gift.

> **Hacking is simply the brutal, relentless refusal to quit when things don't work.**

There will be nights at 3 a.m. where your eyes are burning, your exploit has failed for the hundredth time, and you want to smash your keyboard and walk away.

Take a breath. Read the documentation one more time. Tweak your payload. Hit Enter.

When the terminal hangs and the **shell pops** — I promise you, there is no feeling quite like it.

*It is absolute magic.*

---

## ⚖️ Ethics & Responsibility

The skills in this roadmap are **dangerous**. They are the exact same methodologies used by nation-state actors and criminal syndicates to bring corporations and hospitals to their knees.

You are learning to break these systems **so you can learn to protect them**.

The world doesn't need more cybercriminals.

> **The world desperately needs more defenders. We need people willing to stand on the wall.**

Always practice on:
- ✅ Your own machines
- ✅ Virtual lab environments
- ✅ Platforms like TryHackMe and Hack The Box (legal, explicitly authorized)
- ✅ Bug bounty programs (explicitly authorized by the company)
- ❌ Never on systems you don't own or have explicit written permission to test

---

## 🛠️ Resources & Tools Summary

#### 🔧 Core Tools

| Tool | Purpose | Get It |
|------|---------|--------|
| **Kali Linux** | Hacker OS with 600+ tools | kali.org |
| **Nmap** | Network & port scanner | nmap.org |
| **Metasploit** | Exploitation framework | metasploit.com |
| **Burp Suite** | Web application proxy | portswigger.net |
| **Wireshark** | Packet analyzer | wireshark.org |
| **Hydra** | Login brute-forcer | Included in Kali |
| **Nikto** | Web server scanner | Included in Kali |
| **Hashcat** | Password hash cracker | hashcat.net |
| **John the Ripper** | Password cracker | openwall.com |
| **LinPEAS** | Linux privilege escalation enumerator | GitHub |
| **Snort / Suricata** | Open-source IDS | snort.org / suricata.io |

#### 🏋️ Practice Platforms

| Platform | Type | URL |
|----------|------|-----|
| **TryHackMe** | Guided CTF rooms | tryhackme.com |
| **Hack The Box** | Advanced CTF machines | hackthebox.com |
| **DVWA** | Vulnerable web app for local practice | GitHub |
| **OWASP Juice Shop** | Vulnerable web app | owasp.org |
| **Metasploitable 2** | Vulnerable Linux VM | SourceForge |
| **HackerOne** | Bug bounty platform | hackerone.com |
| **Bugcrowd** | Bug bounty platform | bugcrowd.com |

#### 📖 Key References

| Resource | Topic |
|----------|-------|
| **OWASP Top 10** | Web vulnerability bible |
| **CVE Database** | Common Vulnerabilities & Exposures |
| **rockyou.txt** | Famous leaked password wordlist |
| **CVSS Score Calculator** | Vulnerability severity scoring |

---

<div align="center">

---

*"The internet is a vast, beautiful, terrifying, broken place.*
*Starting today — you aren't just a user anymore.*
***You are an architect.***"*

---

**One life. One shot. Make it count.**

</div>
