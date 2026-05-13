# Fasiri Landing Site

The official marketing site for Fasiri - built with Next.js and deployed on Vercel.

## Setup

1. Clone and install:
   npm install

2. Copy env and add your admin Fasiri key:
   cp .env.local.example .env.local

3. Run locally:
   npm run dev

## Deploy to Vercel

Push to GitHub, import on vercel.com/new, add:
  FASIRI_ADMIN_KEY=fsri_your_long_lived_admin_key

The FASIRI_ADMIN_KEY is a Fasiri API key that the site uses to generate
visitor keys. Generate it once and add it to Render env vars too as FASIRI_DEMO_KEY.
