export function PollData(poll) {
  this.getOptions = () => {
    return poll.options;
  };
  this.totalVotes = poll.options.reduce((total, option) => {
    return total + option.votes_count;
  }, 0);

  this.getVotesCountByOptionName = (optionName) => {
    return poll.options.find((option) => {
      return option.question_name === optionName;
    }).votes_count;
  };
}
