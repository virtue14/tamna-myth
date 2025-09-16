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

  if (imageError) {
    const FallbackIcon = iconMap[fallbackIconName as keyof typeof iconMap] || Mountain;
    return (
      <div className={`w-full h-full bg-gradient-to-br ${fallbackBgColor} flex items-center justify-center`}>
        <FallbackIcon className="h-16 w-16 text-white" />
      </div>
    );
  }

  return (
    <Image 
      src={src} 
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImageError(true)}
    />
  );
}
