import React, { Component } from 'react';
import { Card, ListGroup, Badge, Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getSurveyList, getSurveyFromId, getSurveyQuestions } from '../../utils/callApi';
import QuestionList from './question-list';
import InviteList from './invite-list';

class SurveyView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            survey: props.survey,
            questions: [],
            invites: [],
            questionView: false,
            modalMode: ""
        }
    }

    componentDidMount() {
        getSurveyQuestions(this.props.survey.id, this.props.token).then((response) => {
            console.log(JSON.stringify(response));
            this.setState({ questions: response });
        })
    }


    render() {
        return (
            <Card>
                <Card.Header>
                    <Row>
                        <Col>
                    <Card.Title><h3>{this.state.survey.title}</h3></Card.Title>
                    </Col>
                    <Col className="text-left">
                        <Button onClick={() => {this.props.setSurvey("")}}>Back to List</Button>
                    </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <p>Description: {this.state.survey.description}</p>
                    <p className="text-left">ID: {this.props.survey.id}</p>
                    <QuestionList surveyId={this.props.survey.id}/>
                    <InviteList surveyId={this.props.survey.id} />
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        uiMode: state.uiMode,
        authMode: state.authMode,
        user: state.user,
        token: state.authToken
    }
}

export default connect(
    mapStateToProps)
    (SurveyView);