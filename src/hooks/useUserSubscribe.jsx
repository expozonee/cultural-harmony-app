import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { getUsers } from "../firebase/utils/getUsers";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { addUserToDb } from "../firebase/utils/addUserToDb";

export function useUserSubscribe() {
  const [userId, setUserId] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [userRef, setUserRef] = useState(undefined);
  const [users, setUsers] = useState([]);
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    async function addNewUsersToDb() {
      if (!isSignedIn) return;

      const users = await getUsers();
      const userEmailAddress = user.primaryEmailAddress.emailAddress;
      const isUserInDb = users.find((u) => u.email === userEmailAddress);

      if (!isUserInDb) {
        const userToAdd = {
          email: userEmailAddress,
          profileImage: user.imageUrl,
          eventsJoined: [],
          eventsOrganized: [],
          isAdmin: false,
          name: user.fullName,
        };
        await addUserToDb(userToAdd);
      }
    }

    addNewUsersToDb();
  }, [isSignedIn, user]);

  useEffect(() => {
    if (!isSignedIn || !user) {
      setUserData(undefined);
      return;
    }

    const userEmailAddress = user.primaryEmailAddress.emailAddress;

    async function getUserId() {
      const users = await getUsers();
      setUsers(users);
      const userId = users.find((u) => u.email === userEmailAddress)?.id;

      setUserId(userId);
      setUserRef(doc(db, "users", userId));
    }

    getUserId();
  }, [isSignedIn, user]);

  useEffect(() => {
    if (!userId) {
      setUserData(undefined);
      return;
    }

    const usersRef = collection(db, "users");

    const unSubscribeUsers = onSnapshot(usersRef, (snapshot) => {
      if (snapshot.docs) {
        setUsers(
          snapshot.docs.map((e) => {
            return {
              ...e.data(),
              id: e.id,
            };
          })
        );
      }
    });

    const unSubscribe = onSnapshot(userRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.data());
      } else {
        throw new Error("User does not exist!");
      }
    });

    return () => {
      unSubscribe();
      unSubscribeUsers();
    };
  }, [userId, userRef]);

  return [userId, userData, userRef, users];
}
