import ContributionList from "../ContributionList";
function ContributionListSection({ eventId, event, hasJoined }) {
    return hasJoined ? (
      <div className="event-contribution-list">
        <ContributionList eventId={eventId} eventData={event} />
      </div>
    ) : null;
  }
  
  export default ContributionListSection;
  