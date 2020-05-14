import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Choice(props) {
  const [showVotes, setShowVotes] = useState(false)

  function vote() {
    setShowVotes(true)
    {props.voteChange}
  }

  return (
    <TouchableOpacity style={styles.choice} onPress={vote}>
      <View style={styles.option}>
        <Text style={styles.choiceText}>{props.title}</Text>
        { showVotes ? <Text style={styles.choiceText}> - {props.votes}</Text> : null }
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
    justifyContent: "space-between",
  },
  choiceText: {
    fontFamily: "nunito-regular",
    fontSize: 20,
  }
});
