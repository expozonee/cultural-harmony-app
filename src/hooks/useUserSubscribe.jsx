import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { db } from "../firebase/firebaseConfig";
import { getUsers } from "../firebase/utils/getUsers";
import { addUserToDb } from "../firebase/utils/addUserToDb";
import { collection, doc, onSnapshot } from "firebase/firestore";

export function useUserSubscribe() {
  const [userId, setUserId] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [userRef, setUserRef] = useState(undefined);
  const [users, setUsers] = useState([]);
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    async function handleUserSubscription() {
      if (!isSignedIn || !user) {
        setUserId(undefined);
        setUserRef(undefined);
        return;
      }

      const userEmailAddress = user.primaryEmailAddress.emailAddress;
      const userId = (await getUsers()).find(
        (u) => u.email === userEmailAddress
      )?.id;

      try {
        if (!userId) {
          const userToAdd = {
            email: userEmailAddress,
            profileImage: user.imageUrl,
            eventsJoined: [],
            eventsOrganized: [],
            isAdmin: false,
            name: user.fullName,
          };

          // Add user to Firestore with setDoc
          const [userRef, userId] = await addUserToDb(userToAdd);
          setUserId(userId);
          setUserRef(userRef);
        } else {
          const userDocRef = doc(db, "users", userId);
          setUserId(userId);
          setUserRef(userDocRef);
        }
      } catch (error) {
        console.error("Error handling user subscription:", error);
      }
    }

    handleUserSubscription();
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
