/* eslint-disable no-unused-vars */
import { useEvents } from "../context/EventsContext";
import { useUserData } from "../context/UserContext";
import { db } from "/src/firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export function usePoll(eventId, poll) {
  const { getEventById } = useEvents();
  const { userData } = useUserData();
  const evenRef = doc(db, "events", eventId);
  const isUserVoted = poll.options.some((option) =>
    option.voted_users.includes(userData.email)
  );

  async function vote(selectedOption) {
    if (!selectedOption) {
      alert("please answer the poll");
      return;
    }

    const { id, ...eventData } = await getEventById(eventId);

    const pollToUpdate = eventData.polls.find(
      (p) => p.question === poll.question
    );

    const votedOptionIndex =
      pollToUpdate.options.find((option, index) => {
        if (option.voted_users.includes(userData.email)) {
          return index;
        }
      }) ?? -1;

    const updatedPoll = {
      ...pollToUpdate,
      options: pollToUpdate.options.map((option, index) => {
        if (option.question_name !== selectedOption)
          return {
            ...option,
            votes_count:
              votedOptionIndex === index
                ? option.votes_count - 1
                : option.votes_count,
            voted_users:
              votedOptionIndex === index
                ? option.voted_users.filter(
                    (votedUsers) => votedUsers !== userData.email
                  )
                : option.voted_users,
          };
        return {
          ...option,
          votes_count: option.votes_count + 1,
          voted_users: [...option.voted_users, userData.email],
        };
      }),
    };

    const newPolls = eventData.polls.filter(
      (p) => p.question !== poll.question
    );

    newPolls.push(updatedPoll);

    const updatedEventData = {
      ...eventData,
      polls: newPolls,
    };

    await updateDoc(evenRef, updatedEventData);
  }

  async function removeVote() {
    const { id, ...eventData } = await getEventById(eventId);

    const pollToUpdate = eventData.polls.find(
      (p) => p.question === poll.question
    );

    console.log(pollToUpdate);

    const updatedPoll = {
      ...pollToUpdate,
      options: pollToUpdate.options.map((option) => {
        if (!option.voted_users.includes(userData.email)) return option;
        return {
          ...option,
          votes_count: option.votes_count - 1,
          voted_users: option.voted_users.filter(
            (votedUsers) => votedUsers !== userData.email
          ),
        };
      }),
    };

    const newPolls = eventData.polls.filter(
      (p) => p.question !== poll.question
    );

    newPolls.push(updatedPoll);

    const updatedEventData = {
      ...eventData,
      polls: newPolls,
    };

    await updateDoc(evenRef, updatedEventData);
  }

  async function removePoll() {
    const { id, ...eventData } = await getEventById(eventId);

    const updatedEventData = {
      ...eventData,
      polls: eventData.polls.filter((p) => p.question !== poll.question),
    };

    await updateDoc(evenRef, updatedEventData);
  }

  return [isUserVoted, vote, removeVote, removePoll];
}
