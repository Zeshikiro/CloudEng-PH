import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    const { messages, context } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      );
    }

    // Prepare system instructions
    const systemInstruction = `
You are CloudBot, an expert cloud engineering assistant for CloudEng PH.
Your goal is to help Filipino students learn about cloud computing in an engaging, encouraging, and simple way.
Use simple English (and optionally a tiny bit of casual Taglish if appropriate for warmth, but stick mostly to Simple English).
Keep your answers concise and directly answer the user's question. Use emojis to make learning fun!
If they ask something unrelated to cloud engineering, politely redirect them back to the lessons.

The user is currently reading this module/lesson context:
"${context || 'General Cloud Engineering context'}"

Use this context to ground your answers if they ask questions like "What does this mean?" or "Explain the first concept".
    `.trim();

    // The messages array from the client will be { role: 'user' | 'model', parts: [{ text: string }] }
    // We pass this directly to generateContent (excluding the final user message which is the prompt).
    const formattedMessages = messages.map((m: any) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedMessages,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const botResponse = response.text || 'Sorry, I could not generate a response.';

    return NextResponse.json({ response: botResponse });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during chat generation.' },
      { status: 500 }
    );
  }
}
