import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatWindow from "./ChatWindow";
import ChatInputBox from "./ChatInputBox";
import "@fortawesome/fontawesome-free";

function Chatbot({ eventDetails }) {
  const geminyApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const geminiModel = "gemini-1.5-flash";

  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const builtInPrompts = [
    `provide me an interesting cultural or historical short fact related to this event: ${eventDetails.event_title}.`,
    `provide me a tip that will help me prepare for this upcoming event: ${eventDetails.event_title}, based on the description: ${eventDetails.description}, and location: ${eventDetails.location["city_name"]}.`,
    `explain the cultural significance of this event in a short sentence: ${eventDetails.event_title}`,
    `advise me concisely how to properly dress for this event: ${eventDetails.event_title} in ${eventDetails.location?.city_name}`,
  ];

  // free user prompt validation
  const validatePrompt = async (userInput) => {
    try {
      const genAI = new GoogleGenerativeAI(geminyApiKey);
      const model = genAI.getGenerativeModel({ model: geminiModel });

      const validationPrompt = `
You are an assistant that determines whether a given sentence refers directly to a specific social event. Here is the user's input: "${userInput}".
Event Details:
- Title: "${eventDetails.event_title}"
- Summary: "${eventDetails.summary}"
- Description: "${eventDetails.description}"
- Location: "${eventDetails.location?.city_name}"

Task:
Return a JavaScript boolean value (\`true\` or \`false\`) based on the following criteria:
- Return \`true\` if the user's input directly refers to the event's title or summary.
- Return \`false\` otherwise.

Examples:
1. User Input: "Tell me about Bitcoin."
   Output: false

2. User Input: "What can I bring to this event?"
   Output: true

3. User Input: "Is there parking available at the event?"
   Output: true

4. User Input: "What's the weather like today?"
   Output: false

5. User Input: "Tell me about the event's traditional decorations."
   Output: true

6. User Input: "What kind of food shall I bring?"
   Output: true

7. User Input: "What do they want?"
   Output: false

Please provide only \`true\` or \`false\` as the output.
`;

      const validationFlag = await model.generateContent(validationPrompt);
      const validationResult = validationFlag.response
        .text()
        .toLowerCase()
        .includes("true");
      console.log(validationResult);
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

      // define which prompt to send to the AI
      let promptToSend = userInput;

      // if it's a user's free prompt, validate it and include event details
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

        // pass the event details in the free prompt
        promptToSend = `
  User's Question: "${userInput}"
  
  base your answer on these event details:
  - Title: "${eventDetails.event_title}"
  - Summary: "${eventDetails.summary}"
  - Description: "${eventDetails?.description}"
  - Location: "${eventDetails.location?.city_name}"
  - Contribution list: "${eventDetails?.contribution_list}"
        `;
      }

      const genAI = new GoogleGenerativeAI(geminyApiKey);
      const model = genAI.getGenerativeModel({ model: geminiModel });

      const result = await model.generateContent(promptToSend);
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
        // in case of an error, update the history with an error message
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
        <h3>How may I help you?</h3>
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
