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
              src="https://gdpark-official.notion.site/image/attachment%3Ac0903e43-72e4-450c-87c6-aa6d23d4659e%3A%E1%84%8B%E1%85%A6%E1%86%B7%E1%84%91%E1%85%A9%E1%84%89%E1%85%B3.png?table=block&id=27610da3-ad82-806e-b755-f0079a14150d&spaceId=26250d26-3cd7-4e1f-9826-154f79449575&width=2000&userId=&cache=v2"
              alt="팀로고"
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
