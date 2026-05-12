// ============================================================================
// CHART THEME HELPER — reads `--md-*` CSS custom properties so Chart.js
// datasets stay in lock-step with the SCSS / Angular Material M3 palette.
// ============================================================================
//
// Why a helper:
//  - The dashboard charts used to hardcode hex values (`#0033cc`, `#10b981`,
//    …). After the AGL redesign every brand color lives on `:root` as
//    `--md-*`, so Chart.js datasets read them at runtime — no recompile
//    needed if a token changes.
//  - SSR-safe: every helper guards against `window`/`document` being
//    undefined (the platform check is implicit in `getComputedStyle` usage).
//  - Each function is idempotent and cheap to call on every `ngOnChanges`.

/**
 * Read a CSS custom property value from `:root`. Returns `fallback` when
 * the variable is empty (or the document is unavailable, e.g. SSR).
 */
export function readCssVar(name: string, fallback: string): string {
  if (typeof document === 'undefined' || !document.documentElement) {
    return fallback;
  }
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

/**
 * Convert a hex color (`#rrggbb`) to an rgba string with the supplied alpha.
 * Non-hex input is returned unchanged so callers can pass `rgb(…)` values too.
 */
export function withAlpha(hex: string, alpha: number): string {
  const trimmed = hex.trim();
  if (!/^#([\da-f]{6})$/i.test(trimmed)) {
    return trimmed;
  }
  const value = trimmed.slice(1);
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Curated palette for Chart.js datasets — drawn from the AGL prototype.
 * Use `getChartPalette()` rather than re-reading variables in each
 * dataset to keep `ngOnChanges` light.
 */
export interface ChartPalette {
  primary: string;
  primaryContainer: string;
  secondary: string;
  secondaryFixedDim: string;
  surfaceContainerHigh: string;
  outline: string;
  outlineVariant: string;
  onSurface: string;
  onSurfaceVariant: string;
  error: string;
  errorContainer: string;
  success: string;
  warning: string;
  tertiary: string;
}

export function getChartPalette(): ChartPalette {
  return {
    primary: readCssVar('--md-primary', '#000f76'),
    primaryContainer: readCssVar('--md-primary-container', '#001cb0'),
    secondary: readCssVar('--md-secondary', '#006970'),
    secondaryFixedDim: readCssVar('--md-secondary-fixed-dim', '#00dbe9'),
    surfaceContainerHigh: readCssVar('--md-surface-container-high', '#e8e8ea'),
    outline: readCssVar('--md-outline', '#757686'),
    outlineVariant: readCssVar('--md-outline-variant', '#c5c5d7'),
    onSurface: readCssVar('--md-on-surface', '#1a1c1d'),
    onSurfaceVariant: readCssVar('--md-on-surface-variant', '#454654'),
    error: readCssVar('--md-error', '#ba1a1a'),
    errorContainer: readCssVar('--md-error-container', '#ffdad6'),
    success: '#10b981',
    warning: '#f59e0b',
    tertiary: readCssVar('--md-tertiary', '#202326'),
  };
}

/**
 * Reusable Chart.js global options block — fonts, grids, tooltip surface —
 * so every chart on the dashboard looks like the same design system.
 */
export function getBaseChartOptions(): {
  family: string;
  textColor: string;
  mutedColor: string;
  gridColor: string;
  tooltipBg: string;
  tooltipText: string;
} {
  return {
    family:
      "'Open Sans', 'Roboto', 'Helvetica Neue', sans-serif",
    textColor: readCssVar('--md-on-surface', '#1a1c1d'),
    mutedColor: readCssVar('--md-on-surface-variant', '#454654'),
    gridColor: readCssVar('--md-outline-variant', '#c5c5d7'),
    tooltipBg: readCssVar('--md-inverse-surface', '#2f3132'),
    tooltipText: readCssVar('--md-inverse-on-surface', '#f0f0f2'),
  };
}

/**
 * Map a status label (`Active`, `Inactive`, `Pending`, …) to a brand-safe
 * color. Falls back to the secondary token for unknown statuses.
 */
export function getStatusColor(status: string, palette: ChartPalette): { bg: string; hover: string } {
  switch (status?.toLowerCase()) {
    case 'active':
      return { bg: palette.success, hover: '#047857' };
    case 'inactive':
    case 'failed':
      return { bg: palette.error, hover: '#7e0007' };
    case 'pending':
    case 'paused':
      return { bg: palette.warning, hover: '#b45309' };
    case 'archived':
      return { bg: palette.tertiary, hover: palette.onSurface };
    default:
      return { bg: palette.secondary, hover: palette.primary };
  }
}
