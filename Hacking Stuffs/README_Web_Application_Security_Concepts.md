# How Websites Work & Where They Break — Study Notes

Companion notes for the *How Hackers Hack Websites in 2026 (How Websites Work)*
video. The video's core thesis: **you can't break (or defend) what you don't
understand**, so it walks the web stack piece by piece and names the modern
vulnerability *class* at each layer.

These are conceptual notes — vulnerability classes and their defenses, the same
material covered by the **OWASP Top 10** and any web-security course. No
target-specific exploits.

> **Ethics:** test only against systems you own or are authorized to assess (your
> own lab, deliberately-vulnerable apps, or an in-scope bug-bounty program).

---

## The web stack, layer by layer

### 1. DNS (the internet's phone book)
- **How it works:** browsers don't know IPs; DNS resolves `name → IP`.
- **Vulnerability class — subdomain takeover:** a `CNAME` left pointing at a
  cancelled third-party service (Zendesk, S3, etc.) can be re-claimed by whoever
  registers that name next, handing them a *trusted* subdomain.
- **Defense:** remove DNS records when decommissioning services; monitor for
  dangling CNAMEs.

### 2. Browser ↔ server request/response cycle
- **How it works:** modern sites are apps; the browser fires background **API
  requests** for raw data. An intercepting proxy (**Burp Suite**) lets you inspect
  and modify those requests.
- **Vulnerability class — BOLA / IDOR** (Broken Object-Level Authorization):
  the server checks *that* you're logged in but not *whether* you're allowed to see
  object `1046` when you ask for it instead of your own `1045`.
- **Defense:** enforce per-object authorization on every request, server-side —
  never trust client-supplied IDs.

### 3. The server (mostly cloud now)
- **Vulnerability class — SSRF** (Server-Side Request Forgery): a feature that
  fetches a user-supplied URL (e.g. "import image from link") can be pointed at
  *internal* addresses the server can reach but you can't — including a cloud
  provider's **instance metadata endpoint**, which may expose credentials.
- **Defense:** allow-list outbound destinations, block requests to internal/link-
  local ranges, require IMDSv2-style protections, and scope instance roles to
  least privilege.

### 4. The database (the vault)
- **Old class — SQL injection.** **Modern class — NoSQL injection** (e.g. MongoDB):
  instead of a password value, an attacker injects a *query operator* so the
  authentication comparison always evaluates true.
- **Defense:** validate/typecast input, use parameterized queries / safe ODM
  APIs, and reject objects where strings are expected in auth fields.

### 5. Cookies & sessions
- **How it works:** HTTP is stateless, so login issues a **session token** ("VIP
  wristband") the browser presents on each request. Modern apps often use **JWT**.
- **Vulnerability class — weak JWT signing secret:** the token is *signed* to
  prevent tampering, but a weak/guessable secret (`secret123`) can be brute-forced
  offline, after which an attacker forges a valid token (e.g. role `admin`).
- **Defense:** use long, random, high-entropy signing keys; pin the algorithm
  (reject `alg:none` / algorithm-confusion); keep token lifetimes short; rotate
  keys.

---

## Why recon dominates
The video stresses that ~90% of real work is **reconnaissance** — mapping
subdomains, APIs, DNS records, and forgotten dev servers — because the weak point
is usually the asset nobody remembered, not the hardened main site. (See the
companion red-team recon notes.)

## The mental model
Where a normal user sees "a page loading" and "a button," the security mindset
sees the underlying machinery: DNS, API calls, cloud metadata, the database, and
session handling. Understanding that machinery is what lets you both find and
*fix* the weak points.

### Further learning
- OWASP Top 10 and the OWASP Web Security Testing Guide (WSTG)
- PortSwigger Web Security Academy (free, hands-on labs)
- Practice targets: deliberately-vulnerable apps and authorized bug-bounty scopes
