import { useState } from "react";
import { useNavigate, useParams } from "react-router";

function CreatePoll() {
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState("");
  const [isPollCreated, setIsPollCreated] = useState(false);

  const navigate = useNavigate();
  const { eventId } = useParams();

  function addOption(e) {
    e.preventDefault();
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
    navigate(`/events/${eventId}`);
  }

  return (
    <>
      <div className="create-poll-cmp">
        <h3>Create Your Poll</h3>
        <form>
          <label htmlFor="pollQuestion">
            <span>Your question: </span>
            <input
              type="text"
              value={pollQuestion}
              placeholder="Enter the poll question"
              onChange={(e) => setPollQuestion(e.target.value)}
            />
          </label>

          <div>
            <label htmlFor="pollOptions">
              <span>Enter optional response: </span>
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
        </form>
      </div>
    </>
  );
}
export default CreatePoll;
