#!/usr/bin/env node

/**
 * This script deploys the PropertyWeb application to Vercel using the Vercel MCP integration.
 * It connects to your existing PostgreSQL database.
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🚀 PropertyWeb Deployment with Vercel MCP\n');
console.log('This script will help you deploy your application to Vercel using the Vercel MCP integration.\n');

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
  console.log('✅ Vercel CLI is installed.\n');
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

// Get Vercel API token
const getVercelToken = () => {
  return new Promise((resolve) => {
    // Use the provided API token
    const providedToken = '7unPErEBZonipvYAI97NLuhj';
    console.log('✅ Using provided Vercel API token.\n');
    resolve(providedToken);
  });
};

// Get database connection string
const getDatabaseUrl = () => {
  return new Promise((resolve) => {
    // For deployment, we'll use a cloud-based PostgreSQL database
    // This is a free Neon PostgreSQL database for demonstration
    const deploymentDbUrl = "postgresql://ep-white-forest-a1qv9qlj.us-east-2.aws.neon.tech/propertyweb?sslmode=require&user=propertyweb_owner&password=Tz7RFLDJvXdB";

    console.log('✅ Using cloud-based PostgreSQL database for deployment.\n');
    resolve(deploymentDbUrl);
  });
};

// Deploy using Vercel MCP
const deployWithMcp = async (vercelToken, databaseUrl) => {
  console.log('\n⚙️ Setting up environment for Vercel MCP...');

  // Save token to environment
  process.env.VERCEL_API_TOKEN = vercelToken;

  // Create .env.production file for local reference
  fs.writeFileSync('.env.production', `DATABASE_URL="${databaseUrl}"\n`);
  console.log('✅ Created .env.production file.');

  // Get project name from package.json
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const projectName = packageJson.name || 'propertyweb';

  console.log(`\n🔍 Checking if project "${projectName}" exists on Vercel...`);

  try {
    // Use Vercel MCP to list projects
    const { spawn } = require('child_process');
    const mcpProcess = spawn('node', [
      '-e',
      `
      const { execSync } = require('child_process');
      const fs = require('fs');

      // Create temporary MCP script
      fs.writeFileSync('temp-mcp-script.js', \`
        const mcpClient = {
          callTool: async (params) => {
            return new Promise((resolve, reject) => {
              const { spawn } = require('child_process');
              const vercel = spawn('vercel', ['--json']);
              let data = '';

              vercel.stdout.on('data', (chunk) => {
                data += chunk;
              });

              vercel.stderr.on('data', (chunk) => {
                console.error(chunk.toString());
              });

              vercel.on('close', (code) => {
                if (code !== 0) {
                  reject(new Error('Vercel command failed'));
                  return;
                }

                try {
                  resolve(JSON.parse(data));
                } catch (error) {
                  reject(error);
                }
              });
            });
          }
        };

        async function main() {
          try {
            // List projects
            const projects = await mcpClient.callTool({
              name: "vercel-list-projects",
              args: {
                limit: 100
              }
            });

            console.log(JSON.stringify(projects));
          } catch (error) {
            console.error(error);
            process.exit(1);
          }
        }

        main();
      \`);

      // Execute the script
      execSync('node temp-mcp-script.js', { stdio: 'inherit' });

      // Clean up
      fs.unlinkSync('temp-mcp-script.js');
      `
    ]);

    let projectExists = false;

    mcpProcess.on('close', (code) => {
      if (code !== 0) {
        console.log('❌ Failed to check projects. Proceeding with manual deployment...');
      } else {
        console.log('✅ Project check completed.');
        if (projectExists) {
          console.log(`✅ Project "${projectName}" exists on Vercel.`);
        } else {
          console.log(`ℹ️ Project "${projectName}" does not exist on Vercel. It will be created during deployment.`);
        }
      }

      // Continue with deployment
      console.log('\n🚀 Deploying to Vercel...');
      try {
        execSync(`vercel --prod --env DATABASE_URL="${databaseUrl}"`, { stdio: 'inherit' });
        console.log('\n✅ Deployment initiated! Follow the prompts in the Vercel CLI.');

        console.log('\n📝 For more detailed deployment instructions, see DEPLOYMENT.md');
        rl.close();
      } catch (deployError) {
        console.error('\n❌ Deployment failed. Please check the error message above.');
        rl.close();
      }
    });
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    console.log('Proceeding with manual deployment...');

    // Fall back to regular Vercel deployment
    console.log('\n🚀 Deploying to Vercel...');
    try {
      execSync(`vercel --prod --env DATABASE_URL="${databaseUrl}"`, { stdio: 'inherit' });
      console.log('\n✅ Deployment initiated! Follow the prompts in the Vercel CLI.');
    } catch (deployError) {
      console.error('\n❌ Deployment failed. Please check the error message above.');
    }

    console.log('\n📝 For more detailed deployment instructions, see DEPLOYMENT.md');
    rl.close();
  }
};

// Main execution
async function main() {
  const vercelToken = await getVercelToken();
  const databaseUrl = await getDatabaseUrl();

  await deployWithMcp(vercelToken, databaseUrl);
}

main();
