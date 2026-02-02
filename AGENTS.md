## Project Summary
YUKTI is a production-grade civic-tech SaaS platform built for the Guwahati Municipal Corporation. It features a dual-actor ecosystem: a high-fidelity Citizen Interface for scheduling segregated waste pickups and earning "Green Points," and a sophisticated Collector Dashboard with real-time routing logic and geospatial visualization.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **State Management:** Custom React Context + LocalStorage Persistence (`src/lib/store.tsx`)
- **Styling:** Tailwind CSS 4, Framer Motion
- **Components:** Radix UI, Lucide Icons, NumberFlow (for animated counters)
- **UI Patterns:** Glassmorphism, Premium SaaS Aesthetics, Soft Gradients (#1FAF5A, #0FB9B1)

## Architecture
- `src/app/`: Citizen Home (`/`), Rewards (`/rewards`), Collector Hub (`/dashboard`)
- `src/components/`: Premium global components (Navbar, Footer, UI primitives)
- `src/lib/`: Core logic, shared state store, and utility functions
- `src/visual-edits/`: Orchids visual editing integration

## User Preferences
- **Theme:** "SaaS-grade" polish similar to Notion or Urban Company.
- **Visuals:** Heavy use of glassmorphism, soft shadows, and distinctive typography.
- **Functionality:** Real-time data sync between citizen actions and collector views.

## Project Guidelines
- All shared state must reside in `src/lib/store.tsx` to ensure UI consistency.
- Maintain a "Government + Startup" collaboration aesthetic.
- Ensure 100% mobile responsiveness for on-field collector usage.

## Common Patterns
- **Glassmorphism:** Use `.glass-card` for all container elements.
- **Animations:** Use `AnimatePresence` for smooth page and state transitions.
- **Feedback:** Proactive use of `sonner` toasts for all user interactions.
