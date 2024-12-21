import EventPreview from "../EventPreview";
import { useLoaderData } from "react-router";

export default function FeaturedEvents() {
    const events = useLoaderData();
    console.log("upcomingEvents: ", events);

    
    return (
        <section className="featured-events">
            <h2 className="featured-events-title">Featured Events</h2>
            <ul className="events-list">
                {events.map((event) => (
                    <li className="event-preview" key={event.id}>
                        <div>
                            <EventPreview event={event} />
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );


}