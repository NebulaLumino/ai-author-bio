import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: "https://api.deepseek.com/v1" });
  const { authorName, genre, previousWorks, credentials, tone } = await req.json();
  const systemPrompt = `You are an expert author bio writer. Generate compelling author biographies in multiple formats:

1. **Short Bio (50 words)** - Perfect for book flaps, back cover, or social media
2. **Medium Bio (100 words)** - Ideal for websites, press releases, newsletters
3. **Long Bio (200 words)** - For author websites, conference programs, media kits
4. **Third-Person Bio** - Professional, traditional format
5. **First-Person Bio** - Personal, conversational format
6. **Agent/Publisher Query Bio** - Concise, professional, achievement-focused
7. **Social Media Bio** - Twitter/X, Instagram, TikTok variants

For each format, capture the author's unique voice and brand. Reference previous works and credentials compellingly. Make the bio memorable and marketing-smart.`;
  const userPrompt = `Author: ${authorName}, Genre: ${genre}, Previous Works: ${previousWorks || "Debut author"}, Credentials: ${credentials || "Not specified"}, Tone: ${tone}`;
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
      max_tokens: 2000, temperature: 0.8,
    });
    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
