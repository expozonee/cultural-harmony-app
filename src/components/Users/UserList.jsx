export default function UserList({ data }) {
  return (
    <tr>
      <td>{data.email}</td>
      <td>{data.eventsJoined.length}</td>
      <td>{data.eventsOrganized.length}</td>
    </tr>
  );
}
