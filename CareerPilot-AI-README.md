# CareerPilot AI

CareerPilot AI is an AI-powered career guidance and learning platform designed to help students connect **career preparation** with **personalized learning**.

The current implementation contains a React frontend, an Express backend, PostgreSQL through Neon, Prisma ORM, JWT authentication, Google OAuth, and GitHub OAuth.

> **Important:** Never commit `.env` files, database passwords, JWT secrets, Google secrets, GitHub client secrets, access tokens, or other private credentials to GitHub.

## 1. Current Project Status

### Frontend
- React + Vite application
- React Router navigation
- Login page
- Registration page
- Dashboard layout
- Protected routes
- User context
- Dynamic logged-in user information
- Logout
- Settings page
- Dark mode / theme support
- Google sign-in and sign-up
- Google re-authentication from Settings
- GitHub sign-in
- GitHub re-authentication from Settings
- Axios API layer

### Backend
- Node.js + Express REST API
- Prisma ORM
- Neon PostgreSQL database
- User registration
- Email/password login
- bcrypt password hashing
- JWT authentication
- Protected `/auth/me` route
- Google OAuth authentication
- GitHub OAuth authentication
- OAuth account linking by verified email
- Dashboard API
- User persistence in PostgreSQL

### Planned / Not Yet Completed
- LinkedIn OAuth
- Resume upload and parsing
- ATS scoring
- Job-description matching
- Skill-gap detection
- AI career recommendations
- Learning roadmap generation
- PDF / PPT / notes upload
- RAG
- Embeddings and vector search
- Flashcards
- Quizzes
- Weak-topic tracking
- Interview-question generation

# 2. Tech Stack

## Frontend
- React 19
- Vite
- Tailwind CSS 4
- React Router
- Axios
- React Icons
- Lucide React
- `@react-oauth/google`
- Recharts

## Backend
- Node.js
- Express 5
- Prisma ORM
- PostgreSQL
- Neon
- bcrypt
- JSON Web Token (`jsonwebtoken`)
- Google OAuth
- GitHub OAuth

# 3. Main Project Structure

```text
CareerPilot-AI/
├── Backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   │   └── prisma.js
│   │   ├── controllers/
│   │   │   └── auth.controller.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── dashboard.routes.js
│   │   ├── services/
│   │   │   └── auth.service.js
│   │   └── ...
│   ├── .env
│   ├── package.json
│   └── package-lock.json
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── auth.js
│   │   │   ├── axios.js
│   │   │   ├── dashboard.js
│   │   │   └── user.js
│   │   ├── components/
│   │   ├── context/
│   │   │   └── UserContext.jsx
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Setting.jsx
│   │   │   └── ...
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   └── package-lock.json
├── .gitignore
└── README.md
```

# 4. Prerequisites

Install:
- Git
- Node.js 20 LTS or newer
- npm
- A Neon PostgreSQL account
- A Google OAuth Client
- A GitHub OAuth App

Check:

```bash
node --version
npm --version
git --version
```

# 5. Clone the Repository

```bash
git clone https://github.com/Naman-Sharma-comp/CareerPilot-AI.git
cd CareerPilot-AI
```

# 6. Backend Setup

```bash
cd Backend
npm install
```

Create `Backend/.env`:

```env
DATABASE_URL="YOUR_NEON_POSTGRESQL_CONNECTION_STRING"
JWT_SECRET="YOUR_LONG_RANDOM_JWT_SECRET"
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GITHUB_CLIENT_ID="YOUR_GITHUB_CLIENT_ID"
GITHUB_CLIENT_SECRET="YOUR_GITHUB_CLIENT_SECRET"
GITHUB_CALLBACK_URL="http://localhost:5173/login"
PORT=5000
```

Never commit this file.

A safe `Backend/.env.example` can contain:

```env
DATABASE_URL=""
JWT_SECRET=""
GOOGLE_CLIENT_ID=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GITHUB_CALLBACK_URL="http://localhost:5173/login"
PORT=5000
```

# 7. Neon PostgreSQL Setup

Create a Neon project and copy the PostgreSQL connection string. Prefer the pooled connection URL for local development.

