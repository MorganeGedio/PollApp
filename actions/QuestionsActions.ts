import { ErrorAction, PayloadAction } from "actions/index";
import { Action } from "redux";
import { Question } from "screens/types";
import { getQuestions, createQuestion } from "services/apiary";

export type QuestionsActions =
  | Action<"FETCH_QUESTIONS_LOADING">
  | PayloadAction<"FETCH_QUESTIONS_SUCCESS", Question[]>
  | ErrorAction<"FETCH_QUESTIONS_FAILURE", string>
  | Action<"ADD_QUESTION">
  | Action<"ADD_QUESTION_SUCCESS">
  | ErrorAction<"ADD_QUESTION_FAILURE", string>

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

export function addQuestion(params: string) {
  return async (dispatch: (action: QuestionsActions) => void) => {
    try {
       dispatch({ type: "ADD_QUESTION" });
       console.log("add question")
       await createQuestion(params);
       dispatch({ type: "ADD_QUESTION_SUCCESS" });
     } 
     catch (error) {
      dispatch({ type: "ADD_QUESTION_FAILURE", error: error });
    }
  };
};
