# Prompt: add-tests

Generate testing and QA scaffolding.

Unit tests:
- Mock `@line/liff` and assert `liff.init()` called with correct LIFF ID
- Assert `withLoginOnExternalBrowser` configured if external browser support needed
- Assert `getProfile()` never POSTed to backend
- Assert `isInClient()` gating for LIFF-only features

Backend integration tests:
- Mock `POST /oauth2/v2.1/verify` success and failure
- Reject bad `iss`, wrong `aud`, expired `exp`, missing `idToken`
- Test account-linking idempotency on repeated sign-in
- Verify session issued only after successful verification

Browser E2E tests:
- Normal browser external-browser fallback
- Direct navigation to endpoint URL and nested paths
- URL mutations only after init completes

Manual QA checklist:
- LIFF initializes in Developing URL inside LINE
- Correct LIFF ID per environment
- Auth exchange succeeds, session created
- No redirect before init completes
- Bottom actions visible above safe area
- External browser login path works
- Unsupported features show fallback UI
- Open-in-LINE affordance where appropriate
- Review endpoint deploy matches Published
- Privacy policy matches data flow

Generate test files and mock fixtures.
