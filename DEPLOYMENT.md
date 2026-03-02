# Deployment Guide

This guide covers three deployment options for this Next.js application, ranging from free to self-hosted solutions.

---

## Option A: Vercel + Supabase (PostgreSQL) - FREE

Best for: Production-ready deployment with zero cost, automatic scaling, and managed PostgreSQL database.

### Prerequisites
- GitHub account
- Vercel account (free tier)
- Supabase account (free tier)

---

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in the details:
   - **Name**: `your-app-name`
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click **"Create new project"** and wait ~2 minutes

### Step 2: Get Database Connection String

1. In Supabase dashboard, go to **Project Settings** → **Database**
2. Scroll to **Connection string** section
3. Select **"URI"** format
4. Copy the connection string (it looks like):
   ```
   postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```
5. Replace `[password]` with your database password

### Step 3: Update Prisma Schema for PostgreSQL

Edit `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")
}

model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Track {
  id              String   @id @default(cuid())
  title           String
  artist          String   @default("Dumblitty")
  type            String   @default("original")
  year            Int
  genre           String?
  bpm             Int?
  duration        Int
  audioFilePath   String
  coverImagePath  String?
  lyrics          String?    @db.Text
  originalArtist  String?
  licenseInfo     String?
  equipmentUsed   String?
  recordingStudio String?
  description     String?    @db.Text
  isPublished     Boolean  @default(true)
  playCount       Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model AboutContent {
  id          String   @id @default(cuid())
  title       String   @default("About Dumblitty")
  bio         String   @default("Welcome to my personal music library. This is where I share my tracks and creative journey.") @db.Text
  imageUrl    String?
  socialLinks String?  @db.Text
  updatedAt   DateTime @updatedAt
}

model Setting {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String   @db.Text
  updatedAt DateTime @updatedAt
}
```

### Step 4: Set Environment Variables

In your project root, create `.env.production`:

```env
# Supabase PostgreSQL (Pooler connection for serverless)
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection for migrations
DIRECT_DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"

# NextAuth secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="https://your-app.vercel.app"

# Admin credentials (change these!)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-secure-password"
```

### Step 5: Push Database Schema

Run these commands locally:

```bash
# Generate Prisma client
bun run db:generate

# Push schema to Supabase
bunx prisma db push

# (Optional) Run seed if you have one
bunx prisma db seed
```

### Step 6: Deploy to Vercel

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click **"Add New"** → **"Project"**

4. Import your GitHub repository

5. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `bun run build`
   - **Output Directory**: `.next`

6. Add Environment Variables:
   - Click **"Environment Variables"**
   - Add all variables from `.env.production`

7. Click **"Deploy"**

### Step 7: Configure Build Settings

Add a `vercel.json` file to your project root:

```json
{
  "buildCommand": "bun install && bun run db:generate && bun run build",
  "installCommand": "bun install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### Step 8: Set Up Automatic Migrations (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
      
      - name: Install dependencies
        run: bun install
        
      - name: Generate Prisma Client
        run: bunx prisma generate
        
      - name: Push schema changes
        run: bunx prisma db push
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          DIRECT_DATABASE_URL: ${{ secrets.DIRECT_DATABASE_URL }}
```

---

## Option B: Railway (SQLite with Persistent Volume) - CHEAP

Best for: Simple deployment with SQLite persistence, ~$5/month.

