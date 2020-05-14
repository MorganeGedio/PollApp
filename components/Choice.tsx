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
        <Text>{props.title}</Text>
        { showVotes ? <Text> - {props.votes}</Text> : null }
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  choice: {
    backgroundColor: "#ffe8df",
    marginTop: 10,
    padding: 10,
    alignItems: "center",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
