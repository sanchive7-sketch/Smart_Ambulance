# Local Setup Guide

## 1. Install these tools

Install the following once:

1. **Node.js LTS** - includes `npm` and `npx`.
2. **Docker Desktop** - runs PostgreSQL locally without paying for a cloud database.
3. **Git** - version control and GitHub upload later.
4. **VS Code** - recommended editor.

After installing, restart PowerShell and verify:

```powershell
node --version
npm --version
docker --version
git --version
```

## 2. Configure environment variables

In the project root, copy `.env.example` and rename the copy to `.env`.

PowerShell command:

```powershell
Copy-Item .env.example .env
```

Open `.env` in VS Code. For local development, keep the database values unchanged. Replace `JWT_SECRET` with a long random string before you deploy.

Do **not** paste secrets in source files. `.env` is ignored by Git and should never be uploaded to GitHub.

## 3. Install project packages

From the project root:

```powershell
npx pnpm@11.16.0 install
npx pnpm@11.16.0 approve-builds --all
```

This project uses **pnpm**, not `npm`. Do not run `npm install` here because it can conflict with pnpm's workspace dependency layout.

`npx pnpm@11.16.0` works without installing pnpm globally or opening PowerShell as Administrator. Use this exact prefix for every remaining project command.

## 4. Start local PostgreSQL

Open Docker Desktop first, then run:

```powershell
docker compose up -d
docker compose ps
```

You should see a running `serp-postgres` container.

To stop it later:

```powershell
docker compose down
```

Your database data remains saved in Docker's `postgres_data` volume.

## 5. Create the database schema

```powershell
npx pnpm@11.16.0 db:generate
npx pnpm@11.16.0 db:migrate
```

When prompted for a migration name, use:

```text
initial_schema
```

## 6. Start the application

```powershell
npx pnpm@11.16.0 dev
```

Open these URLs:

- Web application: `http://localhost:5173`
- API health check: `http://localhost:4000/health`

## API keys - where to paste them

No API key is needed for the initial local version.

If you later use a paid or authorized map/traffic service, place keys only in `.env`:

```env
MAP_TILES_URL="provider URL"
TRAFFIC_PROVIDER_API_KEY="your key"
```

Restart `npx pnpm@11.16.0 dev` after changing `.env`. Never add API keys to React components, GitHub, screenshots, or messages.

## Recommended VS Code extensions

- ESLint
- Prettier - Code formatter
- Prisma
- Docker
