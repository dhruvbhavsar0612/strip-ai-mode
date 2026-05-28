const RULESET_ID = "ruleset_no_ai";
const STORAGE_KEY = "enabled";

async function isEnabled() {
  const stored = await chrome.storage.local.get(STORAGE_KEY);
  return stored[STORAGE_KEY] !== false;
}

async function applyState(enabled) {
  await chrome.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: enabled ? [RULESET_ID] : [],
    disableRulesetIds: enabled ? [] : [RULESET_ID]
  });
  await chrome.action.setBadgeText({ text: enabled ? "" : "OFF" });
  await chrome.action.setBadgeBackgroundColor({ color: "#9aa0a6" });
}

async function syncFromStorage() {
  await applyState(await isEnabled());
}

chrome.runtime.onInstalled.addListener(syncFromStorage);
chrome.runtime.onStartup.addListener(syncFromStorage);

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && STORAGE_KEY in changes) {
    applyState(changes[STORAGE_KEY].newValue !== false);
  }
});
