/* ============================================================
   FSOCIETY CYBERSECURITY PORTFOLIO — script.js
   ArmanXploits | Interactive Functionality
   ============================================================ */

/* ===== CONFIG — EDIT THESE TO CUSTOMIZE ===== */
const CONFIG = {
  name: "ArmanXploits",
  handle: "armanxploits",
  githubUrl: "https://github.com/armanxploits",

  // Add your repos here
  myRepos: [
    {
      name: "armanxploits / ethical-hacking-notes",
      desc: "Personal methodology notes — MitM, ARP/DNS spoofing, WPA2 capture, Nmap host discovery. Formatted Markdown.",
      lang: "Markdown",
      url: "https://github.com/armanxploits/ethical-hacking-notes"
    },
    // Add more:
    // { name: "armanxploits / repo-name", desc: "...", lang: "Python", url: "..." },
  ],

  // Terminal hero commands
  terminalCommands: [
    { cmd: "whoami", output: ["armanxploits", "4th Year Eng. | Ethical Hacker | Pentester"] },
    { cmd: "cat /etc/hostname", output: ["fsociety"] },
    { cmd: "uname -a", output: ["Linux fsociety 6.6.0-kali3-amd64 #1 SMP Kali 6.6.15 x86_64 GNU/Linux"] },
    { cmd: "netstat -active", output: ["LISTENING on port 4444 (reverse shell ready)", "ESTABLISHED: lab target connection live"] },
  ]
};

/* ===== TERMINAL HERO ANIMATION ===== */
function initHeroTerminal() {
  const cmdEl = document.getElementById('typed-cmd');
  const outputEl = document.getElementById('hero-output');
  if (!cmdEl || !outputEl) return;

  let cmdIndex = 0;

  async function typeCommand(text) {
    cmdEl.textContent = '';
    for (const char of text) {
      cmdEl.textContent += char;
      await sleep(40 + Math.random() * 40);
    }
  }

  async function showOutput(lines) {
    for (const line of lines) {
      const div = document.createElement('div');
      div.className = 'output-line';
      div.style.color = line.includes('fsociety') || line.includes('operational') ? 'var(--accent)' : 'var(--text-dim)';
      div.style.fontFamily = 'var(--mono)';
      div.style.fontSize = '0.78rem';
      div.style.paddingLeft = '20px';
      div.style.lineHeight = '1.8';
      div.textContent = '→ ' + line;
      outputEl.appendChild(div);
      await sleep(120);
    }
  }

  async function runTerminal() {
    await sleep(800);
    const cmds = CONFIG.terminalCommands;

    while (true) {
      const c = cmds[cmdIndex % cmds.length];
      await typeCommand(c.cmd);
      await sleep(400);
      await showOutput(c.output);
      await sleep(2000);

      // Clear after 2 cycles
      if (cmdIndex > 0 && cmdIndex % cmds.length === cmds.length - 1) {
        await sleep(500);
        outputEl.innerHTML = '';
      }

      cmdIndex++;
      cmdEl.textContent = '';
      await sleep(300);
    }
  }

  runTerminal();
}

/* ===== COUNTER ANIMATION ===== */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current < target) requestAnimationFrame(update);
    };

    // Trigger when visible
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        update();
        obs.disconnect();
      }
    });
    obs.observe(el);
  });
}

/* ===== SKILL BAR ANIMATION ===== */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        obs.unobserve(entry.target);
      }
    });
  });
  bars.forEach(bar => {
    bar.style.animationPlayState = 'paused';
    obs.observe(bar);
  });
}

/* ===== TOOL FILTER ===== */
function initToolFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.tool-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ===== NOTES TABS ===== */
function initNoteTabs() {
  const tabs = document.querySelectorAll('.note-tab');
  const pages = document.querySelectorAll('.note-page');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.note;
      tabs.forEach(t => t.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const page = document.querySelector(`.note-page[data-note="${target}"]`);
      if (page) page.classList.add('active');
    });
  });
}

/* ===== ACTIVE NAV ===== */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
}

/* ===== FADE-IN ON SCROLL ===== */
function initScrollReveal() {
  const cards = document.querySelectorAll('.card, .timeline-card');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(card);
  });
}

/* ===== NAVBAR SCROLL ===== */
function initNavScroll() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.boxShadow = '0 4px 30px rgba(0,255,65,0.05)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });
}

/* ===== GLITCH EFFECT ON TITLE ===== */
function initGlitch() {
  const brand = document.querySelector('.brand-text');
  if (!brand) return;

  setInterval(() => {
    if (Math.random() < 0.15) {
      brand.style.textShadow = `${Math.random()*4-2}px 0 var(--accent)`;
      setTimeout(() => { brand.style.textShadow = 'none'; }, 80);
    }
  }, 2000);
}

/* ===== MOBILE MENU (hamburger fallback) ===== */
function initMobileMenu() {
  // Nav collapses on small screens — clicking logo scrolls to top
  const brand = document.querySelector('.nav-brand');
  if (brand) {
    brand.style.cursor = 'pointer';
    brand.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}

/* ===== SMOOTH SCROLL FOR NAV LINKS ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ===== PARTICLE HERO BACKGROUND ===== */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const resize = () => {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['#00ff88', '#00d4ff', '#8b5cf6', '#f59e0b'];
  const COUNT = 60;

  const particles = Array.from({ length: COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r:  Math.random() * 1.5 + 0.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: Math.random() * 0.5 + 0.2,
  }));

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connection lines
    particles.forEach((p, i) => {
      particles.slice(i + 1).forEach(q => {
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Move
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    requestAnimationFrame(drawFrame);
  }

  drawFrame();
}

/* ===== UTILITY ===== */
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initHeroTerminal();
  animateCounters();
  initSkillBars();
  initToolFilter();
  initNoteTabs();
  initNavHighlight();
  initScrollReveal();
  initNavScroll();
  initGlitch();
  initMobileMenu();
  initSmoothScroll();

  console.log(`
  ███████╗███████╗ ██████╗  ██████╗██╗███████╗████████╗██╗   ██╗
  ██╔════╝██╔════╝██╔═══██╗██╔════╝██║██╔════╝╚══██╔══╝╚██╗ ██╔╝
  █████╗  ███████╗██║   ██║██║     ██║█████╗     ██║    ╚████╔╝
  ██╔══╝  ╚════██║██║   ██║██║     ██║██╔══╝     ██║     ╚██╔╝
  ██║     ███████║╚██████╔╝╚██████╗██║███████╗   ██║      ██║
  ╚═╝     ╚══════╝ ╚═════╝  ╚═════╝╚═╝╚══════╝   ╚═╝      ╚═╝

  armanxploits | fsociety | ethical hacking only
  `);
});