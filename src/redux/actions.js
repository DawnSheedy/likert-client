import { UI_MODES, AUTH_MODES } from './../utils/constants'

//UI States
export const SET_UI_MODE = 'SET_UI_MODE'

//Auth States
export const SET_AUTH_MODE = 'SET_AUTH_MODE'
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'

//User States
export const SET_USER = 'SET_USER'

//Survey Mode
export const SET_SURVEY = 'SET_SURVEY'
export const SET_QUESTIONS = 'SET_QUESTIONS'
export const SET_ANSWER = 'SET_ANSWER'

//Admin mode

//UI States
export function setUiMode(uiMode = UI_MODES.ERROR) {
    return {
        type: SET_UI_MODE,
        uiMode
    }
}

//Auth States
export function setAuthMode(authMode = AUTH_MODES.SURVEY) {
    return {
        type: SET_AUTH_MODE,
        authMode
    }
}

export function setAuthToken(authToken = 'NO_TOKEN_SPECIFIED') {
    return {
        type: SET_AUTH_TOKEN,
        authToken
    }
}

//Survey Mode
export function setSurvey(survey) {
    return {
        type: SET_SURVEY,
        survey
    }
}

export function setQuestions(questions) {
    return {
        type: SET_QUESTIONS,
        questions
    }
}

export function setAnswer(input, index) {
    return {
        type: SET_ANSWER,
        input,
        index
    }
}

export function setUser(user) {
    return {
        type: SET_USER,
        user
    }
}