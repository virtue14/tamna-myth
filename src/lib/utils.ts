import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function generateMythId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function getRandomMBTI(): string {
  const mbtiTypes = [
    'ENFP', 'ENFJ', 'ENTP', 'ENTJ',
    'ESFP', 'ESFJ', 'ESTP', 'ESTJ',
    'INFP', 'INFJ', 'INTP', 'INTJ',
    'ISFP', 'ISFJ', 'ISTP', 'ISTJ'
  ];
  return mbtiTypes[Math.floor(Math.random() * mbtiTypes.length)];
}
