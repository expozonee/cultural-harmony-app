export default function UserJoinedEventData({ data, index, onCheckboxChange }) {
  return (
    <tr>
      <td>
        <input type="checkbox" onChange={() => onCheckboxChange(index)} />
      </td>
      <td>{data.event_title}</td>
      <td>{data.location.city_name}</td>
      <td>{data.date}</td>
      <td>{data.event_host_name}</td>
    </tr>
  );
}
