---
name: line-mini-app-integration
description: Use when integrating an existing web app with LINE MINI App / LIFF, adding LINE login/ID-token auth to a backend, auditing a repo for LIFF-readiness, or preparing a LINE Developers Console / review checklist. Covers LIFF frontend bootstrap, server-side LINE ID token verification, account linking, and MINI App review compliance.
---

# line-mini-app-integration

Integrate an existing web app with LINE MINI App / LIFF safely.

## What this skill does

This skill audits and modifies existing web applications so they can run as a LINE MINI App or LIFF-integrated web app. It focuses on:

- LIFF frontend bootstrap
- Secure backend LINE ID token verification
- Safe account linking
- Environment variable generation
- LINE Developers Console setup notes
- Review/compliance checklists
- Testing and QA scaffolding

## Modes

| Mode | Purpose | Output |
|---|---|---|
| `audit-existing-app` | Detect whether the repo can safely host LIFF/MINI App integration | Report only |
| `add-liff-frontend` | Add LIFF SDK bootstrap and runtime guards | Code changes |
| `add-line-auth-backend` | Add `/auth/line` verification backend and session issue path | Code changes |
| `create-env-template` | Generate public/private env variable templates | Docs/config |
| `create-console-checklist` | Generate console setup checklist tied to the detected stack | Docs |
| `create-review-checklist` | Generate review-readiness and compliance checklist | Docs |
| `add-tests` | Add unit/integration/manual QA scaffolding | Code/docs |
| `generate-docs` | Generate project-specific integration notes | Docs |
| `full-integration-plan` | Produce an implementation plan before changes | Report or plan |

## Non-negotiable safety rules

- **Never trust frontend-sent LINE user IDs or profile objects as backend identity.**
- **Always verify LINE ID tokens server-side** before creating or linking an app account.
- **Never expose LINE channel secrets to the frontend.**
- **Never place `liff.init()` on a route outside the LIFF endpoint URL prefix.**
- **Always account for both LIFF browser and external-browser runtime.**

## Inputs to infer first

- Frontend framework (Next.js App Router, Next.js Pages Router, Vite React, Nuxt, Vue, plain JS)
- Backend framework (Express, NestJS, FastAPI, Next route handlers, or none)
- Auth/session strategy (session cookie, JWT, NextAuth/Auth.js, custom auth, none)
- ORM / database layer (Prisma, Drizzle, Sequelize, SQLAlchemy, raw SQL, none)
- Route structure and current public base URL
- Deploy environment (Vercel, Docker, Netlify, Railway, VPS, etc.)
- Existing account model

## Required manual inputs if not inferable

- LINE region (Thailand, Taiwan, Japan, etc.)
- Provider ownership choice
- LIFF IDs per environment (Developing, Review, Published)
- Channel ID
- Whether to link LINE to existing accounts or replace auth entirely

## Output expectations

Depending on mode, this skill may:

- Write frontend LIFF helper files
- Add backend `/auth/line` routes
- Add DB migration snippets
- Generate `.env.example`
- Create LINE console setup docs
- Create review and QA checklists

## Refusal criteria

This skill should refuse direct modification and switch to report mode if:

- Provider ownership is ambiguous
- Route layout makes LIFF initialization unsafe
- No backend exists but secure server-side identity is required
- Requested changes would overwrite unrelated production auth flows

## Definition of done

The integration is only complete when:

- [ ] LIFF initializes successfully at the endpoint route
- [ ] Backend verifies LINE ID token server-side
- [ ] App sessions are issued by the local backend
- [ ] Env vars are split correctly between public and secret
- [ ] External-browser behavior is explicitly handled
- [ ] Review-sensitive config is documented
- [ ] QA checklist is generated

## Architecture mental model

```
User → LINE app or external browser → LIFF browser or web browser
                                          ↓
                                    Your web frontend (React/Vue/etc.)
                                          ↓
                                    Your backend API
                                          ↓
                                    Your database
                                          ↓
                                    LINE Platform (identity, messaging)
```

