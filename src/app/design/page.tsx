'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DesignPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // 프로모션 데이터
  const promotionItems = [
    {
      id: 1,
      src: '/promotion/홍보포스터1.png',
      alt: '홍보포스터 1',
      title: '홍보포스터 1',
      description: '포스터',
      category: '포스터'
    },
    {
      id: 2,
      src: '/promotion/홍보포스터2.png',
      alt: '홍보포스터 2',
      title: '홍보포스터 2',
      description: '포스터',
      category: '포스터'
    },
    {
      id: 3,
      src: '/promotion/설문대할망라벨.png',
      alt: '설문대할망 라벨',
      title: '설문대할망 라벨',
      description: '소주 라벨',
      category: '소주'
    },
    {
      id: 4,
      src: '/promotion/자청비라벨.png',
      alt: '자청비 라벨',
      title: '자청비 라벨',
      description: '소주 라벨',
      category: '소주'
    },
    {
      id: 5,
      src: '/promotion/설문대할망소주잔.png',
      alt: '설문대할망 소주잔',
      title: '설문대할망 소주잔',
      description: '전용 잔',
      category: '소주'
    },
    {
      id: 6,
      src: '/promotion/자청비소주잔.png',
      alt: '자청비 소주잔',
      title: '자청비 소주잔',
      description: '전용 잔',
      category: '소주'
    },
    {
      id: 7,
      src: '/promotion/설문대할망소주패키지.png',
      alt: '설문대할망 소주 팩',
      title: '설문대할망 소주 팩',
      description: '소주 팩',
      category: '소주'
    },
    {
      id: 8,
      src: '/promotion/자청비소주패키지.png',
      alt: '자청비 소주 팩',
      title: '자청비 소주 팩',
      description: '소주 팩',
      category: '소주'
    },
    {
      id: 9,
      src: '/promotion/설문대할망맥주.png',
      alt: '설문대할망 맥주',
      title: '설문대할망 맥주',
      description: '맥주',
      category: '맥주'
    },
    {
      id: 10,
      src: '/promotion/돌하르방맥주.png',
      alt: '돌하르방 맥주',
      title: '돌하르방 맥주',
      description: '맥주',
      category: '맥주'
    },
    {
      id: 11,
      src: '/promotion/설문대할망맥주패키지.png',
      alt: '설문대할망 맥주 팩',
      title: '설문대할망 맥주 팩',
      description: '맥주 팩',
      category: '맥주'
    },
    {
      id: 12,
      src: '/promotion/돌하르방맥주패키지.png',
      alt: '돌하르방 맥주 팩',
      title: '돌하르방 맥주 팩',
      description: '맥주 팩',
      category: '맥주'
    }
  ];

  const categories = ['전체', '소주', '맥주', '포스터', '스티커', '피규어'];

  const filteredItems = selectedCategory === '전체' 
    ? promotionItems 
    : promotionItems.filter(item => item.category === selectedCategory);

  const handleImageClick = (src: string) => {
    const index = filteredItems.findIndex(item => item.src === src);
    setCurrentImageIndex(index);
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const goToPrevious = useCallback(() => {
    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredItems.length - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredItems[prevIndex].src);
  }, [currentImageIndex, filteredItems]);

  const goToNext = useCallback(() => {
    const nextIndex = currentImageIndex < filteredItems.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredItems[nextIndex].src);
  }, [currentImageIndex, filteredItems]);

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(filteredItems[index].src);
  };

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (event.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, goToPrevious, goToNext]);

  return (
    <div className="min-h-screen brand-gradient">
      <Header />
      
      {/* Spacing between header and main content */}
      <div className="pt-16"></div>

      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <section className="text-center mb-8 sm:mb-12 px-2">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent drop-shadow-lg">
                탐나는 신화 프로모션
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 font-medium max-w-2xl mx-auto leading-relaxed flex items-center justify-center gap-1">
                <Image
                  src="/images/엠포스.png"
                  alt="M4ce 팀 로고"
                  width={48}
                  height={32}
                  className="object-contain"
                />
                의 다양한 프로모션과 마케팅 자료를 만나보세요!
              </p>
            </div>
          </section>

          {/* Category Filter */}
          <section className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 shadow-sm'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Promotion Gallery */}
          <section className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div 
                    className="relative overflow-hidden bg-white aspect-[3/4] mb-4 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-lg"
                    onClick={() => handleImageClick(item.src)}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-light text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 font-light">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 transition-all duration-300 z-20 shadow-lg"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation Buttons */}
          {filteredItems.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 transition-all duration-300 z-20 shadow-lg"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 transition-all duration-300 z-20 shadow-lg"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center max-w-5xl max-h-[70vh] mb-4">
            <Image
              src={selectedImage}
              alt={filteredItems[currentImageIndex]?.alt || "확대된 이미지"}
              width={800}
              height={600}
              className="rounded-lg shadow-2xl max-w-full max-h-full object-contain"
            />
          </div>

          {/* Image Info */}
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-white mb-1">
              {filteredItems[currentImageIndex]?.title}
            </h3>
            <p className="text-gray-300">
              {currentImageIndex + 1} / {filteredItems.length}
            </p>
          </div>

          {/* Thumbnail List */}
          {filteredItems.length > 1 && (
            <div className="flex gap-2 overflow-x-auto max-w-full px-4 pb-4">
              {filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'ring-2 ring-white shadow-lg scale-110'
                      : 'opacity-60 hover:opacity-80'
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}
