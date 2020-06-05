import React, { useState, useEffect } from "react";
import { Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import ChoiceItem from "components/Choice";
import { totalVotes } from "utils/TotalVotes";
import { Colors } from "constants/Colors";
import { Fonts } from "constants/Fonts";
import { Screens } from "constants/Screens";
import { Question } from "screens/types";
import { RootStackParamList } from "App";
import { connect } from "react-redux";
import { AppState } from "reducers/rootReducer";
import { bindActionCreators, Dispatch } from "redux";
import {
  fetchQuestionDetails,
  QuestionDetailsActions,
  voteForOption,
} from "actions/QuestionDetailsActions";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, Screens.details>;

export type DetailsScreenParamList = {
  url: string;
};

type Props = {
  question: Question;
  voted: boolean;
};

type DispatchProps = {
  fetchDetailsActions(url: string): void;
  voteForOptionAction(url: string): void;
};

export function DetailScreen(props: Props & DispatchProps) {
  const route = useRoute<DetailsScreenRouteProp>();

  useEffect(() => {
    props.fetchDetailsActions(route.params.url);
  }, []);

  return (
    <SafeAreaView>
      <Text style={styles.question}> {props.question.question} </Text>
      <Text style={styles.instruction}>
        Choose one of the following option :
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.url}
        data={props.question.choices}
        extraData={props.question.choices}
        renderItem={({ item }) => {
          return (
            <ChoiceItem
              disabled={props.voted}
              onPress={() => props.voteForOptionAction(item.url)}
              title={item.choice}
              showVote={props.voted}
              votes={item.votes}
            ></ChoiceItem>
          );
        }}
      />
      {props.voted ? (
        <Text style={styles.total}>
          {totalVotes(props.question.choices)} votes in total
        </Text>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 25,
    fontFamily: Fonts.bold,
    padding: 5,
    textAlign: "center",
    marginTop: 20,
  },
  instruction: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    padding: 10,
    textAlign: "center",
  },
  total: {
    fontFamily: Fonts.bold,
    padding: 10,
    fontSize: 15,
    marginTop: 3,
    color: Colors.totalColor,
    textAlign: "center",
  },
});

const mapStatetoProps = (state: AppState): Props => ({
  question: state.questionDetailsState.question,
  voted: state.questionDetailsState.voted,
});

const mapDispatchToProps = (
  dispatch: Dispatch<QuestionDetailsActions>
): DispatchProps => {
  return {
    fetchDetailsActions: bindActionCreators(fetchQuestionDetails, dispatch),
    voteForOptionAction: bindActionCreators(voteForOption, dispatch),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(DetailScreen);
