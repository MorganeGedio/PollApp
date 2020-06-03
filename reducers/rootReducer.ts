import questionsState, { QuestionsState } from "reducers/QuestionsReducer";
import { combineReducers } from "redux";

export interface AppState {
  questionsState: QuestionsState;
}

export default combineReducers<AppState>({
  questionsState,
});
