import type { Metadata } from "next";
import { Geist_Mono, Inter, Oswald } from "next/font/google";
import { clsx } from "clsx";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const InterFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// const gothicM = Gothic_A1({
//   variable: "--font-gothic",
//   weight: ["800", "700", "400", "500"],
// });

export const metadata: Metadata = {
  title: "Genus Labs",
  description: "Tech Innovation in africa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          InterFont.variable,
          geistMono.variable,
          `antialiased`,
          oswald.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
