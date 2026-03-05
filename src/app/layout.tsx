import type { Metadata } from "next";
import { Bungee_Shade, Caveat, Inter } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const bungeeShade = Bungee_Shade({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee-shade",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portugal Trip 😁",
  description: "Our trip to Portugal and beyond!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${caveat.variable} ${inter.variable} ${bungeeShade.variable} font-body bg-cream antialiased`}>
        {children}
      </body>
    </html>
  );
}
