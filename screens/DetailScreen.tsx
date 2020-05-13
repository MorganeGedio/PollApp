import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, Button } from "react-native";
import apiary from "../apiary";
import { useRoute } from '@react-navigation/native';

export default function DetailScreen() {
  const [details, setDetails] = useState({ question: "", choices: [] });
  const route = useRoute();

  useEffect(() => {
    const fetchData = async () => {
    const response = await apiary.get(route.params.url);
    // const response = await apiary.get('questions/22');
    //   console.log(response);
      setDetails(response.data);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      {/* info to access : 
        - question <-> title
        - iterate over the choices array to get the choice name + url   */}
      <Text style={styles.question}> {details.question} </Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.url}
        data={details.choices}
        renderItem={({ item }) => {
        //   console.log("item", item);
        return <Text style={styles.choice}>{item.choice}</Text>;
        }}
      />
        <Button title="Go back" onPress={() => navigation.navigate('Questions')} />
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
