import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState, Dispatch, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Colors } from "constants/Colors";
import { Fonts } from "constants/Fonts";
import { Screens } from "constants/Screens";
import { formatChoicesInput } from "utils/FormatChoicesInput";
import { RootStackParamList } from "App";
import { connect } from "react-redux";
import { addQuestion, QuestionsActions } from "actions/QuestionsActions";
import { AppState } from "reducers/rootReducer";
import { RequestStatus } from "reducers/QuestionsReducer";
import { bindActionCreators } from "redux";

type AddScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  Screens.add
>;

type Props = {
  request: RequestStatus;
};

type DispatchProps = {
  addQuestion(params: string): void;
};

export function AddQuestionScreen(props: Props & DispatchProps) {
  const navigation = useNavigation<AddScreenNavigationProp>();

  const [question, onChangeQuestion] = useState("Question");
  const [choice, onChangeChoice] = useState("Choices");

  const choicesArray = formatChoicesInput(choice);

  const newQuestionFull =
    '{"question": "' + question + '", "choices": ' + choicesArray + "}";

  const handleSubmit = () => {
    addQuestion(newQuestionFull);
  };

  useEffect(() => {
    // console.log("update", props.request);
    if (props.request === "SUCCESS") {
      navigation.navigate(Screens.list, { reload: true });
    } else if (props.request === "ERROR") {
      Alert.alert("Please provide a question and at least 2 choices!");
    }
  }, [props]);

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

      <TouchableOpacity style={styles.submit} onPress={() => handleSubmit}>
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

const mapStateToProps = (state: AppState): Props => ({
  request: state.questionsState.request,
});

const mapDispatchToProps = {
  addQuestion: addQuestion,
};

export default connect(mapStateToProps, (dispatch: any) => ({
  addQuestion: bindActionCreators(addQuestion, dispatch),
}))(AddQuestionScreen);
