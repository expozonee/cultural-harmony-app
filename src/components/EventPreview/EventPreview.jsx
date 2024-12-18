export default function EventPreview({ event }) {
  return (
    <div>
      <img src={event.image} alt={event.title} />
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>{event.date}</p>
    </div>
  );
}