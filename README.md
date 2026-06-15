# ⬡ fsociety-web — ArmanXploits Cybersecurity Portfolio

> *"You're only free when you realize you've got nothing to lose."*
> — Mr. Robot

A cinematic, dark-themed cybersecurity portfolio built for **ethical hackers, pentesters, and security researchers in progress**. Themed around [fsociety / Mr. Robot](https://en.wikipedia.org/wiki/Mr._Robot) with a polished operator aesthetic — electric red, acid green, cyber cyan, and violet on a deep void-black background — with genuine educational content, not just decoration.

**Built by:** Arman Ahemad Khan · [@armanxploits](https://github.com/arman080325)  
**Live:** [armanxploits.fsociety-web.vercel.app](https://fsociety-web.vercel.app) <br/>
**Status:** Active — 4th-year CS engineering student, cybersecurity intern, pentester in progress.

---

## ✦ Feature Overview

| Section | What It Does |
|---|---|
| **Boot Sequence** | Simulated terminal boot with skip option |
| **Cursor Trail** | Mr. Robot–style particle trail with click burst and glitch chars |
| **Threat Ticker** | Live-scrolling CVE severity feed at the bottom of the screen |
| **Hero** | Animated particle canvas, glitch title, cycling terminal, floating stats |
| **whoami** | Identity card, animated skill bars, fsociety box hardware specs |
| **the path** | Interactive career roadmap — 7 phases, clickable nodes with dossier panels, localStorage progress |
| **tutorials** | Tabbed step-by-step walkthroughs (Recon, Web Exploit, Wireless, PrivEsc, Social Eng, Forensics) |
| **arsenal** | Filterable toolkit — 28+ tools across recon, exploit, web, wireless, AD categories |
| **toolbox** | Browser-side interactive tools: payload encoder/decoder, hash identifier, CVE lookup, regex tester, port reference |
| **journey** | Chronological cybersecurity timeline (2021 → now) |
| **field notes** | Tabbed methodology notes (MitM, WiFi, Web, Recon, PrivEsc, Social Eng, Forensics) |
| **attack tree** | Animated top-down SVG attack chain visualiser — Web App, Network, Wireless scenarios |
| **proving ground** | CTF/lab progress — PortSwigger, XSS Game, TryHackMe, HackTheBox |
| **repos** | Personal repos + curated community security repos |
| **contact** | Social links + live ping terminal widget |
| **Keyboard shortcuts** | `?` opens shortcut panel; `G+key` for fast nav |
| **Scroll progress bar** | Gradient bar at top tracking page progress |

---

## 🎨 Design System

### Colour Palette

| Variable | Hex | Role |
|---|---|---|
| `--signal` | `#ff2d2d` | Primary accent — red alerts, nodes, titles |
| `--phosphor` | `#39ff7e` | Terminal green — cleared states, live status |
| `--cyan` | `#00e5ff` | Cyan — secondary accents, links |
| `--purple` | `#bf5fff` | Purple — attack tree exploitation nodes |
| `--ember` | `#ff9900` | Amber — intermediate states, warnings |
| `--bone` | `#e8e4d9` | Off-white — body text |
| `--void` | `#080809` | Deep black — background |
| `--panel` | `#111114` | Card/panel background |

### Typography

| Role | Font |
|---|---|
| Display / headings | Archivo (900 weight) |
| Terminal / code / body | JetBrains Mono |

### Key CSS Variables

```css
:root {
  --signal:       #ff2d2d;    /* primary red */
  --phosphor:     #39ff7e;    /* terminal green */
  --cyan:         #00e5ff;    /* cyber cyan */
  --purple:       #bf5fff;    /* purple */
  --ember:        #ff9900;    /* amber */
  --bone:         #e8e4d9;    /* text */
  --void:         #080809;    /* background */
  --panel:        #111114;    /* cards */
  --mono:         'JetBrains Mono', monospace;
  --disp:         'Archivo', system-ui, sans-serif;
  --maxw:         1160px;
  --ease:         cubic-bezier(.2, .7, .2, 1);
}
```

---

## 🗂 File Structure

```
fsociety-web/
├── index.html          ← All HTML sections, semantic structure
├── style.css           ← Full stylesheet (3200+ lines): variables, components, responsive
├── script.js           ← All JS (1300+ lines): data, renderers, animations, tools
├── README.md           ← This file
└── Hacking Stuffs/     ← Personal notes vault (Markdown)
    ├── 18_InfoGatheringTools.md
    ├── 90_Days_Hacking_Roadmap.md
    ├── Android-Hacking.md
    ├── Bluetooth_Tracking_Hacking_README.md
    ├── Bug_Bounty_Hunting_Tools_README.md
    ├── Bypassing_Your_Password_Reset_Readme.md
    ├── README_Car_Hacking_and_Vehicle_Security.md
    ├── README_Network_Analysis_and_Packet_Capture.md
    ├── README_Netcat_Python_Educational.md
    ├── README_Red_Team_Recon.md
    ├── README_Web_Application_Security_Concepts.md
    ├── README_Wireless_Network_Security.md
    ├── README_XSS_Comprehensive.md
    ├── Session_Hijacking_README.md
    └── TCPIP_OSI_Model_Hacker_Guide_README.md
```

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/arman080325/fsociety-web.git
cd fsociety-web

# Open (no build step — pure HTML/CSS/JS)
open index.html
# or serve locally
python3 -m http.server 8080
# then visit http://localhost:8080
```

Requires no npm, no bundler, no framework. Opens directly in any modern browser.

---

## ✏️ Customisation Guide

### 1 — Update personal info (`script.js`)

The data arrays at the top of `script.js` drive most of the dynamic content.

**Update the TOOLS array** (arsenal section):

```js
const TOOLS = [
  {
    n: "Nmap",           // name
    c: "recon",          // category: recon | exploit | web | wireless | misc
    d: "Description.",   // shown in the tool card
    t: "Recon",          // tag label
    s: "ok",             // status class: ok | live | learn
    st: "configured"     // status text
  },
  // ...
];
```

**Update the journey timeline** (`index.html` → `#journey`):

```html
<div class="jrow rev">
  <div class="jdate">2026</div>
  <h3>Your Next Milestone</h3>
  <p>What you accomplished and learned.</p>
  <div class="jtags">
    <span class="tag">Tool</span>
    <span class="tag">Skill</span>
  </div>
</div>
```

**Update hero stats** (`index.html` → `.hero-stats`):

```html
<div class="hstat">
  <div class="n" data-to="20">0</div>   <!-- number to count to -->
  <div class="k">tools configured</div>
</div>
```

---

### 2 — Add a tutorial (`script.js` → `TUTORIALS`)

```js
TUTORIALS.webpwn.push({
  title: "IDOR — Insecure Direct Object Reference",
  diff: "int",   // beg | int | adv
  desc: "Finding and exploiting broken access controls in authorised lab environments.",
  steps: [
    {
      h: "Step heading",
      p: "Explanation of what this step does.",
      code: `# Your command here\ncurl -s http://lab.local/api/user/1`
    },
  ],
  tags: ["IDOR", "Burp", "PortSwigger"],
  warn: "Scope warning — lab or authorised targets only."
});
```

Available tutorial categories: `recon` · `webpwn` · `wireless` · `privesc` · `social` · `forensics`

---

### 3 — Add a field note (`script.js` → `NOTES`)

```js
NOTES.newcategory = {
  title: "// Your Category",
  meta: "short description · date",
  secs: [
    {
      h: "Section heading",
      code: `command --flag value\n# comment`,
      // OR use a list instead of code:
      list: ["Point one", "Point two", "Point three"]
    }
  ]
};
```

The notes nav tabs are auto-generated — adding to `NOTES` automatically adds a tab.

---

### 4 — Add an attack tree scenario (`script.js` → `TREES` in the top-down renderer)

```js
// Inside the TREES object in the "TOP-DOWN ANIMATED ATTACK TREE" IIFE:
TREES.ad = {
  label: 'Active Directory Attack Chain',
  root: {
    id: 'root', label: 'AD ENVIRONMENT', sub: 'authorised engagement', color: '#ff2d2d',
    children: [
      {
        id: 'enum', label: 'ENUMERATION', sub: 'bloodhound · ldap', color: '#ff9900',
        children: [
          { id: 'kerb', label: 'Kerberoasting', sub: 'GetUserSPNs.py', color: '#bf5fff', children: [
            { id: 'crack', label: 'Offline Crack', sub: 'hashcat -m 13100', color: '#39ff7e', children: [] }
          ]}
        ]
      }
    ]
  }
};
```

Then add a button in `index.html`:

```html
<button class="atree-btn" data-tree="ad">◈ Active Directory</button>
```

Node color guide:
- `#ff2d2d` — root / target (red)
- `#ff9900` — phase headers (amber)
- `#00e5ff` — recon / discovery (cyan)
- `#bf5fff` — exploitation techniques (purple)
- `#39ff7e` — impact / achieved objectives (green)

