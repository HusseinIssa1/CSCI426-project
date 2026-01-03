# Phone Seller - React Application

A full-stack e-commerce application for selling phones, built with React frontend and Express backend.

## Features

- User authentication (register/login)
- Admin dashboard for product management
- Product catalog with images
- Shopping cart functionality
- Responsive design

## Tech Stack

- **Frontend**: React, React Router
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HusseinIssa1/CSCI426-project.git
cd CSCI426-project
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=phone_store
JWT_SECRET=your-secret-key
PORT=5000
```

4. Set up the database:
```bash
npm run setup-db
```

5. (Optional) Populate with sample products:
```bash
npm run populate-products
```

6. Start the development servers:

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Deployment to GitHub Pages

This application is configured for deployment to GitHub Pages. The frontend will be automatically deployed when you push to the `main` branch.

### Step 1: Update Repository Settings

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### Step 2: Update Homepage in package.json

Before deploying, update the `homepage` field in `package.json` with your GitHub username:

```json
"homepage": "https://HusseinIssa1.github.io/CSCI426-project"
```

Your GitHub username is already configured: HusseinIssa1

### Step 3: Configure Backend API URL

Since GitHub Pages only hosts static files, you'll need to host your backend separately. Popular options include:

- **Render** (https://render.com) - Free tier available
- **Railway** (https://railway.app) - Free tier available
- **Heroku** (https://heroku.com) - Paid plans
- **Vercel** (https://vercel.com) - Free tier available

Once your backend is deployed, set the API URL as a GitHub secret:

1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `REACT_APP_API_URL`
4. Value: Your backend URL (e.g., `https://your-backend.onrender.com/api`)
5. Click **Add secret**

### Step 4: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/HusseinIssa1/CSCI426-project.git
git push -u origin main
```

The GitHub Actions workflow will automatically build and deploy your frontend to GitHub Pages.

### Step 5: Access Your Site

After deployment completes (usually takes 2-3 minutes), your site will be available at:
```
https://HusseinIssa1.github.io/CSCI426-project
```

## Backend Deployment (Required for Full Functionality)

### Deploying Backend to Render

1. Create an account at https://render.com
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: phone-seller-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node backend/server.js`
   - **Environment Variables**: Add all variables from your `.env` file
5. For MySQL database, use Render's PostgreSQL or connect to an external MySQL service
6. After deployment, copy your backend URL and add it as `REACT_APP_API_URL` secret in GitHub

### Database Setup for Production

For production, you'll need a cloud database. Options include:

- **Render PostgreSQL** (free tier)
- **PlanetScale** (free tier for MySQL)
- **Railway** (free tier)
- **AWS RDS** (paid)

Update your backend environment variables with the production database credentials.

## Project Structure

```
CSCI426-project/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth and upload middleware
│   ├── routes/         # API routes
│   ├── server.js       # Express server
│   └── setup.js        # Database setup script
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   ├── context/        # React context (Auth, Cart)
│   ├── pages/          # Page components
│   └── services/       # API service functions
├── .github/
│   └── workflows/      # GitHub Actions workflows
└── package.json
```

## Available Scripts

- `npm start` - Start React development server
- `npm run server` - Start Express backend server
- `npm run build` - Build React app for production
- `npm run setup-db` - Set up database tables
- `npm run populate-products` - Add sample products

## Environment Variables

### Frontend (.env or GitHub Secrets)
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000/api)

### Backend (.env)
- `DB_HOST` - Database host
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)

## Troubleshooting

### Frontend can't connect to backend
- Ensure backend is running
- Check `REACT_APP_API_URL` is set correctly
- Verify CORS is enabled on backend

### Database connection errors
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists (run `npm run setup-db`)

### GitHub Pages deployment issues
- Check GitHub Actions workflow logs
- Verify `homepage` in package.json matches your repository
- Ensure `REACT_APP_API_URL` secret is set

## License

This project is for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

