import { useState } from 'react';
import { useParams } from 'react-router';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase/firebaseConfig";
import { Trash2 } from 'lucide-react';

function CreatePoll({ onClose }) {
  const [poll, setPoll] = useState({
    question: '',
    options: []
  });
  const [currentOption, setCurrentOption] = useState('');
  const { eventId } = useParams();

  function addOption(e) {
    e.preventDefault();
    if (!currentOption.trim()) return;

    if (!poll.options?.some(option =>
      option.question_name.toLowerCase() === currentOption.toLowerCase()
    )) {
      setPoll(prev => ({
        ...prev,
        options: [
          ...prev.options,
          {
            question_name: currentOption,
            votes_count: 0,
            voted_users: []
          }
        ]
      }));
    }
    setCurrentOption('');
  }

  function removeOption(index) {
    setPoll(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  }

  async function createPoll(e) {
    e.preventDefault();

    if (!poll.question?.trim()) {
      alert('Please enter a poll question');
      return;
    }

    if (!poll.options || poll.options.length < 2) {
      alert('You need at least 2 options to create a poll');
      return;
    }

    try {
      const eventRef = doc(db, 'events', eventId);
      onClose(); 
      await updateDoc(eventRef, {
        polls: arrayUnion(poll)
      })
      alert('Your poll was created successfully!');
    } catch (error) {
      console.error('Error while creating poll:', error);
      alert('Failed to create poll. Please try again.');
    }
  }

  return (
    <div className="create-poll-cmp">
      <h3>Create Your Poll</h3>
      <form>
        <div>
          <label>
            <span>Poll Question</span>
            <input
              type="text"
              value={poll.question ?? ''}
              placeholder="Enter the poll question"
              onChange={e => setPoll(prev => ({
                ...prev,
                question: e.target.value
              }))}
            />
          </label>
        </div>

        <div>
          <label>
            <span>Add Option</span>
            <div className="option-input-group">
              <input
                type="text"
                value={currentOption}
                placeholder="Enter option for answer"
                onChange={e => setCurrentOption(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && addOption(e)}
              />
              <button className="add-button" onClick={addOption}>Add Option</button>
            </div>
          </label>
        </div>

        {poll.options.length > 0 && (
          <div>
            <h4>Poll Options</h4>
            <ul className="options-list">
              {poll.options.map((option, index) => (
                <li key={index} className="option-item">
                  <span>{option.question_name}</span>
                  <div className="option-actions">
                    <button
                      onClick={() => removeOption(index)}
                      className="delete-button"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="poll-actions-buttons">
          <button className="create-poll-button" onClick={createPoll}>Create Poll</button>
          <button className="close-poll-button" onClick={onClose}>Close</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePoll;
