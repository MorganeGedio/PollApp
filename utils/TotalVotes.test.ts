import { totalVotes } from "./TotalVotes";

describe("totalVotes", () => {
  const choices = [
    {
      votes: 5,
      url: "/questions/1/choices/1",
      choice: "Ruby",
    },
    {
      votes: 3,
      url: "/questions/1/choices/2",
      choice: "JavaScript",
    },
    {
      votes: 2,
      url: "/questions/1/choices/3",
      choice: "Python",
    },
  ];

  it("should return the total amount of votes for a specific question", () => {
    expect(totalVotes(choices)).toBe(10);
  });
});
