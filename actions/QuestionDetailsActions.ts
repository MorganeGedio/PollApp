import { ErrorAction, PayloadAction } from "actions/index";
import { Action } from "redux";
import { Question } from "screens/types";
import { getQuestion, voteChoice } from "services/apiary";

export type QuestionDetailsActions =
  | Action<"FETCH_QUESTION_DETAILS_LOADING">
  | PayloadAction<"FETCH_QUESTION_DETAILS_SUCCESS", Question>
  | ErrorAction<"FETCH_QUESTION_DETAILS_FAILURE", string>
  | Action<"VOTE_OPTION">;

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

export function voteForOption(url: string) {
  return async (dispatch: (action: QuestionDetailsActions) => void) => {
    dispatch({ type: "VOTE_OPTION" });
    await voteChoice(url);
    fetchQuestionDetails(url);
  };
}
