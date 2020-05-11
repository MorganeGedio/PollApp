import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { View, Text, Image, StyleSheet } from "react-native";
import QuestionItem from "../components/QuestionItem";

export default function HomeScreen() {
  return (
    <View
      style={{
        flexDirection: "column",
        height: 100,
        padding: 20
      }}
    >
      <View style={{ backgroundColor: "blue", flex: 1}} />
      <Image 
        style={styles.logo}
        source={{
          uri: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
        }} />
      <Text>Monday 11 May </Text>
      <QuestionItem title="Question 1" />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
  },
});

