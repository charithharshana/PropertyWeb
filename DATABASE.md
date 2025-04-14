# Database Configuration Guide

This document provides detailed information about setting up and connecting to PostgreSQL databases for the PropertyWeb application.

## Database Options

PropertyWeb supports two primary database configuration options:

1. **Local PostgreSQL** - For development purposes
2. **Remote PostgreSQL** - For staging/production (e.g., on a VPS)

## Local PostgreSQL Setup

For local development, you can install PostgreSQL on your machine:

1. Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
2. Create a database called `propertyweb`
   ```sql
   CREATE DATABASE propertyweb;
   ```
3. Configure your `.env` file:
   ```
   DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/propertyweb?schema=public"
   ```
4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

## Remote PostgreSQL Setup (VPS with Docker)

The project is configured to connect to a PostgreSQL 16.8 database running in a Docker container on a VPS. This setup provides:

- PostgreSQL Version: 16.8
- Port: 5432
- Default Username: postgres
- Default Password: postgres_password
- Default Database: postgres_db
- Data persistence via Docker volume: postgres16_data

### VPS Connection Configuration

To connect to the remote PostgreSQL server:

1. Update your `.env` file with the VPS connection details:
   ```
   # Direct IP connection
   DATABASE_URL="postgresql://postgres:postgres_password@your-vps-ip:5432/propertyweb?schema=public"
   
   # Or with domain (if configured with SSL)
   DATABASE_URL="postgresql://postgres:postgres_password@your-domain:5432/propertyweb?schema=public&sslmode=require"
   ```

2. Ensure the VPS firewall allows incoming connections on port 5432.

### PostgreSQL Docker Management

The VPS includes a management script `manage-postgres.sh` with the following commands:

```bash
# Get usage information
./manage-postgres.sh help

# Start PostgreSQL
./manage-postgres.sh start

# Stop PostgreSQL
./manage-postgres.sh stop

# Restart PostgreSQL
./manage-postgres.sh restart

# Check status
./manage-postgres.sh status

# Show connection information
./manage-postgres.sh info

# Open PostgreSQL shell
./manage-postgres.sh psql [database_name]

# Create a new database
./manage-postgres.sh create-db database_name

# Create a new user
./manage-postgres.sh create-user username password

# Grant privileges to a user
./manage-postgres.sh grant username database_name

# Create a backup of specific database
./manage-postgres.sh backup [database_name]

# Restore from a backup file
./manage-postgres.sh restore backup_file.sql database_name

# View logs
./manage-postgres.sh logs
```

## Database Schema

The database schema is defined in `prisma/schema.prisma` and includes the following models:

- **User**: Authentication and user profile data
- **Property**: Core property information
- **Evaluation**: Property evaluation data
- **Photo**: Property photos
- **AdText**: Generated ad descriptions
- **CRMContact**: Management of potential buyers

## Testing Database Connection

The project includes a utility script to test the database connection:

```bash
node scripts/db-test.js
```

This script will:
1. Connect to the configured database
2. List all tables in the database
3. Display the current user count

## Troubleshooting Connection Issues

If you experience connection issues:

1. **Check that PostgreSQL is running**
   ```bash
   # For local PostgreSQL
   pg_ctl status
   
   # For Docker on VPS
   ./manage-postgres.sh status
   ```

2. **Verify firewall settings on the VPS**
   ```bash
   sudo ufw status
   # Ensure port 5432 is allowed
   ```

3. **Check PostgreSQL is configured to accept remote connections**
   The Docker configuration should include:
   ```
   -e POSTGRES_HOST_AUTH_METHOD=md5
   -e POSTGRES_LISTEN_ADDRESSES=*
   ```

4. **Test direct connection with psql**
   ```bash
   psql -h your-vps-ip -U postgres -d propertyweb
   ```

## Backup and Recovery

Regular backups are recommended:

```bash
# Create backup
./manage-postgres.sh backup propertyweb

# Restore from backup
./manage-postgres.sh restore backup_file.sql propertyweb
```

## Security Recommendations

For production environments:

1. Create a dedicated database user with limited permissions
2. Use strong passwords and environment variables
3. Enable SSL for PostgreSQL connections
4. Implement regular backup strategies
5. Monitor the database performance and logs