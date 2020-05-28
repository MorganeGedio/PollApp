export interface Question {
  question: string;
  published_at: string;
  url: string;
  choices: Choice[];
}

export interface Choice {
  choice: string;
  url: string;
  votes: number;
}
