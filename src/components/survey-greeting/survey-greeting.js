import React, { Component } from 'react'
import { connect } from 'react-redux'

class SurveyGreeting extends Component {
    render() {
        return(<h1>Hello</h1>)
    }
}

const mapStateToProps = state => {
    return {
        survey: state.survey,
        user: state.user
    }
}

export default connect(mapStateToProps)(SurveyGreeting);