import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useUserData } from "../context/UserContext";
import { usePoll } from "../hooks/usePoll";
import { PollData } from "../utils/Poll";

function Poll({ poll }) {
  const { eventId } = useParams();
  const { userData } = useUserData();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isUserVoted, vote, removeVote, removePoll] = usePoll(eventId, poll);
  const [changeVote, setChangeVote] = useState(false);
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

  async function handleRemovePoll(e) {
    e.preventDefault();
    await removePoll();
  }

  async function handleChangeVote(e) {
    e.preventDefault();
    await removeVote();
    setChangeVote(!changeVote);
  }

  async function handleRemoveVote(e) {
    e.preventDefault();
    await removeVote();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await vote(selectedOption);
  }

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
              disabled={isUserVoted && !changeVote}
            />
            {option.question_name}

            <p>
              {pollData.getVotesCountByOptionName(option.question_name)} /
              {pollData.totalVotes}
            </p>
          </label>
        ))}
        {isUserVoted && !changeVote ? (
          <button onClick={handleChangeVote}>Change Vote</button>
        ) : (
          <button type="submit">Vote</button>
        )}
        <button onClick={handleRemoveVote}>Remove vote</button>
        <button onClick={handleRemovePoll}>Remove Poll</button>
      </form>
    </>
  );
}
export default Poll;
