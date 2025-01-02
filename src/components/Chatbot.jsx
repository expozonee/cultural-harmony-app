import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatWindow from "./ChatWindow";
import ChatInputBox from "./ChatInputBox";
function Chatbot({ eventDetails }) {
  const geminyApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const geminiModel = "gemini-1.5-flash";

  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const builtInPrompts = [
    `provide me an interesting cultural or historical short fact related to this event: ${eventDetails.event_title}.`,
    `provide me a tip that will help me prepare for this upcoming event: ${eventDetails.event_title}, based on the description: ${eventDetails.description}, and location: ${eventDetails.location["city_name"]}.`,
    `explain the cultural significance of this event in a short sentence: ${eventDetails.event_title}`,
    `advise me concisely how to properly dress for this event: ${eventDetails.event_title}`,
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
      <div className="chatbot-container">
        <h3>ask our chatbot!</h3>
        <ChatWindow conversation={conversation} />
        <div className="builtin-prompts">
          {builtInPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => sendMessage(prompt)}
              disabled={loading}
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="user-input">
          <ChatInputBox onSend={sendMessage} loading={loading} />
        </div>
      </div>
    </>
  );
}

export default Chatbot;
