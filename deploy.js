#!/usr/bin/env node

/**
 * This script helps deploy the PropertyWeb application to Vercel.
 * It provides a guided process for setting up environment variables
 * and deploying the application.
 */

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🚀 PropertyWeb Deployment Helper\n');
console.log('This script will help you deploy your application to Vercel.\n');

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
} catch (error) {
  console.log('❌ Vercel CLI is not installed. Installing now...');
  try {
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('✅ Vercel CLI installed successfully.\n');
  } catch (installError) {
    console.error('❌ Failed to install Vercel CLI. Please install it manually with: npm install -g vercel');
    process.exit(1);
  }
}

// Check if user is logged in to Vercel
try {
  execSync('vercel whoami', { stdio: 'ignore' });
  console.log('✅ You are logged in to Vercel.\n');
} catch (error) {
  console.log('❌ You are not logged in to Vercel. Please log in:');
  try {
    execSync('vercel login', { stdio: 'inherit' });
    console.log('✅ Logged in to Vercel successfully.\n');
  } catch (loginError) {
    console.error('❌ Failed to log in to Vercel. Please try again manually with: vercel login');
    process.exit(1);
  }
}

// Ask for database URL
rl.question('Enter your PostgreSQL database URL (postgresql://username:password@hostname:port/database): ', (databaseUrl) => {
  if (!databaseUrl.startsWith('postgresql://')) {
    console.error('❌ Invalid database URL. It should start with postgresql://');
    rl.close();
    process.exit(1);
  }

  console.log('\n⚙️ Setting up environment variables...');
  
  // Create .env.production file for local reference
  const fs = require('fs');
  fs.writeFileSync('.env.production', `DATABASE_URL="${databaseUrl}"\n`);
  console.log('✅ Created .env.production file.');

  // Ask if user wants to deploy now
  rl.question('\nDo you want to deploy to Vercel now? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      console.log('\n🚀 Deploying to Vercel...');
      try {
        // Deploy with environment variables
        execSync(`vercel --env DATABASE_URL="${databaseUrl}" --prod`, { stdio: 'inherit' });
        console.log('\n✅ Deployment initiated! Follow the prompts in the Vercel CLI.');
      } catch (deployError) {
        console.error('\n❌ Deployment failed. Please check the error message above.');
      }
    } else {
      console.log('\nTo deploy manually, run: vercel --prod');
      console.log('Make sure to set up your environment variables in the Vercel dashboard.');
    }

    console.log('\n📝 For more detailed deployment instructions, see DEPLOYMENT.md');
    rl.close();
  });
});
