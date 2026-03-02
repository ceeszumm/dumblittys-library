# 🚀 Quick Deployment Guide - Vercel + Supabase

Panduan cepat untuk deploy Dumblitty's Library ke production.

---

## 📋 Prerequisites

- [ ] GitHub account
- [ ] Vercel account (https://vercel.com)
- [ ] Supabase account (https://supabase.com)

---

## 🗄️ Step 1: Setup Supabase Database

### 1.1 Create Project
1. Buka [supabase.com](https://supabase.com) dan login
2. Klik **"New Project"**
3. Isi:
   - **Name**: `dumblitty-library`
   - **Database Password**: Generate dan simpan password!
   - **Region**: Pilih yang terdekat (Singapore untuk Indonesia)
4. Tunggu ~2 menit sampai project ready

### 1.2 Get Connection Strings
1. Di Supabase dashboard, pergi ke **Settings** → **Database**
2. Scroll ke **Connection string**
3. Copy **URI** format:
   ```
   postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```

### 1.3 Prepare URLs
Buat 2 URLs:

**DATABASE_URL (untuk serverless/Vercel):**
```
postgresql://postgres.[project-ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
```

**DIRECT_DATABASE_URL (untuk migrations):**
```
postgresql://postgres.[project-ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres
```

---

## 🐙 Step 2: Push to GitHub

```bash
# Initialize git (jika belum)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Dumblitty's Library"

# Add remote (ganti dengan repo Anda)
git remote add origin https://github.com/USERNAME/dumblitty-library.git

# Push
git push -u origin main
```

---

## ▲ Step 3: Deploy to Vercel

### 3.1 Import Project
1. Buka [vercel.com](https://vercel.com)
2. Klik **"Add New"** → **"Project"**
3. Import dari GitHub repository Anda

### 3.2 Configure Environment Variables
Klik **"Environment Variables"** dan add:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://postgres.[ref]:[PASS]@...pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `DIRECT_DATABASE_URL` | `postgresql://postgres.[ref]:[PASS]@...pooler.supabase.com:5432/postgres` |
| `NEXTAUTH_SECRET` | Generate dengan: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` |
| `ADMIN_EMAIL` | `admin@dumblitty.com` |
| `ADMIN_PASSWORD` | `your-secure-password` |

### 3.3 Deploy
1. Klik **"Deploy"**
2. Tunggu build selesai
3. Jika ada error, check build logs

---

## 🌱 Step 4: Initialize Database

### Option A: Via GitHub Actions (Auto)
Project sudah dikonfigurasi dengan GitHub Actions yang akan auto-run `prisma db push` saat push ke branch main/master.

### Option B: Manual via Supabase SQL Editor
1. Buka Supabase Dashboard
2. Pergi ke **SQL Editor**
3. Jalankan schema manual (copy dari `prisma/schema.prisma`)

### Option C: Via Local
```bash
# Set env vars dulu
export DATABASE_URL="your-pooler-url"
export DIRECT_DATABASE_URL="your-direct-url"

# Push schema
bunx prisma db push

# Seed data
bunx prisma db seed
```

---

## ✅ Step 5: Verify

1. Buka URL Vercel Anda
2. Login dengan:
   - Email: `admin@dumblitty.com`
   - Password: (yang Anda set di env)
3. Upload tracks dan test semua fitur!

---

## 🔧 Useful Commands

```bash
# Generate Prisma client
bunx prisma generate

# Push schema changes to database
bunx prisma db push

# View database in browser
bunx prisma studio

# Seed database
bunx prisma db seed

# Generate NextAuth secret
openssl rand -base64 32
```

---

## 📊 Free Tier Limits

| Service | Limit |
|---------|-------|
| Vercel | 100GB bandwidth/bulan |
| Supabase | 500MB database |
| Supabase | 1GB file storage |
| Supabase | 50,000 monthly active users |

---

## 🆘 Troubleshooting

### Build Error: Prisma Client
```
Error: Prisma Client could not be generated
```
**Fix:** Pastikan `postinstall` script ada di package.json

### Database Connection Error
```
Error: P1001: Can't reach database server
```
**Fix:** Check DATABASE_URL format, pastikan password benar

### Authentication Error
```
Error: NEXTAUTH_SECRET is required
```
**Fix:** Generate secret dengan `openssl rand -base64 32`

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Prisma Docs: https://pris.ly/d/prisma-schema
