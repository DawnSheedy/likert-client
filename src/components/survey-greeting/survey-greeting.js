import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';

const generateTimeOfDayString = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
        return "Morning"
    }
    if (hour < 18) {
        return "Afternoon"
    }
    return "Evening"
}

class SurveyGreeting extends Component {
    goToSurvey() {

    }

    render() {
    return(<div>
    <h1>Good {generateTimeOfDayString()}, {this.props.user.firstName} {this.props.user.lastName}</h1>
    <h5>You're about to take the survey: {this.props.activeSurvey.title}</h5>
    <hr />
    <Button onClick={this.goToSurvey}>I'm Ready</Button>
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