# pr-web

## Pulse Remote Frontend

React frontend for [go-prapi](https://github.com/undg/go-prapi) (v0.0.25) WebSocket server. Control Linux PC volume remotely.

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