LINE MINI App is fundamentally a web app that runs through LIFF. Your existing frontend, backend, hosting, and database architecture can remain largely unchanged. The integration work concentrates on:

1. LIFF initialization and LINE-auth-aware routing
2. Server-side token verification
3. LINE Developers Console configuration
4. Runtime differences between LIFF browser and external browsers

## Key constraints

| Constraint | Why it matters |
|---|---|
| Endpoint URLs must be HTTPS | Required by LIFF platform |
| LIFF init only guaranteed at endpoint URL or below | Route prefix validation required |
| User IDs are provider-scoped | Same person gets different LINE user IDs under different providers |
| MINI App channels create 3 internal channels (Developing, Review, Published) | Each has its own LIFF ID and endpoint URL |
| External-browser access is now supported (since Oct 2025) | Must handle both LIFF browser and normal browser |
| Thailand/Taiwan require certified provider for verification review | Region-specific compliance |
| Verified-only features (service messages, Custom Path, Quick-fill, Add to Home) | Cannot promise these in v1 before review |

## Common mistakes

| Mistake | Fix |
|---|---|
| Trusting `liff.getProfile()` result as backend identity | Send the ID token to the backend; verify it server-side before trusting any user field |
| Verifying the ID token by decoding it client-side only | Verification must happen server-side, against LINE's public keys / verify endpoint |
| Calling `liff.init()` on every route | Restrict to routes at/under the LIFF endpoint URL prefix |
| Reusing one LIFF ID across Developing/Review/Published | Each of the 3 channels has its own LIFF ID and endpoint URL — read it from env per environment |
| Assuming one LINE user ID works across regions/providers | User IDs are provider-scoped; the same person gets a different ID under a different provider |

### Minimal server-side token verification (Node/Express example)

```js
// POST /auth/line — body: { idToken }
const res = await fetch('https://api.line.me/oauth2/v2.1/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ id_token: idToken, client_id: process.env.LINE_CHANNEL_ID }),
});
if (!res.ok) return res.status(401).json({ error: 'invalid_id_token' });
const claims = await res.json(); // { sub, name, picture, email?, ... }
// claims.sub is the verified, provider-scoped LINE user ID — use this to look up/link the local account
// Never skip this call and trust a client-supplied `sub` or profile object instead.
```

## Reference files

Each mode has a matching prompt in `prompts/<mode>.md` — read it before executing that mode (e.g. `add-line-auth-backend` mode → `prompts/add-line-auth-backend.md`). `prompts/discover.md` covers stack detection (read `package.json`, config files, and route/auth code directly — there's no separate detection script, this repo inspection *is* the audit).

- `templates/frontend/*.tmpl`, `templates/backend/*.tmpl`, `templates/db/*.tmpl` — starting point per stack (Express/FastAPI/Next, Prisma/Drizzle/SQL); adapt, don't copy blindly.
- `templates/docs/*.tmpl` — env example, console checklist, review checklist, QA checklist, integration report.
- `validators/*.ts` — pure functions for the validation gates below (endpoint prefix, LIFF ID map, public/secret split, review-sensitive config diff); port the logic, or run them if the target repo has a TS runtime.
- `test-fixtures/mock-line-verify.json` — sample LINE verify-endpoint responses (success/expired/wrong issuer/wrong audience) for testing the auth backend without hitting LINE's API.

## Validation gates

Before marking integration "done", verify:

1. **Endpoint gate**: All LIFF-enabled routes are at the endpoint URL or below
2. **ID gate**: Active build uses correct LIFF ID for current environment
3. **Security gate**: Backend verifies LINE ID token and issues its own session
4. **Secret gate**: No channel secret or backend-only credentials exposed to frontend
5. **Browser gate**: External-browser behavior explicitly handled
6. **Review gate**: Privacy policy, channel description, and review endpoint match reality
7. **Visual gate**: Safe-area padding and recent Android/LINE UI changes tested
