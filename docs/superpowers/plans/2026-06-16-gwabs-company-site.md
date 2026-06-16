# GWABS Company Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the single-page personal portfolio into a 5-page GWABS Technology Limited company site (Home, Solutions, Case Studies, About, Contact) with a navy/teal brand, 8 hand-written fintech case studies, and retained Firebase reviews + contact form.

**Architecture:** Evolve the existing Vite + React 18 + Tailwind app. Add `react-router-dom` with a layout route (Nav + `<Outlet/>` + Footer). Decompose the ~1000-line `src/App.jsx` into `data/`, `lib/`, `components/`, and `pages/`. Content lives in plain data modules; Firebase is isolated in `lib/firebase.js`. The AI "Read More" generator is removed.

**Tech Stack:** Vite 5, React 18, react-router-dom 6, Tailwind 3, Firebase 11 (Firestore + anon auth), Vitest + @testing-library/react (new), Vercel + @vercel/speed-insights.

**Reference spec:** `docs/superpowers/specs/2026-06-16-gwabs-company-site-design.md`

---

## File Structure (target)

```text
index.html                     # MODIFY: title + meta + favicon
tailwind.config.js             # MODIFY: navy/teal theme tokens
vitest.config.js               # CREATE: test runner config
src/
  main.jsx                     # MODIFY: mount RouterProvider
  App.jsx                      # REPLACE: layout shell (Nav + Outlet + Footer)
  index.css                    # MODIFY: theme variables + recolored helpers
  setupTests.js                # CREATE: RTL/jest-dom setup
  lib/
    firebase.js                # CREATE: Firebase init + reviews API
    seo.js                     # CREATE: useDocumentTitle hook
  data/
    company.js                 # CREATE: company facts
    solutions.js               # CREATE: 4 solution pillars
    caseStudies.js             # CREATE: 8 case studies
  components/
    Nav.jsx  Footer.jsx  Hero.jsx  TrustBar.jsx
    SolutionCard.jsx  CaseStudyCard.jsx  StatsBand.jsx
    CTASection.jsx  ReviewList.jsx  ReviewForm.jsx  ContactForm.jsx
  pages/
    Home.jsx  Solutions.jsx  CaseStudies.jsx  CaseStudyDetail.jsx
    About.jsx  Contact.jsx
  router.jsx                   # CREATE: route table
```

---

## Task 1: Tooling — router + test setup

**Files:**
- Modify: `package.json` (deps + scripts)
- Create: `vitest.config.js`
- Create: `src/setupTests.js`

- [ ] **Step 1: Install dependencies**

Run:
```bash
npm i react-router-dom@^6
npm i -D vitest@^1 jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Add the test script**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create `vitest.config.js`**

```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.js'],
  },
})
```

- [ ] **Step 4: Create `src/setupTests.js`**

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Verify the runner works**

Run: `npx vitest run`
Expected: exits 0 with "No test files found" (no tests yet).

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vitest.config.js src/setupTests.js
git commit -m "chore: add react-router-dom and vitest test harness"
```

---

## Task 2: Brand theme tokens

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css:7-30`

- [ ] **Step 1: Replace the color theme in `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        navy: '#0A1F44',
        'navy-2': '#0D2A5C',
        'navy-deep': '#06122B',
        teal: '#00C2A8',
        'teal-ink': '#04241F',
        slate: '#B7C4DA',
        surface: '#13203A',
        'surface-border': '#223457',
        offwhite: '#F4F7FB',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Update `:root` variables and `body` in `src/index.css`**

Replace lines 7-21 with:
```css
:root {
  --navy: #0A1F44;
  --navy-2: #0D2A5C;
  --navy-deep: #06122B;
  --teal: #00C2A8;
  --teal-ink: #04241F;
  --slate: #B7C4DA;
  --surface: #13203A;
  --surface-border: #223457;
  --offwhite: #F4F7FB;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--navy);
  color: #E4E9F2;
  margin: 0;
  overflow-x: hidden;
}
```

- [ ] **Step 3: Recolor shared helper classes**

Search `src/index.css` for any `glass-card`, `btn-gradient`, `btn-outline`, `text-gradient`, `section-title`, `bg-animation`, `profile-glow` rules. Replace their indigo/purple values (`#6366f1`, `#8b5cf6`) with `var(--teal)` / `var(--navy-2)`. For `.btn-gradient`, use:
```css
.btn-gradient {
  background: var(--teal);
  color: var(--teal-ink);
}
.btn-gradient:hover { filter: brightness(1.05); }
.text-gradient {
  background: linear-gradient(90deg, #36E0C8, var(--teal));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.glass-card {
  background: rgba(19, 32, 58, 0.7);
  border: 1px solid var(--surface-border);
  backdrop-filter: blur(8px);
}
```

- [ ] **Step 4: Verify dev build renders**

Run: `npm run dev` and load the page; confirm no CSS errors in console (page may look broken — App.jsx is replaced in Task 6). Stop the server.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.js src/index.css
git commit -m "feat: apply navy/teal Trust Fintech theme tokens"
```

---

## Task 3: Company facts data

**Files:**
- Create: `src/data/company.js`
- Test: `src/data/company.test.js`

- [ ] **Step 1: Write the failing test**

```js
import { describe, it, expect } from 'vitest'
import { company, navLinks } from './company.js'

