import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import { setUiMode } from '../../redux/actions';
import { UI_MODES } from '../../utils/constants';

const generateTimeOfDayString = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
        return "Morning"
    }
    if (hour < 18) {
        return "☀Afternoon"
    }
    return "Evening"
}

class SurveyGreeting extends Component {
    render() {
    return(<div>
    <h1>Good {generateTimeOfDayString()}, {this.props.user.firstName}</h1>
    <h5>You're about to take the survey: {this.props.activeSurvey.title}</h5>
    <p>Quick note: once you've answered a question. It cannot be changed.</p>
    <hr />
    <Button onClick={() => {this.props.dispatch(setUiMode(UI_MODES.SURVEY))}}>I'm Ready</Button>
    </div>
    )
    }
}

const mapStateToProps = state => {
    return {
        activeSurvey: state.activeSurvey,
        user: state.user,
        authToken: state.authToken
    }
}

export default connect(mapStateToProps)(SurveyGreeting);