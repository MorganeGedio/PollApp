import { QuestionsActions } from "actions/QuestionsActions";
import questionsState, { QuestionsState } from "reducers/QuestionsReducer";


describe("QuestionReducer", () => {
  const defaultState: QuestionsState = {
    questions: [],
    loading: false,
    choices: [],
    request: "DEFAULT",
  };

  it("should return an initial state", () => {
    expect(questionsState(undefined, {} as QuestionsActions)).toEqual(
      defaultState
    );
  });

  it("should handle ADD_QUESTION_SUCCESS", () => {
    expect(
      questionsState(defaultState, {
        type: "ADD_QUESTION_SUCCESS",
      })
    ).toEqual({
      ...defaultState,
      request: "SUCCESS",
    });
  });
});
