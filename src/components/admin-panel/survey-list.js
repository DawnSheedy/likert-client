import React, { Component } from 'react';
import { Card, ListGroup, Badge, Button, Col, Row, Modal, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getSurveyList, createSurvey } from '../../utils/callApi';

class SurveyList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            surveys: [],
            modal: false,
            title: "",
            description: ""
        }

        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleFormInput = this.handleFormInput.bind(this);
        this.handleSurveySubmit = this.handleSurveySubmit.bind(this);
    }

    componentDidMount() {
        getSurveyList(this.props.token).then((response) => {
            console.log(JSON.stringify(response));
            this.setState({ surveys: response });
        })
    }

    handleModalClose() {
        this.setState({ modal: false, title: "", description: "" });
    }

    handleFormInput(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }

    handleSurveySubmit() {
        createSurvey(this.props.token, this.state.title, this.state.description)
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
                                <Form.Label>Survey Title</Form.Label>
                                <Form.Control name="title" onChange={this.handleFormInput} type="text" placeholder="Survey Title" />
                                <Form.Text className="text-muted">
                                    Does not need to be unique.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="description" onChange={this.handleFormInput} type="text" placeholder="Survey Description" />
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


                <Card>
                    <Card.Header>
                        <Card.Title>Survey Selector</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Button onClick={() => { this.setState({ modal: true }) }}>Create New</Button>
                        <hr />
                        <ListGroup>
                            {this.state.surveys.map((survey, index) =>
                                (<ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <h4>{survey.title}</h4>
                                            <p>{survey.description}</p>
                                        </Col>
                                        <Col className="text-right">
                                            <Button onClick={() => { this.props.setSurvey(survey) }}>View Survey</Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>))}
                        </ListGroup>
                    </Card.Body>
                </Card>
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
    (SurveyList);