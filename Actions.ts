import {
  GET_QUESTIONS,
  ADD_QUESTION,
  HAS_VOTED,
  GET_DETAILS,
  ADD_CHOICES
} from "constants/ActionTypes";
import { Question } from "screens/types";

const getQuestions = (questions: Question[]) => ({
  type: GET_QUESTIONS,
  data: questions,
});

const getDetails = (details: Question) => ({
  type: GET_DETAILS,
  data: details
});

function hasVoted(bool: boolean) {
    return {
        type: HAS_VOTED,
        hasvoted: bool
    };
}

// const addVote = () => ({
//   type: ADD_VOTE,
// });

const addQuestion = () => ({
    type: ADD_QUESTION,
});

const addChoices = () => ({
    type: ADD_CHOICES,
});

const actionCreators = {
  getQuestions,
  addQuestion,
  hasVoted,
  getDetails,
  addChoices
};

export { actionCreators };
