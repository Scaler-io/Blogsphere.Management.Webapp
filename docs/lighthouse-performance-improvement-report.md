# Lighthouse performance improvement report (Blogsphere Management Webapp)

Date: 2026-02-08  
Workspace: `Blogsphere.management.Webapp`

## Executive summary

Your Lighthouse results show **slow start-render and slow hero completion**:

- **First Contentful Paint (FCP)**: **5.8s** (slow)
- **Largest Contentful Paint (LCP)**: **6.7s** (slow)
- **Total Blocking Time (TBT)**: **50ms** (good)
- **Cumulative Layout Shift (CLS)**: **0.035** (good)
- **Speed Index**: **5.8s** (slow)

This pattern is typical of: **large JS/CSS + render‑blocking fonts + “first route” feature weight**. CPU main-thread blocking is _not_ the primary issue (TBT is low); instead the app is likely **waiting on network + parsing + layout + font** and then rendering a heavy first screen (Dashboard with charts).

## Quick issue index (what to fix, where)

| Priority | Issue                                               | Why it impacts FCP/LCP                        | Evidence in this repo                                                     | Primary files to change                                                                                               |
| -------- | --------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| P0       | **Main bundle too large**                           | More download/parse before first render       | Initial total **1.48MB**, main **1.34MB**                                 | `angular.json`, `src/app/app.module.ts`, `src/app/app-material.module.ts`                                             |
| P0       | **Moment.js in main path**                          | Large non-tree-shaken date library            | `moment` ~**379KB parsed**                                                | `src/app/shared/helpers/date.helper.ts`, `src/app/shared/pipes/format-date.pipe.ts`, `src/app/app-material.module.ts` |
| P0       | **Dashboard charts load on first route**            | First screen triggers large chart chunk       | Charting chunk `455.*.js` (~**221KB**; ~**396KB parsed charting**)        | `src/app/features/dashboard/dashboard.component.{ts,html}`                                                            |
| P0       | **Render-blocking fonts / icon fonts**              | Blocks or delays meaningful paint/LCP         | Blocking Google Font stylesheets in `index.html`; local fonts are **TTF** | `src/index.html`, `src/assets/styles/titillium-web.scss`                                                              |
| P0       | **No gzip + no caching headers**                    | Slower transfer, no long-term caching benefit | `nginx.conf` is SPA fallback only                                         | `nginx.conf`, `Dockerfile`                                                                                            |
| P1       | **Angular Material “all component themes”**         | Ships CSS for unused Material components      | `@include mat.all-component-themes(...)`                                  | `src/assets/styles/_angular-material-theme.scss`                                                                      |
| P1       | **App shell subscription/change detection hygiene** | Extra work during initial render & nav        | Router + breadcrumb subscriptions w/o cleanup; loader forced 2s           | `src/app/app.component.ts`, `src/app/shared/components/page-header/page-header.component.ts`                          |

## What I measured in this repo (production build)

Command run:

```bash
npm run build -- --configuration production --stats-json
```

Build output (key part):

- **Initial total**: **1.48 MB** (warning: exceeds 1.00MB budget)
- **main bundle**: **1.34 MB** (`main.*.js`)
- **styles**: **113 KB** (`styles.*.css`)

Lazy chunks:

- `455.*.js`: **221 KB** (this is the largest lazy chunk; contains charting)

### Build warnings (these correlate with “too much initial payload”)

- **Initial bundle budget exceeded**: budget **1.00MB**, actual **1.48MB**
- **Component style budget exceeded**:
  - `src/app/features/api-routes/route-details/route-details.component.scss` exceeded **6KB** budget (total **6.98KB**)

### Bundle composition highlights (from bundle analyzer)

These sizes are **parsed size** (a useful proxy for parse/execute cost) and **gzip size** (transfer cost):

- **`moment`**: ~**379 KB parsed**, ~**76.6 KB gzip**  
  Path: `./node_modules/moment`
- **Angular Material (JS)**: ~**267.8 KB parsed**  
  Path: `./node_modules/@angular/material/fesm2020`
