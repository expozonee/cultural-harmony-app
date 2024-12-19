export default function DashboardEventsList({
  event_title,
  date,
  location,
  event_host_name,
}) {
  return (
    <tbody>
      <tr>
        <td>{event_title}</td>
        <td>{location.city_name}</td>
        <td>{date}</td>
        <td>{event_host_name}</td>
      </tr>
    </tbody>
  );
}
