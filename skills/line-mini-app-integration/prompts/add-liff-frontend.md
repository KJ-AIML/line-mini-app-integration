# Prompt: add-liff-frontend

Add LIFF SDK bootstrap and runtime guards to the detected frontend framework.

Requirements:
- Use `@line/liff` npm package or official CDN
- Call `liff.init()` on each LIFF-enabled page
- Only change URL state after `liff.init()` resolves
- Do NOT send `getProfile()` or decoded token payloads to server
- Send ID token to backend via POST
- Handle external browser with `withLoginOnExternalBrowser: true` or `liff.login()`
- Detect `liff.isInClient()` for LIFF-browser-only features
- Apply safe-area padding (bottom 34px minimum)

Generate framework-specific code:
- Next.js App Router: `app/line-entry/page.tsx` client component
- Next.js Pages Router: `pages/line-entry.tsx`
- Vite React: `src/App.tsx` or dedicated entry component
- Nuxt: `composables/useLineMiniApp.ts`
- Vue: composable or plugin
- Plain HTML/JS: `index.html` with CDN script

Also generate `lib/line/liff-client.ts` helper with `initLineMiniApp()` function.
