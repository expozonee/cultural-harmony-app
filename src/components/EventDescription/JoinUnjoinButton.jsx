import { Link } from "react-router-dom";
import ChatbotSection from "./ChatbotSection";
function JoinUnjoinButton({ hasJoined, onJoin, onUnJoin,hostEmailAddress, currentUserEmail, event, isChatbotVisible, toggleChatbot }) {
    return <div className="event-buttons-card">
      {hasJoined ? (
            <button className="unjoin-button" onClick={onUnJoin}>
              Unjoin Event
            </button>
            ) : (
            <button className="join-button" onClick={onJoin}>
              Join Event
            </button>
          )}
          {hostEmailAddress === currentUserEmail && (
              <>
                <Link to={`/events/${hostEmailAddress}/update-event`}>
                  <button className="update-event-button">Update Event</button>
                </Link>
              </>
            )}
          <ChatbotSection
                  event={event}
                  isChatbotVisible={isChatbotVisible}
                  toggleChatbot={toggleChatbot}
                />
    </div>
     
  }
  
  export default JoinUnjoinButton;
  