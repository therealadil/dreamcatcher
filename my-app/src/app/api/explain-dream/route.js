// File: src/app/api/explain-dream/route.js

import { NextResponse } from 'next/server';

async function fetchExplanation() {
  // Hardcoded response for any dream
  return `Dreaming of a streetfight with the Joker on a frozen lake suggests a battle between chaos and control in your life. The Joker represents unpredictability, and the frozen lake indicates emotional fragility. The fact that they drowned may reflect your ability to overcome overwhelming challenges. 

Being transported to the Roman Empire and crowned Emperor points to feelings of leadership and responsibility, while the arrival of aliens forcing humanity to leave Earth suggests external pressures or fears of major life changes. 

Waking up before resolution shows that you may feel uncertain about how to handle these situations, but you're capable of navigating through them.`;
}

export async function POST(req) {
  const { dreamText } = await req.json();
  console.log("Received dream:", dreamText); // Debugging log

  if (!dreamText) {
    return NextResponse.json({ error: "No dream text provided" }, { status: 400 });
  }

  try {
    const explanation = await fetchExplanation();
    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Error processing request:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
