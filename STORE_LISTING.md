# Chrome Web Store submission kit

Everything needed for the Chrome Web Store listing. Copy fields into the
Developer Dashboard at https://chrome.google.com/webstore/devconsole.

## Item name

No AI Overviews for Google Search

## Summary (132 chars max)

Strips AI Overviews from Google Search by switching to Web-only results. One-click toggle. No tracking.

## Description

Tired of AI Overviews taking over your Google results? This extension brings
back the classic list of links.

When enabled, it automatically switches your Google searches to Google's own
"Web" results mode (the udm=14 parameter) - the same thing as clicking the
"Web" filter under the search box, but done for you on every search. AI
Overviews disappear and you get straight to the actual websites.

Features
- One-click toggle in the toolbar (on by default)
- Works across Google domains worldwide
- Leaves Google Images, the AI Mode tab, and other tools untouched
- No accounts, no tracking, no data collection - rules run entirely on your device

Note: "Web" mode is a stripped-down view, so featured snippets and some
knowledge-panel content are also hidden. This is the trade-off for a stable
approach that does not break when Google changes its page layout.

This extension does not remove the AI Mode button in Chrome's address bar
(that is a Chrome setting, changeable at chrome://flags) or AI features in
other Google products.

## Category

Tools (or Productivity)

## Single purpose statement

This extension has one purpose: to remove AI Overviews from Google Search
results by redirecting search page requests to Google's Web-only results mode.

## Permission justifications

- declarativeNetRequest: Used to append the `udm=14` parameter to Google
  search page loads so Google returns Web-only results. No request content is
  read; rules are declarative and run locally.
- storage: Stores the single on/off toggle preference locally.
- host_permissions (Google domains): Required so the redirect rule can apply to
  Google Search URLs across regional Google domains. The extension only acts on
  `/search` pages and never reads page content.

## Data usage / privacy disclosures

- Does this item collect user data? No.
- No data is collected, transmitted, or sold. All logic runs on-device.
- Privacy policy: not strictly required when no data is collected, but a public
  URL (e.g. a GitHub Pages page or the repo README) is recommended.

## Required store assets (you must create these)

- Store icon: 128x128 PNG (already have `icons/icon128.png`).
- Screenshots: at least one, 1280x800 or 640x400 PNG/JPEG. Suggested shots:
  1. A Google search with the extension ON (no AI Overview, clean links).
  2. The toolbar popup showing the toggle.
- Small promo tile (optional): 440x280.
- Marquee promo (optional): 1400x560.

## Pre-submission checklist

- [ ] manifest version bumped and matches the release tag
- [ ] Zip built via `build.ps1` (or the Release workflow) - contains only runtime files
- [ ] Screenshots captured at correct dimensions
- [ ] Single-purpose + permission justifications filled in
- [ ] Privacy practices tab completed ("no data collected")
- [ ] Visibility chosen: Unlisted (soft preview) / Private + Trusted testers (beta) / Public
- [ ] Developer account verified (one-time $5 fee paid)

## Rollout strategy

1. Submit as Unlisted or Private + Trusted testers for preview.
2. After review passes, share the install link with testers.
3. Flip to Public when ready. For later updates, use staged percentage rollout.
