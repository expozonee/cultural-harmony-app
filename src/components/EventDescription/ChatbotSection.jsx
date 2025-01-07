import Chatbot from "../ChatBot/Chatbot";
function ChatbotSection({ event, isChatbotVisible, toggleChatbot }) {
  return (
    <div>
      <button id="toggle-chat" onClick={toggleChatbot}>
        {isChatbotVisible ? `Close Chatbot` : `Ask Our Chatbot!`}
      </button>

      {isChatbotVisible && (
        <div className="ai-chatbot">
          <Chatbot eventDetails={event} toggleChatbot={toggleChatbot} />
        </div>
      )}
    </div>
  );
}

export default ChatbotSection;
