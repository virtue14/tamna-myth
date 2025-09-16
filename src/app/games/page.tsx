import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, RotateCcw, HelpCircle, Users, ArrowRight, Trophy, Settings } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GamesPage() {
  return (
    <div className="min-h-screen brand-gradient">
      <Header />
      

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-white/20 rounded-full backdrop-blur-sm shadow-lg">
                <Gamepad2 className="h-20 w-20 text-seolmundae-orange-dark" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-seolmundae-orange-dark via-myth-purple-dark to-myth-teal-dark bg-clip-text text-transparent drop-shadow-lg">
              탐나는 게임
            </h1>
            
            <p className="text-xl text-myth-gray-dark mb-6 font-medium">
              친구들과 함께 즐길 수 있는 재미있는 게임들
            </p>
          </section>

          {/* Games Grid */}
          <section className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Random Roulette Game */}
            <Link href="/games/roulette">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 bg-gradient-to-br from-white to-seolmundae-orange-light border-seolmundae-orange hover:border-seolmundae-gold">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 bg-gradient-to-r from-seolmundae-orange to-seolmundae-gold rounded-full shadow-xl border-2 border-seolmundae-gold">
                      <RotateCcw className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-myth-gray-dark font-bold">랜덤 룰렛</CardTitle>
                  </div>
                  <CardDescription className="text-lg">
                    룰렛을 돌려서 랜덤한 술자리 규칙이나 질문을 받아보세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-white/80 p-4 rounded-lg border-2 border-seolmundae-orange-light">
                      <h4 className="font-bold text-myth-gray-dark mb-3 text-lg">게임 규칙:</h4>
                      <ul className="text-myth-gray space-y-2">
                        <li>• 룰렛을 돌려서 나온 규칙을 따라하세요</li>
                        <li>• 거부하면 벌칙을 받아야 합니다</li>
                        <li>• 모든 사람이 한 번씩 돌려보세요</li>
                      </ul>
                    </div>
                    <Button className="w-full text-lg font-bold" size="lg">
                      <RotateCcw className="mr-2 h-5 w-5" />
                      룰렛 돌리기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Question Cards Game */}
            <Link href="/games/questions">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 bg-gradient-to-br from-white to-myth-teal-light border-myth-teal hover:border-myth-teal-light">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 bg-gradient-to-r from-myth-teal to-myth-teal-dark rounded-full shadow-xl border-2 border-myth-teal-light">
                      <HelpCircle className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-myth-gray-dark font-bold">질문 카드</CardTitle>
                  </div>
                  <CardDescription className="text-lg">
                    신화와 관련된 재미있는 질문들로 대화를 이어가보세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-white/80 p-4 rounded-lg border-2 border-myth-teal-light">
                      <h4 className="font-bold text-myth-gray-dark mb-3 text-lg">게임 규칙:</h4>
                      <ul className="text-myth-gray space-y-2">
                        <li>• 카드를 뽑아서 질문에 답하세요</li>
                        <li>• 솔직하게 답하면 더 재미있어요</li>
                        <li>• 다른 사람의 답변도 들어보세요</li>
                      </ul>
                    </div>
                    <Button className="w-full text-lg font-bold" size="lg">
                      <HelpCircle className="mr-2 h-5 w-5" />
                      카드 뽑기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Team Game */}
            <Link href="/games/team">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 bg-gradient-to-br from-white to-myth-purple-light border-myth-purple hover:border-myth-purple-light">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 bg-gradient-to-r from-myth-purple to-myth-purple-dark rounded-full shadow-xl border-2 border-myth-purple-light">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-myth-gray-dark font-bold">팀 게임</CardTitle>
                  </div>
                  <CardDescription className="text-lg">
                    신화 캐릭터를 맞추거나 팀을 나누어 게임을 즐겨보세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-white/80 p-4 rounded-lg border-2 border-myth-purple-light">
                      <h4 className="font-bold text-myth-gray-dark mb-3 text-lg">게임 종류:</h4>
                      <ul className="text-myth-gray space-y-2">
                        <li>• 신화 캐릭터 맞추기</li>
                        <li>• 제주도 퀴즈</li>
                        <li>• 술자리 미션</li>
                      </ul>
                    </div>
                    <Button className="w-full text-lg font-bold" size="lg">
                      <Trophy className="mr-2 h-5 w-5" />
                      팀 게임 시작
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Custom Game */}
            <Link href="/games/custom">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 bg-gradient-to-br from-white to-myth-beige border-myth-beige hover:border-myth-beige-dark">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 bg-gradient-to-r from-myth-beige to-myth-beige-dark rounded-full shadow-xl border-2 border-myth-beige-dark">
                      <Gamepad2 className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-myth-gray-dark font-bold">커스텀 게임</CardTitle>
                  </div>
                  <CardDescription className="text-lg">
                    자신만의 게임 규칙을 만들어서 즐겨보세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-white/80 p-4 rounded-lg border-2 border-myth-beige">
                      <h4 className="font-bold text-myth-gray-dark mb-3 text-lg">만들 수 있는 게임:</h4>
                      <ul className="text-myth-gray space-y-2">
                        <li>• 나만의 질문 만들기</li>
                        <li>• 특별한 벌칙 설정</li>
                        <li>• 게임 규칙 커스터마이징</li>
                      </ul>
                    </div>
                    <Button className="w-full text-lg font-bold" size="lg">
                      <Settings className="mr-2 h-5 w-5" />
                      게임 만들기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </section>

          {/* Tips Section */}
          <section className="mb-12">
            <Card className="bg-seolmundae-orange-light/20 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-myth-gray-dark">게임 팁</CardTitle>
                <CardDescription>
                  더 재미있게 게임을 즐기는 방법들
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-myth-gray-dark mb-2">게임 전 준비사항</h4>
                    <ul className="text-sm text-myth-gray space-y-1">
                      <li>• 충분한 술과 안주 준비</li>
                      <li>• 편안한 분위기 만들기</li>
                      <li>• 모든 참가자가 참여할 수 있도록 배려</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-myth-gray-dark mb-2">게임 중 주의사항</h4>
                    <ul className="text-sm text-myth-gray space-y-1">
                      <li>• 무리하지 말고 적당히 즐기기</li>
                      <li>• 다른 사람의 의견 존중하기</li>
                      <li>• 안전한 술자리 문화 유지하기</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
