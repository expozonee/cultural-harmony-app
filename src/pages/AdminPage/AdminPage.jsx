import { useState } from "react";
import { useSearchParams } from "react-router";
import UsersList from "../../components/Admin/UsersList";
import EventsList from "../../components/Admin/EventsList";
import DashboardButton from "../../components/Admin/DashboardButton";

const BUTTONS_TYPES = ["Events", "Users"];

export default function AdminPage() {
  const [params] = useSearchParams();
  const dashboardParams = params.get("dashboard");

  const [dashboardSection, setDashboardSection] = useState(
    dashboardParams ?? "events"
  );

  return (
    <div>
      <h2>Dashboard</h2>
      <hr />
      <div className="flex dashboard__buttons">
        {BUTTONS_TYPES.map((b, index) => {
          return (
            <DashboardButton
              key={index}
              name={b}
              onClick={() => {
                setDashboardSection(b.toLowerCase());
              }}
              isActive={b.toLowerCase() === dashboardSection}
            />
          );
        })}
      </div>
      <section>
        {dashboardSection === "events" ? <EventsList /> : <UsersList />}
      </section>
    </div>
  );
}
