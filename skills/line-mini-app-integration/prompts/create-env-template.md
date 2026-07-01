# Prompt: create-env-template

Generate `.env.example` template with correct public/secret split.

Public variables (frontend accessible):
- `NEXT_PUBLIC_LINE_LIFF_ID` / `VITE_LINE_LIFF_ID` / `NUXT_PUBLIC_LINE_LIFF_ID`

Server-side variables:
- `LINE_CHANNEL_ID` - for verification endpoint
- `LINE_CHANNEL_SECRET` - never expose to frontend
- `DATABASE_URL` - normal app persistence
- `SESSION_SECRET` - your own session/JWT signing
- `APP_BASE_URL` - for generating links
- `LINE_MINIAPP_MODE` - Developing / Review / Published mapping

Document which variables are required vs optional, and which are framework-specific.
