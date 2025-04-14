# Vercel Deployment Instructions

Since we're encountering issues with the CLI deployment, here's how to deploy your PropertyWeb application to Vercel using their web interface:

## Step 1: Prepare Your Repository

1. Make sure your code is committed to a Git repository (GitHub, GitLab, or Bitbucket)
2. Ensure your database connection string is set up in the `.env` file (which we've already done)

## Step 2: Deploy via Vercel Web Interface

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" > "Project"
3. Import your Git repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: Leave blank (use the repository root)
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add environment variables:
   - Name: `DATABASE_URL`
   - Value: `postgresql://ep-white-forest-a1qv9qlj.us-east-2.aws.neon.tech/propertyweb?sslmode=require&user=propertyweb_owner&password=Tz7RFLDJvXdB`
6. Click "Deploy"

## Step 3: Verify Deployment

1. Once the deployment is complete, Vercel will provide you with a URL to access your application
2. Visit the URL to ensure your application is working correctly
3. Check the Vercel logs if you encounter any issues

## Step 4: Set Up Custom Domain (Optional)

1. In your project settings on Vercel, click "Domains"
2. Add your custom domain and follow the verification steps

## Troubleshooting

If you encounter any issues during deployment:

1. Check the build logs in Vercel dashboard
2. Ensure your database is accessible from Vercel's servers
3. Verify that all environment variables are correctly set
4. Make sure your Next.js application is properly configured for production

## Vercel MCP Integration

Once your application is deployed, you can use the Vercel MCP integration to manage your deployments programmatically:

1. Get a Vercel API token from [Vercel Account Settings](https://vercel.com/account/tokens)
2. Configure the Vercel MCP integration as described in the documentation
3. Use the MCP tools to manage your deployments, environment variables, and more
