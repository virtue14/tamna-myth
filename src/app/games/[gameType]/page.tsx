import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RouletteGame from '@/components/games/RouletteGame';
import BalanceGame from '@/components/games/BalanceGame';

interface GamePageProps {
  params: Promise<{
    gameType: string;
  }>;
}

export default async function GameDetailPage({ params }: GamePageProps) {
  const { gameType } = await params;

  const renderGame = () => {
    switch (gameType) {
      case 'roulette':
        return <RouletteGame />;
      case 'balance':
        return <BalanceGame />;
      default:
        return (
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">게임을 찾을 수 없습니다</h1>
            <p className="text-gray-600">요청하신 게임이 존재하지 않습니다.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen brand-gradient">
      <Header />
      
      <div className="pt-16"></div>

      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {renderGame()}
        </div>
      </main>

      <Footer />
    </div>
  );
}