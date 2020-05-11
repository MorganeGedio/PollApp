import * as React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default function QuestionItem(props) {
  return (
    <View>
    <Text>
        <Text style={styles.titleText}>{props.title}</Text>
        <Text>{props.description}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "nunito-regular",
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    container: {
      paddingTop: 50,
    },
  });