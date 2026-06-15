# Red Team Recon & Reconnaissance — Study Notes

Companion notes for the *How Hackers Spy on Targets (Red Team Recon Explained)*
video. A structured overview of the **reconnaissance phase** from a red-team
perspective, meant to complement standard pentest methodology.

> **Rule #1 (stated repeatedly in the video):** *Always have written permission
> before scanning. No exceptions.* Recon tooling that touches a target without
> authorization is illegal. Passive/OSINT techniques below are legal precisely
> because they query public data sources rather than the target itself.

---

## 1. Continuous monitoring (do recon as a repeatable process, not a one-off)

- Lightweight **bash scripts** run scans on a schedule and alert on change.
- Pattern: `nmap` scans the authorized scope daily → save XML →
  compare today vs. yesterday with **ndiff** → email the team on any new open
  port or service.
- Benefit: continuous visibility with no manual effort; build on it with
  dashboards and automated follow-ups.

**Web-surface monitoring:**
- **httpscreenshot** — uses masscan to sweep large ranges, PhantomJS to screenshot
  discovered web apps. Quick visual overview.
- **EyeWitness** — takes nmap XML and grabs screenshots from web pages, RDP, and
  VNC. Good for visual triage.

---

## 2. Cloud recon

Cloud assets use **dynamic IPs** that aren't neatly listed, which makes them easy
to overlook (and frequently misconfigured/exposed).

- Start from the **official published IP ranges** for AWS, Azure, and Google Cloud.
- These ranges are huge, so automate rather than scan by hand.

---

## 3. Passive intel — search the internet, not the target

| Tool / source | Use |
|---------------|-----|
| **Shodan** | "Google for devices" — indexes exposed services, banners, versions, known CVEs. Passive: the target doesn't see you looking. |
| Regional registries (RIRs) | Look up org ownership, IP ranges, ASNs |
| Domain dossier–style tools | WHOIS, DNS records, registrant info, mail servers |
| **SSL/TLS certificate scraping** | Cert subject/SAN fields leak internal hostnames (e.g. `dev.`, `vpn.`) → reveals internal structure |

The video notes how often internet-exposed **Redis, Jenkins, Tomcat, and NoSQL**
instances sit publicly reachable due to missing access controls — which is exactly
what defenders should be auditing for on their own perimeter.

---

## 4. Subdomain discovery

Subdomains often expose dev servers, VPN endpoints, staging, and mail — and they
aren't listed in any public registry, so you have to discover them.

Why they matter: names like `staging`/`api`/`login`/`test` hint at what's running;
some cloud hosts only respond to the full hostname; and resolved subdomains map a
company's hosting footprint.

| Tool | Approach |
|------|----------|
| **Discover scripts** | Bundles many Kali recon tools; automates the workflow |
| **knockpy** | Dictionary/brute-force subdomain finder (only as good as the wordlist) |
| **Sublist3r** | Scrapes search engines (dork-style) for indexed subdomains |
| **Subbrute + massdns** | Uses public resolvers for fast, stealthier resolution |

---

## 5. GitHub recon

Public repos frequently leak **API keys, passwords, internal IPs, and config
files** — and Git history preserves "deleted" secrets.

- GitHub dorking: `site:github.com "<target>"` for repos/commits/forks.
- **TruffleHog** — scans repos for high-entropy secrets.
- **gitall-secrets / repo-supervisor** — clone whole orgs and scan at scale (needs
  a free GitHub token).

**Defensive takeaway:** scan your *own* org with these same tools and add secret-
scanning + pre-commit hooks to your pipeline.

---

## 6. Subdomain takeover

Classic dangling-DNS issue: a company points `dev.example.com` at a third-party
service (e.g. an S3 bucket), later deletes the service but forgets to remove the
CNAME. An attacker can then claim that name.

- Detection tools mentioned: **tko-subs**, **HostileSubBruteforcer**,
  **autoSubTakeover** — they check whether subdomains point at abandoned services.
- **Fix:** clean up DNS records when you decommission a service; monitor for
  dangling CNAMEs.

---

## 7. Employee/email enumeration (for awareness)

Recon often includes building email lists for social-engineering simulations:
pull names from public sources, infer the email format from LinkedIn, then
generate addresses. *This is the part defenders most need to understand* — it's
why phishing-awareness training and email authentication (SPF/DKIM/DMARC) matter.

---

## Summary
Recon is the foundation: passive scanning, cloud-asset discovery, subdomain
enumeration, GitHub secret hunting, and takeover detection. Most of it is manual
and patient work — and the same techniques that find an attacker's entry points
are how a defender finds *forgotten infrastructure* before someone else does.
