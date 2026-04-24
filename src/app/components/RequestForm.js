"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function RequestForm({ addRequest }) {
  const [area, setArea] = useState("");
  const [need, setNeed] = useState("");
  const [priority, setPriority] = useState("low");
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY
  );

  async function analyzeAI() {
    if (!area || !need) {
      alert("Enter area and need first");
      return;
    }

    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

      const prompt = `
You are an NGO emergency analyzer.

Area: ${area}
Need: ${need}

Tell:
1. Priority
2. Resources Needed
3. Recommended Action

Short answer only.
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      setAiResult(text);
    } catch (error) {
        console.log(error)
      setAiResult("AI Failed : " + error.message);
    }

    setLoading(false);
  }

  function submitRequest() {
    addRequest({
      area,
      need,
      priority,
      time: new Date().toLocaleTimeString(),
    });

    setArea("");
    setNeed("");
    setPriority("low");
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl space-y-4">

      <input
        type="text"
        placeholder="Enter Area"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        className="w-full p-3 rounded bg-slate-700"
      />

      <select
        value={need}
        onChange={(e) => setNeed(e.target.value)}
        className="w-full p-3 rounded bg-slate-700"
      >
        <option>food</option>
        <option>medical</option>
        <option>shelter</option>
        <option>water</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-3 rounded bg-slate-700"
      >
        <option>low</option>
        <option>medium</option>
        <option>high</option>
      </select>

      <div className="grid md:grid-cols-2 gap-3">

        <button
          onClick={submitRequest}
          className="p-3 rounded bg-emerald-500"
        >
          Allocate
        </button>

        <button
          onClick={analyzeAI}
          className="p-3 rounded bg-purple-500"
        >
          {loading ? "Analyzing..." : "Analyze with AI"}
        </button>

      </div>

      {aiResult && (
        <div className="bg-slate-700 p-4 rounded-xl whitespace-pre-line">
          <h2 className="font-bold mb-2">Gemini Result</h2>
          {aiResult}
        </div>
      )}
    </div>
  );
}