import EventPreview from "../EventPreview";
import { useLoaderData } from "react-router";

export default function FeaturedEvents() {
  const events = useLoaderData();

  return (
    <section className="featured-events">
      <h2 className="featured-events-title">Featured Events</h2>
      <ul className="events-list-home">
        {events.map((event) => (
          <li className="event-preview" key={event.id}>
            <EventPreview event={event} />
          </li>
        ))}
      </ul>
    </section>
  );
}
