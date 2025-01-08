import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useUserData } from "../../context/UserContext";
import { usePoll } from "../../hooks/usePoll";
import { PollData } from "../../utils/Poll";

function Poll({ poll }) {
  const { eventId } = useParams();
  const { userData } = useUserData();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isUserVoted, vote, removeVote, removePoll] = usePoll(eventId, poll);
  const [canChangeVote, setCanChangeVote] = useState(false);
  const pollData = new PollData(poll);

  useEffect(() => {
    const alreadyVotedOption = poll.options.find((option) =>
      option.voted_users.includes(userData.email)
    );
    if (alreadyVotedOption) {
      setSelectedOption(alreadyVotedOption.question_name);
    }
  }, [poll.options, userData.email]);

  function handleOptionSelection(option) {
    if (!isUserVoted) {
      setSelectedOption(option);
      vote(option);  
    }
  }

  async function handleChangeVote(e) {
    e.preventDefault();
    await removeVote();
    setSelectedOption(null);
    setCanChangeVote(true);
  }

  async function handleRemoveVote(e) {
    e.preventDefault();
    await removeVote();
    setSelectedOption(null);
  }

  async function handleRemovePoll(e) {
    e.preventDefault();
    await removePoll();
  }

  return (
    <div className="poll-container">
      <h3 className="poll-question">{poll.question}</h3>
      <div className="poll-form">
        {poll.options.map((option, index) => {
          const votePercentage = pollData.totalVotes > 0
            ? (pollData.getVotesCountByOptionName(option.question_name) / pollData.totalVotes) * 100
            : 0;

          const isSelected = selectedOption === option.question_name;

          return (
            <div
              key={index}
              className={`poll-option-label ${isSelected ? 'selected' : ''}`}
              onClick={() => handleOptionSelection(option.question_name)}
              style={{
                cursor: isUserVoted && !canChangeVote ? 'not-allowed' : 'pointer',
                backgroundColor: isSelected ? 'lightblue' : ''
              }}
            >
              <p className="poll-answer">{option.question_name}</p>
              <p className="poll-vote-count">
                {votePercentage.toFixed(2)}% 
              </p>
            </div>
          );
        })}
      </div>

      <div className="poll-buttons">
        {isUserVoted && !canChangeVote ? (
          <button className="poll-button" onClick={handleChangeVote}>
            Change Vote
          </button>
        ) : null}

        {isUserVoted && (
          <button className="poll-button" onClick={handleRemoveVote}>
            Remove Vote
          </button>
        )}

        <button className="poll-button-remove" onClick={handleRemovePoll}>
          Remove Poll
        </button>
      </div>
    </div>
  );
}

export default Poll;
