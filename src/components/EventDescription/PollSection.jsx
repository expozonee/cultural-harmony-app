import Poll from "../Poll";
function PollSection({ hasJoined, polls }) {
    return (
      <div className="event-card-polls">
        {hasJoined && polls ? (
          polls.map((poll, index) => {
            return <Poll key={index} poll={poll} />;
          })
        ) : (
          <p>No poll available for this event.</p>
        )}
      </div>
    );
  }
  
  export default PollSection;
  