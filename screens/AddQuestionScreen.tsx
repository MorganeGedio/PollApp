import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Colors } from "constants/Colors";
import { Fonts } from "constants/Fonts";
import { Screens } from "constants/Screens";
import { formatChoicesInput } from "utils/FormatChoicesInput";
import { createQuestion } from "services/apiary";
import { RootStackParamList } from "App";

type AddScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  Screens.add
>;

export default function AddQuestionScreen() {
  const [question, onChangeQuestion] = useState("Question");
  const [choice, onChangeChoice] = useState("Choices");

  const navigation = useNavigation<AddScreenNavigationProp>();

  const choicesArray = formatChoicesInput(choice);

  const newQuestionFull =
    '{"question": "' + question + '", "choices": ' + choicesArray + "}";

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    createQuestion(newQuestionFull)
      .then(() => {
        navigation.navigate(Screens.list, { reload: true });
      })
      .catch((error: any) => {
        console.log(error);
        alert("Please provide a question and at least 2 choices!");
      });
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
    fontFamily: Fonts.bold,
    textAlign: "center",
    fontSize: 25,
    padding: 10,
  },
  label: {
    fontFamily: Fonts.bold,
    padding: 10,
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: Colors.borderColor,
    borderWidth: 0.5,
    borderRadius: 10,
    fontFamily: Fonts.input,
    fontSize: 20,
    padding: 10,
  },
  submit: {
    backgroundColor: Colors.submitBackground,
    padding: 10,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
    borderRadius: 10,
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.62,
  },
  submitText: {
    fontFamily: Fonts.bold,
    fontSize: 20,
  },
});