---

### 5 — Add a roadmap phase/node (`script.js` → `PHASES`)

```js
PHASES.push({
  code: "06",
  title: "Specialisation — Bug Bounty",
  sub: "real-world practice",
  nodes: [
    {
      id: "bb_recon",
      label: "Asset Discovery",
      track: "practice",   // found | off | practice | career
      blurb: "One-line summary.",
      why: "Why this skill matters for a pentester.",
      topics: ["subdomain enum", "ASN discovery", "JS analysis"],
      res: [
        { n: "HackerOne Hacktivity", u: "https://hackerone.com/hacktivity" }
      ]
    }
  ]
});
```

Track options: `found` (foundations) · `off` (offensive) · `practice` · `career`

---

### 6 — Update repos (`script.js` → `COMM_REPOS`)

```js
const COMM_REPOS = [
  {
    n: "author / repo-name",
    d: "Short description of what the tool does.",
    l: "Python",        // language
    s: "12k+",          // stars
    u: "https://github.com/author/repo"
  },
  // ...
];
```

---

### 7 — Update contact links (`index.html` → `#contact`)

```html
<a class="clink-row" href="https://github.com/YOURHANDLE" target="_blank" rel="noopener">
  <span class="ci">⬡</span> github.com/YOURHANDLE
</a>
<a class="clink-row" href="https://www.linkedin.com/in/YOUR-PROFILE" target="_blank" rel="noopener">
  <span class="ci">◈</span> linkedin / YOUR-PROFILE
</a>
<a class="clink-row" href="mailto:YOUR@EMAIL.COM">
  <span class="ci">◉</span> YOUR@EMAIL.COM
</a>
```