- **`angular-auth-oidc-client`**: ~**108.3 KB parsed**, ~**23.0 KB gzip**
- **Dashboard chart libraries** (lazy chunk `455.*.js`): ~**395.6 KB parsed** (`chart.js` / `ng2-charts`)

## High-impact root causes and fixes (prioritized)

### P0 (biggest wins for FCP/LCP)

#### 1) Reduce initial JS payload (main bundle is 1.34MB)

**Why it hurts FCP/LCP**

- The browser must **download + parse + execute** `main.*.js` before Angular can paint meaningful UI.

**Affected places**

- `package.json` (dependencies that impact bundle)
- `src/app/app.module.ts` (what you ship in the initial app shell)
- `src/app/app-material.module.ts` (Material adapter & modules)

**Recommended improvements**

- **Remove Moment.js from the initial path**:
  - Replace Moment usage with **native `Intl`** or **`date-fns`**.
  - Switch Material date adapter away from `@angular/material-moment-adapter`.

  Affected files:
  - `src/app/shared/helpers/date.helper.ts` (`import * as moment from "moment"`)
  - `src/app/shared/pipes/format-date.pipe.ts`
  - `src/app/features/api-cluster/cluster-filter-form/cluster-filter-form.component.ts`
  - `src/app/app-material.module.ts` (uses `MomentDateAdapter`)

- **Keep the app shell lean**:
  - Ensure anything not required for first paint is **lazy‑loaded** (dialogs, admin-only utilities, heavy tables).
  - Consider splitting some shared UI (or large feature UI) out of `AppModule` if it can be lazy loaded.

**Expected outcome**

- Cutting Moment alone is commonly worth **50–100KB transfer** and **hundreds of KB parsed**, improving FCP/LCP noticeably.

---

#### 2) Make fonts non render‑blocking (and stop downloading oversized font formats)

**Why it hurts FCP/LCP**

- `src/index.html` loads Google Fonts and Material Symbols using blocking `<link rel="stylesheet">`.
- Your local “Titillium Web” fonts are shipped as **TTF** (large). Even with `font-display: swap`, they add network pressure early and can delay the final LCP (text can reflow when the font finally arrives).

**Affected places**

- `src/index.html` (render‑blocking external fonts)
- `src/assets/styles/titillium-web.scss` (TTF font-face declarations)
- `src/assets/styles/_angular-material-theme.scss` (Material Symbols classes are present; icons depend on the large symbol fonts)

**Recommended improvements**

- **Best**: self-host and subset fonts; ship **WOFF2** only.
  - Convert `src/assets/fonts/titillium-web-*.ttf` → `.woff2` and update `titillium-web.scss`.
  - If you must keep Roboto/material icons: self-host those too, or replace icon-font with SVG icons.

- If you keep Google Fonts: make them non‑blocking in `src/index.html`:
  - Add preconnect to `fonts.googleapis.com`
  - Load CSS asynchronously (preload + onload swap), with `<noscript>` fallback.

**Extra CLS note**

- In `src/app/shared/components/navbar/navbar.component.html`, the logo `<img>` has no width/height. Add fixed dimensions (or CSS `aspect-ratio`) to prevent small layout shifts.

---

#### 3) Stop “first route” from forcing chart.js on initial LCP

**Why it hurts FCP/LCP**

- Your wildcard route redirects to `dashboard`, which means your real first screen is the Dashboard.
- The Dashboard renders multiple charts and brings in a **large charting chunk** (~221KB file; ~396KB parsed charting code).

**Affected places**

- `src/app/app-routing.module.ts` (default route is Dashboard via wildcard redirect)
- `src/app/features/dashboard/dashboard.component.html` (charts are part of above-the-fold UI)
- `src/app/features/dashboard/dashboard.component.ts` (starts polling immediately)

**Recommended improvements**

- **Defer chart rendering until after first paint**:
  - Show numeric summary cards first (cheap), then load charts after idle / user scroll / a short delay.
  - Implement `IntersectionObserver` (or a simple “below the fold” container) so charts load only when visible.
  - Optionally dynamic-import chart modules in a dedicated chart component to create a separate chunk.

