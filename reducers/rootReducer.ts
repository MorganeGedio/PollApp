import questionsState, { QuestionsState } from "reducers/QuestionsReducer";
import questionDetailsState, { QuestionDetailsState } from "reducers/QuestionDetailsReducer";
import { combineReducers } from "redux";

export interface AppState {
  questionsState: QuestionsState
  questionDetailsState: QuestionDetailsState
}

export default combineReducers<AppState>({
  questionsState,
  questionDetailsState, 
});
