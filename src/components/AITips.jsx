import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function AITips({ eventDetails }) {
  const geminyApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [tips, setTips] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTips = async () => {
    try {
      const genAI = new GoogleGenerativeAI(geminyApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const tipsPrompt = `give me 5 tips that will help me prepare for this upcoming event: ${eventDetails.event_title}`;

      const result = await model.generateContent(tipsPrompt);
      setTips(result.response.text());
    } catch (error) {
      console.error("Error fetching AI tips:", error);
      setTips(
        "Oops, didn't find tips... Please try again later, we promise to try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <button onClick={fetchTips} disabled={loading}>
          Give me 5 tips for this event!
        </button>
        {tips && (
          <div className="ai-tips-container">
            <h3>Here are some tips to help you prepare!</h3>
            <p>{tips}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default AITips;
