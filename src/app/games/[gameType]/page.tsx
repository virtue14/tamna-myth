import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RotateCcw, HelpCircle, Users, Settings, Play } from 'lucide-react';
import Link from 'next/link';
import RouletteGame from '@/components/games/RouletteGame';
import QuestionCardGame from '@/components/games/QuestionCardGame';
import TeamGame from '@/components/games/TeamGame';
import CustomGame from '@/components/games/CustomGame';
import Footer from '@/components/Footer';

// 게임 데이터 타입 정의
interface GameData {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  rules: string[];
  items: string[];
  category: string;
}

// 게임 데이터
const gameData: Record<string, GameData> = {
  'roulette': {
    id: 'roulette',
    title: '랜덤 룰렛',
    description: '룰렛을 돌려서 랜덤한 술자리 규칙이나 질문을 받아보세요.',
    icon: RotateCcw,
    rules: [
      '룰렛을 돌려서 나온 규칙을 따라하세요',
      '거부하면 벌칙을 받아야 합니다',
      '모든 사람이 한 번씩 돌려보세요',
      '규칙을 어기면 추가 벌칙이 있습니다'
    ],
    items: [
      '다음 사람에게 술 한 잔 더 마시기',
      '좌우 사람과 건배하기',
      '30초 동안 춤추기',
      '다음 질문에 솔직하게 답하기',
      '좌우 사람의 이름 3번 부르기',
      '다음 사람에게 칭찬하기',
      '30초 동안 웃기',
      '다음 질문에 거짓으로 답하기',
      '좌우 사람과 손 잡고 노래 부르기',
      '다음 사람에게 고백하기'
    ],
    category: '룰렛'
  },
  'questions': {
    id: 'questions',
    title: '질문 카드',
    description: '신화와 관련된 재미있는 질문들로 대화를 이어가보세요.',
    icon: HelpCircle,
    rules: [
      '카드를 뽑아서 질문에 답하세요',
      '솔직하게 답하면 더 재미있어요',
      '다른 사람의 답변도 들어보세요',
      '거짓으로 답하면 벌칙이 있습니다'
    ],
    items: [
      '당신이 가장 좋아하는 제주 신화는 무엇인가요?',
      '만약 신화 속 캐릭터가 된다면 누구를 선택하시겠어요?',
      '제주도에서 가장 기억에 남는 장소는 어디인가요?',
      '한라산에 올라가서 가장 먼저 하고 싶은 일은?',
      '제주 신화 중에서 가장 무서운 이야기는?',
      '만약 설문대할망을 만난다면 무엇을 물어보고 싶나요?',
      '제주도의 가장 아름다운 계절은 언제라고 생각하나요?',
      '신화 속에서 가장 멋진 능력을 가진 캐릭터는?',
      '제주도에서 살고 싶다면 어느 지역을 선택하시겠어요?',
      '가장 기억에 남는 제주 음식은 무엇인가요?'
    ],
    category: '질문'
  },
  'team': {
    id: 'team',
    title: '팀 게임',
    description: '신화 캐릭터를 맞추거나 팀을 나누어 게임을 즐겨보세요.',
    icon: Users,
    rules: [
      '팀을 나누어 게임을 진행하세요',
      '정답을 맞추면 점수를 얻습니다',
      '틀리면 상대팀에게 점수가 갑니다',
      '가장 높은 점수를 얻은 팀이 승리합니다'
    ],
    items: [
      '한라산의 높이는 얼마인가요? (1,950m)',
      '설문대할망의 다른 이름은? (서천궁대왕)',
      '삼성혈에서 태어난 신의 수는? (3명)',
      '제주도의 면적은 얼마인가요? (1,849km²)',
      '제주도의 인구는 얼마인가요? (약 67만명)',
      '한라산의 다른 이름은? (한라산, 영주산)',
      '제주도의 최고봉은? (한라산)',
      '제주도의 기후는? (아열대기후)',
      '제주도의 특산물은? (감귤, 흑돼지)',
      '제주도의 유네스코 세계자연유산은? (한라산, 성산일출봉)'
    ],
    category: '퀴즈'
  },
  'custom': {
    id: 'custom',
    title: '커스텀 게임',
    description: '자신만의 게임 규칙을 만들어서 즐겨보세요.',
    icon: Settings,
    rules: [
      '자신만의 질문이나 규칙을 만드세요',
      '다른 사람들과 공유할 수 있습니다',
      '게임 결과를 저장할 수 있습니다',
      '나중에 다시 플레이할 수 있습니다'
    ],
    items: [
      '새로운 질문 추가하기',
      '벌칙 규칙 만들기',
      '게임 시간 설정하기',
      '참가자 수 제한하기',
      '난이도 조절하기',
      '테마 변경하기',
      '음악 추가하기',
      '애니메이션 효과 설정하기',
      '결과 공유하기',
      '게임 기록 저장하기'
    ],
    category: '커스텀'
  }
};

