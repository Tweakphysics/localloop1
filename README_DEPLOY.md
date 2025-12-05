# LocalLoop Deployment Guide (Free Tier)

This project uses a React frontend and a NestJS backend. We will deploy them using free services: **Vercel** (Frontend), **Render** (Backend), **Neon** (Database), and **Cloudinary** (Images).

## Prerequisites
1. Accounts on: GitHub, Vercel, Render.com, Neon.tech, Cloudinary.
2. `npm` installed locally.

## Step 1: Database Setup (Neon)
1. Create a project on [Neon.tech](https://neon.tech).
2. Copy the **Connection String** (Postgres URL). It looks like `postgres://user:pass@host/db?sslmode=require`.

## Step 2: Image Storage Setup (Cloudinary)
1. Create an account on [Cloudinary](https://cloudinary.com).
2. Go to Dashboard and copy: `Cloud Name`, `API Key`, `API Secret`.

## Step 3: Backend Deployment (Render)
1. Push this code to a GitHub repository.
2. Go to [Render Dashboard](https://dashboard.render.com) -> New -> **Web Service**.
3. Connect your GitHub repo.
4. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npx prisma migrate deploy && node dist/main`
5. **Environment Variables** (Add these):
   - `DATABASE_URL`: (Paste Neon connection string)
   - `JWT_SECRET`: (Generate a random string)
   - `CLOUDINARY_CLOUD_NAME`: (From Step 2)
   - `CLOUDINARY_API_KEY`: (From Step 2)
   - `CLOUDINARY_API_SECRET`: (From Step 2)
6. Deploy. Wait for it to finish. Copy the **Service URL** (e.g., `https://localloop-api.onrender.com`).

## Step 4: Frontend Deployment (Vercel)
1. Go to [Vercel Dashboard](https://vercel.com) -> Add New Project.
2. Import the same GitHub repo.
3. Settings:
   - **Root Directory**: `./` (Root)
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
4. **Environment Variables**:
   - `REACT_APP_API_URL`: Paste your Render Backend URL (no trailing slash).
     *Note: You need to update `src/services/ApiClient.ts` and clients to use `process.env.REACT_APP_API_URL || 'http://localhost:4000'` instead of hardcoded localhost.*
5. Deploy.

## Step 5: Final Config
- Ensure your Render backend allows CORS for your Vercel domain. In `main.ts`, update `app.enableCors()` to `app.enableCors({ origin: 'https://your-vercel-app.vercel.app' })` for security, or keep open for testing.

Done! You can now share the Vercel URL with friends.
