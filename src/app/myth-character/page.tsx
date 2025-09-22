'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle, Mountain, Heart, Waves, Shield, Star, Crown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MythImage from '@/components/MythImage';
import Link from 'next/link';

// 신화별 아이콘 매핑 (FlipCard와 동일)
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

// 신화별 맞춤 색상 매핑 (FlipCard와 동일)
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
    }, // 칠성신 - 별/운명 색상 (밝게)
  };
  return colorMap[mythId] || { bg: 'from-purple-600 via-purple-500 to-purple-700', accent: 'from-purple-400 to-violet-500', icon: 'text-purple-300' };
};

// 질문 데이터 타입
interface Question {
  id: string;
  question: string;
  options: {
    text: string;
    score: Record<string, number>; // 각 신화별 점수
  }[];
}

// 신화 캐릭터 데이터 타입
interface MythCharacter {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  mbtiType: string;
  traits: string[];
  compatibility: string;
}

// 질문 데이터 (랜덤으로 선택됨)
const questions: Question[] = [
  {
    id: 'q1',
    question: '새로운 환경에 적응할 때 당신은?',
    options: [
      { text: '빠르게 적응하고 리더십을 발휘한다', score: { 'seolmundae': 3, 'jachungbi': 2, 'segyeong': 1 } },
      { text: '신중하게 관찰하고 분석한다', score: { 'yeongdeung': 3, 'haesin': 2, 'chilsung': 1 } },
      { text: '다른 사람들과 함께 협력한다', score: { 'samsin': 3, 'bonhyang': 2, 'dolharubang': 1 } },
      { text: '감정적으로 깊이 몰입한다', score: { 'mundo': 3, 'samsin': 2, 'yeongdeung': 1 } }
    ]
  },
  {
    id: 'q2',
    question: '문제를 해결할 때 당신의 방식은?',
    options: [
      { text: '논리적이고 체계적으로 접근한다', score: { 'segyeong': 3, 'haesin': 2, 'seolmundae': 1 } },
      { text: '직관과 감정을 믿는다', score: { 'mundo': 3, 'yeongdeung': 2, 'samsin': 1 } },
      { text: '실용적이고 현실적인 방법을 선택한다', score: { 'jachungbi': 3, 'dolharubang': 2, 'bonhyang': 1 } },
      { text: '창의적이고 독창적인 아이디어를 제시한다', score: { 'chilsung': 3, 'seolmundae': 2, 'jachungbi': 1 } }
    ]
  },
  {
    id: 'q3',
    question: '스트레스를 받을 때 당신은?',
    options: [
      { text: '운동이나 활동으로 스트레스를 해소한다', score: { 'seolmundae': 3, 'jachungbi': 2, 'dolharubang': 1 } },
      { text: '조용한 곳에서 혼자 시간을 보낸다', score: { 'yeongdeung': 3, 'haesin': 2, 'chilsung': 1 } },
      { text: '가족이나 친구들과 이야기한다', score: { 'samsin': 3, 'bonhyang': 2, 'mundo': 1 } },
      { text: '새로운 취미나 활동을 시작한다', score: { 'segyeong': 3, 'chilsung': 2, 'jachungbi': 1 } }
    ]
  },
  {
    id: 'q4',
    question: '이상적인 휴가를 보낼 때 당신은?',
    options: [
      { text: '도전적인 등산이나 모험을 즐긴다', score: { 'seolmundae': 3, 'dolharubang': 2, 'jachungbi': 1 } },
      { text: '바다나 호수에서 평화로운 시간을 보낸다', score: { 'yeongdeung': 3, 'haesin': 2, 'mundo': 1 } },
      { text: '가족과 함께 따뜻한 시간을 보낸다', score: { 'samsin': 3, 'bonhyang': 2, 'jachungbi': 1 } },
      { text: '문화적 장소를 탐방하고 배운다', score: { 'segyeong': 3, 'chilsung': 2, 'haesin': 1 } }
    ]
  },
  {
    id: 'q5',
    question: '새로운 사람을 만날 때 당신은?',
    options: [
      { text: '적극적으로 다가가서 대화를 시작한다', score: { 'jachungbi': 3, 'seolmundae': 2, 'bonhyang': 1 } },
      { text: '상대방이 먼저 다가오기를 기다린다', score: { 'yeongdeung': 3, 'haesin': 2, 'samsin': 1 } },
      { text: '공통 관심사를 찾아 대화를 이끌어간다', score: { 'segyeong': 3, 'chilsung': 2, 'bonhyang': 1 } },
      { text: '감정적 교감을 중시한다', score: { 'mundo': 3, 'samsin': 2, 'yeongdeung': 1 } }
    ]
  },
  {
    id: 'q6',
    question: '중요한 결정을 내릴 때 당신은?',
    options: [
      { text: '빠르게 결정하고 실행한다', score: { 'seolmundae': 3, 'jachungbi': 2, 'dolharubang': 1 } },
      { text: '충분히 고민하고 신중하게 결정한다', score: { 'yeongdeung': 3, 'haesin': 2, 'segyeong': 1 } },
      { text: '다른 사람들의 의견을 듣고 결정한다', score: { 'samsin': 3, 'bonhyang': 2, 'jachungbi': 1 } },
      { text: '감정과 직감을 믿고 결정한다', score: { 'mundo': 3, 'chilsung': 2, 'yeongdeung': 1 } }
    ]
  },
  {
    id: 'q7',
    question: '완벽한 하루를 보낼 때 당신은?',
    options: [
      { text: '큰 성취를 이루는 하루', score: { 'seolmundae': 3, 'jachungbi': 2, 'segyeong': 1 } },
      { text: '평화롭고 조용한 하루', score: { 'yeongdeung': 3, 'haesin': 2, 'samsin': 1 } },
      { text: '사랑하는 사람들과 함께하는 하루', score: { 'samsin': 3, 'mundo': 2, 'bonhyang': 1 } },
      { text: '새로운 것을 배우고 발견하는 하루', score: { 'chilsung': 3, 'segyeong': 2, 'jachungbi': 1 } }
    ]
  },
  {
    id: 'q8',
    question: '갈등 상황에서 당신은?',
    options: [
      { text: '직접적으로 문제를 해결하려고 한다', score: { 'seolmundae': 3, 'dolharubang': 2, 'jachungbi': 1 } },
      { text: '상대방의 입장을 이해하려고 노력한다', score: { 'yeongdeung': 3, 'samsin': 2, 'haesin': 1 } },
      { text: '중재자 역할을 하며 화해를 도모한다', score: { 'bonhyang': 3, 'segyeong': 2, 'samsin': 1 } },
      { text: '감정적 교감을 통해 해결하려고 한다', score: { 'mundo': 3, 'yeongdeung': 2, 'chilsung': 1 } }
    ]
  },
  {
    id: 'q9',
    question: '새로운 기술을 배울 때 당신은?',
    options: [
      { text: '빠르게 익히고 다른 사람에게 가르친다', score: { 'jachungbi': 3, 'seolmundae': 2, 'bonhyang': 1 } },
      { text: '천천히 깊이 있게 학습한다', score: { 'segyeong': 3, 'haesin': 2, 'yeongdeung': 1 } },
      { text: '다른 사람들과 함께 학습한다', score: { 'samsin': 3, 'bonhyang': 2, 'jachungbi': 1 } },
      { text: '창의적이고 독창적인 방법으로 접근한다', score: { 'chilsung': 3, 'mundo': 2, 'segyeong': 1 } }
    ]
  },
  {
    id: 'q10',
    question: '미래에 대한 당신의 생각은?',
    options: [
      { text: '구체적인 계획을 세우고 실행한다', score: { 'seolmundae': 3, 'segyeong': 2, 'dolharubang': 1 } },
      { text: '자연스럽게 흘러가는 것을 믿는다', score: { 'yeongdeung': 3, 'haesin': 2, 'mundo': 1 } },
      { text: '가족과 함께하는 미래를 꿈꾼다', score: { 'samsin': 3, 'bonhyang': 2, 'jachungbi': 1 } },
      { text: '무한한 가능성을 상상한다', score: { 'chilsung': 3, 'jachungbi': 2, 'segyeong': 1 } }
    ]
  },
  {
    id: 'q11',
    question: '실패했을 때 당신의 반응은?',
    options: [
      { text: '빠르게 일어나서 다시 도전한다', score: { 'seolmundae': 3, 'jachungbi': 2, 'dolharubang': 1 } },
      { text: '신중하게 원인을 분석한다', score: { 'segyeong': 3, 'haesin': 2, 'yeongdeung': 1 } },
      { text: '다른 사람들의 격려를 받는다', score: { 'samsin': 3, 'bonhyang': 2, 'mundo': 1 } },
      { text: '감정적으로 치유하고 다시 시작한다', score: { 'mundo': 3, 'yeongdeung': 2, 'chilsung': 1 } }
    ]
  },
  {
    id: 'q12',
    question: '자유 시간에 당신이 하는 일은?',
    options: [
      { text: '새로운 프로젝트를 시작한다', score: { 'jachungbi': 3, 'seolmundae': 2, 'segyeong': 1 } },
      { text: '독서나 명상을 한다', score: { 'yeongdeung': 3, 'haesin': 2, 'chilsung': 1 } },
      { text: '가족이나 친구들과 시간을 보낸다', score: { 'samsin': 3, 'bonhyang': 2, 'mundo': 1 } },
      { text: '예술이나 창작 활동을 한다', score: { 'mundo': 3, 'chilsung': 2, 'jachungbi': 1 } }
    ]
  },
  {
    id: 'q13',
    question: '당신이 가장 중요하게 생각하는 것은?',
    options: [
      { text: '성취와 성공', score: { 'seolmundae': 3, 'jachungbi': 2, 'segyeong': 1 } },
      { text: '평화와 조화', score: { 'yeongdeung': 3, 'haesin': 2, 'samsin': 1 } },
      { text: '사랑과 관계', score: { 'samsin': 3, 'mundo': 2, 'bonhyang': 1 } },
      { text: '자유와 창의성', score: { 'chilsung': 3, 'mundo': 2, 'jachungbi': 1 } }
    ]
  },
  {
    id: 'q14',
    question: '새로운 아이디어를 제시할 때 당신은?',
    options: [
      { text: '확신을 가지고 적극적으로 제시한다', score: { 'seolmundae': 3, 'jachungbi': 2, 'bonhyang': 1 } },
      { text: '신중하게 검토 후 제시한다', score: { 'segyeong': 3, 'haesin': 2, 'yeongdeung': 1 } },
      { text: '다른 사람들과 협의 후 제시한다', score: { 'samsin': 3, 'bonhyang': 2, 'jachungbi': 1 } },
      { text: '감정적으로 어필하며 제시한다', score: { 'mundo': 3, 'yeongdeung': 2, 'chilsung': 1 } }
    ]
  },
  {
    id: 'q15',
    question: '당신의 에너지가 가장 높을 때는?',
    options: [
      { text: '새로운 도전을 시작할 때', score: { 'seolmundae': 3, 'jachungbi': 2, 'dolharubang': 1 } },
      { text: '조용한 환경에서 집중할 때', score: { 'yeongdeung': 3, 'haesin': 2, 'segyeong': 1 } },
      { text: '사람들과 함께할 때', score: { 'samsin': 3, 'bonhyang': 2, 'jachungbi': 1 } },
      { text: '창의적인 활동을 할 때', score: { 'chilsung': 3, 'mundo': 2, 'jachungbi': 1 } }
    ]
  }
];

