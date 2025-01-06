import { useUser } from "@clerk/clerk-react";
import "./userBanner.css"

export default function UserBanner() {
  const user = useUser();

  return (
    <div className="flex align-center justify-center">
      <img className="user-img" src={user.user?.imageUrl} alt="" />
      <section className="user-details">
        <h1>Hi, {user.user?.fullName}!</h1>
        <p>{user.user?.emailAddresses[0].emailAddress}</p>
      </section>
    </div>
  );
}
