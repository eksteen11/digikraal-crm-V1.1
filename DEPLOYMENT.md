# Deployment Guide for Digikraal CRM

## Vercel Deployment

### 1. Environment Variables Setup

Before deploying to Vercel, you need to set up your environment variables:

1. **Go to your Vercel Dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Add the following variables:**

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Setup

1. **Create a Supabase project** at [https://supabase.com](https://supabase.com)
2. **Get your credentials** from Settings → API
3. **Run the database setup** using the SQL in `supabase-setup.sql`

### 3. Deploy to Vercel

1. **Connect your GitHub repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### 4. Post-Deployment

After deployment:

1. **Test authentication** - Sign up and sign in
2. **Verify database** - Check that user profiles are created
3. **Test protected routes** - Ensure middleware works correctly

## Environment Variables Reference

### Required for Production:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Optional (for integrations):
- `AIRTABLE_API_KEY` - Airtable integration
- `AIRTABLE_BASE_ID` - Airtable base ID
- `WHATSAPP_ACCESS_TOKEN` - WhatsApp Business API
- `WHATSAPP_PHONE_NUMBER_ID` - WhatsApp phone number ID
- `WHATSAPP_VERIFY_TOKEN` - WhatsApp webhook verification
- `GMAIL_CLIENT_ID` - Gmail API integration
- `GMAIL_CLIENT_SECRET` - Gmail API secret
- `DATABASE_URL` - SQL database connection

## Troubleshooting

### Build Errors:
- **Missing environment variables**: Ensure all required variables are set in Vercel
- **Supabase connection issues**: Verify your Supabase project is active
- **Database errors**: Run the SQL setup script in Supabase

### Runtime Errors:
- **Authentication not working**: Check Supabase configuration
- **Protected routes not working**: Verify middleware configuration
- **Profile page errors**: Ensure database tables are created

## Local Development

1. **Copy `.env.example` to `.env.local`**
2. **Fill in your Supabase credentials**
3. **Run `npm run dev`**
4. **Test locally before deploying**
