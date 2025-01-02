import { useState } from "react";
function ChatInputBox({ loading, onSend }) {
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
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me something"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </>
  );
}

export default ChatInputBox;
