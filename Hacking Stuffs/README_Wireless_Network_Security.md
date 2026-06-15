# Wireless Network Security — Study Notes

Companion notes for the *Full Guide on Hacking Wireless Networks* video. A
structured summary of **wireless concepts, encryption protocols, attack
*categories*, the tools associated with each, and (importantly) the defenses.**

These are study notes at the conceptual level — what each protocol/attack/tool
*is* and *why it matters* — not a copy-paste attack cookbook. For the actual
command syntax of authorized testing tools, use each tool's official
documentation.

> **Ethics & law:** testing Wi-Fi you don't own or aren't authorized to assess is
> illegal in most jurisdictions. The defensive section at the end is the practical
> payoff of understanding all of this.

---

## 1. Core wireless concepts

Key terms: **access point (AP)**, **SSID** (network name, up to 32 chars),
**BSSID** (AP's MAC), **association** (the join process), **ISM band**, **hotspot**.
Spread-spectrum ideas: DSSS, FHSS; modern multiplexing: OFDM, MU-OFDM (4G/5G).

**802.11 standard family (quick map):**

| Standard | a.k.a. | Notes |
|----------|--------|-------|
| 802.11a | — | 5 GHz, up to 54 Mbps |
| 802.11b | — | 2.4 GHz, up to 11 Mbps |
| 802.11g | — | 2.4 GHz, up to 54 Mbps |
| 802.11n | Wi-Fi 4 | MIMO, 2.4 + 5 GHz |
| 802.11ac | Wi-Fi 5 | 5 GHz, high throughput |
| 802.11ax | Wi-Fi 6 | dense environments |
| 802.11be | Wi-Fi 7 | emerging, very high throughput |

Authentication modes: **PSK** (pre-shared key — home/small office) vs.
**centralized** (802.1X / RADIUS — enterprise, per-user credentials).

---

## 2. Encryption protocols (evolution = security improving)

| Protocol | Status | Summary |
|----------|--------|---------|
| **WEP** | Broken / obsolete | RC4 with a static key; reused keystreams make it trivially breakable. Do not use. |
| **WPA** | Outdated | Added TKIP (per-packet keying) as a stopgap over WEP. |
| **WPA2** | Widely deployed | AES-CCMP; 4-way handshake; personal (PSK) and enterprise (802.1X) modes. |
| **WPA3** | Current best | SAE / "Dragonfly" handshake resists offline guessing; protected management frames; OWE for open networks; larger keys in enterprise. |

**Takeaway:** WEP and WPA are dead; use **WPA2-AES** at minimum and **WPA3** where
supported.

---

## 3. The wireless attack methodology (conceptual phases)

1. **Discovery / footprinting** — find networks in range.
   - *Passive:* listen for beacons/SSIDs without interacting.
   - *Active:* send probe requests.
   - "War-driving/walking/flying" = mobile discovery with a Wi-Fi adapter + antenna.
2. **Traffic analysis** — put the card in **monitor mode** and study frame types,
   encryption in use, MACs, and associated clients.
3. **Attack** — depending on the weakness (see categories below).
4. **Crack encryption** (if applicable).
5. **Assess impact.**

A capable adapter matters: a chipset that supports **monitor mode** (and, for some
techniques, **packet injection**) is required. Linux supports both; many Windows
setups only support listening.

---

## 4. Attack *categories* (what they are, and the tools named)

> Described at a conceptual level so you can recognize and defend against them.

- **Hidden-SSID discovery** — hiding an SSID is "security through obscurity"; the
  name still appears in association traffic and is easily recovered.
- **Denial of service** — **deauthentication / disassociation** floods of forged
  management frames knock clients off an AP; **RF jamming** drowns the channel with
  noise. (WPA3's protected management frames mitigate deauth.)
- **Man-in-the-middle** — combine a deauth with a look-alike **rogue AP** so a
  client reconnects to the attacker.
- **MAC spoofing** — impersonate a trusted MAC to defeat MAC filtering (which is
  why MAC filtering alone isn't real security).
- **ARP poisoning** — corrupt ARP caches so traffic flows through the attacker;
  associated with `ettercap`.
- **Rogue AP / Evil Twin** — a fake AP cloning a legitimate SSID to harvest data
  from users who connect.
- **WPS attacks** — the 8-digit WPS PIN is a design weakness; tools like **Reaver**
  target it. **Disable WPS.**
- **WPA/WPA2 handshake cracking** — capture the 4-way handshake, then attempt an
  **offline dictionary/brute-force** crack against it. Strength depends entirely on
  password complexity.
- **WPA3 weaknesses** — **Dragonblood**-class issues and **downgrade attacks**
  (tricking client+AP into falling back to WPA2), plus side-channel research.
- **LTE "aLTEr" / fake base station** — a rogue cell tower MITM against 4G LTE;
  relevant as a mobile-network analog.

**Tool families referenced (legitimate, authorized-testing tools):**
the **aircrack-ng suite** (`airmon-ng`, `airodump-ng`, `aireplay-ng`,
`aircrack-ng`, etc.), **Reaver** + **wash** (WPS), **airgeddon** (wrapper script),
**Wireshark** / **CommView** (analysis), **Fern Wi-Fi Cracker**, **hashcat** +
**hcxtools** (offline cracking), discovery apps like **Fing**, **WiFi Analyzer**,
**inSSIDer**, **Sparrow-Wi-Fi**, **Kismet**.

---

## 5. Defending your wireless network (the practical payoff)

- **Strong passphrase:** 12–16+ chars, mixed character classes — this is the single
  biggest factor against offline cracking.
- **Use WPA3** if supported; otherwise **WPA2 with AES** (disable TKIP).
- **Disable WPS** (known PIN weakness).
- **Disable remote router management;** change default SSID and admin password.
- **Keep router firmware updated** — patches fix known wireless CVEs.
- **Reduce transmit power** so the signal doesn't spill far outside your space.
- **Monitor** for rogue APs and unusual devices; consider a **WIPS** (wireless
  intrusion prevention system).
- On public Wi-Fi, **verify network authenticity** and use a **VPN**; assume evil
  twins exist.
- For enterprise: **802.1X/RADIUS** with per-user credentials; validate the server
  certificate to prevent rogue-server switching.

### Further learning
- aircrack-ng documentation & the Wi-Fi security chapters of OWASP/standard
  certification material
- The official WPA3 specification and the Dragonblood research papers (for
  understanding the downgrade/side-channel issues)
- Practice only on your own lab AP or an authorized engagement
