import { QuestionDetailsActions } from "actions/QuestionDetailsActions";
import { Question } from "screens/types";

export interface QuestionDetailsState {
  question: Question;
  loading: boolean;
}

const defaultState: QuestionDetailsState = {
  question: { question: "", choices: [], url: "", published_at: "" },
  loading: false,
};

export default function questionDetailsState(
  state: QuestionDetailsState = defaultState,
  action: QuestionDetailsActions
): QuestionDetailsState {
  switch (action.type) {
    case "FETCH_QUESTION_DETAILS_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_QUESTION_DETAILS_FAILURE":
      return {
        ...state,
        loading: false,
      };
    case "FETCH_QUESTION_DETAILS_SUCCESS":
      return {
        ...state,
        loading: false,
        question: action.payload,
      };
    default:
      return state;
  }
}
