import { useState } from "react";

function Poll({ poll }) {
  const [selectedOption, setSelectedOption] = useState(null);

  function handleOptionSelection(e) {
    setSelectedOption(e.target.value);
  }

  function handleSubmission(e) {
    e.preventDefault();
    // alert if the user didn't vote in the poll - encourage their engagement
    if (!selectedOption) {
      alert("please answer the poll");
      return;
    }
    // increase the number of votes for this specific option by 1
    poll.voted[selectedOption] = (poll.votes[selectedOption] || 0) + 1;
  }

  return (
    <>
      <h3>{poll.question}</h3>
      <form action="submit" onSubmit={handleSubmission}>
        {poll.options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionSelection}
            />
            {option}
          </label>
        ))}
        <button type="submit">Vote!</button>
      </form>
    </>
  );
}
export default Poll;
