# ?? Quick Start Guide

## ? Your Next.js Wedding Invitation is Ready!

I've successfully converted your wedding invitation to Next.js. Here's what to do next:

---

## 1?? Test Locally (5 seconds)

```bash
cd /Volumes/data/.jinx/wedding
npm run dev
```

Open **http://localhost:3000** in your browser.

You should see your beautiful flipbook! ???

---

## 2?? Build for Production

```bash
npm run build
```

This creates an `out/` folder with your static site.

---

## 3?? Deploy to Cloudflare Pages

### Option A: Push to GitHub (Easiest)

```bash
git add .
git commit -m "Convert to Next.js wedding invitation"
git push
```

Then in **Cloudflare Dashboard**:
1. Go to **Pages** ? Your project ? **Settings** ? **Builds & deployments**
2. Set these values:
   ```
   Framework preset:        Next.js (Static HTML Export)
   Build command:           npm run build
   Build output directory:  out
   ```
3. **Save** and **Retry deployment**

### Option B: Direct Deploy

```bash
npm run build
npx wrangler pages deploy out --project-name=wedding-invitation
```

---

## ? What You Got

? **All your original features:**
- Realistic 3D flipbook animation
- Page turn sound effects
- All your wedding images and content
- Responsive design
- Keyboard navigation

? **Plus Next.js benefits:**
- TypeScript for type safety
- Easy to add new features
- Component-based architecture
- Fast builds and deploys
- Better developer experience

---

## ?? Next Features You Can Add

### 1. Countdown Timer

Shows time until the wedding. I can add this in 2 minutes!

### 2. Google Maps

Interactive map showing venue location.

### 3. RSVP Form

Let guests RSVP directly from the site.

### 4. Photo Gallery

Add engagement photos or family pictures.

### 5. Music Player

Background music for the invitation.

---

## ?? Where Everything Is

```
app/page.tsx              ? Main page
components/FlipBook.tsx   ? Flipbook component
lib/weddingData.ts        ? All your wedding content (easy to edit!)
public/assets/            ? Images and fonts
```

---

## ?? Common Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Check for errors
```

---

## ?? Pro Tips

1. **Edit content:** Change dates, text, etc. in `lib/weddingData.ts`
2. **Change colors:** Update Tailwind classes in components
3. **Add images:** Put them in `public/assets/images/`
4. **Test on mobile:** Open localhost:3000 on your phone (same network)

---

## ?? Troubleshooting

### "Module not found" error?
```bash
npm install
```

### Images not showing?
- Make sure they're in `public/assets/images/`
- Use `/assets/images/filename.png` (with leading slash)

### Build fails?
```bash
rm -rf .next out
npm run build
```

---

## ?? Ready to Go!

Your Next.js wedding invitation is **production-ready** and **easy to deploy**!

**Next steps:**
1. Run `npm run dev` to see it locally
2. Run `npm run build` to create production build
3. Deploy to Cloudflare Pages
4. Let me know what features you want to add! ??

---

**Questions? Just ask!** I'm here to help add countdown timers, maps, RSVP forms, or anything else you need! ???
