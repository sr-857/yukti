# YUKTI – Smart Waste Pickup

**Yukti** is a next-generation waste management platform for Guwahati, designed to streamline civic services through technology. It enables citizens to schedule segregated waste pickups, report bin overflows, and earn "Green Points" for responsible waste disposal.

## Features

- **Smart Scheduling**: Schedule wet, dry, and e-waste pickups in 30 seconds.
- **Source Segregation**: Mandatory waste categorization to promote recycling.
- **Overflow Reporting**: Rapid response system for reporting overflowing community bins.
- **Green Points**: Earn rewards for every verified verified pickup, redeemable for civic benefits.
- **Interactive Dashboard**: Track pickup status and environmental impact in real-time.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Visual Effects**: Framer Motion, Three.js (@react-three/fiber)
- **Database**: Drizzle ORM with LibSQL (Turso)
- **Authentication**: Better-Auth

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/sr-857/yukti.git
    cd yukti
    ```

2.  **Install dependencies**
    > **Note**: This project requires `legacy-peer-deps` due to dependency constraints.
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Configure Environment Variables**
    Copy the example environment file and fill in your values.
    ```bash
    cp .env.example .env.local
    ```
    Required variables:
    - `TURSO_DATABASE_URL` & `TURSO_AUTH_TOKEN` (Database)
    - `BETTER_AUTH_SECRET` & `BETTER_AUTH_URL` (Authentication)
    - `STRIPE_API_KEY` (Optional - for payments)

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment on Vercel

This project is configured for deployment on [Vercel](https://vercel.com).

1.  **Push to GitHub**: Ensure your code is pushed to a repository.
2.  **Import Project**: Import the repository in Vercel.
3.  **Environment Variables**: Add the required environment variables in the Vercel dashboard (Project Settings > Environment Variables).
4.  **Deploy**: Vercel will detect the Next.js project and deploy it.

> **Important**: An `.npmrc` file is included in the repository to automatically enforce `legacy-peer-deps=true` during the Vercel build process. You do not need to configure this manually.
