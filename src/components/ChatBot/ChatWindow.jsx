function ChatWindow({ conversation }) {
  return (
    <>
      <div className="chat-window">
        {conversation.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {/* display the message text */}
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ChatWindow;
