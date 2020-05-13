import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import QuestionItem from "../components/QuestionItem";
import apiary from "../apiary";

export default function HomeScreen() {
  const [questions, setQuestions] = useState([]);

  // fetch the API - list of questions
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiary.get("/questions");
      setQuestions(response.data);
    };
    fetchData();
  }, []);
  // empty array to avoid activating effect hook on component updates but only for the mounting

  const navigation = useNavigation();

  // define what happens when Component is pressed
  function questionPress(url) {
    navigation.navigate("Details", { url });
    // agmt 1 = route name + agmt 2 = params
  }

  function formatDate(string) {
    const date = new Date(string);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString([], options);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}> Choose your poll </Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.url}
        data={questions}
        renderItem={({ item }) => (
          <QuestionItem
            navigateToQuestion={() => questionPress(item.url)}
            // url={item.url}
            title={item.question}
            date={formatDate(item.published_at)}
            imageUri="https://w7.pngwing.com/pngs/269/714/png-transparent-computer-icons-question-mark-button-question-mark-text-logo-number.png"
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
    fontWeight: "bold",
    fontSize: 30,
  },
});
