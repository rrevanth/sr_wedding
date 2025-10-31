# Deploy to Cloudflare Pages ??

## Quick Start (Recommended Method)

### Option 1: Deploy via GitHub (Easiest)

#### Step 1: Push to GitHub

```bash
# Navigate to your project
cd /Volumes/data/.jinx/wedding

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Wedding invitation flipbook with StPageFlip"

# Create a new repository on GitHub
# Then add remote and push:
git remote add origin https://github.com/YOUR_USERNAME/wedding-invitation.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy to Cloudflare Pages

1. **Go to:** https://dash.cloudflare.com/
2. **Sign in** or create a free account
3. **Navigate to:** Pages ? Create a project
4. **Select:** Connect to Git
5. **Choose:** Your GitHub repository
6. **Configure:**
   - **Project name**: `wedding-invitation` (or your choice)
   - **Production branch**: `main`
   - **Build command**: Leave empty (it's static HTML)
   - **Build output directory**: `/` (root directory)
7. **Click:** Save and Deploy

**Done!** Your site will be live at: `https://wedding-invitation.pages.dev`

---

### Option 2: Direct Upload (No GitHub)

#### Step 1: Prepare Files

```bash
cd /Volumes/data/.jinx/wedding

# Create a zip of your project (optional, but cleaner)
# Or just have your folder ready
```

#### Step 2: Deploy via Wrangler CLI

```bash
# Install Wrangler (Cloudflare CLI)
npm install -g wrangler

# Or use npx (no install needed)
npx wrangler login

# Deploy
npx wrangler pages deploy . --project-name=wedding-invitation
```

#### Step 3: Follow Prompts

- Choose project name
- Confirm deployment
- Get your live URL!

---

### Option 3: Direct Upload via Dashboard

1. **Go to:** https://dash.cloudflare.com/
2. **Navigate to:** Pages ? Create a project
3. **Select:** Upload assets
4. **Drag and drop** your entire `wedding` folder
   - Or select all files (excluding .git, node_modules)
5. **Click:** Deploy site

**Your site goes live immediately!**

---

## ?? Files to Deploy

### ? Include These:
```
wedding/
??? index.html
??? css/
?   ??? styles.css
?   ??? flipbook.css
??? js/
?   ??? flipbook.js
?   ??? main.js
??? assets/
?   ??? images/
?   ?   ??? intro.png
?   ?   ??? intro2.png
?   ?   ??? haldi.png
?   ?   ??? wedding.png
?   ?   ??? vratham.png
?   ?   ??? dinner.png
?   ?   ??? end.png
?   ?   ??? font.woff2
?   ??? texture.webp
??? README.md (optional)
```

### ? Don't Include:
```
- .git/ (handled automatically)
- *.md files (optional documentation)
- .DS_Store
- node_modules/
```

---

## ?? Step-by-Step: GitHub Method (Detailed)

### 1. Create GitHub Repository

**On GitHub.com:**
1. Click "New repository" (+ icon, top right)
2. Name: `wedding-invitation`
3. Description: "Interactive flipbook wedding invitation"
4. Set to **Private** (recommended for personal invitations)
5. **Don't** initialize with README, .gitignore, or license
6. Click "Create repository"

### 2. Push Your Code

```bash
# In your project directory
cd /Volumes/data/.jinx/wedding

# Check git status
git status

# Add all files
git add .

# Commit
git commit -m "Add wedding invitation flipbook with StPageFlip

- Realistic page flip animations
- 7 event spreads with poetry and details
- Page turn sound effects
- Fully responsive design
- Start Over button on last page"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/wedding-invitation.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Connect to Cloudflare Pages

1. **Visit:** https://dash.cloudflare.com/
2. **Login** or sign up (free account)
3. **Click:** "Workers & Pages" in left sidebar
4. **Click:** "Create application"
5. **Click:** "Pages" tab
6. **Click:** "Connect to Git"
7. **Authorize** Cloudflare to access your GitHub
8. **Select** your `wedding-invitation` repository
9. **Configure:**
   ```
   Project name: wedding-invitation
   Production branch: main
   Build command: (leave empty)
   Build output directory: /
   ```
10. **Click:** "Save and Deploy"

### 4. Wait for Deployment

- Usually takes 30-60 seconds
- You'll see build logs
- Once complete, you get a URL!

### 5. Get Your URL

Your site will be at:
```
https://wedding-invitation.pages.dev
```

Or a custom domain if you add one!

---

## ?? Custom Domain (Optional)

### Add Your Own Domain:

1. **In Cloudflare Pages dashboard:**
   - Go to your project
   - Click "Custom domains"
   - Click "Set up a custom domain"

2. **Enter your domain:**
   - Example: `wedding.yourdomain.com`
   - Or: `yourdomain.com`

3. **Update DNS:**
   - Cloudflare will provide CNAME record
   - Add it to your domain's DNS settings

4. **Wait for SSL:**
   - Free SSL certificate issued automatically
   - Usually takes 5-10 minutes

**Result:** Your site at `https://wedding.yourdomain.com` ??

