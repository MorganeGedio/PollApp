export const totalVotes = (choices: string | any[]) => {
  let sum = 0;
  for (let i = 0; i < choices.length; i++) {
    sum += choices[i].votes;
  }
  return sum;
};
