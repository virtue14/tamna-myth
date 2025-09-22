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
        <link rel="preload" as="image" href="https://gdpark-official.notion.site/image/attachment%3A71b6fa9b-e1a2-42d9-9d48-b4e1a6586a18%3A%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC.png?table=block&id=27610da3-ad82-8084-a49c-dc132e6ac241&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2" />
        <link rel="preload" as="image" href="https://gdpark-official.notion.site/image/attachment%3A5d7cda96-ec7b-4cea-aa2f-d4c6b8a5f546%3A%E1%84%89%E1%85%A1%E1%86%B7%E1%84%89%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC.png?table=block&id=27610da3-ad82-8082-8c0f-e492f14d5b13&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2" />
        <link rel="preload" as="image" href="https://gdpark-official.notion.site/image/attachment%3Ac5b71d94-8575-4616-a1e0-32ac6818fbcb%3A%E1%84%8C%E1%85%A1%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%87%E1%85%B5.png?table=block&id=27610da3-ad82-8068-abb2-ea9a576fcdfb&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2" />
        <link rel="preload" as="image" href="https://gdpark-official.notion.site/image/attachment%3A58e9714f-5a6e-4445-a347-40b6054c2b06%3A%E1%84%87%E1%85%A9%E1%86%AB%E1%84%92%E1%85%A3%E1%86%BC%E1%84%83%E1%85%A1%E1%86%BC_%E1%84%89%E1%85%B5%E1%86%AB%E1%84%92%E1%85%AA(%E1%84%86%E1%85%A1%E1%84%8B%E1%85%B3%E1%86%AF_%E1%84%89%E1%85%AE%E1%84%92%E1%85%A9%E1%84%89%E1%85%B5%E1%86%AB).png?table=block&id=27610da3-ad82-8090-8250-fd4d32051887&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2" />
        <link rel="preload" as="image" href="https://gdpark-official.notion.site/image/attachment%3A977df292-30a3-4c78-9fc3-a526a66b55a9%3A%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%83%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC.png?table=block&id=27610da3-ad82-801f-bb1b-e8c8e56862d6&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2" />
        <link rel="preload" as="image" href="https://gdpark-official.notion.site/image/attachment%3Aac02e034-63c2-4289-add3-940372dfdee4%3A%E1%84%92%E1%85%A2%E1%84%89%E1%85%B5%E1%86%AB(%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%8B%E1%85%AA%E1%86%BC_%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%89%E1%85%A5%E1%86%AF).png?table=block&id=27610da3-ad82-80d8-ab8d-ebfb757fabdc&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2" />
        <link rel="preload" as="image" href="https://gdpark-official.notion.site/image/attachment%3A842a5830-1708-4b04-abdb-1655df672d22%3A%E1%84%86%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A9%E1%84%85%E1%85%A7%E1%86%BC.png?table=block&id=27610da3-ad82-80bf-9459-dd1260eb7da0&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2" />
        <link rel="preload" as="image" href="https://gdpark-official.notion.site/image/attachment%3A50bc7095-e608-46bc-a654-a57f0a230f1b%3A%E1%84%89%E1%85%A6%E1%84%80%E1%85%A7%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB%E1%84%91%E1%85%AE%E1%86%AF%E1%84%8B%E1%85%B5.png?table=block&id=27610da3-ad82-8070-955e-d05e57dd5ded&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2" />
        <link rel="preload" as="image" href="https://gdpark-official.notion.site/image/attachment%3A8c559453-b909-40b4-a069-89aa57729b14%3A%E1%84%83%E1%85%A9%E1%86%AF%E1%84%92%E1%85%A1%E1%84%85%E1%85%B3%E1%84%87%E1%85%A1%E1%86%BC(%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%89%E1%85%B3%E1%86%BC).png?table=block&id=27610da3-ad82-80be-a71a-ca4d6cfdd52d&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2" />
        <link rel="preload" as="image" href="https://gdpark-official.notion.site/image/attachment%3Aed208b98-993c-4ded-9395-6d8f260a2dc0%3A%E1%84%8E%E1%85%B5%E1%86%AF%E1%84%89%E1%85%A5%E1%86%BC%E1%84%89%E1%85%B5%E1%86%AB.png?table=block&id=27610da3-ad82-805f-afc8-c470f0a7e621&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2" />
        
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