Example format:

```text
postgresql://USER:PASSWORD@HOST-pooler.REGION.aws.neon.tech/DATABASE?sslmode=require
```

Put it in `DATABASE_URL`.

# 8. Prisma Setup

`Backend/prisma/schema.prisma` should be committed to GitHub because it defines the database structure.

Current user model:

```prisma
model User {
  id         String   @id @default(cuid())
  fullName   String
  email      String   @unique
  password   String?
  provider   String   @default("credentials")
  googleId   String?  @unique
  githubId   String?  @unique
  linkedinId String?  @unique
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

Run:

```bash
npx prisma generate
npx prisma db push
```

Optional:

```bash
npx prisma studio
```

Do not use `prisma migrate reset` on a shared or important database because it can delete data.

# 9. Run the Backend

From `Backend`:

```bash
npm run dev
```

If the project uses `npm start` instead, use the script defined in `Backend/package.json`.

Expected local backend URL:

```text
http://localhost:5000
```

# 10. Frontend Setup

Open a second terminal:

```bash
cd CareerPilot-AI/Frontend
npm install
```

Create `Frontend/.env`:

```env
VITE_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
VITE_GITHUB_CLIENT_ID="YOUR_GITHUB_CLIENT_ID"
```

If the Axios setup uses an API environment variable, add:

```env
VITE_API_URL="http://localhost:5000/api"
```

Frontend `VITE_` variables are visible to the browser. Never put `GITHUB_CLIENT_SECRET`, `JWT_SECRET`, `DATABASE_URL`, passwords, or access tokens in the frontend.

# 11. Run the Frontend

```bash
npm run dev
```

Expected local frontend URL:

```text
http://localhost:5173
```

# 12. Running Both Together

Terminal 1:

```bash
cd CareerPilot-AI/Backend
npm install
npx prisma generate
npm run dev
```

Terminal 2:

```bash
cd CareerPilot-AI/Frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

# 13. Authentication Overview

## Email / Password Registration

Frontend sends:

```text
POST /api/auth/register
```

Backend flow:
1. receive name, email, and password
2. validate data
3. hash password with bcrypt
4. save user in PostgreSQL
5. generate JWT
6. return user + JWT

Frontend stores:

```text
token
user
isLoggedIn
```

in `localStorage`.

## Email / Password Login

Frontend sends:

```text
POST /api/auth/login
```

Backend finds the user, verifies the bcrypt password hash, generates a JWT, and returns user data.

# 14. JWT Authentication

Protected requests use:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

The shared Axios client attaches the JWT. Backend middleware verifies it.

Current user endpoint:

```text
GET /api/auth/me
```

`UserContext.jsx` uses this endpoint to load the authenticated user for the Topbar, ProfileDropdown, Dashboard, Settings, and other protected UI.

# 15. Google OAuth

Frontend uses `@react-oauth/google` and `useGoogleLogin()` with:

```js
prompt: "select_account"
```

Google returns an access token. Frontend sends it to:

```text
POST /api/auth/google
```

Backend calls:

```text
https://openidconnect.googleapis.com/v1/userinfo
```

with:

```http
Authorization: Bearer GOOGLE_ACCESS_TOKEN
```

Backend reads the Google user ID, name, verified email, then finds, creates, or links the CareerPilot user and returns a CareerPilot JWT.

The Google access token is not the CareerPilot JWT.

# 16. Google Cloud Setup

Create an OAuth client in Google Cloud Console.

For local development, add:

```text
http://localhost:5173
```

as an authorized JavaScript origin.

Frontend:

```env
VITE_GOOGLE_CLIENT_ID="..."
```

Backend:

```env
GOOGLE_CLIENT_ID="..."
```

# 17. GitHub OAuth

Create a GitHub OAuth App.

Homepage URL:

```text
http://localhost:5173
```

Authorization callback URL:

```text
http://localhost:5173/login
```

Frontend starts authorization at GitHub with client ID, redirect URI, `user:email` scope, and a random `state` value stored in `sessionStorage` as:

```text
github_oauth_state
```

