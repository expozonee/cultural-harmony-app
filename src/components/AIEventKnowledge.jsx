import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function AIEventKnowledge({ eventDetails }) {
  const geminyApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    try {
      const genAI = new GoogleGenerativeAI(geminyApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const detailsPrompt = `please enhance my knowledge and provide me some cultural and historical details about this event: ${eventDetails.event_title}`;

      const result = await model.generateContent(detailsPrompt);
      setDetails(result.response.text());
    } catch (error) {
      console.error("Error fetching AI details:", error);
      setDetails(
        "Oops, didn't find facts and background material... Please try again later, we promise to try again"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <button onClick={fetchDetails} disabled={loading}>
          I want to learn more about the cultural context of this event!
        </button>
        {details && (
          <div className="ai-tips-container">
            <h3>Here are some interesting facts you may want to know!</h3>
            <p>{details}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default AIEventKnowledge;
