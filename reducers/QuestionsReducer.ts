import { QuestionsActions } from "actions/QuestionsActions";
import { Question, Choice } from "screens/types";

export type RequestStatus = 'DEFAULT' | 'LOADING' | 'ERROR' | 'SUCCESS';

export interface QuestionsState {
  questions: Question[];
  loading: boolean;
  choices: Choice[]; 
  request: RequestStatus;
}

const defaultState: QuestionsState = {
  questions: [],
  loading: false, 
  choices: [], 
  request: 'DEFAULT'
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
    case "ADD_QUESTION":
      return {
        ...state
      };
    case "ADD_QUESTION_SUCCESS":
      return {
        ...state, 
        request: 'SUCCESS'
      };
    case "ADD_QUESTION_FAILURE":
      return {
        ...state, 
        request: 'ERROR'
      };
    default:
      return state;
  }
}
