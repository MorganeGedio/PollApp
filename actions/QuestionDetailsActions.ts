import { ErrorAction, PayloadAction } from "actions/index";
import { Action } from "redux";
import { Question } from "screens/types";
import { getQuestion } from "services/apiary";

export type QuestionDetailsActions = 
  Action<"FETCH_QUESTION_DETAILS_LOADING">
  | PayloadAction<"FETCH_QUESTION_DETAILS_SUCCESS", Question>
  | ErrorAction<"FETCH_QUESTION_DETAILS_FAILURE", string>

export function fetchQuestionDetails(url: string) {
    return async (dispatch: (action: QuestionDetailsActions) => void) => {
      try {
        dispatch({ type: "FETCH_QUESTION_DETAILS_LOADING" });
        const response = await getQuestion(url);
        dispatch({ type: "FETCH_QUESTION_DETAILS_SUCCESS", payload: response });
      } catch (e) {
        dispatch({ type: "FETCH_QUESTION_DETAILS_FAILURE", error: e });
      }
    };
  }