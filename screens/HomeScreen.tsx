import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView } from "react-native";
import QuestionItem from "../components/QuestionItem";

export default function HomeScreen() {

  const collection = [
    {  
      title: 'Question 1', 
      description: "Description question 1",
      imageUri: 'https://w7.pngwing.com/pngs/269/714/png-transparent-computer-icons-question-mark-button-question-mark-text-logo-number.png', 
    },
    {  
      title: 'Question 2', 
      description: "Description question 2",
      imageUri: 'https://w7.pngwing.com/pngs/269/714/png-transparent-computer-icons-question-mark-button-question-mark-text-logo-number.png', 
    },
    {  
      title: 'Question 3', 
      description: "Description question 3",
      imageUri: 'https://w7.pngwing.com/pngs/269/714/png-transparent-computer-icons-question-mark-button-question-mark-text-logo-number.png', 
    },
    {  
      title: 'Question 4', 
      description: "Description question 4",
      imageUri: 'https://w7.pngwing.com/pngs/269/714/png-transparent-computer-icons-question-mark-button-question-mark-text-logo-number.png', 
    } 
   ]

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.mainTitle}> Choose your poll </Text>

      < FlatList 
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.title}
        data={collection}
        renderItem={({ item }) => 
        <QuestionItem 
          title={item.title} 
          description={item.description} 
          imageUri={item.imageUri} 
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

