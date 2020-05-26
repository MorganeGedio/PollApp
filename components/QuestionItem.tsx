import * as React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../constants/Colors";

interface Props {
  title: string;
  date: string;
  navigateToQuestion: () => void;
}

export default function QuestionItem(props: Props) {
  return (
    <TouchableOpacity onPress={props.navigateToQuestion}>
      <View style={styles.container}>
        <View style={styles.baseText}>
          <Text style={styles.titleText}>{props.title}</Text>
          <Text style={styles.descriptionText}>Created on: {props.date}</Text>
          <Image
            style={styles.icon}
            source={require("../assets/images/point-to.png")}
          />
        </View>
        <View>
          <Image
            style={styles.image}
            source={require("../assets/images/hand.png")}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
    height: 130,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.questionBackground,
    borderRadius: 10,
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  image: {
    width: 100,
    height: 100,
  },
  icon: {
    width: 20,
    height: 20,
  },
  baseText: {
    padding: 20,
    flexGrow: 1,
    flex: 1,
  },
  titleText: {
    fontFamily: "nunito-bold",
    fontSize: 20,
    marginBottom: 5,
  },
  descriptionText: {
    fontFamily: "nunito-regular",
    fontSize: 13,
    marginBottom: 5,
  },
});
