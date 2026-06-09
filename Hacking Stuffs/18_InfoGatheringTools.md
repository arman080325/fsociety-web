# 🔍 18 Information Gathering Tools Every Hacker Needs

> *"Information gathering is everything. It is 80% of the job. You can't hack what you can't find."*

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Why Reconnaissance Matters](#-why-reconnaissance-matters)
- [The Arsenal at a Glance](#-the-arsenal-at-a-glance)
- [Category 1 — Network Scanners (Active Recon)](#-category-1--network-scanners-active-recon)
  - [1. Nmap — The Gold Standard](#1-nmap--the-gold-standard)
  - [2. DragonMap — The Friendly Wrapper](#2-dragonmap--the-friendly-wrapper)
  - [3. RustScan — The Speed Demon](#3-rustscan--the-speed-demon)
  - [4. BetterCAP — The Network Controller](#4-bettercap--the-network-controller)
- [Category 2 — Passive OSINT (Shadow Recon)](#-category-2--passive-osint-shadow-recon)
  - [5. Maltego — The Connection Map](#5-maltego--the-connection-map)
  - [6. Shodan — The Search Engine for Devices](#6-shodan--the-search-engine-for-devices)
  - [7. theHarvester — The Email Harvester](#7-theharvester--the-email-harvester)
  - [8. OSINT Framework — The Master Cheat Sheet](#8-osint-framework--the-master-cheat-sheet)
- [Category 3 — Web Reconnaissance](#-category-3--web-reconnaissance)
  - [9. Recon-ng — The Modular Recon Engine](#9-recon-ng--the-modular-recon-engine)
  - [10. FinalRecon — The Fire-and-Forget Scanner](#10-finalrecon--the-fire-and-forget-scanner)
  - [11. Amass — The Subdomain Hunter](#11-amass--the-subdomain-hunter)
  - [12. FFUF — The Directory Battering Ram](#12-ffuf--the-directory-battering-ram)
  - [13. SecretFinder — The JavaScript Auditor](#13-secretfinder--the-javascript-auditor)
- [Category 4 — Document & Metadata Intelligence](#-category-4--document--metadata-intelligence)
  - [14. Pymeta — The Metadata Monster](#14-pymeta--the-metadata-monster)
- [Category 5 — Email Intelligence](#-category-5--email-intelligence)
  - [15. Mosint — The Email Interrogator](#15-mosint--the-email-interrogator)
  - [16. GHunt — The Gmail Profiler](#16-ghunt--the-gmail-profiler)
- [Category 6 — Automation & Vulnerability Scanning](#-category-6--automation--vulnerability-scanning)
  - [17. Nuclei — The Template-Based Scanner](#17-nuclei--the-template-based-scanner)
  - [18. Osmedeus — The Recon Autopilot](#18-osmedeus--the-recon-autopilot)
- [The Recon Workflow — How It All Fits Together](#-the-recon-workflow--how-it-all-fits-together)
- [The Golden Rules of Information Gathering](#-the-golden-rules-of-information-gathering)
- [Key Terms Glossary](#-key-terms-glossary)

---

## 🎯 Overview

This is a complete guide to **18 advanced information gathering (reconnaissance) tools** used by red teamers, bug bounty hunters, and security professionals to map targets before any exploitation attempt.

These tools range from **industry standards** taught in every certification course to **specialized scripts** from the darkest corners of GitHub — covering everything from mapping entire networks to extracting metadata from a PDF.

> **Important:** All tools covered here are used for **authorized penetration testing, bug bounty programs, and security research** on systems you have explicit permission to test. Unauthorized scanning or intelligence gathering against systems you don't own is illegal.

---

## 🧠 Why Reconnaissance Matters

Most people imagine hacking as a dramatic, fast-paced activity. The reality is almost the opposite.

```
  TOTAL ENGAGEMENT TIME BREAKDOWN (Professional Red Team)

  ████████████████████████████████████████  80% — Reconnaissance
  ████████                                  15% — Exploitation
  ██                                         5% — Post-exploitation & Reporting
```

> *"You can't exploit a server if you don't know it exists. You can't phish a CEO if you don't know their email address."*

Information gathering is **not a preliminary step**. It is the primary step. Everything else flows from what you find here.

**Reconnaissance falls into two categories:**

| Type | What It Means | Risk of Detection |
|------|---------------|-------------------|
| **Active Recon** | Directly touching and probing the target (scanning ports, sending packets) | Higher — generates traffic logs |
| **Passive Recon** | Gathering intel without ever contacting the target server | Near zero — you're just reading public data |

---

## 🗺️ The Arsenal at a Glance

| # | Tool | Category | Primary Use |
|---|------|----------|-------------|
| 1 | **Nmap** | Network Scanner | Port scanning, OS detection, service fingerprinting |
| 2 | **DragonMap** | Network Scanner | Nmap wrapper with menu-based interface |
| 3 | **RustScan** | Network Scanner | Ultra-fast port scanning → auto-pipes to Nmap |
| 4 | **BetterCAP** | Network Control | MITM attacks, live network monitoring |
| 5 | **Maltego** | Passive OSINT | Visual link analysis and relationship mapping |
| 6 | **Shodan** | Passive OSINT | Internet-wide device and service discovery |
| 7 | **theHarvester** | Passive OSINT | Email address and subdomain harvesting |
| 8 | **OSINT Framework** | Passive OSINT | Categorized directory of 1000+ free OSINT tools |
| 9 | **Recon-ng** | Web Recon | Modular reconnaissance framework |
| 10 | **FinalRecon** | Web Recon | All-in-one web footprint scanner |
| 11 | **Amass** | Web Recon | Deep subdomain enumeration |
| 12 | **FFUF** | Web Recon | High-speed directory and path brute-forcing |
| 13 | **SecretFinder** | Web Recon | API key and credential extraction from JavaScript |
| 14 | **Pymeta** | Document Intel | Metadata extraction from public documents |
| 15 | **Mosint** | Email Intel | Email verification, social links, breach data |
| 16 | **GHunt** | Email Intel | Deep profiling from Gmail addresses |
| 17 | **Nuclei** | Vulnerability Scanning | Template-based automated vulnerability detection |
| 18 | **Osmedeus** | Full Automation | End-to-end recon workflow orchestration |

---

## 📡 Category 1 — Network Scanners (Active Recon)

> *"These tools are loud, powerful, and tell you exactly where the doors and windows are."*

---

### 1. Nmap — The Gold Standard

**GitHub:** `https://github.com/nmap/nmap` | **Install:** Pre-installed on Kali Linux

> *"If you don't know Nmap, you aren't a hacker. You're a tourist."*

**Nmap (Network Mapper)** is the single most important tool in the reconnaissance toolkit. It sends specially crafted packets to a target and analyzes the responses to build a complete picture of the target's exposed services.

**How it works — the echolocation analogy:**

```
  NMAP                             TARGET SERVER
    │                                   │
    │── Packet ──────────────────────► │
    │                                   │ (Server responds differently
    │◄── Response ──────────────────── │  depending on what's running)
    │                                   │
    └── Nmap interprets response ──────►
        "Port 22 open: OpenSSH 8.2
         Port 80 open: Apache 2.4.49
         Port 3306 open: MySQL 5.7
         OS: Ubuntu Linux 20.04"
```

**Essential Nmap Flags:**

| Flag | What It Does |
|------|-------------|
| `-sS` | Stealth SYN scan — half-open, rarely logged |
| `-sV` | Detect service versions running on each port |
| `-O` | Detect the target's operating system |
| `-A` | Aggressive scan — OS, versions, scripts, traceroute |
| `-T4` | Speed setting (T1=slow/stealthy → T5=fast/loud) |
| `-p-` | Scan all 65,535 ports (not just the top 1000) |
| `--script vuln` | Run vulnerability detection scripts against found services |

**Example command:**
```bash
nmap -A -T4 target.com
# Output: Open ports, service versions, OS type,
# flags outdated/vulnerable software (e.g., Apache 2.4.49, Windows Server 2008)
```

---

### 2. DragonMap — The Friendly Wrapper

**Use case:** When you want Nmap's power without memorizing every flag

**DragonMap** is a wrapper script around Nmap that presents all its major scan types in a simple **menu-based terminal interface**. Instead of constructing long flag strings from memory, you launch DragonMap and select:

```
  ┌─────────────────────────────────┐
  │        DRAGONMAP MENU           │
  ├─────────────────────────────────┤
  │  [1] Quick Scan                 │
  │  [2] Intense Scan               │
  │  [3] Stealth Scan               │
  │  [4] UDP Scan                   │
  │  [5] Full Port Scan             │
  │  [6] Vulnerability Scan         │
  └─────────────────────────────────┘
```

**Best for:** Beginners building muscle memory, or experienced operators who want fast results without typing.

> *"Is it cheating? Maybe. Do I care? No. Efficiency is key."*

---

### 3. RustScan — The Speed Demon

**GitHub:** `https://github.com/RustScan/RustScan`

**The problem with Nmap:** It's thorough, but it's slow when scanning all 65,535 ports.

**RustScan's solution:** Do the fast part (port discovery) in its own blazing engine, then hand off to Nmap for the smart part (service identification).

```
  TRADITIONAL NMAP FULL SCAN:     ████████████████████████  ~20 minutes
  RUSTSCAN → NMAP PIPELINE:       ███  ~3 seconds + Nmap analysis
```

**The workflow:**
```bash
rustscan -a target.com -- -sV -sC
# Step 1: RustScan discovers all open ports in <3 seconds
# Step 2: Automatically pipes findings into Nmap
# Step 3: Nmap runs its intelligence scripts only on open ports
# Result: Full Nmap-quality output at RustScan speed
```

> *"You get the speed of a fast scanner and the intelligence of Nmap scripts in one smooth workflow. It's the modern standard for fast recon."*

---

### 4. BetterCAP — The Network Controller

**GitHub:** `https://github.com/bettercap/bettercap`

**BetterCAP** is a full penetration testing toolkit specializing in **man-in-the-middle attacks** and **real-time network monitoring**. It effectively lets you become the router on any network you're connected to.

**What it can do:**

| Capability | Description |
|------------|-------------|
| **Network Mapping** | Live dashboard of every device connected to the network |
| **Packet Sniffing** | Capture and inspect data packets in real time |
| **ARP Spoofing** | Position yourself as the man-in-the-middle silently |
| **Traffic Redirection** | Reroute target traffic through your machine |
| **Credential Capture** | Extract passwords from unencrypted protocols |
| **Web Interface** | Futuristic real-time dashboard for monitoring |

> *"If you want to understand man-in-the-middle attacks, this is the tool you learn."*

---

## 👁️ Category 2 — Passive OSINT (Shadow Recon)

> *"We are gathering intel without ever touching the target server. We are watching from the shadows."*

These tools generate **zero traffic** to the target. You are reading publicly available information — the target has no idea you exist.

---

### 5. Maltego — The Connection Map

**Website:** `https://www.maltego.com`

> *"You know those scenes in crime shows where the detective has a massive wall covered in photos, red string, and newspaper clippings? That is Maltego."*

Maltego is a **visual link analysis tool** that maps relationships between entities — people, domains, email addresses, IP addresses, organizations, and social media profiles — and renders them as an interactive graph.

**How it works:**
```
  INPUT: "targetcompany.com"
         │
         ▼
  Maltego scours the internet...
         │
         ▼
  ┌──────────────────────────────────────────────┐
  │           MALTEGO GRAPH OUTPUT               │
  │                                              │
  │  [targetcompany.com]                         │
  │       ├── [mail.targetcompany.com]           │
  │       ├── [dev.targetcompany.com]            │
  │       ├── [john.smith@targetcompany.com]     │
  │       │        └── [LinkedIn: John Smith]    │
  │       │        └── [Twitter: @johnsmith]     │
  │       └── [Hosted on: AWS us-east-1]         │
  │                └── [AS14618 Amazon.com]      │
  └──────────────────────────────────────────────┘
```

You can drag and drop a person's name onto the graph and watch it auto-populate with their social profiles, email addresses, and organizational connections — **finding relationships you would never spot in a text file**.

---

### 6. Shodan — The Search Engine for Devices

**Website:** `https://www.shodan.io`

> *"Google searches for websites. Shodan searches for devices."*

While Google indexes web pages, **Shodan** continuously crawls the entire internet, pinging every IP address it can find — cataloguing every exposed device and service it discovers.

**What Shodan has indexed:**

| Device Type | Why It Matters |
|-------------|---------------|
| Webcams | Live feeds often accessible with no authentication |
| Industrial control systems | Power plants, water treatment, factory floor controls |
| Home routers | Default credentials, exposed admin panels |
| Baby monitors | Unsecured video streams |
| Traffic light controllers | Municipal infrastructure |
| Servers | Exposed databases, remote desktop, outdated services |

**Example Shodan queries:**

```
port:3389 city:"London"
→ Returns thousands of Windows machines with Remote Desktop open in London

product:"Apache httpd" version:"2.4.49"
→ Returns every server on the internet running a specific vulnerable Apache version

default password
→ Returns devices still using factory credentials
```

> *"You don't even have to scan the target yourself. You just go to Shodan and type a query. It is terrifyingly effective."*

---

### 7. theHarvester — The Email Harvester

**GitHub:** `https://github.com/laramies/theHarvester`

**theHarvester** scrapes multiple public sources simultaneously to collect **email addresses and subdomains** belonging to a target organization — the core data needed for phishing campaigns and social engineering attacks.

**Sources it queries:**

- Google, Bing, Yahoo search results
- LinkedIn employee listings
- PGP key servers
- DNS records
- Certificate transparency logs

**Example command:**
```bash
theHarvester -d targetcompany.com -b all
# Queries all available sources
# Returns: 500 valid employee email addresses + subdomains
# Ready for use in a phishing campaign
```

**Output example:**
```
[*] Emails found: 487
john.smith@targetcompany.com
sarah.jones@targetcompany.com
admin@targetcompany.com
it-support@targetcompany.com
...

[*] Subdomains found: 23
mail.targetcompany.com
dev.targetcompany.com
vpn.targetcompany.com
...
```

---

### 8. OSINT Framework — The Master Cheat Sheet

**Website:** `https://osintframework.com`

**OSINT Framework** is not a script you install — it's a **website that categorizes thousands of free OSINT tools** into an interactive tree diagram, organized by use case.

**Categories include:**

| Category | Examples |
|----------|---------|
| Username tracking | Find accounts across 500+ social platforms |
| Email investigation | Verification, breach lookup, social linkage |
| Domain & IP research | WHOIS, DNS history, hosting details |
| Image analysis | Reverse image search, EXIF extraction |
| Financial records | Company filings, crypto wallet tracking |
| Vehicle & transport | Flight tracking, vessel AIS, license plates |
| Dark web research | .onion search, paste site monitoring |

> *"If you ever feel stuck during recon and don't know where to look next, just open the OSINT Framework website and click through the interactive tree. It's the ultimate cheat sheet."*

---

## 🌐 Category 3 — Web Reconnaissance

> *"Companies have massive digital footprints — and they always leave something exposed."*

---

### 9. Recon-ng — The Modular Recon Engine

**GitHub:** `https://github.com/lanmaster53/recon-ng`

> *"If you love Metasploit, you will love Recon-ng. It looks and feels exactly the same."*

**Recon-ng** is a full-featured web reconnaissance framework with a **marketplace of installable modules** — each targeting a specific data source or reconnaissance task.

**Workflow:**
```bash
recon-ng
[recon-ng] > marketplace install hackertarget
[recon-ng] > modules load hackertarget
[recon-ng] > set SOURCE targetcompany.com
[recon-ng] > run
# Results stored in built-in database
# Build cumulative intelligence profiles over multiple sessions
```

**Advantages over manual recon:**
- All findings stored in a **structured database** (no scattered text files)
- Modules cover network mapping, social media scraping, DNS analysis, and more
- Clean, professional output suitable for reports

---

### 10. FinalRecon — The Fire-and-Forget Scanner

**GitHub:** `https://github.com/thewhiteh4t/FinalRecon`

**FinalRecon** is an all-in-one web intelligence tool. Give it a URL, walk away. Come back to a complete external footprint.

**What it extracts in a single run:**

| Data Type | Details |
|-----------|---------|
| HTTP Headers | Server type, security headers, technology stack |
| WHOIS Info | Domain registration, registrar, expiry dates |
| SSL Certificate | Issuer, expiry, SANs (reveals related domains) |
| DNS Records | A, MX, NS, TXT, CNAME records |
| Subdomain Enumeration | Hidden subdomains via multiple sources |
| Directory Crawling | Hidden paths and files on the web server |

```bash
finalrecon --full https://targetcompany.com
# Walk away. Come back to a complete formatted report.
```

> *"It turns hours of manual work into a few seconds of automated glory."*

---

### 11. Amass — The Subdomain Hunter

**GitHub:** `https://github.com/owasp-amass/amass` | **Maintained by:** OWASP

**Amass** is the most thorough subdomain enumeration tool available, maintained by OWASP (the web security standards body).

**Why subdomains matter:**

```
  targetcompany.com          ← Hardened. Security team watches this.
  dev-test.targetcompany.com ← Running Jenkins with no password.
  internal.targetcompany.com ← Exposed staging database.
  legacy.targetcompany.com   ← Abandoned server running PHP 5.2.
```

The main domain is usually secure. The forgotten subdomains are where breaches happen.

**Amass techniques:**

| Method | Description |
|--------|-------------|
| DNS Brute-Forcing | Try millions of subdomain name combinations |
| SSL Certificate Scraping | Certificates often list related subdomains |
| Recursive Search | Finds subdomains of subdomains |
| API Queries | Queries Shodan, VirusTotal, and other sources |

```bash
amass enum -d targetcompany.com
# Returns: Complete map of all discoverable subdomains
```

---

### 12. FFUF — The Directory Battering Ram

**GitHub:** `https://github.com/ffuf/ffuf` *(Fuzz Faster U Fool)*

**FFUF** is the current gold standard for **directory and path brute-forcing** — hammering a web server with thousands of common path names to find hidden endpoints.

```
  FFUF hammers: targetcompany.com/[WORDLIST]
                               │
        ┌──────────────────────┼──────────────────────┐
        ▼                      ▼                      ▼
  /admin    → 200 OK ✅  /backup  → 403 ✅  /login   → 200 OK ✅
  /about    → 404 ✗    /public  → 200 ✅  /uploads → 200 OK ✅
  /secret   → 200 OK ✅  /api     → 200 ✅  /config  → 403 ✅
```

**Why FFUF over older tools:**

| Feature | FFUF | Older Tools (DirBuster, etc.) |
|---------|------|-------------------------------|
| Language | Go (compiled, fast) | Java / Python (slower) |
| Threading | Massively multi-threaded | Limited |
| Speed | Thousands of requests/second | Hundreds |
| Filtering | Flexible response filtering | Basic |

```bash
ffuf -w /wordlists/common.txt -u https://targetcompany.com/FUZZ
# Finds: /admin, /backup, /internal, /.git, /api/v1, /config.php
```

> *"If the old tools were a polite knock, FFUF is a battering ram."*

---

### 13. SecretFinder — The JavaScript Auditor

**GitHub:** `https://github.com/m4ll0k/SecretFinder`

Modern websites are built with JavaScript. Developers are human. They make mistakes — and sometimes those mistakes involve leaving **sensitive credentials directly inside client-side code** that anyone can read.

**What SecretFinder hunts for in `.js` files:**

| Secret Type | Real-World Impact |
|-------------|------------------|
| AWS Access Keys | Full control of cloud infrastructure |
| API Keys (Google, Stripe, Twilio) | Unauthorized service usage, data access |
| OAuth Tokens | Account takeover without credentials |
| Private Keys | Cryptographic identity compromise |
| Database connection strings | Direct database access |
| Internal API endpoints | Map of hidden backend infrastructure |

```bash
python3 SecretFinder.py -i https://targetcompany.com -e
# Scans all JS files on the site
# Returns: Any exposed credentials or sensitive strings
```

> *"Finding an AWS key in a JS file is like finding the keys to the kingdom under the doormat. It happens way more often than you think."*

---

## 📄 Category 4 — Document & Metadata Intelligence

> *"Data isn't just on web pages. It's inside documents. Every PDF, Word doc, and image tells a story if you know how to listen."*

---

### 14. Pymeta — The Metadata Monster

**GitHub:** `https://github.com/m8r0wn/pymeta`

Every document a company publishes — annual reports, press releases, whitepapers, job postings — carries **hidden metadata** that was never meant to be public.

**How Pymeta works:**
```
  INPUT: targetcompany.com
         │
         ▼
  Pymeta crawls the entire website...
  Finds and downloads: all PDFs, Word docs, Excel sheets
         │
         ▼
  Extracts metadata from every file:
  ┌───────────────────────────────────────────────────────┐
  │  File: Q3_Financial_Report.pdf                        │
  │  ─────────────────────────────────────────────────── │
  │  Author:        jsmith                  ← Username    │
  │  Last Modified: sarah.jones             ← Username    │
  │  Software:      Microsoft Word 2016                   │
  │  Company:       TargetCorp Internal                   │
  │  Template Path: \\FILESERVER01\templates\corp.dotx    │
  │                          ↑                            │
  │              Internal server hostname revealed        │
  └───────────────────────────────────────────────────────┘
```

**What metadata reveals:**

| Metadata Field | Intelligence Value |
|----------------|-------------------|
| Author username | Valid username for password attacks |
| Internal file paths | Internal server names and directory structure |
| Software version | Identifies unpatched software versions |
| GPS coordinates (images) | Physical location of where photo was taken |
| Printer/scanner info | Internal network hardware details |

> *"Pymeta builds a map of the internal network just by reading the company's public reports."*

---

## 📧 Category 5 — Email Intelligence

---

### 15. Mosint — The Email Interrogator

**GitHub:** `https://github.com/alpkeskin/mosint`

**Mosint** is a high-speed email investigation tool that goes far beyond simply verifying if an email address exists.

**What Mosint does with a single email address:**

```
  INPUT: john.smith@targetcompany.com
         │
         ├── Verifies: Does this inbox actually exist?
         ├── Social:   Is it linked to Twitter, Facebook, GitHub?
         ├── Breaches: Is this email in any known data breaches?
         ├── Password: Is a cracked password for this email on the dark web?
         └── Services: What platforms is this email registered on?
         │
         ▼
  OUTPUT: Complete intelligence profile in seconds
```

**Use case:** Before launching a targeted phishing or social engineering campaign, Mosint tells you everything you need to craft a convincing attack — or to assess your own exposure.

---

### 16. GHunt — The Gmail Profiler

**GitHub:** `https://github.com/mxrch/GHunt`

> *"This tool is terrifyingly effective."*

**GHunt** exploits Google's interconnected services to extract a comprehensive profile from a single Gmail address — using only publicly available data that Google exposes through its own APIs.

**What GHunt can extract from a Gmail address:**

| Data Point | Source |
|------------|--------|
| Profile photo | Google Account |
| Full name (if public) | Google Profile |
| Google Maps reviews and photos | Maps activity |
| YouTube channel | Google Account links |
| Phone model | Google account metadata |
| Approximate physical location | Activity and review geography |
| Last active timestamp | Account activity indicators |
| Linked Google services | Calendar, Drive, Photos (if public) |

```bash
python3 ghunt.py email target@gmail.com
# Returns: Full intelligence profile from a Gmail address
```

> *"It turns a simple email address into a full profile of a person's life."*

---

## ⚙️ Category 6 — Automation & Vulnerability Scanning

> *"These are the heavy hitters that automate everything."*

---

### 17. Nuclei — The Template-Based Scanner

**GitHub:** `https://github.com/projectdiscovery/nuclei`

> *"This tool changed the game for bug bounty hunters."*

Traditional vulnerability scanners use **hard-coded checks** — a fixed list of vulnerabilities they look for. When a new CVE (Common Vulnerability and Exposure) is discovered, you have to wait for the vendor to update the tool.

**Nuclei's approach:** YAML-based **templates** that the community writes and shares.

```yaml
# Example Nuclei template (simplified)
id: apache-log4j-rce
info:
  name: Apache Log4j RCE (CVE-2021-44228)
  severity: critical

requests:
  - method: GET
    path:
      - "{{BaseURL}}"
    headers:
      X-Api-Version: "${jndi:ldap://{{interactsh-url}}/a}"
    matchers:
      - type: word
        words:
          - "Interactsh" # Confirms successful callback
```

**Why Nuclei dominates:**

| Feature | Traditional Scanners | Nuclei |
|---------|---------------------|--------|
| Update speed | Days/weeks after CVE | Hours — community writes templates same day |
| Customization | Limited | Write your own template in minutes |
| Scale | Scan one target | Blast one template across thousands of URLs |
| Community | Vendor-controlled | 9,000+ community templates and growing |

```bash
nuclei -u https://targetcompany.com -t nuclei-templates/
# Runs all community templates against the target
# New CVE drops today → Template available by tomorrow
```

---

### 18. Osmedeus — The Recon Autopilot

**GitHub:** `https://github.com/j3ssie/osmedeus`

> *"This isn't just a tool, it's an engine."*

**Osmedeus** is the final boss — a workflow orchestration engine that chains all the other tools together into a fully automated recon pipeline.

**What one Osmedeus command triggers:**

```
  osmedeus scan -t targetcompany.com
         │
         ▼
  ┌─────────────────────────────────────────────────────┐
  │              OSMEDEUS PIPELINE                      │
  ├─────────────────────────────────────────────────────┤
  │  Phase 1: Subdomain Enumeration (Amass, subfinder)  │
  │  Phase 2: Port Scanning (Nmap, RustScan)            │
  │  Phase 3: Web Service Detection                     │
  │  Phase 4: Screenshot all live web apps              │
  │  Phase 5: Directory brute-forcing (FFUF)            │
  │  Phase 6: JavaScript secret scanning                │
  │  Phase 7: Vulnerability scanning (Nuclei)           │
  │  Phase 8: Generate formatted report                 │
  └─────────────────────────────────────────────────────┘
         │
         ▼
  Complete intelligence package — while you sleep
```

> *"It effectively puts your reconnaissance on autopilot, doing the work of a whole team while you sleep."*

---

## 🔄 The Recon Workflow — How It All Fits Together

```
  TARGET: targetcompany.com
          │
          ▼
  ┌─── PASSIVE RECON ──────────────────────────────────┐
  │  Shodan      → Index of exposed services           │
  │  Maltego     → Map of relationships and people     │
  │  theHarvester→ Email list for social engineering   │
  │  OSINT FW    → Gap fill with specialist tools      │
  └────────────────────────────────────────────────────┘
          │
          ▼
  ┌─── WEB RECON ──────────────────────────────────────┐
  │  Amass       → All subdomains discovered           │
  │  FinalRecon  → Headers, SSL, WHOIS, DNS            │
  │  FFUF        → Hidden directories and endpoints    │
  │  SecretFinder→ API keys in JavaScript files        │
  │  Pymeta      → Internal data from public documents │
  └────────────────────────────────────────────────────┘
          │
          ▼
  ┌─── ACTIVE SCANNING ────────────────────────────────┐
  │  RustScan    → All 65k ports discovered fast       │
  │  Nmap        → Services, versions, OS fingerprint  │
  │  BetterCAP   → Network traffic analysis (if local) │
  └────────────────────────────────────────────────────┘
          │
          ▼
  ┌─── VULNERABILITY ASSESSMENT ───────────────────────┐
  │  Nuclei      → Template-based CVE scanning         │
  │  Mosint/GHunt→ Deep email intelligence             │
  └────────────────────────────────────────────────────┘
          │
          ▼
  ┌─── FULL AUTOMATION ────────────────────────────────┐
  │  Osmedeus    → Orchestrate all of the above        │
  └────────────────────────────────────────────────────┘
          │
          ▼
  COMPLETE TARGET PROFILE — ready for authorized testing
```

---

## 📏 The Golden Rules of Information Gathering

> *"A tool is only as good as the hacker using it. You can run Nmap all day, but if you don't understand what an open port means, you're just staring at text on a screen."*

**1. Understand before you run**
Don't just download tools and execute them blindly. Read the code. Understand what each tool is actually doing at the protocol level. A tool that finds an open port is useless if you don't know what to do with that information.

**2. Passive before active**
Always exhaust passive intelligence sources before generating any traffic toward the target. Why risk leaving logs when the information might already be publicly available?

**3. Information gathering is not the attack**
Recon is about reading the signs — finding the unlocked window, the forgotten server, the developer who left credentials in a script. You are building a picture. The exploitation comes after.

**4. Authorization is everything**
Every tool in this guide is used legally only when you have **explicit written authorization** to test the target system. Unauthorized scanning is illegal in most jurisdictions, regardless of intent.

**5. Document everything**
In professional engagements, findings are only valuable if they're documented. Every tool, every finding, every timestamp needs to be recorded for the final report.

---

## 📖 Key Terms Glossary

| Term | Definition |
|------|------------|
| **Reconnaissance (Recon)** | The first phase of a penetration test — gathering intelligence about a target before any exploitation attempt |
| **OSINT** | Open Source Intelligence — collecting information from publicly available sources without direct contact with the target |
| **Active Recon** | Reconnaissance that involves directly contacting or probing the target (port scanning, service detection) |
| **Passive Recon** | Reconnaissance that involves only reading publicly available data — zero contact with the target |
| **Port Scanning** | Probing a target's network ports to identify which services are running and exposed |
| **Subdomain Enumeration** | Discovering all subdomains belonging to a target domain (often reveals forgotten, vulnerable systems) |
| **Directory Brute-Forcing** | Requesting many common URL paths against a web server to find hidden directories and files |
| **Metadata** | Hidden data embedded in files (PDFs, images, documents) that can reveal usernames, internal paths, and software versions |
| **Man-in-the-Middle (MITM)** | An attack where the attacker intercepts communication between two parties without their knowledge |
| **CVE** | Common Vulnerabilities and Exposures — a public database of known security vulnerabilities with standardized IDs |
| **DNS** | Domain Name System — translates domain names into IP addresses |
| **Wordlist** | A file containing thousands of common strings (usernames, passwords, directory names) used for brute-force attacks |
| **ARP Spoofing** | Sending fake ARP packets to associate the attacker's MAC address with a legitimate IP on a local network |
| **SSL/TLS** | Protocols that encrypt web traffic — the technology behind HTTPS |
| **Template (Nuclei)** | A YAML file defining how to detect a specific vulnerability — allows community-driven rapid updates |
| **Red Team** | A group authorized to simulate realistic attacks on an organization to test its defenses |
| **Bug Bounty** | A program where organizations pay security researchers to responsibly report vulnerabilities they discover |
| **Phishing** | A social engineering attack using deceptive emails or websites to steal credentials or trigger actions |
| **API Key** | A secret credential used to authenticate access to an API — exposure gives unauthorized access to the service |
| **Workflow Orchestration** | Automatically chaining multiple tools together in a defined sequence to automate complex multi-step processes |

---

<div align="center">

---

*"You can't hack what you can't find.*
*You can't exploit a server if you don't know it exists."*

---

**Stay curious. Stay ethical.**
**One life. One shot. Make it count.**

</div>