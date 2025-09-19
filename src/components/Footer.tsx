import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-myth-gray-dark text-myth-cream py-8">
      <div className="container mx-auto px-4 text-center">
        
        {/* Copyright */}
        <div>
          <p className="text-myth-cream-light text-sm">
            © 2025 탐나는 신화
          </p>
          <p className="text-myth-cream-light text-xs mt-1 opacity-75">
            제주 신화와 함께하는 특별한 경험
          </p>
        </div>

        {/* Team Credit */}
        <div className="flex items-center justify-center gap-2">
          <p className="text-xs text-myth-cream-light opacity-75">MADE BY</p>
          <div>
            <Image
              src="/images/엠포스.png"
              alt="엠포스 팀 로고"
              width={32}
              height={32}
              className="object-contain opacity-90"
            />
          </div>
        </div>
        
      </div>
    </footer>
  );
}
