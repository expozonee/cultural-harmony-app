import { useState } from "react";

function Poll() {
  const [pollQuestion, setPollQuestion] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [votes, setVotes] = useState({
    option1: 0,
    option2: 0,
    option3: 0,
  });

  function handleOptionSelection(e) {
    setSelectedOption(e.target.value);
  }

  function handleQuestion(e) {
    // set the poll's question
    setPollQuestion(e.target.value);
  }

  function handleSubmission(e) {
    e.preventDefault();
    // alert if the user didn't vote in the poll - encourage their engagement
    if (!selectedOption) {
      alert("Help the event organizer - please answer the poll");
    } else {
      // increase the number of votes for this specific option by 1
      setVotes((prevVotes) => ({
        ...prevVotes,
        [selectedOption]: prevVotes[selectedOption] + 1,
      }));
    }
  }

  return (
    <>
      <h2>Add Poll</h2>
      <form action="submit" onSubmit={handleSubmission}>
        <label htmlFor="">
          <input
            type="text"
            value={pollQuestion}
            placeholder="Type your poll question"
            onChange={handleQuestion}
          />
        </label>

        <label htmlFor={option1}>
          <input
            type="radio"
            value={option1}
            checked={selectedOption === option1}
            onChange={handleOptionSelection}
          />
          {option1}
        </label>

        <label htmlFor={option2}>
          <input
            type="radio"
            value={option2}
            checked={selectedOption === option2}
            onChange={handleOptionSelection}
          />
          {option2}
        </label>

        <label htmlFor={option3}>
          <input
            type="radio"
            value={option3}
            checked={selectedOption === option3}
            onChange={handleOptionSelection}
          />
          {option3}
        </label>
      </form>
    </>
  );
}
export default Poll;
