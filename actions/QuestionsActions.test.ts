// import action to mock
import { fetchQuestions, addQuestion } from "actions/QuestionsActions";
import configureMockStore from "redux-mock-store";
// import thunk middle to make our action asyncronous
import thunk from "redux-thunk";
import { API } from "services/apiary";

const middlewares = [thunk];
// create a mock store where we will dispatch our actions
const mockStore = configureMockStore(middlewares);
const store = mockStore();

const questions = [
  {
    question: "Question test 1 ",
    published_at: "2020-06-08T15:35:09.797525+00:00",
    url: "/questions/14",
    choices: [
      {
        choice: "choice 1",
        votes: 2,
        url: "/questions/14/choices/47",
      },
      {
        choice: "choice 2",
        votes: 0,
        url: "/questions/14/choices/46",
      },
    ],
  },
  {
    question: "Question test 2 ",
    published_at: "2020-06-08T15:35:09.797525+00:00",
    url: "/questions/14",
    choices: [
      {
        choice: "yes",
        votes: 2,
        url: "/questions/23/choices/12",
      },
      {
        choice: "no",
        votes: 0,
        url: "/questions/23/choices/13",
      },
    ],
  },
];
const newQuestion =
  '{"question": Question"' + '", "choices": [["Answer 1"," Answer 2"]]' + "}";

const error = new Error();

describe("testing fetchQuestions()", () => {
  // clear out all actions from mock store before running each test
  beforeEach(() => {
    store.clearActions();
  });

  it("should get all the questions with API call", () => {
    jest.spyOn(API, "getQuestions").mockReturnValue(Promise.resolve(questions));
    // store.dispatch : dispatches an action through the mock store
    return fetchQuestions()(store.dispatch).then(() => {
      let expectedActions = [
        {
          type: "FETCH_QUESTIONS_LOADING",
        },
        {
          type: "FETCH_QUESTIONS_SUCCESS",
          payload: questions,
        },
      ];
      // store.getActions : returns the actions of the mock store
      // check that the correct action type and payload are returned
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should return FETCH_QUESTIONS_FAILURE if the API call fails", () => {
    jest.spyOn(API, "getQuestions").mockRejectedValue(error);
    return fetchQuestions()(store.dispatch).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: "FETCH_QUESTIONS_LOADING",
        },
        { type: "FETCH_QUESTIONS_FAILURE", error: error },
      ]);
    });
  });
});

describe("testing addQuestion()", () => {
  // clear out all actions from mock store before running each test
  beforeEach(() => {
    store.clearActions();
  });

  it("should add a question", () => {
    jest.spyOn(API, "createQuestion").mockImplementation();
    return addQuestion(newQuestion)(store.dispatch).then(() => {
      expect(store.getActions()).toEqual([
        { type: "ADD_QUESTION" },
        { type: "ADD_QUESTION_SUCCESS" },
      ]);
    });
  });

  it("should return ADD_QUESTION_FAILURE if the question can't be added", () => {
    jest.spyOn(API, "createQuestion").mockRejectedValue(error);
    return addQuestion(newQuestion)(store.dispatch).then(() => {
      expect(store.getActions()).toEqual([
        { type: "ADD_QUESTION" },
        { type: "ADD_QUESTION_FAILURE", error: error },
      ]);
    });
  });
});
