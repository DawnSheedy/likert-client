import React, { useState, Component } from 'react';
import { Container, Row, Col, Card, Form, Button, Collapse, Alert } from 'react-bootstrap';
import { connect } from 'react-redux'
import { SET_AUTH_MODE, setAuthMode, setUiMode, setUser, setAuthToken, setSurvey } from '../../redux/actions';
import { AUTH_MODES, UI_MODES } from '../../utils/constants';
import { getUserFromAccessCode, getSurveyFromId } from '../../utils/callApi';
import { Spring, Transition } from 'react-spring/renderprops'
import WarningBox from '../warning-box';

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

class AccessForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            accessCode: '',
            email: '',
            password: '',
            codeWarning: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showWarning(warningTitle, warningSubtitle) {
        this.setState({
            warningTitle,
            warningSubtitle
        })
    }

    handleSubmit(event) {
        getUserFromAccessCode(this.state.accessCode)
            .then(json => {
                if (json.error) {
                    this.showWarning("That Access Code was incorrect.",
                    "Please confirm that your code is correct, or contact your survey provider.")
                    setTimeout(() => {
                        this.showWarning('')
                    }, 10000)
                    return
                }
                this.props.dispatch(setUser(json))
                this.props.dispatch(setAuthToken(this.state.accessCode))
                getSurveyFromId(json.id, this.state.accessCode, this.props.authMode)
                    .then(json => {
                        if (json.error) {
                            this.showWarning("An unknown error occurred.", "Please contact you survey provider.")
                            return
                        }
                        this.props.dispatch(setSurvey(json))
                        this.props.dispatch(setUiMode(UI_MODES.SURVEY_WELCOME))
                    })
            })
            .catch(err => {
                this.showWarning("API Connection Error", err.message)
            })
        event.preventDefault();

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({
            [target.name]: value
        })
    }

    render() {
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Collapse in={this.props.authMode === AUTH_MODES.SURVEY}>
                            <div id="surveyAccessForm">
                                <Card.Title>
                                    Please enter your access code.
                                        </Card.Title>
                                <Card.Subtitle>
                                    If you do not have an access code, please contact your survey provider.
                                        </Card.Subtitle>
                                <hr />
                                    <WarningBox warning={this.state.warningTitle} subtitle={this.state.warningSubtitle} />
                                <Form>
                                    <Form.Group controlId="formSurveyAccessCode">
                                        <Form.Label>Survey Access Code:</Form.Label>
                                        <Form.Control name="accessCode" type="text" value={this.state.accessCode} placeholder="Enter Access Code" onChange={this.handleInputChange} />
                                        <Form.Text className="text-muted">
                                            Don't share your survey access code with anyone.
                                                </Form.Text>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                                        Submit
                                            </Button>
                                </Form>
                                <hr />
                            </div>
                        </Collapse>
                        <Card.Link href="#"
                            onClick={() => {
                                this.props.dispatch(setAuthMode(this.props.authMode === AUTH_MODES.SURVEY ? AUTH_MODES.ADMIN : AUTH_MODES.SURVEY))
                            }}>{!this.props.authMode ? "Administrator Login" : "Go Back"}</Card.Link>

                        <Collapse in={this.props.authMode === AUTH_MODES.ADMIN}>
                            <div id="adminLoginForm">
                                <hr />
                                <Card.Title>
                                    Please enter your credentials.
                                    </Card.Title>
                                <Card.Subtitle>
                                    If you have lost your credentials, contact the server administrator.
                                    </Card.Subtitle>
                                <hr />
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control name="email" type="email" value={this.state.email} placeholder="Enter email" onChange={this.handleInputChange} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control name="password" type="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                                        Log in
                                        </Button>
                                </Form>
                            </div>
                        </Collapse>
                    </Card.Body>
                </Card>

            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        uiMode: state.uiMode,
        authMode: state.authMode,
        user: state.user
    }
}

export default connect(
    mapStateToProps)
    (AccessForm);