import { useState, useEffect } from "react";
import { useParams } from "react-router";
// import { db } from "../firebase/firebaseConfig";
// import { doc, updateDoc } from "firebase/firestore";
// import { useEvents } from "../context/EventsContext";
import { useUserData } from "../context/UserContext";
import { usePoll } from "../hooks/usePoll";
import { PollData } from "../utils/Poll";

function Poll({ poll }) {
  const { eventId } = useParams();
  // const { getEventById } = useEvents();
  const { userData } = useUserData();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isUserVoted, vote, removeVote] = usePoll(eventId, poll);
  const pollData = new PollData(poll);

  useEffect(() => {
    const alreadyVotedOption = poll.options.find((option) =>
      option.voted_users.includes(userData.email)
    );
    if (alreadyVotedOption) {
      setSelectedOption(alreadyVotedOption.question_name);
    }
  }, [poll.options, userData.email]);

  function handleOptionSelection(e) {
    setSelectedOption(e.target.value);
  }

  // async function handleSubmission(e) {
  //   e.preventDefault();
  //   // alert if the user didn't vote in the poll - encourage their engagement
  //   if (!selectedOption) {
  //     alert("please answer the poll");
  //     return;
  //   }
  //   // increase the number of votes for this specific option by 1
  //   // poll.voted[selectedOption] = (poll.votes[selectedOption] || 0) + 1;

  //   const evenRef = doc(db, "events", eventId);
  //   console.log(evenRef);

  //   const { id, ...eventData } = await getEventById(eventId);

  //   const pollToUpdate = eventData.polls.find(
  //     (p) => p.question === poll.question
  //   );
  //   const updatedPoll = {
  //     ...pollToUpdate,
  //     options: pollToUpdate.options.map((option) => {
  //       if (option.question_name !== selectedOption) return option;
  //       return {
  //         ...option,
  //         votes_count: option.votes_count + 1,
  //         voted_users: [...option.voted_users, userData.email],
  //       };
  //     }),
  //   };

  //   const newPolls = eventData.polls.filter(
  //     (p) => p.question !== poll.question
  //   );

  //   newPolls.push(updatedPoll);

  //   console.log(newPolls);

  //   const updatedEventData = {
  //     ...eventData,
  //     polls: newPolls,
  //   };

  //   await updateDoc(evenRef, updatedEventData);
  // }

  async function handleRemoveVote(e) {
    e.preventDefault();
    await removeVote();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await vote(selectedOption);
  }

  console.log(pollData.totalVotes);

  return (
    <>
      <h3>{poll.question}</h3>
      <form action="submit" onSubmit={handleSubmit}>
        {poll.options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              value={option.question_name}
              checked={selectedOption === option.question_name}
              onChange={handleOptionSelection}
            />
            {option.question_name}
          </label>
        ))}
        <button type="submit">{isUserVoted ? "Update Vote" : "Vote!"}</button>
        <button onClick={handleRemoveVote}>Remove vote</button>
      </form>
    </>
  );
}
export default Poll;
