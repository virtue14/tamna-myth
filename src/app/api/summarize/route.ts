import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { story, title, character } = await request.json();
    
    if (!story || !title || !character) {
      return NextResponse.json({ error: '필수 데이터가 누락되었습니다' }, { status: 400 });
    }

    const prompt = `
다음은 제주 신화에 대한 정보입니다:

신화 제목: ${title}
신화 캐릭터: ${character}
신화 이야기: ${story}

위 신화를 MZ 세대가 이해하기 쉽고 흥미로운 한 줄 요약으로 작성해주세요. 
요구사항:
- 한 줄로 간결하게 작성
- 현대적이고 친근한 톤앤매너 사용
- 신화의 핵심 메시지와 의미를 담기
- 이모지나 특수문자는 사용하지 말기
- 50자 이내로 작성

한 줄 요약:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "당신은 제주 신화를 현대적으로 해석하는 전문가입니다. MZ 세대가 이해하기 쉽고 흥미로운 방식으로 신화를 설명합니다."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    const summary = completion.choices[0]?.message?.content?.trim();
    
    if (!summary) {
      return NextResponse.json({ error: '요약 생성에 실패했습니다' }, { status: 500 });
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('AI 요약 생성 오류:', error);
    return NextResponse.json({ error: 'AI 요약 생성에 실패했습니다' }, { status: 500 });
  }
}
