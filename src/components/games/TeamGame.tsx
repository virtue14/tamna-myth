'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Play, RefreshCw, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { useTeamGameState } from '@/hooks/useGameState';

interface TeamGameProps {
  questions: Array<{ question: string; answer: string }>;
}

export default function TeamGame({ questions }: TeamGameProps) {
  const { gameState, startGame, endGame, resetGame, getRandomQuestion, switchTeam, addTeamScore } = useTeamGameState(questions);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [lastResult, setLastResult] = useState<'correct' | 'incorrect' | null>(null);

  const handleDrawQuestion = () => {
    getRandomQuestion();
    setShowAnswer(false);
    setUserAnswer('');
    setLastResult(null);
  };

  const handleStartGame = () => {
    startGame();
    setShowAnswer(false);
    setUserAnswer('');
    setLastResult(null);
  };

  const handleEndGame = () => {
    endGame();
    setShowAnswer(false);
    setUserAnswer('');
    setLastResult(null);
  };

  const handleReset = () => {
    resetGame();
    setShowAnswer(false);
    setUserAnswer('');
    setLastResult(null);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleAnswerCheck = (isCorrect: boolean) => {
    if (isCorrect) {
      addTeamScore(gameState.currentTeam, 1);
      setLastResult('correct');
    } else {
      setLastResult('incorrect');
    }
    setShowAnswer(false);
    setUserAnswer('');
  };

  const handleNextQuestion = () => {
    switchTeam();
    setShowAnswer(false);
    setUserAnswer('');
    setLastResult(null);
  };

  const getGameDuration = () => {
    if (!gameState.startTime) return '0분 0초';
    const endTime = gameState.endTime || new Date();
    const duration = Math.floor((endTime.getTime() - gameState.startTime.getTime()) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}분 ${seconds}초`;
  };

  const getWinner = () => {
    if (gameState.team1Score > gameState.team2Score) return '팀 1 승리!';
    if (gameState.team2Score > gameState.team1Score) return '팀 2 승리!';
    return '무승부!';
  };

  return (
    <div className="space-y-6">
      {/* 팀 점수 표시 */}
      <Card className="bg-jeju-basalt-light/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-jeju-basalt-dark flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            팀 점수
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg text-center ${gameState.currentTeam === 1 ? 'bg-jeju-teal-light/30 border-2 border-jeju-teal' : 'bg-jeju-basalt-light/20'}`}>
              <div className="text-lg font-bold text-jeju-basalt-dark mb-2">팀 1</div>
              <div className="text-3xl font-bold text-jeju-teal-dark">{gameState.team1Score}</div>
              {gameState.currentTeam === 1 && (
                <div className="text-sm text-jeju-teal-dark mt-2">현재 턴</div>
              )}
            </div>
            <div className={`p-6 rounded-lg text-center ${gameState.currentTeam === 2 ? 'bg-jeju-orange-light/30 border-2 border-jeju-orange' : 'bg-jeju-basalt-light/20'}`}>
              <div className="text-lg font-bold text-jeju-basalt-dark mb-2">팀 2</div>
              <div className="text-3xl font-bold text-jeju-orange-dark">{gameState.team2Score}</div>
              {gameState.currentTeam === 2 && (
                <div className="text-sm text-jeju-orange-dark mt-2">현재 턴</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 게임 상태 표시 */}
      <Card className="bg-jeju-orange-light/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-jeju-basalt-dark flex items-center gap-2">
            <Users className="h-5 w-5" />
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
              <div className="font-bold text-jeju-basalt-dark">{gameState.questions.filter(q => q.answered).length}</div>
            </div>
            <div className="bg-white/60 p-3 rounded-lg">
              <div className="text-sm text-jeju-basalt">남은 질문</div>
              <div className="font-bold text-jeju-basalt-dark">{gameState.questions.filter(q => !q.answered).length}</div>
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
          <CardTitle className="text-2xl text-jeju-basalt-dark text-center">팀 퀴즈</CardTitle>
          <CardDescription className="text-center">
            질문에 답하고 정답을 맞춰보세요!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* 질문 카드 시각화 */}
            <div className="relative mx-auto w-80 h-48">
              <div className="w-full h-full bg-gradient-to-br from-jeju-basalt-light to-jeju-basalt-dark rounded-lg shadow-lg flex items-center justify-center border-4 border-jeju-basalt-light">
                {gameState.currentQuestion ? (
                  <div className="p-6 text-center">
                    <div className="text-lg font-bold text-white mb-4">
                      질문 {gameState.questions.filter(q => q.answered).length + 1}
                    </div>
                    <div className="text-white">
                      {gameState.currentQuestion}
                    </div>
                  </div>
                ) : (
                  <div className="text-jeju-basalt text-center">
                    <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>질문을 뽑아보세요!</p>
                  </div>
                )}
              </div>
            </div>

            {/* 답변 입력 영역 */}
            {gameState.currentQuestion && !showAnswer && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-jeju-basalt-dark mb-2">
                    팀 {gameState.currentTeam}의 답변을 입력해주세요:
                  </label>
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="답변을 입력해주세요..."
                    className="w-full p-4 border border-jeju-basalt-light rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-jeju-teal"
                    rows={3}
                  />
                </div>
                <div className="flex gap-4 justify-center">
                  <Button onClick={handleShowAnswer} size="lg">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    답변 확인
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
                    <div className="text-jeju-basalt-dark font-medium">{gameState.currentQuestion}</div>
                  </div>
                  <div>
                    <div className="text-sm text-jeju-basalt mb-2">정답:</div>
                    <div className="text-jeju-basalt-dark bg-white/60 p-3 rounded-lg font-medium">
                      {gameState.currentAnswer}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-jeju-basalt mb-2">팀 {gameState.currentTeam}의 답변:</div>
                    <div className="text-jeju-basalt-dark bg-white/60 p-3 rounded-lg">
                      {userAnswer || '답변을 입력하지 않았습니다.'}
                    </div>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button 
                      onClick={() => handleAnswerCheck(true)} 
                      size="lg"
                      className="bg-jeju-teal hover:bg-jeju-teal-dark"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      정답!
                    </Button>
                    <Button 
                      onClick={() => handleAnswerCheck(false)} 
                      variant="outline" 
                      size="lg"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      오답
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* 결과 표시 */}
            {lastResult && (
              <div className={`p-4 rounded-lg text-center ${
                lastResult === 'correct' 
                  ? 'bg-jeju-teal-light/20 border border-jeju-teal-light' 
                  : 'bg-jeju-orange-light/20 border border-jeju-orange-light'
              }`}>
                <div className={`text-lg font-bold ${
                  lastResult === 'correct' ? 'text-jeju-teal-dark' : 'text-jeju-orange-dark'
                }`}>
                  {lastResult === 'correct' ? '정답입니다! +1점' : '오답입니다!'}
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
                  <Button onClick={handleDrawQuestion} size="lg" className="text-lg px-8 py-4">
                    <Users className="mr-2 h-5 w-5" />
                    질문 뽑기
                  </Button>
                  {lastResult && (
                    <Button onClick={handleNextQuestion} variant="outline" size="lg">
                      다음 팀
                    </Button>
                  )}
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

      {/* 게임 결과 */}
      {!gameState.isPlaying && gameState.endTime && (
        <Card className="bg-jeju-sand-dark/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-jeju-basalt-dark text-center">게임 결과</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-2xl font-bold text-jeju-basalt-dark">{getWinner()}</div>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="bg-jeju-teal-light/20 p-4 rounded-lg">
                  <div className="text-lg font-bold text-jeju-basalt-dark">팀 1</div>
                  <div className="text-2xl font-bold text-jeju-teal-dark">{gameState.team1Score}점</div>
                </div>
                <div className="bg-jeju-orange-light/20 p-4 rounded-lg">
                  <div className="text-lg font-bold text-jeju-basalt-dark">팀 2</div>
                  <div className="text-2xl font-bold text-jeju-orange-dark">{gameState.team2Score}점</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
