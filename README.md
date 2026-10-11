# noon minutes Operations Dashboard

A responsive Arabic/English operations dashboard connected to the **Executive Dashboard** tab in Google Sheets. The Noon Minutes logo is in `assets/noon-minutes-logo.png`.

Open `index.html` in a modern browser, or host the complete folder on a static web host such as GitHub Pages or Netlify. No build step or package installation is required.

The dashboard includes the hourly picking, batch sorting, cross-dock, container dispatch, and picking-issues tables; warehouse summaries; the staging and dispatch KPIs; and the full pallet/container-by-destination table from the sheet.

## Data sync

- The dashboard reads the sheet's public CSV export on load and every 60 seconds. Use the refresh button for a manual sync.
- Google Sheets sharing must allow **Anyone with the link — Viewer** for the site to read the data without signing in.
- The dashboard is read-only. Update data in the source sheet; the site reflects it after its next successful sync.
- The last successful data remains visible during connection errors. Google may briefly cache CSV exports, so updates are not guaranteed to appear instantly.

## Branding and language

Use the language toggle in the top bar to switch between Arabic (RTL) and English (LTR). The sheet ID and tab GID are configured near the top of `app.js`.
