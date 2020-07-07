import { UI_MODES, AUTH_MODES } from './../utils/constants'

export default {
    uiMode: UI_MODES.LOGIN,
    authMode: AUTH_MODES.SURVEY,
    authToken: "NO_TOKEN_SPECIFIED",
    activeSurvey:
    {
        title: null,
        description: null,
        questions: null,
        completed: false
    },
    user: null
}