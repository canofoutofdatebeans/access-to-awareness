# Access to Awareness — Sophie McLean's website

This is the source for [sophiemclean.com](https://canofoutofdatebeans.github.io/access-to-awareness/), a multi-page site for Sophie McLean, a spiritual teacher based in Menorca. Kevin maintains this site for Sophie (a friend) — it is not Kevin's own business.

If you're picking up work on this site (including via Claude), read this first.

## What the site is about

Sophie teaches "Access to Awareness™" — one-to-one and group work on ego, awareness, and consciousness. The tone is quiet-luxury minimalism: warm but no-nonsense, wise-guide voice, never salesy. Avoid words like "unlock," "transform your life today," "game-changer," or promising to fix/heal anyone.

**Protected phrases — use exactly as written, don't rephrase:**
"Access to Awareness™", "awareness is the ultimate power", "disentanglement of the ego", "Soul-expressed", "a space of total acceptance", "take the work seriously, not significantly", "The world suffers from not knowing it is loved."

Students are called **students**, never "clients" or "seekers."

## The four offers (in priority order)

1. **The Master Course** — 10 one-to-one sessions, the main offer (book a call)
2. **Awakening All Sleepwalkers** — a paid, sliding-scale course (€290–500), 10 Saturdays, opens every few months. **This is NOT free** — don't reintroduce "free course" wording for it.
3. **Mentoring** — ongoing one-to-one, usually after the Master Course
4. **The Self-Guided Course** — self-paced

The free thing on the site is the **weekly Live Call** (live.html) — a separate, smaller offer from the paid course above. Don't confuse the two.

Also on the site: her two books (sold on Amazon), a newsletter/Substack signup, and light donation support.

## A few hard rules

- **Photos of Sophie:** only use the brown-hair portrait. Never use white/grey-hair photos of her — that portrait is retired.
- English is Sophie's second language — the copy has been rewritten for clarity, which is intentional and fine to continue doing.
- The site is bilingual (EN/FR). French text lives in `translations.js`, keyed by the exact English string it replaces. If you add or change English text that should also appear in French, add a matching entry there.
- Framing is **teacher, not business** — avoid corporate/company language.

## How to make changes

1. Just describe what you want changed, in plain English (e.g. "update the homepage headline" or "fix the phone number on the contact page").
2. Claude will edit the relevant file(s) and can show you the change before saving.
3. When you're happy, ask Claude to commit and push — that publishes it. The live site (GitHub Pages) picks up changes automatically within a minute or two of a push to `main`.

## Files

Plain multi-page site, no build step — just HTML, one shared `styles.css`, and two shared JS files (`app.js` for behavior/animation, `translations.js` for French text). Pages: `index.html`, `about.html`, `courses.html`, `live.html`, `interviews.html`, `books.html`, `worksheets.html`, `contact.html`, `donate.html`.

## Known open items

- Some images still reference Sophie's old Wix site; booking, donate, and worksheet links also still point to Wix during the transition off it.
- Payments are meant to move to Stripe Payment Links (per-offer), and community discussion to Substack Chat — both need Sophie to set those up on her end first.
- Amazon book links are currently search URLs, not the exact product pages.
