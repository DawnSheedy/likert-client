import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'

export default class DashNav extends Component {
    render() {
        return (
            <Nav variant="tabs" defaultActiveKey="/survey">
                <h5>Hello, {this.props.name}</h5>
                <Nav.Item>
                    <Nav.Link eventKey="survey" href="#/survey">Surveys</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="invite">Invites</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="question">
                        Questions
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="answer">
                        Answers
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }
}