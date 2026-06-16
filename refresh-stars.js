#!/usr/bin/env node
/* ============================================================
   refresh-stars.js  —  update star counts in repos-data.js
   from the live GitHub API. Touches ONLY the `stars:` numbers.
   Your descriptions, cats, lang and featured flags are untouched.

   USAGE
     node refresh-stars.js              # update + write file (makes a .bak)
     node refresh-stars.js --dry        # preview changes, write nothing
     node refresh-stars.js --limit 5    # only process first 5 (testing)

   AUTH (recommended — raises 60/hr to 5000/hr):
     PowerShell:  $env:GITHUB_TOKEN="ghp_xxx"; node refresh-stars.js
     bash:        GITHUB_TOKEN=ghp_xxx node refresh-stars.js
   Create a token at github.com/settings/tokens  (no scopes needed — public data).

   Requires Node 18+ (built-in fetch).
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const FILE = path.join(__dirname, 'repos-data.js');
const DRY  = process.argv.includes('--dry');
const limitArg = process.argv.indexOf('--limit');
const LIMIT = limitArg > -1 ? parseInt(process.argv[limitArg + 1], 10) : Infinity;
const TOKEN = process.env.GITHUB_TOKEN || '';

const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const sleep = ms => new Promise(r => setTimeout(r, ms));

function loadRepos() {
  const code = fs.readFileSync(FILE, 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox);
  if (!sandbox.window.REPOS) throw new Error('Could not find REPOS in repos-data.js');
  return sandbox.window.REPOS;
}

async function getRepo(owner, repo) {
  return fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      'User-Agent': 'fsociety-web-star-refresher',
      'Accept': 'application/vnd.github+json',
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
  });
}

(async () => {
  const repos = loadRepos();
  const targets = repos.slice(0, LIMIT);
  console.log(`\n  ${targets.length} repos to check${TOKEN ? ' (authenticated)' : ' (NO token - 60/hr limit)'}${DRY ? ' [dry run]' : ''}\n`);

  const updates = [], renamed = [], langTips = [];
  let rateLimited = false, checked = 0;

  for (const r of targets) {
    process.stdout.write(`  ${r.owner}/${r.repo} ... `);
    let res;
    try { res = await getRepo(r.owner, r.repo); }
    catch (e) { console.log('network error:', e.message); continue; }

    if (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0') {
      const reset = new Date(+res.headers.get('x-ratelimit-reset') * 1000);
      console.log(`RATE LIMITED (resets ${reset.toLocaleTimeString()})`);
      rateLimited = true; break;
    }
    if (res.status === 404) { console.log('NOT FOUND (renamed/removed?)'); renamed.push(r); continue; }
    if (!res.ok) { console.log('http', res.status); continue; }

    const data = await res.json();
    checked++;
    const live = data.stargazers_count;
    if (live !== r.stars) { updates.push({ owner: r.owner, repo: r.repo, old: r.stars, live }); console.log(`${r.stars} -> ${live}`); }
    else console.log(`${live} (no change)`);

    if (data.language && r.lang && data.language !== r.lang && r.lang !== 'List')
      langTips.push(`    ${r.owner}/${r.repo}: lang "${r.lang}" -> GitHub says "${data.language}"`);

    await sleep(TOKEN ? 60 : 250);
  }

  if (!DRY && updates.length) {
    let text = fs.readFileSync(FILE, 'utf8');
    fs.writeFileSync(FILE + '.bak', text);
    for (const u of updates) {
      const re = new RegExp(`(owner:\\s*"${esc(u.owner)}"\\s*,\\s*repo:\\s*"${esc(u.repo)}"[^}]*?stars:\\s*)\\d+`);
      text = text.replace(re, `$1${u.live}`);
    }
    fs.writeFileSync(FILE, text);
  }

  console.log('\n  -- summary -----------------------------');
  console.log(`  updated:   ${updates.length}${DRY ? ' (dry - not written)' : ''}`);
  console.log(`  unchanged: ${checked - updates.length}`);
  if (renamed.length) { console.log(`  NOT FOUND: ${renamed.length} (fix owner/repo by hand):`); renamed.forEach(r => console.log(`    - ${r.owner}/${r.repo}`)); }
  if (langTips.length) { console.log(`  language hints (not applied):`); langTips.forEach(t => console.log(t)); }
  if (rateLimited) console.log('  ! stopped early on rate limit - set GITHUB_TOKEN and re-run.');
  if (!DRY && updates.length) console.log(`\n  done. repos-data.js updated (backup at repos-data.js.bak)\n`);
  else if (DRY) console.log('\n  dry run complete - re-run without --dry to write.\n');
  else console.log('\n  nothing to change.\n');
})();
