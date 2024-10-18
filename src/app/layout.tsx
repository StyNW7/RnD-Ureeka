import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/pages/navbar'
import AnimatedCursor from "@/pages/CustomCursor";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ThemeToggleButton from "@/components/ui/Toggle";

export const metadata: Metadata = {
  title: "NewmeoW",
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
          <AnimatedCursor />
          <Navbar />
          <ThemeToggleButton />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
