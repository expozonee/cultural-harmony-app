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

  // free user prompt validation
  const validatePrompt = async (userInput) => {
    try {
      const genAI = new GoogleGenerativeAI(geminyApiKey);
      const model = genAI.getGenerativeModel({ model: geminiModel });

      const validationPrompt = `here is a given prompt: ${userInput}. here is a title of an upcoming social event: ${eventDetails.event_title}. here is the description of the event: ${eventDetails.description}. only if the prompt above refers directly to the event, then return javasctipt true, else return false. example: if the given prompt asks "tell me about bitcoin", return false. if the given prompt assks "what can i bring to this event?", return true.`;

      const validationFlag = await model.generateContent(validationPrompt);
      const validationResult = validationFlag.response
        .text()
        .toLowerCase()
        .includes("true");
      return validationResult;
    } catch (error) {
      console.error("Error while validating prompt: ", error);
      return false;
    }
  };

  const sendMessage = async (userInput) => {
    setLoading(true);
    try {
      // check if the prompt is a built-in one or user's free prompt
      const isBuilInPrompt = builtInPrompts.includes(userInput);

      // if it's a user's free prompt, check if it's a valid one
      if (!isBuilInPrompt) {
        const isValid = await validatePrompt(userInput);
        if (!isValid) {
          setConversation((prevConversation) => [
            // if the prompt is invalid, show an error message to the user
            ...prevConversation,
            { sender: "user", message: userInput },
            {
              sender: "bot",
              message:
                "I can only provide data that refers to this event. Please ask me something which is related to the event.",
            },
          ]);
          return;
        }
      }

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
