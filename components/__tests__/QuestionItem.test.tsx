import React from "react";
import renderer from "react-test-renderer";
import QuestionItem from "../QuestionItem";

describe("QuestionItem", () => {
  const testProps = {
    title: "My question",
    date: "2020-05-25",
    onPress: jest.fn(),
  };

  it("Question component renders correctly", () => {
    // render a component with the new renderer
    const component = renderer.create(<QuestionItem {...testProps} />);
    // transform it into JSON
    let tree = component.toJSON();
    // match the snapshot to the previously stored snapshot
    expect(tree).toMatchSnapshot();
  });
});
