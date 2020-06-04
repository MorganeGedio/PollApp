import React, { useEffect } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Colors } from "constants/Colors";
import { Fonts } from "constants/Fonts";
import { Screens } from "constants/Screens";
import QuestionItem from "components/QuestionItem";
import { formatDate } from "utils/FormatDate";
import { Question } from "screens/types";
import { RootStackParamList } from "App";
import { connect } from "react-redux";
import { AppState } from "reducers/rootReducer";
import { bindActionCreators, Dispatch } from "redux";
import { fetchQuestions, QuestionsActions } from "actions/QuestionsActions";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  Screens.list
>;

type HomeScreenRouteProp = RouteProp<RootStackParamList, Screens.list>;

export type HomeScreenParamList = {
  reload: boolean;
};

type Props = {
  questions: Question[];
};

type DispatchProps = {
  fetchActions(): void;
};

function HomeScreen(props: Props & DispatchProps) {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<HomeScreenRouteProp>();

  useEffect(() => {
    props.fetchActions();
  }, []);

  useEffect(() => {
    if (route.params.reload) {
      props.fetchActions();
    }
  }, [route.params.reload]);

  function questionPress(url: string) {
    navigation.navigate(Screens.details, { url });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}> Choose your poll </Text>
      <TouchableOpacity
        style={styles.addQuestion}
        onPress={() => navigation.navigate(Screens.add)}
      >
        <Text style={styles.addText}>ADD YOUR QUESTION</Text>
      </TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.url}
        data={props.questions}
        renderItem={({ item }) => (
          <QuestionItem
            onPress={() => questionPress(item.url)}
            title={item.question}
            date={formatDate(item.published_at)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  mainTitle: {
    fontFamily: Fonts.bold,
    fontSize: 30,
    textAlign: "center",
    marginHorizontal: 10,
  },
  addQuestion: {
    backgroundColor: Colors.addQuestionBackground,
    padding: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    marginHorizontal: 60,
    borderRadius: 10,
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.62,
  },
  addText: {
    fontFamily: Fonts.bold,
    fontSize: 15,
  },
});

// any time the store is updated, mapStateToProps will be called
const mapStatetoProps = (state: AppState): Props => ({
  questions: state.questionsState.questions,
});

const mapDispatchToProps = (
  dispatch: Dispatch<QuestionsActions>
): DispatchProps => ({
  fetchActions: bindActionCreators(fetchQuestions, dispatch),
});

export default connect(mapStatetoProps, mapDispatchToProps)(HomeScreen);
