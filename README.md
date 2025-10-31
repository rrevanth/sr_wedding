# ?? Wedding Invitation - Next.js

A beautiful, interactive wedding invitation built with Next.js, featuring a realistic flipbook animation powered by StPageFlip.

## ? Features

- ?? Realistic 3D page flip animations
- ?? Page turn sound effects
- ?? Fully responsive (mobile, tablet, desktop)
- ?? Keyboard navigation (arrow keys, Home, End)
- ?? Beautiful custom font and textures
- ?? Static export for easy deployment
- ? Built with Next.js 16 + TypeScript + Tailwind CSS

## ?? Quick Start

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

This creates an `out/` folder with your static site.

## ?? Project Structure

```
??? app/
?   ??? layout.tsx          # Root layout with metadata
?   ??? page.tsx            # Home page
?   ??? globals.css         # Global styles
??? components/
?   ??? FlipBook.tsx        # Main flipbook component with StPageFlip
?   ??? LoadingScreen.tsx   # Loading animation
??? lib/
?   ??? weddingData.ts      # All wedding content and data
??? public/
?   ??? assets/             # Images, fonts, and textures
??? next.config.ts          # Next.js configuration (static export)
??? package.json
```

## ?? Deployment

### Cloudflare Pages (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Wedding invitation"
git push
```

2. **Connect to Cloudflare Pages:**
   - Go to Cloudflare Dashboard ? Pages
   - Connect your GitHub repository
   - Use these settings:
     - Framework: Next.js (Static HTML Export)
     - Build command: `npm run build`
     - Build output directory: `out`
     - Node version: 18 or 20

3. **Deploy!** ??

### Alternative: Direct Deploy

```bash
npm run build
npx wrangler pages deploy out --project-name=wedding-invitation
```

## ?? Customization

### Update Wedding Content

Edit `lib/weddingData.ts` to change:
- Event dates and times
- Venue information
- Poetry/verses
- Images

### Change Colors

Update Tailwind classes in components or modify `tailwind.config.ts`.

### Add New Features

See `NEXTJS_DEPLOYMENT.md` for examples of:
- Countdown timer
- Google Maps integration
- RSVP form
- Photo gallery

## ?? Navigation

- **Mouse/Touch:** Click/tap on page corners or swipe
- **Keyboard:**
  - `?` or `Space`: Next page
  - `?`: Previous page
  - `Home`: First page
  - `End`: Last page
- **Buttons:** Use navigation arrows and page indicators

## ?? Dependencies

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **StPageFlip** - Page flip animations (loaded via CDN)

## ?? Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server (not needed for static export)
npm run lint     # Run ESLint
```

## ?? License

Private project for wedding invitation.

## ?? Support

For questions or customizations, refer to `NEXTJS_DEPLOYMENT.md`.

---

**Made with ?? for a special celebration** ???
