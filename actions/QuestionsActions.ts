import { ErrorAction, PayloadAction } from "actions/index";
import { Action } from "redux";
import { Question } from "screens/types";
import { API } from "services/apiary";

export type QuestionsActions =
  | Action<"FETCH_QUESTIONS_LOADING">
  | PayloadAction<"FETCH_QUESTIONS_SUCCESS", Question[]>
  | ErrorAction<"FETCH_QUESTIONS_FAILURE", string>
  | PayloadAction<"ADD_QUESTION_SUCCESS", Question>
  | ErrorAction<"ADD_QUESTION_FAILURE", string>
  | Action<"RESET">;

export function fetchQuestions() {
  return async (dispatch: (action: QuestionsActions) => void) => {
    try {
      dispatch({ type: "FETCH_QUESTIONS_LOADING" });
      const response = await API.getQuestions();
      dispatch({ type: "FETCH_QUESTIONS_SUCCESS", payload: response });
    } catch (e) {
      dispatch({ type: "FETCH_QUESTIONS_FAILURE", error: e });
    }
  };
}

export function addQuestion(params: string) {
  return async (dispatch: (action: QuestionsActions) => void) => {
    try {
      const newQuestion = await API.createQuestion(params);
      dispatch({ type: "ADD_QUESTION_SUCCESS", payload: newQuestion});
    } catch (error) {
      const err = error.data ? new Error(error.data.message) : error;
      dispatch({ type: "ADD_QUESTION_FAILURE", error: err });
    }
  };
}
