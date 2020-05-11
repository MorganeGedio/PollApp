import * as React from 'react';
import { View, Text, Image, Button } from 'react-native';

export default function QuestionItem(props) {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
}