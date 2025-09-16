import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 제주 사투리 변환 함수
const convertToJejuDialect = (text: string): string => {
  let jejuText = text;
  
  // 기본적인 제주 사투리 변환 규칙
  jejuText = jejuText.replace(/입니다/g, '입네다');
  jejuText = jejuText.replace(/습니다/g, '십네다');
  jejuText = jejuText.replace(/해요/g, '해예');
  jejuText = jejuText.replace(/이에요/g, '이예');
  jejuText = jejuText.replace(/예요/g, '예');
  jejuText = jejuText.replace(/그렇게/g, '경딱');
  jejuText = jejuText.replace(/아주/g, '아시');
  jejuText = jejuText.replace(/많이/g, '하영');
  jejuText = jejuText.replace(/빨리/g, '날쌔게');
  jejuText = jejuText.replace(/무엇/g, '무싱게');
  jejuText = jejuText.replace(/어디/g, '어디메');
  jejuText = jejuText.replace(/언제/g, '어느때');
  jejuText = jejuText.replace(/그런데/g, '경허난');
  jejuText = jejuText.replace(/하지만/g, '허나');
  jejuText = jejuText.replace(/그래서/g, '경해서');
  jejuText = jejuText.replace(/있어요/g, '잇어예');
  jejuText = jejuText.replace(/없어요/g, '읏어예');
  jejuText = jejuText.replace(/좋아요/g, '좋아예');
  jejuText = jejuText.replace(/나는/g, '나는');
  jejuText = jejuText.replace(/너는/g, '너는');
  jejuText = jejuText.replace(/우리는/g, '우리는');
  jejuText = jejuText.replace(/이것은/g, '이거는');
  jejuText = jejuText.replace(/그것은/g, '저거는');
  
  return jejuText;
};

// 신화별 음성 특성 매핑 (다양한 음성 사용)
const getVoiceForMyth = (mythId: string) => {
  const voiceMap: Record<string, { voice: string; speed: number }> = {
    'seolmundae': { voice: 'alloy', speed: 0.9 }, // 거인 여신 - 깊고 위엄있는 음성
    'samsin': { voice: 'nova', speed: 0.8 }, // 출산의 여신 - 따뜻하고 모성적인 음성
    'jachungbi': { voice: 'shimmer', speed: 1.0 }, // 풍요의 여신 - 밝고 활기찬 음성
    'bonhyang': { voice: 'echo', speed: 0.9 }, // 마을 수호신 - 안정적이고 신뢰감 있는 음성
    'yeongdeung': { voice: 'fable', speed: 0.8 }, // 바다의 여신 - 신비롭고 우아한 음성
    'haesin': { voice: 'onyx', speed: 0.9 }, // 바다의 수호신 - 강력하고 권위있는 음성
    'mundo': { voice: 'onyx', speed: 0.8 }, // 비극적 연인 - 감성적이고 깊은 남성 음성
    'segyeong': { voice: 'alloy', speed: 0.9 }, // 질서를 만든 신 - 지혜롭고 차분한 음성
    'dolharubang': { voice: 'echo', speed: 0.8 }, // 수호석상 - 묵직하고 안정적인 음성
    'chilsung': { voice: 'shimmer', speed: 0.9 }, // 별의 신 - 신비롭고 우아한 음성
  };
  
  return voiceMap[mythId] || { voice: 'nova', speed: 0.9 };
};

export async function POST(request: NextRequest) {
  try {
    const { text, mythId } = await request.json();
    
    if (!text) {
      return NextResponse.json({ error: '텍스트가 필요합니다' }, { status: 400 });
    }

    // 제주 사투리로 변환
    const jejuText = convertToJejuDialect(text);
    const voiceConfig = getVoiceForMyth(mythId);
    
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voiceConfig.voice,
      input: jejuText,
      speed: voiceConfig.speed,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=3600', // 1시간 캐시
      },
    });
  } catch (error) {
    console.error('TTS 생성 오류:', error);
    return NextResponse.json({ error: '음성 생성에 실패했습니다' }, { status: 500 });
  }
}
