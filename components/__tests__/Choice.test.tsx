import React from "react";
import { render, fireEvent } from 'react-native-testing-library';
import ChoiceItem, { ChoiceItemProps } from "../Choice";

const setup = (props: ChoiceItemProps) => {
  const wrapper = render(<ChoiceItem {...props} />);
  return {
    props,
    wrapper,
  };
};

describe("ChoiceItem", () => {
  const testProps = {
    title: "Question Test",
    votes: 12,
    showVote: false,
    disabled: false,
    onPress: jest.fn(),
  };

  const { wrapper, props } = setup(testProps);

  it("choice component doesn't show the amount of votes", () => {
    expect(props.showVote).toBeFalsy;
  })

  it("calls the onPress function", () => {
    fireEvent.press(wrapper.getByText('Question Test'));
    expect(props.onPress).toHaveBeenCalledTimes(1);
  })

});
