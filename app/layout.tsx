import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recycle Bin Media — Ideas Worth a Second Look",
  description: "Independent creative production. Fresh perspectives for brand films, campaigns, and content.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth scroll-pt-[30px] antialiased motion-reduce:scroll-auto`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-background font-sans text-foreground selection:bg-brand selection:text-black">{children}</body>
    </html>
  );
}
