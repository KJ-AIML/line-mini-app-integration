# line-mini-app-integration

An agent skill (Claude Code, and other [agentskills.io](https://agentskills.io)-compatible tools) for integrating an existing web app with LINE MINI App / LIFF: frontend bootstrap, server-side ID token verification, safe account linking, env templates, and console/review checklists.

## Install

```
npx skills add KJ-AIML/line-mini-app-integration
```

Installs `skills/line-mini-app-integration/SKILL.md` into your agent's skills directory (`--skill line-mini-app-integration` to select it explicitly if the repo ever holds more than one skill).

## What it does

- Detects frontend/backend/auth/ORM stack from the target repo
- Adds LIFF frontend bootstrap with endpoint-prefix-safe routing
- Adds a `/auth/line` backend route that verifies LINE ID tokens server-side (never trusts client-sent profile data)
- Generates env templates, LINE Developers Console setup checklist, and review-readiness checklist
- Refuses to edit and switches to report mode when provider ownership, route safety, or auth ownership is ambiguous

See [`skills/line-mini-app-integration/SKILL.md`](skills/line-mini-app-integration/SKILL.md) for the full modes list, non-negotiable safety rules, and the prompts/templates/validators it references.

## License

MIT — see [LICENSE](LICENSE).
