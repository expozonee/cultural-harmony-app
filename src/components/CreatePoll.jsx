import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

function CreatePoll() {
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState("");
  const [isPollCreated, setIsPollCreated] = useState(false);

  const [poll, setPoll] = useState({});

  console.log(poll);

  const navigate = useNavigate();
  const { eventId } = useParams();

  function addOption(e) {
    e.preventDefault();
    // check if the option is an empty string or a duplicate
    if (!poll.options?.some((option) => option.option_name === currentOption)) {
      setPoll((prev) => {
        return {
          ...prev,
          options: prev.options
            ? [
                ...prev.options,
                {
                  question_name: currentOption,
                  votes_count: 0,
                  voted_users: [],
                },
              ]
            : [
                {
                  question_name: currentOption,
                  votes_count: 0,
                  voted_users: [],
                }, //+
              ],
        };
      });
    }
    setCurrentOption("");
  }

  async function createPoll(e) {
    e.preventDefault();

    if (!poll || poll.options.length < 2) {
      alert("You need a poll question and at least 2 options to create a poll");
      return;
    }

    try {
      const eventRef = doc(db, "events", eventId);

      await updateDoc(eventRef, {
        polls: arrayUnion(poll),
        // polls: [
        //   {
        //     question: "question",
        //     options: [
        //       {
        //         option_name: "",
        //         votes_count: 0,
        //         voted_users: [],
        //       },
        //     ],
        //   },
        // ],
        // poll: {
        //   question: pollQuestion,
        //   options: pollOptions,
        //   votes: {},
        // },
      });

      setIsPollCreated(true);
      alert("Your poll was created successfully!");
      navigate(`/events/${eventId}`);
    } catch (error) {
      console.error("Error while creating poll: ", error);
    }
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
              value={poll.question ?? ""}
              placeholder="Enter the poll question"
              onChange={(e) =>
                setPoll((prev) => {
                  return {
                    ...prev,
                    question: e.target.value,
                  };
                })
              }
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
