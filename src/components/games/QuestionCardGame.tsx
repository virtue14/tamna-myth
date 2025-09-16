'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Play, RefreshCw, CheckCircle } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

interface QuestionCardGameProps {
  questions: string[];
}

export default function QuestionCardGame({ questions }: QuestionCardGameProps) {
  const { gameState, startGame, endGame, resetGame, getRandomItem } = useGameState(questions);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const handleDrawCard = () => {
    getRandomItem();
    setShowAnswer(false);
    setUserAnswer('');
  };

  const handleStartGame = () => {
    startGame();
    setShowAnswer(false);
    setUserAnswer('');
  };

  const handleEndGame = () => {
    endGame();
    setShowAnswer(false);
    setUserAnswer('');
  };

  const handleReset = () => {
    resetGame();
    setShowAnswer(false);
    setUserAnswer('');
    setAnsweredQuestions(new Set());
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleAnswerSubmit = () => {
    if (gameState.currentItem) {
      const questionIndex = questions.indexOf(gameState.currentItem);
      setAnsweredQuestions(prev => new Set([...prev, questionIndex]));
    }
    setShowAnswer(false);
    setUserAnswer('');
  };

  const getGameDuration = () => {
    if (!gameState.startTime) return '0분 0초';
    const endTime = gameState.endTime || new Date();
    const duration = Math.floor((endTime.getTime() - gameState.startTime.getTime()) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}분 ${seconds}초`;
  };

  return (
    <div className="space-y-6">
      {/* 게임 상태 표시 */}
      <Card className="bg-jeju-teal-light/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-jeju-basalt-dark flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            게임 상태
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/60 p-3 rounded-lg">
              <div className="text-sm text-jeju-basalt">게임 시간</div>
              <div className="font-bold text-jeju-basalt-dark">{getGameDuration()}</div>
            </div>
            <div className="bg-white/60 p-3 rounded-lg">
              <div className="text-sm text-jeju-basalt">답한 질문</div>
              <div className="font-bold text-jeju-basalt-dark">{answeredQuestions.size}</div>
            </div>
            <div className="bg-white/60 p-3 rounded-lg">
              <div className="text-sm text-jeju-basalt">남은 질문</div>
              <div className="font-bold text-jeju-basalt-dark">{questions.length - answeredQuestions.size}</div>
            </div>
            <div className="bg-white/60 p-3 rounded-lg">
              <div className="text-sm text-jeju-basalt">게임 상태</div>
              <div className="font-bold text-jeju-basalt-dark">
                {gameState.isPlaying ? '진행 중' : '대기 중'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 질문 카드 영역 */}
      <Card className="bg-jeju-sand/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-jeju-basalt-dark text-center">질문 카드</CardTitle>
          <CardDescription className="text-center">
            카드를 뽑아서 질문에 솔직하게 답해보세요!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* 질문 카드 시각화 */}
            <div className="relative mx-auto w-80 h-48">
              <div className="w-full h-full bg-gradient-to-br from-jeju-teal-light to-jeju-teal-dark rounded-lg shadow-lg flex items-center justify-center border-4 border-jeju-teal-light">
                {gameState.currentItem ? (
                  <div className="p-6 text-center">
                    <div className="text-lg font-bold text-jeju-basalt-dark mb-4">
                      질문 {gameState.history.length}
                    </div>
                    <div className="text-jeju-basalt-dark">
                      {gameState.currentItem}
                    </div>
                  </div>
                ) : (
                  <div className="text-jeju-basalt text-center">
                    <HelpCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>카드를 뽑아보세요!</p>
                  </div>
                )}
              </div>
            </div>

            {/* 답변 입력 영역 */}
            {gameState.currentItem && !showAnswer && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-jeju-basalt-dark mb-2">
                    당신의 답변을 입력해주세요:
                  </label>
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="솔직하게 답해보세요..."
                    className="w-full p-4 border border-jeju-basalt-light rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-jeju-teal"
                    rows={3}
                  />
                </div>
                <div className="flex gap-4 justify-center">
                  <Button onClick={handleShowAnswer} size="lg">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    답변 완료
                  </Button>
                  <Button onClick={handleAnswerSubmit} variant="outline" size="lg">
                    다음 질문
                  </Button>
                </div>
              </div>
            )}

            {/* 답변 확인 영역 */}
            {showAnswer && (
              <div className="bg-jeju-orange-light/20 p-6 rounded-lg border border-jeju-orange-light">
                <h3 className="text-xl font-bold text-jeju-basalt-dark mb-4">답변 확인</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-jeju-basalt mb-2">질문:</div>
                    <div className="text-jeju-basalt-dark font-medium">{gameState.currentItem}</div>
                  </div>
                  <div>
                    <div className="text-sm text-jeju-basalt mb-2">당신의 답변:</div>
                    <div className="text-jeju-basalt-dark bg-white/60 p-3 rounded-lg">
                      {userAnswer || '답변을 입력하지 않았습니다.'}
                    </div>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button onClick={handleAnswerSubmit} size="lg">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      답변 확정
                    </Button>
                    <Button onClick={() => setShowAnswer(false)} variant="outline" size="lg">
                      다시 답하기
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* 컨트롤 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!gameState.isPlaying ? (
                <Button onClick={handleStartGame} size="lg" className="text-lg px-8 py-4">
                  <Play className="mr-2 h-5 w-5" />
                  게임 시작
                </Button>
              ) : (
                <>
                  <Button onClick={handleDrawCard} size="lg" className="text-lg px-8 py-4">
                    <HelpCircle className="mr-2 h-5 w-5" />
                    카드 뽑기
                  </Button>
                  <Button onClick={handleEndGame} variant="outline" size="lg">
                    게임 종료
                  </Button>
                </>
              )}
              <Button onClick={handleReset} variant="outline" size="lg">
                <RefreshCw className="mr-2 h-4 w-4" />
                리셋
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 게임 히스토리 */}
      {gameState.history.length > 0 && (
        <Card className="bg-jeju-basalt-light/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-jeju-basalt-dark">게임 히스토리</CardTitle>
            <CardDescription>
              지금까지 답한 질문들입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {gameState.history.map((question, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/60 p-3 rounded-lg">
                  <div className="w-6 h-6 bg-jeju-teal text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-jeju-basalt-dark">{question}</span>
                  {answeredQuestions.has(index) && (
                    <CheckCircle className="h-4 w-4 text-jeju-teal ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
