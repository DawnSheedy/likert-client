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