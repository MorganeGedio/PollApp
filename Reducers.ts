import { GET_QUESTIONS, ADD_QUESTION, HAS_VOTED, GET_DETAILS } from "./constants/ActionTypes"; 
import {actionCreators} from "./Actions"
import { State } from "react-native-gesture-handler";

const initialState = {
    questionList: []
}

export const getQuestions = (state = initialState, action) => {
    // use action to run some logic that affects the state of state object 
    switch(action.type) {
        case ADD_QUESTION: 
        // not changing state at once
            return action.getQuestions;
        default:
            return state;
    }
}



export const hasVoted = (state = false, action) => {
    switch (action.type) {
        case HAS_VOTED: 
            return action.hasVoted; 
        default: 
        return state;
    }
}

