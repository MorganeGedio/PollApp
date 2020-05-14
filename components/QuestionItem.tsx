import * as React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function QuestionItem(props) {
  return (
    <TouchableOpacity onPress={props.navigateToQuestion}>
      <View style={styles.container}>
        <View style={styles.baseText}>
          <Text style={styles.titleText}>{props.title}</Text>
          <Text style={styles.descriptionText}>Created on: {props.date}</Text>
          <Image style={styles.icon} source={require('../assets/images/point-to.png')} />
        </View>
        <View style={styles.box}>
          <Image style={styles.image} source={require('../assets/images/hand.png')} />
        </View>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    height: 120,
    flexDirection: "row",
    backgroundColor: "#dfcdc3",
    justifyContent: "space-between",
    borderRadius: 10,
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    justifyContent: "center",
    margin: 15,
  },
  icon: {
    width: 20,
    height: 20,
  },
  baseText: {
    margin: 20,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  titleText: {
    fontFamily: "nunito-bold",
    fontSize: 20,
  },
  descriptionText: {
    fontFamily: "nunito-regular",
    fontSize: 13,

  },
});
