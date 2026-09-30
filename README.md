# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

## Run locally

Install Node.js 20.19+ (or 22.12+) first, then start the project with the script for your operating system:

- Windows: double-click `start.bat` or run it from Command Prompt.
- macOS/Linux: run `./start.sh` from a terminal. If needed, make it executable with `chmod +x start.sh`.

The start script installs dependencies from `package-lock.json`, then starts the API at `http://localhost:3001` and the Vite site at `http://localhost:5173`. Use `stop.bat` on Windows or `./stop.sh` on macOS/Linux to stop both, or press Ctrl+C in the start terminal.

The API requires PostgreSQL settings in the root `.env` file: `DB_USER`, `DB_HOST`, `DB_NAME`, `DB_PASSWORD`, and optionally `DB_PORT`. The starter values in `.env.example` must be replaced with valid database credentials before starting the API.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
# technoziant
