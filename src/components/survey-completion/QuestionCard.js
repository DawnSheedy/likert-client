import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'

class QuestionCard extends Component {
    constructor(props) {
        super()
        this.state = {
            input: -1
        }
    }

    render() {
        return (<Card>
            <Card.Header>
                {this.props.user.firstName} {this.props.user.lastName} | Question {this.props.index+1} of {this.props.activeSurvey.questions.length}
            </Card.Header>
            <Card.Body>
                <Card.Title>{this.props.activeSurvey.questions[this.props.index].query}</Card.Title>
                <Card.Subtitle>{this.props.activeSurvey.questions[this.props.index].helpText}</Card.Subtitle>
            </Card.Body>
        </Card>)
    }
}

const mapPropsToState = state => {
    return {
            activeSurvey: state.activeSurvey,
            user: state.user,
            authToken: state.authToken
    }
}

export default connect(mapPropsToState)(QuestionCard)