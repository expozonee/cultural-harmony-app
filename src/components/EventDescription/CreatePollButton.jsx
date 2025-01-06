import CreatePoll from "../CreatePoll";
function CreatePollButton({ showCreatePoll, setShowCreatePoll }) {
    return !showCreatePoll ? (
      <button className="create-new-poll-button" onClick={() => setShowCreatePoll(true)}>
        Create A Poll for This Event
      </button>
    ) : (
      <div className="create-poll-container">
        <CreatePoll onClose={() => setShowCreatePoll(false)} />
      </div>
    );
  }
  
  export default CreatePollButton;
  