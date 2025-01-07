import { Link, Outlet } from "react-router";
import UserBanner from "../components/Admin/UserBanner";
import { useUser } from "@clerk/clerk-react";

export default function AdminLayout() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <article
        style={{
          maxWidth: "1000px",
          marginInline: "auto",
          display: "grid",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "5rem",
        }}
      >
        <h2>Sign in first to access the user dashboard</h2>
        <Link to={"/sign-in"}>
          <button>Sign In</button>
        </Link>
      </article>
    );
  }

  return (
    <div className="admin-layout">
      <UserBanner />
      <Outlet />
    </div>
  );
}
