import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    // API key is handled with fallback in OpenAI initialization

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });

    // Compose OpenAI messages
    const openaiMessages = [
      {
        role: "system",
        content:
          "You are a supportive, empathetic, and non-judgmental AI therapist. Always respond with kindness, encouragement, and understanding. Help the user feel heard and validated, and offer gentle, practical advice when appropriate.",
      },
      ...messages.map((m: any) => ({ role: m.role, content: m.content })),
    ];

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: openaiMessages,
      max_tokens: 256,
    });

    const aiMessage = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    console.log("🤖 AI Response:", aiMessage); // Debug log

    return NextResponse.json({ response: aiMessage });
  } catch (error) {
    console.error("🧠 OpenAI API error:", error);
    return NextResponse.json(
      { error: (error as any)?.message || "Something went wrong." },
      { status: 500 }
    );
  }
}
