# Car Hacking & Vehicle Security — Study Notes

Companion notes for the *Car Hacking (Full Guide)* video. A conceptual overview of
**automotive attack surfaces, in-vehicle bus protocols, and the threat-modeling /
reverse-engineering methodology** used to *secure* vehicles.

> **Safety & ethics (the video repeats this throughout):** work only on a vehicle
> you own or a bench/lab rig, with permission, and **never inject packets on a
> moving car** — these are safety-critical systems. The material is for
> understanding and protecting vehicles, not attacking others'.

---

## 1. Threat modeling a vehicle

A modern car is "a computer on wheels" — think of it as a house whose doors and
windows are Bluetooth, USB, key fobs, charging ports, cellular, and Wi-Fi.

Threat modeling = mapping how the parts talk to each other, by levels:

- **Level 0 — attack surfaces:** draw the car; mark every input (Bluetooth, USB,
  sensors, cellular, internet); separate external vs. internal threats.
- **Level 1 — receivers:** which component each input actually reaches
  (infotainment, sensors, control units).
- **Level 2 — receiver breakdown:** zoom into a component's internal zones / trust
  boundaries (e.g. infotainment Bluetooth stack, Wi-Fi supplicant, cellular driver,
  USB device manager, CAN driver) and note which are higher-risk.
- **Threat identification:** brainstorm "what could go wrong here?", then **score
  and rank** risks to prioritize fixes.

**Example exposed surfaces:** cellular (a "phone in the car"), Wi-Fi, key fobs
(jam/clone/relay), TPMS tire sensors (spoofable), infotainment, USB, Bluetooth,
and the **CAN bus** via the OBD-II port.

---

## 2. Real-world cases (why it matters)

- **2015 Jeep Cherokee** — researchers remotely affected a moving Jeep; led to a
  ~1.4M-vehicle recall and a security patch.
- **Relay / keyless theft waves** — amplifying a key-fob signal to unlock and
  start cars without the key present.
- **Key-cloning research** — academics cloned a vehicle key with cheap gear (2018).

Common thread: **weak defaults, unpatched software, exposed entry points** — the
exact things threat modeling surfaces and defenders fix.

---

## 3. In-vehicle bus protocols (the "what" and "why")

| Protocol | Role / notes |
|----------|--------------|
| **CAN** | The dominant bus since the mid-'90s; two-wire differential signaling; short broadcast messages (ID + length + ≤8 data bytes). Accessible at the **OBD-II** port. |
| **ISO-TP** | Splits larger messages across multiple CAN frames (used for diagnostics/UDS). |
| **CANopen** | Structured layer over CAN (function code + node ID = COB-ID); common in industrial gear. |
| **GMLAN** | GM's CAN variant — low-speed single-wire (comfort features) + high-speed dual-wire (critical systems). |
| **SAE J1850** | Older (PWM / VPW variants); seen in older GM/Chrysler. |
| **Keyword Protocol 2000 / K-Line (ISO 9141)** | Serial-style diagnostics; pin 7. |
| **LIN** | Cheapest, simplest; single master + slave nodes for windows, locks, seats. |
| **MOST** | Ring topology for multimedia/infotainment. |
| **FlexRay** | High-speed (≤10 Mbps), time-triggered (TDMA), for drive/steer/brake-by-wire; harder to sniff (often needs a FIBEX description + specialized hardware; bus-guardian protections). |
| **Automotive Ethernet** | Where modern vehicles are heading; fast, can tunnel CAN-in-UDP. |

**OBD-II:** the diagnostic port (usually under the dash) and the common access
point to CAN. Pinouts vary by make/model; a DB9-to-OBD2 adapter is typical for
bench work.

---

## 4. Tooling for *safe, owned-vehicle* study

- **SocketCAN** — open-source Linux framework that treats a CAN bus like a normal
  network interface; supports **virtual CAN** so you can experiment without real
  hardware.
- **can-utils** — `candump` (capture), `cansniffer` (groups by ID, highlights
  changed bytes), `canplayer` (replay captures). Pair with **Wireshark** or
  **Kayak** for analysis.

---

## 5. Reverse-engineering methodology (high level)

The video keeps this conceptual: it's **detective work, done on a bench rig or
simulator**, not a recipe to manipulate a live car.

1. Identify the bus / access point (often OBD-II).
2. **Capture** traffic with `candump` / `cansniffer`.
3. Run **short, repeatable, harmless actions** (lock a door, press brake) and watch
   which message IDs/bytes change consistently.
4. **Correlate** byte changes to actions to build an ID → behavior map.
5. **Validate in a simulator / virtual CAN**, where replay can't affect a real
   vehicle.

CAN is noisy (thousands of frames/min) and message formats differ per make/model,
so grouping-by-ID and change-highlighting are what make patterns visible.

---

## 6. Owner-level defense
- Limit what can connect to the infotainment system; don't install sketchy apps.
- **Keep the vehicle's software updated.**
- Be cautious about unknown devices plugged into OBD-II.
- Understand whether your car "phones home" and what telematics/logs it may send
  (privacy as well as security).

### Further learning
- *The Car Hacker's Handbook* (Craig Smith) and OpenGarages resources
- SocketCAN & can-utils documentation
- Automotive ISO standards: ISO 11898 (CAN), ISO 15765 (ISO-TP/UDS)