- **Defer polling**:
  - In `dashboard.component.ts`, `StartDashboardPolling()` is dispatched immediately in `ngOnInit`.
  - Defer by ~100–300ms (or after first stable tick) so first paint/LCP can happen without contention.

**Expected outcome**

- Dashboard becomes “fast to first meaningful UI”, and charts become progressively enhanced.

---

#### 4) Enable compression + long-term caching in Nginx (big network win)

**Why it hurts FCP/LCP**

- Current `nginx.conf` has SPA fallback only and **no gzip** and **no caching headers**.
- With Angular `outputHashing: "all"`, you can safely set **1 year immutable caching** on hashed assets.

**Affected places**

- `nginx.conf`
- `Dockerfile` (ships that nginx config)

**Recommended improvements**

- Enable **gzip** for JS/CSS/SVG/JSON/fonts.
- Add:
  - `Cache-Control: public, max-age=31536000, immutable` for hashed assets (`main.<hash>.js`, etc.)
  - `Cache-Control: no-store` for `index.html` (ensure fast updates without cache bugs)

**Expected outcome**

- Repeat views become dramatically faster; first view also benefits from gzip (especially JS).

---

#### 5) Fix “app shell” change detection and subscriptions

**Why it hurts FCP/LCP**

- The app shell (navbar/sidebar/page header) runs constantly; unnecessary change detection and subscriptions can delay initial stabilization and add work during first route render.

**Affected places**

- `src/app/app.component.ts`:
  - Subscribes to `router.events` in constructor (no unsubscribe)
  - Hardcoded `setTimeout(..., 2000)` keeps loader up longer than needed
  - Calls authentication init immediately in `ngOnInit`
- `src/app/shared/components/navbar/navbar.component.ts` (no OnPush)
- `src/app/features/sidebar/sidebar.component.ts` (manual subscriptions)
- `src/app/shared/components/page-header/page-header.component.ts` (subscriptions without cleanup)

**Recommended improvements**

- Add `ChangeDetectionStrategy.OnPush` to shell components.
- Replace manual subscriptions with:
  - `async` pipe in templates, or
  - `takeUntil(destroy$)` in components
- Make the loader reflect real busy work rather than an unconditional 2-second timeout.
- Defer `initializeAuthentication()` to not block first paint (show shell, then auth state updates).

## P1 (medium effort, strong impact)

### 6) Reduce Angular Material CSS output

**Why it hurts FCP/LCP**

- `src/assets/styles/_angular-material-theme.scss` includes:
  - `@include mat.core();`
  - `@include mat.all-component-themes($Blogsphere-theme);` ← ships theme CSS for _all_ Material components.

**Affected places**

- `src/assets/styles/_angular-material-theme.scss`

**Recommended improvements**

- Replace `all-component-themes` with only the component theme mixins you actually use:
  - button, icon, input, form-field, select, checkbox, menu, expansion, table, paginator, dialog, snack-bar, progress-spinner, slide-toggle, tooltip, datepicker, divider

**Expected outcome**

- Smaller `styles.*.css` and less style recalculation on startup.

---

### 7) Fix the production build configuration explicitly (and enforce budgets)

**Why it matters**

- Your `angular.json` production config is minimal; CLI defaults may help, but making options explicit helps prevent regressions and enables tuning (e.g., critical CSS inlining choices).

**Affected places**

- `angular.json` (`projects.Blogsphere.Management.Webapp.architect.build.configurations.production`)

**Recommended improvements**

- Add explicit prod flags (optimization/buildOptimizer/aot/vendorChunk/etc.) and keep budgets strict.
- Consider increasing the initial budget _temporarily_ only if you’re actively refactoring down; otherwise the budget warning is a useful guardrail.

---

### 8) Dashboard: reduce synchronous reactive work

**Affected places**

- `src/app/features/dashboard/dashboard.component.ts`

**Recommended improvements**

- Use a single view-model stream to reduce subscription churn.
- Keep chart data updates outside Angular where possible, then `markForCheck()` once.

