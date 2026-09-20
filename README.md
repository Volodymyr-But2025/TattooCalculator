**English** | [Українська](README.uk.md)

# Tattoo Calculator — tattoo price estimator

PWA for tattoo artists: estimate session price from size, style, color, and body placement, then copy a client-ready quote.

**Live:** [https://tattoo-calculator-ashen.vercel.app/](https://tattoo-calculator-ashen.vercel.app/)  
**GitHub:** [Volodymyr-But2025/TattooCalculator](https://github.com/Volodymyr-But2025/TattooCalculator)

## What it does

- **Size** — width × height (cm) with sliders and number inputs.
- **Complexity** — style, color, and placement multipliers.
- **Artist rate** — hourly rate and materials cost saved in `localStorage`.
- **Quote** — estimated hours, base price, optional discount, ±10% range.
- **Minimum for color** — floor price when color work would otherwise be cheaper.
- **Copy quote** — clipboard text for the client (Ukrainian).
- **PWA** — installable app via `vite-plugin-pwa` (update toast on new version).

## Install on phone

Open the live site on your phone: [tattoo-calculator-ashen.vercel.app](https://tattoo-calculator-ashen.vercel.app/).

### Android (Chrome)

1. Open the site in **Chrome**.
2. Tap the **⋮** menu (three dots) in the top-right.
3. Choose **Add to Home screen** / **Install app**.
4. Confirm — a **«Тату Кальк»** icon appears on the home screen.

If that menu item is missing: look for an install icon (⊕ / download) in the address bar and tap it.

### iOS (Safari)

1. Open the site in **Safari** (not Chrome — on iOS PWAs are added via Safari).
2. Tap the **Share** button (square with an upward arrow).
3. Scroll and choose **Add to Home Screen**.
4. Optionally rename, then tap **Add**.

After that the calculator opens like a standalone app (no browser chrome). Updates come from the network; if you see a “new version” toast, tap **Update**.

## Stack

| Layer | Technologies |
| --- | --- |
| UI | React 19, Vite, Tailwind CSS |
| Logic | Pure JS quote formula (`calculateQuote.js`) |
| Storage | `localStorage` for rate settings |
| PWA | `vite-plugin-pwa`, Workbox |
| Deploy | [Vercel](https://tattoo-calculator-ashen.vercel.app/) |

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build     # production build
npm run preview   # preview dist
npm run lint      # ESLint
npm run icons     # regenerate PWA icons from SVG
```

## Structure

```
src/
  App.jsx              # UI and quote flow
  calculateQuote.js    # pricing formula and option multipliers
  quoteText.js         # client quote text + money formatting
  settingsStorage.js   # load/save hourly rate and materials
  registerPwa.js       # service worker registration
  index.css            # Tailwind entry
public/                # PWA icons and manifest assets
scripts/               # icon generation
```
