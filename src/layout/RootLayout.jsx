import { Outlet } from "react-router";
import NavBar from "../components/NavBar/NavBar";
// import { useUser } from "@clerk/clerk-react";
// import { useEffect } from "react";
// import { getUsers } from "../firebase/utils/getUsers";
// import { addUserToDb } from "../firebase/utils/addUserToDb";

export function RootLayout() {
  // const { isSignedIn, user } = useUser();

  // useEffect(() => {
  //   if (!isSignedIn) return;

  //   async function handleSignedInUser() {
  //     const users = await getUsers();
  //     const userEmailAddress = user.primaryEmailAddress.emailAddress;
  //     const isUserInDb = users.find((u) => u.email === userEmailAddress);

  //     if (!isUserInDb) {
  //       const userToAdd = {
  //         email: userEmailAddress,
  //         profileImage: user.imageUrl,
  //         eventsJoined: [],
  //         eventsOrganized: [],
  //         isAdmin: false,
  //         name: user.fullName,
  //       };

  //       const result = await addUserToDb(userToAdd);
  //       console.log(result);
  //     }
  //   }
  //   handleSignedInUser();
  // }, [user, isSignedIn]);

  return (
    <>
      <NavBar />
      <section className="flex justify-center">
        <Outlet />
      </section>
    </>
  );
}
