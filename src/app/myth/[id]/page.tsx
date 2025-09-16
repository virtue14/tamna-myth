import React from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Volume2, BookOpen, Mountain, Heart, Waves, Shield, Star, Crown } from 'lucide-react';
import Link from 'next/link';
import MythImage from '@/components/MythImage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 신화별 아이콘 매핑
const getMythIcon = (mythId: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'seolmundae': Mountain,      // 설문대할망 - 산
    'samsin': Heart,             // 삼승할망 - 심장/생명
    'jachungbi': Star,           // 자청비 - 별/풍요
    'bonhyang': Shield,          // 본향당 - 방패/수호
    'yeongdeung': Waves,         // 영등할망 - 파도/바다
    'haesin': Waves,             // 해신 - 파도/바다
    'mundo': Heart,              // 문도령 - 심장/사랑
    'segyeong': Crown,           // 세경본풀이 - 왕관/질서
    'dolharubang': Shield,       // 돌하르방 - 방패/수호
    'chilsung': Star,            // 칠성신 - 별/운명
  };
  return iconMap[mythId] || Sparkles;
};

// 신화 데이터 타입 정의
interface MythData {
  id: string;
  title: string;
  description: string;
  story: string;
  character: string;
  meaning: string;
  image: string;
  mbtiType: string;
  mbtiReason: string;
  voiceMessage: string;
  location?: string;
  relatedMyths?: string[];
  aiSummary?: string;
}

