import { useUser } from "@clerk/clerk-react";


export default function UserBanner() {
  const user = useUser();

  return (
    <div className="flex align-center justify-center">
      <img className="user-img" src={user.user?.imageUrl} alt="" />
      <section className="user-details">
        <h1 className="user-full-name">Hi, {user.user?.fullName}!</h1>
        <p className="user-email">{user.user?.emailAddresses[0].emailAddress}</p>
      </section>
    </div>
  );
}