---

### 8 — Add CVEs to the threat ticker (`script.js` → `THREATS`)

```js
const THREATS = [
  { sev: "crit", txt: "CVE-2025-XXXX — Description (CVSS 10.0)" },
  { sev: "high", txt: "CVE-2025-XXXX — Description" },
  { sev: "med",  txt: "CVE-2025-XXXX — Description" },
  // sev: "crit" | "high" | "med"
];
```

---

### 9 — Add keyboard shortcuts (`script.js` → `KB_SHORTCUTS` and `NAV_MAP`)

```js
const KB_SHORTCUTS = [
  { key: "G+P", desc: "go to proving ground" },
  // ...
];

// Also add to NAV_MAP:
const NAV_MAP = {
  'p': '#proving',
  // ...
};
```

---

## 🎭 Animations Reference

| Effect | Where | How it works |
|---|---|---|
| Boot sequence | Page load | Sequential `innerHTML` writes, timed with `setTimeout` |
| Cursor trail | Global | Canvas overlay, particle system, `mousemove` + `click` listeners |
| Hero glitch | `.hero-title .l2` | CSS `autoGlitch` keyframe + JS character scramble on interval |
| Network canvas | Hero background | Canvas dots connected by proximity, `requestAnimationFrame` |
| Scanline sweep | Hero | CSS `scanPulse` keyframe on `#hero::after` pseudo-element |
| Orb drift | Hero background orbs | CSS `orbDrift` keyframe, `alternate` direction |
| Scroll reveal | `.rev` elements | `IntersectionObserver` adds `.in` class → CSS transition |
| Counter animation | Hero stats | `IntersectionObserver` + `requestAnimationFrame` increment loop |
| Attack tree draw | `#attacktree` | SVG cubic Bézier paths animated via `strokeDashoffset` |
| Attack tree nodes | `#attacktree` | `opacity` + `translateY` CSS transitions, staggered with `setTimeout` |
| Ticker scroll | `#threatBar` | CSS `tickerRun` keyframe on `.ticker-track` |
| Progress bar | Top of page | `scroll` listener updates `width` on `#scroll-progress-bar` |
| Particle burst | Section headers | `IntersectionObserver` → DOM particle elements with CSS `particlePop` keyframe |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `?` | Open shortcuts panel |
| `Esc` | Close any open panel |
| `G` then `H` | Jump to Hero |
| `G` then `W` | Jump to whoami |
| `G` then `R` | Jump to roadmap |
| `G` then `T` | Jump to tutorials |
| `G` then `A` | Jump to arsenal |
| `G` then `X` | Jump to toolbox |
| `G` then `N` | Jump to field notes |
| `G` then `C` | Jump to contact |

