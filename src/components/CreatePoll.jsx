import { useState } from "react";

function CreatePoll() {
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState("");
  const [isPollCreated, setIsPollCreated] = useState(false);

  //   function handleQuestion(e) {
  //     // set the poll's question
  //     e.preventDefault();
  //     setPollQuestion(e.target.value);
  //   }

  //   function handlePollOptions(e) {
  //     e.preventDefault();
  //     console.log("current option: ", currentOption);
  //     setCurrentOption(e.target.value);
  //   }

  function addOption() {
    // check if the option is an empty string or a duplicate
    if (!pollOptions.includes(currentOption)) {
      setPollOptions((prevOptions) => [...prevOptions, currentOption]);
    }
    setCurrentOption("");
  }

  function createPoll(e) {
    e.preventDefault();

    if (!pollQuestion || pollOptions.length < 2) {
      alert("Can't create a poll without a question or less than 2 options");
      return;
    }
    setIsPollCreated(true);
    alert("Poll created successfully!");
  }

  return (
    <>
      <div className="create-poll-cmp">
        <h3>Add a Poll</h3>
        <form action="submit"></form>
        <label htmlFor="">
          <input
            type="text"
            value={pollQuestion}
            placeholder="Enter poll question"
            onChange={(e) => setPollQuestion(e.target.value)}
          />
        </label>

        <div>
          <label htmlFor="">
            <input
              type="text"
              value={currentOption}
              placeholder="Enter option for answer"
              onChange={(e) => setCurrentOption(e.target.value)}
            />
            <button onClick={addOption}>Add Option</button>
          </label>
        </div>

        <ul>
          {pollOptions.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>

        <button onClick={createPoll}>Create Poll</button>
      </div>
    </>
  );
}
export default CreatePoll;
