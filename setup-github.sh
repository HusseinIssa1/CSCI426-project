#!/bin/bash

# GitHub Deployment Setup Script
# This script helps you set up your repository for GitHub Pages deployment

echo "🚀 GitHub Pages Deployment Setup"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already initialized"
fi

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

# Update package.json homepage
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/YOUR_USERNAME/$GITHUB_USERNAME/g" package.json
else
    # Linux
    sed -i "s/YOUR_USERNAME/$GITHUB_USERNAME/g" package.json
fi

echo "✅ Updated package.json homepage"

# Check if remote exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ Git remote already configured"
    git remote -v
else
    read -p "Enter your GitHub repository URL (or press Enter to skip): " REPO_URL
    if [ ! -z "$REPO_URL" ]; then
        git remote add origin "$REPO_URL"
        echo "✅ Git remote added: $REPO_URL"
    fi
fi

echo ""
echo "📝 Next steps:"
echo "1. Review and commit your changes:"
echo "   git add ."
echo "   git commit -m 'Setup for GitHub Pages deployment'"
echo ""
echo "2. Push to GitHub:"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to your repository → Settings → Pages"
echo "   - Select 'GitHub Actions' as source"
echo ""
echo "4. Deploy your backend (see DEPLOYMENT.md for details)"
echo ""
echo "5. Set REACT_APP_API_URL secret:"
echo "   - Go to Settings → Secrets and variables → Actions"
echo "   - Add secret: REACT_APP_API_URL = your-backend-url/api"
echo ""
echo "✨ Setup complete! Check DEPLOYMENT.md for detailed instructions."

