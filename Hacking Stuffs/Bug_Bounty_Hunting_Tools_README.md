# 🐛 A to Z Bug Bounty Hunting Tools

> A complete reference guide covering every tool category used in professional bug bounty hunting — from reconnaissance to exploitation to reporting. Based on the legendary GitHub list by **Kayala**, broken down so it actually makes sense.

---

## 📋 Table of Contents

1. [What is Bug Bounty Hunting?](#1-what-is-bug-bounty-hunting)
2. [Reconnaissance (Recon)](#2-reconnaissance-recon)
   - [Subdomain & Asset Discovery](#subdomain--asset-discovery)
   - [URL & Parameter Mining](#url--parameter-mining)
3. [Subdomain Enumeration](#3-subdomain-enumeration)
4. [Web Application Testing](#4-web-application-testing)
5. [API Security Testing](#5-api-security-testing)
6. [Mobile Application Testing](#6-mobile-application-testing)
7. [Cloud Security Testing](#7-cloud-security-testing)
8. [Network Scanning & Discovery](#8-network-scanning--discovery)
9. [Fuzzing — Finding Hidden Paths](#9-fuzzing--finding-hidden-paths)
10. [Vulnerability Scanners](#10-vulnerability-scanners)
11. [Exploitation Tools](#11-exploitation-tools)
12. [Reporting & Automation](#12-reporting--automation)
13. [⭐ Personal Top 5 Tools](#13-personal-top-5-tools)
14. [Quick Reference Table](#14-quick-reference-table)

---

## 1. What is Bug Bounty Hunting?

**Bug bounty hunting is legal hacking.** Companies like Google, Facebook, and even the Pentagon invite hackers to try and break into their systems. If you find a security hole (a "bug"), you report it to them. In exchange, they pay you a **bounty** — a cash reward.

```
You find a bug → Report it responsibly → Get paid 💰
```

| Bug Severity | Typical Payout |
|--------------|----------------|
| Low / Informational | $50 – $500 |
| Medium | $500 – $5,000 |
| High | $5,000 – $30,000 |
| Critical | $30,000 – $100,000+ |

**It's a win-win:** Companies get a more secure system, and you get paid to hack legally.

> 💡 **The golden rule:** If you skip reconnaissance, you are hacking blind and you will miss the easy wins.

---

## 2. Reconnaissance (Recon)

> *"Recon is like stalking your target before you rob the house. You aren't breaking any windows yet. You're just watching from the bushes, looking for open doors, checking who lives there, and seeing what kind of alarm system they have."*

Recon means gathering every single piece of information about a target:
- IP addresses
- Employees and technology stack
- Hidden subdomains
- Old forgotten endpoints
- URL parameters

---

### Subdomain & Asset Discovery

#### 🔧 Amass
The **heavy lifter** for finding subdomains. It is not just a scanner — it is a cartographer that maps out the entire organization's footprint.

**What makes it special:**
- Uses DNS enumeration, scraping, brute forcing, AND API keys simultaneously
- Queries hundreds of data sources at once
- Connects dots between different data points to find non-obvious assets

**Example use case:**
```bash
amass enum -d target.com
```
It might find a developer subdomain like `dev-api.target.com` that was set up for testing 6 months ago and forgotten. Because it's a dev site, it likely has weak security settings or default passwords.

> Use this for your **deep dive** when you want to find absolutely everything.

---

#### 🔧 AssetFinder
Written in Go by the legendary **Tom Nom Nom** — built for **speed** over depth.

**What it does:**
- Instantly pulls related domains and subdomains
- Sources: Facebook, certificate transparency logs, VirusTotal
- Follows the Unix philosophy: does one thing really well

**Example use case:**
```bash
assetfinder target.com
```

> **Pro Trick:** Run AssetFinder first to get a quick list while Amass runs in the background doing its deep scan.

---

#### 🔧 HakCrawler
A simple, fast **web crawler** written in Go. Once you have your domains, you need to know what's on them.

**What it finds:**
- All links, script tags, and `robots.txt` entries
- Hidden internal endpoints inside HTML and JavaScript
- Administrator dashboards buried in JS files — things that aren't public knowledge

**Design strength:** Built to be piped — take your list of live subdomains from AssetFinder and feed them directly in:
```bash
cat subdomains.txt | hakrawler
```

---

#### 🔧 FindDomain
Written in **Rust** — blazing fast and memory efficient. What makes FindDomain special is its **monitoring capability**.

**Key feature — Real-time alerting:**
In bug bounty, being the **first to scan a new subdomain** often means you get the money. FindDomain can:
- Monitor a target continuously
- Send you an alert on **Discord or Slack** the second a new subdomain appears

> Imagine getting a notification that `target.com` just launched a new staging server. You can be the first one to scan it before they even secure it.

---

### URL & Parameter Mining

#### 🔧 WaybackURLs
The **classic tool** that started it all. Digs into the Internet Archive to find every URL ever recorded for that domain.

**Why old URLs matter:**
Developers are human and forget things. They leave old endpoints active. You might find `/v1/api/upload` that was supposed to be deleted 3 years ago when they upgraded to V2. But if V1 is still active and unpatched, it's an easy entry point.

```bash
cat domains.txt | waybackurls
```

---

#### 🔧 GAU+ (Get All URLs Plus)
A time machine for URLs — fetches URLs from the Wayback Machine and other archives. *(Note: GAU classic is deprecated; use the maintained fork.)*

---

#### 🔧 Katana
The **next-generation crawler** built by the Project Discovery team. The modern web is full of dynamic JavaScript — old crawlers miss links generated by JS code in React or Vue apps because they can't render the page.

**What makes Katana different:**
- It's a **headless crawler** — it actually renders JavaScript just like a real browser
- Clicks buttons and executes code to find hidden API calls that only trigger on user interaction
- Mandatory if you're hunting on modern single-page applications (SPAs)

```bash
katana -u target.com
```

---

#### 🔧 ParamSpider
Finding a URL is nice, but **finding a parameter is profitable**.

Parameters look like: `?id=1` or `?user=admin` — these are the places where we inject code.

**What ParamSpider does:**
- Mines URLs from archives specifically looking for parameters
- Filters out boring static files (images, CSS, fonts)
- Gives you a clean list of **fuzzable endpoints**

```bash
paramspider -d target.com
```

> If you see a parameter like `?redirect=` — that is a prime candidate for an **open redirect** or **SSRF** bug. You can pipe ParamSpider's output directly into a vulnerability scanner.

---

## 3. Subdomain Enumeration

Once you have initial recon, you need to find **every single subdomain** that belongs to the target. The main website is usually secure, but `dev.target.com` or `testportal.target.com` — those are often where the mistakes are.

#### 🔧 Subfinder
Your **go-to tool for passive subdomain discovery**. Passive means it never touches the target servers directly.

**How it works:**
- Queries sources like Censys, Chaos, and specialized DNS databases
- Finds subdomains publicly listed but hard to find manually
- Written in Go — incredibly fast and stealthy

```bash
subfinder -d target.com
```
Within seconds you have hundreds of subdomains without ever sending a packet to the target.

---

#### 🔧 Sublist3r
A classic **Python tool** that enumerates subdomains using multiple search engines: Google, Yahoo, Bing, and more.

**Strength:** Aggregates results from all different places — like checking the phone book, the library, and the town hall records all at once. Finds subdomains indexed by search engines but not linked anywhere else.

---

#### 🔧 Knockpy
Takes a completely different approach — it **guesses**. Uses a **dictionary attack (brute force)** to try thousands of common subdomain names.

**Examples it tries:** `admin`, `vpn`, `mail`, `test`, `staging`, `dev`, `api`...

```bash
knockpy target.com
```

> If you find `stagingv2.target.com` that isn't listed anywhere publicly, it's likely because developers thought no one would guess the name. Knockpy proves them wrong.

---

#### 🔧 Chaos
A project by **Project Discovery** that connects to the **Chaos DB** — a massive database of subdomains collected from bug bounty programs across the internet.

**Best use case:** If you're hunting on a public bug bounty program, running Chaos is like checking a master list of known assets. It saves hours of scanning time so you can start hacking immediately.

```bash
chaos -d target.com
```

---

## 4. Web Application Testing

Now we move from passive observation to **active exploitation**. We are looking for logic flaws, injection points, and anything that lets us manipulate the server.

#### 🔧 Burp Suite ⭐ (#1 Tool)
The **undisputed king** of web application testing. If you are testing web apps, this is your cockpit.

**How it works:**
- Acts as a proxy sitting between your browser and the target
- Intercepts and manipulates every request and response
- Pause a login request, change the password field to test for SQL injection, forward it — all in real time

**Key features:**
| Feature | Description |
|---------|-------------|
| **Proxy** | Intercept and inspect all browser traffic |
| **Repeater** | Manually resend and modify requests |
| **Intruder** | Automated fuzzing and brute forcing |
| **Scanner** (Pro) | Automated vulnerability detection |
| **Decoder** | Encode/decode any data format |

> Every critical bug — every SQL injection, every IDOR, every XSS — gets found inside Burp Suite. If you want to be a web hacker, mastering Burp is **non-negotiable**.

---

#### 🔧 OWASP ZAP (Z Attack Proxy)
The **open-source alternative** to Burp Suite — fantastic and free.

**Standout feature — HUD (Heads Up Display):**
Overlays testing tools directly onto your browser window while you surf. Imagine browsing a target site and seeing a **red alert pop up on your screen saying "XSS Found"** in real time.

> Perfect for people who want powerful features without the price tag of commercial tools.

---

#### 🔧 SQLMap
The **heavy artillery for databases**. Automates the detection and exploitation of SQL injection flaws.

**What it can do:**
- Detect SQL injection automatically
- Bypass WAFs and firewalls
- Dump the entire database: passwords, emails, credit cards — right into your terminal

```bash
sqlmap -u "http://target.com/product.php?id=1" --dbs
```

Turns a complex manual attack into a simple command-line process.

---

#### 🔧 XSStrike
Most XSS scanners just throw payloads at a target and hope one sticks. **XSStrike is smarter.**

**How it's different:**
1. Analyzes the website's response to understand how code is being filtered
2. Generates a **custom payload specifically designed to bypass that filter**
3. Like having an AI write your exploit code for you

---

#### 🔧 Nuclei ⭐ (#2 Tool)
A **fast, template-based vulnerability scanner** that changed the game.

**How it works:**
- Uses community-written templates instead of hard-coded checks
- If a new vulnerability drops today, there's a Nuclei template for it by lunch
- Scan thousands of subdomains for specific CVEs in minutes

**Capabilities:**
- Misconfigurations
- Exposed panels and tokens
- Critical CVEs
- Custom templates (write your own)

```bash
nuclei -l subdomains.txt -t templates/
```

> Precise, customizable, and absolutely essential for modern bug bounty hunting.

---

#### 🔧 KXSS
Part of the **Tom Nom Nom tool suite**, written in Go. Designed for speed in XSS hunting.

**How it works:**
- Pipe a list of URLs into it
- It checks for **reflected characters** — symbols sent back to the user without being sanitized
- Filters out noise so you focus only on URLs actually likely to be vulnerable

```bash
cat urls.txt | kxss
```

---

#### 🔧 CRLFuzz
Hunts for a specific but critical vulnerability: **CRLF Injection (Carriage Return Line Feed)**.

**Why it matters:**
If a hacker can inject CRLF characters into an HTTP header, they can:
- Split the HTTP response
- Inject malicious cookies
- Redirect users to fake websites

CRLFuzz automates this check across thousands of URLs at once, finding hidden logic flaws that manual testing misses.

---

## 5. API Security Testing

Modern applications are powered by APIs. This is the **hidden layer where the real data lives** and it requires a completely different toolset to break.

#### 🔧 Postman
You might think of this as a developer tool, but for a hacker it is invaluable.

**What hackers use it for:**
- Manually craft and send requests to an API
- Modify headers and authentication tokens
- Inspect raw JSON responses
- Test for IDOR by changing `user_id=100` to `user_id=101` to access another user's data

> Perfect for understanding how the API is supposed to work, so you can figure out how to break it.

---

#### 🔧 GraphQL Map
**GraphQL is a different beast.** It doesn't use multiple endpoints — it uses one single endpoint that you query like a database.

**What GraphQL Map does:**
- Automates finding vulnerabilities in GraphQL query language
- Checks for **introspection vulnerabilities** — where the API accidentally reveals its entire schema
- Attempts NoSQL command injection to dump data
- Can send a query asking for all user emails and passwords — if the API isn't secured, it pulls that data out

---

#### 🔧 NoSQLMap
Modern apps often use **MongoDB** instead of MySQL. Standard SQL injection tools won't work here.

**What NoSQLMap does:**
- Designed specifically to exploit non-relational (NoSQL) databases
- Automates injection attacks for NoSQL syntax
- Bypasses authentication or extracts data from MongoDB backends

**Example injection:**
Instead of the classic `' OR 1=1`, NoSQLMap might inject `{"$ne": null}` into a login field, tricking the database into logging you in without a valid password.

---

#### 🔧 JWT Tool
Modern APIs use **JSON Web Tokens (JWTs)** for authentication — long strings of characters that prove who you are.

**What JWT Tool lets you do:**
- Change your role from `user` to `admin`
- Remove signature verification to see if the server accepts a fake token
- Crack the signing key if it's weak

**Classic attack — "none" algorithm:**
1. Take a valid token
2. Change the algorithm header to `"alg": "none"`
3. Send it back to the server
4. If the server accepts it → you've bypassed authentication entirely

---

#### 🔧 Kiterunner
A specialized tool for **API reconnaissance**. Traditional scanners look for files like `index.php`. Kiterunner looks for API endpoints like `/api/v1/user/create` or `/api/admin/delete`.

**How it works:**
- Uses a massive dataset of common API paths
- Brute forces endpoints that aren't documented
- Finds the hidden functions developers forgot to protect

---

## 6. Mobile Application Testing

The world has gone mobile — and so have the vulnerabilities. Hacking mobile apps is a different game entirely. You're dealing with compiled code running in someone's pocket.

#### 🔧 MobSF (Mobile Security Framework)
Your **all-in-one automated scanner** for Android and iOS apps. It's like an MRI machine for mobile applications.

**How it works:**
- Drag and drop an APK or IPA file into the dashboard
- It tears the app apart automatically

**What it checks:**
- Source code for **hard-coded secrets** (API keys, passwords)
- App permissions — is it asking for too much access?
- Insecure API calls
- Third-party library vulnerabilities

> If you're auditing an app, MobSF is your **first stop**.

---

#### 🔧 Frida
The ultimate tool for **dynamic instrumentation** — injecting your own code into a running app.

**Real-world example:**
A mobile game checks if your phone is rooted before it lets you play. With Frida, you write a tiny script that hooks into that check function and forces it to always return `false`. You are literally **rewriting the app's logic while it runs in memory**.

**Key use cases:**
- Bypass SSL pinning
- Hook into authentication functions
- Intercept encrypted traffic
- Modify runtime behavior

---

#### 🔧 Objection
Frida is powerful, but it requires writing scripts. **Objection is built on top of Frida** and lets you do all that without writing a single line of code.

**Single-command powers:**
- Explore the app's file system
- Bypass biometric authentication (Face ID) with one command
- Disable SSL pinning instantly
- Dump memory at runtime

> It's like having a master key for the app's runtime environment.

---

#### 🔧 APKTool
When you download an Android app, it's packaged as an APK file — basically a zip file full of compiled code.

**What APKTool does:**
- **Decompile** the APK back into readable resource files and Smali code
- Modify the code (remove ads, analyze logic, test for backdoors)
- **Recompile** it back into a working APK

It is the standard for taking Android apps apart and putting them back together.

---

#### 🔧 dex2jar
Android apps run on Dalvik bytecode, which is hard to read. **dex2jar converts that bytecode into a standard Java JAR file**.

**Why it matters:**
Once it's a JAR file, you can open it in a Java decompiler like **JD-GUI** and read the source code almost exactly as the developer wrote it. This is how you find:
- Hard-coded API keys
- Hidden logic flaws
- Secrets deep inside the application

---

## 7. Cloud Security Testing

> *"The cloud is just someone else's computer — but a computer with infinite potential for misconfiguration. Hacking the cloud isn't about breaking software. It's about breaking permissions."*

#### 🔧 CloudBrute
Your **cloud asset discovery tool**. Companies often deploy assets they forget about. CloudBrute hunts for these across AWS, Azure, and Google Cloud.

**What it brute forces:**
- S3 bucket names
- Azure Storage containers
- App service names

**Real-world find:**
You might run it against `targetcompany` and it finds an open S3 bucket named `target-backups` that contains their entire database dump. Files that are publicly accessible but absolutely shouldn't be.

---

#### 🔧 PACU
**The Metasploit of the cloud.** An AWS exploitation framework designed specifically for offensive security.

**Workflow:**
1. Find leaked AWS keys (e.g., using SecretFinder)
2. Load them into PACU
3. PACU automatically:
   - Enumerates all permissions
   - Attempts privilege escalation to become an administrator
   - Backdoors the account for persistent access

> Turns a single leaked AWS key into a **full cloud compromise**.

---

#### 🔧 CloudMapper
Cloud environments are messy — thousands of servers and security groups. CloudMapper takes all that configuration data and turns it into a **beautiful interactive visual map**.

**What it reveals:**
- Which servers can talk to the internet
- Which servers are connected to the database
- Weak links like a dev server with full admin access to the production database

> Spot the problem just by **looking at a picture**.

---

#### 🔧 Scout Suite
Your **multi-cloud auditor**. Whether the target is on AWS, Azure, Google Cloud, or Alibaba Cloud, Scout Suite connects and scans the configuration for security risks.

**What it checks:**
- Storage buckets open to the world
- Users without multi-factor authentication
- Overly permissive firewall rules

**Output:** A clean HTML report showing every single misconfiguration in the environment.

---

## 8. Network Scanning & Discovery

We move from URLs to IP addresses. This is where we break the network the apps live on.

#### 🔧 Nmap ⭐ (#5 Tool)
The **undisputed king** of network scanning. Every single engagement starts here.

**What it tells you:**
- What ports are open
- What operating system a server is running
- What service versions are listening on open ports
- If a vulnerable FTP service is on port 21

```bash
nmap -sV -sC -p- target.com
```

**NSE (Nmap Scripting Engine):** Can find almost anything — from default credentials to specific CVEs.

> It is precise, powerful, and the **foundation of recon**.

---

#### 🔧 Masscan
Built for **insane speed**. Can scan the entire internet — every IPv4 address — in under 6 minutes with a fast enough connection.

**Best use case:**
Finding needles in a haystack at internet scale. Want to find every server in the world vulnerable to Heartbleed right now? Use Masscan.

---

#### 🔧 Shodan
Not a scanner you run — it's a **search engine for internet-connected devices**. Shodan scans the internet 24/7. You just search.

**What you can find:**
- Open webcams
- Industrial control systems for power plants
- Unprotected databases (MongoDB, Elasticsearch)
- Default-credential routers

```
shodan search "default password" port:23
```

> It's passive. It's terrifying. And it's essential.

---

#### 🔧 RustScan
The **modern speedster** that combines the best of both worlds.

**How it works:**
1. Scans all **65,000 ports** on a target in seconds
2. Automatically **pipes open ports into Nmap** for a deep scan

Saves time without sacrificing detail. Perfect for CTFs and quick assessments.

---

#### 🔧 ZMap
Built for **large-scale internet research**. Designed to scan single ports across the entire IPv4 address space.

**Research use cases:**
- Track the spread of botnets
- Measure global adoption of HTTPS
- Find all hosts running a specific protocol

---

#### 🔧 NetFuzzer
While scanners find open doors, NetFuzzer **tries to kick them down**. A comprehensive assessment tool that:
- Actively tests protocols for weaknesses
- Fuzzes inputs to see if a service crashes or behaves unexpectedly
- Used to find **zero-days in network protocols**

---

## 9. Fuzzing — Finding Hidden Paths

> *"This is where we stop asking nicely and start hammering the server until it gives up a secret."*

Fuzzing means automation — finding hidden directories, parameters, and files that weren't meant to be seen.

#### 🔧 FFUF (Fuzz Faster U Fool) ⭐ (#3 Tool)
The **modern gold standard for web fuzzing**. Written in Go — blindingly fast.

**How it works:**
Give it a wordlist and a URL. It replaces the keyword `FUZZ` with every word in the list.

```bash
ffuf -u http://target.com/FUZZ -w wordlist.txt
```
FFUF will try `admin`, `login`, `backup`, `dev`, and thousands of others **in seconds**.

**Use cases:**
- Finding hidden directories
- Brute forcing API endpoints
- Finding backup files

---

#### 🔧 Wfuzz
The **classic Python-based fuzzer**. While slower than FFUF, it is incredibly flexible.

**Strengths:**
- Fuzz **multiple parameters simultaneously** (e.g., username AND password at the same time)
- Filter results based on HTTP response codes, word counts, or character counts
- Complex multi-parameter attack scenarios

> If you need **precision over raw speed**, Wfuzz is your tool.

---

#### 🔧 Dirsearch
A specialized tool just for **directory brute forcing** — fire and forget.

**What makes it special:**
- Comes preloaded with excellent wordlists
- Automatically checks for common extensions: `.php`, `.bak`, `.zip`, `.sql`

```bash
dirsearch -u target.com
```

> The tool you use when you want to quickly check if the developer left a **backup file** sitting in the root directory.

---

#### 🔧 Gobuster
A Go-based powerhouse that excels at two things:

| Mode | What It Does |
|------|-------------|
| `dir` | Directory brute forcing |
| `dns` | Subdomain brute forcing |
| `vhost` | Virtual host discovery |

Known for being **robust and handling massive wordlists** without crashing. Perfect for huge corporate networks — finding every subdomain (`mail.corp.com`, `dev.corp.com`) and every directory (`/images`, `/uploads`).

---

## 10. Vulnerability Scanners

These tools are like having a team of security auditors working for you 24/7.

#### 🔧 Nuclei Fuzzer
Takes Nuclei to another level. Combines **template-based scanning** with the **chaotic energy of a fuzzer**.

**What makes it a hybrid beast:**
- Not just checking for known vulnerabilities
- Actively tries to break the application by throwing unexpected data at it
- Simultaneously checks for thousands of CVEs
- Finds bugs other scanners completely miss

---

#### 🔧 Nessus
The **commercial heavyweight**. Standard in professional corporate security environments.

**By the numbers:**
- 160,000+ plugins
- Checks for missing patches, default passwords, misconfigurations, and more
- Generates beautiful executive-level reports

> Expensive, but for a professional audit, it is the **industry standard**.

---

#### 🔧 OpenVAS
The **free, open-source alternative to Nessus**. Full-featured vulnerability scanner.

**What it offers:**
- Checks thousands of devices on your network
- Can run on a Raspberry Pi or dedicated server
- Continuously monitors your network for new vulnerabilities at zero cost

> Incredibly powerful under the hood — perfect for the open-source crowd.

---

#### 🔧 Nikto
Specialized for **web server configuration**, not application logic.

**What Nikto checks:**
- 6,700+ potentially dangerous files and programs
- Outdated server versions
- Version-specific vulnerabilities
- Information-leaking Apache/IIS configurations
- Dangerous HTTP methods enabled

---

#### 🔧 WhatWeb
A lightweight scanner that **identifies technologies**. Knowing the technology stack is half the battle.

**What it tells you:**
- Is the site WordPress, React, or Angular?
- What version of PHP is running?
- What server software is in use?

> Once you know they're running an outdated version of Joomla, you know **exactly which exploit** to look for. Run this before you launch the heavy scanners.

---

## 11. Exploitation Tools

> *"We've done the recon. We've found the vulnerabilities. Now it's time to exploit them. This is the endgame where we turn a potential issue into a shell."*

#### 🔧 Commix
The **SQLMap of command injection**. If you find a parameter that lets you execute system commands (like a ping tool on a website), you feed it to Commix.

**What it automates:**
- Injecting commands into vulnerable parameters
- Bypassing input filters
- Upgrading a tiny injection point into a **full reverse shell** on the operating system

Saves hours of manual trial and error.

---

#### 🔧 Dalfox
A powerful **open-source XSS engine** written in Go. It doesn't just find XSS — it **verifies** it.

**What it does:**
- Automatically checks for bad characters
- Tests different injection points
- Generates payloads designed to bypass specific filters
- Perfect for hunting XSS at massive scale

---

#### 🔧 Metasploit
The world's most used **penetration testing framework**. Contains thousands of exploits for everything from Windows servers to Android phones.

**How simple it makes exploitation:**
1. Know a target is vulnerable (e.g., to EternalBlue)
2. Search for it in Metasploit
3. Set your target IP
4. Type `exploit`

```
msf6 > search eternalblue
msf6 > use exploit/windows/smb/ms17_010_eternalblue
msf6 exploit > set RHOSTS target.com
msf6 exploit > exploit
```

Handles all the complex payload delivery for you.

---

#### 🔧 RouterSploit
**Metasploit for IoT.** Designed specifically to exploit routers, cameras, and embedded devices.

**Key feature — AutoPwn:**
A specialized scanner that automatically throws every known router exploit at the target to see if any of them stick.

> The definitive tool for **hacking the Internet of Things**.

---

## 12. Reporting & Automation

You found a critical bug. Now you need to explain it professionally to get paid.

#### 📄 Bugcrowd & HackerOne Report Templates
Standard professional report formats used by the biggest platforms in the world.

**A good report includes:**

```
1. Summary         — What is the vulnerability?
2. Severity        — How critical is it? (CVSS score)
3. Steps to Reproduce — Exact steps, numbered clearly
4. Impact          — What can an attacker do?
5. Proof of Concept — Screenshots, videos, payloads
6. Remediation     — How to fix it
```

> Using these templates ensures your report looks professional, **gets accepted faster**, and gets you paid the bounty you deserve.

---

#### 🔧 ReconFTW
If you are doing manual recon for every single target, you are wasting your life. **ReconFTW is the solution.**

**What it does:**
A massive shell script that automates the entire reconnaissance process. Give it a domain and it runs:
- Subfinder
- Amass
- Nmap
- Nuclei
- Dozens of other tools in the perfect order

**The dream workflow:**
```bash
./reconftw.sh -d target.com -a
```
Run one command → go to sleep → wake up with a folder full of vulnerabilities.

---

#### 🔧 BountyIt
Another automation framework designed specifically for bug bounty hunters. Streamlines the full workflow from recon to reporting.

> **Don't just hack. Hack smart.** Automate the boring stuff and report like a pro.

---

## 13. ⭐ Personal Top 5 Tools

These are the 5 tools used every single day by professional bug bounty hunters. The ones that — if you took everything else away — you could still hack with.

---

### 🥇 #1 — Burp Suite
> *"If I could only have one tool, this is it."*

It's a proxy, a repeater, a scanner, and an intruder — all in one. Every critical bug, every SQL injection, every IDOR, every XSS gets found inside Burp Suite.

**It is the heart of web hacking.**

---

### 🥈 #2 — Nuclei
> *"This tool changed the game."*

Instead of manually checking for vulnerabilities, you can scan thousands of subdomains for specific CVEs in minutes. The community templates are incredible — if a new bug drops on Twitter today, you can scan for it with Nuclei by lunch.

**It is the ultimate automation tool.**

---

### 🥉 #3 — FFUF
> *"Speed matters."*

Go-to for finding hidden directories and files. Written in Go, multi-threaded, and it absolutely screams through wordlists. Whether looking for admin panels or backup files, FFUF finds them faster than anything else.

---

### 4️⃣ #4 — Amass
> *"For subdomain enumeration, nothing beats this."*

The sheer volume of assets it finds is incredible. When hunting on a big scope like Google or Uber, Amass finds the forgotten dev servers that other scanners miss.

**That's where the easy bugs live.**

---

### 5️⃣ #5 — Nmap
> *"Classic, but essential."*

Every single engagement starts here. If you don't know what ports are open, you don't know where to attack. Used for quick discovery and service versioning.

**It is the foundation of recon.**

---

> 💡 **Master these five and you can hack almost anything.**

---

## 14. Quick Reference Table

| Tool | Category | Language | Key Use Case |
|------|----------|----------|-------------|
| **Amass** | Recon | Go | Deep subdomain mapping with API data |
| **AssetFinder** | Recon | Go | Fast subdomain discovery |
| **HakCrawler** | Recon | Go | Web crawling for links & endpoints |
| **Katana** | Recon | Go | JS-aware headless crawling |
| **WaybackURLs** | Recon | Go | Historical URL discovery |
| **FindDomain** | Recon | Rust | Subdomain monitoring with alerts |
| **ParamSpider** | Recon | Python | URL parameter mining |
| **Subfinder** | Subdomain | Go | Passive subdomain enumeration |
| **Sublist3r** | Subdomain | Python | Search-engine subdomain discovery |
| **Knockpy** | Subdomain | Python | Brute force subdomain guessing |
| **Chaos** | Subdomain | Go | Bug bounty subdomain database |
| **Burp Suite** | Web Testing | Java | All-in-one web app proxy & scanner |
| **OWASP ZAP** | Web Testing | Java | Free open-source web proxy |
| **SQLMap** | Web Testing | Python | Automated SQL injection |
| **XSStrike** | Web Testing | Python | Smart XSS payload generation |
| **Nuclei** | Web Testing | Go | Template-based vuln scanning |
| **KXSS** | Web Testing | Go | Reflected XSS parameter hunting |
| **CRLFuzz** | Web Testing | Go | CRLF injection scanning |
| **Postman** | API Testing | — | Manual API request crafting |
| **GraphQL Map** | API Testing | Python | GraphQL vulnerability testing |
| **NoSQLMap** | API Testing | Python | NoSQL injection attacks |
| **JWT Tool** | API Testing | Python | JWT manipulation & cracking |
| **Kiterunner** | API Testing | Go | Hidden API endpoint brute forcing |
| **MobSF** | Mobile | Python | Android/iOS static & dynamic analysis |
| **Frida** | Mobile | — | Dynamic instrumentation & hooking |
| **Objection** | Mobile | Python | No-code Frida toolkit |
| **APKTool** | Mobile | Java | APK decompile & recompile |
| **dex2jar** | Mobile | Java | Convert Dalvik bytecode to Java |
| **CloudBrute** | Cloud | Go | Cloud asset discovery (S3, Azure) |
| **PACU** | Cloud | Python | AWS exploitation framework |
| **CloudMapper** | Cloud | Python | Cloud architecture visualization |
| **Scout Suite** | Cloud | Python | Multi-cloud security auditor |
| **Nmap** | Network | C | Port scanning & service detection |
| **Masscan** | Network | C | Ultra-fast internet-scale scanning |
| **Shodan** | Network | — | Search engine for devices |
| **RustScan** | Network | Rust | Fast port scan → auto Nmap pipe |
| **ZMap** | Network | C | Internet-wide port research |
| **NetFuzzer** | Network | — | Protocol fuzzing for zero-days |
| **FFUF** | Fuzzing | Go | Web directory & endpoint fuzzing |
| **Wfuzz** | Fuzzing | Python | Multi-parameter flexible fuzzing |
| **Dirsearch** | Fuzzing | Python | Directory brute forcing |
| **Gobuster** | Fuzzing | Go | Dir + DNS brute forcing |
| **Nuclei Fuzzer** | Vuln Scan | Go | Hybrid CVE + fuzzing scanner |
| **Nessus** | Vuln Scan | — | Enterprise vulnerability scanner |
| **OpenVAS** | Vuln Scan | — | Free open-source vuln scanner |
| **Nikto** | Vuln Scan | Perl | Web server configuration scanner |
| **WhatWeb** | Vuln Scan | Ruby | Technology fingerprinting |
| **Commix** | Exploitation | Python | Command injection to shell |
| **Dalfox** | Exploitation | Go | XSS verification engine |
| **Metasploit** | Exploitation | Ruby | Full exploitation framework |
| **RouterSploit** | Exploitation | Python | IoT/router exploitation |
| **ReconFTW** | Automation | Bash | Full recon automation pipeline |
| **BountyIt** | Automation | — | Bug bounty workflow automation |

---

## ⚙️ Recommended Setup

```bash
# Install essential Go tools
go install github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
go install github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest
go install github.com/projectdiscovery/katana/cmd/katana@latest
go install github.com/ffuf/ffuf/v2@latest
go install github.com/tomnomnom/assetfinder@latest
go install github.com/hakluke/hakrawler@latest
go install github.com/tomnomnom/waybackurls@latest
go install github.com/Findomain/Findomain@latest

# Install Python tools
pip install sqlmap
pip install sublist3r
pip install paramspider
pip install impacket

# Start Kali Linux and fire them up
sudo apt update && sudo apt install nmap burpsuite metasploit-framework gobuster dirsearch
```

---

## ⚠️ Disclaimer

This guide is intended **strictly for educational purposes and authorized security testing only**. Only use these tools on systems you own or have **explicit written permission** to test. Unauthorized hacking is illegal and can result in severe criminal penalties.

Always follow the rules of engagement for any bug bounty program you participate in.

---

> *"You learn by doing, not just watching. Fire up your Kali Linux machine, look up these tools, and actually try them out."*
>
> *"One life, one shot, make it count."*

---

*Reference: "A to Z Bug Bounty Hunting Tools" — GitHub list by Kayala, structured and expanded for study and daily use.*
