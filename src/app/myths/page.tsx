'use client';

import FlipCard from '@/components/FlipCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

// 신화 데이터
const myths = [
  {
    id: 'seolmundae',
    title: '설문대할망',
    character: '거인 여신',
    description: '한라산과 오름을 만든 거인 여신의 전설을 만나보세요.',
    story: '설문대할망은 치마폭에 흙을 담아 제주 땅을 다지고, 한라산과 수많은 오름을 만들었다고 전해집니다.',
    meaning: '창조와 생명, 자연의 위대함을 상징합니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3A71b6fa9b-e1a2-42d9-9d48-b4e1a6586a18%3A%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC.png?table=block&id=27610da3-ad82-8084-a49c-dc132e6ac241&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
    iconName: 'Mountain',
    color: 'orange',
    bgColor: 'from-orange-400 to-orangee-600',
    borderColor: 'hover:border-orange-300/50',
    textColor: 'group-hover:text-orange-600',
    mbtiType: 'ENTJ',
    location: '한라산, 제주 오름 일대',
    culturalSignificance: '제주의 창조 신화이자 여성 거인 신앙의 대표적 상징'
  },
  {
    id: 'samsin',
    title: '삼승할망',
    character: '출산의 여신',
    description: '아기를 점지하고 출산을 돕는 생명의 신을 만나보세요.',
    story: '삼승할망은 집안의 출산과 아기의 생명을 돌보며, 제주 가정에서 출산 제의의 중심이 되었습니다.',
    meaning: '생명, 탄생, 모성애를 상징합니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3A5d7cda96-ec7b-4cea-aa2f-d4c6b8a5f546%3A%E1%84%89%E1%85%A1%E1%86%B7%E1%84%89%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC.png?table=block&id=27610da3-ad82-8082-8c0f-e492f14d5b13&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
    iconName: 'Users',
    color: 'purple',
    bgColor: 'from-purple-500 to-purple-700',
    borderColor: 'hover:border-purple-300/50',
    textColor: 'group-hover:text-purple-600',
    mbtiType: 'ISFJ',
    location: '제주 각지 삼승당',
    culturalSignificance: '출산 의례와 깊이 연결된 가정신앙의 대표 여신'
  },
  {
    id: 'jachungbi',
    title: '자청비',
    character: '풍요의 여신',
    description: '농사와 곡식을 풍요롭게 지켜주는 여신을 만나보세요.',
    story: '자청비는 곡식과 풍요를 관장하며, 인간들에게 농사짓는 방법과 풍요의 축복을 내려주었다고 전해집니다.',
    meaning: '풍요, 성장, 번영을 상징합니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3Ac5b71d94-8575-4616-a1e0-32ac6818fbcb%3A%E1%84%8C%E1%85%A1%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%87%E1%85%B5.png?table=block&id=27610da3-ad82-8068-abb2-ea9a576fcdfb&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
    iconName: 'Sparkles',
    color: 'teal',
    bgColor: 'from-teal-500 to-teal-700',
    borderColor: 'hover:border-teal-300/50',
    textColor: 'group-hover:text-teal-600',
    mbtiType: 'ENFP',
    location: '제주 농경지 일대',
    culturalSignificance: '농경 사회에서 풍요와 수확을 기원하는 대표적 여신'
  },
  {
    id: 'bonhyang',
    title: '본향당 수호신',
    character: '마을 수호신',
    description: '마을마다 존재하는 토속 수호신을 만나보세요.',
    story: '본향당 신은 마을마다 모셔져 마을 사람들의 평안과 안전을 지켜주며, 공동체 결속을 다지는 중심이 되었습니다.',
    meaning: '안전, 공동체, 전통을 상징합니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3A58e9714f-5a6e-4445-a347-40b6054c2b06%3A%E1%84%87%E1%85%A9%E1%86%AB%E1%84%92%E1%85%A3%E1%86%BC%E1%84%83%E1%85%A1%E1%86%BC_%E1%84%89%E1%85%B5%E1%86%AB%E1%84%92%E1%85%AA(%E1%84%86%E1%85%A1%E1%84%8B%E1%85%B3%E1%86%AF_%E1%84%89%E1%85%AE%E1%84%92%E1%85%A9%E1%84%89%E1%85%B5%E1%86%AB).png?table=block&id=27610da3-ad82-8090-8250-fd4d32051887&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
    iconName: 'Mountain',
    color: 'green',
    bgColor: 'from-green-500 to-green-700',
    borderColor: 'hover:border-green-300/50',
    textColor: 'group-hover:text-green-600',
    mbtiType: 'ESFJ',
    location: '제주 각지 본향당',
    culturalSignificance: '마을 단위 신앙의 중심, 공동체 정체성을 지탱하는 신화'
  },
  {
    id: 'yeongdeung',
    title: '영등할망',
    character: '바다의 여신',
    description: '2월에 바다를 다스리러 내려오는 바람과 바다의 신을 만나보세요.',
    story: '영등할망은 매년 음력 2월 제주 바다를 찾아 풍어와 안전을 기원하는 제의의 주신이 되었습니다.',
    meaning: '자연 주기, 바람, 어업의 안녕을 상징합니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3A977df292-30a3-4c78-9fc3-a526a66b55a9%3A%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%83%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC.png?table=block&id=27610da3-ad82-801f-bb1b-e8c8e56862d6&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
    iconName: 'Sparkles',
    color: 'blue',
    bgColor: 'from-blue-500 to-blue-700',
    borderColor: 'hover:border-blue-300/50',
    textColor: 'group-hover:text-blue-600',
    mbtiType: 'INFJ',
    location: '제주 해안',
    culturalSignificance: '제주 어촌 신앙의 중심으로 유네스코 무형문화유산에도 연결된 신화'
  },
  {
    id: 'haesin',
    title: '해신 (용왕 전설)',
    character: '바다의 수호신',
    description: '어업과 해양을 지키는 바다의 신을 만나보세요.',
    story: '해신은 용왕으로도 불리며, 어업의 풍요와 바다의 질서를 지켜주는 존재로 신앙되었습니다.',
    meaning: '질서, 권위, 풍요를 상징합니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3Aac02e034-63c2-4289-add3-940372dfdee4%3A%E1%84%92%E1%85%A2%E1%84%89%E1%85%B5%E1%86%AB(%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%8B%E1%85%AA%E1%86%BC_%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%89%E1%85%A5%E1%86%AF).png?table=block&id=27610da3-ad82-80d8-ab8d-ebfb757fabdc&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
    iconName: 'Users',
    color: 'cyan',
    bgColor: 'from-cyan-500 to-cyan-700',
    borderColor: 'hover:border-cyan-300/50',
    textColor: 'group-hover:text-cyan-600',
    mbtiType: 'ESTJ',
    location: '제주 연안',
    culturalSignificance: '어업과 해양 안전 신앙의 중심, 마을 어촌제의의 핵심'
  },
  {
    id: 'mundo',
    title: '문도령',
    character: '비극적 연인',
    description: '인간과 선녀의 비극적 사랑 이야기를 만나보세요.',
    story: '문도령은 선녀와의 사랑으로 인간과 신의 경계를 넘었으나, 결국 비극적 결말을 맞이한 주인공입니다.',
    meaning: '사랑, 열정, 비극을 상징합니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3A842a5830-1708-4b04-abdb-1655df672d22%3A%E1%84%86%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A9%E1%84%85%E1%85%A7%E1%86%BC.png?table=block&id=27610da3-ad82-80bf-9459-dd1260eb7da0&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
    iconName: 'Sparkles',
    color: 'pink',
    bgColor: 'from-pink-500 to-pink-700',
    borderColor: 'hover:border-pink-300/50',
    textColor: 'group-hover:text-pink-600',
    mbtiType: 'INFP',
    location: '제주 설화 속',
    culturalSignificance: '사랑과 비극의 서사로 전해져 문학적 상징이 된 신화'
  },
  {
    id: 'segyeong',
    title: '세경본풀이',
    character: '질서를 만든 신',
    description: '인간과 신의 결합으로 새로운 질서를 만든 신화를 만나보세요.',
    story: '세경본풀이는 인간과 신의 결합을 통해 새로운 사회적 질서와 규범이 생겨났음을 전하는 이야기입니다.',
    meaning: '질서, 규범, 새로운 시작을 상징합니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3A50bc7095-e608-46bc-a654-a57f0a230f1b%3A%E1%84%89%E1%85%A6%E1%84%80%E1%85%A7%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB%E1%84%91%E1%85%AE%E1%86%AF%E1%84%8B%E1%85%B5.png?table=block&id=27610da3-ad82-8070-955e-d05e57dd5ded&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
    iconName: 'Mountain',
    color: 'indigo',
    bgColor: 'from-indigo-500 to-indigo-700',
    borderColor: 'hover:border-indigo-300/50',
    textColor: 'group-hover:text-indigo-600',
    mbtiType: 'INTJ',
    location: '제주 전역',
    culturalSignificance: '제주 사회의 규범과 제도를 설명하는 중요한 신화'
  },
  {
    id: 'dolharubang',
    title: '돌하르방',
    character: '수호석상',
    description: '마을 입구를 지키는 수호석상의 신화를 만나보세요.',
    story: '돌하르방은 마을 입구에 세워져 외부의 나쁜 기운을 막고 마을의 안전을 지키는 수호석상입니다.',
    meaning: '안전, 보호, 장수를 상징합니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3A8c559453-b909-40b4-a069-89aa57729b14%3A%E1%84%83%E1%85%A9%E1%86%AF%E1%84%92%E1%85%A1%E1%84%85%E1%85%B3%E1%84%87%E1%85%A1%E1%86%BC(%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%89%E1%85%B3%E1%86%BC).png?table=block&id=27610da3-ad82-80be-a71a-ca4d6cfdd52d&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
    iconName: 'Users',
    color: 'stone',
    bgColor: 'from-stone-500 to-stone-700',
    borderColor: 'hover:border-stone-300/50',
    textColor: 'group-hover:text-stone-600',
    mbtiType: 'ISTJ',
    location: '제주 마을 입구',
    culturalSignificance: '제주 대표 상징물, 마을과 사람들의 수호신'
  },
  {
    id: 'chilsung',
    title: '칠성신',
    character: '별의 신',
    description: '하늘의 별과 인간 운명을 연결하는 신을 만나보세요.',
    story: '칠성신은 하늘의 별과 인간의 운명을 이어주며, 특히 수명과 복을 관장한다고 여겨졌습니다.',
    meaning: '운명, 수명, 복을 상징합니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3Aed208b98-993c-4ded-9395-6d8f260a2dc0%3A%E1%84%8E%E1%85%B5%E1%86%AF%E1%84%89%E1%85%A5%E1%86%BC%E1%84%89%E1%85%B5%E1%86%AB.png?table=block&id=27610da3-ad82-805f-afc8-c470f0a7e621&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
    iconName: 'Sparkles',
    color: 'yellow',
    bgColor: 'from-yellow-500 to-yellow-700',
    borderColor: 'hover:border-yellow-300/50',
    textColor: 'group-hover:text-yellow-600',
    mbtiType: 'ENTP',
    location: '제주 하늘 신앙',
    culturalSignificance: '수명과 길흉을 점치는 별신 신앙의 대표'
  }
];

