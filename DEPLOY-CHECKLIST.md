# 🚀 Quick Deployment Checklist

## Before Deploying

### ✅ Prerequisites
- [x] Code committed to Git
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables configured
- [ ] Build tested locally (`npm run build`)
- [ ] Vercel CLI installed (`npm i -g vercel`)
- [ ] Vercel token ready: `khBdSXycxsTQULTcTOu3olGN`

### ✅ Environment Setup

**Frontend (.env.production)**
- [ ] VITE_GRAPHQL_ENDPOINT
- [ ] VITE_API_BASE_URL
- [ ] VITE_AUTH0_DOMAIN
- [ ] VITE_AUTH0_CLIENT_ID
- [ ] VITE_MAPBOX_TOKEN

**Backend (.env.production)**
- [ ] DATABASE_URL (Production database)
- [ ] NODE_ENV=production
- [ ] JWT_SECRET
- [ ] AUTH0_CLIENT_SECRET
- [ ] STRIPE_SECRET_KEY

---

## Deployment Options

### Option 1: Automated Script (Easiest)
```powershell
.\deploy-vercel.ps1
```

### Option 2: Manual CLI
```powershell
# Frontend
cd apps/frontend
npm run build
vercel --prod

# Backend
cd apps/backend
npm run build
vercel --prod
```

### Option 3: GitHub Integration
1. Push to GitHub: `git push origin main`
2. Import in Vercel dashboard
3. Configure build settings
4. Deploy automatically

---

## Post-Deployment

### ✅ Verify Frontend
- [ ] Visit deployed URL
- [ ] Check all pages load
- [ ] Verify styles applied
- [ ] Test navigation
- [ ] Check console for errors

### ✅ Verify Backend
- [ ] API responds at /graphql
- [ ] GraphQL playground works
- [ ] Database connected
- [ ] Test queries/mutations

### ✅ Integration Tests
- [ ] Frontend connects to backend
- [ ] Auth flow works
- [ ] API calls succeed
- [ ] No CORS errors

---

## Quick Commands

```powershell
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (interactive)
cd apps/frontend
vercel

# Deploy production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]
```

---

## Troubleshooting

**Build fails:**
```powershell
rm -rf node_modules dist
npm install
npm run build
```

**Environment variables not loading:**
- Add in Vercel dashboard under Settings → Environment Variables
- Redeploy after adding

**CORS errors:**
- Update backend CORS to include frontend URL
- Check environment variable URLs match

**Database connection fails:**
- Verify DATABASE_URL is correct
- Check database allows external connections
- Enable SSL if required

---

## Support

- 📚 Full guide: [DEPLOYMENT.md](DEPLOYMENT.md)
- 🔧 Vercel Docs: https://vercel.com/docs
- 💬 Need help? Check the documentation

---

**Your Vercel Token:** `khBdSXycxsTQULTcTOu3olGN`

**Status:** Ready to deploy! 🚀
