# 🌿 YUKTI – Smart Waste Pickup for Guwahati

**Yukti** is a next-generation civic platform built in collaboration with **Guwahati Municipal Corporation (GMC)**. It leverages technology to optimize ward-level waste collection through smart source segregation and citizen-centric rewards.

---

## 🚀 Key Features

- **📱 30-Second Scheduling**: Effortlessly schedule pickups for **Wet**, **Dry**, and **E-Waste**.
- **♻️ Source Segregation**: Mandatory categorization at the source to ensure maximum recycling efficiency.
- **🚨 Overflow Reporting**: A rapid-response system for citizens to report overflowing community bins with visual evidence.
- **🌱 Green Points**: A gamified reward system where citizens earn points for every responsible waste disposal action.
- **📊 Interactive Analytics**: Real-time tracking of collection efficiency, ward-wise participation, and environmental impact.

---

## 🛠️ Technology Stack

- **Core**: [Next.js 15+](https://nextjs.org/) (App Router)
- **UI/UX**: [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide Icons](https://lucide.dev/)
- **Graphics**: [Three.js](https://threejs.org/) & [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- **Data Layer**: [Drizzle ORM](https://orm.drizzle.team/) with [Turso (LibSQL)](https://turso.tech/)
- **Auth**: [Better-Auth](https://www.better-auth.com/)
- **State**: Custom React Context Store with LocalStorage persistence

---

## 📦 Project Structure

```text
src/
├── app/            # Next.js App Router (Dashboard, Rewards, API)
├── components/     # Reusable UI components (Navbar, Footer, Shadcn UI)
├── lib/            # Shared logic, store, and constants
├── visual-edits/   # Custom loader for visual telemetry
└── ...
```

---

## 🛠️ Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/sr-857/yukti.git
cd yukti
npm install --legacy-peer-deps
```

### 2. Environment Setup
Create a `.env.local` file based on `.env.example`:
```bash
# Database
TURSO_DATABASE_URL=your_turso_url
TURSO_AUTH_TOKEN=your_auth_token

# Authentication
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
```

### 3. Development
```bash
npm run dev
```

---

## 🌐 Deployment

This project is optimized for deployment on the **Vercel Platform**.

- **Automatic Build Path**: The project includes an `.npmrc` to handle strict peer dependency requirements automatically.
- **Next.js Update**: Version pinned to a patched release to ensure security (CVE-2025-66478 resolved).

---

## 🤝 Contribution

We welcome contributions to make Guwahati cleaner and smarter! Please open an issue or submit a pull request.

---

*Developed for GMC Ward Optimization.*