// 신화 캐릭터 데이터
const mythCharacters: Record<string, MythCharacter> = {
  'seolmundae': {
    id: 'seolmundae',
    name: '설문대할망',
    title: '창조의 거인',
    description: '한라산과 제주도를 만든 거인 여신으로, 강력한 리더십과 창조력을 가진 당신은 큰 비전을 실현하는 능력이 있습니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3A71b6fa9b-e1a2-42d9-9d48-b4e1a6586a18%3A%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC.png?table=block&id=27610da3-ad82-8084-a49c-dc132e6ac241&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
    mbtiType: 'ENTJ',
    traits: ['리더십', '창조력', '결단력', '비전'],
    compatibility: '큰 프로젝트를 이끌고 새로운 것을 창조하는 일에 적합합니다.'
  },
  'samsin': {
    id: 'samsin',
    name: '삼승할망',
    title: '생명의 수호자',
    description: '아이들의 수명과 건강을 관장하는 출산의 여신으로, 따뜻한 마음과 보호 본능이 강한 당신은 다른 사람을 돌보는 일에 뛰어납니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3A5d7cda96-ec7b-4cea-aa2f-d4c6b8a5f546%3A%E1%84%89%E1%85%A1%E1%86%B7%E1%84%89%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC.png?table=block&id=27610da3-ad82-8082-8c0f-e492f14d5b13&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
    mbtiType: 'ISFJ',
    traits: ['보호', '따뜻함', '책임감', '배려'],
    compatibility: '교육, 의료, 사회복지 등 사람을 돌보는 직업에 적합합니다.'
  },
  'jachungbi': {
    id: 'jachungbi',
    name: '자청비',
    title: '풍요의 여신',
    description: '농사와 곡식을 풍요롭게 지켜주는 여신으로, 활기차고 긍정적인 에너지를 가진 당신은 성장과 발전을 이끄는 능력이 있습니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3Ac5b71d94-8575-4616-a1e0-32ac6818fbcb%3A%E1%84%8C%E1%85%A1%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%87%E1%85%B5.png?table=block&id=27610da3-ad82-8068-abb2-ea9a576fcdfb&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
    mbtiType: 'ENFP',
    traits: ['활력', '긍정성', '성장', '번영'],
    compatibility: '사업, 마케팅, 성장 관련 업무에 적합합니다.'
  },
  'bonhyang': {
    id: 'bonhyang',
    name: '본향당 수호신',
    title: '공동체의 지킴이',
    description: '마을을 지키는 토속 수호신으로, 공동체를 중시하고 안전을 추구하는 당신은 팀워크와 협력을 잘하는 능력이 있습니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3A58e9714f-5a6e-4445-a347-40b6054c2b06%3A%E1%84%87%E1%85%A9%E1%86%AB%E1%84%92%E1%85%A3%E1%86%BC%E1%84%83%E1%85%A1%E1%86%BC_%E1%84%89%E1%85%B5%E1%86%AB%E1%84%92%E1%85%AA(%E1%84%86%E1%85%A1%E1%84%8B%E1%85%B3%E1%86%AF_%E1%84%89%E1%85%AE%E1%84%92%E1%85%A9%E1%84%89%E1%85%B5%E1%86%AB).png?table=block&id=27610da3-ad82-8090-8250-fd4d32051887&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
    mbtiType: 'ESFJ',
    traits: ['협력', '안전', '공동체', '전통'],
    compatibility: '팀 관리, 커뮤니티 운영, 안전 관련 업무에 적합합니다.'
  },
  'yeongdeung': {
    id: 'yeongdeung',
    name: '영등할망',
    title: '바다의 지혜자',
    description: '매년 음력 2월 제주 바다를 찾아오는 바람과 바다의 여신으로, 자연의 리듬을 읽고 조화를 추구하는 당신은 직관력이 뛰어납니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3A977df292-30a3-4c78-9fc3-a526a66b55a9%3A%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%83%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC.png?table=block&id=27610da3-ad82-801f-bb1b-e8c8e56862d6&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
    mbtiType: 'INFJ',
    traits: ['직관', '조화', '자연', '지혜'],
    compatibility: '상담, 연구, 환경 관련 업무에 적합합니다.'
  },
  'haesin': {
    id: 'haesin',
    name: '해신',
    title: '바다의 통치자',
    description: '바다 깊은 곳에 사는 용왕으로, 질서와 권위를 중시하며 바다의 질서를 관장하는 당신은 체계적이고 규율을 잘 지킵니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3Aac02e034-63c2-4289-add3-940372dfdee4%3A%E1%84%92%E1%85%A2%E1%84%89%E1%85%B5%E1%86%AB(%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%8B%E1%85%AA%E1%86%BC_%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%89%E1%85%A5%E1%86%AF).png?table=block&id=27610da3-ad82-80d8-ab8d-ebfb757fabdc&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
    mbtiType: 'ESTJ',
    traits: ['질서', '권위', '체계', '규율'],
    compatibility: '관리, 행정, 규율 관련 업무에 적합합니다.'
  },
  'mundo': {
    id: 'mundo',
    name: '문도령',
    title: '사랑의 순례자',
    description: '인간과 선녀의 비극적 사랑 이야기의 주인공으로, 감성적이고 열정적인 당신은 깊은 감정과 예술적 감각을 가지고 있습니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3A842a5830-1708-4b04-abdb-1655df672d22%3A%E1%84%86%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A9%E1%84%85%E1%85%A7%E1%86%BC.png?table=block&id=27610da3-ad82-80bf-9459-dd1260eb7da0&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
    mbtiType: 'INFP',
    traits: ['감성', '열정', '예술', '로맨스'],
    compatibility: '예술, 창작, 감정 관련 업무에 적합합니다.'
  },
  'segyeong': {
    id: 'segyeong',
    name: '세경본풀이',
    title: '질서의 설계자',
    description: '인간과 신의 결합으로 새로운 질서를 만든 신으로, 논리적이고 체계적인 당신은 새로운 시스템을 설계하는 능력이 있습니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3A50bc7095-e608-46bc-a654-a57f0a230f1b%3A%E1%84%89%E1%85%A6%E1%84%80%E1%85%A7%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB%E1%84%91%E1%85%AE%E1%86%AF%E1%84%8B%E1%85%B5.png?table=block&id=27610da3-ad82-8070-955e-d05e57dd5ded&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
    mbtiType: 'INTJ',
    traits: ['논리', '체계', '설계', '혁신'],
    compatibility: '기획, 설계, 시스템 개발에 적합합니다.'
  },
  'dolharubang': {
    id: 'dolharubang',
    name: '돌하르방',
    title: '수호의 석상',
    description: '마을 입구를 지키는 수호석상으로, 신뢰성 있고 안정적인 당신은 변함없이 자리를 지키며 보호하는 능력이 있습니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3A8c559453-b909-40b4-a069-89aa57729b14%3A%E1%84%83%E1%85%A9%E1%86%AF%E1%84%92%E1%85%A1%E1%84%85%E1%85%B3%E1%84%87%E1%85%A1%E1%86%BC(%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%89%E1%85%B3%E1%86%BC).png?table=block&id=27610da3-ad82-80be-a71a-ca4d6cfdd52d&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
    mbtiType: 'ISTJ',
    traits: ['신뢰', '안정', '보호', '지속성'],
    compatibility: '보안, 품질관리, 안정적 업무에 적합합니다.'
  },
  'chilsung': {
    id: 'chilsung',
    name: '칠성신',
    title: '별의 예언자',
    description: '하늘의 일곱 별과 인간 운명을 연결하는 신으로, 창의적이고 직관적인 당신은 무한한 가능성을 상상하는 능력이 있습니다.',
    image: 'https://gdpark-official.notion.site/image/attachment%3Aed208b98-993c-4ded-9395-6d8f260a2dc0%3A%E1%84%8E%E1%85%B5%E1%86%AF%E1%84%89%E1%85%A5%E1%86%BC%E1%84%89%E1%85%B5%E1%86%AB.png?table=block&id=27610da3-ad82-805f-afc8-c470f0a7e621&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
    mbtiType: 'ENTP',
    traits: ['창의', '직관', '상상', '혁신'],
    compatibility: '기획, 마케팅, 창작 관련 업무에 적합합니다.'
  }
};

