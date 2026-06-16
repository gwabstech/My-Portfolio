# GWABS Technology Limited — Company Site Design

**Date:** 2026-06-16
**Status:** Draft for review
**Author:** Abubakar Abdullahi Gwabare (Gwabstech / GWABS) with Claude

## 1. Goal

Convert the existing single-page personal portfolio into the official multi-page
company website for **GWABS TECHNOLOGY LIMITED** — a Nigerian fintech company
offering fintech solutions & consultancy, POS solutions, and device/hardware SDK
development. The site should read as a credible payments-engineering company, not a
personal CV, while still crediting the founder.

### Company facts (authoritative)
- **Legal name:** GWABS TECHNOLOGY LIMITED
- **Formerly:** Gwabstech Solutions (note the migration on the site)
- **RC number:** 9482405 (incorporated 13 April 2026, CAMA 2020, private company limited by shares)
- **TIN:** 2623758929985
- **What we do:** Fintech solutions & consultancy · POS solutions · device & hardware SDK development
- **Email:** info@gbs.ng
- **Phone:** +234 903 086 3146
- **Address:** No 32 Gilbert Lodge, Back of Abbatua, Karu, Abuja, FCT, Nigeria

## 2. Decisions (locked during brainstorming)

| Topic | Decision |
|-------|----------|
| Structure | **Multi-page** site (Home, Solutions, Case Studies, About, Contact) |
| Voice | **Company-first**; founder (Abubakar) appears in About, not the hero |
| Build stack | **Vite + React 18 + Tailwind + `react-router-dom`** (evolve current stack); keep Firebase + Vercel |
| Brand | **Trust Fintech** — deep navy `#0A1F44`, electric teal `#00C2A8`, slate/white supporting; `GWABS.` wordmark |
| Case studies | **Curated 8** flagships, grouped by solution pillar |
| Attribution | Client/employer work framed as **consultancy engagements with clients credited**; own products labelled "GWABS product" |
| Project content | **Replace the AI "Read More" generator** with hand-written case-study content (problem / solution / tech / impact) |
| Features kept | Firebase client reviews, contact form, project/case-study cards |

## 3. Brand & Design System

- **Palette:** `--navy:#0A1F44` (primary bg), `--navy-2:#0D2A5C` (gradient/hero),
  `--navy-deep:#06122B` (footer), `--teal:#00C2A8` (accent/CTA), `--teal-ink:#04241F`
  (text on teal), `--slate:#B7C4DA` (muted text), `--surface:#13203A` (cards),
  `--border:#223457`, `--white:#F4F7FB`.
- **Type:** System UI / Inter-style sans. Bold, tight headlines; comfortable body.
- **Components feel:** rounded-2xl cards, subtle borders, teal pill CTAs, glassy nav
  on scroll. Reuse the existing tasteful hover/`glass-card` motifs, recolored to navy/teal.
- **Logo:** Use a clean `GWABS.` wordmark (teal full-stop accent) for launch. If the
  user supplies a logo from the CAC letterhead, swap it in (icon + wordmark lockup).
- Tailwind config extended with the palette; dark navy theme throughout (light
  sections optional for contrast on Solutions/Case Studies).

## 4. Information Architecture (5 pages)

1. **Home (`/`)** — Nav · Hero · Trust bar (NIBSS · Interswitch · ISO 8583 · EMV · PCI DSS · Topwise · Urovo · Blumen) · "What we do" (4 solution pillars) · Featured work (3 teaser cards → all 8) · Stats band · About teaser ("formerly Gwabstech Solutions", RC) · CTA band · Footer.
2. **Solutions (`/solutions`)** — The 4 pillars expanded with detail and the engagement model (consultancy / build / SDK licensing):
   - POS Terminal Applications (Android EMV/NFC on Topwise, Urovo, Blumen)
   - Payment Switching & Middleware (ISO 8583 routing, multi-processor)
   - Device & Hardware SDKs (reusable EMV SDKs across vendors)
   - Fintech Software & Consultancy (SaaS POS, lending/LMS, TMS, advisory)
3. **Case Studies (`/case-studies`)** — Grid of the curated 8 with category filter; each links to a dedicated detail route `/case-studies/:slug` (better for SEO and sharing than a modal). Clients credited; GWABS products labelled.
4. **About (`/about`)** — Company story (Gwabstech → GWABS, RC 9482405), mission, capabilities, compliance (PCI DSS), and **Founder/leadership** section (Abubakar — fintech architect, PCI DSS certs, experience highlights). Optional client reviews (Firebase) here or on Home.
5. **Contact (`/contact`)** — Contact form (existing endpoint), company details, address, email, phone, map/region note.

