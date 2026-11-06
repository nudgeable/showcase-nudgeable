# File structure

```text
nudgeable-vercel-final/
├── app/
│   ├── ai-role-play/page.tsx       # AI Coach
│   ├── api/youtube/route.ts        # Server-side playlist integration
│   ├── insights/page.tsx           # Shorts + workflow video library
│   ├── nudgeengine/page.tsx        # Actions Engine
│   ├── globals.css
│   ├── icon.png
│   ├── layout.tsx
│   ├── manifest.ts
│   ├── not-found.tsx
│   ├── page.tsx                    # Homepage
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── Analytics.tsx
│   ├── ButtonLink.tsx
│   ├── CTA.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Icon.tsx
│   ├── InsightsVideoLibrary.tsx
│   ├── LogoStrip.tsx
│   ├── PhotoPlaceholder.tsx
│   ├── SectionHeader.tsx
│   ├── TestimonialGrid.tsx
│   ├── WorkflowVideoGrid.tsx
│   ├── YouTubeGrid.tsx
│   └── data.ts
├── public/
│   ├── assets/                     # Product and impact visuals
│   ├── brand/                      # Logo and founder portrait
│   ├── fonts/README.md
│   ├── insights/                   # Fallback workflow thumbnails
│   └── shorts/                     # Fallback Shorts thumbnails
├── .env.example
├── .gitignore
├── .nvmrc
├── next.config.mjs
├── package.json
├── README.md
└── tsconfig.json
```

## Exact public URLs

- `https://www.nudgeable.ai/`
- `https://www.nudgeable.ai/ai-role-play`
- `https://www.nudgeable.ai/nudgeengine`
- `https://www.nudgeable.ai/insights`

The Practice Lab button opens `https://work.nudgeable.app/` directly.

## Site design (November 2026)

- `styles/design/*.css`: one stylesheet bundle per page type, in the design's original rule order. Do not reorder rules.
- `styles/design/extras.css`: article, legal, Role Play and newsletter styles, which the design has no reference for.
- `components/design/`: shared shell, header and footer, plus page content in `content/`.
- `lib/design/`: page behaviour, run once after hydration by `DesignScripts`.
- `lib/siteLinks.ts`: Learn, Academy and AI for Work URLs. Set `NEXT_PUBLIC_LEARN_URL` for the Learn domain.
- `public/assets/landing-theme.css`: loaded only by the AI Academy and AI for Work landing pages.
- `/analytics` and `/insights/blogs/write` keep `app/globals.css` through their own layouts.

Links between pages must be plain `<a>` tags, not `next/link`. Each page type has its own stylesheet, and a client-side transition would carry one page's CSS onto the next.

## Live explainers

- `lib/learnCatalog.ts` reads explainers from the Nudgeable Learn database, a separate Supabase project. Pages refresh every 60 seconds.
- Set `LEARN_SUPABASE_URL` and `LEARN_SUPABASE_PUBLISHABLE_KEY` in Vercel. Use the publishable key, never the service role key. Without them the explainer sections show a link to Learn.
- `components/design/explainers/` holds the cards, hover preview, topic planner and shared picks.
- Picks reach Learn in the link `/plan/new?picks=<ids>`, because browser storage isn't shared between the two domains. Learn reads them in `src/app/plan/new/import-picks.tsx`.
