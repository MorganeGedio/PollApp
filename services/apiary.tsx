import Axios from "axios";
import { Question } from "screens/types";

export const axios = Axios.create({
  baseURL: "https://polls.apiblueprint.org",
  responseType: "json",
  timeout: 5000,
});

// get questions list - all
export function getQuestions(): Promise<Question[]> {
  return axios.get("/questions").then((response) => response.data);
}

// get question details - get{id}
export function getQuestion(questionId: string): Promise<Question> {
  return axios.get(questionId).then((response) => response.data);
}

// post vote
export function voteChoice(url: string): Promise<Question> {
  return axios.post(url);
}

// post new question - create
export function createQuestion(params: string): Promise<Question> {
  return axios.post("/questions", params);
}
