import React from 'react';
import Header from './Navbar';
import AccessForm from './components/access-form';
import UIController from './components/ui-controller'
import { Container } from 'react-bootstrap';
import { bodyContainer } from './Styles';
import { connect } from 'react-redux'

class App extends React.Component {
    state = {
        userState: {
            active: false,
            firstName: "Dawn",
            lastName: "",
            apiToken: "",
            surveyCode: ""
        }
    }

    render() {
        return (
            <div className="App">
                {/*<Header style={{ zIndex: '999' }} userState={this.state.userState} />*/}
                <Container style={bodyContainer}>
                    <UIController />
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        uiMode: state.uiMode
    }
}

export default connect(mapStateToProps)(App);