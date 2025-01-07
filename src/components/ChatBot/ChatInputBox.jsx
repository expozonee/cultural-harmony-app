import { useState } from "react";
import "@fortawesome/fontawesome-free";
function ChatInputBox({ loading, onSend, eventDetails }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // send the input message to the chatbot
    if (input.trim()) {
      onSend(input.trim());
      // clear the input after user sends message
      setInput("");
    }
  };

  return (
    <>
      <form className="chat-input-box" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            e.preventDefault();
            setInput(e.target.value);
          }}
          placeholder="Ask me something else about this event..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </>
  );
}

export default ChatInputBox;
