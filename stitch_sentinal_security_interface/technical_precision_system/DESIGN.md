---
name: Technical Precision System
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#383939'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#292a2a'
  surface-container-highest: '#343535'
  on-surface: '#e3e2e2'
  on-surface-variant: '#bbcabe'
  inverse-surface: '#e3e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#869489'
  outline-variant: '#3d4a41'
  surface-tint: '#51df9c'
  primary: '#60eca8'
  on-primary: '#003822'
  primary-container: '#3ecf8e'
  on-primary-container: '#005434'
  inverse-primary: '#006c45'
  secondary: '#bacabf'
  on-secondary: '#26332c'
  secondary-container: '#3e4c44'
  on-secondary-container: '#acbcb1'
  tertiary: '#d5d3d2'
  on-tertiary: '#313030'
  tertiary-container: '#b9b7b7'
  on-tertiary-container: '#494848'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#71fcb6'
  primary-fixed-dim: '#51df9c'
  on-primary-fixed: '#002112'
  on-primary-fixed-variant: '#005233'
  secondary-fixed: '#d6e6db'
  secondary-fixed-dim: '#bacabf'
  on-secondary-fixed: '#111e17'
  on-secondary-fixed-variant: '#3c4a42'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#121414'
  on-background: '#e3e2e2'
  surface-variant: '#343535'
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  mono-label:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin: 24px
  container-max: 1440px
---

## Brand & Style

The design system is engineered for developers and system administrators who require high-density information without cognitive fatigue. The brand personality is **technical, precise, and authoritative**, evoking a sense of "quiet power." 

The aesthetic leans into **Modern Minimalism** with a **Developer-Centric** focus. It utilizes high-contrast accents against deep monochromatic backgrounds to draw the eye to critical data points. Drawing inspiration from high-end engineering tools, the interface prioritizes clarity, structural integrity, and low-latency visual feedback. It avoids decorative elements, ensuring every pixel serves a functional purpose in the security monitoring workflow.

## Colors

The palette is anchored in a multi-layered dark theme. The base layer starts at a deep `#0D0D0D` to ensure absolute black levels on OLED screens, while UI surfaces move toward `#121212`. 

- **Primary:** The Emerald Green (`#3ECF8E`) is the exclusive color for "Action" and "Active." It must be used sparingly to maintain its impact as a beacon of system health or user intent.
- **Secondary:** Muted grey-greens are reserved for hover states and progress indicators that are secondary to the main action.
- **Severity Colors:** These are strictly reserved for status badges and alert indicators. They should never be used for general UI elements like buttons or navigation to avoid "false-positive" visual alarms.

## Typography

This design system uses a triple-font strategy to balance impact with utility:
1. **Hanken Grotesk** for headlines provides a sharp, contemporary "tech-premium" look with tight kerning.
2. **Inter** for body text ensures maximum legibility for logs and documentation.
3. **JetBrains Mono** is utilized for all technical data, including IP addresses, SHA hashes, timestamps, and terminal output.

Always use `mono-label` for small metadata tags to distinguish them from prose. Headlines should use a slight negative letter-spacing to reinforce the high-density aesthetic.

## Layout & Spacing

The layout follows a **Fluid Grid** model built on a 4px baseline. 
- **Desktop:** 12-column grid with 24px gutters. Elements should align to the grid to create a "dashboard" feel.
- **Tablet:** 8-column grid with 16px gutters. Sidebar navigation collapses into a slim icon bar.
- **Mobile:** 4-column grid with 16px margins. Cards stack vertically, and technical data tables may require horizontal scrolling or a condensed "summary" view.

Spacing should be used to group related security metrics. Large gaps (32px+) are used to separate major sections (e.g., Global Map vs. Event Log), while tight spacing (8px) is used for related inputs in a configuration panel.

## Elevation & Depth

Depth is created through **Tonal Layering** and **Low-Contrast Outlines** rather than traditional shadows.
- **Level 0 (Base):** `#0D0D0D` - The background canvas.
- **Level 1 (Surface):** `#121212` - Used for main dashboard cards and sidebars.
- **Level 2 (Overlay):** `#1A1A1A` - Used for modals and dropdown menus.

Each surface must have a subtle 1px border of `#262626` to define its boundaries. For active states or "Focus" cards, the border transitions to the primary green at 30% opacity. Avoid heavy drop shadows; instead, use a 1px "inner highlight" on the top edge of cards to simulate a subtle top-down light source.

## Shapes

The design system uses **Rounded** (Level 2) geometry to soften the technical nature of the content. 
- **Buttons and Inputs:** 0.5rem (8px) corner radius.
- **Cards:** 1rem (16px) corner radius.
- **Badges:** Pill-shaped (fully rounded) to distinguish them from interactive buttons.

The use of consistent 8px/16px rounding ensures the UI feels modern and approachable ("premium") rather than overly harsh or industrial.

## Components

### Buttons
- **Primary:** Solid `#3ECF8E` background with `#0D0D0D` text. Bold weight.
- **Secondary:** Ghost style with `#262626` border and white text.
- **Danger:** Ghost style with `#FF4D4D` border and text.

### Inputs
Fields use the `#121212` background. On focus, the border transitions from `#262626` to `#3ECF8E`, accompanied by a subtle green outer glow (2px blur). Use `JetBrains Mono` for the input text when the content is technical (e.g., API Keys).

### Status Badges
Badges are small, pill-shaped components with a low-opacity version of the severity color as a background and the full-strength color for the text.

### Toggles
The toggle track uses `#262626` when off. When active, the track flips to `#3ECF8E` with a white circular handle.

### Cards
Cards are the primary container. They feature a `#121212` background and a `#262626` border. Headers within cards should have a subtle bottom border to separate the title from the content.

### Logs & Data Tables
Use alternating row highlights (`#121212` and `#0D0D0D`) only when density is extremely high. Icons in logs should be monochrome unless representing a specific alert level.