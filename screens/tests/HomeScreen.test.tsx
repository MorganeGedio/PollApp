import React from "react";
import { render, fireEvent } from "react-native-testing-library";
import renderer from "react-test-renderer";
import HomeScreen from "../HomeScreen";

describe("<HomeScreen />", () => {

  it("tests the date function", () => {
    const wrapper = renderer.create(<HomeScreen />);
    const inst = wrapper.getInstance();
    expect(inst.formatDate("2020-05-19")).toMatchSnapshot();

    // HomeScreen.formatDate = jest.fn();
    // const value = HomeScreen.formatDate("2020-05-19");
    // expect(value).toBe("19/05/2020");
  });
});
// });
