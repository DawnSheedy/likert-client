import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import { setUiMode, resetState } from '../../redux/actions';
import { UI_MODES } from '../../utils/constants';

class SurveyEnd extends Component {
    render() {
    return(<div>
    <h1>Thanks, {this.props.user.firstName}!</h1>
    <h5>You've finished the survey: {this.props.activeSurvey.title}</h5>
    <p>Your answers have been recorded. You can now close this window, or press the button below to go home.</p>
    <hr />
    <Button onClick={() => {this.props.dispatch(setUiMode(UI_MODES.LOGIN)); this.props.dispatch(resetState())}}>Home</Button>
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

export default connect(mapStateToProps)(SurveyEnd);