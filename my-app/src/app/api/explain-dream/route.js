// File: src/app/api/explain-dream/route.js

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let requestCount = 0;
const MAX_REQUESTS = 5;
const TIME_FRAME = 60000;

const isRateLimited = () => {
  requestCount++;
  setTimeout(() => requestCount--, TIME_FRAME);
  return requestCount > MAX_REQUESTS;
};

async function fetchExplanation(dreamText) {
  let attempts = 0;
  const maxAttempts = 5;
  const delay = (attempt) => new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));

  while (attempts < maxAttempts) {
    if (isRateLimited()) {
      await delay(attempts);
      attempts++;
      continue;
    }

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant that interprets dreams." },
          { role: "user", content: `Interpret this dream: ${dreamText}` }
        ],
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error("Error in fetchExplanation:", error);
      if (error.response?.status === 429) {
        await delay(attempts);
        attempts++;
      } else {
        throw new Error("Failed to fetch explanation from AI service.");
      }
    }
  }

  throw new Error("Maximum attempts reached for fetching explanation.");
}

export async function POST(req) {
  const { dreamText } = await req.json();
  console.log("Received dream:", dreamText); // Debugging log

  if (!dreamText) {
    return NextResponse.json({ error: "No dream text provided" }, { status: 400 });
  }

  try {
    const explanation = await fetchExplanation(dreamText);
    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Error processing request:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}