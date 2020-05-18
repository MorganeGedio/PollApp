import { Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import apiary from "../apiary";

export default function AddQuestionScreen() {
  const [question, onChangeQuestion] = useState("Question");
  const [choice, onChangeChoice] = useState("Choices");

  const createChoice = (choicesInput) => {
    let choices = choicesInput.split(",");
    // array of strings
    return JSON.stringify(choices);
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    const choicesArray = createChoice(choice);
    const choicesObject =
      '{"question": "' + question + '", "choices": ' + choicesArray + "}";
    apiary.post("/questions", choicesObject);
  };

  return (
    <View>
      <Text>New question</Text>
      <Text>Add the question: </Text>
      <TextInput
        onChangeText={(question) => onChangeQuestion(question)}
      ></TextInput>
      <Text>List the options (separated by a comma): </Text>
      <TextInput onChangeText={(choice) => onChangeChoice(choice)}></TextInput>
      <Button title="Submit" onPress={handleSubmit}></Button>
    </View>
  );
}

