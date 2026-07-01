# Prompt: add-line-auth-backend

Add `/auth/line` backend route that verifies LINE ID tokens server-side.

Requirements:
- Accept `idToken` from frontend POST body
- Send to `POST https://api.line.me/oauth2/v2.1/verify` with `client_id`
- Validate response: check `iss === "https://access.line.me"`, `aud === clientId`, `exp > now`
- Map `sub` to internal user via `line_identities` table
- Issue app session (cookie or JWT)
- Return `{ ok: true, userId }` on success
- Never trust frontend-sent profile data as authoritative

Generate framework-specific code:
- Express: `server/routes/auth-line.ts`
- FastAPI: `app/routes/auth_line.py`
- Next.js Route Handler: `app/api/auth/line/route.ts`
- NestJS: controller/service pattern

Include proper error handling and HTTP status codes.
