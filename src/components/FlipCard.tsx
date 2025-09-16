'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MythImage from './MythImage';
import { Sparkles, Mountain, Heart, Waves, Shield, Star, Crown, ArrowRight, Eye } from 'lucide-react';

interface FlipCardProps {
  myth: {
    id: string;
    title: string;
    character: string;
    description: string;
    story: string;
    meaning: string;
    image: string;
    iconName: string;
    bgColor: string;
    textColor: string;
    mbtiType: string;
    location: string;
    culturalSignificance?: string;
  };
}

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

// 신화별 맞춤 색상 매핑 (가독성 개선)
const getMythColors = (mythId: string) => {
  const colorMap: Record<string, { bg: string; accent: string; icon: string }> = {
    'seolmundae': { 
      bg: 'from-slate-600 via-slate-500 to-slate-700', 
      accent: 'from-orange-400 to-red-500',
      icon: 'text-orange-300'
    }, // 설문대할망 - 산/화산 색상 (밝게)
    'samsin': { 
      bg: 'from-pink-600 via-pink-500 to-pink-700', 
      accent: 'from-pink-400 to-rose-500',
      icon: 'text-pink-300'
    }, // 삼승할망 - 생명/출산 색상 (밝게)
    'jachungbi': { 
      bg: 'from-yellow-600 via-yellow-500 to-yellow-700', 
      accent: 'from-yellow-400 to-amber-500',
      icon: 'text-yellow-300'
    }, // 자청비 - 풍요/황금 색상 (밝게)
    'bonhyang': { 
      bg: 'from-blue-600 via-blue-500 to-blue-700', 
      accent: 'from-blue-400 to-indigo-500',
      icon: 'text-blue-300'
    }, // 본향당 - 수호/신성 색상 (밝게)
    'yeongdeung': { 
      bg: 'from-cyan-600 via-cyan-500 to-cyan-700', 
      accent: 'from-cyan-400 to-teal-500',
      icon: 'text-cyan-300'
    }, // 영등할망 - 바다/물 색상 (밝게)
    'haesin': { 
      bg: 'from-blue-600 via-blue-500 to-blue-700', 
      accent: 'from-blue-400 to-cyan-500',
      icon: 'text-blue-300'
    }, // 해신 - 바다/깊은 바다 색상 (밝게)
    'mundo': { 
      bg: 'from-purple-600 via-purple-500 to-purple-700', 
      accent: 'from-purple-400 to-violet-500',
      icon: 'text-purple-300'
    }, // 문도령 - 사랑/로맨스 색상 (밝게)
    'segyeong': { 
      bg: 'from-emerald-600 via-emerald-500 to-emerald-700', 
      accent: 'from-emerald-400 to-green-500',
      icon: 'text-emerald-300'
    }, // 세경본풀이 - 질서/자연 색상 (밝게)
    'dolharubang': { 
      bg: 'from-stone-600 via-stone-500 to-stone-700', 
      accent: 'from-stone-400 to-gray-500',
      icon: 'text-stone-300'
    }, // 돌하르방 - 돌/고대 색상 (밝게)
    'chilsung': { 
      bg: 'from-indigo-600 via-indigo-500 to-indigo-700', 
      accent: 'from-indigo-400 to-purple-500',
      icon: 'text-indigo-300'
    }, // 칠성신 - 별/우주 색상 (밝게)
  };
  return colorMap[mythId] || { bg: 'from-gray-600 via-gray-500 to-gray-700', accent: 'from-gray-400 to-gray-500', icon: 'text-gray-300' };
};

// 신화별 키워드 매핑 (모바일 최적화)
const getMythKeywords = (mythId: string) => {
  const keywordMap: Record<string, string[]> = {
    'seolmundae': ['창조', '거인', '산', '힘'],
    'samsin': ['출산', '생명', '보호', '어머니'],
    'jachungbi': ['풍요', '성장', '풍년', '번영'],
    'bonhyang': ['수호', '마을', '안전', '보호'],
    'yeongdeung': ['바다', '어부', '풍어', '바람'],
    'haesin': ['바다', '깊이', '신비', '수호'],
    'mundo': ['사랑', '로맨스', '연인', '감정'],
    'segyeong': ['질서', '법칙', '균형', '조화'],
    'dolharubang': ['수호', '고대', '돌', '보호'],
    'chilsung': ['별', '운명', '우주', '신비'],
  };
  return keywordMap[mythId] || ['신화', '전설', '이야기'];
};

