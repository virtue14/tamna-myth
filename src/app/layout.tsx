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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
