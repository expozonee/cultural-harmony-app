import EventList from "./EventList";
import { useLoaderData } from "react-router";

export default function EventsList() {
  const events = useLoaderData();

  return (
    <table className="table-event">
      <thead>
        <tr>
          <th>Event Title</th>
          <th>Location</th>
          <th>Date</th>
          <th>Host</th>
        </tr>
      </thead>
      {events.map((e, index) => {
        return <EventList key={index} {...e} />;
      })}
    </table>
  );
}
