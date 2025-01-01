import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function AITips({ eventDetails }) {
  const geminyApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [tips, setTips] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const fetchTips = async () => {
    try {
      const genAI = new GoogleGenerativeAI(geminyApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const tipsPrompt = `give me 5 tips that will help me prepare for this upcoming event: ${eventDetails.event_title}, based on the description: ${eventDetails.description}, and location: ${eventDetails.location["city_name"]}`;

      const result = await model.generateContent(tipsPrompt);
      setTips(result.response.text());
      setVisible(true);
    } catch (error) {
      console.error("Error fetching AI tips:", error);
      setTips(
        "Oops, didn't find tips... Please try again later, we promise to try again"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className="outer-container">
        {!visible && (
          <button onClick={fetchTips} disabled={loading}>
            Give me some tips for this event!
          </button>
        )}
        {tips && visible && (
          <div className="ai-tips-container">
            <h3>Here are some tips to help you prepare:</h3>
            <p>{tips}</p>
            <button onClick={toggleVisibility}>Hide Tips</button>
          </div>
        )}
        {tips && !visible && (
          <button onClick={toggleVisibility}>Show Tips</button>
        )}
      </div>
    </>
  );
}

export default AITips;
