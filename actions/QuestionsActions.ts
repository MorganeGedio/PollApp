import { ErrorAction, PayloadAction } from "actions/index";
import { Action } from "redux";
import { Question } from "screens/types";
import { getQuestions } from "services/apiary";

export type QuestionsActions =
  | Action<"FETCH_QUESTIONS_LOADING">
  | PayloadAction<"FETCH_QUESTIONS_SUCCESS", Question[]>
  | ErrorAction<"FETCH_QUESTIONS_FAILURE", string>
  | Action<"ADD_QUESTION">

export function fetchQuestions() {
  return async (dispatch: (action: QuestionsActions) => void) => {
    try {
      dispatch({ type: "FETCH_QUESTIONS_LOADING" });
      const response = await getQuestions();
      dispatch({ type: "FETCH_QUESTIONS_SUCCESS", payload: response });
    } catch (e) {
      dispatch({ type: "FETCH_QUESTIONS_FAILURE", error: e });
    }
  };
}

export function addQuestion() {
  return (dispatch: (action: QuestionsActions) => void) => {
    dispatch({ type: "ADD_QUESTION" });

  };
}
