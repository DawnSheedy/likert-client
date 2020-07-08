import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import QuestionCard from './QuestionCard'

class SurveyCompletion extends Component {
    constructor(props) {
        super()
        this.state = {
            index: 0
        }
    }

    render() {
        return (
            <div>
                <QuestionCard index={this.state.index}></QuestionCard>
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

export default connect(mapStateToProps)(SurveyCompletion)