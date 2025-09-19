'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DesignPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const itemsPerPage = 12;


  // 프로모션 데이터
  const promotionItems = useMemo(() => [
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
      alt: '설문대할망 소주 패키지',
      title: '설문대할망 소주 패키지',
      description: '소주 패키지',
      category: '소주'
    },
    {
      id: 8,
      src: '/promotion/자청비소주패키지.png',
      alt: '자청비 소주 패키지',
      title: '자청비 소주 패키지',
      description: '소주 패키지',
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
      alt: '설문대할망 맥주 패키지',
      title: '설문대할망 맥주 패키지',
      description: '맥주 패키지',
      category: '맥주'
    },
    {
      id: 12,
      src: '/promotion/돌하르방맥주패키지.png',
      alt: '돌하르방 맥주 패키지',
      title: '돌하르방 맥주 패키지',
      description: '맥주 패키지',
      category: '맥주'
    },
    // 스티커 카테고리
    {
      id: 13,
      src: '/promotion/설문대할망스티커1.png',
      alt: '설문대할망 스티커 1',
      title: '설문대할망 스티커 1',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 14,
      src: '/promotion/설문대할망스티커2.png',
      alt: '설문대할망 스티커 2',
      title: '설문대할망 스티커 2',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 15,
      src: '/promotion/자청비스티커1.png',
      alt: '자청비 스티커 1',
      title: '자청비 스티커 1',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 16,
      src: '/promotion/자청비스티커2.png',
      alt: '자청비 스티커 2',
      title: '자청비 스티커 2',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 17,
      src: '/promotion/돌하르방스티커1.png',
      alt: '돌하르방 스티커 1',
      title: '돌하르방 스티커 1',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 18,
      src: '/promotion/돌하르방스티커2.png',
      alt: '돌하르방 스티커 2',
      title: '돌하르방 스티커 2',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 19,
      src: '/promotion/돌하르방스티커3.png',
      alt: '돌하르방 스티커 3',
      title: '돌하르방 스티커 3',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 20,
      src: '/promotion/삼승할망스티커1.png',
      alt: '삼승할망 스티커 1',
      title: '삼승할망 스티커 1',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 21,
      src: '/promotion/삼승할망스티커2.png',
      alt: '삼승할망 스티커 2',
      title: '삼승할망 스티커 2',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 22,
      src: '/promotion/삼승할망스티커3.png',
      alt: '삼승할망 스티커 3',
      title: '삼승할망 스티커 3',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 23,
      src: '/promotion/본향당스티커1.png',
      alt: '본향당 스티커 1',
      title: '본향당 스티커 1',
      description: '스티커',
      category: '스티커'
    },
    // 피규어 카테고리
    {
      id: 24,
      src: '/promotion/설문대할망피규어1.png',
      alt: '설문대할망 피규어 1',
      title: '설문대할망 피규어 1',
      description: '피규어',
      category: '피규어'
    },
    {
      id: 25,
      src: '/promotion/자청비피규어1.png',
      alt: '자청비 피규어 1',
      title: '자청비 피규어 1',
      description: '피규어',
      category: '피규어'
    },
    {
      id: 34,
      src: '/promotion/자청비피규어2.png',
      alt: '자청비 피규어 2',
      title: '자청비 피규어 2',
      description: '피규어',
      category: '피규어'
    },
    {
      id: 26,
      src: '/promotion/돌하르방피규어1.png',
      alt: '돌하르방 피규어 1',
      title: '돌하르방 피규어 1',
      description: '피규어',
      category: '피규어'
    },
    {
      id: 31,
      src: '/promotion/돌하르방피규어2.png',
      alt: '돌하르방 피규어 2',
      title: '돌하르방 피규어 2',
      description: '피규어',
      category: '피규어'
    },
    {
      id: 32,
      src: '/promotion/돌하르방피규어3.png',
      alt: '돌하르방 피규어 3',
      title: '돌하르방 피규어 3',
      description: '피규어',
      category: '피규어'
    },
    {
      id: 27,
      src: '/promotion/삼승할망피규어1.png',
      alt: '삼승할망 피규어 1',
      title: '삼승할망 피규어 1',
      description: '피규어',
      category: '피규어'
    },
    // 추가 소주 패키지
    {
      id: 28,
      src: '/promotion/소주패키지1.png',
      alt: '소주 패키지 1',
      title: '소주 패키지 1',
      description: '소주 패키지',
      category: '소주'
    },
    {
      id: 29,
      src: '/promotion/소주패키지2.png',
      alt: '소주 패키지 2',
      title: '소주 패키지 2',
      description: '소주 패키지',
      category: '소주'
    },
    {
      id: 30,
      src: '/promotion/소주패키지3.png',
      alt: '소주 패키지 3',
      title: '소주 패키지 3',
      description: '소주 패키지',
      category: '소주'
    },
    // 추가 소주 제품
    {
      id: 35,
      src: '/promotion/설문대할망소주.png',
      alt: '설문대할망 소주',
      title: '설문대할망 소주',
      description: '소주',
      category: '소주'
    },
    {
      id: 33,
      src: '/promotion/자청비소주.png',
      alt: '자청비 소주',
      title: '자청비 소주',
      description: '소주',
      category: '소주'
    }
  ], []);

  const categories = ['전체', '소주', '맥주', '포스터', '스티커', '피규어'];

  const filteredItems = selectedCategory === '전체' 
    ? promotionItems 
    : promotionItems.filter(item => item.category === selectedCategory);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // 카테고리별 개수 계산
  const getCategoryCount = (category: string) => {
    if (category === '전체') return promotionItems.length;
    return promotionItems.filter(item => item.category === category).length;
  };

  const handleImageClick = (src: string) => {
    const index = filteredItems.findIndex(item => item.src === src);
    setCurrentImageIndex(index);
    setSelectedImage(src);
    
    // 모달에서 사용할 이미지들을 미리 로드
    const preloadModalImages = () => {
      const prevIndex = index > 0 ? index - 1 : filteredItems.length - 1;
      const nextIndex = index < filteredItems.length - 1 ? index + 1 : 0;
      
      [filteredItems[prevIndex]?.src, filteredItems[nextIndex]?.src].forEach((imageSrc) => {
        if (imageSrc) {
          const img = new window.Image();
          img.src = imageSrc;
        }
      });
    };
    
    preloadModalImages();
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const goToPrevious = useCallback(() => {
    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredItems.length - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredItems[prevIndex].src);
    
    // 다음 이미지도 미리 로드
    const nextIndex = prevIndex < filteredItems.length - 1 ? prevIndex + 1 : 0;
    const img = new window.Image();
    img.src = filteredItems[nextIndex].src;
  }, [currentImageIndex, filteredItems]);

  const goToNext = useCallback(() => {
    const nextIndex = currentImageIndex < filteredItems.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredItems[nextIndex].src);
    
    // 이전 이미지도 미리 로드
    const prevIndex = nextIndex > 0 ? nextIndex - 1 : filteredItems.length - 1;
    const img = new window.Image();
    img.src = filteredItems[prevIndex].src;
  }, [currentImageIndex, filteredItems]);

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(filteredItems[index].src);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 이동
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 변경 시 상단으로 스크롤
  };

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set([...prev, src]));
  };

  // 이미지 프리로딩 및 지연 로딩
  useEffect(() => {
    const preloadImages = () => {
      // 첫 페이지의 이미지들을 프리로드
      const firstPageItems = promotionItems.slice(0, itemsPerPage);
      firstPageItems.forEach((item) => {
        const img = new window.Image();
        img.src = item.src;
        img.onload = () => handleImageLoad(item.src);
      });
    };

    // Intersection Observer로 뷰포트에 들어오는 이미지 프리로드
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const imgSrc = entry.target.getAttribute('data-src');
          if (imgSrc) {
            const img = new window.Image();
            img.src = imgSrc;
            img.onload = () => handleImageLoad(imgSrc);
            observer.unobserve(entry.target);
          }
        }
      });
    }, {
      rootMargin: '50px' // 뷰포트 50px 전에 미리 로드
    });

    preloadImages();

    return () => observer.disconnect();
  }, [promotionItems, itemsPerPage]);

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
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 shadow-sm'
                  }`}
                >
                  {category} ({getCategoryCount(category)})
                </button>
              ))}
            </div>
          </section>

          {/* Promotion Gallery */}
          <section className="mb-12">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-1 sm:gap-2 md:gap-3 lg:gap-4">
              {currentItems.map((item) => (
                <div key={item.id} className="group">
                  <div 
                    className="relative overflow-hidden bg-white aspect-[3/4] mb-0.5 sm:mb-1 md:mb-2 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-lg cursor-pointer"
                    onClick={() => handleImageClick(item.src)}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className={`object-cover group-hover:scale-105 transition-all duration-500 ${
                        loadedImages.has(item.src) ? 'opacity-100' : 'opacity-0'
                      }`}
                      priority={item.id <= 12}
                      loading={item.id <= 12 ? "eager" : "lazy"}
                      quality={90}
                      sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmM2Y0ZjYiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI2U1ZTdlYiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2YzZjRmNiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4="
                      onLoad={() => handleImageLoad(item.src)}
                    />
                    {/* 스켈레톤 로딩 */}
                    {!loadedImages.has(item.src) && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-xs sm:text-xs md:text-sm lg:text-lg font-bold text-gray-900 mb-0 sm:mb-0.5">{item.title}</h3>
                    <p className="text-xs sm:text-xs md:text-sm text-gray-600 mb-0.5 sm:mb-1 font-light">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pagination */}
          {totalPages > 1 && (
            <section className="mb-12">
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 shadow-sm'
                  }`}
                >
                  이전
                </button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 shadow-sm'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 shadow-sm'
                  }`}
                >
                  다음
                </button>
              </div>
            </section>
          )}

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
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 transition-all duration-150 z-20 shadow-lg"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 transition-all duration-150 z-20 shadow-lg"
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
              className="rounded-lg shadow-2xl max-w-full max-h-full object-contain transition-opacity duration-150"
              priority
              quality={95}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmM2Y0ZjYiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI2U1ZTdlYiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2YzZjRmNiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4="
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
                    loading="lazy"
                    quality={50}
                    sizes="64px"
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
