# Contributing

Thanks for your interest in improving **No AI Overviews for Google Search**!
This is a small, focused extension, so contributions should keep it minimal and
dependency-free at runtime.

## Ways to contribute

- **Report a bug** or **request a feature** via
  [Issues](https://github.com/dhruvbhavsar0612/strip-ai-mode/issues/new/choose).
- **Submit a pull request** for a fix or improvement.
- **Improve docs** — even small README clarifications help.

## Project scope

This extension does exactly one thing: remove AI Overviews from Google Search by
switching results to Web-only mode (`udm=14`). Please keep PRs aligned with that
single purpose. Larger ideas (blocking the AI Mode tab, DOM-based hiding, other
search engines) are welcome as **discussion issues** first.

## Development setup

No build step is required to run the extension:

1. Clone the repo.
2. Load it unpacked at `chrome://extensions` (Developer mode → Load unpacked).
3. After changes, click the reload icon on the extension card.

For linting and validation tooling:

```bash
npm install        # installs dev tools (ESLint, web-ext)
npm run lint       # lint JS
npm run validate   # validate the extension with web-ext
```

## Before opening a pull request

- Run `npm run lint` and `npm run validate` and make sure both pass.
- Keep changes focused; one logical change per PR.
- Update `README.md` if behavior or install steps change.
- Do **not** bump `manifest.json` `version` in feature PRs — releases are cut by
  maintainers (see below).
- Test manually on a live Google search (toggle on/off, regional domain, an AI
  Mode `udm=50` URL to confirm it is left untouched).

## Commit and PR style

- Write clear, imperative commit subjects ("Add ...", "Fix ...").
- Fill out the pull request template.
- CI (lint + validation) and automated review run on every PR; please address
  the feedback.

## Releases (maintainers)

1. Bump `version` in `manifest.json`.
2. Commit and tag: `git tag vX.Y.Z && git push origin vX.Y.Z`.
3. The Release workflow builds `strip-ai-mode-X.Y.Z.zip` and publishes a GitHub
   release automatically.

## Code of Conduct

By participating, you agree to abide by our
[Code of Conduct](CODE_OF_CONDUCT.md).
