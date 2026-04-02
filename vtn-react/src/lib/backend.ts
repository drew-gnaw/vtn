// Central backend URL configuration.
// - During development (vite `dev`), Vite sets `import.meta.env.MODE === 'development'`.
// - Allow override with `VITE_API_BASE` env var.

const env = (import.meta as any).env ?? {};

const FALLBACK_DEV = 'http://localhost:4321';
const FALLBACK_PROD = 'https://vtn-server.vercel.app';

const BACKEND_URL = (() => {
  // env.VITE_API_BASE takes highest precedence
  if (env.VITE_API_BASE) return env.VITE_API_BASE.replace(/\/$/, '');

  // If running vite dev server, MODE is 'development'
  if (env.MODE === 'development') return FALLBACK_DEV;

  // Otherwise assume production
  return FALLBACK_PROD;
})();

export default BACKEND_URL;

export function apiPath(path: string) {
  return `${BACKEND_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
