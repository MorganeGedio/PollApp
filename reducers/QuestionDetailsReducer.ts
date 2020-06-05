import { QuestionDetailsActions } from "actions/QuestionDetailsActions";
import { Question } from "screens/types";

export interface QuestionDetailsState {
  question: Question;
  loading: boolean;
  voted: boolean;
}

const defaultState: QuestionDetailsState = {
  question: { question: "", choices: [], url: "", published_at: "" },
  loading: false,
  voted: false,
};

export default function questionDetailsState(
  state: QuestionDetailsState = defaultState,
  action: QuestionDetailsActions
): QuestionDetailsState {
  switch (action.type) {
    case "FETCH_QUESTION_DETAILS_LOADING":
      return {
        ...state,
        voted: false,
        loading: true,
      };
    case "FETCH_QUESTION_DETAILS_FAILURE":
      return {
        ...state,
        voted: false,
        loading: false,
      };
    case "FETCH_QUESTION_DETAILS_SUCCESS":
      return {
        ...state,
        loading: false,
        voted: false,
        question: action.payload,
      };
    case "VOTE_OPTION":
      return {
        ...state,
        loading: false,
        voted: true,
      };
    default:
      return state;
  }
}
