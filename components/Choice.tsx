import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  votes: number;
  showVote: boolean;
  disabled: boolean;
  voteChange: () => void;
}

export default function Choice(props: Props) {
  return (
    <TouchableOpacity
      style={styles.choice}
      onPress={props.voteChange}
      disabled={props.disabled}
    >
      <View style={styles.option}>
        <Text style={styles.choiceText}>{props.title}</Text>
        {props.showVote ? (
          <Text style={styles.choiceText}> - {props.votes} votes !</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  choice: {
    backgroundColor: "#ffe8df",
    padding: 10,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  option: {
    flexDirection: "row",
  },
  choiceText: {
    fontFamily: "nunito-regular",
    fontSize: 20,
  },
});
