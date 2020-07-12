import { connect } from 'react-redux'
import React, { Component } from 'react'
import DashNav from './dash-nav'
import { Transition } from 'react-spring/renderprops'
import SurveyList from './survey-list'
import SurveyView from './survey-view'
import { Row, Col } from 'react-bootstrap'
import { centerFlexBox } from '../../Styles'

class AdminRouter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            survey: {},
            invite: {},
            question: {},
            answer: {},
            page: "surveylist"
        }

        this.setPage = this.setPage.bind(this);
        this.renderSection = this.renderSection.bind(this);
        this.setSurvey = this.setSurvey.bind(this);
    }

    setPage(page) {
        this.setState({ page })
    }

    setSurvey(survey) {
        this.setState({ survey })
        if (survey) {
            this.setPage("survey")
        } else {
            this.setPage("surveylist")
        }
    }

    setInvite(invite) {
        this.setState({ invite })
    }

    setQuestion(question) {
        this.setState({ question })
    }

    setAnswer(answer) {
        this.setState({ answer })
    }

    renderSection(page) {
        if (page === "surveylist") {
            return (<SurveyList setSurvey={this.setSurvey}/>)
        }
        if (page === "survey") {
            return (<SurveyView setSurvey={this.setSurvey} survey={this.state.survey}/>)
        }
    }

    render() {
        return (<div style={centerFlexBox}>
            {/*<DashNav setPage={this.setPage} name={this.props.user.firstName} />*/}
            <Transition
                    config={{ mass: 1, tension: 250, friction: 25 }}
                    items={this.state.page}
                    from={{ height: '0%', position: 'absolute', width: '100%', opacity: 0, transform: 'translate3d(-50%,0,0)' }}
                    enter={{ height: '100%', opacity: 1, transform: 'translate3d(0,0,0)' }}
                    leave={{ height: '0%', position: 'absolute', opacity: 0, transform: 'translate3d(50%,0,0)' }}
                >
                    {mode =>
                        props => <div style={{...props, ...{ padding: '20px'}}}>
                            <Row className="align-items">
                                <Col sm={{ span: 12 }} md={{ span: 8, offset: 2 }}>{this.renderSection(this.state.page)}
                                </Col>
                            </Row>
                        </div>

                    }
                </Transition>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        uiMode: state.uiMode,
        authMode: state.authMode,
        user: state.user,
        token: state.token
    }
}

export default connect(
    mapStateToProps)
    (AdminRouter);