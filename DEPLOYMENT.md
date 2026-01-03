# Deployment Guide

This guide will help you deploy your Phone Seller application to GitHub Pages and set up the backend.

## Quick Start Checklist

- [ ] Update `homepage` in `package.json` with your GitHub username
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Enable GitHub Pages in repository settings
- [ ] Deploy backend to a hosting service (Render, Railway, etc.)
- [ ] Set `REACT_APP_API_URL` as GitHub secret
- [ ] Wait for GitHub Actions to deploy

## Step-by-Step Instructions

### 1. Prepare Your Code

1. **Update package.json homepage**:
   - Open `package.json`
   - ✅ Your username (HusseinIssa1) is already configured
   - Example: `"homepage": "https://alika.github.io/csci426-project1"`

2. **Verify your files are ready**:
   - ✅ `.github/workflows/deploy.yml` exists
   - ✅ `README.md` exists
   - ✅ `src/services/api.js` uses environment variables

### 2. Initialize Git Repository

If you haven't already initialized git:

```bash
git init
git add .
git commit -m "Initial commit - ready for deployment"
```

### 3. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `csci426-project1` (or your preferred name)
3. Description: "Phone Seller - React E-commerce Application"
4. Choose **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license (you already have these)
6. Click **Create repository**

### 4. Push to GitHub

```bash
git branch -M main
git remote add origin https://github.com/HusseinIssa1/csci426-project1.git
git push -u origin main
```

Your username (HusseinIssa1) is already configured.

### 5. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 6. Deploy Backend (Required)

GitHub Pages only hosts static files. You need to deploy your backend separately.

#### Option A: Render (Recommended - Free Tier)

1. Go to https://render.com and sign up
2. Click **New** → **Web Service**
3. Connect your GitHub account and select your repository
4. Configure:
   - **Name**: `phone-seller-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node backend/server.js`
   - **Plan**: Free
5. Add Environment Variables:
   ```
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=phone_store
   JWT_SECRET=your-secret-key
   PORT=10000
   ```
6. Click **Create Web Service**
7. Wait for deployment (5-10 minutes)
8. Copy your service URL (e.g., `https://phone-seller-backend.onrender.com`)

#### Option B: Railway

1. Go to https://railway.app and sign up
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your repository
4. Add environment variables (same as Render)
5. Deploy and copy the URL

### 7. Set Up Database

For production, you need a cloud database:

#### Option A: Render PostgreSQL (Free)

1. In Render dashboard, click **New** → **PostgreSQL**
2. Create database
3. Copy connection string
4. Update backend to use PostgreSQL (or use MySQL)

#### Option B: PlanetScale (MySQL - Free)

1. Go to https://planetscale.com
2. Create account and database
3. Get connection credentials
4. Update environment variables in your backend hosting

#### Option C: Railway Database

1. In Railway project, click **New** → **Database** → **MySQL**
2. Railway automatically provides connection variables

### 8. Configure Frontend API URL

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `REACT_APP_API_URL`
5. Value: Your backend URL + `/api` (e.g., `https://phone-seller-backend.onrender.com/api`)
6. Click **Add secret**

### 9. Trigger Deployment

The GitHub Actions workflow will automatically run when you push to `main`. To manually trigger:

1. Go to **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

### 10. Verify Deployment

1. Wait 2-3 minutes for deployment to complete
2. Check the **Actions** tab for deployment status
3. Once complete, visit: `https://HusseinIssa1.github.io/csci426-project1`

## Troubleshooting

### Frontend shows but API calls fail

- ✅ Verify `REACT_APP_API_URL` secret is set correctly
- ✅ Check backend is running and accessible
- ✅ Verify CORS is enabled on backend
- ✅ Check browser console for errors

### GitHub Actions deployment fails

- ✅ Check workflow logs in **Actions** tab
- ✅ Verify `homepage` in package.json matches repository name
- ✅ Ensure repository is public (required for free GitHub Pages)

### Backend deployment fails

- ✅ Check environment variables are set correctly
- ✅ Verify database connection credentials
- ✅ Check backend logs in hosting service dashboard

### Routes don't work (404 errors)

- ✅ Verify `homepage` in package.json is correct
- ✅ Check that Router basename is set correctly in App.js
- ✅ Try accessing the site directly (not via redirect)

## Updating Your Site

After making changes:

```bash
git add .
git commit -m "Your commit message"
git push
```

GitHub Actions will automatically rebuild and redeploy.

## Environment Variables Reference

### Frontend (GitHub Secrets)
- `REACT_APP_API_URL` - Backend API URL

### Backend (Hosting Service Environment Variables)
- `DB_HOST` - Database host
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `JWT_SECRET` - JWT signing secret
- `PORT` - Server port (usually auto-set by hosting service)

## Support

If you encounter issues:
1. Check GitHub Actions logs
2. Check backend hosting service logs
3. Review browser console for frontend errors
4. Verify all environment variables are set correctly

