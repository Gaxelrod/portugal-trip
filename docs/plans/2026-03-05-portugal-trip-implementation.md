# Portugal Trip Journal — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a mobile-first, scrapbook-style single-page site showing the April 2026 Portugal trip itinerary with AI-generated watercolor illustrations.

**Architecture:** A Next.js static site with a single page that renders day cards from a TypeScript data file. Tailwind handles styling. Images are generated via nanobanana MCP and saved as static assets. Deployed to Vercel.

**Tech Stack:** Next.js 14 (App Router, static export), Tailwind CSS v4, Google Fonts (Caveat + Inter), nanobanana MCP for images.

---

### Task 1: Scaffold Next.js project

**Files:**
- Create: project root via `create-next-app`
- Modify: `next.config.ts` (add static export)
- Modify: `tailwind.config.ts` (add custom colors and fonts)
- Modify: `app/layout.tsx` (add Google Fonts)

**Step 1: Create Next.js project**

Run:
```bash
cd /Users/garrett/projects/Travel/Portugal
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm
```

When prompted, accept defaults. If directory not empty, it will ask — say yes.

**Step 2: Configure static export**

In `next.config.ts`, set output to static:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

**Step 3: Add custom theme to Tailwind**

In `app/globals.css`, after the existing Tailwind imports, add custom CSS variables and utilities:

```css
@import "tailwindcss";

@theme {
  --color-cream: #FFF8F0;
  --color-cream-dark: #F5EDE3;
  --color-tile-blue: #1E5FA8;
  --color-sunset: #E8734A;
  --color-sunset-light: #F4A87A;
  --font-family-hand: "Caveat", cursive;
  --font-family-body: "Inter", sans-serif;
}
```

**Step 4: Add Google Fonts to layout**

In `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portugal & Beyond — April 2026",
  description: "Our trip to Portugal and beyond!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${caveat.variable} ${inter.variable} font-body bg-cream antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

**Step 5: Verify it runs**

Run: `npm run dev`
Expected: App starts on localhost:3000 with cream background.

**Step 6: Commit**

```bash
git init && git add -A && git commit -m "feat: scaffold Next.js project with Tailwind, custom theme, and Google Fonts"
```

---

### Task 2: Create trip data file

**Files:**
- Create: `src/data/trip.ts`

**Step 1: Create the data file**

```ts
export type Stop = {
  name: string;
  type: "restaurant" | "viewpoint" | "landmark" | "transport" | "activity";
  address?: string;
};

export type TripDay = {
  date: string;       // e.g. "April 11"
  weekday: string;    // e.g. "Friday"
  location: string;
  tagline: string;
  description: string;
  badge?: string;     // e.g. "Birthday!"
  image: string;      // path to image in /public/images/
  stops: Stop[];
};