// 임시 신화 데이터 (실제로는 Supabase에서 가져올 예정)
const mythData: Record<string, MythData> = {
  'seolmundae': {
    id: 'seolmundae',
    title: '설문대할망',
    description: '제주도를 만든 거인 여신. 치마폭에 흙을 담아 한라산과 360여 개의 오름을 만들었다.',
    story: '옛날 옛적, 하늘과 땅이 아직 구분되지 않았을 때였다. 거대한 여신 설문대할망이 나타나 치마폭에 흙을 담아 제주 땅을 다지기 시작했다. 그녀는 하루에 7번씩 흙을 던져 땅을 만들었고, 마침내 한라산을 완성했다. 하지만 그녀의 치마가 찢어지면서 흙이 떨어져 제주 전역에 360여 개의 오름이 생겨났다. 설문대할망은 제주의 모든 산과 땅을 만든 창조의 어머니로, 지금도 한라산 정상에서 제주를 내려다보고 있다고 전해진다.',
    character: '거인 여신',
    meaning: '창조, 생명, 자연',
    image: '/images/설문대할망.png',
    mbtiType: 'ENTJ',
    mbtiReason: '거대한 비전을 세우고 제주의 땅을 만든 지도자형, 강력한 추진력과 리더십을 상징.',
    voiceMessage: '내가 쌓은 산과 땅 위에서 너희가 살아가리라.',
    location: '한라산, 제주 오름 일대',
    relatedMyths: ['삼승할망', '자청비'],
    aiSummary: '제주도를 만든 거인 여신의 창조 신화로, 자연의 위대함과 여성의 힘을 상징하는 대표적인 제주 신화입니다.'
  },
  'samsin': {
    id: 'samsin',
    title: '삼승할망',
    description: '출산과 아기를 보호하는 생명의 여신. 제주 가정의 삼승당에서 아이들의 건강과 수명을 관장한다.',
    story: '제주도에는 아이가 태어나면 반드시 삼승당에 가서 삼승할망에게 기도를 드리는 풍습이 있다. 삼승할망은 세 가지 중요한 역할을 담당한다. 첫째, 아이의 수명을 정해주고, 둘째, 아이의 운명을 점지하며, 셋째, 아이의 건강을 지켜준다. 특히 아이가 아프거나 위험할 때는 삼승할망에게 기도하면 병이 낫는다고 믿었다. 제주 어머니들은 아이를 낳으면 첫 번째로 삼승할망에게 인사를 드렸고, 아이가 성장하는 동안 계속해서 그녀의 보호를 받았다. 삼승할망은 제주 가정의 가장 소중한 존재인 아이들을 지키는 어머니 신이었다.',
    character: '출산의 여신',
    meaning: '생명, 탄생, 모성',
    image: '/images/삼승할망.png',
    mbtiType: 'ISFJ',
    mbtiReason: '세심하게 생명을 돌보는 보호자형, 전통과 가정을 중시하며 출산과 탄생을 지킴.',
    voiceMessage: '새로운 생명이 태어남은 세상의 기쁨이니.',
    location: '제주 각지 삼승당',
    relatedMyths: ['설문대할망', '칠성신'],
    aiSummary: '아이의 수명과 건강을 관장하는 출산의 여신으로, 제주 가정에서 가장 소중히 여겨지는 생명의 수호신입니다.'
  },
  'jachungbi': {
    id: 'jachungbi',
    title: '자청비',
    description: '농사와 곡식을 풍요롭게 지켜주는 여신. 제주 농부들의 풍년과 수확을 관장한다.',
    story: '자청비는 제주 농부들이 가장 사랑하는 여신이었다. 그녀는 매년 봄이 되면 제주 전역의 농경지를 돌며 농부들에게 농사짓는 비법을 알려주었다. 자청비가 지나간 밭은 그해 반드시 풍년이 들었고, 그녀가 손을 대지 않은 밭은 흉년이 들었다고 전해진다. 특히 보리와 밀, 콩 같은 곡식의 성장을 관장했는데, 농부들이 자청비에게 정성스럽게 기도하면 곡식이 무럭무럭 자라났다. 자청비는 농부들의 고된 노동을 이해하고, 그들의 수고에 보답하고자 항상 풍요로운 수확을 약속했다. 지금도 제주 농부들은 추수 때가 되면 자청비에게 감사하는 마음을 담아 제사를 지낸다.',
    character: '풍요의 여신',
    meaning: '풍요, 성장, 번영',
    image: '/images/자청비.png',
    mbtiType: 'ENFP',
    mbtiReason: '활기차게 풍요와 성장을 이끄는 이상가형, 창의적이고 긍정적인 에너지로 농경을 상징.',
    voiceMessage: '들판 가득 풍요가 넘치도록 내가 함께하리라.',
    location: '제주 농경지 일대',
    relatedMyths: ['설문대할망'],
    aiSummary: '농부들의 풍년과 수확을 관장하는 풍요의 여신으로, 농경 사회에서 가장 사랑받는 여신입니다.'
  },
  'bonhyang': {
    id: 'bonhyang',
    title: '본향당 수호신',
    description: '제주 각 마을을 지키는 토속 수호신. 마을 사람들의 평안과 안전을 관장한다.',
    story: '제주도의 모든 마을에는 본향당이 있다. 이곳에는 그 마을을 지켜주는 수호신이 모셔져 있다. 본향당 신은 마을 사람들이 태어나서 죽을 때까지 평생을 함께하며, 마을에 재앙이 닥치면 이를 막아주고, 마을에 복이 들어오면 이를 나누어준다. 마을 사람들은 매년 정월 대보름과 추석에 본향당에서 제사를 지내며 수호신에게 감사하는 마음을 전한다. 특히 마을에 새로 이사온 사람이나 새로 태어난 아이가 있으면 반드시 본향당에 인사를 드려야 한다. 본향당 신은 마을의 모든 사람을 자식처럼 돌보며, 마을의 화합과 평안을 지켜주는 가장 소중한 존재다.',
    character: '마을 수호신',
    meaning: '안전, 공동체, 전통',
    image: '/images/본향당 신화(마을 수호신).png',
    mbtiType: 'ESFJ',
    mbtiReason: '공동체를 지키고 결속을 이끄는 사교적 수호자형, 마을과 사람들의 유대를 강화.',
    voiceMessage: '너희 마을의 평안을 지켜주리라.',
    location: '제주 각지 본향당',
    relatedMyths: ['칠성신'],
    aiSummary: '마을을 지키는 토속 수호신으로, 공동체의 결속과 안전을 담당하는 마을의 가장 소중한 존재입니다.'
  },
  'yeongdeung': {
    id: 'yeongdeung',
    title: '영등할망',
    description: '매년 음력 2월 제주 바다를 찾아오는 바람과 바다의 여신. 어부들의 풍어와 안전을 관장한다.',
    story: '매년 음력 2월이 되면 영등할망이 제주 바다를 찾아온다. 그녀는 바다 위를 걸으며 바람을 조절하고, 어부들에게 풍어를 내려준다. 영등할망이 오는 날은 바다가 잔잔해지고, 그녀가 떠나는 날은 바람이 세차게 불어 어부들이 바다로 나갈 수 없게 된다. 제주 어부들은 영등할망이 오는 기간 동안 바다에 나가지 않고 집에서 쉬며, 그녀에게 풍어와 안전을 기원한다. 영등할망은 어부들의 고된 삶을 이해하고, 그들의 안전을 위해 바다의 질서를 조절한다. 그녀가 지나간 바다는 그해 반드시 풍어가 들었고, 그녀의 보호를 받은 어부들은 무사히 집으로 돌아올 수 있었다.',
    character: '바다의 여신',
    meaning: '자연, 바람, 어업',
    image: '/images/영등할망.png',
    mbtiType: 'INFJ',
    mbtiReason: '자연 주기를 읽고 마을의 안녕을 기원하는 직관적 상담자형, 깊은 통찰로 바다와 바람을 다스림.',
    voiceMessage: '바다의 바람은 곧 너희의 삶과 함께하리라.',
    location: '제주 해안',
    relatedMyths: ['해신'],
    aiSummary: '매년 음력 2월 제주 바다를 찾아오는 바람과 바다의 여신으로, 어부들의 풍어와 안전을 관장합니다.'
  },
  'haesin': {
    id: 'haesin',
    title: '해신 (용왕 전설)',
    description: '바다 깊은 곳에 사는 용왕. 어업의 풍요와 바다의 질서를 관장하는 바다의 최고 신이다.',
    story: '제주 바다 깊은 곳에는 용궁이 있고, 그곳에 해신이 살고 있다. 해신은 용왕으로도 불리며, 바다의 모든 생물과 바다의 질서를 관장한다. 해신은 매년 봄이 되면 용궁에서 나와 제주 바다를 순찰하며, 어부들에게 풍어를 내려주고 바다의 안전을 지켜준다. 특히 태풍이나 큰 풍랑이 일 때는 해신이 직접 바다를 진정시키고, 어부들이 위험에 빠지면 그들을 구해준다. 해신은 바다의 생태계를 보호하며, 과도한 어획을 막고 바다의 균형을 유지한다. 제주 어부들은 해신에게 정성스럽게 기도하며, 그녀의 보호 아래 안전하게 바다에서 일할 수 있었다.',
    character: '바다의 수호신',
    meaning: '질서, 권위, 풍요',
    image: '/images/해신(용왕 전설).png',
    mbtiType: 'ESTJ',
    mbtiReason: '질서와 규율로 바다를 다스리고 어부들을 지키는 관리자형.',
    voiceMessage: '바다의 질서를 어기는 자, 용납치 않으리라.',
    location: '제주 연안',
    relatedMyths: ['영등할망'],
    aiSummary: '바다 깊은 곳에 사는 용왕으로, 어업의 풍요와 바다의 질서를 관장하는 바다의 최고 신입니다.'
  },
  'mundo': {
    id: 'mundo',
    title: '문도령',
    description: '인간과 선녀의 비극적 사랑 이야기. 천상과 지상을 오가는 사랑의 전설이다.',
    story: '옛날 제주에 문도령이라는 젊은 남자가 살았다. 어느 날 그는 우연히 하늘에서 내려온 선녀를 만나 사랑에 빠졌다. 둘은 깊은 사랑을 나누었지만, 선녀는 하늘로 돌아가야 하는 운명이었다. 문도령은 선녀를 따라 하늘로 올라가려 했지만, 인간의 몸으로는 하늘에 오를 수 없었다. 선녀는 문도령에게 하늘의 비법을 가르쳐주었고, 문도령은 그 비법을 사용해 하늘로 올라갔다. 하지만 하늘의 신들은 인간이 하늘에 오른 것을 용납하지 않았고, 문도령을 다시 땅으로 떨어뜨렸다. 문도령은 땅에 떨어지면서 죽었고, 선녀는 그를 따라 땅으로 내려와 함께 죽었다. 둘의 사랑은 비극으로 끝났지만, 그들의 사랑은 제주 땅에 영원히 남아 지금도 전해지고 있다.',
    character: '비극적 연인',
    meaning: '사랑, 열정, 비극',
    image: '/images/문도령.png',
    mbtiType: 'INFP',
    mbtiReason: '사랑과 비극에 몰입하는 감성적 중재자형, 이상적 사랑을 추구하다 비극을 맞는 서사와 부합.',
    voiceMessage: '사랑은 나의 전부였노라.',
    location: '제주 설화 속',
    relatedMyths: ['세경본풀이'],
    aiSummary: '인간과 선녀의 비극적 사랑 이야기로, 천상과 지상을 오가는 사랑의 전설입니다.'
  },
  'segyeong': {
    id: 'segyeong',
    title: '세경본풀이',
    description: '인간과 신의 결합으로 새로운 질서를 만든 신화. 제주 사회의 규범과 제도를 설명하는 이야기다.',
    story: '옛날 제주에는 인간과 신이 함께 살던 시대가 있었다. 하지만 인간과 신 사이에는 명확한 경계가 없어 혼란이 계속되었다. 이때 세경본풀이라는 신이 나타나 인간과 신의 새로운 질서를 만들었다. 세경본풀이는 인간과 신이 각각의 역할을 가지고 살아가도록 규칙을 정했다. 인간은 땅에서 농사와 어업을 하며 살고, 신은 하늘에서 인간을 보호하고 도와주는 역할을 하도록 했다. 또한 인간과 신이 서로 존중하고 협력할 수 있는 제도와 예의를 만들었다. 세경본풀이가 만든 질서 덕분에 제주는 평화롭고 질서 있는 사회가 되었고, 인간과 신이 조화롭게 살아갈 수 있게 되었다.',
    character: '질서를 만든 신',
    meaning: '질서, 규범, 시작',
    image: '/images/세경본풀이.png',
    mbtiType: 'INTJ',
    mbtiReason: '새로운 규범과 질서를 설계하는 전략가형, 인간과 신의 결합으로 새로운 질서를 창조.',
    voiceMessage: '새로운 질서는 더 큰 세상을 열리게 하리라.',
    location: '제주 전역',
    relatedMyths: ['문도령'],
    aiSummary: '인간과 신의 결합으로 새로운 질서를 만든 신화로, 제주 사회의 규범과 제도를 설명하는 중요한 이야기입니다.'
  },
  'dolharubang': {
    id: 'dolharubang',
    title: '돌하르방',
    description: '제주 마을 입구를 지키는 수호석상. 외부의 나쁜 기운을 막고 마을의 안전을 관장한다.',
    story: '제주도의 모든 마을 입구에는 돌하르방이 서 있다. 이 돌하르방은 단순한 장식품이 아니라 마을을 지키는 수호신이다. 돌하르방은 마을로 들어오려는 나쁜 기운과 악한 존재들을 막아주고, 마을 사람들의 안전을 지켜준다. 특히 밤이 되면 돌하르방이 살아나 마을을 순찰하며, 위험한 존재가 마을에 들어오려 하면 그들을 쫓아낸다. 마을 사람들은 돌하르방에게 정성스럽게 기도하며, 그들의 보호를 받는다. 돌하르방은 마을의 가장 충실한 수호자로, 수백 년 동안 변함없이 마을을 지켜주고 있다. 지금도 제주 사람들은 돌하르방을 만지면 복이 온다고 믿으며, 그들의 보호를 기원한다.',
    character: '수호석상',
    meaning: '안전, 보호, 장수',
    image: '/images/돌하르방(장승).png',
    mbtiType: 'ISTJ',
    mbtiReason: '묵묵히 자리를 지키는 현실적이고 신뢰성 있는 관리자형, 변함없이 마을을 보호하는 수호석상.',
    voiceMessage: '나는 언제나 이 자리에 서서 너희를 지키리라.',
    location: '제주 마을 입구',
    relatedMyths: [],
    aiSummary: '마을 입구를 지키는 수호석상으로, 외부의 나쁜 기운을 막고 마을의 안전을 관장하는 제주의 대표 상징물입니다.'
  },
  'chilsung': {
    id: 'chilsung',
    title: '칠성신',
    description: '하늘의 일곱 별과 인간 운명을 연결하는 신. 수명과 복을 관장하는 별의 신이다.',
    story: '하늘에는 일곱 개의 별이 있고, 이 별들이 인간의 운명을 관장한다. 칠성신은 이 일곱 별의 신으로, 인간의 수명과 복을 정해주는 존재다. 칠성신은 매일 밤 하늘에서 인간들을 내려다보며, 그들의 운명을 조절한다. 특히 아이가 태어날 때는 칠성신이 그 아이의 수명을 정해주고, 그 아이가 살아가는 동안 계속해서 보호해준다. 칠성신은 인간의 생명을 소중히 여기며, 그들의 건강과 안전을 지켜준다. 제주 사람들은 칠성신에게 기도하면 병이 낫고, 복이 들어온다고 믿었다. 칠성신은 하늘의 별처럼 밝게 빛나며, 인간들에게 희망과 위로를 주는 가장 따뜻한 신이었다.',
    character: '별의 신',
    meaning: '운명, 수명, 복',
    image: '/images/칠성신.png',
    mbtiType: 'ENTP',
    mbtiReason: '별과 인간 운명을 연결하는 발상가형, 창의적이고 변화 지향적인 특성이 별신 신앙과 맞음.',
    voiceMessage: '별빛 아래 너의 운명이 흐르리라.',
    location: '제주 하늘 신앙',
    relatedMyths: ['삼승할망'],
    aiSummary: '하늘의 일곱 별과 인간 운명을 연결하는 신으로, 수명과 복을 관장하는 별의 신입니다.'
  }
};

