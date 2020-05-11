import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function QuestionItem(props) {
  return (
    <TouchableOpacity 
        // style={styles.container}
        // onPress={onPress}
    >
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: props.imageUri }} />
            <View style={styles.baseText}>
                <Text style={styles.titleText}>{props.title}</Text>
                <Text>{props.description}</Text>
            </View>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        height: 100,
        flexDirection: 'row',
        // justifyContent: 'space-between', 
        backgroundColor: "#dfcdc3", 
        borderRadius: 5, 
        marginVertical: 20
    },
    baseText: {
        fontFamily: "nunito-regular",
        marginTop: 20,
        marginLeft: 10, 
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold", 
        color: "#3c4245"
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5
    },
  });