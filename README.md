<div align="center">

<img src="public/image-removebg-preview.png" alt="DocLynx Logo" width="120" />

# DocLynx

**Proof-Based Delivery & Escrow Platform**

*Secure shipment management with image proofs, OTP handshakes, and escrow-locked payments.*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-doclynx.netlify.app-blue?style=for-the-badge)](https://doclynx.netlify.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## Overview

DocLynx is a role-isolated delivery platform where every user role operates as its own mini-app — dedicated routes, layouts, and UI components — preventing cross-role access and confusion.

Escrow funds are **locked on shipment creation** and only released after the system validates courier image proofs and receiver OTP confirmation.

---

## Roles

| Role | Route | Responsibility |
| :--- | :--- | :--- |
| **Sender** | `/sender` | Create shipments, validate proofs, release escrow, raise disputes |
| **Courier** | `/courier` | View assigned deliveries, upload pickup & delivery photos |
| **Receiver** | `/receiver` | Track inbound packages, complete OTP handshake |

---

## Shipment Lifecycle

```
CREATED → IN_TRANSIT → DELIVERED → VERIFIED → DISPUTED
```

| Status | Trigger |
| :--- | :--- |
| `CREATED` | Sender creates shipment, escrow locked |
| `IN_TRANSIT` | Courier uploads pickup proof |
| `DELIVERED` | Courier uploads delivery proof |
| `VERIFIED` | Receiver confirms via OTP + Sender releases escrow |
| `DISPUTED` | Sender raises a dispute |

---

## Security Model

- **Route protection** enforced at the Layout level per role — no middleware bypass
- **Image Proofs** — Courier must upload both `PICKUP` and `DELIVERY` photos
- **OTP Handshake** — 6-digit code confirms physical handover by the Receiver
- **Escrow** — Payment stays `LOCKED` until all checks pass: pickup proof ✓ delivery proof ✓ receiver confirmed ✓
- **JWT Auth** — Token stored client-side, auto-cleared on `401`, redirects to `/login`

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 16.2 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Smooth Scroll | Lenis 1.3 |
| Auth | JWT — role-aware redirection |
| Backend | REST API (`NEXT_PUBLIC_API_BASE_URL`, default `:5000`) |
| React | React 19 |

---

## Getting Started

**Prerequisites:** Node.js 18+, backend running on `:5000`

```bash
git clone https://github.com/pranjal2410719/doclynx-frontend.git
cd doclynx-frontend
npm install
npm run dev
```

App runs at `http://localhost:3000` (or `:3001` if occupied).

### Environment Variable

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

---

## Try It Live

**[https://doclynx.netlify.app](https://doclynx.netlify.app)**

| Role | Email | Password |
| :--- | :--- | :--- |
| Sender | `sender@example.com` | `password123` |
| Courier | `courier@example.com` | `password123` |
| Receiver | `receiver@example.com` | `password123` |

> Login auto-redirects to your role's dashboard.

---

## Project Structure

```
doclynx-frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/          # Shared login page
│   │   └── register/       # Shared register page
│   ├── sender/
│   │   ├── dashboard/      # Sender overview
│   │   ├── shipment/       # Create & view shipments
│   │   ├── dispute/        # Raise disputes
│   │   └── layout.tsx      # Sender route guard + theme
│   ├── courier/
│   │   ├── dashboard/      # Courier overview
│   │   ├── shipment/[id]/  # Upload proofs
│   │   └── layout.tsx      # Courier route guard + theme
│   ├── receiver/
│   │   ├── dashboard/      # Receiver overview
│   │   ├── shipment/[id]/  # OTP confirmation
│   │   └── layout.tsx      # Receiver route guard + theme
│   └── legal/              # Privacy & Terms pages
│
├── components/
│   ├── ui.tsx              # Design system atoms
│   ├── shared/
│   │   └── ShipmentDetail  # Shared shipment view
│   ├── sender/             # SenderActions
│   ├── courier/            # CourierActions
│   └── receiver/           # ReceiverActions
│
├── context/
│   └── AuthContext.tsx     # Global auth state + role routing
│
├── lib/
│   ├── api.ts              # Typed fetch client (Bearer token, FormData, 401 guard)
│   └── auth.ts             # Token storage helpers
│
└── types/
    └── index.ts            # Shared TypeScript types
```

---

## Key Types

```ts
type ShipmentStatus = "CREATED" | "IN_TRANSIT" | "DELIVERED" | "VERIFIED" | "DISPUTED";
type PaymentStatus  = "LOCKED"  | "RELEASED"   | "FAILED";
type ProofType      = "PICKUP"  | "DELIVERY";
type DisputeStatus  = "OPEN"    | "UNDER_REVIEW" | "RESOLVED";
```

---

## Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
