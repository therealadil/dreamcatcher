// src/app/api/explain-dream/route.js

export async function POST(req) {
  try {
    const { dreamText } = await req.json();

    if (!dreamText) {
      return new Response(JSON.stringify({ error: "No dream text provided" }), {
        status: 400,
      });
    }

    // Example: Mock AI explanation
    const mockAiExplanation = `The AI has analyzed the dream text and determined that it represents a sense of freedom and exploration. The dreamer may be feeling a desire to break free from constraints and discover new possibilities.`;

    return new Response(JSON.stringify({ explanation: mockAiExplanation }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in explain-dream API:", error);
    return new Response(JSON.stringify({ error: "Failed to generate explanation" }), {
      status: 500,
    });
  }
}