import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function AIEventKnowledge({ eventDetails }) {
  const geminyApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const geminiModel = "gemini-1.5-flash";

  const fetchDetails = async () => {
    try {
      const genAI = new GoogleGenerativeAI(geminyApiKey);
      const model = genAI.getGenerativeModel({ model: geminiModel });
      const detailsPrompt = `please enhance my knowledge and provide me some interesting cultural and historical facts about this event: ${eventDetails.event_title} and its summary: ${eventDetails.summary}. make that short and concise with 3-5 facts and return it as a javascript array, each fact as a string. example: [fact1, fact2, fact3,...]`;

      const result = await model.generateContent(detailsPrompt);

      const resultText = result.response.text();

      // extract the array from the result text
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
      const parsedFacts = JSON.parse(resultArray);
      setDetails(parsedFacts);
      setVisible(visible);
    } catch (error) {
      console.error("Error fetching AI details:", error);
      setDetails([
        "Oops, didn't find facts and background material... Please try again later, or contact the event host.",
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
          <button onClick={fetchDetails} disabled={loading}>
            I want to learn more about the cultural context of this event!
          </button>
        )}
        {details && details.length > 0 && visible && (
          <div className="ai-facts-container">
            <h3>Some fun facts you may want to know:</h3>
            <ul>
              {details.map((fact, index) => (
                <li key={index}>
                  <p>{fact}</p>
                </li>
              ))}
            </ul>
            <button onClick={toggleVisibility}>Hide Facts</button>
          </div>
        )}
        {details && details.length > 0 && !visible && (
          <button onClick={toggleVisibility}>Show Facts</button>
        )}
      </div>
    </>
  );
}

export default AIEventKnowledge;
