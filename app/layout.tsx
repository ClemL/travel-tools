import type { Metadata, Viewport } from "next";
import "./globals.css";
import OfflineProvider from "@/components/OfflineProvider";
import CityProvider from "@/components/CityProvider";
import DismissProvider from "@/components/DismissProvider";

export const metadata: Metadata = {
  title: "Asia Trip Tools — Taipei · Hong Kong · Seoul",
  description:
    "Currency, live weather, September climate normals, and on-the-ground logistics for Taipei, Hong Kong and Seoul.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1116" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <OfflineProvider>
          <CityProvider>
            <DismissProvider>{children}</DismissProvider>
          </CityProvider>
        </OfflineProvider>
      </body>
    </html>
  );
}
