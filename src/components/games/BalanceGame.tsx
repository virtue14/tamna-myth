'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BalanceQuestion {
  id: string;
  left: string;
  right: string;
  leftAction?: string;
  rightAction?: string;
}

const balanceQuestions: BalanceQuestion[] = [
  {
    id: '1',
    left: '설문대할망과 함께 한라산 오르기',
    right: '삼신할망과 마을 지키기',
    leftAction: '한라산 오르기 시늉 10초',
    rightAction: '마을 지키기 시늉 10초'
  },
  {
    id: '2',
    left: '피자',
    right: '치킨'
  },
  {
    id: '3',
    left: '죽방할망처럼 바다 안전 기원 춤 5초',
    right: '해녀 할망처럼 물질 안전 시늉 5초'
  },
  {
    id: '4',
    left: '겨울',
    right: '여름'
  },
  {
    id: '5',
    left: '돌하르방 포즈 5초',
    right: '백록할망 숲 보호 시늉 5초'
  },
  {
    id: '6',
    left: '바다',
    right: '산'
  },
  {
    id: '7',
    left: '자청비 농사짓는 시늉 5초',
    right: '오름신 산 오르기 시늉 5초'
  },
  {
    id: '8',
    left: '아침형 인간',
    right: '밤형 인간'
  },
  {
    id: '9',
    left: '삼승할망 역할극 10초',
    right: '설문대할망 역할극 10초'
  },
  {
    id: '10',
    left: '커피',
    right: '차'
  },
  {
    id: '11',
    left: '설문대할망 산 정상 포즈',
    right: '백록할망 숲 산책 포즈'
  },
  {
    id: '12',
    left: '영화',
    right: '책'
  },
  {
    id: '13',
    left: '돌하르방 웃긴 포즈 5초',
    right: '삼신할망 손짓 포즈 5초'
  },
  {
    id: '14',
    left: '치킨 무',
    right: '피클'
  },
  {
    id: '15',
    left: '해녀 할망 역할극',
    right: '죽방할망 역할극'
  },
  {
    id: '16',
    left: '맥주',
    right: '소주'
  },
  {
    id: '17',
    left: '삼승할망 퀴즈 맞추기',
    right: '죽방할망 퀴즈 맞추기'
  },
  {
    id: '18',
    left: '라면 국물',
    right: '라면 건더기'
  },
  {
    id: '19',
    left: '설문대할망 이야기 듣기',
    right: '삼승할망 이야기 듣기'
  },
  {
    id: '20',
    left: '노래방',
    right: '영화관'
  },
  {
    id: '21',
    left: '돌하르방 그림 따라 그리기',
    right: '삼신할망 그림 따라 그리기'
  },
  {
    id: '22',
    left: '초콜릿',
    right: '아이스크림'
  },
  {
    id: '23',
    left: '해적 룰렛 돌리기',
    right: '악어 이빨 눌러보기'
  },
  {
    id: '24',
    left: '맵게 먹기',
    right: '짜게 먹기'
  },
  {
    id: '25',
    left: '풍어 기원 춤 5초',
    right: '재난 예방 시늉 5초'
  },
  {
    id: '26',
    left: '여행: 해외',
    right: '여행: 국내'
  },
  {
    id: '27',
    left: '바다 신 이야기 듣기',
    right: '산 신 이야기 듣기'
  },
  {
    id: '28',
    left: '탕',
    right: '볶음'
  },
  {
    id: '29',
    left: '죽방할망 풍어 춤 5초',
    right: '해녀 안전 기원 춤 5초'
  },
  {
    id: '30',
    left: '넷플릭스',
    right: '유튜브'
  },
  {
    id: '31',
    left: '캐릭터 이름 맞추기 퀴즈',
    right: '캐릭터 행동 맞추기 퀴즈'
  },
  {
    id: '32',
    left: 'SNS: 인스타',
    right: 'SNS: 틱톡'
  },
  {
    id: '33',
    left: '선녀 포즈 흉내',
    right: '설문대할망 포즈 흉내'
  },
  {
    id: '34',
    left: '운동: 헬스',
    right: '운동: 요가'
  },
  {
    id: '35',
    left: '오름 정상 포즈 5초',
    right: '바다 보호 포즈 5초'
  },
  {
    id: '36',
    left: '스마트폰: iOS',
    right: '안드로이드'
  },
  {
    id: '37',
    left: '돌하르방 발랄 포즈',
    right: '백록할망 우아 포즈'
  },
  {
    id: '38',
    left: '노트북: 맥북',
    right: '윈도우'
  },
  {
    id: '39',
    left: '캐릭터 포즈 사진 찍기',
    right: '랜덤 행동 수행'
  },
  {
    id: '40',
    left: '버거: 치즈버거',
    right: '불고기버거'
  },
  {
    id: '41',
    left: '삼승할망 퀴즈 맞추기',
    right: '죽방할망 퀴즈 맞추기'
  },
  {
    id: '42',
    left: '길거리 음식: 떡볶이',
    right: '순대'
  },
  {
    id: '43',
    left: '해적 룰렛에서 살아남기',
    right: '악어 게임에서 살아남기'
  },
  {
    id: '44',
    left: '영화 장르: 공포',
    right: '코미디'
  },
  {
    id: '45',
    left: '캐릭터 포즈 따라하기',
    right: '캐릭터 목소리 따라하기'
  },
  {
    id: '46',
    left: '카페: 아메리카노',
    right: '라떼'
  },
  {
    id: '47',
    left: '술잔 들고 10초 버티기',
    right: '눈 감고 술 마시기'
  },
  {
    id: '48',
    left: '야식: 피자',
    right: '치킨'
  },
  {
    id: '49',
    left: 'ENFJ형 캐릭터 미션 수행',
    right: 'INTJ형 캐릭터 미션 수행'
  },
  {
    id: '50',
    left: '야외 활동: 캠핑',
    right: '수영'
  }
];

