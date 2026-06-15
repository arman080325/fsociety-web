# OAuth Consent Phishing — The Attack That Survives a Password Reset

> **Topic:** Advanced Corporate Hacking Technique — 2026  
> **Attack Type:** OAuth Consent Phishing / Illicit Consent Grant  
> **Target Surface:** Cloud Identity Platforms (Microsoft 365, Google Workspace)

---

## Table of Contents

1. [Overview](#overview)
2. [The Scenario](#the-scenario)
3. [How the Attack Works](#how-the-attack-works)
   - [Step 1 — The Phishing Email](#step-1--the-phishing-email)
   - [Step 2 — The Real Login Page](#step-2--the-real-login-page)
   - [Step 3 — The Kill Zone](#step-3--the-kill-zone)
   - [Step 4 — Token Theft](#step-4--token-theft)
4. [Why Changing Your Password Does Nothing](#why-changing-your-password-does-nothing)
5. [The OAuth Framework — Explained Simply](#the-oauth-framework--explained-simply)
6. [How the Attacker Stays In](#how-the-attacker-stays-in)
7. [How to Stop It — Blue Team Defense](#how-to-stop-it--blue-team-defense)
8. [Key Takeaways](#key-takeaways)

---

## Overview

In modern hacking, attackers no longer target your **password**.

They bypass the concept of passwords entirely.

This document explains **OAuth Consent Phishing** (also known as an **Illicit Consent Grant**) — an attack that gives a hacker persistent access to your account even after you:

- Change your password
- Enable Multi-Factor Authentication (MFA)
- Use a hardware security key (e.g. YubiKey)
- Add a fingerprint scanner

This is not a theoretical vulnerability. It is an active, real-world attack vector used against corporations today.

---

## The Scenario

Imagine a hacker gains access to a high-value account — perhaps the email of a CEO at a billion-dollar company.

The security team detects the intrusion. The CEO is alerted.

**Immediate response:**

- Password changed — 20+ characters, complex
- Multi-Factor Authentication enabled
- Hardware YubiKey purchased and configured
- Account locked down

The security team breathes a sigh of relief. *"The attacker is locked out."*

**In 2026, the attacker is laughing.**

They don't care about the new password. They don't care about the YubiKey. They are still inside the account — silently downloading every email, reading private files, watching everything in real time.

---

## How the Attack Works

### Step 1 — The Phishing Email

The attacker sends a professionally crafted email to a target — for example, an HR manager at a company.

**Email content:**
- Subject: *"Urgent: Q3 Payroll Updates and Employee Policy Changes"*
- Company logo included
- Looks completely legitimate
- Contains a link: *"View the document securely"*

The HR manager clicks the link.

---

### Step 2 — The Real Login Page

This is what separates this attack from old-school phishing.

The manager is taken to the **real, 100% legitimate** Microsoft or Google login page.

- The URL is genuine — no spoofing
- The SSL certificate is valid
- The password manager **auto-fills** credentials
- The 2FA prompt appears on the phone
- The manager passes **every single security check**

There is no fake login page. There is no trick at the login stage.

---

### Step 3 — The Kill Zone

After a successful login, a new screen appears.

> **"Secure HR App wants to access your account."**
>
> This app would like to:
> - Read your user profile
> - Read your emails
> - Maintain access to data you have given it access to

The HR manager is busy. They assume this is an internal company app. They click **Accept**.

**The war is over.**

---

### Step 4 — Token Theft

When the user clicks Accept, here is what happens behind the scenes:

1. Microsoft/Google verifies the user's identity (successfully — they passed all checks)
2. The platform generates two cryptographically signed tokens:
   - **Access Token** — grants immediate API access
   - **Refresh Token** — allows the attacker to keep generating new access tokens indefinitely
3. These tokens are handed **directly to the attacker's malicious cloud application**

The attacker now holds a **master key** to the account — without ever knowing the password.

---

## Why Changing Your Password Does Nothing

This is the critical concept most people — including many security professionals — misunderstand.

**Identity and authorization are two completely different things in modern cloud architecture.**

| Action | What It Changes |
|--------|-----------------|
| Change Password | Updates *identity* — how you prove who you are |
| Revoke OAuth Token | Kills *authorization* — the master key already issued |

Changing your password is like changing your ID card.

But the front desk already issued a **master key card** to the attacker's application. No one deactivated it.

The attacker's script connects directly to the **Microsoft Graph API** or **Google API** using the OAuth token. It does not:

- Open a browser
- Trigger a login page
- Trigger a 2FA prompt

The API simply validates the token mathematically and returns the data.

The attacker can sit undetected for **months** — even if the victim changes their password every single day.

---

## The OAuth Framework — Explained Simply

**OAuth** is a standard framework that allows a user to grant a third-party application access to their data — *without sharing their password.*

You use it every time you see:

> *"Sign in with Google"* or *"Allow this app to access your account"*

**Legitimate use cases:** Zoom accessing your calendar, Slack accessing your profile, Salesforce syncing your email.

**Malicious use case:** An attacker registers a fake "Secure HR Integration" app and tricks a user into granting it the same permissions.

Once granted, OAuth tokens persist independently of the user's password. The attacker's application is treated exactly like a trusted, authorized service.

---

## How the Attacker Stays In

```
[Attacker's Server]
       |
       | OAuth Access Token (stolen via consent phishing)
       |
       v
[Microsoft Graph API / Google API]
       |
       | Token validated — access granted
       |
       v
[Victim's Mailbox / Files / Calendar]
```

The attacker runs a Python script that:

1. Takes the OAuth access token
2. Connects to the Microsoft Graph API or Google API
3. Silently downloads every email received in real time
4. Uses the refresh token to generate new access tokens when the old ones expire

No browser. No login page. No 2FA prompt. Just a silent API connection running in the background.

---

## How to Stop It — Blue Team Defense

Changing the password is **not enough**. The authorization grant must be revoked directly.

### For Microsoft 365 (Azure / Entra ID)

1. Log in to the **Microsoft Entra ID dashboard** (formerly Azure Active Directory)
2. Navigate to: `Enterprise Applications` → Select the affected user
3. Review the list of connected/authorized applications
4. Identify the malicious app (e.g., "Secure HR Integration")
5. Click **Revoke Sessions** and **Remove App**

### For Google Workspace

1. Log in to the **Google Workspace Admin Console**
2. Navigate to: `Security` → `API Controls` → `Manage Third-Party App Access`
3. Identify the unauthorized application
4. Revoke access

### What Happens After Revocation

Once the OAuth token is revoked at the platform level, the attacker's script receives a `401 Unauthorized` error. The connection is severed. The ghost is removed.

---

## Key Takeaways

- **Old phishing** steals passwords via fake login pages. Browsers and antivirus now block most of these.
- **OAuth consent phishing** exploits legitimate login flows. There is nothing to block — the login is real.
- **Access tokens and refresh tokens** persist independently of the user's password.
- **Changing your password does not revoke OAuth tokens.** This is a fundamental architectural truth, not a bug.
- **Detection requires** actively reviewing authorized applications in identity management dashboards.
- **Remediation requires** manually revoking the malicious application's access at the admin level.
- A modern attacker does not need your password. They need your **consent**.

---

> *"If you don't understand how OAuth works, if you don't understand how APIs route tokens, you cannot understand modern security. This is not old-school hacking. This is cloud architecture exploitation."*

---

*Document based on OAuth Consent Phishing / Illicit Consent Grant attack methodology.*  
*For educational and defensive security purposes only.*
