'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mountain, Sparkles, Gamepad2, Images, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <Image
                src="https://gdpark-official.notion.site/image/attachment%3Ac0903e43-72e4-450c-87c6-aa6d23d4659e%3A%E1%84%8B%E1%85%A6%E1%86%B7%E1%84%91%E1%85%A9%E1%84%89%E1%85%B3.png?table=block&id=27610da3-ad82-806e-b755-f0079a14150d&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2.png"
                alt="팀로고"
                width={40}
                height={20}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-seolmundae-orange-dark via-myth-purple-dark to-myth-teal-dark bg-clip-text text-transparent">
              탐나는 신화
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link 
              href="/myths" 
              className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 font-medium text-sm lg:text-base"
            >
              <Mountain className="h-4 w-4" />
              제주 신화
            </Link>
            <Link 
              href="/myth-character" 
              className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 font-medium text-sm lg:text-base"
            >
              <Sparkles className="h-4 w-4" />
              나의 신화 캐릭터
            </Link>
            <Link 
              href="/games" 
              className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-all duration-300 font-medium text-sm lg:text-base"
            >
              <Gamepad2 className="h-4 w-4" />
              탐나는 게임
            </Link>
            <Link 
              href="/promotion" 
              className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 font-medium text-sm lg:text-base"
            >
              <Images className="h-4 w-4" />
              프로모션
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 py-4">
            <nav className="flex flex-col gap-2">
              <Link 
                href="/myths" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Mountain className="h-5 w-5" />
                제주 신화
              </Link>
              <Link 
                href="/myth-character" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles className="h-5 w-5" />
                나의 신화 캐릭터
              </Link>
              <Link 
                href="/games" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Gamepad2 className="h-5 w-5" />
                탐나는 게임
              </Link>
              <Link 
                href="/promotion" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Images className="h-5 w-5" />
                프로모션
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
