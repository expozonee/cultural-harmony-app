import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function AIEventKnowledge({ eventDetails }) {
  const geminyApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const fetchDetails = async () => {
    try {
      const genAI = new GoogleGenerativeAI(geminyApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const detailsPrompt = `please enhance my knowledge and provide me some interesting cultural and historical facts about this event: ${eventDetails.event_title}. make that short and concise with 3-5 facts.`;

      const result = await model.generateContent(detailsPrompt);
      setDetails(result.response.text());
      setVisible(visible);
    } catch (error) {
      console.error("Error fetching AI details:", error);
      setDetails(
        "Oops, didn't find facts and background material... Please try again later, we promise to try again"
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
          <button onClick={fetchDetails} disabled={loading}>
            I want to learn more about the cultural context of this event!
          </button>
        )}
        {details && visible && (
          <div className="ai-facts-container">
            <h3>Some interesting facts you may want to know:</h3>
            <p>{details}</p>
            <button onClick={toggleVisibility}>Hide Facts</button>
          </div>
        )}
        {details && !visible && (
          <button onClick={toggleVisibility}>Show Facts</button>
        )}
      </div>
    </>
  );
}

export default AIEventKnowledge;
