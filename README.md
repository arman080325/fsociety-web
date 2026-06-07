# ⬡ fsociety-web — ArmanXploits Cybersecurity Portfolio

> *"Breaking things to make them stronger."*

A dark, multi-tone cybersecurity portfolio built for **ethical hackers, pentesters, and security researchers**. Themed around [fsociety](https://en.wikipedia.org/wiki/Mr._Robot) with a polished hacker aesthetic — electric green, cyan, violet, and amber on a deep space-black background.

**Live:** [armanxploits.github.io](https://github.com/armanxploits) *(update this link)*

---

## ✦ What's Inside

| Section | Description |
|---|---|
| **Hero** | Animated particle canvas, multi-color title animation, live terminal, floating role badges |
| **whoami** | Identity card, skill bars, fsociety box specs |
| **journey** | Chronological cybersecurity timeline (2021 → now) |
| **tools** | Filterable arsenal of configured hacking tools |
| **projects** | Cybersecurity project cards with Live Demo + GitHub Repo links |
| **repos** | Personal repos + curated community security repos |
| **notes** | Tabbed methodology notes (MitM, WiFi, Web, Recon, PrivEsc) |
| **ctf & labs** | Progress tracking for PortSwigger, XSS Game, TryHackMe, HackTheBox |
| **contact** | Links + contact terminal widget |

---

## 🎨 Design Palette

| Color | Usage |
|---|---|
| `#00ff88` Electric Green | Primary accent, hero title, skill bars |
| `#00d4ff` Cyan | Timeline dots, code blocks, note tabs |
| `#8b5cf6` Violet | CTF section, planned badges, orb glow |
| `#f59e0b` Amber | WIP badges, repo stars, tool status |
| `#060810` Deep Space | Background |

---

## 🗂 File Structure

```
fsociety-web/
├── index.html        ← Main page (all sections)
├── style.css         ← All styles (CSS variables, components, responsive)
├── script.js         ← All JS (terminal animation, particles, filters, etc.)
└── README.md         ← This file
```

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/armanxploits/fsociety-web.git
cd fsociety-web

# Open in browser (no build step needed)
open index.html
# or
python3 -m http.server 8080
```

---

## ✏️ Customization Guide

### 1. Update your info (`script.js` → `CONFIG`)

```js
const CONFIG = {
  name: "ArmanXploits",
  handle: "armanxploits",
  githubUrl: "https://github.com/armanxploits",

  myRepos: [
    {
      name: "armanxploits / my-tool",
      desc: "Short description of what it does.",
      lang: "Python",
      url: "https://github.com/armanxploits/my-tool"
    },
  ],

  terminalCommands: [
    { cmd: "whoami", output: ["armanxploits", "4th Year Eng. | Ethical Hacker | Pentester"] },
    // Add your own commands...
  ]
};
```

---

### 2. Add a real project (`index.html` → `#projects`)

Replace a placeholder card with your actual project:

```html
<div class="card project-card">
  <div class="project-status-bar">
    <span class="project-badge complete">✓ complete</span>
    <span class="project-year">2025</span>
  </div>
  <div class="project-icon-wrap">
    <div class="project-icon shell">🐍</div>
  </div>
  <h3 class="project-title">ARP Spoof Detector</h3>
  <p class="project-desc">
    Python tool that passively monitors a LAN for ARP poisoning attacks.
    Alerts on duplicate IP-to-MAC mappings in real time.
  </p>
  <div class="project-tech">
    <span class="tag">Python</span>
    <span class="tag">Scapy</span>
    <span class="tag">Networking</span>
  </div>
  <div class="project-links">
    <a href="https://your-demo.vercel.app" class="project-link project-link-demo" target="_blank">
      <span>⬡</span> Live Demo
    </a>
    <a href="https://github.com/armanxploits/arp-detector" class="project-link project-link-gh" target="_blank">
      <span>⎇</span> GitHub Repo
    </a>
  </div>
</div>
```

**Project badge classes:**
- `project-badge complete` — green, for finished projects
- `project-badge wip` — amber, for in-progress
- `project-badge planned` — violet, for planned

**Project icon classes:**
- `project-icon shell` — green glow (scripts, tools)
- `project-icon web` — cyan glow (web apps, dashboards)
- `project-icon exploit` — red glow (exploitation tools)

---

### 3. Update contact links (`index.html` → `#contact`)

```html
<a href="https://github.com/armanxploits" class="contact-link" target="_blank">
  <span class="contact-icon">⬡</span> github.com/armanxploits
</a>
<a href="https://linkedin.com/in/yourprofile" class="contact-link" target="_blank">
  <span class="contact-icon">◈</span> linkedin.com/in/yourprofile
</a>
<a href="mailto:arman@yourdomain.com" class="contact-link">
  <span class="contact-icon">◉</span> arman@yourdomain.com
</a>
```

---

### 4. Add nav links (`index.html` → `#navbar`)

If you add new sections, add a corresponding nav link:

```html
<li><a href="#your-section" class="nav-link" data-section="your-section">label</a></li>
```

And add `id="your-section"` to the corresponding `<section>` tag.

---

## 🛠 Tech Stack

- **HTML5** — Semantic, no framework
- **CSS3** — CSS Variables, Grid, Flexbox, Keyframe animations
- **Vanilla JS** — No dependencies, no bundler
- **Fonts** — Orbitron (display), Share Tech Mono (terminal), Rajdhani (body)
- **Background** — Canvas particle system (custom-built)

---

## 📋 Project Card Template (Quick Copy)

```html
<!-- COMPLETE PROJECT -->
<div class="card project-card">
  <div class="project-status-bar">
    <span class="project-badge complete">✓ complete</span>
    <span class="project-year">2025</span>
  </div>
  <div class="project-icon-wrap">
    <div class="project-icon web">🔍</div>
  </div>
  <h3 class="project-title">PROJECT NAME</h3>
  <p class="project-desc">What it does, what problem it solves, any cool techniques used.</p>
  <div class="project-tech">
    <span class="tag">Python</span>
    <span class="tag">Kali Linux</span>
  </div>
  <div class="project-links">
    <a href="DEMO_URL" class="project-link project-link-demo" target="_blank">
      <span>⬡</span> Live Demo
    </a>
    <a href="GITHUB_URL" class="project-link project-link-gh" target="_blank">
      <span>⎇</span> GitHub Repo
    </a>
  </div>
</div>
```

---

## 📄 License

Built for personal use. Fork it, customize it, make it yours. Credit appreciated but not required.

---

*For educational and ethical hacking purposes only. Always get proper authorization before any security testing.*

**// armanxploits · fsociety · ethical hacking is legal hacking**