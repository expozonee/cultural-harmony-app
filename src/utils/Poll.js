export function PollData(poll) {
  this.getOptions = () => {
    return poll.options;
  };
  this.totalVotes = poll.options.reduce((total, option) => {
    return total + option.votes_count;
  }, 0);

  this.optionsTotalVotes = () => {
    return poll.options.map((option) => {
      return {
        optionName: option.question_name,
        votesCount: option.votes_count,
      };
    });
  };
}
