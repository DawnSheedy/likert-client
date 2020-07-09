import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Row, Col } from 'react-bootstrap'
import QuestionCard from './QuestionCard'
import { Transition } from 'react-spring/renderprops'
import { setUiMode } from '../../redux/actions'
import { UI_MODES } from '../../utils/constants'
import { centerFlexBox } from '../../Styles'

class SurveyCompletion extends Component {
    constructor(props) {
        super()
        this.state = {
            index: 0
        }

        this.nextQuestion = this.nextQuestion.bind(this)
    }

    nextQuestion() {
        if (this.state.index+1 === this.props.activeSurvey.questions.length) {
            this.props.dispatch(setUiMode(UI_MODES.SURVEY_END));
            return;
        }
        this.setState({ index: this.state.index+1 });
    }

    render() {
        return (
            <div style={centerFlexBox}>
                <Transition
                    config={{ mass: 1, tension: 250, friction: 25 }}
                    items={this.state.index}
                    from={{ position: 'absolute', width: '100%', opacity: 0, transform: 'translate3d(0,-50%,0)' }}
                    enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
                    leave={{ position: 'absolute', opacity: 0, transform: 'translate3d(0,50%,0)' }}
                >
                    {mode =>
                        props => <div style={{...props, ...{ padding: '20px'}}}>
                                    <QuestionCard nextQuestion={this.nextQuestion} index={this.state.index}></QuestionCard>
                        </div>

                    }
                </Transition>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeSurvey: state.activeSurvey,
        user: state.user,
        authToken: state.authToken
    }
}

export default connect(mapStateToProps)(SurveyCompletion)