GitHub redirects back to:

```text
/login?code=...&state=...
```

Frontend validates state, then sends the authorization code to:

```text
POST /api/auth/github
```

Backend exchanges it at:

```text
https://github.com/login/oauth/access_token
```

Then fetches:

```text
https://api.github.com/user
https://api.github.com/user/emails
```

It uses a verified GitHub email to find, link, or create the user and generates a CareerPilot JWT.

`GITHUB_CLIENT_SECRET` must stay backend-only.

# 18. OAuth Account Linking

If a user already exists with a verified email and later signs in with Google or GitHub using the same verified email, the provider ID can be attached to the existing user instead of creating a duplicate account.

Example:

```text
student@example.com registered normally
        ↓
Google returns verified student@example.com
        ↓
Existing CareerPilot account is linked to Google
```

# 19. Settings Re-authentication

Google:

```text
Settings
→ Sign in again
→ CareerPilot local session cleared
→ /login?reauth=google
→ Google authentication
→ new CareerPilot session
```

GitHub:

```text
Settings
→ Sign in again
→ CareerPilot local session cleared
→ /login?reauth=github
→ GitHub authentication
→ new CareerPilot session
```

This is re-authentication, not provider unlinking. Google or GitHub may reuse an existing browser session and may not ask for the provider password every time.

# 20. Google Registration

The Register page uses the same backend Google endpoint as Login:

```text
POST /api/auth/google
```

No separate Google registration endpoint is required. The backend decides whether to create a new user or sign in/link an existing user.

# 21. Protected Routes

Basic flow:

```text
No JWT
→ redirect to login

JWT present and valid
→ allow protected page
```

The authenticated user is loaded through `/api/auth/me`.

# 22. Dashboard

Dashboard frontend requests:

```text
GET /api/dashboard
```

Current statistics are placeholders and will later connect to resume scans, saved jobs, learning progress, quizzes, interviews, and other modules.

# 23. Tailwind CSS

The project uses Tailwind CSS 4.

Main CSS begins with:

```css
@import "tailwindcss";
```

Dark mode:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

VS Code may warn about Tailwind-specific at-rules. This is often an editor warning rather than a build failure.

Optional `.vscode/settings.json`:

```json
{
  "css.lint.unknownAtRules": "ignore"
}
```

Tailwind CSS IntelliSense is recommended.

# 24. Git Safety

Commit:

```text
Backend/prisma/schema.prisma
Backend/package.json
Backend/package-lock.json
Frontend/package.json
Frontend/package-lock.json
source files
README.md
.env.example
```

Do not commit:

```text
.env
.env.*
node_modules/
access tokens
JWT secrets
OAuth client secrets
database credentials
```

Suggested `.gitignore`:

```gitignore
node_modules/
.env
.env.*
!.env.example
dist/
.vite/
.DS_Store
```

# 25. Git Workflow

Before starting:

```bash
git pull origin main
```

Create a feature branch:

```bash
git switch -c feature-name
```

After changes:

```bash
git status
git add .
git commit -m "Describe the change"
git push -u origin feature-name
```

Avoid force-pushing `main`.

# 26. Merge Conflict Recovery

Check:

```bash
git status
```

Conflict markers look like:

```text
<<<<<<< HEAD
current version
=======
other version
>>>>>>> branch-name
```

Choose the correct code, delete the markers, then:

```bash
git add path/to/resolved-file
git commit -m "Resolve merge conflicts"
```

To cancel an active merge:

```bash
git merge --abort
```

# 27. Common Frontend Errors

## `X is not defined`
Usually a missing import.

Example:

```jsx
import { FcGoogle } from "react-icons/fc";
```

## `useEffect is not defined`

```jsx
import { useEffect, useState } from "react";
```

## Duplicate declaration
If Vite says an identifier is already declared, check for duplicate imports left by a merge.

## Blank page
Open browser DevTools, go to Console, and fix the first red error. Common causes are missing imports, invalid JSX, duplicate declarations, route/component naming mismatches, or incorrectly self-closed containers.

# 28. Common Backend Errors

## Neon Prisma `P1001`

```text
Can't reach database server
```

