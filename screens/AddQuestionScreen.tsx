import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/Colors";
import fonts from "../constants/Fonts";
import apiary from "../apiary";

export default function AddQuestionScreen() {
  const [question, onChangeQuestion] = useState("Question");
  const [choice, onChangeChoice] = useState("Choices");

  const navigation = useNavigation();

  const createChoices = (choicesInput: string) => {
    let choices = choicesInput.split(",");
    return JSON.stringify(choices);
  };

  const choicesArray = createChoices(choice);
  const newQuestionFull =
    '{"question": "' + question + '", "choices": ' + choicesArray + "}";

  const handleSubmit = (event: { preventDefault: () => void }) => {
    apiary.post("/questions", newQuestionFull);
    navigation.navigate("QuestionsList", { reload: true });
    event.preventDefault();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a new question to the list</Text>

      <Text style={styles.label}>Write your question: </Text>
      <TextInput
        style={styles.input}
        onChangeText={(question) => onChangeQuestion(question)}
      ></TextInput>

      <Text style={styles.label}>
        List the options {"\n"} (separated by a comma):{" "}
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(choice) => onChangeChoice(choice)}
      ></TextInput>

      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>SEND !</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontFamily: fonts.bold,
    textAlign: "center",
    fontSize: 25,
    padding: 10,
  },
  label: {
    fontFamily: fonts.bold,
    padding: 10,
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: colors.borderColor,
    borderWidth: 0.5,
    borderRadius: 10,
    fontFamily: fonts.input,
    fontSize: 20,
    padding: 10,
  },
  submit: {
    backgroundColor: colors.submitBackground,
    padding: 10,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
    borderRadius: 10,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.62,
  },
  submitText: {
    fontFamily: fonts.bold,
    fontSize: 20,
  },
});