export default function MythCharacterPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<MythCharacter | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  // 랜덤 질문 10개 선택
  useEffect(() => {
    if (isStarted && selectedQuestions.length === 0) {
      const shuffled = [...questions].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 10);
      setSelectedQuestions(selected);
    }
  }, [isStarted, selectedQuestions.length]);

  // 점수 계산
  const calculateScore = () => {
    const newScores: Record<string, number> = {};
    
    Object.keys(mythCharacters).forEach(mythId => {
      newScores[mythId] = 0;
    });

    selectedQuestions.forEach((question) => {
      const answerIndex = answers[question.id];
      if (answerIndex !== undefined) {
        const selectedOption = question.options[answerIndex];
        Object.keys(selectedOption.score).forEach(mythId => {
          newScores[mythId] += selectedOption.score[mythId];
        });
      }
    });

    setScores(newScores);
    
    // 가장 높은 점수의 신화 캐릭터 찾기
    const maxScore = Math.max(...Object.values(newScores));
    const topMyth = Object.keys(newScores).find(mythId => newScores[mythId] === maxScore);
    
    if (topMyth) {
      setResult(mythCharacters[topMyth]);
    }
  };

  // 답변 선택
  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // 다음 질문으로 이동
  const handleNext = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateScore();
    }
  };

  // 이전 질문으로 이동
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // 테스트 시작
  const handleStart = () => {
    setIsStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScores({});
    setResult(null);
  };

  // 테스트 다시 시작
  const handleRestart = () => {
    setIsStarted(false);
    setSelectedQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScores({});
    setResult(null);
  };

  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === selectedQuestions.length - 1;
  const hasAnswered = currentQuestion && answers[currentQuestion.id] !== undefined;

  return (
    <div className="min-h-screen brand-gradient">
      <Header />
      
      <div className="pt-16"></div>

      <main className="container mx-auto px-2 sm:px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {!isStarted ? (
            // 시작 화면
            <section className="text-center py-8 sm:py-16 px-2">
              <div className="mb-6 sm:mb-8">
                <div className="mx-auto mb-4 sm:mb-6 p-4 sm:p-6 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl w-fit shadow-xl">
                  <Sparkles className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent drop-shadow-lg">
                  나의 신화 캐릭터
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 font-medium max-w-2xl mx-auto leading-relaxed">
                  간단한 질문 10개로 나의 제주 신화 캐릭터를 찾아보세요!
                </p>
              </div>
              
              <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-2 border-purple-200/50 max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl text-gray-800">테스트 안내</CardTitle>
                </CardHeader>
                <CardContent className="text-left">
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                      <span>총 10개의 질문이 랜덤으로 출제됩니다</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                      <span>각 질문마다 4개의 선택지가 있습니다</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                      <span>답변에 따라 신화 캐릭터가 매칭됩니다</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                      <span>소요 시간: 약 3-5분</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Button 
                onClick={handleStart}
                size="lg" 
                className="mt-6 sm:mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                <Sparkles className="mr-3 h-6 w-6" />
                테스트 시작하기
              </Button>
            </section>
          ) : result ? (
            // 결과 화면
            <section className="text-center py-8 sm:py-16 px-2">
              <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent drop-shadow-lg">
                  당신의 신화 캐릭터
                </h1>
              </div>

              <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-2 border-purple-200/50 max-w-4xl mx-auto">
                <CardHeader>
                  <div className="text-center">
                    <div className={`mx-auto mb-4 p-4 bg-gradient-to-br ${getMythColors(result.id).bg} rounded-2xl w-fit shadow-xl`}>
                      {React.createElement(getMythIcon(result.id), { className: `h-8 w-8 ${getMythColors(result.id).icon}` })}
                    </div>
                    <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-gray-800 mb-2">{result.name}</CardTitle>
                    <p className={`text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r ${getMythColors(result.id).accent} bg-clip-text text-transparent`}>{result.title}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 이미지와 설명을 나란히 배치 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
                    {/* 신 이미지 */}
                    <div className="aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl relative bg-gradient-to-br from-gray-100 to-gray-200">
                      <MythImage 
                        src={result.image} 
                        alt={result.name}
                        width={400}
                        height={600}
                        className="w-full h-full object-contain"
                        fallbackIconName="Sparkles"
                        fallbackBgColor="from-purple-400 to-purple-600"
                      />
                    </div>
                    
                    {/* 설명 텍스트와 정보 카드들 */}
                    <div className="text-center md:text-left space-y-4 sm:space-y-6">
                      <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                        {result.description}
                      </p>
                      
                      {/* 정보 카드들 */}
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-purple-50 p-4 rounded-xl">
                          <div className="text-sm text-purple-600 mb-1">성격 유형</div>
                          <div className="font-bold text-lg text-purple-800">{result.mbtiType}</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl">
                          <div className="text-sm text-purple-600 mb-1">주요 특성</div>
                          <div className="font-bold text-lg text-purple-800">{result.traits.join(', ')}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                    <div className="text-sm text-purple-600 mb-2">적합한 분야</div>
                    <div className="text-gray-700 font-medium">{result.compatibility}</div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button 
                  onClick={handleRestart}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  다시 테스트하기
                </Button>
                <Link href={`/myth/${result.id}`} className="w-full sm:w-auto">
                  <Button 
                    size="lg"
                    className={`w-full bg-gradient-to-r ${getMythColors(result.id).accent} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    {React.createElement(getMythIcon(result.id), { className: "mr-2 h-5 w-5" })}
                    {result.name} 상세보기
                  </Button>
                </Link>
                <Link href="/myths" className="w-full sm:w-auto">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    <ArrowRight className="mr-2 h-5 w-5" />
                    다른 신화 보기
                  </Button>
                </Link>
              </div>
            </section>
          ) : (
            // 질문 화면
            <section className="py-8 sm:py-16 px-2">
              {currentQuestion && (
                <div className="max-w-3xl mx-auto">
                  {/* 진행률 표시 */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs sm:text-sm text-gray-600">질문 {currentQuestionIndex + 1} / {selectedQuestions.length}</span>
                      <span className="text-xs sm:text-sm text-gray-600">{Math.round(((currentQuestionIndex + 1) / selectedQuestions.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / selectedQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 질문 카드 */}
                  <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-2 border-purple-200/50 mb-8">
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl lg:text-2xl text-gray-800 text-center">
                        {currentQuestion.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, optionIndex) => (
                          <button
                            key={optionIndex}
                            onClick={() => handleAnswerSelect(currentQuestion.id, optionIndex)}
                            className={`w-full p-3 sm:p-4 text-left rounded-xl border-2 transition-all duration-300 text-sm sm:text-base ${
                              answers[currentQuestion.id] === optionIndex
                                ? 'border-purple-600 bg-purple-100 text-purple-900 shadow-xl ring-2 ring-purple-200'
                                : 'border-gray-300 bg-white hover:border-purple-400 hover:bg-purple-50 hover:shadow-lg'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                                answers[currentQuestion.id] === optionIndex
                                  ? 'border-purple-600 bg-purple-600 shadow-lg'
                                  : 'border-gray-400 hover:border-purple-400'
                              }`}>
                                {answers[currentQuestion.id] === optionIndex && (
                                  <div className="w-full h-full rounded-full bg-white scale-60 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                                  </div>
                                )}
                              </div>
                              <span className={`font-medium transition-colors duration-300 ${
                                answers[currentQuestion.id] === optionIndex
                                  ? 'text-purple-900 font-semibold'
                                  : 'text-gray-700'
                              }`}>{option.text}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 네비게이션 버튼 */}
                  <div className="flex justify-between">
                    <Button
                      onClick={handlePrevious}
                      variant="outline"
                      disabled={currentQuestionIndex === 0}
                      className="border-purple-300 text-purple-600 hover:bg-purple-50"
                    >
                      이전
                    </Button>
                    
                    <Button
                      onClick={handleNext}
                      disabled={!hasAnswered}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      {isLastQuestion ? '결과 보기' : '다음'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