interface MythPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MythPage({ params }: MythPageProps) {
  const { id } = await params;
  const myth = mythData[id];
  
  if (!myth) {
    notFound();
  }


  return (
    <div className="min-h-screen myth-gradient">
      <Header />
      

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section with Image */}
          <section className="mb-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Section */}
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl relative bg-gradient-to-br from-gray-100 to-gray-200">
                    <MythImage 
                      src={myth.image} 
                      alt={myth.title}
                      width={600}
                      height={900}
                      className="w-full h-full object-contain"
                      fallbackIconName="Mountain"
                      fallbackBgColor="from-orange-400 to-orange-600"
                    />
                    {/* 음성 버튼을 이미지 내부 하단에 배치 */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                      <Button 
                        size="lg" 
                        className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm"
                      >
                        {/* 애니메이션 배경 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* 펄스 효과 */}
                        <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse"></div>
                        
                        {/* 버튼 내용 */}
                        <div className="relative flex items-center gap-3">
                          <Volume2 className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                          <span className="text-lg group-hover:scale-105 transition-transform duration-300">음성으로 듣기</span>
                        </div>
                        
                        {/* 글로우 효과 */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                      </Button>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-seolmundae-orange-light to-seolmundae-gold rounded-full opacity-20"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-myth-purple-light to-myth-teal-light rounded-full opacity-20"></div>
                </div>
              </div>
              
              {/* Text Section */}
              <div className="order-1 lg:order-2">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-seolmundae-gold text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg mb-6">
                    {React.createElement(getMythIcon(myth.id), { className: "h-4 w-4" })}
                    {myth.character}
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-seolmundae-orange-dark via-myth-purple-dark to-myth-teal-dark bg-clip-text text-transparent drop-shadow-lg">
                    {myth.title}
                  </h1>
                  
                  <p className="text-xl text-myth-gray-dark mb-8 font-medium leading-relaxed">
                    {myth.description}
                  </p>
                  
                  {/* Quick Info Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                      <div className="text-sm text-myth-gray mb-1">성격 유형</div>
                      <div className="font-bold text-lg text-seolmundae-orange-dark">{myth.mbtiType}</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                      <div className="text-sm text-myth-gray mb-1">위치</div>
                      <div className="font-bold text-lg text-myth-purple-dark">{myth.location}</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                      <div className="text-sm text-myth-gray mb-1">신화적 의미</div>
                      <div className="font-bold text-lg text-myth-teal-dark">{myth.meaning}</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                      <div className="text-sm text-myth-gray mb-1">관련 신화</div>
                      <div className="font-bold text-lg text-myth-purple-dark">
                        {myth.relatedMyths && myth.relatedMyths.length > 0 
                          ? myth.relatedMyths.join(', ') 
                          : '없음'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="mb-12">
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-myth-gray-dark">신화 이야기</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed text-myth-gray">
                  {myth.story}
                </p>
              </CardContent>
            </Card>
          </section>


          {/* AI Summary Section */}
          <section className="mb-12">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 backdrop-blur-sm shadow-xl border-2 border-blue-200/50">
              <CardHeader>
                <CardTitle className="text-2xl text-myth-gray-dark flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  AI 한줄 요약
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed text-gray-700 font-medium">
                  {myth.aiSummary}
                </p>
              </CardContent>
            </Card>
          </section>



          {/* Action Buttons */}
          <section className="text-center">
            <div className="flex justify-center">
              <Link href="/myths">
                <Button size="lg" className="bg-gradient-to-r from-seolmundae-orange-dark to-myth-purple-dark hover:from-seolmundae-orange-light hover:to-myth-purple-light text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <BookOpen className="mr-3 h-6 w-6" />
                  다른 신화 탐험하기
                </Button>
              </Link>
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
  return Object.keys(mythData).map((id) => ({
    id: id,
  }));
}
