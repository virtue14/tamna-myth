'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Plus, Trash2, Play, RefreshCw } from 'lucide-react';

interface CustomItem {
  id: string;
  text: string;
  type: 'question' | 'rule' | 'penalty';
}

export default function CustomGame() {
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [newItemText, setNewItemText] = useState('');
  const [newItemType, setNewItemType] = useState<'question' | 'rule' | 'penalty'>('question');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentItem, setCurrentItem] = useState<CustomItem | null>(null);
  const [gameHistory, setGameHistory] = useState<CustomItem[]>([]);

  const addCustomItem = () => {
    if (!newItemText.trim()) return;
    
    const newItem: CustomItem = {
      id: Date.now().toString(),
      text: newItemText.trim(),
      type: newItemType,
    };
    
    setCustomItems(prev => [...prev, newItem]);
    setNewItemText('');
  };

  const removeCustomItem = (id: string) => {
    setCustomItems(prev => prev.filter(item => item.id !== id));
  };

  const startGame = () => {
    if (customItems.length === 0) return;
    setIsPlaying(true);
    setGameHistory([]);
    setCurrentItem(null);
  };

  const endGame = () => {
    setIsPlaying(false);
    setCurrentItem(null);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setCurrentItem(null);
    setGameHistory([]);
  };

  const drawRandomItem = () => {
    if (customItems.length === 0) return;
    
    const randomItem = customItems[Math.floor(Math.random() * customItems.length)];
    setCurrentItem(randomItem);
    setGameHistory(prev => [...prev, randomItem]);
  };

  const getItemTypeColor = (type: string) => {
    switch (type) {
      case 'question':
        return 'bg-jeju-teal-light text-jeju-teal-dark';
      case 'rule':
        return 'bg-jeju-orange-light text-jeju-orange-dark';
      case 'penalty':
        return 'bg-jeju-basalt-light text-jeju-basalt-dark';
      default:
        return 'bg-jeju-basalt-light text-jeju-basalt-dark';
    }
  };

  const getItemTypeLabel = (type: string) => {
    switch (type) {
      case 'question':
        return '질문';
      case 'rule':
        return '규칙';
      case 'penalty':
        return '벌칙';
      default:
        return '기타';
    }
  };

  return (
    <div className="space-y-6">
      {/* 커스텀 아이템 관리 */}
      <Card className="bg-jeju-sand-dark/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-jeju-basalt-dark flex items-center gap-2">
            <Settings className="h-5 w-5" />
            커스텀 게임 설정
          </CardTitle>
          <CardDescription>
            나만의 질문, 규칙, 벌칙을 만들어보세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 새 아이템 추가 */}
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  placeholder="새로운 아이템을 입력하세요..."
                  className="w-full p-3 border border-jeju-basalt-light rounded-lg focus:outline-none focus:ring-2 focus:ring-jeju-teal"
                />
              </div>
              <select
                value={newItemType}
                onChange={(e) => setNewItemType(e.target.value as 'question' | 'rule' | 'penalty')}
                className="p-3 border border-jeju-basalt-light rounded-lg focus:outline-none focus:ring-2 focus:ring-jeju-teal"
              >
                <option value="question">질문</option>
                <option value="rule">규칙</option>
                <option value="penalty">벌칙</option>
              </select>
              <Button onClick={addCustomItem} disabled={!newItemText.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* 아이템 목록 */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {customItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-white/60 p-3 rounded-lg">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getItemTypeColor(item.type)}`}>
                    {getItemTypeLabel(item.type)}
                  </span>
                  <span className="flex-1 text-jeju-basalt-dark">{item.text}</span>
                  <Button
                    onClick={() => removeCustomItem(item.id)}
                    variant="outline"
                    size="sm"
                    className="text-jeju-basalt hover:text-jeju-orange-dark"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {customItems.length === 0 && (
              <div className="text-center text-jeju-basalt py-8">
                <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>아직 아이템이 없습니다. 위에서 추가해보세요!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 게임 영역 */}
      {customItems.length > 0 && (
        <Card className="bg-jeju-sand/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-jeju-basalt-dark text-center">커스텀 게임</CardTitle>
            <CardDescription className="text-center">
              만든 아이템들로 게임을 즐겨보세요!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* 게임 카드 시각화 */}
              <div className="relative mx-auto w-80 h-48">
                <div className="w-full h-full bg-gradient-to-br from-jeju-sand-dark to-jeju-basalt-light rounded-lg shadow-lg flex items-center justify-center border-4 border-jeju-sand-dark">
                  {currentItem ? (
                    <div className="p-6 text-center">
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${getItemTypeColor(currentItem.type)}`}>
                        {getItemTypeLabel(currentItem.type)}
                      </div>
                      <div className="text-jeju-basalt-dark">
                        {currentItem.text}
                      </div>
                    </div>
                  ) : (
                    <div className="text-jeju-basalt text-center">
                      <Settings className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>게임을 시작해보세요!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 컨트롤 버튼 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!isPlaying ? (
                  <Button onClick={startGame} size="lg" className="text-lg px-8 py-4">
                    <Play className="mr-2 h-5 w-5" />
                    게임 시작
                  </Button>
                ) : (
                  <>
                    <Button onClick={drawRandomItem} size="lg" className="text-lg px-8 py-4">
                      <Settings className="mr-2 h-5 w-5" />
                      아이템 뽑기
                    </Button>
                    <Button onClick={endGame} variant="outline" size="lg">
                      게임 종료
                    </Button>
                  </>
                )}
                <Button onClick={resetGame} variant="outline" size="lg">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  리셋
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 게임 히스토리 */}
      {gameHistory.length > 0 && (
        <Card className="bg-jeju-basalt-light/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-jeju-basalt-dark">게임 히스토리</CardTitle>
            <CardDescription>
              지금까지 나온 아이템들입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {gameHistory.map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/60 p-3 rounded-lg">
                  <div className="w-6 h-6 bg-jeju-sand-dark text-jeju-basalt-dark rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getItemTypeColor(item.type)}`}>
                    {getItemTypeLabel(item.type)}
                  </span>
                  <span className="text-jeju-basalt-dark">{item.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 게임 통계 */}
      {customItems.length > 0 && (
        <Card className="bg-jeju-orange-light/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-jeju-basalt-dark">게임 통계</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/60 p-3 rounded-lg">
                <div className="text-sm text-jeju-basalt">총 아이템</div>
                <div className="font-bold text-jeju-basalt-dark">{customItems.length}</div>
              </div>
              <div className="bg-white/60 p-3 rounded-lg">
                <div className="text-sm text-jeju-basalt">질문</div>
                <div className="font-bold text-jeju-basalt-dark">{customItems.filter(item => item.type === 'question').length}</div>
              </div>
              <div className="bg-white/60 p-3 rounded-lg">
                <div className="text-sm text-jeju-basalt">규칙</div>
                <div className="font-bold text-jeju-basalt-dark">{customItems.filter(item => item.type === 'rule').length}</div>
              </div>
              <div className="bg-white/60 p-3 rounded-lg">
                <div className="text-sm text-jeju-basalt">벌칙</div>
                <div className="font-bold text-jeju-basalt-dark">{customItems.filter(item => item.type === 'penalty').length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
