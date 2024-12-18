export default function EventList({ data }) {
  return (
    <tbody>
      <tr>
        <td>{data.event_title}</td>
        <td>{data.location}</td>
        <td>{data.date}</td>
      </tr>
    </tbody>
  );
}
