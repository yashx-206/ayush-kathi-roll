# Ayush Kathi Roll

Website for Ayush Kathi Roll, Palam, New Delhi, built with React, Vite and Tailwind. Home delivery only: orders are sent through WhatsApp.

## Run locally

Prerequisites: Node.js 20+

1. Install dependencies: `npm install --legacy-peer-deps`
2. Start the dev server: `npm run dev`, then open http://localhost:3000

## Shop settings

Edit `OUTLET_INFO` in `src/data/menu.ts` for the shop name, address, WhatsApp order number and timings.
The menu items are in `src/data/menu.ts`; food photos are in `src/assets/images/web`.
Google search details (title, description, business info) are in `index.html`.

## Deploy

Import this repository in Vercel (Framework: Vite) or run `npx vercel --prod`. Build command `npm run build`, output folder `dist`.
