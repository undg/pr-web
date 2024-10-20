# pr-web

![Tests](https://github.com/undg/pr-web/actions/workflows/test.yml/badge.svg)
![Code quality analysis](https://github.com/undg/pr-web/actions/workflows/codeql-analysis.yml/badge.svg)

## Pulse Remote Frontend

React frontend for [go-prapi](https://github.com/undg/go-prapi) (v0.2.0) websocket server.

Control Linux PC sound remotely from your phone.

<img src="https://undg.dev/img/pr-web-ss.png" width="300" alt="pr-web screenshot">

## Tech Stack

- React, TypeScript, Vite
- Jotai: state management
- Zod: schema validation
- Vitest: unit testing
- Cypress: E2E testing
- GitHub Actions: CI/CD
- Tailwind CSS: styling

## Setup

1. Clone repo
2. `pnpm install`
3. `pnpm run dev`

## Key Commands

- `pnpm run dev`: Start dev server
- `pnpm run build`: Build production
- `pnpm run test`: Run unit tests
- `pnpm run test:e2e`: Run E2E tests
- `pnpm run lint`: Run linting

## Deployment

Build output to go-prapi's frontend/ folder. go-prapi serves WebSockets and static files. Symlink build folder to ../go-prapi/frontend/ or use local dev server with go-prapi running.

## Config

Stored in localStorage. Jotai + Zod ensure valid values.

## Contributing

PRs welcome. Tests must pass.

## Code Quality

GitHub Actions enforce quality and tests.

Clean code awaits smart devs.
