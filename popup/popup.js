const STORAGE_KEY = "enabled";
const toggle = document.getElementById("toggle");

async function init() {
  const stored = await chrome.storage.local.get(STORAGE_KEY);
  toggle.checked = stored[STORAGE_KEY] !== false;
}

toggle.addEventListener("change", () => {
  chrome.storage.local.set({ [STORAGE_KEY]: toggle.checked });
});

init();
