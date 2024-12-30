import { Link } from "react-router-dom";
export default function UserCreatedEventData({
  data,
  index,
  onCheckboxChange,
}) {
  return (
    <tr>
      <td>
        <input type="checkbox" onClick={() => onCheckboxChange(index)} />
      </td>
      <td>{data.event_title}</td>
      <td>{data.location.city_name}</td>
      <td>{data.date}</td>
      <td>{data.event_host_name}</td>
      <td>
        <Link to={`/events/${data.id}/update-event?from=dashboard`}>
          <button>Update</button>
        </Link>
      </td>
    </tr>
  );
}