## P2 (bigger changes / long-term)

### 9) Replace icon fonts (Material Symbols) with SVG icons

**Why it helps**

- Icon fonts are heavy and blocking; SVG icon sprites are usually smaller and cacheable.

**Affected places**

- `src/index.html` (Material Symbols font CSS)
- Templates using `<span class="material-symbols-outlined">...</span>`

### 10) Upgrade Angular (major performance + tooling improvements)

You’re on Angular 13-era dependencies. A modern upgrade path (Angular 16–19) improves:

- build output, bundling, and modern defaults
- performance tooling
- better third-party ecosystem support

This is a larger project, but it often yields meaningful performance and maintainability wins.

## Concrete “affected files” map (what to change where)

### Fonts / HTML

- `src/index.html`
  - Remove or async-load Google Fonts + Material Symbols
  - Add `preconnect` to `fonts.googleapis.com`
- `src/assets/styles/titillium-web.scss`
  - Convert TTF → WOFF2, update `@font-face` sources
- `src/app/shared/components/navbar/navbar.component.html`
  - Add explicit image dimensions for the logo

### CSS / Angular Material theming

- `src/assets/styles/_angular-material-theme.scss`
  - Replace `mat.all-component-themes(...)` with only used component theme mixins

### Bundles / Dependencies

- `src/app/app-material.module.ts`
  - Replace `MomentDateAdapter` (removes `@angular/material-moment-adapter` + Moment dependency pressure)
- `src/app/shared/helpers/date.helper.ts`
- `src/app/shared/pipes/format-date.pipe.ts`
- `src/app/features/api-cluster/cluster-filter-form/cluster-filter-form.component.ts`
  - Remove Moment usage

### Dashboard first route (LCP)

- `src/app/app-routing.module.ts`
  - Consider a true lightweight landing route, or ensure Dashboard is progressive (charts deferred)
- `src/app/features/dashboard/dashboard.component.ts`
  - Defer polling start; reduce early work
- `src/app/features/dashboard/dashboard.component.html`
  - Defer chart rendering (after paint / on visibility)

### App shell runtime

- `src/app/app.component.ts` / `src/app/app.component.html`
- `src/app/shared/components/navbar/navbar.component.ts`
- `src/app/features/sidebar/sidebar.component.ts`
- `src/app/shared/components/page-header/page-header.component.ts`
  - OnPush, cleanup subscriptions, avoid “fake busy” timers

### Server delivery (big for FCP/LCP transfer time)

- `nginx.conf`
  - gzip + caching policy for hashed assets
- `Dockerfile`
  - (optional) add brotli module if you want brotli compression

## How to validate improvements (repeatable workflow)

### 1) Bundle size regression checks

```bash
npm run build -- --configuration production --stats-json
```

Watch for:

- Initial total size dropping (goal: **< 1.0MB** initial, ideally much lower)
- `main.*.js` shrinking after Moment removal and Material CSS reduction

### 2) Verify caching/compression headers (after deploying nginx.conf)

```bash
curl -H "Accept-Encoding: gzip" -I http://localhost:4200/main.<hash>.js
curl -I http://localhost:4200/index.html
```

Expected:

- Hashed JS/CSS: `Cache-Control: public, max-age=31536000, immutable`
- `index.html`: `no-store` / `no-cache`
- Responses compressed (Content-Encoding: gzip)

### 3) Lighthouse before/after comparison

Run Lighthouse in the same conditions (same network/CPU throttling profile) and track:

- FCP target: **< 2.0s**
- LCP target: **< 2.5s**
- CLS stays < 0.1
- TBT stays low

## Recommended execution order

1. **Nginx gzip + caching** (`nginx.conf`)
2. **Remove Moment + MomentDateAdapter** (bundle win)
3. **Defer dashboard charts / polling** (LCP win)
4. **Async/self-host fonts + switch TTF → WOFF2** (FCP/LCP + bandwidth win)
5. **Material theme pruning** (CSS win)
6. **App shell OnPush + subscription hygiene** (stability + small perf win)
