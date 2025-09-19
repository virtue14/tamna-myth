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
  title: "탐나는 신화 | 한라산 소주 × 제주 신화",
  description: "한라산 소주와 제주 신화가 만나는 특별한 경험. 소주 라벨 QR을 통해 신화의 세계로 떠나보세요.",
  keywords: ["제주", "신화", "소주", "한라산", "QR", "MBTI", "술게임"],
  authors: [{ name: "탐나는 신화 팀" }],
  openGraph: {
    title: "탐나는 신화 | 한라산 소주 × 제주 신화",
    description: "한라산 소주와 제주 신화가 만나는 특별한 경험",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Critical Resource Hints for instant loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/images/설문대할망.png" />
        <link rel="preload" as="image" href="/images/삼승할망.png" />
        <link rel="preload" as="image" href="/images/자청비.png" />
        <link rel="preload" as="image" href="/images/본향당 신화(마을 수호신).png" />
        <link rel="preload" as="image" href="/images/영등할망.png" />
        <link rel="preload" as="image" href="/images/해신(용왕 전설).png" />
        <link rel="preload" as="image" href="/images/문도령.png" />
        <link rel="preload" as="image" href="/images/세경본풀이.png" />
        <link rel="preload" as="image" href="/images/돌하르방(장승).png" />
        <link rel="preload" as="image" href="/images/칠성신.png" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//api.openai.com" />
        
        {/* Prefetch critical pages */}
        <link rel="prefetch" href="/myths" />
        <link rel="prefetch" href="/myth-character" />
        <link rel="prefetch" href="/games" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
