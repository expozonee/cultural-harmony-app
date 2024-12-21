import DashboardEventsList from "../../components/Admin/Events/DashboardEventsList";
import DashboardButton from "../../components/Admin/DashboardButton";
import UsersList from "../../components/Users/UsersList";
import { useParams } from "react-router";
import UserJoinedEvents from "../../components/User/UserJoinedEvents/UserJoinedEvents";
import UserEventsCreated from "../../components/User/UserEventsCreated/UserEventsCreated";

const BUTTONS_TYPES = ["Events", "Users", "Events Joined", "Events Created"];

export default function AdminPage() {
  const { dashboard } = useParams();

  return (
    <div>
      <h2>Dashboard</h2>
      <hr />
      <div className="flex dashboard__buttons">
        {BUTTONS_TYPES.map((b) => {
          return (
            <DashboardButton
              key={b}
              name={b}
              isActive={b.toLowerCase() === dashboard}
            />
          );
        })}
      </div>
      <section>
        {dashboard === "events" && <DashboardEventsList />}
        {dashboard === "users" && <UsersList />}
        {dashboard === "events-joined" && <UserJoinedEvents />}
        {dashboard === "events-created" && <UserEventsCreated />}
      </section>
    </div>
  );
}
