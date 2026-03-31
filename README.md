# DocLynx — Proof-Based Delivery & Escrow Platform

> Secure shipment management with image proofs, OTP handshakes, and escrow-locked payments.

🌐 **Live Demo:** [https://doclynx.netlify.app](https://doclynx.netlify.app)

---

## What It Does

DocLynx is a role-isolated delivery platform built with **Next.js 16 (App Router)**. Each user role operates in its own mini-app with dedicated routes, layouts, and UI — preventing cross-role access and confusion.

| Role | Route | Responsibility |
| :--- | :--- | :--- |
| **Sender** | `/sender` | Create shipments, validate proofs, release escrow |
| **Courier** | `/courier` | View deliveries, upload pickup & delivery photos |
| **Receiver** | `/receiver` | Track packages, complete OTP handshake |

---

## Shipment Lifecycle

```
CREATED → IN_TRANSIT → DELIVERED → VERIFIED → DISPUTED
```

Escrow funds are **locked on creation** and only released by the Sender after the system validates courier image proofs + receiver OTP.

---

## Try It Live

**URL:** [https://doclynx.netlify.app](https://doclynx.netlify.app)

Use these seed accounts to explore each role:

| Role | Email | Password |
| :--- | :--- | :--- |
| Sender | `sender@example.com` | `password123` |
| Courier | `courier@example.com` | `password123` |
| Receiver | `receiver@example.com` | `password123` |

> Login redirects automatically to your role's dashboard.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **Scroll:** Lenis smooth scroll
- **Auth:** JWT-based with role-aware redirection
- **Backend:** REST API at `http://localhost:5000`

---

## Run Locally

```bash
# Prerequisites: Node.js 18+, backend running on :5000

npm install
npm run dev
```

App starts at `http://localhost:3000` (or `:3001` if occupied).

---

## Project Structure

```
/app
  /(auth)       Login & Register (shared, auto role-redirect)
  /sender       Sender Console
  /courier      Courier Hub
  /receiver     Receiver Portal
  /legal        Legal pages

/components
  /ui           Design system atoms
  /shared       Reusable business components
  /sender       Sender-specific components
  /courier      Courier-specific components
  /receiver     Receiver-specific components

/context        AuthContext (global auth state)
/lib            api.ts · auth.ts
/types          Shared TypeScript types
```

---

## Security Model

- Route protection enforced at the **Layout level** per role
- Role-specific themes: Sender → Slate · Courier → Blue · Receiver → Purple
- Courier must upload `PICKUP` + `DELIVERY` photos before escrow can be released
- Receiver confirms handover via a **6-digit OTP**

---

## Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