export default function MythsPage() {
  // 스크롤 위치 저장/복원
  useEffect(() => {
    // 페이지 로드 시 저장된 스크롤 위치 복원
    const savedScrollPosition = sessionStorage.getItem('myths-scroll-position');
    if (savedScrollPosition) {
      const scrollY = parseInt(savedScrollPosition, 10);
      window.scrollTo(0, scrollY);
      // 복원 후 저장된 위치 삭제
      sessionStorage.removeItem('myths-scroll-position');
    }

    // 페이지 언마운트 시 현재 스크롤 위치 저장
    const handleBeforeUnload = () => {
      sessionStorage.setItem('myths-scroll-position', window.scrollY.toString());
    };

    // 브라우저 뒤로가기/앞으로가기 감지
    const handlePopState = () => {
      sessionStorage.setItem('myths-scroll-position', window.scrollY.toString());
    };

    // 모든 신화 이미지 프리로딩
    const preloadImages = () => {
      myths.forEach((myth) => {
        const img = new window.Image();
        img.src = myth.image;
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    // 페이지 로드 시 이미지 프리로딩
    preloadImages();

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="min-h-screen brand-gradient">
      <Header />

      {/* Spacing between header and main content */}
      <div className="pt-16"></div>

      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-8 sm:mb-12 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-purple-600 to-teal-600 bg-clip-text text-transparent drop-shadow-lg">
              제주의 신화 세계
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 font-medium">
              제주도의 아름다운 신화들을 만나보세요
            </p>
          </section>

          {/* Myths Grid */}
          <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-12 px-2">
            {myths.map((myth) => (
              <FlipCard key={myth.id} myth={myth} />
            ))}
          </section>

          {/* Additional Info */}
        </div>
      </main>

      <Footer />
    </div>
  );
}
