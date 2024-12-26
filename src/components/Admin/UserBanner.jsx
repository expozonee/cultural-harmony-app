import { useUser } from "@clerk/clerk-react";

export default function UserBanner() {
  const user = useUser();
  console.log(user);

  return (
    <div className="flex align-center justify-center">
      <img className="user-img" src={user.user.imageUrl} alt="" />
      <section className="user-details">
        <h1>Hello, {user.user?.fullName}!</h1>
        <p>{user.user?.emailAddresses[0].emailAddress}</p>
      </section>
    </div>
  );
}
