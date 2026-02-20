# Agent Instructions: API & Frontend Integration

Purpose
- Provide a concise reference for agents working on the frontend and integrating with the backend API.

Backend API Summary
- GET /api/resources
  - Returns: 200 JSON array of resource documents where `pending: false`.
  - Each document shape (Mongo document):
    - `_id` (ObjectId)
    - `name` (string) — visible resource name
    - `description` (string, optional)
    - `link` (string, optional)
    - `phone_number` (string, optional)
    - `categories` (string[])
    - `createdAt` (ISO date)
    - `pending` (boolean)

- POST /api/resources
  - Body JSON: `{ name: string, description?: string, link?: string, phone_number?: string, categories?: string[] }`
  - Creates a document with `pending: true` and returns `201 { insertedId }`.
  - Validation: `name` required; `categories` if present must be string[]

- DELETE /api/resources?id=<id>  (requires admin)
  - Query param: `id` (string ObjectId)
  - Requires Authorization header: `Bearer <token>`
  - Returns 200 `{ deleted: true }` or 404 if not found.

- POST /api/auth/login
  - Body JSON: `{ password: string }`
  - Returns 200 `{ token: string }` if password matches `process.env.ADMIN_PASSWORD`.
  - Token is a JWT (signed with `process.env.JWT_SECRET`) and is valid for 8 hours.

- /api/admin/resources  (protected; middleware `requireAdmin`)
  - GET: returns pending resources (those with `pending: true`).
  - POST: body `{ id: string, approve: boolean }`
    - If `approve: true` -> sets `pending: false` for the document -> returns `{ approved: true }`.
    - If `approve: false` -> deletes the document -> returns `{ deleted: true }`.
  - Requires Authorization header: `Bearer <token>`

Auth Details
- The admin middleware expects `Authorization: Bearer <token>` header.
- Token produced by `/api/auth/login` is a JWT. Use that header for admin-only endpoints.

Frontend notes & mapping
- Current frontend `Resource` interface (src/constants/interface.ts):
  - `title: string; link?: string; phone?: string; description?: string; categories: string[]`
- Backend uses `name` and `phone_number` fields. Frontend will need to map backend fields to the UI model:
  - `title` <- `name`
  - `phone` <- `phone_number`
  - `description` <- `description`
  - `link` <- `link`
  - `categories` <- `categories` (direct)

Recommended frontend tasks (next actions)
- Replace hardcoded `sampleResources` with real data fetched from `GET /api/resources`.
  - Fetch on mount, map fields (`name` -> `title`, `phone_number` -> `phone`).
  - Handle loading / error states.

- Implement new-resource submission form that POSTs to `/api/resources`:
  - POST body must use backend field names (`name`, `phone_number`, `categories`, ...).
  - Notify user that submission is pending moderation.

- Admin workflow (optional next step):
  - Implement admin login form that POSTs `{ password }` to `/api/auth/login` and stores token.
  - Use token in `Authorization: Bearer <token>` header to call `/api/admin/resources` and approve/delete.

Examples (fetch patterns)
- Get resources:
  ```js
  const res = await fetch('/api/resources');
  const data = await res.json();
  // Map backend -> UI
  const uiResources = data.map(d => ({
    id: d._id,
    title: d.name,
    description: d.description,
    link: d.link,
    phone: d.phone_number,
    categories: d.categories || []
  }));
  ```

- Create resource:
  ```js
  await fetch('/api/resources', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, link, phone_number, categories })
  });
  ```

- Admin approve/delete request:
  ```js
  await fetch('/api/admin/resources', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ id: resourceId, approve: true })
  });
  ```

Notes & gotchas
- Backend expects `phone_number` (snake_case) and `name` — keep payload names exact when POSTing.
- DELETE `/api/resources` expects `id` as query parameter (not JSON body).
- Admin token expiry: 8 hours per server code.
