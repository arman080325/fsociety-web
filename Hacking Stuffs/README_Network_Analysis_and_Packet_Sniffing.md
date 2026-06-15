# Network Analysis & Packet Sniffing — Study Notes

Companion notes for the *Network Analysis & Packet Sniffing Masterclass* video.
These notes summarize the tools and concepts for **defenders, network engineers,
and students learning traffic analysis on networks they own or are authorized to
monitor.**

> **Scope & ethics:** Capturing traffic on networks you don't own or have written
> permission to test is illegal in most places. Everything below is standard,
> dual-use network-administration knowledge — use it on your own lab, your own
> network, or with explicit authorization.

---

## 1. Command-line reconnaissance (knowing your own machine and network)

| Tool | What it tells you |
|------|-------------------|
| `ifconfig` / `ip a` | Your interface, IP address, subnet mask, MAC address |
| `netdiscover` | Other live hosts on the local segment |
| `ping <ip/host>` | Whether a host is reachable (ICMP echo request/reply) |
| `netstat` | Every inbound/outbound connection and listening port on your box |
| `ss` | Modern, faster replacement for `netstat`; richer socket stats |

Useful `netstat` switches mentioned: `-a` (all connections + listening ports),
`-s` (statistics), `-u` (UDP), `-l` (listening only — a good place to spot an
unexpected service). Piping into `grep` (e.g. `netstat -a | grep http`) filters
the noise.

**Defensive angle:** `netstat`/`ss` are core *threat-hunting* tools — they show
you what your own machine is talking to, which helps spot a suspicious or
unexpected outbound connection.

---

## 2. How sniffers work

- A **packet sniffer** (a.k.a. packet/protocol analyzer) intercepts and logs
  traffic crossing a network segment.
- Normally a network card (NIC) ignores frames not addressed to it. **Promiscuous
  mode** tells the card to accept *every* frame on the local segment — this is the
  prerequisite for sniffing.
- Tools mentioned in passing: SolarWinds DPI, WinDump, NetworkMiner, Capsa,
  TShark. The video focuses on the two most common: **tcpdump** and **Wireshark**.

---

## 3. tcpdump (command-line capture)

Raw, fast, terminal-based. Without filters it floods the screen, so filtering is
essential.

| Concept | Filter idea |
|---------|-------------|
| Save capture to disk | `-w evidence.pcap` (write raw packets for later analysis) |
| Traffic to/from one host | `host <ip>` |
| Only outbound from a host | `src host <ip>` |
| Filter by port | `dst port 80` (unencrypted HTTP) |
| Verbose header decode | `-vv` (deeper IP/TCP header detail) |
| TCP flags (e.g. SYN) | flag-match expressions — useful for spotting port scans |
| Combine / exclude | logical `and` / `or` / `not` (e.g. `not host <ip>`) |

**Security lesson:** legacy plaintext protocols — **HTTP, FTP, Telnet** — send
credentials in the clear. This is *why* they were deprecated in favor of HTTPS,
SFTP, and SSH. The takeaway is defensive: encrypt everything; assume anything on
port 80/21/23 is readable on the wire.

---

## 4. Wireshark (graphical analysis)

The gold-standard GUI analyzer. Opens the `.pcap` files tcpdump captures and
organizes them with color-coding and full protocol decoding.

Filter-bar basics (display filters):

| Goal | Filter |
|------|--------|
| One conversation | `ip.addr == <ip>` |
| Traffic to a port | `tcp.dstport == 80` |
| Deep payload search | `tcp contains "<string>"` (scans ASCII/hex payloads) |

`tcp contains` enables **deep packet inspection** — searching payloads for a
specific string, handy for malware/IoC hunting.

---

## 5. Why this matters

Sniffers aren't only offensive tools — they're the flashlight you use to see what
is happening in the dark corners of a network. The better you understand capture,
filtering, and analysis, the stronger you are as a **network engineer, blue-team
defender, or authorized pentester.**

### Further learning
- Wireshark User's Guide & display-filter reference
- `tcpdump` man page / pcap-filter (BPF) syntax
- Practice on your own lab traffic or public capture samples (e.g. the Wireshark
  sample-captures wiki)
