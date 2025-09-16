import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mountain, Sparkles, Gamepad2, ArrowRight } from 'lucide-react';
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
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-seolmundae-orange-dark via-myth-purple-dark to-myth-teal-dark bg-clip-text text-transparent drop-shadow-lg">
            탐나는 신화
          </h1>
          
          <p className="text-xl md:text-2xl text-myth-gray-dark mb-4 font-medium">
          탐나는 인재 × 제주 신화
          </p>
          
          <p className="text-lg text-myth-gray max-w-2xl mx-auto leading-relaxed">
            QR을 스캔하는 순간, 제주 신화의 세계가 펼쳐집니다.<br />
            다양한 신화 이야기와 나만의 신화 캐릭터 매칭, 재미있는 게임까지<br />
            <span className="text-xl font-bold text-myth-gray-dark bg-gradient-to-r from-seolmundae-orange-dark to-myth-purple-dark bg-clip-text text-transparent">제주의 모든 신비를 한 번에 경험하세요</span>
          </p>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-8">
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Link href="/myths">
            <Card className="text-center hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 bg-white/95 backdrop-blur-md border-gray-200/50 hover:border-orange-300/50 group">
              <CardHeader>
                <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl w-fit shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                  <Mountain className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800 font-bold group-hover:text-orange-600 transition-colors duration-300">제주 신화</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">
                  소주 라벨별로 다른 제주 신화를 만나보세요. 
                  각 신화마다 특별한 이야기와 의미가 담겨있습니다.
                </CardDescription>
                <div className="mt-6 text-orange-600 font-bold text-lg flex items-center justify-center gap-2 group-hover:text-orange-700 transition-colors duration-300">
                  클릭하여 탐험하기
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/myth-character">
            <Card className="text-center hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 bg-white/95 backdrop-blur-md border-gray-200/50 hover:border-purple-300/50 group">
              <CardHeader>
                <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl w-fit shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800 font-bold group-hover:text-purple-600 transition-colors duration-300">나의 신화 캐릭터</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">
                  당신의 성격 유형에 맞는 신화 캐릭터를 찾아보세요. 
                  AI가 분석한 당신만의 특별한 신화 캐릭터를 만나보세요.
                </CardDescription>
                <div className="mt-6 text-purple-600 font-bold text-lg flex items-center justify-center gap-2 group-hover:text-purple-700 transition-colors duration-300">
                  클릭하여 매칭하기
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/games">
            <Card className="text-center hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 bg-white/95 backdrop-blur-md border-gray-200/50 hover:border-teal-300/50 group">
              <CardHeader>
                <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl w-fit shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                  <Gamepad2 className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800 font-bold group-hover:text-teal-600 transition-colors duration-300">탐나는 게임</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">
                  친구들과 함께 즐길 수 있는 재미있는 술자리 게임을 제공합니다.<br/>
                  다양한 게임을 즐겨보세요.
                </CardDescription>
                <div className="mt-6 text-teal-600 font-bold text-lg flex items-center justify-center gap-2 group-hover:text-teal-700 transition-colors duration-300">
                  클릭하여 게임하기
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
