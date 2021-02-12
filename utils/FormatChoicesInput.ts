export const formatChoicesInput = (choicesInput: string) => {
  let choices = choicesInput.split(",");
  return JSON.stringify(choices);
};
