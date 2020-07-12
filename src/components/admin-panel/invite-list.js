import React, { Component } from 'react';
import { Card, ListGroup, Badge, Button, Col, Row, Modal, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getSurveyList, createSurvey, getSurveyQuestions, createQuestion, getSurveyInvites, createInvite } from '../../utils/callApi';

class QuestionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            invites: [],
            modal: false,
            firstName: "",
            lastName: ""
        }

        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleFormInput = this.handleFormInput.bind(this);
        this.handleSurveySubmit = this.handleSurveySubmit.bind(this);
    }

    componentDidMount() {
        getSurveyInvites(this.props.token, this.props.surveyId).then((response) => {
            console.log(JSON.stringify(response));
            this.setState({ invites: response });
        })
    }

    handleModalClose() {
        this.setState({ modal: false,
           firstName: "",
            lastName: ""});
    }

    handleFormInput(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }

    handleSurveySubmit() {
        createInvite(this.props.token, this.props.surveyId, this.state.firstName, this.state.lastName)
            .then((response) => {
                console.log(JSON.stringify(response))
                if (!response) {

                }
                this.componentDidMount();
                this.handleModalClose();
            })
    }


    render() {
        return (
            <>  
                <hr />
                <h3>Invites</h3>
                <Modal
                    show={this.state.modal}
                    onHide={this.handleModalClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Invite</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formTitle">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control name="firstName" onChange={this.handleFormInput} type="text" placeholder="John" />
                                <Form.Text className="text-muted">
                                    Does not need to be unique.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formDescription">
                                <Form.Label>Help Text</Form.Label>
                                <Form.Control name="lastName" onChange={this.handleFormInput} type="text" placeholder="Smith" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModalClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.handleSurveySubmit}>Create</Button>
                    </Modal.Footer>
                </Modal>

                <Button onClick={() => { this.setState({ modal: true }) }}>Create New</Button>
                <hr />
                <ListGroup>
                    {this.state.invites.map((invite, index) =>
                        (<ListGroup.Item variant={(invite.completed) ? "success" : "secondary"}>
                            <Row>
                                <Col>
                                    <h4>{invite.lastName}, {invite.firstName}</h4>
                                    <p>{invite.accessCode}</p>
                                </Col>
                                <Col className="text-right">
                                    <Button onClick={() => { this.props.setInvite(invite) }}>View Invite</Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>))}
                </ListGroup>
            </>
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
    (QuestionList);