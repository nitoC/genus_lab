import type { Metadata } from "next";
import { Geist_Mono, Inter, Oswald } from "next/font/google";
import { clsx } from "clsx";
import "./globals.css";
<<<<<<< HEAD
import Provider from "@/providers/Provider";
import { ToastContainer } from "react-toastify";
=======
>>>>>>> dd4dc89641c5eaf5a11b295879c78fbf443aafc6

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
<<<<<<< HEAD
        <ToastContainer />
        <Provider>{children}</Provider>
=======
        {children}
>>>>>>> dd4dc89641c5eaf5a11b295879c78fbf443aafc6
      </body>
    </html>
  );
}
