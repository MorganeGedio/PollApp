import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Choice(props) {
  return (
    <TouchableOpacity style={styles.choice}>
      <View>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  choice: {
    backgroundColor: "#ffe8df",
    marginTop: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
