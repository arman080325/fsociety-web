/* ============================================================
   repos-data.js — single source of truth for ALL community repos
   Add a repo  ->  add ONE object to REPOS below.
   - owner/repo : drives the GitHub link AND the card image (auto)
   - cats       : array of category ids (a repo can be in several)
   - stars      : a NUMBER (e.g. 35000) — formatted for display automatically
   - featured   : true  -> shows on the main page top-3
   ============================================================ */

const REPO_CATEGORIES = [
  { id:"recon",     label:"Recon & Scanning" },
  { id:"web",       label:"Web App" },
  { id:"exploit",   label:"Exploitation" },
  { id:"wireless",  label:"Wireless" },
  { id:"passwords", label:"Password Attacks" },
  { id:"post",      label:"Post-Exploitation" },
  { id:"c2",        label:"C2 Frameworks" },
  { id:"osint",     label:"OSINT" },
  { id:"re",        label:"Reverse Engineering" },
  { id:"forensics", label:"Forensics" },
  { id:"wordlists", label:"Wordlists & Payloads" },
  { id:"cloud",     label:"Cloud & Container" },
  { id:"mobile",    label:"Mobile" },
  { id:"misc",      label:"Misc / Utilities" },
];

/* Star counts are approximate snapshots — refresh them with the
   optional GitHub-API script (see the chat notes). */
const REPOS = [
  { owner:"rapid7", repo:"metasploit-framework", lang:"Ruby", stars:35000, featured:true,
    cats:["exploit","post"], desc:"The exploitation framework — exploits, payloads, post-ex. MCP-integrated on the box." },
  { owner:"danielmiessler", repo:"SecLists", lang:"PHP", stars:60000, featured:true,
    cats:["wordlists"], desc:"The security tester's companion — usernames, passwords, payloads, fuzzing lists." },
  { owner:"projectdiscovery", repo:"nuclei", lang:"Go", stars:21000, featured:true,
    cats:["recon","web"], desc:"Fast, template-based vulnerability scanner. Huge community template library." },

  { owner:"nmap", repo:"nmap", lang:"C", stars:10000, cats:["recon"],
    desc:"The network mapper — host discovery, port scanning, service & OS detection." },
  { owner:"sqlmapproject", repo:"sqlmap", lang:"Python", stars:33000, cats:["web","exploit"],
    desc:"Automatic SQL injection detection and exploitation." },
  { owner:"swisskyrepo", repo:"PayloadsAllTheThings", lang:"Python", stars:62000, cats:["wordlists","web"],
    desc:"Payloads & bypasses for web app security — XSS, SQLi, SSRF, RCE." },
  { owner:"carlospolop", repo:"PEASS-ng", lang:"Shell", stars:17000, cats:["post"],
    desc:"LinPEAS / WinPEAS — privilege-escalation enumeration scripts." },
  { owner:"bettercap", repo:"bettercap", lang:"Go", stars:17000, cats:["wireless","recon"],
    desc:"Swiss-army knife for network attacks — ARP/DNS spoofing, BLE, WiFi." },
  { owner:"aircrack-ng", repo:"aircrack-ng", lang:"C", stars:5000, cats:["wireless","passwords"],
    desc:"WiFi security auditing — WPA/WPA2 capture and cracking suite." },
  { owner:"owasp-amass", repo:"amass", lang:"Go", stars:12000, cats:["recon","osint"],
    desc:"In-depth attack-surface mapping and asset discovery." },
  { owner:"projectdiscovery", repo:"subfinder", lang:"Go", stars:10000, cats:["recon","osint"],
    desc:"Fast passive subdomain enumeration tool." },
  { owner:"projectdiscovery", repo:"httpx", lang:"Go", stars:8000, cats:["recon"],
    desc:"Fast, multi-purpose HTTP toolkit for probing services." },
  { owner:"ffuf", repo:"ffuf", lang:"Go", stars:13000, cats:["web","recon"],
    desc:"Fast web fuzzer — directories, vhosts, parameters." },
  { owner:"OJ", repo:"gobuster", lang:"Go", stars:10000, cats:["recon","web"],
    desc:"Directory, DNS and vhost busting tool written in Go." },
  { owner:"SpecterOps", repo:"BloodHound", lang:"TypeScript", stars:11000, cats:["post"],
    desc:"Active Directory attack-path mapping using graph theory." },
  { owner:"Pennyw0rth", repo:"NetExec", lang:"Python", stars:4000, cats:["post"],
    desc:"Network execution tool (the maintained CrackMapExec successor)." },
  { owner:"hashcat", repo:"hashcat", lang:"C", stars:21000, cats:["passwords"],
    desc:"The world's fastest password recovery / GPU cracking tool." },
  { owner:"openwall", repo:"john", lang:"C", stars:10000, cats:["passwords"],
    desc:"John the Ripper — versatile password cracker for many hash types." },
  { owner:"vanhauser-thc", repo:"thc-hydra", lang:"C", stars:11000, cats:["passwords"],
    desc:"Fast login cracker — SSH, FTP, HTTP, SMB and 50+ protocols." },
  { owner:"NationalSecurityAgency", repo:"ghidra", lang:"Java", stars:52000, cats:["re","forensics"],
    desc:"NSA's reverse-engineering framework — disassembly & decompilation." },
  { owner:"radareorg", repo:"radare2", lang:"C", stars:21000, cats:["re"],
    desc:"Unix-like reverse-engineering framework and command-line toolset." },
  { owner:"sherlock-project", repo:"sherlock", lang:"Python", stars:60000, cats:["osint"],
    desc:"Hunt down social-media accounts by username across platforms." },
  { owner:"laramies", repo:"theHarvester", lang:"Python", stars:11000, cats:["osint","recon"],
    desc:"E-mails, subdomains and names harvester for early recon." },
  { owner:"BishopFox", repo:"sliver", lang:"Go", stars:9000, cats:["c2","post"],
    desc:"Adversary-emulation / C2 framework — cross-platform implants." },
  { owner:"s0md3v", repo:"XSStrike", lang:"Python", stars:14000, cats:["web"],
    desc:"Advanced XSS detection suite with smart payload generation." },
  { owner:"maurosoria", repo:"dirsearch", lang:"Python", stars:12000, cats:["web","recon"],
    desc:"Web path brute-forcer for content discovery." },
  { owner:"volatilityfoundation", repo:"volatility3", lang:"Python", stars:3000, cats:["forensics"],
    desc:"Advanced memory-forensics framework." },
  { owner:"wifiphisher", repo:"wifiphisher", lang:"Python", stars:14000, cats:["wireless"],
    desc:"Rogue access-point framework for red-team WiFi assessments." },
];

/* expose for both pages */
window.REPO_CATEGORIES = REPO_CATEGORIES;
window.REPOS = REPOS;