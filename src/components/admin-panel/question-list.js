import React, { Component } from 'react';
import { Card, ListGroup, Badge, Button, Col, Row, Modal, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getSurveyList, createSurvey, getSurveyQuestions, createQuestion } from '../../utils/callApi';

class QuestionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            modal: false,
            query: "",
            helpText: "",
            optionOne: "",
            optionTwo: ""
        }

        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleFormInput = this.handleFormInput.bind(this);
        this.handleSurveySubmit = this.handleSurveySubmit.bind(this);
    }

    componentDidMount() {
        getSurveyQuestions(this.props.token, this.props.surveyId).then((response) => {
            console.log(JSON.stringify(response));
            this.setState({ questions: response });
        })
    }

    handleModalClose() {
        this.setState({ modal: false,
            query: "",
            helpText: "",
            optionOne: "",
            optionTwo: "" });
    }

    handleFormInput(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }

    handleSurveySubmit() {
        createQuestion(this.props.token, this.props.surveyId, this.state.query, this.state.helpText, this.state.optionOne, this.state.optionTwo)
            .then((response) => {
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
                <h3>Questions</h3>
                <Modal
                    show={this.state.modal}
                    onHide={this.handleModalClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Survey</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Query</Form.Label>
                                <Form.Control name="query" onChange={this.handleFormInput} type="text" placeholder="Query" />
                                <Form.Text className="text-muted">
                                    Does not need to be unique.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formDescription">
                                <Form.Label>Help Text</Form.Label>
                                <Form.Control name="helpText" onChange={this.handleFormInput} type="text" placeholder="Help Text" />
                            </Form.Group>

                            <Form.Group controlId="formDescription">
                                <Form.Label>Help Text</Form.Label>
                                <Form.Control name="optionOne" onChange={this.handleFormInput} type="text" placeholder="Eg: Disagree" />
                            </Form.Group>

                            <Form.Group controlId="formDescription">
                                <Form.Label>Help Text</Form.Label>
                                <Form.Control name="optionTwo" onChange={this.handleFormInput} type="text" placeholder="Eg: Agree" />
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
                    {this.state.questions.map((question, index) =>
                        (<ListGroup.Item variant="secondary">
                            <Row>
                                <Col>
                                    <h4>{question.query}</h4>
                                    <p>{question.helpText}</p>
                                    <p>Option One: {question.optionOne} | Option Two: {question.optionTwo}</p>
                                </Col>
                                <Col className="text-right">
                                    <Button onClick={() => { this.props.setQuestion(question) }}>View Question</Button>
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