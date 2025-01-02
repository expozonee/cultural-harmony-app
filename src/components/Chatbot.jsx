import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatWindow from "./ChatWindow";
function Chatbot({ eventDetails }) {
  const geminyApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const geminiModel = "gemini-1.5-flash";

  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const builtInPrompts = [
    `please enhance my knowledge and provide me some interesting cultural and historical facts about this event: ${eventDetails.event_title} and its summary: ${eventDetails.summary}. make that short and concise with 3-5 facts and return it as a javascript array, each fact as a string. example: [fact1, fact2, fact3,...]`,
    `provide me 5 tips that will help me prepare for this upcoming event: ${eventDetails.event_title}, based on the description: ${eventDetails.description}, and location: ${eventDetails.location["city_name"]}. please return them in as a javascript array, with each tip as a separate string. example: ["tip1", "tip2", "tip3", "tip4", "tip5"]`,
    `explain the significance of this event: ${eventDetails.event_title}`,
  ];

  const sendMessage = async (userInput) => {
    try {
      const genAI = new GoogleGenerativeAI(geminyApiKey);
      const model = genAI.getGenerativeModel({ model: geminiModel });

      const result = await model.generateContent(userInput);
      const resultText = result.response.text();

      // add new messages to the chat message history
      setConversation((prevConversation) => [
        ...prevConversation,
        { sender: "user", message: userInput },
        { sender: "bot", message: resultText },
      ]);
    } catch (error) {
      console.log("Error fetching AI response:", error);
      setConversation((prevConversation) => [
        // in case of an error, update history with an error message
        ...prevConversation,
        { sender: "user", message: userInput },
        {
          sender: "bot",
          message: "Sorry, something went wrong, try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="chatbot-container"></div>
    </>
  );
}

export default Chatbot;
