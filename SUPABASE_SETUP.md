# Supabase Setup Guide for AI Therapist Agent

This guide will help you set up Supabase as the backend for your AI Therapist Agent application.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `ai-therapist-agent`
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
5. Click "Create new project"

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **Anon public key** (starts with `eyJ`)
   - **Service role key** (starts with `eyJ`) - Keep this secret!

## 3. Set Up Environment Variables

Create a `.env.local` file in your project root with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Supabase Service Role Key (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 4. Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase/schema.sql`
3. Paste it into the SQL editor and click "Run"
4. This will create:
   - `users` table (extends Supabase auth)
   - `conversations` table (stores chat sessions)
   - `messages` table (stores individual messages)
   - Row Level Security (RLS) policies
   - Triggers for automatic user profile creation

## 5. Configure Authentication

1. Go to **Authentication** → **Settings**
2. Configure your site URL (e.g., `http://localhost:3000` for development)
3. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/dashboard`
4. Optionally enable social providers (Google, GitHub, etc.)

## 6. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`
3. Try to register/login
4. Start a conversation with the AI therapist

## 7. Database Schema Overview

### Users Table
- Extends Supabase's built-in auth.users
- Stores user profile information
- Automatically created when user signs up

### Conversations Table
- Stores chat sessions
- Each conversation belongs to a user
- Has a title and timestamps

### Messages Table
- Stores individual messages in conversations
- Supports both user and assistant messages
- Ordered by creation time

## 8. Security Features

- **Row Level Security (RLS)**: Users can only access their own data
- **Authentication**: Built-in Supabase auth with JWT tokens
- **API Protection**: All API routes verify user authentication
- **Data Validation**: Database constraints ensure data integrity

## 9. API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### Conversations
- `GET /api/conversations` - List user's conversations
- `POST /api/conversations` - Create new conversation
- `GET /api/conversations/[id]/messages` - Get messages from conversation

### Chat
- `POST /api/chat` - Send message to AI therapist (stores in database)

## 10. Troubleshooting

### Common Issues

1. **"Unauthorized" errors**: Check your environment variables
2. **Database connection errors**: Verify your Supabase URL and keys
3. **RLS policy errors**: Make sure the schema was applied correctly
4. **Authentication issues**: Check your redirect URLs in Supabase settings

### Useful Commands

```bash
# Check if Supabase is properly configured
npm run dev

# View database logs in Supabase dashboard
# Go to Logs → Database

# Reset database (if needed)
# Go to Settings → Database → Reset database
```

## 11. Production Deployment

1. Update environment variables with production values
2. Set up proper redirect URLs in Supabase
3. Configure your domain in Supabase settings
4. Deploy your Next.js app to Vercel/Netlify/etc.

## 12. Next Steps

- Add user profile management
- Implement conversation search
- Add message reactions/feedback
- Set up analytics
- Add admin dashboard
- Implement real-time features

Your AI Therapist Agent is now fully integrated with Supabase! 🎉 