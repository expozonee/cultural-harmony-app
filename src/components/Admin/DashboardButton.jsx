import { Link } from "react-router";

export default function DashboardButton({ name, onClick, isActive }) {
  return (
    <Link to={`/admin/${name.toLowerCase()}`}>
      <button style={{ color: `${isActive ? "red" : ""}` }} onClick={onClick}>
        {name}
      </button>
    </Link>
  );
}
