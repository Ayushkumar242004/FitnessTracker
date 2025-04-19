import type { Metadata } from "next";
import "./globals.css";

// Suppress hydration warnings in the console (optional)
if (typeof window !== "undefined") {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Warning: Expected server HTML to match client HTML")
    ) {
      return; // Suppress hydration warnings
    }
    originalConsoleError(...args);
  };
}

// Metadata for the application
export const metadata: Metadata = {
  title: "Cyber Fitness",
  description: "Created by Ayush Kumar",
  generator: "Cyberpunk Fitness Builder",
};

// Root layout component wrapping the application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
