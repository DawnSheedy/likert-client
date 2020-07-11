import { connect } from 'react-redux'
import React, { Component } from 'react'
import DashNav from './dash-nav'
import { Transition } from 'react-spring/renderprops'

class AdminRouter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            survey: "",
            invite: "",
            question: "",
            answer: "",
            page: ""
        }
    }

    setPage(page) {
        this.setState({ page })
    }

    setSurvey(survey) {
        this.setState({ survey })
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

    renderSection() {

    }

    render() {
        return (<div>
            <DashNav setPage={this.setPage} name={this.props.user.firstName} />
            <Transition
                config={{ mass: 1, tension: 250, friction: 25 }}
                items={this.state.page}
                from={{ height: '0', opacity: 0, transform: 'translate3d(0,-50%,0)' }}
                enter={{ height: '100%', opacity: 1, transform: 'translate3d(0,0px,0)' }}
                leave={{ height: '0%', opacity: 0, transform: 'translate3d(0,50%,0)' }}
            >
                {mode =>
                    props => <div style={{ ...props, ...{ padding: '20px' } }}>
                        
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
        user: state.user
    }
}

export default connect(
    mapStateToProps)
    (AdminRouter);