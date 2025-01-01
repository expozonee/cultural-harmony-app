import UserList from "./UserList";
import { useUserData } from "../../context/UserContext";

export default function UsersList() {
  const { users } = useUserData();

  return (
    <table className="table-event">
      <thead>
        <tr>
          <th>Email</th>
          <th>Events Joined</th>
          <th>Events Organized</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <UserList key={index} data={user} />
        ))}
      </tbody>
    </table>
  );
}
