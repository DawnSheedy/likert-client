import { SET_UI_MODE, SET_AUTH_MODE, SET_AUTH_TOKEN, SET_SURVEY, SET_QUESTIONS, SET_ANSWER, SET_USER } from './actions'

import { UI_MODES, AUTH_MODES } from './../utils/constants'

import initialState from './initial-state'

const handlers = {

    [SET_UI_MODE]: function (state, action) {
        return Object.assign({}, state, {
            uiMode: action.uiMode
        })
    },

    [SET_AUTH_MODE]: function (state, action) {
        return Object.assign({}, state, {
            authMode: action.authMode
        })
    },

    [SET_AUTH_TOKEN]: function (state, action) {
        return Object.assign({}, state, {
            authToken: action.authToken
        })
    },

    [SET_SURVEY]: function (state, action) {
        return Object.assign({}, state, {
            activeSurvey: action.survey
        })
    },

    [SET_QUESTIONS]: function (state, action) {
        return Object.assign({}, state, {
            activeSurvey: {
                questions: action.questions.map((question, index) => {
                    return Object.assign({}, question, {
                        input: -1
                    })
                })
            }
        })
    },

    [SET_ANSWER]: function (state, action) {
        return Object.assign({}, state, {
            activeSurvey: {
                questions: state.activeSurvey.questions.map((question, index) => {
                    if (index === action.index) {
                        return Object.assign({}, question, {
                            input: action.input
                        })
                    }
                    return question
                })
            }
        })
    },

    [SET_USER]: function(state, action) {
        return Object.assign({}, state, {
            user: action.user
        })
    }
}

export default function (state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action)
    } else {
        return state
    }
}