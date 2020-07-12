import { apiURL } from './config'
import { AUTH_MODES } from './constants';

export const getUserFromAccessCode = async (accessCode) => {
    const data = { accessCode };
    const response = await fetch(apiURL+"/invites?accessCode="+accessCode, {
        method: 'GET',
        cache: 'no-cache',
        redirect: 'error'
    });
    const json = response.json();
    if (json.error) {
        return null;
    }
    return json;
}

export const getSurveyFromId = async (id, token, authMode) => {
    let keyAppend = ""
    let headers = {};
    if (authMode === AUTH_MODES.SURVEY) {
        keyAppend = `?accessCode=${token}`
    } else {
        headers = { Authorization: `Bearer ${token}`}
    }
    const response = await fetch(apiURL+`/invites/${id}/survey${keyAppend}`, {
        method: 'GET',
        cache: 'no-cache',
        redirect: 'error',
        headers
    });
    const json = response.json();
    if (json.error) {
        return null;
    }
    return json;
}

export const getAdminToken = async (email, password) => {
    const response = await fetch(apiURL+'/auth/token', {
        method: 'POST',
        cache: 'no-cache',
        redirect: 'error',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
            email: email,
            password: password
        })
    })

    const json = await response.json();
    console.log(json)
    if(json.error) {
        return null;
    }
    return json.access_token;
}

export const getAdminUser = async (token) => {
    const response = await fetch(apiURL+'/user', {
        method: 'GET',
        cache: 'no-cache',
        redirect: 'error',
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    })

    const json = response.json();
    if(json.error) {
        return null;
    }
    return json;
}

export const answerQuestion = async (token, invite, question, input) => {
    const response = await fetch(apiURL+`/invites/${invite}/answers?accessCode=${token}`, {
        method: 'PUT',
        cache: 'no-cache',
        redirect: 'error',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({ question, input })
    })

    const json = response.json();
    if (json.error) {
        return null;
    }
    return json;
}

export const getSurveyList = async (token) => {
    const response = await fetch(apiURL+`/surveys`, {
        method: 'GET',
        cache: 'no-cache',
        redirect: 'error',
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    })

    const json = await response.json();
    console.log(JSON.stringify(json));
    if (json.error) {
        return null;
    }
    return json;
}

export const getSurveyQuestions = async (token, surveyId) => {
    const response = await fetch(apiURL+`/surveys/${surveyId}/questions`, {
        method: 'GET',
        cache: 'no-cache',
        redirect: 'error',
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    })

    const json = await response.json();
    console.log(JSON.stringify(json));
    if (json.error) {
        return null;
    }
    return json;
}

export const getSurveyInvites = async (token, surveyId) => {
    const response = await fetch(apiURL+`/surveys/${surveyId}/invites`, {
        method: 'GET',
        cache: 'no-cache',
        redirect: 'error',
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    })

    const json = await response.json();
    console.log(JSON.stringify(json));
    if (json.error) {
        return null;
    }
    return json;
}

export const createSurvey = async (token, title, description) => {
    const response = await fetch(apiURL+`/surveys`, {
        method: 'PUT',
        cache: 'no-cache',
        redirect: 'error',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ title, description })
    })
    const json = await response.json();
    if (json.error) {
        return null;
    }
    return json;
}

export const createQuestion = async (token, surveyId, query, helpText, optionOne, optionTwo) => {
    const response = await fetch(apiURL+`/surveys/${surveyId}/questions`, {
        method: 'PUT',
        cache: 'no-cache',
        redirect: 'error',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ query, helpText, optionOne, optionTwo })
    })
    const json = await response.json();
    if (json.error) {
        return null;
    }
    return json;
}

export const createInvite = async (token, surveyId, firstName, lastName) => {
    const response = await fetch(apiURL+`/surveys/${surveyId}/invites`, {
        method: 'PUT',
        cache: 'no-cache',
        redirect: 'error',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ firstName, lastName })
    })
    const json = await response.json();
    if (json.error) {
        return null;
    }
    return json;
}