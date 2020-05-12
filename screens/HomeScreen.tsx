import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView } from "react-native";
import QuestionItem from "../components/QuestionItem";
import apiary from "../apiary"

export default function HomeScreen() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiary.get('/questions');
    setQuestions(response.data);
    };
    fetchData();
  }, []);
  // empty array to avoid activating effect hook on component updates but only for the mounting 

  function getParsedDate(date){
    date = String(date).split(' ');
    var days = String(date[0]).split('-');
    return ["0", parseInt(days[2]), "-", "0", parseInt(days[1]), "-", parseInt(days[0])];
  }


  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.mainTitle}> Choose your poll </Text>

      < FlatList 
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.url}
        data={questions}
        renderItem={({ item }) => 
        <QuestionItem 
          title={item.question} 
          description={getParsedDate(item.published_at)} 
          // imageUri={item.imageUri} 
        />}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    padding: 20
  },

  mainTitle: {
    fontWeight: "bold", 
    fontSize: 30,
  },
});

