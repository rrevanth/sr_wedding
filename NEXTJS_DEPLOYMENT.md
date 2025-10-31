# ?? Next.js Wedding Invitation - Deployment Guide

## ? Your Next.js App is Ready!

I've successfully converted your wedding invitation to **Next.js** with:
- ? TypeScript
- ? Tailwind CSS
- ? Static export (perfect for Cloudflare Pages)
- ? All your flipbook animations
- ? Page turn sound effects
- ? Responsive design
- ? Ready for new features (countdown, maps, etc.)

---

## ?? Test Locally

```bash
cd /Volumes/data/.jinx/wedding
npm run dev
```

Open http://localhost:3000 in your browser.

---

## ??? Build for Production

```bash
npm run build
```

This creates an `out/` folder with your static site.

---

## ?? Deploy to Cloudflare Pages

### Method 1: GitHub (Recommended)

1. **Commit and push your changes:**
```bash
git add .
git commit -m "Convert to Next.js"
git push
```

2. **Go to Cloudflare Dashboard:**
   - Pages ? Your project ? Settings ? Builds & deployments

3. **Update build settings:**
```
Framework preset:        Next.js (Static HTML Export)
Build command:           npm run build
Build output directory:  out
Root directory:          (leave empty)
Node version:            18 or 20
Environment variables:   (none needed)
```

4. **Save and redeploy!**

---

### Method 2: Direct Deploy with Wrangler

```bash
# Build first
npm run build

# Deploy
npx wrangler pages deploy out --project-name=wedding-invitation
```

---

## ?? Project Structure

```
/Volumes/data/.jinx/wedding/
??? app/
?   ??? layout.tsx          # Root layout
?   ??? page.tsx            # Home page
?   ??? globals.css         # Global styles
??? components/
?   ??? FlipBook.tsx        # Main flipbook component
?   ??? LoadingScreen.tsx   # Loading animation
??? lib/
?   ??? weddingData.ts      # All wedding content
??? public/
?   ??? assets/             # Images and fonts
??? next.config.ts          # Next.js config (static export)
??? package.json
??? tsconfig.json
```

---

## ?? Adding New Features

### 1. Countdown Timer

Create `components/Countdown.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="countdown flex gap-4 justify-center">
      <div className="text-center">
        <div className="text-4xl font-bold">{timeLeft.days}</div>
        <div className="text-sm">Days</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold">{timeLeft.hours}</div>
        <div className="text-sm">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold">{timeLeft.minutes}</div>
        <div className="text-sm">Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold">{timeLeft.seconds}</div>
        <div className="text-sm">Seconds</div>
      </div>
    </div>
  );
}
```

Add to `app/page.tsx`:
```tsx
import Countdown from '@/components/Countdown';

// In your component:
<Countdown targetDate="2025-11-22T11:00:00" />
```

---

### 2. Google Maps

Install package:
```bash
npm install @react-google-maps/api
```

Create `components/VenueMap.tsx`:

```tsx
'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function VenueMap() {
  const center = {
    lat: 17.7231, // Waltair Club coordinates
    lng: 83.3212,
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
```

---

### 3. RSVP Form

Create `app/rsvp/page.tsx`:

```tsx
'use client';

import { useState } from 'react';

export default function RSVPPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: 1,
    attending: 'yes',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Send to your backend or Google Forms
    console.log('RSVP:', formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-serif text-center mb-8">RSVP</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Number of Guests</label>
          <input
            type="number"
            min="1"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
            className="w-full p-3 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Will you attend?</label>
          <select
            value={formData.attending}
            onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
            className="w-full p-3 border rounded"
          >
            <option value="yes">Yes, I'll be there!</option>
            <option value="no">Sorry, can't make it</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-[#8B7355] text-white py-3 rounded-lg font-semibold hover:bg-[#A0522D] transition"
        >
          Submit RSVP
        </button>
      </form>
    </div>
  );
}
```

---

## ?? Troubleshooting

### Images not loading?
- Make sure all images are in `public/assets/images/`
- Use `/assets/images/filename.png` (with leading slash)

### Build fails?
```bash
# Clear cache and rebuild
rm -rf .next out node_modules
npm install
npm run build
```

### Cloudflare deployment fails?
- Make sure `next.config.ts` has `output: "export"`
- Build output directory must be `out`
- No server-side features (API routes, server components with data fetching)

---

## ?? Next Steps

1. **Test locally:** `npm run dev`
2. **Build:** `npm run build`
3. **Deploy to Cloudflare Pages**
4. **Add countdown timer** (see above)
5. **Add Google Maps** (see above)
6. **Add RSVP form** (see above)

---

## ?? Tips

- All wedding content is in `lib/weddingData.ts` - easy to update!
- Styles are in Tailwind CSS - easy to customize!
- Add new pages in `app/` folder
- Add new components in `components/` folder
- TypeScript will help catch errors!

---

## ?? Need Help?

Just ask! I can help you:
- Add countdown timer
- Integrate Google Maps
- Create RSVP form
- Add photo gallery
- Customize colors/fonts
- Add animations
- Anything else!

---

**Your Next.js wedding invitation is ready to deploy!** ?????
