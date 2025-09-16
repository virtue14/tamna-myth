'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Volume2, BookOpen, Mountain, Heart, Waves, Shield, Star, Crown, Pause, Loader2, RefreshCw } from 'lucide-react';
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

interface MythDetailClientProps {
  myth: MythData;
}

export default function MythDetailClient({ myth }: MythDetailClientProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [aiSummary, setAiSummary] = useState<string>(myth.aiSummary || 'AI 한줄 요약을 생성해보세요!');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  // 음성 재생 함수
  const playVoice = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      
      // 기존 오디오가 재생 중이면 정지
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: myth.voiceMessage, // 신의 특성을 나타내는 한마디만 재생
          mythId: myth.id
        })
      });
      
      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const newAudio = new Audio(audioUrl);
        
        // 자동재생 방지 설정
        newAudio.autoplay = false;
        newAudio.preload = 'none';
        
        newAudio.onplay = () => setIsPlaying(true);
        newAudio.onpause = () => setIsPlaying(false);
        newAudio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
        };
        
        setAudio(newAudio);
        await newAudio.play();
      } else {
        console.error('음성 생성 실패');
      }
    } catch (error) {
      console.error('음성 재생 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 음성 정지 함수
  const stopVoice = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // AI 요약 생성 함수 (매번 새롭게 생성)
  const generateSummary = useCallback(async () => {
    if (isSummaryLoading) return;
    
    try {
      setIsSummaryLoading(true);
      
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          story: myth.story,
          title: myth.title,
          character: myth.character
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setAiSummary(data.summary);
      } else {
        console.error('AI 요약 생성 실패');
        setAiSummary('AI 요약을 생성할 수 없습니다.');
      }
    } catch (error) {
      console.error('AI 요약 생성 오류:', error);
      setAiSummary('AI 요약을 생성할 수 없습니다.');
    } finally {
      setIsSummaryLoading(false);
    }
  }, [isSummaryLoading, myth.story, myth.title, myth.character]);

  // 자동 생성 제거 - 버튼 클릭 시에만 생성

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
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <Button 
                        size="lg" 
                        onClick={isPlaying ? stopVoice : playVoice}
                        disabled={isLoading}
                        className={`font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border ${
                          isLoading 
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : isPlaying
                            ? 'bg-red-500 hover:bg-red-600 text-white border-red-500'
                            : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border-gray-200'
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            생성 중...
                          </>
                        ) : isPlaying ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            정지
                          </>
                        ) : (
                          <>
                            <Volume2 className="h-4 w-4 mr-2" />
                            AI 음성 듣기
                          </>
                        )}
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
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-myth-gray-dark flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    AI 한줄 요약
                    {isSummaryLoading && (
                      <div className="ml-2">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                      </div>
                    )}
                  </CardTitle>
                  <Button
                    onClick={generateSummary}
                    disabled={isSummaryLoading}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <RefreshCw className={`h-4 w-4 ${isSummaryLoading ? 'animate-spin' : ''}`} />
                    AI 요약 생성
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isSummaryLoading ? (
                  <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>AI가 요약을 생성하고 있습니다...</span>
                  </div>
                ) : (
                  <p className="text-lg leading-relaxed text-gray-700 font-medium">
                    {aiSummary}
                  </p>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Action Buttons */}
          <section className="text-center">
            <div className="flex justify-center">
              <Link href="/myths">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                  <BookOpen className="h-5 w-5 mr-3" />
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
