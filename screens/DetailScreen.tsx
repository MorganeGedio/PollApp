import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Button,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import apiary from "../apiary";

export default function DetailScreen() {
  const [details, setDetails] = useState({ question: "", choices: [] });
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiary.get(route.params.url);
      //   console.log(response);
      setDetails(response.data);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <Text style={styles.question}> {details.question} </Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.url}
        data={details.choices}
        renderItem={({ item }) => {
          //   console.log("item", item);
          return <Text style={styles.choice}>{item.choice}</Text>;
        }}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  question: {
    fontWeight: "bold",
    fontSize: 20,
  },
  choice: {
    backgroundColor: "#ffe8df",
    marginTop: 10,
    padding: 10,
  },
});
