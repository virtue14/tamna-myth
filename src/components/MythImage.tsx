'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Mountain, Sparkles, Users } from 'lucide-react';

interface MythImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackIconName: string;
  fallbackBgColor: string;
}

const iconMap = {
  Mountain,
  Sparkles,
  Users,
};

export default function MythImage({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  fallbackIconName, 
  fallbackBgColor 
}: MythImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (imageError) {
    const FallbackIcon = iconMap[fallbackIconName as keyof typeof iconMap] || Mountain;
    return (
      <div className={`w-full h-full bg-gradient-to-br ${fallbackBgColor} flex items-center justify-center`}>
        <FallbackIcon className="h-16 w-16 text-white" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* 스켈레톤 로딩 */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      )}
      
      <Image 
        src={src} 
        alt={alt}
        width={width}
        height={height}
        className={`${className} transition-opacity duration-200 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        priority
        quality={95}
        loading="eager"
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmM2Y0ZjYiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI2U1ZTdlYiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2YzZjRmNiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4="
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </div>
  );
}