Check Neon status, network, `DATABASE_URL`, and pooled connection URL.

Test with:

```bash
npx prisma db pull
```

## Prisma client problem

```bash
npx prisma generate
```

Then restart backend.

## Schema not synchronized

```bash
npx prisma db push
```

# 29. OAuth Troubleshooting

## Google access-token issue
The frontend sends:

```js
tokenResponse.access_token
```

The backend uses Google's `/userinfo` endpoint. Do not pass this access token to `verifyIdToken()` because it is not an ID-token JWT.

## GitHub callback issue
Confirm both GitHub OAuth App and backend use:

```text
http://localhost:5173/login
```

## GitHub login not configured
Check:

```env
VITE_GITHUB_CLIENT_ID="..."
```

Restart Vite after changing `.env`.

# 30. Security Notes

Never share or commit:

```text
DATABASE_URL
Database password
JWT_SECRET
GITHUB_CLIENT_SECRET
Google client secret
Google access token
GitHub access token
CareerPilot JWT
```

If a secret is exposed, rotate or revoke it immediately and update `.env`.

# 31. Quick Setup Checklist for Another Developer

```text
[ ] Clone repository
[ ] npm install in Backend
[ ] Create Backend/.env
[ ] npx prisma generate
[ ] npx prisma db push
[ ] Start Backend
[ ] npm install in Frontend
[ ] Create Frontend/.env
[ ] Start Frontend
[ ] Open http://localhost:5173
```

Environment checklist:

```text
[ ] DATABASE_URL
[ ] JWT_SECRET
[ ] GOOGLE_CLIENT_ID
[ ] GITHUB_CLIENT_ID
[ ] GITHUB_CLIENT_SECRET
[ ] GITHUB_CALLBACK_URL
[ ] VITE_GOOGLE_CLIENT_ID
[ ] VITE_GITHUB_CLIENT_ID
```

# 32. Testing Checklist

Test in this order:

```text
1. Start backend
2. Verify Prisma/Neon connection
3. Start frontend
4. Open /
5. Open /register
6. Register with email/password
7. Logout
8. Login with email/password
9. Logout
10. Register/sign in with Google
11. Logout
12. Sign in with GitHub
13. Open dashboard
14. Open Settings
15. Test Google Sign in again
16. Test GitHub Sign in again
```

# 33. Main Authentication Endpoints

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/google
POST   /api/auth/github
GET    /api/auth/me
```

An older route may also still exist:

```text
DELETE /api/auth/google
```

The current Settings re-authentication flow does not require this route.

# 34. Current Architecture

```text
React Frontend
      ↓
Axios
      ↓
Express API
      ↓
Authentication / Services
      ↓
Prisma
      ↓
Neon PostgreSQL
```

OAuth flow:

```text
Google / GitHub
      ↓
Frontend OAuth authorization
      ↓
Backend verification / token exchange
      ↓
Find, create, or link CareerPilot user
      ↓
CareerPilot JWT
      ↓
Authenticated frontend session
```

# 35. CareerPilot AI Vision

Career module:

```text
Resume
→ Resume Analysis
→ ATS Score
→ Job Matching
→ Skill Gap Detection
→ Career Recommendations
→ Interview Preparation
```

Learning module:

```text
PDFs / Notes / PPTs / Images
→ AI Knowledge Base
→ Q&A
→ Summaries
→ Flashcards
→ Quizzes
→ Weak Topic Detection
```

Combined workflow:

```text
Resume uploaded
      ↓
Missing skill detected
      ↓
Learning resources checked
      ↓
Personalized roadmap generated
      ↓
Student learns and tracks progress
```

# 36. Team Handoff

Share with another developer:

```text
1. GitHub repository URL
2. This README
3. Backend environment values securely
4. Frontend environment values
5. Neon access if required
6. Google OAuth setup details
7. GitHub OAuth setup details
```

Do not send secrets through Git commits or public chat.

## Local URLs

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

Repository:

```text
https://github.com/Naman-Sharma-comp/CareerPilot-AI
```

For local development, start the **Backend first**, then start the **Frontend**.