### Prerequisites
- GitHub account
- Railway account ([railway.app](https://railway.app))

---

### Step 1: Create Railway Project

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository

### Step 2: Add Persistent Volume

1. In your project, click **"+ Add Service"**
2. Select **"Volume"**
3. Configure the volume:
   - **Name**: `sqlite-data`
   - **Mount Path**: `/app/data`
   - **Size**: 1GB (adjust as needed)

### Step 3: Configure Environment Variables

In Railway dashboard, go to your service → **Variables**:

```env
DATABASE_URL="file:/app/data/custom.db"
NODE_ENV="production"
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="https://your-app.railway.app"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-secure-password"
```

### Step 4: Create Railway Configuration

Create `railway.toml` in project root:

```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "bun run db:generate && bun run start"
healthcheckPath = "/"
healthcheckTimeout = 300
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 3
```

### Step 5: Create Dockerfile (Optional but Recommended)

Create `Dockerfile`:

```dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run db:generate
RUN bun run build

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create data directory for SQLite
RUN mkdir -p /app/data

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "server.js"]
```

### Step 6: Update Database Path

Update `.env` for Railway:

```env
DATABASE_URL="file:/app/data/custom.db"
```

### Step 7: Deploy

1. Push changes to GitHub
2. Railway will automatically deploy
3. Monitor the build logs
4. Once deployed, click the generated URL to verify

### Step 8: Initialize Database

SSH into Railway container or use the **CLI**:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Link project
railway link

# Run migrations
railway run bunx prisma db push

# Run seed (if applicable)
railway run bunx prisma db seed
```

---

## Option C: Self-hosted VPS

Best for: Full control, custom domain, learning experience.

### Prerequisites
- VPS (Ubuntu 22.04 recommended)
- Domain name (optional but recommended)
- SSH access

---

### Step 1: Initial Server Setup

```bash
# SSH into your server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install required packages
apt install -y curl git nginx certbot python3-certbot-nginx

# Install Bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# Install Node.js (for PM2)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2
npm install -g pm2
```

### Step 2: Clone and Build Application

```bash
# Create app directory
mkdir -p /var/www
cd /var/www

# Clone repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Install dependencies
bun install

# Build application
bun run db:generate
bun run build
```

### Step 3: Set Up Environment

```bash
# Create .env file
cat > .env << 'EOF'
DATABASE_URL="file:/var/www/your-repo/data/custom.db"
NODE_ENV="production"
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="https://yourdomain.com"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-secure-password"
EOF

# Create data directory
mkdir -p data
```

### Step 4: Initialize Database

```bash
# Push schema to database
bunx prisma db push

# Run seed (if applicable)
bunx prisma db seed
```

### Step 5: Configure PM2

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'nextjs-app',
    script: 'server.js',
    cwd: '/var/www/your-repo/.next/standalone',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      DATABASE_URL: 'file:/var/www/your-repo/data/custom.db'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    // Auto-restart on crash
    watch: false,
    max_memory_restart: '1G',
    // Logging
    error_file: '/var/log/nextjs/error.log',
    out_file: '/var/log/nextjs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
}
```

Create log directory and start:

```bash
# Create log directory
mkdir -p /var/log/nextjs

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
```

### Step 6: Configure Nginx

Create `/etc/nginx/sites-available/nextjs-app`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL certificates (will be configured by Certbot)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files
    location /_next/static {
        alias /var/www/your-repo/.next/static;
        expires 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Public files
    location /public {
        alias /var/www/your-repo/public;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
    }

    # Maximum upload size
    client_max_body_size 50M;
}
```

Enable the site:

```bash
# Create symbolic link
ln -s /etc/nginx/sites-available/nextjs-app /etc/nginx/sites-enabled/

# Remove default site
rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Reload Nginx
systemctl reload nginx
```

### Step 7: Set Up SSL with Let's Encrypt

```bash
# Obtain SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
certbot renew --dry-run
```

### Step 8: SQLite Backup Strategy

Create backup script at `/usr/local/bin/backup-sqlite.sh`:

```bash
#!/bin/bash

# Configuration
DB_PATH="/var/www/your-repo/data/custom.db"
BACKUP_DIR="/var/backups/sqlite"
RETENTION_DAYS=30
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Create backup
sqlite3 "$DB_PATH" ".backup '$BACKUP_DIR/custom_$TIMESTAMP.db'"

# Compress backup
gzip "$BACKUP_DIR/custom_$TIMESTAMP.db"

# Remove old backups
find "$BACKUP_DIR" -name "custom_*.db.gz" -mtime +$RETENTION_DAYS -delete

# Log
echo "[$(date)] Backup completed: custom_$TIMESTAMP.db.gz" >> /var/log/sqlite-backup.log
```

Set up permissions and cron:

```bash
# Make script executable
chmod +x /usr/local/bin/backup-sqlite.sh

# Create backup directory
mkdir -p /var/backups/sqlite

# Add to crontab (backup every 6 hours)
(crontab -l 2>/dev/null; echo "0 */6 * * * /usr/local/bin/backup-sqlite.sh") | crontab -
```

### Step 9: Upload Backup to Remote (Optional)

Add to backup script for S3 upload:

```bash
# Add after compression in backup script
# Requires: apt install awscli

aws s3 cp "$BACKUP_DIR/custom_$TIMESTAMP.db.gz" s3://your-bucket/backups/
```

### Step 10: Monitoring and Maintenance

Create health check script at `/usr/local/bin/health-check.sh`:

```bash
#!/bin/bash

# Check if app is running
if ! pm2 pid nextjs-app > /dev/null 2>&1; then
    echo "App is not running, starting..."
    cd /var/www/your-repo && pm2 start ecosystem.config.js
fi

# Check if Nginx is running
if ! systemctl is-active --quiet nginx; then
    echo "Nginx is not running, starting..."
    systemctl start nginx
fi
```

Add to crontab:

```bash
# Health check every 5 minutes
(crontab -l 2>/dev/null; echo "*/5 * * * * /usr/local/bin/health-check.sh") | crontab -
```

---

## Quick Reference

### Environment Variables Summary

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Database connection string | Yes |
| `DIRECT_DATABASE_URL` | Direct DB connection (PostgreSQL only) | Supabase only |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes |
| `NEXTAUTH_URL` | Public URL of your app | Yes |
| `ADMIN_EMAIL` | Admin account email | Yes |
| `ADMIN_PASSWORD` | Admin account password | Yes |

### Useful Commands

```bash
# Generate NextAuth secret
openssl rand -base64 32

# Prisma commands
bunx prisma generate    # Generate client
bunx prisma db push     # Push schema changes
bunx prisma studio      # Open database browser
bunx prisma migrate dev # Create migration (PostgreSQL)

# PM2 commands
pm2 status              # View status
pm2 logs                # View logs
pm2 restart all         # Restart all apps
pm2 monit               # Monitor resources

# Nginx commands
nginx -t                # Test configuration
systemctl reload nginx  # Reload configuration
systemctl status nginx  # View status
```

---

## Troubleshooting

### Common Issues

1. **Database connection errors**
   - Verify `DATABASE_URL` format
   - Check if database exists
   - Ensure Prisma client is generated

2. **Build failures**
   - Check Node.js/Bun version
   - Clear `.next` folder and rebuild
   - Verify all dependencies are installed

3. **PM2 app crashes**
   - Check logs: `pm2 logs nextjs-app`
   - Verify environment variables
   - Check memory usage: `pm2 monit`

4. **Nginx 502 errors**
   - Verify app is running on port 3000
   - Check Nginx error logs: `/var/log/nginx/error.log`
   - Verify firewall allows traffic

---

## Security Recommendations

1. **Enable HTTPS** (required for production)
2. **Use strong passwords** for admin accounts
3. **Rotate secrets** periodically
4. **Keep dependencies updated**
5. **Enable rate limiting** in Nginx
6. **Set up firewall rules** (ufw recommended)
7. **Regular backups** of database

```bash
# Basic UFW setup
ufw allow ssh
ufw allow http
ufw allow https
ufw enable
```
