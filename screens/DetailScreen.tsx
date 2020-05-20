import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";
import Choice from "../components/Choice";
import apiary from "../apiary";

export default function DetailScreen() {
  const route = useRoute();

  const [details, setDetails] = useState({ question: "", choices: [] });

  const [displayVotes, setDisplayVotes] = useState(false);
  const [displayTotal, setDisplayTotal] = useState(false);

  const [hasVoted, setHasVoted] = useState(false);

  const fetchData = async () => {
    // console.log("test");
    const response = await apiary.get(route.params.url);
    // console.log(response);
    setDetails(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chooseOption = async (url: string) => {
    const info = await apiary.post(url);
    // console.log(info);
    fetchData();
    setDisplayVotes(true);
    setDisplayTotal(true);
    setHasVoted(true);
  };

  const totalVotes = (choices: string | any[]) => {
    let sum = 0;
    for (let i = 0; i < choices.length; i++) {
      sum += choices[i].votes;
    }
    return sum;
  };

  return (
    <SafeAreaView>
      <Text style={styles.question}> {details.question} </Text>
      <Text style={styles.instruction}>
        Choose one of the following option :
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.url}
        data={details.choices}
        extraData={details.choices}
        renderItem={({ item }) => {
          // console.log("item", item);
          return (
            <Choice
              disabled={hasVoted}
              voteChange={() => chooseOption(item.url)}
              title={item.choice}
              showVote={displayVotes}
              votes={item.votes}
            ></Choice>
          );
        }}
      />
      {displayTotal ? (
        <Text style={styles.total}>
          {totalVotes(details.choices)} votes in total
        </Text>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 25,
    fontFamily: "nunito-bold",
    padding: 5,
    textAlign: "center",
    marginTop: 20,
  },
  instruction: {
    fontSize: 15,
    fontFamily: "nunito-regular",
    padding: 10,
    textAlign: "center",
  },
  total: {
    fontFamily: "nunito-bold",
    padding: 10,
    fontSize: 15,
    marginTop: 3,
    color: "#707070",
    textAlign: "center",
  },
});
