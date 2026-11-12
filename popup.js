document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('whitelistList');

  chrome.storage.local.get(null, (items) => {
    listEl.innerHTML = '';
    const domains = Object.keys(items);

    if (domains.length === 0) {
      listEl.innerHTML = '<li class="empty">No whitelisted domains yet.</li>';
      return;
    }

    domains.forEach((domain) => {
      const li = document.createElement('li');
      li.textContent = domain;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => {
        chrome.storage.local.remove(domain, () => {
          li.remove();
          if (listEl.children.length === 0) {
            listEl.innerHTML = '<li class="empty">No whitelisted domains yet.</li>';
          }
        });
      });

      li.appendChild(removeBtn);
      listEl.appendChild(li);
    });
  });
});
document.getElementById('shareBtn').addEventListener('click', (e) => {
  e.preventDefault();
  const repoUrl = "https://github.com/YOUR_USERNAME/TrustGuard";
  navigator.clipboard.writeText(repoUrl).then(() => {
    alert("TrustGuard GitHub link copied to clipboard!");
  });
});