const PHISHING_FEED = "https://phishing.army/download/phishing-army-domains.txt";

// Built-in test domains that NEVER get erased when Chrome sleeps
const BUILTIN_MALWARE = new Set(["example.org", "test.com"]);
const BUILTIN_PHISHING = new Set(["example.com", "amiprotected.it"]);
const BUILTIN_UNTRUSTED = new Set(["example.net"]);
const SKETCHY_TLDS = [".xyz", ".top", ".zip", ".loan", ".click", ".work", ".gq", ".tk", ".ml", ".cf"];

let livePhishingDomains = new Set();

async function updateThreatFeeds() {
  try {
    const res = await fetch(PHISHING_FEED);
    if (res.ok) {
      const text = await res.text();
      const updated = new Set();
      for (let line of text.split('\n')) {
        line = line.trim().toLowerCase();
        if (line && !line.startsWith('#')) updated.add(line);
      }
      livePhishingDomains = updated;
      console.log("Loaded live feed:", livePhishingDomains.size);
    }
  } catch (e) {
    console.warn("Feed fetch skipped:", e);
  }
}

updateThreatFeeds();

// Intercept navigation immediately without waiting on network feeds
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const currentUrl = changeInfo.url || tab.url;
  if (!currentUrl || !currentUrl.startsWith("http")) return;

  // Never block our own extension warning page
  if (currentUrl.includes(chrome.runtime.id)) return;

  try {
    const url = new URL(currentUrl);
    const domain = url.hostname.toLowerCase().replace(/^www\./, '');

    let threatType = null;

    if (BUILTIN_MALWARE.has(domain)) {
      threatType = "malware";
    } else if (BUILTIN_PHISHING.has(domain) || livePhishingDomains.has(domain)) {
      threatType = "phishing";
    } else if (domain.includes("xn--") || SKETCHY_TLDS.some(tld => domain.endsWith(tld))) {
      threatType = "suspicious";
    } else if (BUILTIN_UNTRUSTED.has(domain)) {
      threatType = "untrusted";
    } else if (url.protocol === "http:" && domain !== "localhost" && domain !== "127.0.0.1") {
      threatType = "insecure";
    }

    if (threatType) {
      chrome.storage.local.get([domain], (result) => {
        if (result[domain]) return; // Whitelisted!
        const warningPage = chrome.runtime.getURL(
          `warning.html?target=${encodeURIComponent(currentUrl)}&type=${threatType}`
        );
        chrome.tabs.update(tabId, { url: warningPage });
      });
    }
  } catch (e) {}
});