## 5. Curated Case Studies (content to author)

Each gets: title, client/owner badge, one-line hook, **Problem · Solution · Tech · Impact**, tech tags, and optional media (existing YouTube demos / screenshots where available).

| # | Case study | Pillar | Attribution |
|---|-----------|--------|-------------|
| 1 | **Gwabs Business Suite** (ktor-GwabsPointOfSale) | Fintech SaaS / POS platform | GWABS product |
| 2 | **Bellbank Cashout Middleware** | Payment switching & ISO 8583 | Client: Bellbank MFB |
| 3 | **TeasyPay POS SDK** (Topwise/Blumen/Urovo) | Device & hardware SDK | Client: Teasy Mobile |
| 4 | **Getpayed android-pos** (multi-gateway, gov/health) | POS terminal apps | Client: Getpayed |
| 5 | **BlumenTMS** (live in production) | Terminal Management System | Client: Blumen |
| 6 | **Go Credit LMS** | Lending / banking software | GWABS / client |
| 7 | **Ktor Notification gateway + SDK** | Real-time infrastructure | Client: Getpayed |
| 8 | **Teasy JAMB** (virtual accounts, agents) | Consumer vending fintech | Client: Teasy |

**Bench (swap-in):** Cradle TMS (Go switching), Reconcile/GLC, payed-terminal-urovo, Blumen POS, ETOP K11.

Existing reusable media: YouTube demos for Bellbank POS, Quickfill, Teasy POS; live sites Viscount MFB, BlumenTMS (`tms.blumenos.com`); project screenshots under `public/images/`.

## 6. Technical Architecture

Refactor the monolithic `src/App.jsx` (~1000 lines) into a maintainable structure:

```
src/
  main.jsx                  # Router setup (createBrowserRouter)
  App.jsx                   # Layout shell (Nav + <Outlet/> + Footer)
  lib/
    firebase.js             # Firebase init + reviews API (extracted)
  data/
    company.js              # Company facts (name, RC, TIN, contact, address)
    solutions.js            # 4 pillars
    caseStudies.js          # 8 case studies (structured content + tags + media)
  components/
    Nav.jsx  Footer.jsx  Hero.jsx  TrustBar.jsx
    SolutionCard.jsx  CaseStudyCard.jsx  StatsBand.jsx
    ReviewList.jsx  ReviewForm.jsx  ContactForm.jsx  CTASection.jsx
  pages/
    Home.jsx  Solutions.jsx  CaseStudies.jsx  CaseStudyDetail.jsx
    About.jsx  Contact.jsx
  index.css                 # Tailwind + theme tokens
```

- **Routing:** `react-router-dom` with a shared layout route (Nav/Footer) and child routes. Smooth-scroll anchors only within a page.
- **SEO/metadata:** Per-page `<title>`/`<meta>` via a small head helper; ensure each route is crawlable (consider `vite-plugin-ssg`/prerender as a follow-up — not required for v1).
- **Firebase:** Keep anonymous-auth + Firestore reviews; move config/logic into `lib/firebase.js`. (Note: the API key is already public in client code — that's expected for Firebase web config; security is enforced by Firestore rules, which should be reviewed.)
- **Contact form:** Keep the existing form-POST integration; show success/error states.
- **AI generator:** Removed. Case-study content is static/hand-authored.
- **Deploy:** Vercel (unchanged); `@vercel/speed-insights` retained.
- **Assets:** Add `.superpowers/` to `.gitignore`. New brand favicon/wordmark.

## 7. Out of Scope (v1 / YAGNI)

- Next.js / full SSR migration (revisit for SEO if needed)
- Blog/CMS, careers/team directory, multi-language
- Self-hosted analytics beyond Vercel Speed Insights
- Pricing pages (services described qualitatively; "pricing on request")

## 8. Open Items / Assumptions

- **Logo:** Launch with a `GWABS.` wordmark; swap in an official logo if provided from the CAC letterhead.
- **Client permission:** We assume the founder is authorized to credit the named clients (Bellbank, Teasy, Getpayed, Blumen) per the chosen "consultancy engagements" framing. If any client requires anonymizing, that case study switches to a capability-only description.
- **Stats numbers** ("3+ device platforms", "8+ processor integrations") to be verified before publish.
- **Case-study media:** confirm which screenshots/videos may be shown publicly.

## 9. Success Criteria

- Five working routed pages with the navy/teal brand, no leftover personal-CV framing in the hero.
- 8 case studies rendered from structured data with correct client attribution.
- Reviews and contact form functional; no exposed third-party AI key.
- Company facts (RC, TIN, contact, address, "formerly Gwabstech Solutions") present in footer/About.
- Builds and deploys cleanly on Vercel.
