import { Link } from "react-router";

export default function DashboardButton({ name, onClick, isActive }) {
  return (
    <Link
      to={`/admin/${
        name.includes(" ")
          ? name.replace(" ", "-").toLowerCase()
          : name.toLowerCase()
      }`}
    >
      <button style={{ backgroundColor: `${isActive ? "var(--medium-purple)" : ""}`  , color: `${isActive ? "var(--lavender-light)" : ""}`}  } onClick={onClick}>
        {name}
      </button>
    </Link>
  );
}
