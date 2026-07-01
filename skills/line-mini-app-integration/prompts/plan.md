# Prompt: plan

Based on the discovery report, produce a full integration plan:

1. Determine retrofit shape (existing web app vs greenfield)
2. Identify endpoint URL prefix and validate route compatibility
3. Decide account linking strategy (link to existing vs LINE-as-primary)
4. Map environment variables needed (public vs secret split)
5. Plan frontend LIFF bootstrap location and entry route
6. Plan backend `/auth/line` route and token verification flow
7. Plan database migration for `line_identities` table
8. Identify review-sensitive configuration fields
9. List manual steps that cannot be automated (provider selection, console setup, etc.)

Output a step-by-step plan with exact files to modify/create.
