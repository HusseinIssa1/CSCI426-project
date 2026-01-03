# Quick Start - GitHub Deployment

## 🚀 Fast Track (5 Steps)

### 1. Update Your Username
✅ Your username (HusseinIssa1) is already configured in `package.json`.

### 2. Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit"
```

### 3. Create GitHub Repository
- Go to https://github.com/new
- Name: `CSCI426-project`
- Make it **Public**
- Don't initialize with README
- Create repository

### 4. Push to GitHub
```bash
git branch -M main
git remote add origin https://github.com/HusseinIssa1/CSCI426-project.git
git push -u origin main
```

### 5. Enable GitHub Pages
- Repository → **Settings** → **Pages**
- Source: **GitHub Actions**
- Save

## ⚠️ Important: Backend Required

GitHub Pages only hosts the frontend. You **must** deploy the backend separately:

1. **Deploy backend** to Render/Railway (see DEPLOYMENT.md)
2. **Set GitHub secret**: `REACT_APP_API_URL` = `https://your-backend-url.com/api`

## 📚 Full Instructions

See `DEPLOYMENT.md` for complete step-by-step guide.

## ✅ After Deployment

Your site will be live at:
```
https://HusseinIssa1.github.io/CSCI426-project
```

## 🆘 Need Help?

- Check GitHub Actions logs if deployment fails
- Verify backend is running and accessible
- Ensure `REACT_APP_API_URL` secret is set correctly