describe('company data', () => {
  it('exposes the legal identity', () => {
    expect(company.legalName).toBe('GWABS TECHNOLOGY LIMITED')
    expect(company.formerName).toMatch(/Gwabstech/i)
    expect(company.rc).toBe('9482405')
    expect(company.tin).toBe('2623758929985')
  })
  it('exposes contact details', () => {
    expect(company.email).toBe('info@gbs.ng')
    expect(company.phone).toBe('+234 903 086 3146')
    expect(company.address).toMatch(/Karu, Abuja/)
  })
  it('lists the five primary nav links', () => {
    expect(navLinks.map(l => l.to)).toEqual(['/', '/solutions', '/case-studies', '/about', '/contact'])
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/data/company.test.js`
Expected: FAIL — cannot resolve `./company.js`.

- [ ] **Step 3: Create `src/data/company.js`**

```js
export const company = {
  legalName: 'GWABS TECHNOLOGY LIMITED',
  shortName: 'GWABS',
  formerName: 'Gwabstech Solutions',
  rc: '9482405',
  tin: '2623758929985',
  incorporated: '13 April 2026',
  tagline: 'Fintech infrastructure, engineered to settle.',
  whatWeDo: 'Fintech solutions & consultancy, POS solutions, and device & hardware SDK development.',
  email: 'info@gbs.ng',
  phone: '+234 903 086 3146',
  address: 'No 32 Gilbert Lodge, Back of Abbatua, Karu, Abuja, FCT, Nigeria',
}

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export const trustBadges = [
  'NIBSS', 'Interswitch', 'ISO 8583', 'EMV', 'PCI DSS', 'Topwise', 'Urovo', 'Blumen',
]

export const stats = [
  { value: '3+', label: 'POS device platforms' },
  { value: '8+', label: 'Processor integrations' },
  { value: 'PCI DSS', label: 'Certified expertise' },
  { value: 'Live', label: 'Production deployments' },
]
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run src/data/company.test.js`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/data/company.js src/data/company.test.js
git commit -m "feat: add company facts data module"
```

---

## Task 4: Solution pillars data

**Files:**
- Create: `src/data/solutions.js`
- Test: `src/data/solutions.test.js`

- [ ] **Step 1: Write the failing test**

```js
import { describe, it, expect } from 'vitest'
import { solutions } from './solutions.js'

describe('solutions data', () => {
  it('has exactly four pillars with required fields', () => {
    expect(solutions).toHaveLength(4)
    for (const s of solutions) {
      expect(s.id).toBeTruthy()
      expect(s.title).toBeTruthy()
      expect(s.summary).toBeTruthy()
      expect(Array.isArray(s.points)).toBe(true)
      expect(s.points.length).toBeGreaterThan(0)
    }
  })
  it('has unique ids', () => {
    const ids = solutions.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/data/solutions.test.js`
Expected: FAIL — cannot resolve `./solutions.js`.

- [ ] **Step 3: Create `src/data/solutions.js`**

```js
export const solutions = [
  {
    id: 'pos-apps',
    icon: '▣',
    title: 'POS Terminal Applications',
    summary: 'Secure Android payment apps built for the field — chip, contactless, and PIN on real terminal hardware.',
    points: [
      'EMV / NFC / magstripe card acceptance',
      'Topwise, Urovo, and Blumen device integrations',
      'Agency banking, merchant collection, and bill/airtime vending',
      'Offline resilience, receipt printing, and geofence compliance',
    ],
  },
  {
    id: 'switching',
    icon: '⇄',
    title: 'Payment Switching & Middleware',
    summary: 'High-availability transaction routing across multiple processors with intelligent failover.',
    points: [
      'ISO 8583 and REST processor integrations',
      'BIN-based routing with automatic re-routing on failure',
      'Terminal key exchange, reversals, and reconciliation',
      'Encrypted payloads and signed webhooks',
    ],
  },
  {
    id: 'sdks',
    icon: '⚙',
    title: 'Device & Hardware SDKs',
    summary: 'Reusable payment SDKs that hide vendor differences behind one consistent API.',
    points: [
      'One EMV / ISO 8583 API across multiple terminal vendors',
      'Native Android and Flutter integration paths',
      'Key management, secure PIN, and transaction persistence',
      'Production-verified across device families',
    ],
  },
  {
    id: 'software',
    icon: '◈',
    title: 'Fintech Software & Consultancy',
    summary: 'SaaS platforms and advisory for banks, MFBs, and fintech operators.',
    points: [
      'Multi-tenant SaaS POS and business management',
      'Loan management (LMS) and core-banking integrations',
      'Terminal Management Systems (TMS) and real-time infrastructure',
      'CBN/PCI-aware architecture and compliance advisory',
    ],
  },
]
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run src/data/solutions.test.js`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/data/solutions.js src/data/solutions.test.js
git commit -m "feat: add solution pillars data module"
```

---

## Task 5: Case studies data (the 8 flagships)

**Files:**
- Create: `src/data/caseStudies.js`
- Test: `src/data/caseStudies.test.js`

- [ ] **Step 1: Write the failing test**

```js
import { describe, it, expect } from 'vitest'
import { caseStudies, getCaseStudy } from './caseStudies.js'

describe('case studies data', () => {
  it('has 8 flagships', () => {
    expect(caseStudies).toHaveLength(8)
  })
  it('each has the required fields', () => {
    for (const c of caseStudies) {
      expect(c.slug).toMatch(/^[a-z0-9-]+$/)
      expect(c.title).toBeTruthy()
      expect(c.client).toBeTruthy()
      expect(c.pillarId).toBeTruthy()
      expect(c.hook).toBeTruthy()
      expect(c.problem && c.solution && c.impact).toBeTruthy()
      expect(Array.isArray(c.tech)).toBe(true)
      expect(c.tech.length).toBeGreaterThan(0)
    }
  })
  it('has unique slugs', () => {
    const slugs = caseStudies.map(c => c.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
  it('looks up by slug', () => {
    expect(getCaseStudy('gwabs-business-suite').title).toMatch(/Business Suite/)
    expect(getCaseStudy('nope')).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/data/caseStudies.test.js`
Expected: FAIL — cannot resolve `./caseStudies.js`.

- [ ] **Step 3: Create `src/data/caseStudies.js`**

```js
// pillarId values must match ids in solutions.js
export const caseStudies = [
  {
    slug: 'gwabs-business-suite',
    title: 'Gwabs Business Suite',
    client: 'GWABS Product',
    isOwnProduct: true,
    pillarId: 'software',
    hook: 'Multi-tenant SaaS POS and business management platform.',
    problem: 'Merchants and agent networks need an all-in-one platform to run sales, inventory, customers, and payments — with strict isolation between businesses.',
    solution: 'A multi-tenant SaaS POS platform organising businesses, stores, and users with role-based access (SUPER_ADMIN → CASHIER), subscription billing, inventory and sales management, PDF reporting, and TeasyPay-backed collections.',
    impact: 'Production-grade with 180+ commits, OpenAPI docs, 2FA/TOTP, Flyway-versioned schema, and CI deployment.',
    tech: ['Kotlin', 'Ktor', 'Exposed', 'PostgreSQL', 'JWT/RBAC', 'TeasyPay', 'iText PDF', 'Docker', 'GitHub Actions'],
    media: null,
  },
  {
    slug: 'bellbank-cashout-middleware',
    title: 'Bellbank Cashout Middleware',
    client: 'Bellbank MFB',
    isOwnProduct: false,
    pillarId: 'switching',
    hook: 'Multi-processor payment routing with production-verified ISO 8583.',
    problem: 'POS cashout has to stay up even when an individual processor is unavailable — and route each card to the right rail.',
    solution: 'Middleware that routes POS cashout by card BIN to multiple processors (CoralPay, Zone, UP, Grup) across ISO 8583 and REST, handling terminal key exchange, parameter download, reversals, and signed webhooks.',
    impact: 'CoralPay live in production end-to-end (key exchange, cashout, reversal); shipped with a security audit and production-readiness review.',
    tech: ['Kotlin', 'Ktor', 'jPOS (ISO 8583)', 'Exposed', 'MySQL', 'Flyway', 'AES-256-GCM', 'HMAC-SHA256', 'Docker'],
    media: { type: 'youtube', id: 'QvxVA2UpS9w' },
  },
  {
    slug: 'teasypay-pos-sdk',
    title: 'TeasyPay POS SDK',
    client: 'Teasy Mobile International',
    isOwnProduct: false,
    pillarId: 'sdks',
    hook: 'One payment SDK across three terminal vendors.',
    problem: 'Every POS hardware vendor ships a different SDK, forcing integrators to rewrite payment logic per device.',
    solution: 'A unified EMV / ISO 8583 SDK with a hardware abstraction layer covering Topwise MP35, Blumen, and Urovo i5300 — handling card detection, NIBSS + Interswitch routing, secure PIN, key exchange, and receipt printing, with native and Flutter integration paths.',
    impact: 'v1.4.2 production-verified across all three devices (NIBSS Mastercard, Verve online & offline PIN) with full integration docs.',
    tech: ['Java', 'Kotlin', 'jPOS', 'BouncyCastle', 'Topwise/Blumen/Urovo HAL', 'SQLite', 'Flutter bridge'],
    media: { type: 'youtube', id: 'kr6Vklr_AYE' },
  },
  {
    slug: 'getpayed-android-pos',
    title: 'Getpayed Android POS',
    client: 'Getpayed Technology',
    isOwnProduct: false,
    pillarId: 'pos-apps',
    hook: 'Multi-gateway POS with government and health collections.',
    problem: 'Agents need a single terminal app that supports many payment gateways and public-sector collections while meeting CBN location rules.',
    solution: 'A multi-module Android POS for Topwise terminals with NFC/tap-to-pay, multiple gateways (Grupp, OneCollect, Payed), government revenue (Ebonyi IRS) and health (LASHMA) flows, CBN geofencing, feature-flagged rollouts, and crash monitoring.',
    impact: 'Production app (v1.7.x) with CI, geo-compliance buffers, and analytics-driven rollouts.',
    tech: ['Kotlin', 'Hilt', 'jPOS', 'HiveMQ MQTT', 'Sentry', 'GrowthBook', 'WorkManager', 'GitHub Actions'],
    media: null,
  },
  {
    slug: 'blumen-tms',
    title: 'BlumenTMS — Terminal Management',
    client: 'Blumen',
    isOwnProduct: false,
    pillarId: 'software',
    hook: 'Fleet control for thousands of distributed POS terminals.',
    problem: 'Operators running large POS fleets need remote control, compliance enforcement, and safe over-the-air updates.',
    solution: 'A Terminal Management System with live geofence kill-switch, APK versioning and canary rollout, heartbeat monitoring, transfer webhooks, and real-time WebSocket push to terminals.',
    impact: 'Live in production at tms.blumenos.com with 129 tests, full CI/CD to DigitalOcean, and nightly backups.',
    tech: ['Kotlin', 'Ktor', 'Exposed', 'MySQL', 'Flyway', 'JWT', 'AES-GCM', 'Mapbox', 'Docker', 'GitHub Actions'],
    media: null,
  },
  {
    slug: 'go-credit-lms',
    title: 'Go Credit LMS',
    client: 'GWABS / MFB client',
    isOwnProduct: false,
    pillarId: 'software',
    hook: 'Automating the loan lifecycle for microfinance banks.',
    problem: 'Microfinance banks and cooperatives run lending on spreadsheets, with manual reconciliation and weak compliance.',
    solution: 'A full-stack Loan Management System automating KYC → disbursement → reconciliation, with savings wallets, payroll deductions, AI-assisted portfolio insights, and multi-tenant SaaS isolation.',
    impact: 'Live deployment with AES-256 PII encryption, automated reconciliation via TeasyPay, and audited money-correctness fixes.',
    tech: ['Kotlin', 'Ktor', 'React', 'TypeScript', 'PostgreSQL', 'Exposed', 'Flyway', 'idcheck.ng', 'Sendchamp', 'Docker'],
    media: null,
  },
  {
    slug: 'ktor-notification-gateway',
    title: 'Real-Time Notification Gateway + SDK',
    client: 'Getpayed Technology',
    isOwnProduct: false,
    pillarId: 'switching',
    hook: 'Sub-millisecond transaction alerts to POS terminals.',
    problem: 'POS terminals need instant, reliable transaction alerts even over flaky mobile networks.',
    solution: 'A stateless WebSocket alert gateway with an in-memory queue and offline replay, paired with an Android SDK featuring auto-reconnect, encrypted token storage, and lifecycle-aware connection management.',
    impact: 'Production-ready with Kubernetes/Helm deployment on DigitalOcean, JWT auth, rate limiting, and broadcast delivery.',
    tech: ['Kotlin', 'Ktor (Netty, ZGC)', 'Java 21', 'Koin', 'JWT', 'OkHttp WebSocket', 'Google Tink', 'Docker', 'Helm/K8s'],
    media: null,
  },
  {
    slug: 'teasy-jamb',
    title: 'Teasy JAMB Vending',
    client: 'Teasy Mobile International',
    isOwnProduct: false,
    pillarId: 'software',
    hook: 'Online and agent JAMB ePIN vending with virtual accounts.',
    problem: 'Selling JAMB ePINs online and through agents needs reliable payment collection, agent wallets, and reconciliation.',
    solution: 'A JAMB PIN vending platform supporting public purchase via dynamic virtual accounts, agent wallet-based vending, an admin panel with transaction history, and support ticketing — across public/agent/admin roles.',
    impact: 'Production-ready with Docker/nginx deployment, role-based access, and comprehensive deployment docs.',
    tech: ['React', 'Vite', 'Node.js', 'Express', 'MySQL', 'JWT', 'TeasyPay DVA', 'Docker', 'nginx'],
    media: null,
  },
]

export function getCaseStudy(slug) {
  return caseStudies.find((c) => c.slug === slug)
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run src/data/caseStudies.test.js`
Expected: PASS (4 tests).

- [ ] **Step 5: Add a cross-consistency test (pillarId integrity)**

Append to `src/data/caseStudies.test.js`:
```js
import { solutions } from './solutions.js'
it('every case study references a real pillar', () => {
  const pillarIds = new Set(solutions.map(s => s.id))
  for (const c of caseStudies) expect(pillarIds.has(c.pillarId)).toBe(true)
})
```

- [ ] **Step 6: Run and commit**

Run: `npx vitest run src/data/caseStudies.test.js` → Expected: PASS (5 tests).
```bash
git add src/data/caseStudies.js src/data/caseStudies.test.js
git commit -m "feat: add 8 flagship case studies data module"
```

---

## Task 6: Firebase isolation module

**Files:**
- Create: `src/lib/firebase.js`
- Test: `src/lib/firebase.test.js`

This extracts the Firebase config + reviews logic out of `App.jsx`. Keep the existing config values (web Firebase config is public by design; security is enforced by Firestore rules).

- [ ] **Step 1: Write the failing test (pure helper only)**

The collection path builder is the testable pure part. Test it:
```js
import { describe, it, expect } from 'vitest'
import { reviewsPath } from './firebase.js'

describe('reviewsPath', () => {
  it('builds the public reviews collection path', () => {
    expect(reviewsPath('my-portfolio-787cb')).toBe(
      '/artifacts/my-portfolio-787cb/public/data/reviews'
    )
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/lib/firebase.test.js`
Expected: FAIL — cannot resolve `./firebase.js`.

- [ ] **Step 3: Create `src/lib/firebase.js`**

```js
import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously } from 'firebase/auth'
import {
  getFirestore, collection, addDoc, onSnapshot,
  orderBy, query, serverTimestamp, limit,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDkge5g5B0wNzC_U9qs5HCdadgBpl4ni7Y',
  authDomain: 'my-portfolio-787cb.firebaseapp.com',
  projectId: 'my-portfolio-787cb',
  storageBucket: 'my-portfolio-787cb.firebasestorage.app',
  messagingSenderId: '204730955320',
  appId: '1:204730955320:web:aecc83bcb76b20a91c58cd',
  measurementId: 'G-HQQNMK9CTD',
}

export function reviewsPath(projectId) {
  return `/artifacts/${projectId}/public/data/reviews`
}

let app, db, auth
try {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  auth = getAuth(app)
} catch (e) {
  console.error('Failed to initialize Firebase:', e)
}

// Subscribe to the latest reviews. Returns an unsubscribe function (or no-op).
export function subscribeToReviews(onChange, max = 6) {
  if (!db || !auth) return () => {}
  let unsub = () => {}
  signInAnonymously(auth)
    .then(() => {
      const col = collection(db, reviewsPath(firebaseConfig.projectId))
      const q = query(col, orderBy('timestamp', 'desc'), limit(max))
      unsub = onSnapshot(q, (snap) => {
        onChange(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      }, (err) => console.error('reviews listener error:', err))
    })
    .catch((e) => console.error('anon auth failed:', e))
  return () => unsub()
}

export async function addReview({ name, rating, message }) {
  if (!db) throw new Error('Firestore not initialized')
  const col = collection(db, reviewsPath(firebaseConfig.projectId))
  await addDoc(col, { name, rating, message, timestamp: serverTimestamp() })
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run src/lib/firebase.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/firebase.js src/lib/firebase.test.js
git commit -m "feat: isolate Firebase init and reviews API in lib/firebase"
```

---

## Task 7: SEO title hook + router skeleton

**Files:**
- Create: `src/lib/seo.js`
- Create: `src/router.jsx`
- Create: `src/pages/Home.jsx` (placeholder for now)
- Modify: `src/main.jsx`

- [ ] **Step 1: Create `src/lib/seo.js`**

```js
import { useEffect } from 'react'

export function useDocumentTitle(title) {
  useEffect(() => {
    const prev = document.title
    document.title = title ? `${title} · GWABS Technology` : 'GWABS Technology Limited'
    return () => { document.title = prev }
  }, [title])
}
```

- [ ] **Step 2: Create placeholder `src/pages/Home.jsx`**

```jsx
import { useDocumentTitle } from '../lib/seo.js'

export default function Home() {
  useDocumentTitle('')
  return <main className="pt-24 text-center text-offwhite">Home (under construction)</main>
}
```

- [ ] **Step 3: Create `src/router.jsx`**

```jsx
import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
])
```

- [ ] **Step 4: Update `src/main.jsx`**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { router } from './router.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <SpeedInsights />
  </React.StrictMode>,
)
```

- [ ] **Step 5: Replace `src/App.jsx` with a minimal layout shell (temporary)**

```jsx
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen bg-navy">
      <Outlet />
    </div>
  )
}
```

- [ ] **Step 6: Verify it builds and routes**

Run: `npm run dev`, load `/` → see "Home (under construction)". Run `npm run build` → Expected: success. Stop server.

- [ ] **Step 7: Commit**

```bash
git add src/lib/seo.js src/router.jsx src/pages/Home.jsx src/main.jsx src/App.jsx
git commit -m "feat: add router skeleton, SEO title hook, and layout shell"
```

---

## Task 8: Nav component

**Files:**
- Create: `src/components/Nav.jsx`
- Test: `src/components/Nav.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Nav from './Nav.jsx'

describe('Nav', () => {
  it('renders the wordmark and all nav links', () => {
    render(<MemoryRouter><Nav /></MemoryRouter>)
    expect(screen.getByText('GWABS')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Solutions' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Case Studies' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/components/Nav.test.jsx`
Expected: FAIL — cannot resolve `./Nav.jsx`.

- [ ] **Step 3: Create `src/components/Nav.jsx`**

```jsx
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../data/company.js'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'glass-card shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-offwhite font-outfit">
          GWABS<span className="text-teal">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.filter(l => l.to !== '/').map(l => (
            <NavLink key={l.to} to={l.to}
              className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-teal' : 'text-slate hover:text-teal'}`}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn-gradient font-semibold text-sm py-2 px-5 rounded-full">Get in touch</Link>
        </div>
        <button className="md:hidden text-slate" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden glass-card border-t border-surface-border py-4">
          <div className="flex flex-col items-center gap-4">
            {navLinks.map(l => (
              <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
                className="text-slate hover:text-teal text-lg font-medium">{l.label}</NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run src/components/Nav.test.jsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.jsx src/components/Nav.test.jsx
git commit -m "feat: add Nav component"
```

---

## Task 9: Footer component

**Files:**
- Create: `src/components/Footer.jsx`
- Test: `src/components/Footer.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer.jsx'

describe('Footer', () => {
  it('shows company registration and contact facts', () => {
    render(<MemoryRouter><Footer /></MemoryRouter>)
    expect(screen.getByText(/RC 9482405/)).toBeInTheDocument()
    expect(screen.getByText(/info@gbs.ng/)).toBeInTheDocument()
    expect(screen.getByText(/Karu, Abuja/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/components/Footer.test.jsx`
Expected: FAIL.

- [ ] **Step 3: Create `src/components/Footer.jsx`**

```jsx
import { Link } from 'react-router-dom'
import { company, navLinks } from '../data/company.js'

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-slate text-sm">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="text-xl font-extrabold text-offwhite font-outfit">GWABS<span className="text-teal">.</span></div>
          <p className="mt-3 leading-relaxed">{company.address}</p>
          <p className="mt-2">RC {company.rc} · TIN {company.tin}</p>
          <p className="mt-2 text-xs">Formerly {company.formerName}.</p>
        </div>
        <div>
          <h4 className="text-offwhite font-semibold mb-3">Company</h4>
          <ul className="space-y-2">
            {navLinks.map(l => (
              <li key={l.to}><Link to={l.to} className="hover:text-teal">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-offwhite font-semibold mb-3">Contact</h4>
          <p><a href={`mailto:${company.email}`} className="hover:text-teal">{company.email}</a></p>
          <p className="mt-2"><a href={`tel:${company.phone.replace(/\s/g, '')}`} className="hover:text-teal">{company.phone}</a></p>
        </div>
      </div>
      <div className="border-t border-surface-border py-5 text-center text-xs">
        © {new Date().getFullYear()} {company.legalName}. All rights reserved.
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run src/components/Footer.test.jsx`
Expected: PASS.

- [ ] **Step 5: Wire Nav + Footer into `src/App.jsx`**

```jsx
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-navy">
      <Nav />
      <div className="flex-1"><Outlet /></div>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Footer.jsx src/components/Footer.test.jsx src/App.jsx
git commit -m "feat: add Footer and wire layout shell"
```

---

## Task 10: Presentational components (Hero, TrustBar, StatsBand, CTASection)

**Files:**
- Create: `src/components/Hero.jsx`, `TrustBar.jsx`, `StatsBand.jsx`, `CTASection.jsx`
- Test: `src/components/presentational.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Hero from './Hero.jsx'
import TrustBar from './TrustBar.jsx'
import StatsBand from './StatsBand.jsx'
import CTASection from './CTASection.jsx'

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('presentational components', () => {
  it('Hero shows the tagline and CTAs', () => {
    wrap(<Hero />)
    expect(screen.getByText(/engineered to settle/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Explore solutions/i })).toBeInTheDocument()
  })
  it('TrustBar lists badges', () => {
    wrap(<TrustBar />)
    expect(screen.getByText('ISO 8583')).toBeInTheDocument()
  })
  it('StatsBand renders stat values', () => {
    wrap(<StatsBand />)
    expect(screen.getByText('PCI DSS')).toBeInTheDocument()
  })
  it('CTASection has a consultation link', () => {
    wrap(<CTASection />)
    expect(screen.getByRole('link', { name: /consultation/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/components/presentational.test.jsx`
Expected: FAIL.

- [ ] **Step 3: Create `src/components/Hero.jsx`**

```jsx
import { Link } from 'react-router-dom'
import { company } from '../data/company.js'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy to-navy-2 pt-32 pb-24 text-center">
      <div className="container mx-auto px-6">
        <p className="text-xs tracking-[0.2em] font-bold text-teal">FINTECH SOLUTIONS &amp; CONSULTANCY</p>
        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-offwhite font-outfit leading-tight">
          Fintech infrastructure,<br /><span className="text-gradient">engineered to settle.</span>
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-lg text-slate">{company.whatWeDo}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/solutions" className="btn-gradient font-semibold py-3 px-8 rounded-full">Explore solutions</Link>
          <Link to="/contact" className="border border-surface-border text-slate hover:text-teal font-semibold py-3 px-8 rounded-full transition-colors">Book a consultation</Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `src/components/TrustBar.jsx`**

```jsx
import { trustBadges } from '../data/company.js'

export default function TrustBar() {
  return (
    <div className="bg-navy-deep border-y border-surface-border">
      <div className="container mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs tracking-wider text-slate/70">
        {trustBadges.map(b => <span key={b}>{b}</span>)}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Create `src/components/StatsBand.jsx`**

```jsx
import { stats } from '../data/company.js'

export default function StatsBand() {
  return (
    <section className="bg-teal text-teal-ink">
      <div className="container mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map(s => (
          <div key={s.label}>
            <div className="text-3xl font-extrabold font-outfit">{s.value}</div>
            <div className="text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Create `src/components/CTASection.jsx`**

```jsx
import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="bg-gradient-to-b from-navy-2 to-navy text-center">
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-offwhite font-outfit">Have a payments problem to solve?</h2>
        <p className="mt-3 text-slate">Let's talk about POS, switching, SDKs, or fintech software.</p>
        <Link to="/contact" className="inline-block mt-6 btn-gradient font-semibold py-3 px-8 rounded-full">Book a consultation</Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Run to verify it passes**

Run: `npx vitest run src/components/presentational.test.jsx`
Expected: PASS (4 tests).

- [ ] **Step 8: Commit**

```bash
git add src/components/Hero.jsx src/components/TrustBar.jsx src/components/StatsBand.jsx src/components/CTASection.jsx src/components/presentational.test.jsx
git commit -m "feat: add Hero, TrustBar, StatsBand, CTASection"
```

---

## Task 11: SolutionCard + CaseStudyCard

**Files:**
- Create: `src/components/SolutionCard.jsx`, `src/components/CaseStudyCard.jsx`
- Test: `src/components/cards.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SolutionCard from './SolutionCard.jsx'
import CaseStudyCard from './CaseStudyCard.jsx'
import { solutions } from '../data/solutions.js'
import { caseStudies } from '../data/caseStudies.js'

describe('cards', () => {
  it('SolutionCard renders title and points', () => {
    render(<MemoryRouter><SolutionCard solution={solutions[0]} /></MemoryRouter>)
    expect(screen.getByText(solutions[0].title)).toBeInTheDocument()
  })
  it('CaseStudyCard links to the detail route and shows client', () => {
    render(<MemoryRouter><CaseStudyCard study={caseStudies[1]} /></MemoryRouter>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/case-studies/bellbank-cashout-middleware')
    expect(screen.getByText('Bellbank MFB')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/components/cards.test.jsx`
Expected: FAIL.

- [ ] **Step 3: Create `src/components/SolutionCard.jsx`**

```jsx
export default function SolutionCard({ solution }) {
  return (
    <div className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-transform">
      <div className="text-2xl text-teal">{solution.icon}</div>
      <h3 className="mt-3 text-lg font-bold text-offwhite font-outfit">{solution.title}</h3>
      <p className="mt-2 text-sm text-slate">{solution.summary}</p>
      <ul className="mt-4 space-y-1.5 text-sm text-slate/90">
        {solution.points.map(p => (
          <li key={p} className="flex gap-2"><span className="text-teal">›</span>{p}</li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 4: Create `src/components/CaseStudyCard.jsx`**

```jsx
import { Link } from 'react-router-dom'

export default function CaseStudyCard({ study }) {
  return (
    <Link to={`/case-studies/${study.slug}`} className="glass-card rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform">
      <div className="h-28 bg-gradient-to-br from-surface to-teal/60" />
      <div className="p-5">
        <h3 className="text-lg font-bold text-offwhite font-outfit group-hover:text-teal transition-colors">{study.title}</h3>
        <p className="mt-1 text-xs">
          <span className={study.isOwnProduct ? 'text-teal font-semibold' : 'text-slate'}>{study.client}</span>
        </p>
        <p className="mt-2 text-sm text-slate">{study.hook}</p>
      </div>
    </Link>
  )
}
```

- [ ] **Step 5: Run to verify it passes**

Run: `npx vitest run src/components/cards.test.jsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/SolutionCard.jsx src/components/CaseStudyCard.jsx src/components/cards.test.jsx
git commit -m "feat: add SolutionCard and CaseStudyCard"
```

---

## Task 12: ReviewList + ReviewForm (Firebase)

**Files:**
- Create: `src/components/ReviewList.jsx`, `src/components/ReviewForm.jsx`
- Test: `src/components/ReviewForm.test.jsx`

- [ ] **Step 1: Write the failing test (mock the firebase module)**

```jsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const addReview = vi.fn().mockResolvedValue(undefined)
vi.mock('../lib/firebase.js', () => ({ addReview: (...a) => addReview(...a) }))

import ReviewForm from './ReviewForm.jsx'

beforeEach(() => addReview.mockClear())

describe('ReviewForm', () => {
  it('submits name, rating, and message', async () => {
    const user = userEvent.setup()
    render(<ReviewForm />)
    await user.type(screen.getByLabelText(/name/i), 'Ada')
    await user.click(screen.getByRole('button', { name: '★ 5' }))
    await user.type(screen.getByLabelText(/review/i), 'Excellent work')
    await user.click(screen.getByRole('button', { name: /submit/i }))
    expect(addReview).toHaveBeenCalledWith({ name: 'Ada', rating: 5, message: 'Excellent work' })
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/components/ReviewForm.test.jsx`
Expected: FAIL.

- [ ] **Step 3: Create `src/components/ReviewForm.jsx`**

```jsx
import { useState } from 'react'
import { addReview } from '../lib/firebase.js'

export default function ReviewForm() {
  const [form, setForm] = useState({ name: '', rating: 0, message: '' })
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.message || form.rating === 0) { setStatus('error'); return }
    setStatus('sending')
    try {
      await addReview(form)
      setStatus('success'); setForm({ name: '', rating: 0, message: '' })
    } catch { setStatus('error') }
    finally { setTimeout(() => setStatus(null), 4000) }
  }

  return (
    <form onSubmit={submit} className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-offwhite font-outfit text-center mb-6">Leave a review</h3>
      <label htmlFor="rv-name" className="block text-slate font-medium mb-1">Your name</label>
      <input id="rv-name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
        className="w-full mb-4 px-4 py-2 bg-navy border border-surface-border rounded-lg text-offwhite" placeholder="Enter your name" />
      <span className="block text-slate font-medium mb-1">Rating</span>
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map(n => (
          <button type="button" key={n} aria-label={`★ ${n}`} onClick={() => setForm({ ...form, rating: n })}
            className={`text-2xl ${n <= form.rating ? 'text-teal' : 'text-surface-border'}`}>★</button>
        ))}
      </div>
      <label htmlFor="rv-msg" className="block text-slate font-medium mb-1">Your review</label>
      <textarea id="rv-msg" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
        rows={4} className="w-full mb-4 px-4 py-2 bg-navy border border-surface-border rounded-lg text-offwhite" placeholder="Share your experience" />
      <button type="submit" className="btn-gradient font-semibold py-3 px-8 rounded-full w-full">Submit review</button>
      {status === 'success' && <p className="text-teal text-center mt-3">Thank you for your review!</p>}
      {status === 'error' && <p className="text-red-400 text-center mt-3">Please fill all fields and try again.</p>}
    </form>
  )
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run src/components/ReviewForm.test.jsx`
Expected: PASS.

- [ ] **Step 5: Create `src/components/ReviewList.jsx`**

```jsx
import { useEffect, useState } from 'react'
import { subscribeToReviews } from '../lib/firebase.js'

export default function ReviewList() {
  const [reviews, setReviews] = useState([])
  useEffect(() => subscribeToReviews(setReviews, 6), [])

  if (reviews.length === 0) {
    return <p className="text-center text-slate">No reviews yet. Be the first to leave one!</p>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map(r => (
        <div key={r.id} className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-teal text-teal-ink flex items-center justify-center font-bold">{r.name?.charAt(0)}</div>
            <div>
              <p className="font-bold text-offwhite">{r.name}</p>
              <div className="text-teal text-sm">{'★'.repeat(r.rating)}<span className="text-surface-border">{'★'.repeat(5 - r.rating)}</span></div>
            </div>
          </div>
          <p className="text-slate italic">"{r.message}"</p>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ReviewForm.jsx src/components/ReviewList.jsx src/components/ReviewForm.test.jsx
git commit -m "feat: add Firebase-backed ReviewList and ReviewForm"
```

---

## Task 13: ContactForm

**Files:**
- Create: `src/components/ContactForm.jsx`
- Test: `src/components/ContactForm.test.jsx`

The existing site posts the contact form to a form-action endpoint. Preserve that pattern with a configurable `action` prop (default to the existing Formspree-style endpoint; the executor should confirm the real endpoint from the old `App.jsx` git history and substitute it).

- [ ] **Step 1: Write the failing test**

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContactForm from './ContactForm.jsx'

describe('ContactForm', () => {
  it('renders all fields and a submit button', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/components/ContactForm.test.jsx`
Expected: FAIL.

- [ ] **Step 3: Create `src/components/ContactForm.jsx`**

```jsx
import { useState } from 'react'

const DEFAULT_ACTION = 'https://formspree.io/f/your-id' // TODO: replace with the real endpoint from old App.jsx

export default function ContactForm({ action = DEFAULT_ACTION }) {
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(action, { method: 'POST', body: new FormData(e.target), headers: { Accept: 'application/json' } })
      if (res.ok) { setStatus('success'); e.target.reset() } else setStatus('error')
    } catch { setStatus('error') }
    finally { setTimeout(() => setStatus(null), 5000) }
  }

  return (
    <form onSubmit={submit} method="POST" action={action} className="glass-card rounded-2xl p-8 max-w-2xl mx-auto space-y-4">
      <div>
        <label htmlFor="c-name" className="block text-slate font-medium mb-1">Name</label>
        <input id="c-name" name="name" required className="w-full px-4 py-2 bg-navy border border-surface-border rounded-lg text-offwhite" />
      </div>
      <div>
        <label htmlFor="c-email" className="block text-slate font-medium mb-1">Email</label>
        <input id="c-email" type="email" name="email" required className="w-full px-4 py-2 bg-navy border border-surface-border rounded-lg text-offwhite" />
      </div>
      <div>
        <label htmlFor="c-subject" className="block text-slate font-medium mb-1">Subject</label>
        <input id="c-subject" name="subject" className="w-full px-4 py-2 bg-navy border border-surface-border rounded-lg text-offwhite" />
      </div>
      <div>
        <label htmlFor="c-message" className="block text-slate font-medium mb-1">Message</label>
        <textarea id="c-message" name="message" rows={5} required className="w-full px-4 py-2 bg-navy border border-surface-border rounded-lg text-offwhite" />
      </div>
      <button type="submit" className="btn-gradient font-semibold py-3 px-8 rounded-full w-full">Send message</button>
      {status === 'success' && <p className="text-teal text-center">Message sent — we'll be in touch.</p>}
      {status === 'error' && <p className="text-red-400 text-center">Something went wrong. Try emailing us directly.</p>}
    </form>
  )
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run src/components/ContactForm.test.jsx`
Expected: PASS.

- [ ] **Step 5: Recover the real form endpoint**

Run: `git log -p -S "form.action" -- src/App.jsx | head -100` (or inspect the pre-refactor `App.jsx`). Replace `DEFAULT_ACTION` with the real endpoint found. If none exists, leave the placeholder and note it in the PR description.

- [ ] **Step 6: Commit**

```bash
git add src/components/ContactForm.jsx src/components/ContactForm.test.jsx
git commit -m "feat: add ContactForm preserving existing submit endpoint"
```

---

## Task 14: Home page (assemble)

**Files:**
- Modify: `src/pages/Home.jsx`
- Test: `src/pages/Home.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home.jsx'

describe('Home', () => {
  it('shows hero, what-we-do, featured work and a view-all link', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    expect(screen.getByText(/engineered to settle/i)).toBeInTheDocument()
    expect(screen.getByText(/What we do/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view all/i })).toHaveAttribute('href', '/case-studies')
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/pages/Home.test.jsx`
Expected: FAIL (placeholder Home has none of this).

- [ ] **Step 3: Replace `src/pages/Home.jsx`**

```jsx
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/seo.js'
import Hero from '../components/Hero.jsx'
import TrustBar from '../components/TrustBar.jsx'
import StatsBand from '../components/StatsBand.jsx'
import CTASection from '../components/CTASection.jsx'
import SolutionCard from '../components/SolutionCard.jsx'
import CaseStudyCard from '../components/CaseStudyCard.jsx'
import { solutions } from '../data/solutions.js'
import { caseStudies } from '../data/caseStudies.js'
import { company } from '../data/company.js'

export default function Home() {
  useDocumentTitle('')
  const featured = caseStudies.slice(0, 3)
  return (
    <main>
      <Hero />
      <TrustBar />

      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-extrabold text-offwhite font-outfit text-center">What we do</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map(s => <SolutionCard key={s.id} solution={s} />)}
        </div>
      </section>

      <section className="bg-navy-deep py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-offwhite font-outfit text-center">Featured work</h2>
          <p className="text-center text-slate mt-2">Selected engagements — clients credited.</p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map(c => <CaseStudyCard key={c.slug} study={c} />)}
          </div>
          <div className="text-center mt-8">
            <Link to="/case-studies" className="border border-surface-border text-slate hover:text-teal font-semibold py-3 px-8 rounded-full transition-colors">View all 8 case studies →</Link>
          </div>
        </div>
      </section>

      <StatsBand />

      <section className="container mx-auto px-6 py-20 grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-3">
          <h2 className="text-3xl font-extrabold text-offwhite font-outfit">Built by payment engineers</h2>
          <p className="mt-4 text-slate leading-relaxed">
            Formerly <span className="text-teal font-semibold">{company.formerName}</span>, now incorporated as {company.legalName} (RC {company.rc}). We specialise in secure, compliant payment systems — from the terminal to the switch.
          </p>
          <Link to="/about" className="inline-block mt-5 text-teal font-semibold">About the company →</Link>
        </div>
        <div className="md:col-span-2 glass-card rounded-2xl h-40" />
      </section>

      <CTASection />
    </main>
  )
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run src/pages/Home.test.jsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home.jsx src/pages/Home.test.jsx
git commit -m "feat: assemble Home page"
```

---

## Task 15: Solutions page

**Files:**
- Create: `src/pages/Solutions.jsx`
- Modify: `src/router.jsx` (add route)
- Test: `src/pages/Solutions.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Solutions from './Solutions.jsx'

describe('Solutions', () => {
  it('renders all four pillar titles', () => {
    render(<MemoryRouter><Solutions /></MemoryRouter>)
    expect(screen.getByText('Payment Switching & Middleware')).toBeInTheDocument()
    expect(screen.getByText('Device & Hardware SDKs')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/pages/Solutions.test.jsx`
Expected: FAIL.

- [ ] **Step 3: Create `src/pages/Solutions.jsx`**

```jsx
import { useDocumentTitle } from '../lib/seo.js'
import SolutionCard from '../components/SolutionCard.jsx'
import CTASection from '../components/CTASection.jsx'
import { solutions } from '../data/solutions.js'

export default function Solutions() {
  useDocumentTitle('Solutions')
  return (
    <main className="pt-28">
      <section className="container mx-auto px-6 pb-8 text-center">
        <h1 className="text-4xl font-extrabold text-offwhite font-outfit">Solutions</h1>
        <p className="mt-3 text-slate max-w-2xl mx-auto">From the terminal to the switch — we build, integrate, and advise across the payments stack.</p>
      </section>
      <section className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {solutions.map(s => <SolutionCard key={s.id} solution={s} />)}
      </section>
      <CTASection />
    </main>
  )
}
```

- [ ] **Step 4: Add the route in `src/router.jsx`**

Add the import and child route:
```jsx
import Solutions from './pages/Solutions.jsx'
// ...inside children, after the index route:
{ path: 'solutions', element: <Solutions /> },
```

- [ ] **Step 5: Run to verify it passes**

Run: `npx vitest run src/pages/Solutions.test.jsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Solutions.jsx src/pages/Solutions.test.jsx src/router.jsx
git commit -m "feat: add Solutions page and route"
```

---

## Task 16: Case Studies index page (with filter)

**Files:**
- Create: `src/pages/CaseStudies.jsx`
- Modify: `src/router.jsx`
- Test: `src/pages/CaseStudies.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CaseStudies from './CaseStudies.jsx'

describe('CaseStudies', () => {
  it('shows all 8 cards by default', () => {
    render(<MemoryRouter><CaseStudies /></MemoryRouter>)
    expect(screen.getAllByRole('link').filter(a => a.getAttribute('href')?.startsWith('/case-studies/'))).toHaveLength(8)
  })
  it('filters by pillar', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><CaseStudies /></MemoryRouter>)
    await user.click(screen.getByRole('button', { name: /Payment Switching/i }))
    const links = screen.getAllByRole('link').filter(a => a.getAttribute('href')?.startsWith('/case-studies/'))
    expect(links.length).toBeLessThan(8)
    expect(links.length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/pages/CaseStudies.test.jsx`
Expected: FAIL.

- [ ] **Step 3: Create `src/pages/CaseStudies.jsx`**

```jsx
import { useState } from 'react'
import { useDocumentTitle } from '../lib/seo.js'
import CaseStudyCard from '../components/CaseStudyCard.jsx'
import { caseStudies } from '../data/caseStudies.js'
import { solutions } from '../data/solutions.js'

export default function CaseStudies() {
  useDocumentTitle('Case Studies')
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? caseStudies : caseStudies.filter(c => c.pillarId === filter)

  const chips = [{ id: 'all', title: 'All' }, ...solutions]

  return (
    <main className="pt-28">
      <section className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-extrabold text-offwhite font-outfit">Case Studies</h1>
        <p className="mt-3 text-slate max-w-2xl mx-auto">Selected fintech engagements. Client work is delivered as consultancy; clients are credited.</p>
      </section>

      <div className="container mx-auto px-6 mt-8 flex flex-wrap justify-center gap-2">
        {chips.map(c => (
          <button key={c.id} onClick={() => setFilter(c.id)}
            className={`text-sm py-2 px-4 rounded-full border transition-colors ${filter === c.id ? 'bg-teal text-teal-ink border-teal' : 'border-surface-border text-slate hover:text-teal'}`}>
            {c.title}
          </button>
        ))}
      </div>

      <section className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shown.map(c => <CaseStudyCard key={c.slug} study={c} />)}
      </section>
    </main>
  )
}
```

- [ ] **Step 4: Add the route in `src/router.jsx`**

```jsx
import CaseStudies from './pages/CaseStudies.jsx'
// child route:
{ path: 'case-studies', element: <CaseStudies /> },
```

- [ ] **Step 5: Run to verify it passes**

Run: `npx vitest run src/pages/CaseStudies.test.jsx`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add src/pages/CaseStudies.jsx src/pages/CaseStudies.test.jsx src/router.jsx
git commit -m "feat: add Case Studies index with pillar filter"
```

---

## Task 17: Case Study detail page (`/case-studies/:slug`)

**Files:**
- Create: `src/pages/CaseStudyDetail.jsx`
- Modify: `src/router.jsx`
- Test: `src/pages/CaseStudyDetail.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import CaseStudyDetail from './CaseStudyDetail.jsx'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes><Route path="/case-studies/:slug" element={<CaseStudyDetail />} /></Routes>
    </MemoryRouter>
  )
}

describe('CaseStudyDetail', () => {
  it('renders problem/solution/impact for a known slug', () => {
    renderAt('/case-studies/teasypay-pos-sdk')
    expect(screen.getByText('TeasyPay POS SDK')).toBeInTheDocument()
    expect(screen.getByText(/The Problem/i)).toBeInTheDocument()
    expect(screen.getByText(/jPOS/)).toBeInTheDocument()
  })
  it('shows a not-found state for an unknown slug', () => {
    renderAt('/case-studies/does-not-exist')
    expect(screen.getByText(/not found/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/pages/CaseStudyDetail.test.jsx`
Expected: FAIL.

- [ ] **Step 3: Create `src/pages/CaseStudyDetail.jsx`**

```jsx
import { useParams, Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/seo.js'
import { getCaseStudy } from '../data/caseStudies.js'

function Section({ label, children }) {
  return (
    <div className="mt-8">
      <h2 className="text-xs tracking-[0.2em] font-bold text-teal uppercase">{label}</h2>
      <p className="mt-2 text-slate leading-relaxed">{children}</p>
    </div>
  )
}

export default function CaseStudyDetail() {
  const { slug } = useParams()
  const study = getCaseStudy(slug)
  useDocumentTitle(study ? study.title : 'Case study not found')

  if (!study) {
    return (
      <main className="pt-32 pb-24 container mx-auto px-6 text-center">
        <h1 className="text-2xl font-bold text-offwhite">Case study not found</h1>
        <Link to="/case-studies" className="text-teal mt-4 inline-block">← Back to case studies</Link>
      </main>
    )
  }

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link to="/case-studies" className="text-slate hover:text-teal text-sm">← Case studies</Link>
        <p className="mt-4 text-xs">
          <span className={study.isOwnProduct ? 'text-teal font-semibold' : 'text-slate'}>{study.client}</span>
        </p>
        <h1 className="mt-1 text-4xl font-extrabold text-offwhite font-outfit">{study.title}</h1>
        <p className="mt-3 text-lg text-slate">{study.hook}</p>

        {study.media?.type === 'youtube' && (
          <div className="mt-8 aspect-video rounded-2xl overflow-hidden">
            <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${study.media.id}`}
              title={study.title} allowFullScreen frameBorder="0" />
          </div>
        )}

        <Section label="The Problem">{study.problem}</Section>
        <Section label="Our Solution">{study.solution}</Section>
        <Section label="Impact">{study.impact}</Section>

        <div className="mt-8">
          <h2 className="text-xs tracking-[0.2em] font-bold text-teal uppercase">Tech</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {study.tech.map(t => (
              <span key={t} className="text-xs py-1 px-3 rounded-full bg-surface border border-surface-border text-slate">{t}</span>
            ))}
          </div>
        </div>

        <div className="mt-12 glass-card rounded-2xl p-6 text-center">
          <p className="text-offwhite font-semibold">Want something similar built or integrated?</p>
          <Link to="/contact" className="inline-block mt-4 btn-gradient font-semibold py-2.5 px-6 rounded-full">Book a consultation</Link>
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Add the route in `src/router.jsx`**

```jsx
import CaseStudyDetail from './pages/CaseStudyDetail.jsx'
// child route, after 'case-studies':
{ path: 'case-studies/:slug', element: <CaseStudyDetail /> },
```

- [ ] **Step 5: Run to verify it passes**

Run: `npx vitest run src/pages/CaseStudyDetail.test.jsx`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add src/pages/CaseStudyDetail.jsx src/pages/CaseStudyDetail.test.jsx src/router.jsx
git commit -m "feat: add case study detail page"
```

---

## Task 18: About page (company + founder + reviews)

**Files:**
- Create: `src/pages/About.jsx`
- Modify: `src/router.jsx`
- Test: `src/pages/About.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import About from './About.jsx'

describe('About', () => {
  it('tells the company story and names the founder', () => {
    render(<MemoryRouter><About /></MemoryRouter>)
    expect(screen.getByText(/formerly/i)).toBeInTheDocument()
    expect(screen.getByText(/Abubakar/)).toBeInTheDocument()
    expect(screen.getByText(/RC 9482405/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/pages/About.test.jsx`
Expected: FAIL.

- [ ] **Step 3: Create `src/pages/About.jsx`**

```jsx
import { useDocumentTitle } from '../lib/seo.js'
import ReviewList from '../components/ReviewList.jsx'
import ReviewForm from '../components/ReviewForm.jsx'
import CTASection from '../components/CTASection.jsx'
import { company } from '../data/company.js'

export default function About() {
  useDocumentTitle('About')
  return (
    <main className="pt-28">
      <section className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-extrabold text-offwhite font-outfit">About GWABS</h1>
        <p className="mt-4 text-slate leading-relaxed">
          {company.legalName} (RC {company.rc}) is a Nigerian fintech engineering company, formerly {company.formerName}, incorporated on {company.incorporated} under CAMA 2020. We design and build secure, compliant payment systems: POS terminal applications, payment switching and middleware, device & hardware SDKs, and fintech software — for banks, microfinance banks, processors, and merchants.
        </p>
        <p className="mt-4 text-slate leading-relaxed">
          Our work spans the full payments stack, from EMV card acceptance on terminal hardware to ISO 8583 switching, terminal management, and SaaS business platforms. We hold PCI DSS-aligned expertise and design for CBN compliance.
        </p>
      </section>

      <section className="container mx-auto px-6 max-w-3xl mt-12">
        <h2 className="text-2xl font-extrabold text-offwhite font-outfit">Leadership</h2>
        <div className="glass-card rounded-2xl p-6 mt-4">
          <h3 className="text-lg font-bold text-offwhite">Abubakar Abdullahi Gwabare — Founder</h3>
          <p className="text-teal text-sm mt-1">Fintech Architect · POS & Payment Systems</p>
          <p className="mt-3 text-slate leading-relaxed">
            Fintech-focused engineer specialising in Kotlin, Android, and payment infrastructure, with hands-on delivery of POS and switching systems across NIBSS, Interswitch, and multiple processors. PCI DSS certified, with a track record building core-banking, POS, and SDK products.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 mt-16">
        <h2 className="text-2xl font-extrabold text-offwhite font-outfit text-center">What clients say</h2>
        <div className="mt-8"><ReviewList /></div>
        <div className="mt-10"><ReviewForm /></div>
      </section>

      <div className="mt-16"><CTASection /></div>
    </main>
  )
}
```

- [ ] **Step 4: Add the route in `src/router.jsx`**

```jsx
import About from './pages/About.jsx'
// child route:
{ path: 'about', element: <About /> },
```

- [ ] **Step 5: Run to verify it passes**

Run: `npx vitest run src/pages/About.test.jsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/pages/About.jsx src/pages/About.test.jsx src/router.jsx
git commit -m "feat: add About page with founder bio and reviews"
```

---

## Task 19: Contact page

**Files:**
- Create: `src/pages/Contact.jsx`
- Modify: `src/router.jsx`
- Test: `src/pages/Contact.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Contact from './Contact.jsx'

describe('Contact', () => {
  it('shows the form and the company contact details', () => {
    render(<MemoryRouter><Contact /></MemoryRouter>)
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
    expect(screen.getByText(/info@gbs.ng/)).toBeInTheDocument()
    expect(screen.getByText(/\+234 903 086 3146/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/pages/Contact.test.jsx`
Expected: FAIL.

- [ ] **Step 3: Create `src/pages/Contact.jsx`**

```jsx
import { useDocumentTitle } from '../lib/seo.js'
import ContactForm from '../components/ContactForm.jsx'
import { company } from '../data/company.js'

export default function Contact() {
  useDocumentTitle('Contact')
  return (
    <main className="pt-28 pb-20">
      <section className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-4xl font-extrabold text-offwhite font-outfit">Get in touch</h1>
          <p className="mt-3 text-slate">Tell us about your payments project. We respond within one business day.</p>
          <dl className="mt-8 space-y-4 text-slate">
            <div>
              <dt className="text-offwhite font-semibold">Email</dt>
              <dd><a className="hover:text-teal" href={`mailto:${company.email}`}>{company.email}</a></dd>
            </div>
            <div>
              <dt className="text-offwhite font-semibold">Phone</dt>
              <dd><a className="hover:text-teal" href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a></dd>
            </div>
            <div>
              <dt className="text-offwhite font-semibold">Address</dt>
              <dd>{company.address}</dd>
            </div>
            <div>
              <dt className="text-offwhite font-semibold">Registration</dt>
              <dd>RC {company.rc} · TIN {company.tin}</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </section>
    </main>
  )
}
```

- [ ] **Step 4: Add the route in `src/router.jsx`**

```jsx
import Contact from './pages/Contact.jsx'
// child route:
{ path: 'contact', element: <Contact /> },
```

- [ ] **Step 5: Run to verify it passes**

Run: `npx vitest run src/pages/Contact.test.jsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Contact.jsx src/pages/Contact.test.jsx src/router.jsx
git commit -m "feat: add Contact page and route"
```

---

## Task 20: HTML meta, favicon, and 404 fallback

**Files:**
- Modify: `index.html`
- Modify: `src/router.jsx` (catch-all)
- Create: `src/pages/NotFound.jsx`

- [ ] **Step 1: Update `index.html` head**

```html
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/jpeg" href="/favicon.jpeg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="GWABS Technology Limited — fintech solutions & consultancy. POS applications, payment switching, and device SDKs for banks, processors, and merchants in Nigeria." />
    <meta property="og:title" content="GWABS Technology Limited" />
    <meta property="og:description" content="Fintech infrastructure, engineered to settle. POS, switching, and device SDKs." />
    <meta property="og:type" content="website" />
    <title>GWABS Technology Limited</title>
</head>
```

- [ ] **Step 2: Create `src/pages/NotFound.jsx`**

```jsx
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/seo.js'

export default function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <main className="pt-32 pb-24 container mx-auto px-6 text-center">
      <h1 className="text-5xl font-extrabold text-offwhite font-outfit">404</h1>
      <p className="mt-3 text-slate">That page doesn't exist.</p>
      <Link to="/" className="inline-block mt-6 btn-gradient font-semibold py-3 px-8 rounded-full">Back home</Link>
    </main>
  )
}
```

- [ ] **Step 3: Add the catch-all route in `src/router.jsx`**

```jsx
import NotFound from './pages/NotFound.jsx'
// last child route:
{ path: '*', element: <NotFound /> },
```

- [ ] **Step 4: Verify full app builds and all routes load**

Run: `npm run build` → Expected: success.
Run: `npm run dev`, manually visit `/`, `/solutions`, `/case-studies`, `/case-studies/teasypay-pos-sdk`, `/about`, `/contact`, `/nonsense` → each renders, Nav/Footer present, no console errors. Stop server.

- [ ] **Step 5: Commit**

```bash
git add index.html src/pages/NotFound.jsx src/router.jsx
git commit -m "feat: add SEO meta tags and 404 page"
```

---

## Task 21: Remove dead code + Vercel SPA rewrite

**Files:**
- Delete: `public/docs/GPS_Documentation.md` (only if no longer linked — confirm first)
- Create: `vercel.json`
- Verify: no remaining imports of the old monolithic App content

Client-side routing needs all paths to serve `index.html` on Vercel, or deep links 404.

- [ ] **Step 1: Create `vercel.json`**

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- [ ] **Step 2: Confirm no orphaned references**

Run: `git grep -n "generateAIContent\|handleReadMore\|cleanMarkdown" -- src/` → Expected: no matches (the AI generator is gone).
Run: `git grep -n "GPS_Documentation" -- src/ index.html` → if no matches, the doc/images for dropped projects under `public/images/` may be removed; otherwise keep. Only delete assets with zero references.

- [ ] **Step 3: Run the full test suite**

Run: `npm run test`
Expected: all suites PASS.

- [ ] **Step 4: Commit**

```bash
git add vercel.json
git commit -m "chore: add Vercel SPA rewrite and remove dead references"
```

---

## Task 22: Final verification

- [ ] **Step 1: Full build + test**

Run: `npm run test && npm run build`
Expected: tests green; build emits `dist/` with no errors.

- [ ] **Step 2: Manual smoke (preview)**

Run: `npm run preview`, click through every nav link, every case-study card → detail, submit a test review (verify it appears), submit the contact form (verify success/error path). Stop server.

- [ ] **Step 3: Confirm spec coverage**

Re-read `docs/superpowers/specs/2026-06-16-gwabs-company-site-design.md` §9 success criteria; confirm each is met. Note any open items (logo, real contact endpoint, stats verification) in the PR description.

- [ ] **Step 4: Open a PR**

```bash
git push -u origin gwabs-company-site
gh pr create --title "Rebuild as GWABS Technology Limited company site" --body "Multi-page company site (Home, Solutions, Case Studies, About, Contact) on Vite + React Router. Navy/teal Trust Fintech brand. 8 fintech case studies framed as consultancy engagements. Firebase reviews + contact form retained; AI generator removed. See docs/superpowers/specs/2026-06-16-gwabs-company-site-design.md.

Open items: confirm contact form endpoint, supply official logo, verify stats numbers, confirm client-naming permissions."
```

---

## Open Items (carry to PR)

- **Logo:** launched with `GWABS.` wordmark; swap official logo when provided.
- **Contact endpoint:** confirm/replace the form `action` in `ContactForm.jsx` (Task 13 Step 5).
- **Client naming:** Bellbank, Teasy, Getpayed, Blumen named per "consultancy" decision — confirm permissions; anonymize any that object.
- **Stats:** verify "3+ device platforms / 8+ processor integrations" before publish.
- **Firestore rules:** review read/write rules for the reviews collection (public write needs abuse protection).
