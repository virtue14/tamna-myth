import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, RotateCcw, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <Header />
      
      <div className="pt-16"></div>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-2xl">
                <Gamepad2 className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent">
              탐나는 게임
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-6 font-medium max-w-2xl mx-auto px-4">
              친구들과 함께 즐길 수 있는 재미있는 게임들
            </p>
          </section>

          {/* Games Grid */}
          <section className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Roulette Game */}
            <Link href="/games/roulette">
              <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 bg-white/90 backdrop-blur-md shadow-xl border-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 sm:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 sm:p-4 bg-white/20 rounded-full shadow-lg">
                      <RotateCcw className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-bold">룰렛 게임</CardTitle>
                  </div>
                  <CardDescription className="text-base sm:text-lg text-white/90">
                    커스텀 가능한 룰렛을 돌려서 재미있는 미션과 벌칙을 수행해보세요!
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm sm:text-base text-gray-600">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>룰렛 항목 추가/삭제 가능</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm sm:text-base text-gray-600">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>벌칙과 미션 구분</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm sm:text-base text-gray-600">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>실시간 룰렛 회전</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-600 font-bold text-lg">게임 시작</span>
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Balance Game */}
            <Link href="/games/balance">
              <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 bg-white/90 backdrop-blur-md shadow-xl border-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-6 sm:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 sm:p-4 bg-white/20 rounded-full shadow-lg">
                      <HelpCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-bold">밸런스 게임</CardTitle>
                  </div>
                  <CardDescription className="text-base sm:text-lg text-white/90">
                    50개의 다양한 밸런스 게임으로 재미있는 선택과 미션을 즐겨보세요!
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm sm:text-base text-gray-600">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span>50개 무작위 질문</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm sm:text-base text-gray-600">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span>제주 신화 테마</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm sm:text-base text-gray-600">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span>선택에 따른 미션 수행</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-600 font-bold text-lg">게임 시작</span>
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}