import { QuestionsActions } from "actions/QuestionsActions";
import { Question } from "screens/types";

export interface QuestionsState {
  questions: Question[];
  loading: boolean;
}

const defaultState: QuestionsState = {
  questions: [],
  loading: false,
};

export default function questionsState(
  state: QuestionsState = defaultState,
  action: QuestionsActions
): QuestionsState {
  switch (action.type) {
    case "FETCH_QUESTIONS_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_QUESTIONS_FAILURE":
      return {
        ...state,
        loading: false,
      };
    case "FETCH_QUESTIONS_SUCCESS":
      return {
        ...state,
        loading: false,
        questions: action.payload,
      };
    default:
      return state;
  }
}
