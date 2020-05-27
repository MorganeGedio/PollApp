import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import colors from "../constants/Colors";
import fonts from "../constants/Fonts";
import QuestionItem from "../components/QuestionItem";
import screens from "../constants/Screens";
import apiary from "../apiary";

export default function HomeScreen() {
  const [questions, setQuestions] = useState([]);

  const route = useRoute();

  // fetch the API - list of questions
  const fetchData = async () => {
    const response = await apiary.get("/questions");
    setQuestions(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  // empty array to avoid activating effect hook on component updates but only for the mounting

  useEffect(() => {
    if (route.params.reload) {
      fetchData();
    }
  }, [route.params.reload]);

  const navigation = useNavigation();

  function questionPress(url: string) {
    navigation.navigate(screens.details, { url });
  }

  function formatDate(publicationDate: string) {
    const date = new Date(publicationDate);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString([], options);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}> Choose your poll </Text>
      <TouchableOpacity
        style={styles.addQuestion}
        onPress={() => navigation.navigate(screens.add)}
      >
        <Text style={styles.addText}>ADD YOUR QUESTION</Text>
      </TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.url}
        data={questions}
        renderItem={({ item }) => (
          <QuestionItem
            navigateToQuestion={() => questionPress(item.url)}
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
    fontFamily: fonts.bold,
    fontSize: 30,
    textAlign: "center",
    marginHorizontal: 10,
  },
  addQuestion: {
    backgroundColor: colors.addQuestionBackground,
    padding: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    marginHorizontal: 60,
    borderRadius: 10,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.62,
  },
  addText: {
    fontFamily: fonts.bold,
    fontSize: 15,
  },
});
