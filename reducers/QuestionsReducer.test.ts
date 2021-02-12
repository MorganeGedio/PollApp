import { QuestionsActions } from "actions/QuestionsActions";
import questionsState, { QuestionsState } from "reducers/QuestionsReducer";

const defaultState: QuestionsState = {
  questions: [],
  loading: false,
  choices: [],
  request: "DEFAULT",
};

const questions: never[] = [];

describe("QuestionsReducer", () => {
  it("should return an initial state", () => {
    expect(questionsState(undefined, {} as QuestionsActions)).toEqual(
      defaultState
    );
  });

  it("should change the loading state based on the API request status", () => {
    expect(
      questionsState(defaultState, { type: "FETCH_QUESTIONS_LOADING" })
    ).toEqual({
      ...defaultState,
      loading: true,
    });
    expect(
      questionsState(defaultState, {
        type: "FETCH_QUESTIONS_SUCCESS",
        payload: questions,
      })
    ).toEqual({
      ...defaultState,
      loading: false,
      questions: questions,
    });

    const error = "Error";
    expect(
      questionsState(defaultState, { type: "FETCH_QUESTIONS_FAILURE", error })
    ).toEqual({
      ...defaultState,
      loading: false,
    });
  });

  it("should change the request status depending on the API call", () => {
    expect(
      questionsState(defaultState, {
        type: "ADD_QUESTION_SUCCESS",
      })
    ).toEqual({
      ...defaultState,
      request: "SUCCESS",
    });

    const error = "Error";
    expect(
      questionsState(defaultState, {
        type: "ADD_QUESTION_FAILURE",
        error,
      })
    ).toEqual({
      ...defaultState,
      request: "ERROR",
    });
    expect(
      questionsState(defaultState, {
        type: "ADD_QUESTION_RESET",
      })
    ).toEqual({
      ...defaultState,
      request: "DEFAULT",
    });
  });
});