interface GamePageProps {
  params: Promise<{
    gameType: string;
  }>;
}

export default async function GamePage({ params }: GamePageProps) {
  const { gameType } = await params;
  const game = gameData[gameType];
  
  if (!game) {
    notFound();
  }

  const IconComponent = game.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-jeju-sand to-jeju-teal-light">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <Link href="/games">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            게임 목록으로 돌아가기
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-jeju-orange-light rounded-full">
                <IconComponent className="h-16 w-16 text-jeju-orange-dark" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-jeju-orange-dark to-jeju-teal-dark bg-clip-text text-transparent">
              {game.title}
            </h1>
            
            <p className="text-xl text-jeju-basalt-dark mb-6">
              {game.description}
            </p>
            
            <div className="inline-flex items-center gap-2 bg-jeju-teal-light text-jeju-teal-dark px-4 py-2 rounded-full text-sm font-medium">
              <Play className="h-4 w-4" />
              {game.category} 게임
            </div>
          </section>

          {/* Game Rules */}
          <section className="mb-12">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-jeju-basalt-dark">게임 규칙</CardTitle>
                <CardDescription>
                  게임을 시작하기 전에 규칙을 확인해보세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {game.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-jeju-orange-light text-jeju-orange-dark rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-jeju-basalt-dark">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Game Items */}
          <section className="mb-12">
            <Card className="bg-jeju-teal-light/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-jeju-basalt-dark">게임 아이템</CardTitle>
                <CardDescription>
                  게임에서 사용할 수 있는 아이템들입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {game.items.map((item, index) => (
                    <div key={index} className="bg-white/60 p-4 rounded-lg border border-jeju-basalt-light/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-jeju-teal text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-jeju-basalt-dark">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 실제 게임 컴포넌트 */}
          <section className="mb-12">
            {gameType === 'roulette' && (
              <RouletteGame items={game.items} />
            )}
            {gameType === 'questions' && (
              <QuestionCardGame questions={game.items} />
            )}
            {gameType === 'team' && (
              <TeamGame questions={[
                { question: '한라산의 높이는 얼마인가요?', answer: '1,950m' },
                { question: '설문대할망의 다른 이름은?', answer: '서천궁대왕' },
                { question: '삼성혈에서 태어난 신의 수는?', answer: '3명' },
                { question: '제주도의 면적은 얼마인가요?', answer: '1,849km²' },
                { question: '제주도의 인구는 얼마인가요?', answer: '약 67만명' },
                { question: '한라산의 다른 이름은?', answer: '한라산, 영주산' },
                { question: '제주도의 최고봉은?', answer: '한라산' },
                { question: '제주도의 기후는?', answer: '아열대기후' },
                { question: '제주도의 특산물은?', answer: '감귤, 흑돼지' },
                { question: '제주도의 유네스코 세계자연유산은?', answer: '한라산, 성산일출봉' }
              ]} />
            )}
            {gameType === 'custom' && (
              <CustomGame />
            )}
          </section>

          {/* Tips Section */}
          <section className="mb-12">
            <Card className="bg-jeju-basalt-light/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-jeju-basalt-dark">게임 팁</CardTitle>
                <CardDescription>
                  더 재미있게 게임을 즐기는 방법들입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-jeju-basalt-dark mb-2">게임 전 준비사항</h4>
                    <ul className="text-sm text-jeju-basalt space-y-1">
                      <li>• 충분한 술과 안주 준비</li>
                      <li>• 편안한 분위기 만들기</li>
                      <li>• 모든 참가자가 참여할 수 있도록 배려</li>
                      <li>• 게임 규칙을 미리 설명하기</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-jeju-basalt-dark mb-2">게임 중 주의사항</h4>
                    <ul className="text-sm text-jeju-basalt space-y-1">
                      <li>• 무리하지 말고 적당히 즐기기</li>
                      <li>• 다른 사람의 의견 존중하기</li>
                      <li>• 안전한 술자리 문화 유지하기</li>
                      <li>• 게임 결과에 너무 집착하지 않기</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Action Buttons */}
          <section className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/games">
                <Button variant="outline" size="lg">
                  다른 게임 보기
                </Button>
              </Link>
              <Button size="lg">
                <Play className="mr-2 h-4 w-4" />
                지금 게임 시작
              </Button>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// 정적 생성할 페이지들
export async function generateStaticParams() {
  return Object.keys(gameData).map((gameType) => ({
    gameType: gameType,
  }));
}
