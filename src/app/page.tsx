import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mountain, Sparkles, Gamepad2, Images, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
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
          <Link href="/design">
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
