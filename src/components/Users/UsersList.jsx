import { useEffect, useState } from "react";
import { getUsers } from "../../firebase/utils/getUsers";
import UserList from "./UserList";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await getUsers();
      console.log(fetchedUsers);

      setUsers(fetchedUsers);
    }

    fetchUsers();
  }, []);

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
