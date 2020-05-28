import React from "react";
import renderer from "react-test-renderer";
import ChoiceItem from "../Choice";

describe("ChoiceItem", () => {
  const testProps = {
    title: "Question Test",
    votes: 12,
    showVote: false,
    disabled: false,
    onPress: jest.fn(),
  };

  test("Choice component renders correctly", () => {
    // render a component with the new renderer
    const component = renderer.create(<ChoiceItem {...testProps} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
