import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppProvider } from "@/lib/store";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "YUKTI – Smart Waste Pickup for Guwahati",
  description: "Schedule Your Segregated Waste Pickup in 30 seconds. Smart Source Segregation & Optimized Ward Collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased soft-gradient-bg min-h-screen">
        <AppProvider>
          <Script
            id="orchids-browser-logs"
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
            strategy="afterInteractive"
            data-orchids-project-id="439132ed-3b7d-4752-a946-45bee49ad6e9"
          />
          <ErrorReporter />
          <Script
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
            strategy="afterInteractive"
            data-target-origin="*"
            data-message-type="ROUTE_CHANGE"
            data-include-search-params="true"
            data-only-in-iframe="true"
            data-debug="true"
            data-custom-data='{"appName": "YUKTI", "version": "1.0.0", "greeting": "Welcome to YUKTI"}'
          />
          <Navbar />
          <main className="pt-32 pb-12 px-4 max-w-7xl mx-auto">
            {children}
          </main>
          <Footer />
          <Toaster position="top-center" richColors />
          <VisualEditsMessenger />
        </AppProvider>
      </body>
    </html>
  );
}
