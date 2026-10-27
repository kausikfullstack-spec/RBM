import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono, Luckiest_Guy } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Recycle Bin Media — Ideas Worth a Second Look",
  description: "Independent creative production. Fresh perspectives for brand films, campaigns, and content.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${luckiestGuy.variable} h-full scroll-pt-[30px] antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-background font-sans text-foreground selection:bg-brand selection:text-black">{children}</body>
    </html>
  );
}
