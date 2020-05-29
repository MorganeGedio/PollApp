import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "constants/Colors";
import { Fonts } from "constants/Fonts";

interface ChoiceItemProps {
  title: string;
  votes: number;
  showVote: boolean;
  disabled: boolean;
  onPress: () => void;
}

export default function ChoiceItem(props: ChoiceItemProps) {
  return (
    <View>
      <TouchableOpacity
        style={styles.choice}
        onPress={props.onPress}
        disabled={props.disabled}
      >
        <View>
          <Text style={styles.choiceText}>{props.title}</Text>
          {props.showVote ? (
            <Text style={styles.voteText}>
              {" "}
              received {props.votes} votes !{" "}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  choice: {
    backgroundColor: Colors.choiceBackground,
    padding: 10,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    borderRadius: 10,
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  choiceText: {
    fontFamily: Fonts.regular,
    fontSize: 20,
    textAlign: "center",
  },
  voteText: {
    fontFamily: Fonts.regular,
    fontSize: 17,
    textAlign: "center",
  },
});
