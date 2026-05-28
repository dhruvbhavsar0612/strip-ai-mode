# No AI Overviews for Google Search

A minimal Chrome extension (Manifest V3) that removes **AI Overviews** from Google
Search by automatically switching results to Google's own **Web-only mode**
(the `udm=14` URL parameter). It ships with a toolbar toggle so you can turn the
behavior on or off at any time.

## How it works

When enabled, the extension uses Chrome's `declarativeNetRequest` API to add
`udm=14` to your Google search URLs before the page loads. This is the same thing
that clicking the **Web** filter under the search box does, so Google itself
returns the classic list of links without an AI Overview. No page content is read
or modified, and nothing is sent to any external server.

```
https://www.google.com/search?q=your+query
            ->  https://www.google.com/search?q=your+query&udm=14
```

A second rule leaves any search that already has a `udm` parameter untouched, so
Google Images (`udm=2`), the AI Mode tab (`udm=50`), and already-converted pages
are never overwritten.

## Install (load unpacked)

1. Open `chrome://extensions` in Chrome.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and select this folder.
4. The extension is on by default. Click its toolbar icon to toggle it.

## What it changes

- Removes **AI Overviews** from normal Google web searches.
- Works across common regional Google domains (`google.com`, `google.co.uk`,
  `google.de`, and more — see `host_permissions` in `manifest.json`).

## What it does not change

- The dedicated **AI Mode** tab (`udm=50`) — left alone on purpose, so you can
  still use it deliberately.
- The **AI Mode button** in Chrome's address bar — that is a Chrome feature, not
  part of Google Search, and can only be changed via `chrome://flags`.
- AI features in other Google products (Gmail, YouTube, etc.).

## Side effect

Web-only mode is a stripped-down results view. Along with AI Overviews, it also
hides featured snippets and some knowledge-panel content. This is the trade-off
for a stable, server-side approach that does not break when Google changes its
page markup.

## Privacy

The extension collects no data, contains no tracking, and makes no network
requests of its own. The redirect rules run entirely on your device.

## Project layout

```
manifest.json        MV3 manifest, permissions, ruleset registration
rules.json           declarativeNetRequest redirect + allow rules
background.js        Enables/disables the ruleset from the saved toggle state
popup/               Toolbar popup with the on/off switch
icons/               Toolbar and store icons (and the generator script)
```
