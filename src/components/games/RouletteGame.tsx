'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, RotateCcw, Play } from 'lucide-react';

interface RouletteItem {
  id: string;
  text: string;
}

export default function RouletteGame() {
  const [items, setItems] = useState<RouletteItem[]>([]);
  const [penalties, setPenalties] = useState<RouletteItem[]>([]);

  const [newItem, setNewItem] = useState('');
  const [newPenalty, setNewPenalty] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RouletteItem | null>(null);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 룰렛 그리기
  const drawRoulette = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40; // 핀 공간 확보

    // 배경 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 룰렛 항목만 사용 (벌칙 제외)
    const anglePerItem = (2 * Math.PI) / items.length;
    
    // 색상 팔레트 (최대 8개)
    const colors = [
      '#8b5cf6', // 보라색
      '#ef4444', // 빨간색
      '#10b981', // 초록색
      '#f59e0b', // 주황색
      '#3b82f6', // 파란색
      '#ec4899', // 핑크색
      '#06b6d4', // 청록색
      '#84cc16', // 라임색
    ];
    
    items.forEach((item, index) => {
      const startAngle = index * anglePerItem + rotation;
      const endAngle = (index + 1) * anglePerItem + rotation;

      // 섹터 색상 (다양한 색상)
      ctx.fillStyle = colors[index % colors.length];
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;

      // 섹터 그리기
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // 텍스트 그리기
      const textAngle = startAngle + anglePerItem / 2;
      const textX = centerX + Math.cos(textAngle) * (radius * 0.7);
      const textY = centerY + Math.sin(textAngle) * (radius * 0.7);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 텍스트가 길면 줄바꿈
      const words = item.text.split(' ');
      const lines = [];
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > radius * 0.8 && currentLine !== '') {
          lines.push(currentLine.trim());
          currentLine = word + ' ';
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine.trim());

      // 텍스트 그리기
      lines.forEach((line, lineIndex) => {
        ctx.fillText(line, textX, textY + (lineIndex - lines.length / 2) * 15);
      });
    });

    // 중앙 원 그리기
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // 포인터 그리기
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 10);
    ctx.lineTo(centerX - 10, centerY - radius - 20);
    ctx.lineTo(centerX + 10, centerY - radius - 20);
    ctx.closePath();
    ctx.fill();
  }, [items, rotation]);

  // 룰렛 회전 애니메이션
  const spinRoulette = () => {
    if (isSpinning || items.length === 0) return;

    setIsSpinning(true);
    setSelectedItem(null);

    const spins = 5 + Math.random() * 5; // 5-10바퀴
    const finalAngle = Math.random() * 2 * Math.PI;
    const totalRotation = spins * 2 * Math.PI + finalAngle;

    let currentRotation = 0;
    const increment = totalRotation / 100;

    const animate = () => {
      currentRotation += increment;
      setRotation(currentRotation);

      if (currentRotation < totalRotation) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        
        // 선택된 아이템 계산
        const normalizedAngle = finalAngle % (2 * Math.PI);
        const itemIndex = Math.floor((normalizedAngle / (2 * Math.PI)) * items.length);
        const selected = items[itemIndex];
        setSelectedItem(selected);
      }
    };

    animate();
  };

  // 아이템 추가
  const addItem = () => {
    if (!newItem.trim()) return;

    const newRouletteItem: RouletteItem = {
      id: Date.now().toString(),
      text: newItem.trim(),
    };

    setItems([...items, newRouletteItem]);
    setNewItem('');
  };

  // 아이템 삭제
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // 벌칙 추가
  const addPenalty = () => {
    if (!newPenalty.trim() || penalties.length >= 1) return;

    const newPenaltyItem: RouletteItem = {
      id: Date.now().toString(),
      text: newPenalty.trim(),
    };

    setPenalties([newPenaltyItem]);
    setNewPenalty('');
  };

  // 벌칙 삭제
  const removePenalty = (id: string) => {
    setPenalties(penalties.filter(penalty => penalty.id !== id));
  };

  // 룰렛 초기화
  const resetRoulette = () => {
    setItems([]);
    setPenalties([]);
    setSelectedItem(null);
    setRotation(0);
    setNewItem('');
    setNewPenalty('');
  };

  // 캔버스 크기 조정
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;

      const size = Math.min(container.clientWidth, 400);
      canvas.width = size;
      canvas.height = size;
      drawRoulette();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [items, rotation, drawRoulette]);

  // 룰렛 그리기
  useEffect(() => {
    drawRoulette();
  }, [items, rotation, drawRoulette]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-8">
        {/* 룰렛 게임 제목 */}
        <div className="text-center mb-6 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4 sm:mb-6 shadow-2xl">
            <RotateCcw className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent mb-3 sm:mb-4">
            랜덤 룰렛
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            룰렛을 돌려서 오늘의 미션을 정하고, 벌칙도 함께 확인해보세요!
          </p>
        </div>

        {/* 룰렛 */}
        <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-0 rounded-2xl sm:rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 sm:p-8">
            <CardTitle className="text-center text-lg sm:text-2xl font-bold">🎯 룰렛</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-8">
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="relative">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-30"></div>
                <canvas
                  ref={canvasRef}
                  className="relative border-2 sm:border-4 border-white rounded-full shadow-2xl bg-white"
                  style={{ width: '280px', height: '280px' }}
                />
                {isSpinning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        회전 중...
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 룰렛 컨트롤 */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
              <Button
                onClick={spinRoulette}
                disabled={isSpinning || items.length === 0}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-base sm:text-lg w-full sm:w-auto"
              >
                {isSpinning ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 sm:mr-3"></div>
                    회전 중...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    룰렛 돌리기
                  </>
                )}
              </Button>
              <Button
                onClick={resetRoulette}
                variant="outline"
                className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 w-full sm:w-auto"
              >
                <RotateCcw className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                초기화
              </Button>
            </div>

            {/* 결과 표시 */}
            {selectedItem && (
              <div className="text-center space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-2 border-purple-200 shadow-lg">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs sm:text-sm">🎯</span>
                  </div>
                  <span className="break-words">당첨자: {selectedItem.text}</span>
                </div>
                {penalties.length > 0 && (
                  <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl bg-gradient-to-r from-red-100 to-orange-100 text-red-800 border-2 border-red-200 shadow-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm">⚡</span>
                    </div>
                    <span className="break-words">벌칙: {penalties[0].text}</span>
                  </div>
                )}
              </div>
            )}
        </CardContent>
      </Card>

        {/* 사용자 설정 */}
        <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-0 rounded-2xl sm:rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 sm:p-8">
            <CardTitle className="text-center text-lg sm:text-2xl font-bold">⚙️ 사용자 설정</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-8">
            {/* 새 항목 추가 */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">+</span>
                </div>
                룰렛 항목 추가
              </h3>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Input
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="새 항목을 입력하세요"
                  className="flex-1 h-10 sm:h-12 text-base sm:text-lg border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                  onKeyPress={(e) => e.key === 'Enter' && addItem()}
                />
                <Button
                  onClick={addItem}
                  disabled={!newItem.trim()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-10 sm:h-12 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>

            {/* 항목 목록 */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📋</span>
                </div>
                룰렛 항목 목록
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {items.map((item, index) => {
                  const colors = [
                    '#8b5cf6', '#ef4444', '#10b981', '#f59e0b',
                    '#3b82f6', '#ec4899', '#06b6d4', '#84cc16'
                  ];
                  const color = colors[index % colors.length];
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 bg-white border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <div 
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-md flex-shrink-0"
                          style={{ backgroundColor: color }}
                        ></div>
                        <span className="font-medium text-gray-800 text-base sm:text-lg truncate">{item.text}</span>
                      </div>
                      <Button
                        onClick={() => removeItem(item.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 rounded-lg flex-shrink-0 ml-2"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>

            {items.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-gray-400 text-lg sm:text-2xl">📝</span>
                </div>
                <p className="text-gray-500 text-base sm:text-lg">룰렛에 추가할 항목이 없습니다.</p>
                <p className="text-gray-400 text-sm mt-2">위에서 항목을 추가해보세요!</p>
              </div>
            )}

            {/* 벌칙 추가 */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">⚡</span>
                </div>
                벌칙 설정 (최대 1개)
              </h3>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Input
                  value={newPenalty}
                  onChange={(e) => setNewPenalty(e.target.value)}
                  placeholder="벌칙을 입력하세요"
                  className="flex-1 h-10 sm:h-12 text-base sm:text-lg border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                  onKeyPress={(e) => e.key === 'Enter' && addPenalty()}
                  disabled={penalties.length >= 1}
                />
                <Button
                  onClick={addPenalty}
                  disabled={!newPenalty.trim() || penalties.length >= 1}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white h-10 sm:h-12 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>

            {/* 벌칙 목록 */}
            <div className="space-y-2 sm:space-y-3">
              {penalties.map((penalty) => (
                <div
                  key={penalty.id}
                  className="flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 bg-gradient-to-r from-red-50 to-orange-50 border-red-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">⚡</span>
                    </div>
                    <span className="font-medium text-gray-800 text-base sm:text-lg truncate">{penalty.text}</span>
                  </div>
                  <Button
                    onClick={() => removePenalty(penalty.id)}
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 rounded-lg flex-shrink-0 ml-2"
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {penalties.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-gray-400 text-lg sm:text-2xl">⚡</span>
                </div>
                <p className="text-gray-500 text-base sm:text-lg">벌칙이 설정되지 않았습니다.</p>
                <p className="text-gray-400 text-sm mt-2">위에서 벌칙을 추가해보세요!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}