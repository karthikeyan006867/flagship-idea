# 🚀 HDIP Deployment Guide

## Vercel Deployment

### Prerequisites
- Vercel account (https://vercel.com)
- Vercel CLI installed: `npm i -g vercel`
- Vercel token: `khBdSXycxsTQULTcTOu3olGN`

### Option 1: Deploy via CLI

#### 1. Login to Vercel
```powershell
# Set your Vercel token
$env:VERCEL_TOKEN="khBdSXycxsTQULTcTOu3olGN"

# Or login interactively
vercel login
```

#### 2. Deploy Frontend
```powershell
cd apps/frontend

# First deployment (creates project)
vercel

# Production deployment
vercel --prod
```

#### 3. Deploy Backend (Separate)
```powershell
cd apps/backend

# Deploy to Vercel (as serverless functions)
vercel --prod
```

### Option 2: Deploy via GitHub Integration

#### 1. Push to GitHub
```powershell
git init
git add .
git commit -m "Initial commit - HDIP Platform"
git branch -M main
git remote add origin https://github.com/karthikeyan006867/flagship-idea.git
git push -u origin main
```

#### 2. Connect to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select the `apps/frontend` directory as the root
4. Set build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### 3. Configure Environment Variables
Add these in Vercel dashboard:
```
VITE_GRAPHQL_ENDPOINT=https://your-backend.vercel.app/graphql
VITE_API_BASE_URL=https://your-backend.vercel.app/api
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your_client_id
```

### Option 3: One-Command Deployment Script

```powershell
# Run the automated deployment
.\deploy-vercel.ps1
```

---

## Environment Configuration

### Frontend (.env.production)
```env
VITE_GRAPHQL_ENDPOINT=https://your-api.vercel.app/graphql
VITE_API_BASE_URL=https://your-api.vercel.app/api
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your_client_id
VITE_MAPBOX_TOKEN=pk.your_token
```

### Backend (.env.production)
```env
NODE_ENV=production
DATABASE_URL=your_production_database_url
REDIS_URL=your_redis_url
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_SECRET=your_secret
STRIPE_SECRET_KEY=sk_live_your_key
```

---

## Backend Deployment Options

### Option A: Vercel Serverless (Recommended for API)
The backend is configured to deploy as serverless functions on Vercel.

### Option B: Railway (for NestJS + PostgreSQL)
1. Sign up at https://railway.app
2. Create new project
3. Deploy from GitHub
4. Add PostgreSQL service
5. Set environment variables

### Option C: Render (Full Backend)
1. Sign up at https://render.com
2. New Web Service
3. Connect GitHub repo
4. Build Command: `cd apps/backend && npm install && npm run build`
5. Start Command: `cd apps/backend && npm run start:prod`
6. Add PostgreSQL database

### Option D: Heroku
```powershell
heroku create hdip-backend
heroku addons:create heroku-postgresql:hobby-dev
git subtree push --prefix apps/backend heroku main
```

---

## Database Setup (Production)

### Option 1: Vercel Postgres
```powershell
vercel env add DATABASE_URL
# Paste your connection string
```

### Option 2: Supabase (Recommended)
1. Create project at https://supabase.com
2. Get connection string
3. Add to Vercel environment variables

### Option 3: Railway Postgres
1. Add PostgreSQL to Railway project
2. Copy DATABASE_URL
3. Set in environment variables

---

## Post-Deployment Checklist

### ✅ Frontend
- [ ] Site loads at Vercel URL
- [ ] All pages render correctly
- [ ] Styles are applied (Tailwind)
- [ ] No console errors
- [ ] Environment variables loaded

### ✅ Backend
- [ ] API responds at /graphql
- [ ] Database connected
- [ ] GraphQL playground works
- [ ] CORS configured correctly
- [ ] Environment variables set

### ✅ Integration
- [ ] Frontend can call backend API
- [ ] Auth0 authentication works
- [ ] Database queries succeed
- [ ] Error handling works

---

## Troubleshooting

### Build Fails
```powershell
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Environment Variables Not Loading
- Check variable names match exactly
- Ensure VITE_ prefix for frontend variables
- Redeploy after adding variables

### CORS Errors
Update backend CORS configuration:
```typescript
app.enableCors({
  origin: ['https://your-frontend.vercel.app'],
  credentials: true,
});
```

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check if database allows external connections
- Ensure SSL is enabled if required

---

## Custom Domain Setup

### 1. Add Domain in Vercel
1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 2. Update Environment Variables
Update API URLs to use custom domain:
```env
VITE_GRAPHQL_ENDPOINT=https://api.yourdomain.com/graphql
```

---

## Monitoring & Analytics

### Vercel Analytics
Enable in project settings for:
- Page views
- Performance metrics
- User analytics

### Error Tracking (Sentry)
```powershell
npm install @sentry/react @sentry/node
```

Add to main.tsx:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});
```

---

## CI/CD Pipeline

### Automatic Deployments
Vercel automatically deploys on:
- Push to `main` branch → Production
- Pull requests → Preview deployments

### Manual Deployment
```powershell
# Preview deployment
vercel

# Production deployment
vercel --prod
```

---

## Performance Optimization

### Frontend
- Build with production config
- Enable compression
- Optimize images
- Code splitting enabled

### Backend
- Use connection pooling
- Enable Redis caching
- Optimize database queries
- Use CDN for static assets

---

## Security Checklist

- [ ] Environment variables secured
- [ ] Database credentials encrypted
- [ ] HTTPS enabled (Vercel default)
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation active
- [ ] SQL injection prevention
- [ ] XSS protection enabled

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html
- **NestJS Production**: https://docs.nestjs.com/deployment

---

## Quick Commands Reference

```powershell
# Login to Vercel
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Environment variables
vercel env add
vercel env ls
vercel env pull

# Remove deployment
vercel rm [deployment-url]
```

---

**Your Vercel Token**: `khBdSXycxsTQULTcTOu3olGN`

**Deployment Status**: Ready to deploy! 🚀
