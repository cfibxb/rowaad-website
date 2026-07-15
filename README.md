# ROWAAD Studio Website

A production-ready bilingual (FR/EN) website for ROWAAD, a web development studio in Tunisia.

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + Framer Motion
- Supabase (Postgres, Auth, Storage)
- shadcn/ui for admin components
- Embla Carousel for project galleries

## Getting Started

1. Create a Supabase project and run the schema from `supabase/schema.sql`.
2. Set environment variables – copy `.env.example` to `.env.local` and fill in your Supabase URL and anon key.
3. Create the admin user – in Supabase Dashboard → Authentication → Users → Add user (email/password).
4. Install dependencies: `npm install`
5. Run development server: `npm run dev`
6. Deploy to Netlify (or Vercel) – connect your repository and set the environment variables.

## Admin Dashboard
- Access at `/admin/login`
- Manage site settings, projects, pricing packages, and team members.

## Internationalization
- Switch language with the toggle in the navbar.
- Static strings are in `lib/dictionaries/`, dynamic content uses `_en` / `_fr` columns.

## Customization
- The WhatsApp number is set in Admin → Site Settings.
