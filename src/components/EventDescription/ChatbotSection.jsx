import Chatbot from "../ChatBot/Chatbot";
function ChatbotSection({ event, isChatbotVisible, toggleChatbot }) {
    return (
        <div>
            <button onClick={toggleChatbot}>
            {isChatbotVisible ? `Close Chatbot` : `Ask Our Chatbot!`}
            </button>

            {isChatbotVisible && (
            <div className="ai-chatbot">
                <Chatbot eventDetails={event} />
            </div>
            )}
      </div>
    );}

export default ChatbotSection;