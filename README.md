# No AI Overviews for Google Search

Strip **AI Overviews** out of Google Search and get back the classic list of
links. The extension automatically switches your searches to Google's own
**Web-only mode** (the `udm=14` parameter), with a one-click toolbar toggle.

## Install

### From a release (recommended)

1. Download `strip-ai-mode-<version>.zip` from the
   **[latest stable release](https://github.com/dhruvbhavsar0612/strip-ai-mode/releases/latest)**.
2. Unzip it to a folder you will keep (Chrome loads the extension from this
   folder, so don't delete it afterward).
3. Open `chrome://extensions` in Chrome.
4. Turn on **Developer mode** (top-right toggle).
5. Click **Load unpacked** and select the unzipped folder.
6. Pin the extension: click the puzzle-piece icon in the toolbar, then the pin
   next to **No AI Overviews**.

> Once published, this will also be installable directly from the Chrome Web
> Store. Until then, the release zip above is the way to install.

### From source

```bash
git clone https://github.com/dhruvbhavsar0612/strip-ai-mode.git
```

Then follow steps 3-6 above, selecting the cloned folder.

## Use it

- The extension is **on by default** right after install — just search Google
  and the AI Overview is gone.
- Click the toolbar icon to open the popup and **toggle it on/off** at any time.
  When off, a small `OFF` badge appears on the icon.
- Hit a problem? Click **Report an issue** in the popup to open a new GitHub
  issue directly.

## How it works

When enabled, the extension uses Chrome's `declarativeNetRequest` API to add
`udm=14` to your Google search URLs before the page loads. This is the same
thing that clicking the **Web** filter under the search box does, so Google
itself returns the classic list of links without an AI Overview. No page
content is read or modified, and nothing is sent to any external server.

```
https://www.google.com/search?q=your+query
            ->  https://www.google.com/search?q=your+query&udm=14
```

A second rule leaves any search that already has a `udm` parameter untouched, so
Google Images (`udm=2`), the AI Mode tab (`udm=50`), and already-converted pages
are never overwritten.

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

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) and our
[Code of Conduct](CODE_OF_CONDUCT.md) before opening a pull request. Bug reports
and feature requests go through
[GitHub Issues](https://github.com/dhruvbhavsar0612/strip-ai-mode/issues).

## Project layout

```
manifest.json        MV3 manifest, permissions, ruleset registration
rules.json           declarativeNetRequest redirect + allow rules
background.js        Enables/disables the ruleset from the saved toggle state
popup/               Toolbar popup with the on/off switch
icons/               Toolbar and store icons (and the generator script)
build.ps1            Packages a clean runtime-only zip for releases
```

## License

See [LICENSE](LICENSE).