---

## ?? Updating Your Site

### After Deployment:

Whenever you want to update:

```bash
# Make your changes
# Then commit and push:

git add .
git commit -m "Update wedding details"
git push

# Cloudflare automatically rebuilds and deploys!
```

**Automatic deployment** on every push to main branch.

---

## ?? Build Settings

For this static HTML site, you don't need any build settings:

```yaml
Build command: (empty)
Build output directory: /
Root directory: (empty)
Environment variables: (none needed)
```

Cloudflare serves your HTML/CSS/JS directly!

---

## ?? Free Tier Limits

Cloudflare Pages Free Plan includes:
- ? **Unlimited** sites
- ? **Unlimited** bandwidth
- ? **Unlimited** requests
- ? **500 builds/month**
- ? **1 build at a time**
- ? Free SSL certificate
- ? Global CDN
- ? DDoS protection

**Perfect for wedding invitations!** You'll never hit the limits.

---

## ?? Privacy Settings

### Make Repository Private:

**On GitHub:**
1. Go to repository settings
2. Scroll to "Danger Zone"
3. Click "Change visibility"
4. Select "Make private"

**Note:** Cloudflare can still access private repos!

### Password Protect (Optional):

Cloudflare Pages doesn't have built-in password protection on free tier, but you can:
- Use Cloudflare Access (paid feature)
- Add simple JavaScript password check (not secure)
- Keep URL private (only share with guests)

---

## ?? Troubleshooting

### Build Fails:

**Check:**
- All files committed to git
- No missing dependencies
- Build command is empty (for static sites)

### Site Doesn't Load:

**Check:**
- Deployment finished successfully
- URL is correct
- No 404 errors in browser console
- Images paths are relative (not absolute)

### Images Don't Load:

**Check:**
- Images committed to git
- Paths use forward slashes: `assets/images/intro.png`
- No spaces in filenames
- Images not too large (< 10MB each recommended)

---

## ?? Quick Commands Summary

```bash
# 1. Commit your code
cd /Volumes/data/.jinx/wedding
git add .
git commit -m "Wedding invitation ready for deployment"

# 2. Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/wedding-invitation.git
git push -u origin main

# 3. Deploy to Cloudflare (automatic after connecting)
# Just push changes and Cloudflare auto-deploys!
```

---

## ?? Alternative: Wrangler CLI Method

### Install & Deploy:

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy directly
cd /Volumes/data/.jinx/wedding
wrangler pages deploy . --project-name=wedding-invitation

# Follow prompts and get your URL!
```

---

## ?? Sharing with Guests

Once deployed:

1. **Get your URL:**
   ```
   https://wedding-invitation.pages.dev
   ```

2. **Share via:**
   - WhatsApp
   - Email
   - SMS
   - QR code (generate at qr-code-generator.com)
   - Social media

3. **Test on mobile** before sharing!

---

## ?? Benefits of Cloudflare Pages

- ? **Free** - No cost
- ? **Fast** - Global CDN
- ? **Automatic SSL** - HTTPS by default
- ? **Auto-deploy** - Push to git, auto updates
- ? **99.9% uptime** - Enterprise reliability
- ? **Analytics** - See visitor stats
- ? **Unlimited bandwidth** - No limits
- ? **Custom domains** - Free

Perfect for wedding invitations!

---

## ?? Ready to Deploy?

**Choose your method:**

1. **GitHub + Cloudflare** (Recommended)
   - Best for version control
   - Easy updates
   - Professional workflow

2. **Direct Upload**
   - Fastest to get started
   - No git knowledge needed
   - Update by re-uploading

3. **Wrangler CLI**
   - Command line deployment
   - Good for developers
   - Quick updates

Pick the one you're comfortable with and your wedding invitation will be live in minutes! ??

---

## ?? Need Help?

If you get stuck:
1. Check Cloudflare Pages docs: https://developers.cloudflare.com/pages/
2. Share any error messages
3. Check browser console for issues

Your beautiful flipbook wedding invitation will be live soon! ???
