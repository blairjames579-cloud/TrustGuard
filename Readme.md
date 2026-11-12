# TrustGuard 🛡️

TrustGuard is a lightweight, local-first threat blocker built for users who value privacy, transparency, and complete control over their browsing experience. 

Unlike traditional security extensions that act as heavy black boxes routing your traffic through external cloud servers, TrustGuard is **100% open-source and completely transparent**. Every line of code is fully auditable, ensuring total accountability with zero hidden telemetry or tracking.

---

## 🚀 How TrustGuard is Different

* **Fully Open-Source & Transparent:** Built out in the open on GitHub. You can inspect every line of `background.js` and rule logic yourself to verify that it protects you without spying or collecting data.
* **100% Local-First Privacy:** All threat evaluations happen instantly inside your browser memory. Your browsing history never leaves your device or touches a third-party cloud.
* **5-Tier Threat Protection:** Goes beyond basic phishing filters by catching malware domains, unencrypted HTTP connections, high-risk sketchy TLDs (`.xyz`, `.zip`, `.top`), and lookalike Punycode (`xn--`) impersonation scams on the fly.
* **Context-Aware Visual Warnings:** Instead of a generic browser connection error, you get a clean, color-coded warning screen explaining precisely *why* a site was flagged (Phishing, Malware, Lookalike, Unverified Source, or Insecure Connection).
* **Instant One-Click Overrides:** Easily whitelist trusted false-positives directly from the warning page or manage your allowed domains via the lightweight toolbar popup manager.

---

## 📦 Installation Guide

1. Download this repository as a **.zip** file and extract it to a folder on your computer.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** using the toggle switch in the top-right corner.
4. Click **Load unpacked** in the top-left and select your extracted `TrustGuard` folder.

---

## ☕ Support Independent Development

TrustGuard is free, open-source, and independent. If you like it and want to support ongoing development, consider buying me a coffee:

👉 [Support TrustGuard on Ko-fi](https://ko-fi.com/james442)