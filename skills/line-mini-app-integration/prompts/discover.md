# Prompt: discover

Analyze the current repository to detect:
1. Frontend framework and routing model (Next.js App Router, Pages Router, Vite React, Nuxt, Vue, plain JS)
2. Backend framework and API surface (Express, NestJS, FastAPI, Next route handlers, none)
3. Auth/session strategy (session cookie, JWT, NextAuth/Auth.js, custom auth, none)
4. ORM / database layer (Prisma, Drizzle, Sequelize, SQLAlchemy, raw SQL, none)
5. Route structure and current public base URL
6. Deploy environment (Vercel, Docker, Netlify, Railway, VPS, etc.)
7. Existing account model and user schema

Inspect these files:
- package.json, lockfiles
- next.config.*, vite.config.*, nuxt.config.*
- Frontend entry routes and router definitions
- .env*, .env.example
- Auth middleware, login pages, session helpers
- Backend route directories and API handlers
- ORM schemas and migrations
- Dockerfiles, compose files, CI workflows

Output a structured report with all detected information and any ambiguities that need manual clarification.
