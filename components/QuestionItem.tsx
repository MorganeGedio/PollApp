import * as React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function QuestionItem(props) {
  return (
    <TouchableOpacity onPress={props.navigateToQuestion}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: props.imageUri }} />
        <View style={styles.baseText}>
          <Text style={styles.titleText}>{props.title}</Text>
          <Text>Created on: {props.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 30,
    height: 100,
    flexDirection: "row",
    backgroundColor: "#dfcdc3",
    borderRadius: 5,
    marginVertical: 20,
  },
  baseText: {
    fontFamily: "nunito-regular",
    marginTop: 20,
    marginLeft: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});