export default function BalanceGame() {
  const [currentQuestion, setCurrentQuestion] = useState<BalanceQuestion | null>(null);

  // 랜덤 질문 선택
  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * balanceQuestions.length);
    return balanceQuestions[randomIndex];
  };

  // 컴포넌트 마운트 시 랜덤 질문 설정
  useEffect(() => {
    const question = getRandomQuestion();
    setCurrentQuestion(question);
  }, []);

  // 새 질문 가져오기
  const getNewQuestion = () => {
    const question = getRandomQuestion();
    setCurrentQuestion(question);
  };

  return (
    <div className="space-y-6">
      {/* 밸런스 게임 제목 */}
      <div className="text-center px-2">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">밸런스 게임</h2>
        <p className="text-sm sm:text-base text-gray-600">두 선택지를 비교해보세요!</p>
      </div>

      {/* 질문 카드 */}
      <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-2 border-purple-200/50">
        <CardHeader>
          <CardTitle className="text-center text-lg sm:text-xl text-gray-800">밸런스 게임</CardTitle>
        </CardHeader>
        <CardContent>
          {currentQuestion && (
            <div className="space-y-6">
              {/* 선택지 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {/* 왼쪽 선택지 */}
                <div className="p-4 sm:p-6 rounded-xl border-2 border-gray-300 bg-white shadow-md">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl mb-2 text-purple-600 font-bold">A</div>
                    <div className="font-bold text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed">{currentQuestion.left}</div>
                  </div>
                </div>

                {/* 오른쪽 선택지 */}
                <div className="p-4 sm:p-6 rounded-xl border-2 border-gray-300 bg-white shadow-md">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl mb-2 text-teal-600 font-bold">B</div>
                    <div className="font-bold text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed">{currentQuestion.right}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 컨트롤 버튼 */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={getNewQuestion}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          새 질문
        </Button>
      </div>
    </div>
  );
}