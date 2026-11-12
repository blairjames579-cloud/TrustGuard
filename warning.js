const urlParams = new URLSearchParams(window.location.search);
const targetUrl = urlParams.get('target');
const threatType = urlParams.get('type') || 'phishing';

const card = document.getElementById('warningCard');
const title = document.getElementById('warningTitle');
const desc = document.getElementById('warningDesc');
const domainBadge = document.getElementById('blockedDomain');
const proceedBtn = document.getElementById('whitelist');

if (targetUrl) {
  try {
    domainBadge.textContent = new URL(targetUrl).hostname.replace(/^www\./, '');
  } catch (e) {
    domainBadge.textContent = targetUrl;
  }
}

if (threatType === 'malware') {
  card.style.borderLeftColor = '#b339ff';
  title.style.color = '#b339ff';
  proceedBtn.style.backgroundColor = '#b339ff';
  title.textContent = '🦠 Malware / Virus Threat Blocked';
  desc.textContent = 'This domain is flagged on the live URLhaus database for distributing malware, spyware, or malicious payloads.';
} else if (threatType === 'suspicious') {
  card.style.borderLeftColor = '#00e5ff';
  title.style.color = '#00e5ff';
  proceedBtn.style.backgroundColor = '#00e5ff';
  proceedBtn.style.color = '#121212';
  title.textContent = '🕵️ Suspicious Domain / Lookalike Scam';
  desc.textContent = 'This site uses a high-risk domain extension (.xyz, .top, .zip) or disguised lookalike characters (Punycode) frequently used in impersonation scams.';
} else if (threatType === 'untrusted') {
  card.style.borderLeftColor = '#3b82f6';
  title.style.color = '#3b82f6';
  proceedBtn.style.backgroundColor = '#3b82f6';
  title.textContent = '📰 Unverified / Low-Trust Source';
  desc.textContent = 'This domain is flagged for publishing unverified claims, heavy clickbait, or fabricated stories. Verify claims independently.';
} else if (threatType === 'insecure') {
  card.style.borderLeftColor = '#ffaa00';
  title.style.color = '#ffaa00';
  proceedBtn.style.backgroundColor = '#ffaa00';
  proceedBtn.style.color = '#121212';
  title.textContent = '🔓 Unencrypted Connection (HTTP)';
  desc.textContent = 'This site does not use HTTPS encryption. Any passwords or data you enter here can be intercepted on your network.';
} else {
  // Default: Phishing (Red)
  card.style.borderLeftColor = '#ff4d4d';
  title.style.color = '#ff4d4d';
  proceedBtn.style.backgroundColor = '#ff4d4d';
  title.textContent = '🎣 Phishing / Deceptive Site Blocked';
  desc.textContent = 'This domain is listed on the Phishing Army live threat feed for impersonating trusted websites or stealing credentials.';
}

document.getElementById('goBack').addEventListener('click', () => {
  window.history.back();
});

proceedBtn.addEventListener('click', () => {
  if (targetUrl) {
    const domain = new URL(targetUrl).hostname.toLowerCase().replace(/^www\./, '');
    chrome.storage.local.set({ [domain]: true }, () => {
      window.location.href = targetUrl;
    });
  }
});