export default function FlipCard({ myth }: FlipCardProps) {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const [lastTouchTime, setLastTouchTime] = useState<number>(0);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);

  // 카드 상태를 localStorage에서 복원
  React.useEffect(() => {
    const savedState = localStorage.getItem(`card-flipped-${myth.id}`);
    if (savedState === 'true') {
      setIsFlipped(true);
    }
  }, [myth.id]);

  // 카드 상태가 변경될 때마다 localStorage에 저장
  React.useEffect(() => {
    localStorage.setItem(`card-flipped-${myth.id}`, isFlipped.toString());
  }, [isFlipped, myth.id]);

  // 데스크톱: 마우스 호버로 플립 (모바일에서는 비활성화)
  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) { // md 브레이크포인트 이상
      setIsFlipped(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) { // md 브레이크포인트 이상
      setIsFlipped(false);
    }
  };

  // 데스크톱: 클릭으로 상세페이지 이동
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.innerWidth >= 768) { // PC에서만 클릭으로 상세페이지 이동
      // 현재 스크롤 위치 저장
      sessionStorage.setItem('myths-scroll-position', window.scrollY.toString());
      router.push(`/myth/${myth.id}`);
    }
  };
  
  // 모바일: 터치 시작 감지
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStartY(touch.clientY);
    setIsScrolling(false);
  };

  // 모바일: 터치 이동 감지 (스크롤 확인)
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const deltaY = Math.abs(touch.clientY - touchStartY);
    
    // 10px 이상 움직이면 스크롤로 간주
    if (deltaY > 10) {
      setIsScrolling(true);
    }
  };

  // 모바일: 터치 종료 감지
  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 스크롤 중이면 카드 뒤집기 방지
    if (isScrolling) {
      return;
    }
    
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTouchTime;
    
    if (timeDiff < 500) {
      // 더블탭 감지
      if (!isFlipped) {
        // 앞면에서 더블탭: 상세페이지로 이동
        // 현재 스크롤 위치 저장
        sessionStorage.setItem('myths-scroll-position', window.scrollY.toString());
        router.push(`/myth/${myth.id}`);
      }
    } else {
      // 싱글탭
      if (!isFlipped) {
        // 앞면에서 싱글탭: 뒷면 표시
        setIsFlipped(true);
      } else {
        // 뒷면에서 싱글탭: 앞면 표시
        setIsFlipped(false);
      }
    }
    
    setLastTouchTime(currentTime);
    setIsScrolling(false);
  };

  const MythIcon = getMythIcon(myth.id);
  const mythColors = getMythColors(myth.id);
  const mythKeywords = getMythKeywords(myth.id);

  return (
    <div 
      className="relative w-full aspect-[2/3] cursor-pointer perspective-1000 transform card-hover-transition hover:scale-105 hover:shadow-3xl active:scale-95"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="button"
      aria-label={`${myth.title} 신화 카드 - 터치하여 뒤집기`}
    >
      {/* 카드 컨테이너 */}
      <div className={`relative w-full h-full transform-style-preserve-3d card-flip-transition ${
        isFlipped ? 'rotate-y-180' : 'rotate-y-0'
      }`}>
        
        {/* 카드 앞면 - 깔끔한 디자인 */}
        <div className="absolute inset-0 w-full h-full backface-hidden card-face-transition">
          <div className="relative w-full h-full bg-gradient-to-br from-white via-gray-50 to-gray-100 border-2 border-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 rounded-2xl shadow-2xl overflow-hidden">
            {/* 프리미엄 테두리 효과 */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-purple-500/20 to-pink-500/20 rounded-2xl"></div>
            <div className="absolute inset-1 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-xl"></div>
            
            {/* 이미지 섹션 */}
            <div className="relative w-full h-full overflow-hidden rounded-xl">
                <MythImage 
                  src={myth.image} 
                  alt={myth.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover card-image-transition"
                  fallbackIconName={myth.iconName}
                  fallbackBgColor={myth.bgColor}
                />
            </div>
          </div>
        </div>

        {/* 카드 뒷면 - 새로운 구성 */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 card-face-transition">
          <div className={`relative w-full h-full bg-gradient-to-br ${mythColors.bg} border-2 border-gradient-to-r ${mythColors.accent} rounded-2xl shadow-2xl overflow-hidden`}>
            {/* 프리미엄 테두리 효과 */}
            <div className={`absolute inset-0 bg-gradient-to-r ${mythColors.accent}/20 rounded-2xl`}></div>
            <div className="absolute inset-1 bg-gradient-to-br from-black/10 via-transparent to-black/20 rounded-xl"></div>
            
            {/* 흐릿한 배경 이미지 */}
            <div className="absolute inset-0 opacity-10">
              <MythImage 
                src={myth.image} 
                alt={myth.title}
                width={400}
                height={600}
                className="w-full h-full object-cover"
                fallbackIconName={myth.iconName}
                fallbackBgColor={myth.bgColor}
              />
            </div>
            
            {/* 상단 제목 */}
            <div className="relative p-3 sm:p-4 pb-1 sm:pb-2">
              <h3 className="text-white font-bold text-center text-sm sm:text-lg leading-tight drop-shadow-lg">{myth.title}</h3>
            </div>

            {/* 중앙 아이콘 섹션 */}
            <div className="relative px-3 pb-2 flex-1 flex flex-col justify-center">
              <div className="text-center space-y-4 sm:space-y-6">
                {/* 신화 아이콘 */}
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
                    <MythIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${mythColors.icon} drop-shadow-md`} />
                  </div>
                </div>
                
                {/* 캐릭터 */}
                <div className="flex justify-center">
                  <div className="inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/25 backdrop-blur-sm border border-white/40 shadow-lg h-[32px] sm:h-[40px] w-fit">
                    <span className="text-white text-xs sm:text-sm font-bold drop-shadow-md">{myth.character}</span>
                  </div>
                </div>
                
                {/* MBTI */}
                <div className="flex justify-center">
                  <div className="inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/25 backdrop-blur-sm border border-white/40 shadow-lg h-[32px] sm:h-[40px] w-fit">
                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white drop-shadow-sm" />
                    <span className="text-white text-xs sm:text-sm font-bold drop-shadow-md">{myth.mbtiType}</span>
                  </div>
                </div>
                
                {/* 키워드 배지들 */}
                <div className="flex justify-center flex-wrap gap-0.5 sm:gap-1 mt-1 sm:mt-2 px-1 sm:px-2">
                  {mythKeywords.map((keyword, index) => (
                    <div key={index} className="inline-flex items-center px-1 sm:px-1.5 py-0.5 sm:py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm min-w-[28px] max-w-[50px] sm:max-w-none">
                      <span className="text-white text-[8px] sm:text-xs font-medium drop-shadow-md truncate text-center w-full">{keyword}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 하단 CTA - 맨 아래 고정 */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
              <div className="text-center">
                {/* 다중 펄스 효과 배경 */}
                {isButtonPressed && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-16 bg-white/30 rounded-full animate-ping absolute"></div>
                    <div className="w-24 h-12 bg-white/40 rounded-full animate-ping absolute animation-delay-75"></div>
                    <div className="w-16 h-8 bg-white/50 rounded-full animate-ping absolute animation-delay-150"></div>
                  </div>
                )}
                
                {/* 기본 상태에서도 미묘한 글로우 효과 */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <div className="w-20 h-10 bg-white/10 rounded-full animate-pulse"></div>
                </div>
                
                <div 
                  className={`relative inline-flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full backdrop-blur-sm border shadow-lg cursor-pointer transition-all duration-150 md:hidden ${
                    isButtonPressed 
                      ? 'bg-gradient-to-r from-white/90 to-white/70 scale-85 shadow-2xl border-white/90 transform rotate-2 ring-4 ring-white/30' 
                      : 'bg-gradient-to-r from-white/40 to-white/20 border-white/50 hover:bg-gradient-to-r hover:from-white/50 hover:to-white/30 hover:scale-110 hover:shadow-xl hover:ring-2 hover:ring-white/20'
                  }`}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsButtonPressed(true);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsButtonPressed(false);
                    // 버튼 클릭 시 시각적 피드백 후 이동
                    setTimeout(() => {
                      // 현재 스크롤 위치 저장
                      sessionStorage.setItem('myths-scroll-position', window.scrollY.toString());
                      router.push(`/myth/${myth.id}`);
                    }, 150);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsButtonPressed(true);
                    setTimeout(() => {
                      setIsButtonPressed(false);
                      // 현재 스크롤 위치 저장
                      sessionStorage.setItem('myths-scroll-position', window.scrollY.toString());
                      router.push(`/myth/${myth.id}`);
                    }, 150);
                  }}
                >
                  <Eye className={`h-4 w-4 sm:h-5 sm:w-5 drop-shadow-lg transition-all duration-150 ${
                    isButtonPressed ? 'text-white scale-125 animate-pulse' : 'text-white hover:scale-110'
                  }`} />
                  <span className={`text-sm sm:text-base font-black drop-shadow-lg transition-all duration-150 ${
                    isButtonPressed ? 'text-white scale-110 animate-pulse' : 'text-white hover:scale-105'
                  }`}>자세히 보기</span>
                  <ArrowRight className={`h-4 w-4 sm:h-5 sm:w-5 drop-shadow-lg transition-all duration-150 ${
                    isButtonPressed ? 'text-white scale-125 translate-x-1 animate-bounce' : 'text-white hover:scale-110 hover:translate-x-0.5'
                  }`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}