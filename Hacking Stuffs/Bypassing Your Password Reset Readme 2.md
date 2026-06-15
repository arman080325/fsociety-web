# OAuth Consent Phishing — The Illicit Consent Grant Attack

> *"In 2026, the hacker is laughing at you. You changed your password. You bought a YubiKey. They are still inside your account."*

A complete field guide to the attack that **survives password resets, MFA, and hardware keys** — because it never touches your password in the first place. This document preserves the full narrative from the source talk and layers on the detection logic, KQL, PowerShell, MITRE mapping, and hardening a working defender or red-teamer actually needs.

---

![Attack Class](https://img.shields.io/badge/Attack-OAuth_Consent_Phishing-critical)
![MITRE](https://img.shields.io/badge/MITRE_ATT%26CK-T1528_%7C_T1550.001-blue)
![Defeats](https://img.shields.io/badge/Defeats-Password_Reset_%7C_MFA_%7C_FIDO2-orange)
![Audience](https://img.shields.io/badge/For-Blue_%26_Red_Teams-green)

---

## Table of Contents

1. [TL;DR (30 seconds)](#tldr-30-seconds)
2. [The Scenario That Starts It All](#the-scenario-that-starts-it-all)
3. [The Mental Shift: We Don't Attack Passwords Anymore](#the-mental-shift-we-dont-attack-passwords-anymore)
4. [Old Phishing vs. Modern Phishing](#old-phishing-vs-modern-phishing)
5. [Anatomy of the Attack — Step by Step](#anatomy-of-the-attack--step-by-step)
6. [What Is OAuth, Really?](#what-is-oauth-really)
7. [The Hotel Analogy](#the-hotel-analogy)
8. [Identity vs. Authorization — Why Password Resets Fail](#identity-vs-authorization--why-password-resets-fail)
9. [After Consent: Tokens, the Graph API, and the "Ghost"](#after-consent-tokens-the-graph-api-and-the-ghost)
10. [⚠️ Reality Check: What *Actually* Happens When You Revoke](#-reality-check-what-actually-happens-when-you-revoke)
11. [Risky Scopes Worth Memorizing](#risky-scopes-worth-memorizing)
12. [Detection — Hunting the Grant (Blue Team)](#detection--hunting-the-grant-blue-team)
13. [Remediation — Killing the Ghost](#remediation--killing-the-ghost)
14. [Prevention & Hardening](#prevention--hardening)
15. [Google Workspace Equivalent](#google-workspace-equivalent)
16. [MITRE ATT&CK Mapping](#mitre-attck-mapping)
17. [Real-World Context](#real-world-context)
18. [Incident Response Runbook](#incident-response-runbook)
19. [Key Takeaways — The Red-Teamer Mindset](#key-takeaways--the-red-teamer-mindset)
20. [References & Further Reading](#references--further-reading)
21. [Appendix A: Source Transcript Notes](#appendix-a-source-transcript-notes)
22. [Disclaimer](#disclaimer)

---

## TL;DR (30 seconds)

- **OAuth consent phishing** (a.k.a. **illicit consent grant**) tricks a user into approving a malicious cloud app on the **real, legitimate** Microsoft/Google login page.
- The user passes *every* security check — correct password, MFA prompt, even a FIDO2 hardware key — because the login itself is genuine.
- The trap is the **consent screen**, not the login. One "Accept" hands the attacker an **OAuth access token + refresh token**.
- Those tokens are **authorization**, not **identity**. Changing the password changes identity. It does **not** automatically tear up the authorization already granted.
- The attacker then talks **directly to the API** (e.g., Microsoft Graph) — no browser, no login page, no 2FA prompt to trip — and quietly reads mail and files, potentially for months.
- **Killing it requires revoking the grant / removing the service principal**, not resetting credentials. And — critically — you must also **revoke sessions and lean on Continuous Access Evaluation**, because removing the grant alone does not instantly invalidate tokens already issued.

---

## The Scenario That Starts It All

Imagine a hacker gets into your account — or into the mailbox of a **CEO at a billion-dollar company**. The security team notices something is wrong, or the CEO gets a weird alert.

What's the very first thing you do? You panic. You immediately:

- Change your password — make it 20 characters long.
- Turn on multi-factor authentication.
- Buy a physical hardware key — a **YubiKey**.
- Enable the fingerprint scanner.

You lock the account down like **Fort Knox**. You sit back, take a deep breath, and think: *"Okay, I'm safe. The hacker is locked out."*

**In 2026, the hacker is laughing at you.**

They don't care that you changed your password. They don't care about your YubiKey. They don't care about your new fingerprint scanner. They are **still inside your account** — sitting in the dark, silently downloading every email you receive, reading your private files, and watching your entire life.

How is this possible? Because in modern hacking, *we don't attack your password — we bypass the concept of passwords entirely.*

---

## The Mental Shift: We Don't Attack Passwords Anymore

The headline technique is **OAuth consent phishing**, also called an **illicit consent grant**.

Ten years ago, to hack you, an attacker would send a **fake login page** — a pixel-perfect clone of Google or Microsoft — and hope you were careless enough to type your password into the fake box so it could be stolen.

But today:

- **Users are smarter.**
- **Browsers are smarter.**
- **Antivirus and reputation services block fake login pages.**

So the attacker stops sending you a *fake* login page. **They send you a real one.**

---

## Old Phishing vs. Modern Phishing

| | Classic Credential Phishing (≈2015) | OAuth Consent Phishing (2026) |
|---|---|---|
| **What's faked** | The login page | **Nothing** — it's the real provider |
| **What's stolen** | Your password | An **OAuth token** (delegated access) |
| **Defeated by MFA?** | Often yes | **No** — user completes MFA legitimately |
| **Defeated by FIDO2 / YubiKey?** | Yes | **No** — login is genuine; trap is the consent prompt |
| **Defeated by password reset?** | Yes | **No** — authorization persists separately |
| **URL bar red flags** | Look-alike domain, no/odd TLS | **Real domain, valid TLS lock** |
| **Where the user is fooled** | Typing a password | Clicking **"Accept"** on a permissions dialog |
| **Primary kill switch** | Reset password | **Revoke the app grant + sessions** |

> **Educational note:** This is why awareness training that *only* teaches "check the URL and the padlock" fails here. The URL is correct and the padlock is real. The decision point users must be trained on is **the consent screen** — *what app is this, who published it, and why does it want my mail?*

---

## Anatomy of the Attack — Step by Step

**1. The lure.** The attacker emails the **HR manager** of a target company:

> *Subject: Urgent — Q3 payroll updates and employee policy changes.*

It looks incredibly professional. Company logo. A button to "view the document securely." The manager clicks.

**2. The real login.** The link lands on the **genuine, 100% legitimate Microsoft or Google login page.** Look at the URL bar — it's not a trick. It has the SSL lock. It *really is* Microsoft.

Because it's the real Microsoft:

- The password manager **auto-fills** the password.
- The phone prompts for the **2FA code**.
- The user types it in and **passes every security check perfectly.**

**3. The kill zone — the consent screen.** A box appears:

> **"Secure HR app" wants to access your account.**
> It would like permission to:
> - Read your user profile
> - Read your email
> - Maintain access to data you have given it access to

The HR manager is busy. They just want the payroll document. They assume it's an internal company app. **They click *Accept*.**

**Boom. The war is over.**

> **Why "maintain access to data" matters:** that line is the human-readable rendering of the **`offline_access`** scope — the one that grants a **refresh token**, i.e., long-term, persistent access. It is the single most important scope to flag in any consent prompt or audit log.

---

## What Is OAuth, Really?

**OAuth is a framework that lets a user grant a third-party application access to their data *without giving that application their password.***

When the user clicks **Accept**, the identity provider (Microsoft Entra ID / Google) reasons:

> *"This user proved who they are, and they just granted permission to this app."*

It then mints two cryptographically signed artifacts:

- **Access token** — short-lived (Microsoft default ≈ 60–90 minutes), presented to APIs to prove "I'm allowed to do X."
- **Refresh token** — long-lived, used to silently mint fresh access tokens *without* the user ever logging in again (this is what `offline_access` buys).

The provider hands those tokens **directly to the (malicious) cloud application.** No password ever changes hands.

```
        ┌──────────┐   1. real login + MFA    ┌─────────────────┐
        │  Victim  │ ───────────────────────▶ │  Microsoft /    │
        │  (HR)    │ ◀─── 2. consent prompt ── │  Google IdP     │
        └────┬─────┘   3. clicks "Accept"      └────────┬────────┘
             │                                          │
             │                                4. tokens │ (access + refresh)
             │                                          ▼
             │                               ┌─────────────────────┐
             │                               │  Malicious cloud    │
             │                               │  app  "Secure HR"   │
             │                               └──────────┬──────────┘
             │                                          │ 5. token → API
             ▼                                          ▼
   password / MFA / YubiKey                  ┌─────────────────────┐
   all still valid & unaffected              │  Microsoft Graph /  │
                                             │  Gmail API → MAIL   │
                                             └─────────────────────┘
```

---

## The Hotel Analogy

Think of it like a hotel:

- **Your password is your physical ID card.** You showed the front desk your ID and proved who you are.
- But when you clicked **Accept**, you told the front desk to **hand a master key card to the attacker's application.**

The attacker doesn't have your ID. They don't know your password. **But they hold the master key card to your room.**

Now replay the incident response:

> The security team detects strange activity. They tell the HR manager, *"Change your password right now."* The manager changes the password and enables a hardware YubiKey.

Why doesn't that kick the attacker out?

**Because identity and authorization are two completely different things.** Changing your password updates your **identity** — *how you prove who you are to the front desk.* But **the front desk never deactivated the master key card it already gave away.**

---

## Identity vs. Authorization — Why Password Resets Fail

This is the conceptual core of the entire attack. Burn it in:

| | **Identity (AuthN)** | **Authorization (AuthZ)** |
|---|---|---|
| Question it answers | *"Who are you?"* | *"What are you allowed to do?"* |
| Proven by | Password, MFA, FIDO2 key, biometrics | A **token / consent grant** |
| Updated by | **Password reset, new MFA, new key** | **Revoking the grant / app** |
| Affected by a password reset? | ✅ Yes | ❌ **No** |

A password reset re-issues your *identity* credentials. The attacker's app never needed those — it holds a standing *authorization* grant. Until someone explicitly **severs the authorization**, the master key card keeps working.

---

## After Consent: Tokens, the Graph API, and the "Ghost"

Here's the attacker's view, in their own words:

> *"I am sitting on a server in Russia running a Python script. My script takes that glowing OAuth token, connects directly to the **Microsoft Graph API**, and silently downloads every single email the HR manager receives, in real time."*

The deadly properties:

- **No web browser** is used.
- **No login page** is triggered.
- **No 2FA prompt** is triggered.
- The API just sees a valid token, **validates the math, and hands over the data.**

> *"I can sit there for months, even if you change your password every single day. **I am a ghost in your cloud.**"*

This is the part defenders underestimate. There is **no failed-login telemetry**, **no impossible-travel sign-in**, **no MFA-fatigue signal** — because there is no interactive sign-in at all. The malicious traffic is **API calls with a legitimate token**. If you are only watching `SigninLogs`, you are blind to it. You have to watch **consent events** and **token/Graph activity** instead (see [Detection](#detection--hunting-the-grant-blue-team)).

---

## ⚠️ Reality Check: What *Actually* Happens When You Revoke

The talk says: *"Only then does the server destroy my golden token, and my Python script throws a 401 and gets kicked into the dark."* That's the right destination — but the timing has an important nuance every responder must know, or they'll declare victory too early.

**Revoking a delegated permission grant stops the issuance of *new* tokens. It does *not*, by itself, instantly kill tokens already issued.** Per Microsoft's own guidance, when a delegated grant is deleted, *existing access tokens remain valid until they expire* (Microsoft 365 default historically up to ~1 hour); only *new* tokens are refused. So an attacker can keep hitting the API for the remainder of the current token's lifetime.

This is exactly what **Continuous Access Evaluation (CAE)** exists to close. With CAE enabled on supported services (Exchange Online, SharePoint, Teams), Microsoft Entra ID pushes "critical event" notifications so tokens are **rejected in near real time** rather than living out their full lifetime — shrinking the up-to-one-hour gap to near-zero for those workloads.

Two more gotchas worth knowing:

- **Rogue service principals + CAE:** practitioners have observed that simply *deleting* a rogue service principal does **not** always invalidate CAE tokens already issued for it. The reliable move is to **revoke sessions for all affected users** in addition to removing the app — don't assume deletion alone is sufficient.
- **Default audit retention is short.** Entra audit logs are commonly only ~30 days by default. If the grant happened earlier, you may have *no record of who consented* unless logs are exported to a SIEM / Log Analytics with longer retention. Set this up *before* you need it.

**Bottom line for IR:** *Remove the app/grant **and** revoke sessions **and** verify CAE is on.* Any one of those alone leaves a window open.

---

## Risky Scopes Worth Memorizing

When you read a consent prompt or an audit record, these are the delegated Microsoft Graph scopes that should make your stomach drop in a phishing context:

| Scope | What it grants | Why attackers love it |
|---|---|---|
| `offline_access` | A **refresh token** (persistent access) | Turns a one-time consent into months of access |
| `Mail.Read` / `Mail.ReadWrite` | Read / modify the user's mailbox | Silent email exfiltration; inbox-rule sabotage |
| `Mail.Send` | Send mail **as the user** | Internal BEC, lateral phishing from a trusted account |
| `Files.Read.All` / `Files.ReadWrite.All` | Read/modify OneDrive & SharePoint files | Mass document theft |
| `User.Read` / `User.ReadBasic.All` | Read profile / directory | Recon, target enrichment |
| `Directory.Read.All` | Read the whole directory | Org-wide mapping |
| `EWS.AccessAsUser.All` | Exchange Web Services as the user | Legacy mailbox access path |

> **Heuristic:** *A "document viewer" or "HR tool" that requests `Mail.ReadWrite` + `offline_access` is almost never benign.* Scope should match stated function. A read-only PDF viewer has no business reading your mail.

---

## Detection — Hunting the Grant (Blue Team)

### Where to look first (portal)

Microsoft Entra admin center → **Identity → Monitoring & health → Audit logs**, then filter **Category = `ApplicationManagement`**. The activity you care about is **`Consent to application`** (the `AdditionalDetails` carry the `AppId`; `InitiatedBy` tells you *who* consented). A consent occurring **moments after** an app was first registered is a classic suspicious pattern.

### KQL — new consent to an app (Microsoft Sentinel / Log Analytics)

```kql
// Surface delegated consent events, flag risky scopes
AuditLogs
| where OperationName == "Consent to application"
| where Result == "success"
| extend Initiator = tostring(InitiatedBy.user.userPrincipalName)
| mv-expand TargetResources
| extend AppDisplayName = tostring(TargetResources.displayName)
| extend Props = TargetResources.modifiedProperties
| mv-apply p = Props on (
    where tostring(p.displayName) == "ConsentAction.Permissions"
    | extend GrantedScopes = tostring(p.newValue)
)
| extend RiskyScope = GrantedScopes has_any
        ("offline_access","Mail.Read","Mail.ReadWrite","Mail.Send",
         "Files.Read.All","Files.ReadWrite.All","Directory.Read.All")
| project TimeGenerated, Initiator, AppDisplayName, GrantedScopes, RiskyScope, CorrelationId
| sort by TimeGenerated desc
```

> Pivot on `CorrelationId` to tie the consent back to the originating sign-in, then to subsequent service-principal / Graph activity for the full kill chain. Microsoft ships a built-in **"ConsentToApplicationDiscovery"** hunting query in the official Azure-Sentinel GitHub repo and an **"App Consent Audit"** workbook — use them as a baseline rather than starting from zero.

### KQL — admin consent (tenant-wide blast radius)

```kql
AuditLogs
| where OperationName in ("Consent to application","Add app role assignment grant to user")
| mv-expand TargetResources
| extend Props = TargetResources.modifiedProperties
| mv-apply p = Props on (
    where tostring(p.displayName) == "ConsentContext.IsAdminConsent"
    | extend IsAdminConsent = tostring(p.newValue)
)
| where IsAdminConsent has "true"   // tenant-wide grant = high severity
| project TimeGenerated, OperationName, InitiatedBy, TargetResources
```

`IsAdminConsent = true` means an administrator granted access on behalf of the *entire tenant* — if unexpected, treat as a potential catastrophic compromise and confirm immediately.

### Service-principal sign-ins (token *use*, not user login)

```kql
// Non-interactive service principal activity — the "ghost" talking to APIs
AADServicePrincipalSignInLogs
| where AppDisplayName !in ("<your known apps>")
| summarize count(), make_set(IPAddress), make_set(ResourceDisplayName) by AppId, AppDisplayName, bin(TimeGenerated, 1h)
| sort by count_ desc
```

### Microsoft Defender for Cloud Apps (MDCA / MCAS)

Enable **OAuth app policies** and the built-in **risky OAuth app** detections. MDCA scores apps by permission level, community prevalence, and publisher trust, and can **auto-revoke** newly consented high-risk apps. This is your standing, automated tripwire.

### What you will *not* see

No brute-force, no impossible travel, no MFA failures. Stop expecting sign-in anomalies — **consent events and abnormal Graph/EWS access patterns are your signal.**

---

## Remediation — Killing the Ghost

The talk's blue-team steps are correct and preserved here:

> The security engineers log into the **Microsoft Entra ID** dashboard (or **Google Workspace admin console**), look at the **enterprise applications** connected to the user, and find — hiding among Zoom, Slack, and Salesforce — an app called **"Secure HR Integration."** They **select the malicious app → Revoke sessions → Remove app.** Only then does the server destroy the token, and only then does the attacker's script throw a **401 Unauthorized** and get kicked into the dark.

Here's the modern, precise version (the old `AzureAD`/`MSOnline` modules are deprecated — use **Microsoft Graph PowerShell**):

**Portal path:** Entra admin center → **Identity → Applications → Enterprise applications** (or **Users → [user] → Applications**) → select the malicious app → **Permissions / Properties** → **Revoke** the grant and **Delete** the service principal.

**PowerShell (Microsoft Graph SDK):**

```powershell
Connect-MgGraph -Scopes "Application.ReadWrite.All","DelegatedPermissionGrant.ReadWrite.All","Directory.ReadWrite.All"

# 1) Find the malicious service principal
$sp = Get-MgServicePrincipal -Filter "displayName eq 'Secure HR Integration'"

# 2) Enumerate and revoke its delegated permission grants
Get-MgServicePrincipalOauth2PermissionGrant -ServicePrincipalId $sp.Id -All |
    ForEach-Object { Remove-MgOauth2PermissionGrant -OAuth2PermissionGrantId $_.Id }

# 3) Remove any app-role (application permission) assignments it holds
Get-MgServicePrincipalAppRoleAssignment -ServicePrincipalId $sp.Id -All |
    ForEach-Object { Remove-MgServicePrincipalAppRoleAssignment `
        -ServicePrincipalId $sp.Id -AppRoleAssignmentId $_.Id }

# 4) Disable, then delete the service principal entirely
Update-MgServicePrincipal -ServicePrincipalId $sp.Id -AccountEnabled:$false
Remove-MgServicePrincipal -ServicePrincipalId $sp.Id
```

**Then — and this is the step people skip — revoke sessions for affected users** so already-issued tokens die:

```powershell
# Forces re-auth; invalidates refresh tokens for the user
Revoke-MgUserSignInSession -UserId "hr.manager@contoso.com"
```

Finally:

- **Confirm Continuous Access Evaluation is enabled** for Exchange/SharePoint/Teams so revocation bites in near real time rather than after the token's full lifetime.
- **Block the app by App ID via Conditional Access** as a belt-and-suspenders control.
- **Hunt for persistence the attacker may have planted while inside:** malicious **inbox rules** (auto-forward/delete), new **app registrations**, added **app credentials/secrets**, and mailbox **delegations**. Don't assume the consent grant was the only foothold.

---

## Prevention & Hardening

Stop the consent from ever succeeding:

1. **Restrict user consent.** Set user consent to **"Do not allow user consent"** or **"allow for verified publishers, selected low-risk permissions only."** Entra admin center → **Enterprise applications → Consent and permissions → User consent settings.** This is the single highest-leverage control.
2. **Enable the admin consent workflow.** When a user needs an app, the request is routed to reviewers instead of silently granted — turning a one-click compromise into a reviewed decision.
3. **App consent policies.** Permit only **publisher-verified** apps and a defined low-risk scope set; everything else requires admin review.
4. **Publisher verification + named app reviewers.** Untrusted/unverified publishers should never auto-succeed.
5. **Continuous Access Evaluation on** for all supported workloads.
6. **Weekly review of consent grants** in tenants with many apps and users (Microsoft's own recommended cadence). Use the App Consent Audit workbook / scheduled reports.
7. **Conditional Access** for app governance and to block known-bad App IDs.
8. **Train on the consent prompt, not just the URL.** The teachable moment is *"Why does a document viewer want to read my mail and stay connected forever?"*

---

## Google Workspace Equivalent

The same attack class targets Google with the `https://accounts.google.com` consent screen and the **Gmail / Drive APIs** instead of Graph.

- **Prevent:** Admin console → **Security → Access and data control → API controls → App access control.** Set third-party API access to **"Restricted"** and explicitly **allow-list trusted apps**; block everything unconfigured.
- **Configure** "Unconfigured third-party apps" to **"Don't allow users to access"** so internal-only consent is denied by default.
- **Detect:** **Security → Investigation tool** and **Token audit log** — review **OAuth token grants**, especially scopes like `https://mail.google.com/`, `gmail.readonly`, and `drive`.
- **Remediate:** Investigation tool (or **Users → [user] → Security → Connected applications**) → **Remove access / revoke the token**. Mark unverified apps as blocked.

---

## MITRE ATT&CK Mapping

| Tactic | Technique | ID | Role in this attack |
|---|---|---|---|
| Initial Access | Phishing: Spearphishing Link | **T1566.002** | The "Q3 payroll" lure email |
| Credential Access | Steal Application Access Token | **T1528** | Harvesting the OAuth access/refresh token via consent |
| Persistence / Priv. Esc. | Account Manipulation: Additional Cloud Roles / OAuth | **T1098** | Standing grant that outlives password resets |
| Defense Evasion / Lateral | Use Alternate Authentication Material: Application Access Token | **T1550.001** | Hitting Graph/Gmail APIs directly with the token |
| Collection | Email Collection: Remote Email Collection | **T1114.002** | Silent mailbox download via API |
| Exfiltration | Exfiltration Over Web Service / Alternative Protocol | **T1567** | Data pulled through the cloud API channel |

---

## Real-World Context

This is **not** a theoretical or YouTube-only attack:

- It is the documented technique behind multiple real **illicit consent grant** campaigns, and Microsoft maintains a dedicated **"Detect and remediate illicit consent grants"** playbook precisely because of its prevalence.
- Nation-state and criminal actors have repeatedly abused OAuth app consent for **stealthy, MFA-resistant mailbox persistence** — the exact "ghost in the cloud" property described above.
- Its defining strength is **bypassing identity controls** (MFA, FIDO2) by attacking **authorization** instead. That property hasn't changed and won't, because it's a consequence of how delegated OAuth is *designed* to work — not a bug to be patched.

The class is mature, well-understood, and **fully defendable** with the consent governance and detection in this document. The reason it keeps working is organizational: most tenants ship with **user consent enabled by default** and **nobody reviewing the grants**.

---

## Incident Response Runbook

A quick, ordered checklist for a confirmed illicit consent grant:

1. **Identify** the malicious app (display name, **App ID**, service-principal Object ID) from the consent audit event.
2. **Scope it:** how many users consented? User-level or **admin/tenant-wide**? Pull every `Consent to application` record for that App ID.
3. **Revoke the grant(s)** and **remove app-role assignments** (`Remove-MgOauth2PermissionGrant`).
4. **Disable + delete the service principal** (`Remove-MgServicePrincipal`).
5. **Revoke sign-in sessions** for all affected users (`Revoke-MgUserSignInSession`) — *don't skip this; the grant removal alone doesn't kill live tokens.*
6. **Verify CAE** is enabled for Exchange/SharePoint/Teams.
7. **Block the App ID** via Conditional Access.
8. **Hunt persistence:** inbox rules (auto-forward/delete), new app registrations, added secrets/certs, mailbox delegations, OAuth grants on *other* accounts.
9. **Assess exfiltration:** what scopes did it hold, for how long? Treat all data in those scopes as potentially exposed.
10. **Close the door:** restrict user consent, enable admin consent workflow, schedule weekly grant reviews.
11. **Notify** per your IR/legal/regulatory obligations.

---

## Key Takeaways — The Red-Teamer Mindset

> *"This is the difference between a script kiddie who runs old Kali Linux tools and a modern red-teamer who understands cloud architecture and application logic. If you don't understand how OAuth works, if you don't understand how APIs route tokens, you cannot operate in 2026 — you're just making noise."*

- **Stop thinking in passwords. Start thinking in tokens and authorization.**
- **The login page is legit; the trap is the consent prompt.** Defend the decision, not the domain.
- **Password resets and MFA solve identity. They do nothing for authorization.**
- **The signal isn't a sign-in anomaly — it's a consent event and abnormal API access.**
- **Revoke the grant *and* the sessions *and* verify CAE.** One alone leaves a window.
- **Architecture beats tooling.** Understanding *how OAuth routes tokens* is what separates effective offense and defense from noise.

> *Build your foundation. Learn the architecture. Understand how APIs route tokens — then neither attacking nor defending this will be a mystery to you.*

---

## References & Further Reading

- **Microsoft Learn** — *Detect and remediate illicit consent grants in Microsoft 365.* `learn.microsoft.com/en-us/defender-office-365/detect-and-remediate-illicit-consent-grants`
- **Microsoft Learn** — *Continuous Access Evaluation for Microsoft 365.* `learn.microsoft.com/en-us/defender-office-365/zero-trust-continuous-access-evaluation-microsoft-365`
- **Microsoft Learn** — *Grant and revoke API permissions programmatically* (Microsoft Graph PowerShell). `learn.microsoft.com/en-us/powershell/microsoftgraph/how-to-grant-revoke-api-permissions`
- **Microsoft Learn** — *Revoke user access in an emergency in Microsoft Entra ID.* `learn.microsoft.com/en-us/entra/identity/users/users-revoke-access`
- **Microsoft Defender for Cloud Apps** — *Investigate risky OAuth apps.* `learn.microsoft.com/en-us/defender-cloud-apps/investigate-risky-oauth`
- **MITRE ATT&CK** — T1528 (Steal Application Access Token), T1550.001 (Application Access Token), T1566.002 (Spearphishing Link). `attack.mitre.org`
- **Azure-Sentinel GitHub** — `ConsentToApplicationDiscovery.yaml` hunting query and the *App Consent Audit* workbook.
- **Thomas Naunheim / cloud-architekt.net** — *Detection and mitigation of consent grant attacks in Azure AD.*
- **Google Workspace Admin Help** — *Control which third-party & internal apps access Google Workspace data* (API controls / app access control).

---

## Appendix A: Source Transcript Notes

This README was built from an auto-generated transcript of a YouTube talk titled *"Bypassing Your Password Reset Like This…"* For completeness, the non-technical framing from the source is preserved here:

- The creator notes that, as a YouTube video, it **cannot get deeply/illegally technical** or build the exploit step-by-step in a live terminal — "we have to respect the rules so this video stays up." This document follows the same principle: it explains the attack at the conceptual level needed to **detect and defend** it, and deliberately omits any build-the-malicious-app or token-harvesting recipe.
- The creator promotes a forthcoming **free hands-on hacking platform with live legal labs**, funded by their paid PDF guides: *"Network Scanning from Beginner to Pro"* and *"Web App Hacking — No BS, 2026 Edition,"* with links in the original video description and an offer to refund readers who learn nothing.
- Closing sign-off: *"Build your foundation, learn the architecture, and get ready for the platform. Thank you for watching, hermanos — I'll see you in the next one."*

*(These promotional elements are reproduced here so no source content is lost; they are intentionally separated from the technical body above.)*

---

## Disclaimer

This material is for **defensive security, education, authorized red-teaming, and incident response** only. Perform testing **exclusively** against systems you own or have **explicit written authorization** to assess. Unauthorized access to accounts, mailboxes, or cloud tenants is illegal in virtually every jurisdiction. The author and contributors assume no liability for misuse.