export const tripDays: TripDay[] = [
  {
    date: "April 11",
    weekday: "Friday",
    location: "Paris",
    tagline: "And so it begins...",
    description: "Catching a flight to Paris at 1:45 PM. A quick overnight before heading south to Portugal.",
    image: "/images/paris.webp",
    stops: [
      { name: "Flight to Paris", type: "transport" },
    ],
  },
  {
    date: "April 12",
    weekday: "Saturday",
    location: "Paris to Lisbon",
    tagline: "Southbound",
    description: "A morning in Paris, then flying to Lisbon. Arriving around noon — the adventure officially starts.",
    image: "/images/lisbon-arrival.webp",
    stops: [
      { name: "Flight to Lisbon", type: "transport" },
    ],
  },
  {
    date: "April 13",
    weekday: "Sunday",
    location: "Lisbon",
    tagline: "First steps in Lisbon",
    description: "A relaxed day to settle in. Wander the cobblestone streets of the city center, soak up the atmosphere, and find a cozy spot for dinner.",
    image: "/images/lisbon-streets.webp",
    stops: [
      { name: "Lisbon city center", type: "landmark" },
      { name: "Dinner in the city", type: "restaurant" },
    ],
  },
  {
    date: "April 14",
    weekday: "Monday",
    location: "Cabo da Roca & Cascais",
    tagline: "Edge of the world",
    badge: "Tanya's Birthday!",
    description: "Starting with the dramatic cliffs of Cabo da Roca — the westernmost point of mainland Europe. Then a leisurely stop in the charming seaside town of Cascais for lunch. Evening: a birthday dinner with views of the Vasco da Gama Bridge, followed by Pink Street.",
    image: "/images/cabo-da-roca.webp",
    stops: [
      { name: "Cabo da Roca", type: "viewpoint", address: "Estrada do Cabo da Roca, 2705-001 Colares" },
      { name: "Cascais", type: "landmark", address: "Cascais, Portugal" },
      { name: "Fifty Seconds Experience", type: "restaurant", address: "Cais das Naus, Lisbon" },
      { name: "Pink Street", type: "activity", address: "Rua Nova do Carvalho, Lisbon" },
    ],
  },
  {
    date: "April 15",
    weekday: "Tuesday",
    location: "Lisbon",
    tagline: "The grand tour",
    description: "A walking tour through Lisbon's greatest hits — grand plazas, an iron elevator, a funicular ride, a ferry across the river to the Cristo Rei statue, and ending at a hilltop castle with panoramic views.",
    image: "/images/lisbon-tour.webp",
    stops: [
      { name: "Praca do Comercio", type: "landmark", address: "Praca do Comercio, Lisbon" },
      { name: "Arco da Rua Augusta", type: "landmark", address: "Rua Augusta, Lisbon" },
      { name: "Elevador de Santa Justa", type: "landmark", address: "Rua do Ouro, Lisbon" },
      { name: "Bica Funicular", type: "transport", address: "Rua de S. Paulo, Lisbon" },
      { name: "Cristo Rei", type: "landmark", address: "Alto do Pragal, Almada" },
      { name: "Porter Bistro", type: "restaurant", address: "Corpo Santo Hotel, Lisbon" },
      { name: "Santa Luzia Viewpoint", type: "viewpoint", address: "Largo Santa Luzia, Lisbon" },
      { name: "St. George's Castle", type: "landmark", address: "Castelo de Sao Jorge, Lisbon" },
    ],
  },
  {
    date: "April 16",
    weekday: "Wednesday",
    location: "Porto",
    tagline: "Port wine & bridges",
    description: "A full day in Porto — the Harry Potter bookstore, the iconic two-tiered bridge, port wine tasting in centuries-old cellars, and dinner in the dark at Blind Restaurant.",
    image: "/images/porto.webp",
    stops: [
      { name: "Livraria Lello", type: "landmark", address: "Rua das Carmelitas 144, Porto" },
      { name: "Rua das Flores", type: "landmark", address: "Rua das Flores, Porto" },
      { name: "Se Cathedral", type: "landmark", address: "Terreiro da Se, Porto" },
      { name: "Ribeira Square", type: "landmark", address: "Praca da Ribeira, Porto" },
      { name: "Ponte Luis I Bridge", type: "landmark", address: "Ponte Luis I, Porto" },
      { name: "Porto Calem", type: "activity", address: "Av. Diogo Leite 344, Vila Nova de Gaia" },
      { name: "Vila Nova de Gaia", type: "viewpoint", address: "Vila Nova de Gaia, Porto" },
      { name: "Blind Restaurant", type: "restaurant", address: "Rua Miguel Bombarda 598, Porto" },
    ],
  },
  {
    date: "April 17+",
    weekday: "",
    location: "Next Adventure",
    tagline: "To be continued...",
    description: "Leaving Portugal for the next chapter. Where to? Stay tuned...",
    image: "/images/next-adventure.webp",
    stops: [],
  },
];
```

**Step 2: Commit**

```bash
git add src/data/trip.ts && git commit -m "feat: add trip itinerary data file"
```

---

### Task 3: Generate images with nanobanana

**Files:**
- Create: `public/images/paris.webp`
- Create: `public/images/lisbon-arrival.webp`
- Create: `public/images/lisbon-streets.webp`
- Create: `public/images/cabo-da-roca.webp`
- Create: `public/images/lisbon-tour.webp`
- Create: `public/images/porto.webp`
- Create: `public/images/next-adventure.webp`

**Step 1: Create images directory**

Run: `mkdir -p /Users/garrett/projects/Travel/Portugal/public/images`

**Step 2: Generate each image using nanobanana MCP**

For each location, call `mcp__nanobanana__generate_image` with a watercolor-style prompt. Use this pattern:

- **paris.webp**: "Watercolor illustration of the Eiffel Tower at golden hour, warm tones, travel journal sketch style, loose brushstrokes"
- **lisbon-arrival.webp**: "Watercolor illustration of Lisbon's red rooftops and terracotta buildings from a hilltop, afternoon light, travel journal sketch style"
- **lisbon-streets.webp**: "Watercolor illustration of a charming cobblestone street in Lisbon with a yellow tram, warm evening light, travel journal sketch style"
- **cabo-da-roca.webp**: "Watercolor illustration of dramatic ocean cliffs at Cabo da Roca Portugal, crashing waves, lighthouse in distance, travel journal sketch style"
- **lisbon-tour.webp**: "Watercolor illustration of Elevador de Santa Justa iron elevator in Lisbon with city rooftops, blue sky, travel journal sketch style"
- **porto.webp**: "Watercolor illustration of Porto Portugal's colorful riverside buildings and Dom Luis I bridge, reflections in Douro river, travel journal sketch style"
- **next-adventure.webp**: "Watercolor illustration of a vintage compass on a weathered map with warm golden light, travel journal sketch style, sense of adventure"

Save each generated image to `public/images/<name>.webp`.

**Step 3: Commit**

```bash
git add public/images/ && git commit -m "feat: add watercolor illustrations for each trip day"
```

---

### Task 4: Build the Hero component

**Files:**
- Create: `src/components/Hero.tsx`

**Step 1: Create Hero component**

```tsx
export default function Hero() {
  return (
    <header className="relative px-6 pt-16 pb-12 text-center overflow-hidden">
      {/* Decorative watercolor blobs */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-tile-blue/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-10 right-0 w-32 h-32 bg-sunset/15 rounded-full blur-3xl translate-x-1/2" />
      <div className="absolute bottom-0 left-1/2 w-48 h-24 bg-sunset-light/10 rounded-full blur-3xl -translate-x-1/2" />

      <p className="font-hand text-sunset text-2xl mb-2">April 2026</p>
      <h1 className="font-hand text-5xl md:text-7xl text-tile-blue leading-tight mb-4">
        Portugal<br />& Beyond
      </h1>
      <p className="font-body text-sm text-tile-blue/70 tracking-widest uppercase">
        Garrett &middot; Tanya &middot; Alsu
      </p>

      {/* Decorative divider */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="h-px w-12 bg-sunset/40" />
        <span className="font-hand text-sunset text-lg">~</span>
        <div className="h-px w-12 bg-sunset/40" />
      </div>
    </header>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/Hero.tsx && git commit -m "feat: add Hero component"
```

---

### Task 5: Build the DayCard component

**Files:**
- Create: `src/components/DayCard.tsx`

**Step 1: Create DayCard component**

```tsx
import Image from "next/image";
import type { TripDay, Stop } from "@/data/trip";

function StopIcon({ type }: { type: Stop["type"] }) {
  switch (type) {
    case "restaurant":
      return <span title="Restaurant">&#127860;</span>;
    case "viewpoint":
      return <span title="Viewpoint">&#128065;</span>;
    case "transport":
      return <span title="Transport">&#128747;</span>;
    case "activity":
      return <span title="Activity">&#127881;</span>;
    default:
      return <span title="Landmark">&#128205;</span>;
  }
}

export default function DayCard({ day, index }: { day: TripDay; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <article className="relative px-4 mb-12 max-w-lg mx-auto">
      {/* Date tab */}
      <div
        className={`inline-block px-4 py-1 mb-3 bg-tile-blue text-cream font-hand text-xl rounded-sm shadow-md ${
          isEven ? "-rotate-1" : "rotate-1"
        }`}
      >
        {day.date} {day.weekday && `\u2014 ${day.weekday}`}
      </div>

      {/* Birthday badge */}
      {day.badge && (
        <span className="ml-3 inline-block px-3 py-1 bg-sunset text-white font-hand text-lg rounded-full -rotate-3 shadow">
          {day.badge}
        </span>
      )}

      {/* Location title */}
      <h2 className="font-hand text-3xl md:text-4xl text-tile-blue mt-2 mb-1">
        {day.location}
      </h2>
      <p className="font-hand text-sunset text-lg italic mb-4">{day.tagline}</p>

      {/* Polaroid photo */}
      <div
        className={`bg-white p-2 pb-8 shadow-lg mb-4 ${
          isEven ? "-rotate-2" : "rotate-2"
        }`}
      >
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={day.image}
            alt={day.location}
            fill
            className="object-cover"
          />
        </div>
        <p className="font-hand text-center text-tile-blue/60 text-sm mt-2">
          {day.location}
        </p>
      </div>

      {/* Description */}
      <p className="font-body text-sm text-gray-700 leading-relaxed mb-4">
        {day.description}
      </p>

      {/* Stops */}
      {day.stops.length > 0 && (
        <ul className="space-y-2">
          {day.stops.map((stop) => (
            <li key={stop.name} className="flex items-start gap-2">
              <span className="text-base mt-0.5 shrink-0">
                <StopIcon type={stop.type} />
              </span>
              <div>
                <span className="font-hand text-lg text-tile-blue">{stop.name}</span>
                {stop.address && (
                  <span className="block font-body text-xs text-gray-500">{stop.address}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/DayCard.tsx && git commit -m "feat: add DayCard component with polaroid photos and stop list"
```

---

### Task 6: Build the Footer component

**Files:**
- Create: `src/components/Footer.tsx`

**Step 1: Create Footer component**

```tsx
export default function Footer() {
  return (
    <footer className="px-6 py-16 text-center">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px w-12 bg-sunset/40" />
        <span className="font-hand text-sunset text-lg">~</span>
        <div className="h-px w-12 bg-sunset/40" />
      </div>
      <p className="font-hand text-4xl text-tile-blue -rotate-2">
        See you in Portugal!
      </p>
      <p className="font-body text-xs text-tile-blue/40 mt-6">April 2026</p>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/Footer.tsx && git commit -m "feat: add Footer component"
```

---

### Task 7: Assemble the page

**Files:**
- Modify: `app/page.tsx`

**Step 1: Wire up the page**

Replace the contents of `app/page.tsx`:

```tsx
import Hero from "@/components/Hero";
import DayCard from "@/components/DayCard";
import Footer from "@/components/Footer";
import { tripDays } from "@/data/trip";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Hero />
      <section className="py-8">
        {tripDays.map((day, i) => (
          <DayCard key={day.date} day={day} index={i} />
        ))}
      </section>
      <Footer />
    </main>
  );
}
```

**Step 2: Verify**

Run: `npm run build`
Expected: Static export succeeds, generates `out/` directory.

Run: `npx serve out`
Expected: Page renders with hero, all 7 day cards, and footer. Mobile layout looks correct.

**Step 3: Commit**

```bash
git add app/page.tsx && git commit -m "feat: assemble main page with Hero, DayCards, and Footer"
```

---

### Task 8: Deploy to Vercel

**Step 1: Create GitHub repo**

```bash
gh repo create portugal-trip --public --source=. --remote=origin
git push -u origin main
```

**Step 2: Deploy via Vercel CLI**

```bash
npx vercel --yes
```

Or: connect the GitHub repo at vercel.com/new for auto-deploys.

**Step 3: Verify live URL**

Open the Vercel URL. Confirm mobile layout looks correct on phone.

**Step 4: Share with friends!**

---

## Task Summary

| # | Task | Description |
|---|------|-------------|
| 1 | Scaffold | Next.js + Tailwind + fonts + theme |
| 2 | Data | Trip itinerary TypeScript data file |
| 3 | Images | Generate 7 watercolor illustrations via nanobanana |
| 4 | Hero | Hero section component |
| 5 | DayCard | Day card component with polaroid + stops |
| 6 | Footer | Footer component |
| 7 | Page | Assemble everything on the main page |
| 8 | Deploy | GitHub repo + Vercel deployment |
