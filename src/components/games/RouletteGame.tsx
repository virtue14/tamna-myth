'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Play, RefreshCw, Trophy } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

interface RouletteGameProps {
  items: string[];
}

export default function RouletteGame({ items }: RouletteGameProps) {
  const { gameState, startGame, endGame, resetGame, getRandomItem } = useGameState(items);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSpin = async () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowResult(false);
    
    // 룰렛 회전 애니메이션 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    getRandomItem();
    setIsSpinning(false);
    setShowResult(true);
  };

  const handleStartGame = () => {
    startGame();
    setShowResult(false);
  };

  const handleEndGame = () => {
    endGame();
    setShowResult(false);
  };

  const handleReset = () => {
    resetGame();
    setShowResult(false);
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
      <Card className="bg-jeju-orange-light/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-jeju-basalt-dark flex items-center gap-2">
            <Trophy className="h-5 w-5" />
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
              <div className="text-sm text-jeju-basalt">사용된 아이템</div>
              <div className="font-bold text-jeju-basalt-dark">{gameState.history.length}</div>
            </div>
            <div className="bg-white/60 p-3 rounded-lg">
              <div className="text-sm text-jeju-basalt">남은 아이템</div>
              <div className="font-bold text-jeju-basalt-dark">{items.length - gameState.history.length}</div>
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

      {/* 룰렛 영역 */}
      <Card className="bg-jeju-sand/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-jeju-basalt-dark text-center">랜덤 룰렛</CardTitle>
          <CardDescription className="text-center">
            룰렛을 돌려서 랜덤한 술자리 규칙을 받아보세요!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            {/* 룰렛 시각화 */}
            <div className="relative mx-auto w-64 h-64">
              <div className={`w-full h-full rounded-full border-8 border-jeju-orange-light bg-gradient-to-br from-jeju-orange-light to-jeju-orange-dark flex items-center justify-center transition-transform duration-2000 ${isSpinning ? 'animate-spin' : ''}`}>
                <div className="w-8 h-8 bg-jeju-basalt-dark rounded-full"></div>
              </div>
              {showResult && gameState.currentItem && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-jeju-teal text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
                    <div className="text-sm font-bold">결과!</div>
                  </div>
                </div>
              )}
            </div>

            {/* 결과 표시 */}
            {showResult && gameState.currentItem && (
              <div className="bg-jeju-teal-light/20 p-6 rounded-lg border border-jeju-teal-light">
                <h3 className="text-xl font-bold text-jeju-basalt-dark mb-2">룰렛 결과</h3>
                <p className="text-lg text-jeju-basalt-dark">{gameState.currentItem}</p>
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
                  <Button 
                    onClick={handleSpin} 
                    disabled={isSpinning}
                    size="lg" 
                    className="text-lg px-8 py-4"
                  >
                    <RotateCcw className={`mr-2 h-5 w-5 ${isSpinning ? 'animate-spin' : ''}`} />
                    {isSpinning ? '룰렛 돌리는 중...' : '룰렛 돌리기'}
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
              지금까지 나온 룰렛 결과들입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {gameState.history.map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/60 p-3 rounded-lg">
                  <div className="w-6 h-6 bg-jeju-orange text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-jeju-basalt-dark">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
