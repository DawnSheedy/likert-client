import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'

export default class DashNav extends Component {
    render() {
        return (
            <div style={{ padding: '10px' }}>
                <Nav variant="pills" defaultActiveKey="/survey">
                    <Nav.Item>
                        <Nav.Link disabled><h4>Hello, {this.props.name}</h4></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="survey" onClick={this.props.setPage("survey")} href="#/survey">Surveys</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="invite" onClick={this.props.setPage("invite")}>Invites</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="question" onClick={this.props.setPage("question")}>
                            Questions
                    </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="answer" onClick={this.props.setPage("answer")}>
                            Answers
                    </Nav.Link>
                    </Nav.Item>
                </Nav>
                <hr />
            </div>
        )
    }
}