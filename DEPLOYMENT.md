# Deployment Guide for PropertyWeb

This guide explains how to deploy the PropertyWeb application to Vercel. There are multiple deployment methods available, including using the Vercel MCP integration.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. A PostgreSQL database (either hosted on a service like Supabase, Railway, or your own server)
3. Git repository with your PropertyWeb code

## Deployment Steps

### 1. Set Up Your PostgreSQL Database

Ensure you have a PostgreSQL database that's accessible from the internet. You can use:
- [Supabase](https://supabase.com) (has a free tier)
- [Railway](https://railway.app) (has a free tier)
- [Neon](https://neon.tech) (has a free tier)
- Your own hosted PostgreSQL instance

Make note of your database connection string, which should look like:
```
postgresql://username:password@hostname:port/database
```

### 2. Deploy to Vercel

#### Option 1: Deploy with Vercel MCP Integration (Recommended)

This method uses the Vercel MCP integration to deploy your application and connect to your existing database:

1. Make sure you have a Vercel API token:
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens)
   - Create a new token with appropriate permissions

2. Run the MCP deployment script:
   ```bash
   node deploy-with-mcp.js
   ```

3. Follow the prompts to:
   - Enter your Vercel API token
   - Confirm or enter your PostgreSQL database URL
   - Complete the deployment process

#### Option 2: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" > "Project"
3. Import your Git repository
4. Configure the project:
   - Framework Preset: Next.js
   - Build Command: `npm run vercel-build`
   - Output Directory: `.next`
5. Add environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - Add any other environment variables your app needs
6. Click "Deploy"

#### Option 3: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   vercel
   ```

4. Follow the prompts and configure:
   - Set the build command to: `npm run vercel-build`
   - Add environment variables when prompted

### 3. Configure Environment Variables

In the Vercel dashboard for your project:

1. Go to "Settings" > "Environment Variables"
2. Add the following variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - Any other environment variables your app needs

### 4. Run Database Migrations

The `vercel-build` script will automatically run Prisma migrations during deployment. However, if you need to run migrations manually:

1. Install Vercel CLI if you haven't already:
   ```bash
   npm i -g vercel
   ```

2. Pull environment variables from your Vercel project:
   ```bash
   vercel env pull .env.production
   ```

3. Run migrations against your production database:
   ```bash
   npx prisma migrate deploy --preview-feature
   ```

### 5. Verify Deployment

1. Visit your deployed application at the URL provided by Vercel
2. Test all functionality to ensure everything works as expected
3. Check the Vercel logs if you encounter any issues

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

1. Verify your `DATABASE_URL` is correct in Vercel environment variables
2. Ensure your database allows connections from Vercel's IP addresses
3. Check if your database requires SSL by adding `?sslmode=require` to your connection string

### Build Failures

If your build fails:

1. Check the build logs in Vercel
2. Ensure all dependencies are correctly installed
3. Verify your Prisma schema is valid

### Runtime Errors

If you encounter runtime errors:

1. Check the Function Logs in Vercel dashboard
2. Ensure all environment variables are correctly set
3. Verify your database schema matches what your code expects

## Continuous Deployment

Vercel automatically deploys when you push changes to your connected Git repository. To disable this:

1. Go to your project settings in Vercel
2. Navigate to "Git" section
3. Disable "Auto Deploy"

## Custom Domains

To add a custom domain:

1. Go to your project in Vercel dashboard
2. Click "Domains"
3. Add your domain and follow the verification steps

## Monitoring and Analytics

Vercel provides basic analytics and monitoring:

1. Go to your project in Vercel dashboard
2. Click "Analytics" to view performance metrics
3. Click "Logs" to view application logs

For more advanced monitoring, consider integrating services like Sentry or LogRocket.
