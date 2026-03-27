# 📦 Proof-Based Delivery & Escrow Platform

A Next.js (App Router) frontend application providing a robust, **role-isolated** workflow for managing secure shipments, tracking proofs-of-delivery, processing escrow payments, and handling disputes.

## 🏗️ Role-Based Architecture (Strict Isolation)

This platform is designed as a collection of "mini-apps" inside a single Next.js project. Each user role has its own dedicated directory, layout, and specialized UI components to prevent role confusion and ensure security.

- **Sender Console** (`/app/sender`): Initialize shipments, run multi-proof validation, and release escrow funds.
- **Courier Hub** (`/app/courier`): View assigned deliveries and upload pickup/delivery image proofs.
- **Receiver Portal** (`/app/receiver`): Track inbound packages and complete secure OTP handshakes.
- **Unified Auth** (`/app/(auth)`): Shared login and registration with automatic role-based redirection.

## ✨ Key Features

### 👥 Strict Role Separation
- Isolated routing and navigation per role.
- Middleware-level (Layout) route protection: Users cannot access routes outside their assigned role.
- Role-specific themes (e.g., Sender: Slate, Courier: Blue, Receiver: Purple).

### 📦 Shipment Lifecycle & Escrow
- **States**: `CREATED` → `IN_TRANSIT` → `DELIVERED` → `VERIFIED` → `DISPUTED`.
- **Escrow**: Funds are locked upon shipment creation and can only be released by the Sender after the system validates both courier proofs and receiver OTP.

### 🔒 Security Handshakes
- **Image Proofs**: Mandatory `PICKUP` and `DELIVERY` photo uploads for couriers.
- **OTP Verification**: Secure 6-digit handshake between Receiver and Platform to confirm physical handover.

## 🚀 Getting Started

### Prerequisites
- Backend API running at `http://localhost:5000`.
- Node.js 18+ installed.

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

The app runs on `http://localhost:3001` (if port 3000 is occupied).

### 🧪 Seed Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| **Sender** | `sender@example.com` | `password123` |
| **Courier** | `courier@example.com" | `password123` |
| **Receiver** | `receiver@example.com" | `password123` |

## 📁 Project Structure

```text
/app
  /(auth)     - Shared Login/Register
  /sender     - Sender mini-app routes
  /courier    - Courier mini-app routes
  /receiver   - Receiver mini-app routes
/components
  /ui         - Design system atoms
  /shared     - Reusable business logic components
  /sender     - Sender-specific actions
  /courier    - Courier-specific actions
  /receiver   - Receiver-specific actions
/context      - AuthContext
/lib          - API Client & Auth utilities
```
