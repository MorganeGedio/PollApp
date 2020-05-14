import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Choice(props) {
  const [visible, setVisible] = useState(false)

  return (
    <TouchableOpacity style={styles.choice} onPress={props.voteChange}>
      <View style={styles.option}>
        <Text>{props.title}</Text>
        <Text> - {props.votes}</Text>
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