---

## 🛠 Interactive Toolbox Reference

All tools run client-side — no server, no data sent anywhere.

| Tool | Function |
|---|---|
| **Payload Encoder/Decoder** | Base64 encode/decode, URL encode/decode, Hex encode, HTML entity encode |
| **Hash Identifier** | Identifies hash type by length and format (MD5, SHA-1, SHA-256, NTLM, etc.) |
| **CVE Lookup** | Searches local DB of critical CVEs by ID or keyword |
| **Regex Tester** | Live regex with match highlighting, flags support |
| **Common Ports Reference** | 16 key ports with pentest-specific notes |

---

## 🔒 Ethics & Scope

Every technique on this site includes a scope warning. The rule is simple:

> Written authorisation. Always. No exceptions.

This site is a field log and educational resource. Nothing here teaches how to attack systems without permission — it teaches how authorised offensive security works, in labs you own or engagements you're contracted for.

- PortSwigger Web Security Academy — always in scope
- DVWA, bWAPP, VulnHub — self-hosted, always in scope
- TryHackMe, HackTheBox — their machines, their scope
- Your own network and hardware — your call
- Anyone else's systems — **get written permission first**

---

## 🛡 Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 — semantic, no framework |
| Styling | CSS3 — custom properties, Grid, Flexbox, keyframe animations |
| Scripting | Vanilla JS — no dependencies, no bundler, no npm |
| Fonts | JetBrains Mono · Archivo (via Google Fonts) |
| Background | Custom canvas particle network (`requestAnimationFrame`) |
| Storage | `localStorage` for roadmap progress only |
| Hosting | GitHub Pages (static, no server required) |

---

## 🚢 Deployment

### GitHub Pages

```bash
# Push to main — Pages serves index.html automatically
git add .
git commit -m "update: <what you changed>"
git push origin main

# Enable Pages: Settings → Pages → Source: main branch / root
# URL: https://YOURUSERNAME.github.io/fsociety-web/
```

### Netlify (drag & drop)

1. Go to [netlify.com](https://netlify.com) → Drop the project folder
2. Done — auto-deploys on every git push if you connect the repo

### Self-hosted

```bash
# Any static server works:
python3 -m http.server 8080
npx serve .
caddy file-server --listen :8080
```

---

## 🗺 Roadmap / Planned

- [ ] Dark/phosphor theme toggle
- [ ] Active Directory attack tree
- [ ] CTF writeup section (expandable cards)
- [ ] Bug bounty hall of fame placeholder
- [ ] Metasploit MCP integration notes
- [ ] Obsidian vault export → field notes auto-import
- [ ] WebSocket-based live threat feed (replace static ticker)

---

## 📄 License

Built for personal use and learning. Fork it, gut it, make it yours.
Credit appreciated but not required. Don't use it to do anything illegal.

---

```
ARMANXPLOITS // fsociety
break · learn · secure
// educational use only · ethical hacking is legal hacking · always get written permission
```
