import React, { Component } from 'react'
import { Card, Form, Row, Col, Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import { answerQuestion } from '../../utils/callApi'
import WarningBox from '../warning-box'

class QuestionCard extends Component {
    constructor(props) {
        super()
        this.state = {
            input: -1
        }

        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.submitQuestion = this.submitQuestion.bind(this);
    }

    handleOptionChange(event) {
        this.setState({
            input: event.target.value
        })
    }

    submitQuestion(event) {
        answerQuestion(this.props.authToken, this.props.user.id, this.props.activeSurvey.questions[this.props.index].id, parseInt(this.state.input))
            .then(value => {
                if (value.error) {
                    this.showWarning("Response is required.", "Please select a response.")
                    return
                }
                this.props.nextQuestion();
                
            })
            event.preventDefault();
    }

    showWarning(warningTitle, warningSubtitle) {
        this.setState({
            warningTitle,
            warningSubtitle
        })
        setTimeout(function () {this.setState({ warningTitle: ""})}.bind(this), 10000)
    }

    render() {
        return (
        
        <Card>
            <style type="text/css">
            {`
            .form-check {
                padding: 0;
                margin: 0;
                margin-bottom: 0px;
                align-items: center;
            }
            .form-check-input  {
                width: 50px;
                height: 50px;
                margin: 0;
                margin-bottom: 0px;
                padding: 0;
            }
            `}
        </style>
            <Card.Header>
                {this.props.user.firstName} {this.props.user.lastName} | Question {this.props.index+1} of {this.props.activeSurvey.questions.length}
            </Card.Header>
            <Card.Body>
                <Card.Title>{this.props.activeSurvey.questions[this.props.index].query}</Card.Title>
                <Card.Subtitle>{this.props.activeSurvey.questions[this.props.index].helpText}</Card.Subtitle>
                <br></br>
                <WarningBox style={{ 'margin-top': 20}} warning={this.state.warningTitle} subtitle={this.state.warningSubtitle} />
                <hr />
                <Form>
                    <Form.Group controlId="selection">
                        <Row className="text-center">
                            <Col className="text-left"><p><b>{this.props.activeSurvey.questions[this.props.index].optionOne}</b></p></Col>
                            <Col className="text-center"><p><b>Neutral</b></p></Col>
                            <Col className="text-right"><p><b>{this.props.activeSurvey.questions[this.props.index].optionTwo}</b></p></Col>
                        </Row>
                        <Row className="text-center">
                    <Col className="text-center">
                    <Form.Check style={{padding: 0, margin: 0}} checked={this.state.input === '0'} onChange={this.handleOptionChange} name="questionInput" value="0" type="radio" inline id='radio1'/>
                    <p><b>1</b></p>
                    
                    </Col>
                    <Col>
                    <Form.Check name="questionInput" checked={this.state.input === '1'} onChange={this.handleOptionChange} type="radio" value="1" inline id='radio2'/>
                    <p><b>2</b></p>
                    </Col>
                    <Col>
                    <Form.Check name="questionInput" checked={this.state.input === '2'} onChange={this.handleOptionChange} type="radio" value="2" inline id='radio3'/>
                    <p><b>3</b></p>
                    </Col>
                    <Col>
                    <Form.Check name="questionInput" checked={this.state.input === '3'} onChange={this.handleOptionChange} type="radio" value="3" inline id='radio4'/>
                    <p><b>4</b></p>
                    </Col>
                    <Col>
                    <Form.Check name="questionInput" checked={this.state.input === '4'} onChange={this.handleOptionChange} type="radio" value="4" inline id='radio5'/>
                    <p><b>5</b></p>
                    </Col>
                    </Row>
                    </Form.Group>
                    <Row>
                        <Col><Form.Text className="text-muted">
                                            Select on a scale of 1-5.
                                                </Form.Text></Col>
                                            <Col className="text-right">
                    <Button type="submit" onClick={this.submitQuestion}>{this.props.index+1 === this.props.activeSurvey.questions.length ? "Submit Survey" : "Next Question"}</Button>
                    </Col>
                    </Row>
                    </Form>
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