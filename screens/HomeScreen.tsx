import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ImageStore,
  EventSubscriptionVendor,
} from "react-native";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Colors } from "constants/Colors";
import { Fonts } from "constants/Fonts";
import { Screens } from "constants/Screens";
import QuestionItem from "components/QuestionItem";
import { formatDate } from "utils/FormatDate";
import { getQuestions } from "services/apiary";
import { Question } from "screens/types";
import { RootStackParamList } from "App";
import { connect } from "react-redux";
import { actionCreators as actions } from "../Actions";
import { store } from ;
import {GET_QUESTIONS} from 'constants/ActionTypes'

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  Screens.list
>;

type HomeScreenRouteProp = RouteProp<RootStackParamList, Screens.list>;

export type HomeScreenParamList = {
  reload: boolean;
};

// const mapStateToProps = (state: { questions: any; }) => {
//   return { questions: state.questions };
// };

// const Questions = connect(mapStateToProps)(HomeScreen)

export default function HomeScreen() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<HomeScreenRouteProp>();

  const fetchData = async () => {
    const questionsFetched = await getQuestions();
    setQuestions(questionsFetched);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (route.params.reload) {
      fetchData();
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
        data={questions}
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
