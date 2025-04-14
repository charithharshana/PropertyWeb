
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
      