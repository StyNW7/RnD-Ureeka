import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/pages/navbar'
import AnimatedCursor from "@/pages/CustomCursor";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const metadata: Metadata = {
  title: "NeWmeow",
  description: "Fullstack RnD Ureeka Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/cats/kittens1.gif" type="image/gif" />
      <body>
        <ThemeProvider>
          <Navbar />
          <AnimatedCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
