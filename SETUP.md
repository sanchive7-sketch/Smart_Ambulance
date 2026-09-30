# Hackathon Demo Setup

The presentation runs with fictional data. **Docker, PostgreSQL, API keys, and payment details are not needed.**

## 1. Install Node.js

Install Node.js LTS, then open a new PowerShell window and check:

```powershell
node --version
npm --version
```

Git and VS Code are useful for development, but neither is required to run the demo.

## 2. Configure demo mode

In `C:\Users\Sanchive Kumar\smart_ambulance`, copy the example file if `.env` does not already exist:

```powershell
Copy-Item .env.example .env
```

If you already have `.env`, keep it and add these lines:

```env
DEMO_MODE=true
VITE_DEMO_MODE=true
```

`DEMO_MODE=true` makes the API use in-memory fictional accounts instead of PostgreSQL. `VITE_DEMO_MODE=true` keeps the demo-account hint visible in the web build. Do not paste real patient data or API keys into demo screens.

## 3. Install and run

Run these commands from the project folder. Paste only the command lines, not the Markdown code-fence markers:

```powershell
npx pnpm@11.16.0 install
npx pnpm@11.16.0 db:generate
npx pnpm@11.16.0 dev
```

Open `http://localhost:5173`. The API health check at `http://localhost:4000/health` should report `"mode":"demo"`.

This project uses pnpm. Do not run `npm install` in this workspace. The `npx pnpm@11.16.0` prefix avoids a global pnpm installation or Administrator PowerShell.

## 4. Sign in as each role

Choose a workspace on the login page. Each of the three visible roles has its own `/login/<role>` URL and opens only its assigned dashboard. All fictional accounts use password `SerpDemo2026!`.

| Workspace | Email |
| --- | --- |
| People | `user@serp.local` or `+91 98765 43210` |
| Ambulance driver | `driver@serp.local` |
| Hospital | `hospital@serp.local` |

Click **Use demo** to fill the selected account, then sign in. Use **Sign out** to switch roles. The driver and hospital login pages show fictional inspection details such as vehicle number, equipment, hospital registration, and contact number. Refreshing keeps the session for up to eight hours while the API keeps the same `JWT_SECRET`. With the example placeholder, the API generates a temporary secret each time it starts, so a restart signs everyone out.

See [DEMO_GUIDE.md](DEMO_GUIDE.md) for a short jury walkthrough and what is simulated.

## Optional: use PostgreSQL later

Only do this when you want to continue building the real backend after the hackathon. Install and start Docker Desktop, set `DEMO_MODE=false` in `.env`, then run:

```powershell
docker compose up -d
npx pnpm@11.16.0 db:generate
npx pnpm@11.16.0 db:migrate
npx pnpm@11.16.0 db:seed
npx pnpm@11.16.0 dev
```

Use `initial_schema` when prompted for a migration name. If changing `VITE_DEMO_MODE`, restart the dev server. Keep secrets in `.env`, which Git ignores.
