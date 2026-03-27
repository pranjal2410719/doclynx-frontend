import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DocLynx | Verified Delivery Network",
  description: "Advanced verification-first delivery infrastructure and corporate manifest management.",
  metadataBase: new URL("https://doclynx-backend.onrender.com"),
  openGraph: {
    title: "DocLynx | Verified Delivery Network",
    description: "Advanced verification-first delivery infrastructure and corporate manifest management.",
    url: "https://doclynx-backend.onrender.com",
    siteName: "DocLynx",
    images: [
      {
        url: "/image-removebg-preview.png",
        width: 1200,
        height: 630,
        alt: "DocLynx Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocLynx | Verified Delivery Network",
    description: "Advanced verification-first delivery infrastructure and corporate manifest management.",
    images: ["/image-removebg-preview.png"],
  },
  icons: {
    icon: "/image-removebg-preview.png",
    apple: "/image-removebg-preview.png",
  },
};

import GlobalSecurity from "@/components/GlobalSecurity";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <GlobalSecurity />
        <AuthProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
