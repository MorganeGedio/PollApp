// import action to mock
import { fetchQuestions, addQuestion } from "actions/QuestionsActions";
import configureMockStore from "redux-mock-store";
// import thunk middle to make our action asyncronous
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const middlewares = [thunk];
// create a mock store where we will dispatch our actions
const mockStore = configureMockStore(middlewares);
const store = mockStore();

// creates a mock instance from the MockAdapter of axios - mock axios call
const mockApi = new MockAdapter(axios);
const URL = "/questions";

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

const newQuestion = "";

describe("testing fetchQuestions()", () => {
  // clear out all actions from mock store before running each test
  beforeEach(() => {
    store.clearActions();
  });

  it("should get all the questions with API call", () => {
    // Mock any GET request to "/questions"
    // arguments for reply are (status, data, headers)
    mockApi.onGet(URL).reply(200, { data: questions });
    // store.dispatch : dispatches an action through the mock store
    fetchQuestions()(store.dispatch).then(() => {
      // store.getActions : returns the actions of the mock store
      // check that the correct action type and payload are returned
      let expectedActions = [
        {
          type: "FETCH_QUESTIONS_SUCCESS",
          payload: questions,
        },
      ];
      return expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should return FETCH_QUESTIONS_FAILURE if the API call fails", () => {
    mockApi.onGet(URL).reply(500);
    fetchQuestions()(store.dispatch).then(() => {
      return expect(store.getActions()).toEqual([
        { type: "FETCH_QUESTIONS_FAILURE" },
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
    mockApi.onPost(URL).reply(201);
    addQuestion(newQuestion)(store.dispatch).then(() => {
      return expect(store.getActions()).toEqual([
        { type: "ADD_QUESTION_SUCCESS" },
      ]);
    });
  });

  it("should return ADD_QUESTION_FAILURE if the question can't be added", () => {
    mockApi.onPost(URL).reply(400);
    addQuestion(newQuestion)(store.dispatch).then(() => {
      return expect(store.getActions()).toEqual([
        { type: "ADD_QUESTION_FAILURE" },
      ]);
    });
  });
});
