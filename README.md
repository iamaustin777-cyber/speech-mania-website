# Speech Mania — Find Your Voice

Website for **Speech Mania**, a youth-led public speaking organization empowering students across Thailand and Southeast Asia through competitions, workshops and national team management.

The design concept is *"you just walked onto a stage"*: a dark auditorium, a warm spotlight, sound-wave motifs, a scoreboard for the impact numbers and a concert-ticket feature for TIPSC 2025.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion**.

## Run it locally

You need Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To check a production build: `npm run build` then `npm start`.

## Deploy on Vercel

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com), click **Add New → Project** and import the GitHub repo.
3. Keep the defaults (framework: Next.js) and click **Deploy**.

Every push to `main` redeploys automatically.

## Where things live

| What | Where |
| --- | --- |
| All text content (single source of truth) | `src/lib/content.ts` |
| Pages | `src/app/*/page.tsx` (`/`, `/about`, `/programs`, `/impact`, `/get-involved`, `/contact`) |
| Shared components (Spotlight, Waveform, Scoreboard, Ticket, Navbar…) | `src/components/` |
| Colors, fonts, animations | `src/app/globals.css` |
| Photos and logos | `public/images/` |

### Home hero photo

The home hero shows Martin Luther King Jr. at the March on Washington (1963), photographed by Rowland Scherman for the US government and in the public domain ([Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Martin_Luther_King_-_March_on_Washington.jpg)). The page credits it under the results row. It is relit live by a WebGL shader in `src/components/home/StageLight.tsx`; to use another photo, change `images.hero` in `src/lib/content.ts` (set `focus` to where the face is).

### Optional hero video

Put a muted, looping `hero.mp4` in `public/` and rebuild. The home hero switches from the still photo to the video automatically.

## Still to do (search the code for `TODO`)

- Connect the registration and contact forms to a backend or email service. They currently validate and show a success message only.
- Add the real PDFs (sponsorship package, outreach slides, sample ballots) and replace the `#` links.
- Add the real social media links in the footer.
- Confirm the contact details, the "5 Partner Organizations" number, and the spelling of "Chantaprapab" vs "Chantaraprapab".
- Add Privacy Policy and Terms of Service pages.
