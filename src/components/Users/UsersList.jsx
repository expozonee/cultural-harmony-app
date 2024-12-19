import UserList from "./UserList";

const Users = [
  {
    id: 0,
    email: "example@example.com",
    joined: 2,
    Organized: 2,
  },
  {
    id: 1,
    email: "example@example.com",
    joined: 2,
    Organized: 2,
  },
  {
    id: 2,
    email: "example@example.com",
    joined: 3,
    Organized: 9,
  },
  {
    id: 3,
    email: "example@example.com",
    joined: 4,
    Organized: 3,
  },
  {
    id: 4,
    email: "example@example.com",
    joined: 8,
    Organized: 6,
  },
  {
    id: 5,
    email: "example@example.com",
    joined: 7,
    Organized: 3,
  },
];

export default function UsersList() {
  return (
    <table className="table-event" border="1">
      <thead>
        <tr>
          <th>Email</th>
          <th>Events Joined</th>
          <th>Events Organized</th>
        </tr>
      </thead>
      {Users.map((e, index) => {
        return <UserList key={index} data={e} />;
      })}
    </table>
  );
}
