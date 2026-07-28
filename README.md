# Peter van Beek — AI Systems Engineering Portfolio

> **From signal to system.**  
> *I build efficient AI for real-world constraints—bridging speech and vision models, inference optimization, accelerator hardware, and embedded deployment.*

This repository contains the production portfolio website for **Peter van Beek, Ph.D.**, designed for senior AI hiring managers and engineering leaders at companies such as **NVIDIA, ASML, Tesla, Rivian, Apple, Qualcomm, and AMD**.

---

## 🚀 Key Features

* **Proof-Backed Engineering Position:** Built around 25+ years connecting raw sensor signals, deep learning models, quantization/profiling, silicon accelerator specs, and embedded deployment.
* **Flagship Case Studies:**
  1. *Rivian & VW Group:* Voice Assistant Speech AI Model Inference Acceleration (TTS/ASR/Noise Suppression).
  2. *Intel Camera & Vision Group:* Deep Learning Vision Models & Accelerator Silicon Co-Design.
  3. *Intel & Mobileye:* Automated-Driving Safety & Open-Source C++ Library (`ad-rss-lib`).
  4. *Sharp Labs of America:* Computer Vision R&D, Tech Transfer & MPEG Standards Co-Editor.
* **Interactive Architecture Visual:** Custom interactive SVG "Signal → Model → Profile → Silicon Specs → Safety → Product" diagram.
* **Claims Governance:** Every claim verified against résumé, public GitHub repos (`ad-rss-lib`), or published IEEE/patent records. Claims ledger maintained at `docs/claims-ledger.md`.
* **Precision Lab Design System:** Slate dark theme, IBM Plex Mono & Inter font pairing, accessible contrast, zero stock image fluff.
* **Production Engineering:** Built with React 18, TypeScript, Tailwind CSS, and Vite. Achieves WCAG 2.2 AA compliance and 100/100 Lighthouse target scores.
* **Firebase Hosting Ready:** Packaged for Firebase Hosting Spark (Free) tier with zero backend overhead.

---

## 💻 Local Development Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Type Checking & Build
```bash
npm run build
```
Generates production-optimized static files in the `dist/` directory.

### 4. Preview Production Build Locally
```bash
npm run preview
```

---

## ⚡ Firebase Deployment Instructions (Spark Free Tier)

This portfolio is configured for **Firebase Hosting** static deployment.

### Step 1: Install Firebase CLI (if not already installed)
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```

### Step 3: Initialize or Select Firebase Project
If first time:
```bash
firebase init hosting
```
* Select `Use an existing project` or `Create a new project`.
* Set public directory to: `dist`
* Configure as single-page app: `Yes`
* Set up automatic builds: `No` (or as preferred)

### Step 4: Deploy to Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

---

## 📁 Repository Structure

```
.
├── docs/
│   └── claims-ledger.md         # Internal verification ledger for all public claims
├── public/
│   ├── peter-van-beek-resume.pdf # Downloadable PDF résumé
│   ├── robots.txt               # SEO indexing rules
│   └── sitemap.xml              # XML sitemap
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Sticky nav with résumé download CTA
│   │   ├── Hero.tsx             # Typographic hero & proof points
│   │   ├── InteractiveArchitecture.tsx # Signal-to-System SVG visual
│   │   ├── FlagshipWork.tsx     # Evidence-backed case study breakdowns
│   │   ├── ExpertiseGrid.tsx    # Proof-backed technical stack grid
│   │   ├── ResearchPublications.tsx # Selected papers, open-source C++, patents
│   │   ├── ExperienceTimeline.tsx # Career history & Delft Ph.D. background
│   │   └── ContactFooter.tsx    # 1-click email copy, LinkedIn, footer
│   ├── data/
│   │   └── portfolioData.ts     # Typed portfolio content data
│   ├── App.tsx                  # Main app assembly
│   ├── main.tsx                 # Entry point
│   └── index.css                # Precision Lab CSS design system
├── firebase.json                # Firebase Hosting static configuration
├── .firebaserc.example          # Firebase project config template
├── package.json
└── vite.config.ts
```

---

## 🔒 Confidentiality & Accuracy Guarantee
* No proprietary employer metrics, unverified benchmark numbers, or confidential code names are published.
* All public claims strictly adhere to the internal claims ledger at `docs/claims-ledger.md`.
