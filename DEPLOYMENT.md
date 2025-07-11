# 🚀 Portfolio Deployment Guide

## Arun K H - Full Stack Portfolio

This guide will help you deploy your portfolio to various hosting platforms.

## 📋 Prerequisites

1. **Install Git**: Download from [git-scm.com](https://git-scm.com/)
2. **Create accounts on hosting platforms**:
   - [Vercel](https://vercel.com/) (Recommended)
   - [Netlify](https://netlify.com/)
   - [GitHub](https://github.com/)

## 🔧 Deployment Steps

### Option 1: Vercel (Recommended - Full Stack)

1. **Install Git and create GitHub repository:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Portfolio ready for deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**

   - Go to [vercel.com](https://vercel.com/) and sign up with GitHub
   - Click "New Project"
   - Select your portfolio repository
   - Configure:
     - Framework Preset: `Vite`
     - Root Directory: `./`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click "Deploy"

3. **Environment Variables in Vercel:**
   - Go to Project Settings > Environment Variables
   - Add: `VITE_API_URL` = `https://your-domain.vercel.app/api`

### Option 2: Netlify (Frontend Only)

1. **Build for static deployment:**

   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com/)
   - Drag and drop the `dist` folder
   - Or connect GitHub repository

### Option 3: Railway (Full Stack Alternative)

1. **Deploy to Railway:**
   - Go to [railway.app](https://railway.app/)
   - Connect GitHub repository
   - Add environment variables

## 📁 Project Structure

```
portfolio/
├── frontend (React + Vite)
├── backend/ (Node.js + Express)
├── public/assets/ (Resume, images)
├── vercel.json (Deployment config)
└── .env (Environment variables)
```

## 🔄 Environment Variables

### Development (.env)

```
VITE_API_URL=http://localhost:3001/api
```

### Production (Set in hosting platform)

```
VITE_API_URL=https://your-domain.vercel.app/api
```

## 🌐 Custom Domain (Optional)

1. **Purchase domain** from providers like:

   - [Namecheap](https://namecheap.com/)
   - [GoDaddy](https://godaddy.com/)
   - [Cloudflare](https://cloudflare.com/)

2. **Configure in Vercel:**
   - Project Settings > Domains
   - Add your custom domain
   - Update DNS records as instructed

## ✅ Features Included

- ✅ **Full-Stack Application** (React + Node.js)
- ✅ **Responsive Design** (Mobile-friendly)
- ✅ **Dynamic Content** (Projects, Achievements, Profile)
- ✅ **Resume Download** (PDF)
- ✅ **Contact Form** Ready
- ✅ **SEO Optimized**
- ✅ **Production Ready**

## 🛠️ Post-Deployment Checklist

1. **Test all functionality:**

   - [ ] Home page loads correctly
   - [ ] Projects display properly
   - [ ] Achievements show up
   - [ ] Resume downloads
   - [ ] Contact form works
   - [ ] All images load

2. **Update social links in profile.js:**

   - [ ] GitHub URL
   - [ ] LinkedIn URL
   - [ ] Twitter URL (optional)
   - [ ] Portfolio URL (your new domain)

3. **SEO Optimization:**
   - [ ] Update meta tags
   - [ ] Add favicon
   - [ ] Submit to Google Search Console

## 💡 Support

If you encounter any issues:

1. Check the deployment logs in your hosting platform
2. Ensure all environment variables are set correctly
3. Verify that the build completes successfully locally

## 🎉 Your Portfolio is Ready!

Your professional portfolio showcasing:

- ✨ SIH 2023 Finalist achievement
- 🏆 Multiple competition wins
- 📚 NPTEL certifications
- 💻 5 impressive projects
- 📄 Downloadable resume

**Good luck with your deployment!** 🚀
