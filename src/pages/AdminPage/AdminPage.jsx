import DashboardEventsList from "../../components/Admin/Events/DashboardEventsList";
import DashboardButton from "../../components/Admin/DashboardButton";
import UsersList from "../../components/Users/UsersList";
import { useParams } from "react-router";
import UserJoinedEvents from "../../components/User/UserJoinedEvents/UserJoinedEvents";
import UserEventsCreated from "../../components/User/UserEventsCreated/UserEventsCreated";
import { useUser } from "@clerk/clerk-react";

const BUTTONS_TYPES = [
  { key: "events", label: "Events", adminOnly: true },
  { key: "users", label: "Users", adminOnly: true },
  { key: "events-joined", label: "Events Joined", adminOnly: false },
  { key: "events-created", label: "Events Created", adminOnly: false },
];

export default function AdminPage() {
  const { dashboard } = useParams();
  const user = useUser();
  const isAdmin = user.user?.publicMetadata?.role === "admin";

  const filteredButtons = BUTTONS_TYPES.filter((button) => {
    return isAdmin || !button.adminOnly;
  });

  return (
    <div>
      <h2>Dashboard</h2>
      <hr />
      <div className="flex dashboard__buttons">
        {filteredButtons.map((button) => (
          <DashboardButton
            key={button.key}
            name={button.label}
            isActive={button.key === dashboard}
          />
        ))}
      </div>
      <section>
        {isAdmin && dashboard === "events" && <DashboardEventsList />}
        {isAdmin && dashboard === "users" && <UsersList />}
        {dashboard === "events-joined" && <UserJoinedEvents />}
        {dashboard === "events-created" && <UserEventsCreated />}
      </section>
    </div>
  );
}
