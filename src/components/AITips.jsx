import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function AITips({ eventDetails }) {
  const geminyApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const fetchTips = async () => {
    try {
      const genAI = new GoogleGenerativeAI(geminyApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const tipsPrompt = `provide me 5 tips that will help me prepare for this upcoming event: ${eventDetails.event_title}, based on the description: ${eventDetails.description}, and location: ${eventDetails.location["city_name"]}. please return them in as a javascript array, with each tip as a separate string. example: ["tip1", "tip2", "tip3", "tip4", "tip5"]`;

      const result = await model.generateContent(tipsPrompt);
      const resultText = result.response.text();

      const resultArray = resultText.match(/\[.*?\]/s);

      if (!resultArray) {
        console.error("No array was returned");
      }

      console.log(resultArray);
      if (!Array.isArray(resultArray) || resultArray.length === 0) {
        console.error(
          "Are there correct details for this event? Couldn't find the facts for this event, please try again later."
        );
      }

      const parsedTips = JSON.parse(resultArray);
      setTips(parsedTips);
      setVisible(true);
    } catch (error) {
      console.error("Error fetching AI tips:", error);
      setTips([
        "Oops, didn't find tips... Please try again later, we promise to try again",
      ]);
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
        {tips && tips.length > 0 && visible && (
          <div className="ai-tips-container">
            <h3>Here are some tips to help you prepare:</h3>
            <ul>
              {tips.map((tip, index) => (
                <li key={index}>
                  <p>{tip}</p>
                </li>
              ))}
            </ul>
            <button onClick={toggleVisibility}>Hide Tips</button>
          </div>
        )}
        {tips && tips.length > 0 && !visible && (
          <button onClick={toggleVisibility}>Show Tips</button>
        )}
      </div>
    </>
  );
}

export default AITips;
