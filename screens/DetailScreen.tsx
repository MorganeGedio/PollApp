import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import ChoiceItem from "components/Choice";
import { Screens } from "constants/Screens";
import { totalVotes } from "utils/TotalVotes";
import { Colors } from "constants/Colors";
import { Fonts } from "constants/Fonts";
import { axios, getQuestion, voteChoice } from "services/apiary";
import { RootStackParamList } from "App";
import { Question } from "screens/types";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, Screens.details>;

export type DetailsScreenParamList = {
  url: string;
};

export default function DetailScreen() {
  const route = useRoute<DetailsScreenRouteProp>();

  const [details, setDetails] = useState<Question>({
    question: "",
    choices: [],
    url: "",
    published_at: "",
  });

  const [hasVoted, setHasVoted] = useState(false);

  const fetchData = async () => {
    const detailsFetched = await getQuestion(route.params.url)
    setDetails(detailsFetched)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chooseOption = async (url: string) => {
    await voteChoice(url);
    fetchData();
    setHasVoted(true);
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
          return (
            <ChoiceItem
              disabled={hasVoted}
              onPress={() => chooseOption(item.url)}
              title={item.choice}
              showVote={hasVoted}
              votes={item.votes}
            ></ChoiceItem>
          );
        }}
      />
      {hasVoted ? (
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
    fontFamily: Fonts.bold,
    padding: 5,
    textAlign: "center",
    marginTop: 20,
  },
  instruction: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    padding: 10,
    textAlign: "center",
  },
  total: {
    fontFamily: Fonts.bold,
    padding: 10,
    fontSize: 15,
    marginTop: 3,
    color: Colors.totalColor,
    textAlign: "center",
  },
});
