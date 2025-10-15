# Favorite Music App

A full-stack Next.js application with user authentication and favorites management, built with NextAuth v5, Prisma ORM, and PostgreSQL.

## Features

- 🔐 User authentication with NextAuth v5
  - Email/password credentials provider
  - Secure password hashing with bcrypt
- 🎵 Favorites management
  - Add favorite songs (name + artist)
  - View all saved favorites
  - Delete favorites
- 🛡️ Protected routes with middleware
- 📱 Responsive design with Tailwind CSS
- ✨ Toast notifications for user feedback
- ✅ Form validation with Zod and React Hook Form

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Auth**: NextAuth.js v5
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod + React Hook Form
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner (toast)

## Prerequisites

- Node.js 18+
- PostgreSQL (installed locally)
- pnpm (or npm/yarn)

## 🚀 How to Run This Code Locally

### Step 1: Install PostgreSQL

**macOS (Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**macOS (Postgres.app):**
Download from [https://postgresapp.com](https://postgresapp.com)

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download from [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)

**Docker (Alternative):**
```bash
docker run --name postgres-fms \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=fms_db \
  -p 5432:5432 \
  -d postgres:15
```

### Step 2: Create Database

```bash
# For macOS users (replace 'macbook' with your username)
psql -U macbook -d postgres -c "CREATE DATABASE fms_db;"

# For PostgreSQL with password
psql -U postgres -c "CREATE DATABASE fms_db;"
```

### Step 3: Install Dependencies

```bash
pnpm install
```

### Step 4: Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database (adjust username based on your setup)
# For macOS local user:
DATABASE_URL="postgresql://macbook@localhost:5432/fms_db"

# For PostgreSQL with password:
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fms_db"

# NextAuth Secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="FjbnRRvIsq/zKX1r9MPyIlVI61JYsVK+xXPSmbxxHSo="
NEXTAUTH_URL="http://localhost:3000"
```

**Generate your own secret:**
```bash
openssl rand -base64 32
```

### Step 5: Set Up Database Schema

```bash
npx prisma db push
```

This command will:
- Create all necessary tables (User, Favorite, Account, Session, VerificationToken)
- Generate the Prisma Client

### Step 6: Start Development Server

```bash
pnpm dev
```

**Open your browser:** [http://localhost:3000](http://localhost:3000)

---

## 📝 Quick Command Summary

```bash
# 1. Install dependencies
pnpm install

# 2. Create database
psql -U macbook -d postgres -c "CREATE DATABASE fms_db;"

# 3. Create .env file with DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL

# 4. Set up database schema
npx prisma db push

# 5. Start dev server
pnpm dev
```

## Usage

### Registration

1. Navigate to `/register`
2. Enter your name, email, and password (min 6 characters)
3. Click "Create account"
4. You'll be redirected to the login page

### Login

1. Navigate to `/login`
2. Enter your email and password
3. Click "Login"
4. You'll be redirected to `/favorites`

### Managing Favorites

On the `/favorites` page:
- **Add a favorite**: Fill in song name and artist, then click "Add Favorite"
- **View favorites**: All your saved favorites are displayed in cards
- **Delete a favorite**: Click the trash icon on any favorite card

### Logout

Click the "Logout" button in the navbar to sign out.

## Project Structure

```
fms-app/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   ├── auth.ts        # Auth server actions
│   │   │   └── favorites.ts   # Favorites CRUD actions
│   │   ├── api/
│   │   │   └── auth/[...nextauth]/
│   │   │       └── route.ts   # NextAuth API route
│   │   ├── favorites/
│   │   │   └── page.tsx       # Favorites page
│   │   ├── login/
│   │   │   └── page.tsx       # Login page
│   │   ├── register/
│   │   │   └── page.tsx       # Registration page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page (redirects)
│   ├── components/
│   │   ├── ui/                # shadcn UI components
│   │   └── favorites-list.tsx # Favorites list component
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── utils.ts           # Utility functions
│   │   └── validations.ts     # Zod schemas
│   ├── types/
│   │   └── next-auth.d.ts     # NextAuth type extensions
│   ├── auth.ts                # NextAuth configuration
│   └── middleware.ts          # Route protection
├── .env                       # Environment variables
└── package.json
```

## API Routes & Server Actions

### Server Actions

**Authentication**
- `registerUser(data)` - Register new user

**Favorites**
- `getFavorites()` - Get user's favorites
- `addFavorite(data)` - Add new favorite
- `deleteFavorite(id)` - Delete favorite

### NextAuth API

- `GET/POST /api/auth/*` - NextAuth endpoints
- `POST /api/auth/signin` - Sign in
- `GET /api/auth/signout` - Sign out

## Database Schema

### User
- `id`, `name`, `email`, `password`, `emailVerified`, `image`
- Relations: accounts, sessions, favorites

### Favorite
- `id`, `songName`, `artist`, `userId`, `createdAt`
- Relation: user (User)

### Account, Session, VerificationToken
- NextAuth models for authentication

## Security Features

- Password hashing with bcrypt (salt rounds: 10)
- JWT-based sessions
- Protected routes with middleware
- CSRF protection (NextAuth built-in)
- Database-level user ownership verification

## Development Commands

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Prisma commands
npx prisma studio          # Open database GUI
npx prisma generate        # Generate Prisma Client
npx prisma migrate dev     # Create and apply migrations
npx prisma migrate reset   # Reset database
```

## 🐛 Troubleshooting

### Error: "Database fms_db does not exist"

**Solution:**
```bash
# Create the database
psql -U macbook -d postgres -c "CREATE DATABASE fms_db;"

# Then run prisma db push
npx prisma db push
```

### Error: "Can't resolve '.prisma/client'"

**Solution:**
```bash
# Generate Prisma Client
npx prisma generate

# Clear Next.js cache
rm -rf .next

# Restart dev server
pnpm dev
```

### Error: "Connection refused" or "ECONNREFUSED"

**Solution:**
- PostgreSQL is not running
- Check if running: `pg_isready` or `brew services list`
- Start PostgreSQL: `brew services start postgresql@15`
- Verify DATABASE_URL in `.env` matches your setup

### Error: "Invalid credentials" on login

**Solution:**
- Make sure you registered an account first
- Email and password are case-sensitive
- Check if user exists: `npx prisma studio` → view Users table

### Error: "Permission denied to create database"

**Solution:**
Use `npx prisma db push` instead of `npx prisma migrate dev`

### TypeScript Errors in IDE

**Solution:**
```bash
# Regenerate Prisma Client
npx prisma generate

# Restart TypeScript server in VS Code
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Port 3000 Already in Use

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
pnpm dev -- -p 3001
```

## License

MIT
