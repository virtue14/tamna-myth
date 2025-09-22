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
      src: 'https://gdpark-official.notion.site/image/attachment%3A695a803c-826e-4f3f-a6dc-6cbf2e389e85%3A%E1%84%92%E1%85%A9%E1%86%BC%E1%84%87%E1%85%A9%E1%84%91%E1%85%A9%E1%84%89%E1%85%B3%E1%84%90%E1%85%A51.png?table=block&id=27610da3-ad82-801a-9996-ce74244054dd&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=470&userId=&cache=v2',
      alt: '홍보포스터 1',
      title: '홍보포스터 1',
      description: '포스터',
      category: '포스터'
    },
    {
      id: 2,
      src: 'https://gdpark-official.notion.site/image/attachment%3A781917a4-0a91-49af-82e4-ef5480d4b0c3%3A%E1%84%92%E1%85%A9%E1%86%BC%E1%84%87%E1%85%A9%E1%84%91%E1%85%A9%E1%84%89%E1%85%B3%E1%84%90%E1%85%A52.png?table=block&id=27610da3-ad82-8023-b06b-d7637a87f504&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=470&userId=&cache=v2',
      alt: '홍보포스터 2',
      title: '홍보포스터 2',
      description: '포스터',
      category: '포스터'
    },
    {
      id: 3,
      src: 'https://gdpark-official.notion.site/image/attachment%3A8ded09e6-cf0b-4a49-bb6d-673642efe9a8%3A%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC%E1%84%85%E1%85%A1%E1%84%87%E1%85%A6%E1%86%AF.png?table=block&id=27610da3-ad82-8020-b347-d8003cfd2134&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      alt: '설문대할망 라벨',
      title: '설문대할망 라벨',
      description: '소주 라벨',
      category: '소주'
    },
    {
      id: 4,
      src: 'https://gdpark-official.notion.site/image/attachment%3A31f37877-8b52-4239-9227-14beba6f0b9b%3A%E1%84%8C%E1%85%A1%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%87%E1%85%B5%E1%84%85%E1%85%A1%E1%84%87%E1%85%A6%E1%86%AF.png?table=block&id=27610da3-ad82-800f-9790-e53627e37da6&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      alt: '자청비 라벨',
      title: '자청비 라벨',
      description: '소주 라벨',
      category: '소주'
    },
    {
      id: 5,
      src: 'https://gdpark-official.notion.site/image/attachment%3A0775b0f2-d895-48e1-8341-fb96e9498429%3A%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A9%E1%84%8C%E1%85%AE%E1%84%8C%E1%85%A1%E1%86%AB.png?table=block&id=27610da3-ad82-80f6-8f9a-cbe0bdb6a01e&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '설문대할망 소주잔',
      title: '설문대할망 소주잔',
      description: '전용 잔',
      category: '소주'
    },
    {
      id: 6,
      src: 'https://gdpark-official.notion.site/image/attachment%3Afcfc74f5-d1f7-448d-924d-9d266dc8b618%3A%E1%84%8C%E1%85%A1%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%87%E1%85%B5%E1%84%89%E1%85%A9%E1%84%8C%E1%85%AE%E1%84%8C%E1%85%A1%E1%86%AB.png?table=block&id=27610da3-ad82-80d6-9e1a-d91368fc3d96&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '자청비 소주잔',
      title: '자청비 소주잔',
      description: '전용 잔',
      category: '소주'
    },
    {
      id: 7,
      src: 'https://gdpark-official.notion.site/image/attachment%3A076c4c0b-eb29-43c2-b1b9-f02570275620%3A%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A9%E1%84%8C%E1%85%AE%E1%84%91%E1%85%A2%E1%84%8F%E1%85%B5%E1%84%8C%E1%85%B5.png?table=block&id=27610da3-ad82-80f1-b14e-c520338dfd2f&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      alt: '설문대할망 소주 패키지',
      title: '설문대할망 소주 패키지',
      description: '소주 패키지',
      category: '소주'
    },
    {
      id: 8,
      src: 'https://gdpark-official.notion.site/image/attachment%3Aee20e000-7943-4cf0-87cf-76ef1d1acffa%3A%E1%84%8C%E1%85%A1%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%87%E1%85%B5%E1%84%89%E1%85%A9%E1%84%8C%E1%85%AE%E1%84%91%E1%85%A2%E1%84%8F%E1%85%B5%E1%84%8C%E1%85%B5.png?table=block&id=27610da3-ad82-8068-a21e-f44509cb11d1&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '자청비 소주 패키지',
      title: '자청비 소주 패키지',
      description: '소주 패키지',
      category: '소주'
    },
    {
      id: 9,
      src: 'https://gdpark-official.notion.site/image/attachment%3Abd0f9a1a-c010-4530-8392-9fd7a7b6a414%3A%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC%E1%84%86%E1%85%A2%E1%86%A8%E1%84%8C%E1%85%AE.png?table=block&id=27610da3-ad82-8068-a36d-f382b63c27d9&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '설문대할망 맥주',
      title: '설문대할망 맥주',
      description: '맥주',
      category: '맥주'
    },
    {
      id: 10,
      src: 'https://gdpark-official.notion.site/image/attachment%3Aa6a7d82b-f9c4-4388-b6fd-1ecc8bd2f02f%3A%E1%84%83%E1%85%A9%E1%86%AF%E1%84%92%E1%85%A1%E1%84%85%E1%85%B3%E1%84%87%E1%85%A1%E1%86%BC%E1%84%86%E1%85%A2%E1%86%A8%E1%84%8C%E1%85%AE.png?table=block&id=27610da3-ad82-8059-a93d-e4f8c5316c1f&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '돌하르방 맥주',
      title: '돌하르방 맥주',
      description: '맥주',
      category: '맥주'
    },
    {
      id: 11,
      src: 'https://gdpark-official.notion.site/image/attachment%3A518ca322-6222-4bbf-b31c-5a05d0a5327f%3A%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC%E1%84%86%E1%85%A2%E1%86%A8%E1%84%8C%E1%85%AE%E1%84%91%E1%85%A2%E1%84%8F%E1%85%B5%E1%84%8C%E1%85%B5.png?table=block&id=27610da3-ad82-800f-8e86-fe037d229330&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '설문대할망 맥주 패키지',
      title: '설문대할망 맥주 패키지',
      description: '맥주 패키지',
      category: '맥주'
    },
    {
      id: 12,
      src: 'https://gdpark-official.notion.site/image/attachment%3A1b4d1288-1cf5-48ea-93d4-bcf7b65193a7%3A%E1%84%83%E1%85%A9%E1%86%AF%E1%84%92%E1%85%A1%E1%84%85%E1%85%B3%E1%84%87%E1%85%A1%E1%86%BC%E1%84%86%E1%85%A2%E1%86%A8%E1%84%8C%E1%85%AE%E1%84%91%E1%85%A2%E1%84%8F%E1%85%B5%E1%84%8C%E1%85%B5.png?table=block&id=27610da3-ad82-80ee-b522-cf1bf417f56a&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      alt: '돌하르방 맥주 패키지',
      title: '돌하르방 맥주 패키지',
      description: '맥주 패키지',
      category: '맥주'
    },
    // 스티커 카테고리
    {
      id: 13,
      src: 'https://gdpark-official.notion.site/image/attachment%3Ae09cec6f-6f41-4d30-a307-5f3da3299674%3A%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC%E1%84%89%E1%85%B3%E1%84%90%E1%85%B5%E1%84%8F%E1%85%A51.png?table=block&id=27610da3-ad82-80ae-9b2a-f1b8bccb498b&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '설문대할망 스티커 1',
      title: '설문대할망 스티커 1',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 14,
      src: 'https://gdpark-official.notion.site/image/attachment%3Afdaca273-3305-40ae-a40b-7bcdbd4c6dfc%3A%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC%E1%84%89%E1%85%B3%E1%84%90%E1%85%B5%E1%84%8F%E1%85%A52.png?table=block&id=27610da3-ad82-80e9-85fd-f7f6b2765799&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '설문대할망 스티커 2',
      title: '설문대할망 스티커 2',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 15,
      src: 'https://gdpark-official.notion.site/image/attachment%3A741368b6-7089-4ddc-a092-ebef4e23fec5%3A%E1%84%8C%E1%85%A1%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%87%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B5%E1%84%8F%E1%85%A51.png?table=block&id=27610da3-ad82-8041-8227-fa6b7baf9983&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '자청비 스티커 1',
      title: '자청비 스티커 1',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 16,
      src: 'https://gdpark-official.notion.site/image/attachment%3A8e2405f5-b974-42aa-9d9a-2d7f8ebd5125%3A%E1%84%8C%E1%85%A1%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%87%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B5%E1%84%8F%E1%85%A52.png?table=block&id=27610da3-ad82-804f-8021-d176ec9ae937&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '자청비 스티커 2',
      title: '자청비 스티커 2',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 17,
      src: 'https://gdpark-official.notion.site/image/attachment%3A96ac3e47-21bd-4883-aea7-93efa9534e8f%3A%E1%84%83%E1%85%A9%E1%86%AF%E1%84%92%E1%85%A1%E1%84%85%E1%85%B3%E1%84%87%E1%85%A1%E1%86%BC%E1%84%89%E1%85%B3%E1%84%90%E1%85%B5%E1%84%8F%E1%85%A51.png?table=block&id=27610da3-ad82-8017-811d-cbb911b1d2ef&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      alt: '돌하르방 스티커 1',
      title: '돌하르방 스티커 1',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 18,
      src: 'https://gdpark-official.notion.site/image/attachment%3A42d2d0db-3bfa-4caa-94af-7cabe2c9df28%3A%E1%84%83%E1%85%A9%E1%86%AF%E1%84%92%E1%85%A1%E1%84%85%E1%85%B3%E1%84%87%E1%85%A1%E1%86%BC%E1%84%89%E1%85%B3%E1%84%90%E1%85%B5%E1%84%8F%E1%85%A52.png?table=block&id=27610da3-ad82-80fc-8036-d2a92a690b2e&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      alt: '돌하르방 스티커 2',
      title: '돌하르방 스티커 2',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 19,
      src: 'https://gdpark-official.notion.site/image/attachment%3A7f270f1f-13b0-4da0-88f2-89f14d15be6b%3A%E1%84%83%E1%85%A9%E1%86%AF%E1%84%92%E1%85%A1%E1%84%85%E1%85%B3%E1%84%87%E1%85%A1%E1%86%BC%E1%84%89%E1%85%B3%E1%84%90%E1%85%B5%E1%84%8F%E1%85%A53.png?table=block&id=27610da3-ad82-8024-b3d4-dfd03cb6a2ad&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '돌하르방 스티커 3',
      title: '돌하르방 스티커 3',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 20,
      src: 'https://gdpark-official.notion.site/image/attachment%3A7d01a197-b3f3-4fa7-a50c-52117db58a05%3A%E1%84%89%E1%85%A1%E1%86%B7%E1%84%89%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC%E1%84%89%E1%85%B3%E1%84%90%E1%85%B5%E1%84%8F%E1%85%A51.png?table=block&id=27610da3-ad82-809c-9a17-e340a458530c&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '삼승할망 스티커 1',
      title: '삼승할망 스티커 1',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 21,
      src: 'https://gdpark-official.notion.site/image/attachment%3Ac9003bfd-2509-42db-8131-9ceb97064ff8%3A%E1%84%89%E1%85%A1%E1%86%B7%E1%84%89%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC%E1%84%89%E1%85%B3%E1%84%90%E1%85%B5%E1%84%8F%E1%85%A52.png?table=block&id=27610da3-ad82-8071-a892-da842b68fa54&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '삼승할망 스티커 2',
      title: '삼승할망 스티커 2',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 22,
      src: 'https://gdpark-official.notion.site/image/attachment%3A44a3fef7-be1c-4423-ba0f-99323e0c30f3%3A%E1%84%89%E1%85%A1%E1%86%B7%E1%84%89%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC%E1%84%89%E1%85%B3%E1%84%90%E1%85%B5%E1%84%8F%E1%85%A53.png?table=block&id=27610da3-ad82-80ac-a460-cd62aadacdc8&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '삼승할망 스티커 3',
      title: '삼승할망 스티커 3',
      description: '스티커',
      category: '스티커'
    },
    {
      id: 23,
      src: 'https://gdpark-official.notion.site/image/attachment%3A5a758323-07ba-4447-87a1-5e676382dae6%3A%E1%84%87%E1%85%A9%E1%86%AB%E1%84%92%E1%85%A3%E1%86%BC%E1%84%83%E1%85%A1%E1%86%BC%E1%84%89%E1%85%B3%E1%84%90%E1%85%B5%E1%84%8F%E1%85%A51.png?table=block&id=27610da3-ad82-8066-87f2-d1a6bb6e17a9&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      alt: '본향당 스티커 1',
      title: '본향당 스티커 1',
      description: '스티커',
      category: '스티커'
    },
    // 피규어 카테고리
    {
      id: 24,
      src: 'https://gdpark-official.notion.site/image/attachment%3Afe8ab72a-178e-4721-bbb6-59480a3e24c2%3A%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC%E1%84%91%E1%85%B5%E1%84%80%E1%85%B2%E1%84%8B%E1%85%A51.png?table=block&id=27610da3-ad82-80b5-8619-ec1c1fe9652b&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '설문대할망 피규어 1',
      title: '설문대할망 피규어 1',
      description: '피규어',
      category: '피규어'
    },
    {
      id: 25,
      src: 'https://gdpark-official.notion.site/image/attachment%3A05ae7289-9c40-405a-8fe4-c693d11407fc%3A%E1%84%8C%E1%85%A1%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%87%E1%85%B5%E1%84%91%E1%85%B5%E1%84%80%E1%85%B2%E1%84%8B%E1%85%A51.png?table=block&id=27610da3-ad82-80a2-9fe8-ce2dee0477b2&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      alt: '자청비 피규어 1',
      title: '자청비 피규어 1',
      description: '피규어',
      category: '피규어'
    },
    {
      id: 34,
      src: 'https://gdpark-official.notion.site/image/attachment%3A2d13c763-d8bf-4cee-b4d8-c14749c9221e%3A%E1%84%8C%E1%85%A1%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%87%E1%85%B5%E1%84%91%E1%85%B5%E1%84%80%E1%85%B2%E1%84%8B%E1%85%A52.png?table=block&id=27610da3-ad82-8050-b0c9-c9b005fae17e&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '자청비 피규어 2',
      title: '자청비 피규어 2',
      description: '피규어',
      category: '피규어'
    },
    {
      id: 26,
      src: 'https://gdpark-official.notion.site/image/attachment%3Afdccdf3e-c221-4498-be9d-8f1e5157e5e0%3A%E1%84%83%E1%85%A9%E1%86%AF%E1%84%92%E1%85%A1%E1%84%85%E1%85%B3%E1%84%87%E1%85%A1%E1%86%BC%E1%84%91%E1%85%B5%E1%84%80%E1%85%B2%E1%84%8B%E1%85%A51.png?table=block&id=27610da3-ad82-80b2-8e43-cffa3240206e&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '돌하르방 피규어 1',
      title: '돌하르방 피규어 1',
      description: '피규어',
      category: '피규어'
    },
    {
      id: 31,
      src: 'https://gdpark-official.notion.site/image/attachment%3Ae87bf1ce-bcec-456c-9612-f37b8c1c3570%3A%E1%84%83%E1%85%A9%E1%86%AF%E1%84%92%E1%85%A1%E1%84%85%E1%85%B3%E1%84%87%E1%85%A1%E1%86%BC%E1%84%91%E1%85%B5%E1%84%80%E1%85%B2%E1%84%8B%E1%85%A52.png?table=block&id=27610da3-ad82-80b5-ad37-e12138622704&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      alt: '돌하르방 피규어 2',
      title: '돌하르방 피규어 2',
      description: '피규어',
      category: '피규어'
    },
    {
      id: 32,
      src: 'https://gdpark-official.notion.site/image/attachment%3Ad1ab0a99-243b-456d-acbb-b977682815d2%3A%E1%84%83%E1%85%A9%E1%86%AF%E1%84%92%E1%85%A1%E1%84%85%E1%85%B3%E1%84%87%E1%85%A1%E1%86%BC%E1%84%91%E1%85%B5%E1%84%80%E1%85%B2%E1%84%8B%E1%85%A53.png?table=block&id=27610da3-ad82-8045-b3f3-c1feba87912e&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=1470&userId=&cache=v2',
      alt: '돌하르방 피규어 3',
      title: '돌하르방 피규어 3',
      description: '피규어',
      category: '피규어'
    },
    {
      id: 27,
      src: 'https://gdpark-official.notion.site/image/attachment%3A05aa8ac4-d1b2-4824-99ac-2e6515c2f41c%3A%E1%84%89%E1%85%A1%E1%86%B7%E1%84%89%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC%E1%84%91%E1%85%B5%E1%84%80%E1%85%B2%E1%84%8B%E1%85%A51.png?table=block&id=27610da3-ad82-8024-81e3-eb25096b0d77&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '삼승할망 피규어 1',
      title: '삼승할망 피규어 1',
      description: '피규어',
      category: '피규어'
    },
    // 추가 소주 패키지
    {
      id: 28,
      src: 'https://gdpark-official.notion.site/image/attachment%3A29ffab88-908a-419f-a5f8-d482a5a0ec3b%3A%E1%84%89%E1%85%A9%E1%84%8C%E1%85%AE%E1%84%91%E1%85%A2%E1%84%8F%E1%85%B5%E1%84%8C%E1%85%B51.png?table=block&id=27610da3-ad82-80ef-9534-d4a9b5eeaeee&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '소주 패키지 1',
      title: '소주 패키지 1',
      description: '소주 패키지',
      category: '소주'
    },
    {
      id: 29,
      src: 'https://gdpark-official.notion.site/image/attachment%3Ada79052f-925a-46c4-97ed-a722ca557d2b%3A%E1%84%89%E1%85%A9%E1%84%8C%E1%85%AE%E1%84%91%E1%85%A2%E1%84%8F%E1%85%B5%E1%84%8C%E1%85%B53.png?table=block&id=27610da3-ad82-8042-b034-d489fab13608&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '소주 패키지 2',
      title: '소주 패키지 2',
      description: '소주 패키지',
      category: '소주'
    },
    {
      id: 30,
      src: 'https://gdpark-official.notion.site/image/attachment%3Abce1d8ff-bd2a-47c2-a0c0-217f2d14c8ac%3A%E1%84%89%E1%85%A9%E1%84%8C%E1%85%AE%E1%84%91%E1%85%A2%E1%84%8F%E1%85%B5%E1%84%8C%E1%85%B52.png?table=block&id=27610da3-ad82-80ee-b9e3-d8fa4d9903e4&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '소주 패키지 3',
      title: '소주 패키지 3',
      description: '소주 패키지',
      category: '소주'
    },
    // 추가 소주 제품
    {
      id: 35,
      src: 'https://gdpark-official.notion.site/image/attachment%3Acd96abc0-6ec2-4680-bcbc-862cceec6b04%3A%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A9%E1%84%8C%E1%85%AE.png?table=block&id=27610da3-ad82-80be-bc45-f7c72a5fd37a&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
      alt: '설문대할망 소주',
      title: '설문대할망 소주',
      description: '소주',
      category: '소주'
    },
    {
      id: 33,
      src: 'https://gdpark-official.notion.site/image/attachment%3A51e93859-51c8-4ba4-a2cc-aef8feda3dae%3A%E1%84%8C%E1%85%A1%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%87%E1%85%B5%E1%84%89%E1%85%A9%E1%84%8C%E1%85%AE.png?table=block&id=27610da3-ad82-8090-b4f6-c0f75c4ba319&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2',
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
                  src="/images/https://gdpark-official.notion.site/image/attachment%3Ac0903e43-72e4-450c-87c6-aa6d23d4659e%3A%E1%84%8B%E1%85%A6%E1%86%B7%E1%84%91%E1%85%A9%E1%84%89%E1%85%B3.png?table=block&id=27610da3-ad82-806e-b755-f0079a14150d&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=280&userId=&cache=v2.png"
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
