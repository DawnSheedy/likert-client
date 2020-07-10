import { connect } from 'react-redux'
import React, { Component } from 'react'
import DashNav from './dash-nav'

class AdminRouter extends Component {
constructor(props) {
    super(props)

    this.state = {
        survey: "",
        invite: "",
        question: "",
        answer: ""
    }
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

    render() {
        return (<div>
            <DashNav name={this.props.user.firstName}/>
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