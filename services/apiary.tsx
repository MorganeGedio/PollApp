import Axios from "axios";
import { Question } from "screens/types";

const axios = Axios.create({
  baseURL: "https://polls.apiblueprint.org",
  responseType: "json",
  timeout: 5000,
});

// get questions list - all
function getQuestions(): Promise<Question[]> {
  return axios.get("/questions").then((response) => response.data);
}

// get question details - get{id}
function getQuestion(questionId: string): Promise<Question> {
  return axios.get(questionId).then((response) => response.data);
}

// post vote
function voteChoice(url: string): Promise<Question> {
  return axios.post(url);
}

// post new question - create
function createQuestion(params: string): Promise<Question> {
  return axios.post("/questions", params);
}

export const API = { getQuestions, getQuestion, voteChoice, createQuestion };
