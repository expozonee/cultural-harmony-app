import EventsList from "../../components/Events/EventsList";
import DashboardButton from "../../components/Admin/DashboardButton";
import UsersList from "../../components/Users/UsersList";

const BUTTONS_TYPES = ["Events", "Users"];

export default function AdminPage({ dashboard }) {
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
        {dashboard === "events" ? <EventsList /> : <UsersList />}
      </section>
    </div>
  );
}
