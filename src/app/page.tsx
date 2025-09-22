'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mountain, Sparkles, Gamepad2, Images, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

export default function Home() {
  // 모든 신화 이미지 프리로딩
  useEffect(() => {
    // 모든 신화 이미지 프리로딩
    const mythImages = [
      'https://gdpark-official.notion.site/image/attachment%3A71b6fa9b-e1a2-42d9-9d48-b4e1a6586a18%3A%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC.png?table=block&id=27610da3-ad82-8084-a49c-dc132e6ac241&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      'https://gdpark-official.notion.site/image/attachment%3A5d7cda96-ec7b-4cea-aa2f-d4c6b8a5f546%3A%E1%84%89%E1%85%A1%E1%86%B7%E1%84%89%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC.png?table=block&id=27610da3-ad82-8082-8c0f-e492f14d5b13&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      'https://gdpark-official.notion.site/image/attachment%3Ac5b71d94-8575-4616-a1e0-32ac6818fbcb%3A%E1%84%8C%E1%85%A1%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%87%E1%85%B5.png?table=block&id=27610da3-ad82-8068-abb2-ea9a576fcdfb&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      'https://gdpark-official.notion.site/image/attachment%3A58e9714f-5a6e-4445-a347-40b6054c2b06%3A%E1%84%87%E1%85%A9%E1%86%AB%E1%84%92%E1%85%A3%E1%86%BC%E1%84%83%E1%85%A1%E1%86%BC_%E1%84%89%E1%85%B5%E1%86%AB%E1%84%92%E1%85%AA(%E1%84%86%E1%85%A1%E1%84%8B%E1%85%B3%E1%86%AF_%E1%84%89%E1%85%AE%E1%84%92%E1%85%A9%E1%84%89%E1%85%B5%E1%86%AB).png?table=block&id=27610da3-ad82-8090-8250-fd4d32051887&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      'https://gdpark-official.notion.site/image/attachment%3A977df292-30a3-4c78-9fc3-a526a66b55a9%3A%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%83%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC.png?table=block&id=27610da3-ad82-801f-bb1b-e8c8e56862d6&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      'https://gdpark-official.notion.site/image/attachment%3Aac02e034-63c2-4289-add3-940372dfdee4%3A%E1%84%92%E1%85%A2%E1%84%89%E1%85%B5%E1%86%AB(%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%8B%E1%85%AA%E1%86%BC_%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%89%E1%85%A5%E1%86%AF).png?table=block&id=27610da3-ad82-80d8-ab8d-ebfb757fabdc&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      'https://gdpark-official.notion.site/image/attachment%3A842a5830-1708-4b04-abdb-1655df672d22%3A%E1%84%86%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A9%E1%84%85%E1%85%A7%E1%86%BC.png?table=block&id=27610da3-ad82-80bf-9459-dd1260eb7da0&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      'https://gdpark-official.notion.site/image/attachment%3A50bc7095-e608-46bc-a654-a57f0a230f1b%3A%E1%84%89%E1%85%A6%E1%84%80%E1%85%A7%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB%E1%84%91%E1%85%AE%E1%86%AF%E1%84%8B%E1%85%B5.png?table=block&id=27610da3-ad82-8070-955e-d05e57dd5ded&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      'https://gdpark-official.notion.site/image/attachment%3A8c559453-b909-40b4-a069-89aa57729b14%3A%E1%84%83%E1%85%A9%E1%86%AF%E1%84%92%E1%85%A1%E1%84%85%E1%85%B3%E1%84%87%E1%85%A1%E1%86%BC(%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%89%E1%85%B3%E1%86%BC).png?table=block&id=27610da3-ad82-80be-a71a-ca4d6cfdd52d&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      'https://gdpark-official.notion.site/image/attachment%3Aed208b98-993c-4ded-9395-6d8f260a2dc0%3A%E1%84%8E%E1%85%B5%E1%86%AF%E1%84%89%E1%85%A5%E1%86%BC%E1%84%89%E1%85%B5%E1%86%AB.png?table=block&id=27610da3-ad82-805f-afc8-c470f0a7e621&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2'
    ];

    mythImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="min-h-screen brand-gradient">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-4xl mx-auto">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 animated-gradient drop-shadow-lg">
            탐나는 신화
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-myth-gray-dark mb-4 font-medium">
          탐나는 인재 × 제주 신화
          </p>
          
          <p className="text-sm sm:text-base md:text-lg text-myth-gray max-w-2xl mx-auto leading-relaxed px-2">
            QR을 스캔하는 순간, 제주 신화의 세계가 펼쳐집니다.<br />
            다양한 신화 이야기와 나만의 신화 캐릭터 매칭, 재미있는 게임까지<br />
            <span className="text-base sm:text-lg md:text-xl font-bold text-myth-gray-dark bg-gradient-to-r from-seolmundae-orange-dark to-myth-purple-dark bg-clip-text text-transparent">제주의 모든 신비를 한 번에 경험하세요</span>
          </p>
          
          
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto px-2">
          <Link href="/myths">
            <Card className="text-center hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 bg-white/95 backdrop-blur-md border-gray-200/50 hover:border-orange-300/50 group">
              <CardHeader>
                <div className="mx-auto mb-4 sm:mb-6 p-4 sm:p-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl w-fit shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                  <Mountain className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl text-gray-800 font-bold group-hover:text-orange-600 transition-colors duration-300">제주 신화</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed px-2">
                  다양한 제주 신화를 만나보세요!
                </CardDescription>
                <div className="mt-4 sm:mt-6 text-orange-600 font-bold text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2 group-hover:text-orange-700 transition-colors duration-300">
                  클릭하여 만나보기
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/myth-character">
            <Card className="text-center hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 bg-white/95 backdrop-blur-md border-gray-200/50 hover:border-purple-300/50 group">
              <CardHeader>
                <div className="mx-auto mb-4 sm:mb-6 p-4 sm:p-6 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl w-fit shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                  <Sparkles className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl text-gray-800 font-bold group-hover:text-purple-600 transition-colors duration-300">나의 신화 캐릭터</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed px-2">
                  나만의 신화 캐릭터를 찾아보세요!!
                </CardDescription>
                <div className="mt-4 sm:mt-6 text-purple-600 font-bold text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2 group-hover:text-purple-700 transition-colors duration-300">
                  클릭하여 찾아보기
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/games">
            <Card className="text-center hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 bg-white/95 backdrop-blur-md border-gray-200/50 hover:border-teal-300/50 group">
              <CardHeader>
                <div className="mx-auto mb-4 sm:mb-6 p-4 sm:p-6 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl w-fit shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                  <Gamepad2 className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl text-gray-800 font-bold group-hover:text-teal-600 transition-colors duration-300">탐나는 게임</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed px-2">
                  게임으로 술자리를 즐겁게!!!
                </CardDescription>
                <div className="mt-4 sm:mt-6 text-teal-600 font-bold text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2 group-hover:text-teal-700 transition-colors duration-300">
                  클릭하여 게임하기
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Promotion Button */}
        <div className="flex justify-center mt-8 sm:mt-12">
          <Link href="/promotion">
            <button className="group bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3">
              <Images className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-sm sm:text-base lg:text-lg">프로모션 갤러리 둘러보기</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
