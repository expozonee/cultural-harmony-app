export default function UserList({ data }) {
  return (
    <tbody>
      <tr>
        <td>{data.email}</td>
        <td>{data.joined}</td>
        <td>{data.Organized}</td>
      </tr>
    </tbody>
  );
}
