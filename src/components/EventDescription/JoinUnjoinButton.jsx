function JoinUnjoinButton({ hasJoined, onJoin, onUnJoin }) {
    return hasJoined ? (
      <button className="unjoin-button" onClick={onUnJoin}>
        Unjoin Event
      </button>
    ) : (
      <button className="join-button" onClick={onJoin}>
        Join Event
      </button>
    );
  }
  
  export default JoinUnjoinButton;
  