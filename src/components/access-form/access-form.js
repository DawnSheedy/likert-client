import React, { useState, Component } from 'react';
import { Container, Row, Col, Card, Form, Button, Collapse } from 'react-bootstrap';
import { connect } from 'react-redux'
import { SET_AUTH_MODE, setAuthMode, setUiMode } from '../../redux/actions';
import { AUTH_MODES, UI_MODES } from '../../utils/constants';

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
    render() {
        return (
            <Container>
                <Row className="align-items">
                    <Col sm={{ span: 12 }} md={{ span: 8, offset: 2 }}>
                        <Card>
                            <Card.Header>Good {generateTimeOfDayString()},</Card.Header>
                            <Card.Body>
                                <Collapse in={!this.props.authMode}>
                                    <div id="surveyAccessForm">
                                        <Card.Title>
                                            Please enter your access code.
                        </Card.Title>
                                        <Card.Subtitle>
                                            If you do not have an access code, please contact your survey provider.
                        </Card.Subtitle>
                                        <hr />
                                        <Form>
                                            <Form.Group controlId="formSurveyAccessCode">
                                                <Form.Label>Survey Access Code:</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Access Code" />
                                                <Form.Text className="text-muted">
                                                    Don't share your survey access code with anyone.
                                </Form.Text>
                                            </Form.Group>
                                            <Button variant="primary" type="submit" onClick={() => {this.props.dispatch(setUiMode(UI_MODES.LOADING))}}>
                                                Submit
                                </Button>
                                        </Form>
                                        <hr />
                                    </div>
                                </Collapse>
                                <Card.Link href="#"
                                    onClick={() => {
                                        this.props.dispatch(setAuthMode(this.props.authMode === AUTH_MODES.SURVEY ? AUTH_MODES.ADMIN : AUTH_MODES.SURVEY))
                                    }}>{!this.props.authMode ? "Administrator Login" : "Survey Access"}</Card.Link>

                                <Collapse in={this.props.authMode}>
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
                                                <Form.Control type="email" placeholder="Enter email" />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" />
                                            </Form.Group>
                                            <Button variant="primary" type="submit">
                                                Log in
                                        </Button>
                                        </Form>
                                    </div>
                                </Collapse>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
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
    mapStateToProps,)
    (AccessForm);