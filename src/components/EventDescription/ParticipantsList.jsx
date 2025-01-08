function ParticipantsList({event}){
    return(<div className="event-participants-list">
        <h2 className="event-participants-header">Participants</h2>
        <ul className="participants-list">
          {event.participants?.map((participant) => (
            <li className="participant" key={participant}>{participant}</li>
          ))}
        </ul>
      </div>);
}

export default ParticipantsList;
