import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StreamPulse",
  description: "Live streaming platform with real-time chat. Watch streams and chat with viewers instantly.",
  keywords: ["streaming", "live chat", "video player", "HLS", "real-time", "Next.js", "Video.js", "Firebase", "Clerk"],
  authors: [{ name: "koniz-dev" }],
  openGraph: {
    title: "StreamPulse - Live Streaming & Chat",
    description: "Live streaming platform with real-time chat. Watch streams and chat with viewers instantly.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "StreamPulse - Live Streaming & Chat",
    description: "Live streaming platform with real-time chat. Watch streams and chat with viewers instantly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
