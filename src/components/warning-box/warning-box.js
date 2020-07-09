import React, { Component } from 'react';
import {Transition} from 'react-spring/renderprops'
import {Alert} from 'react-bootstrap'

class WarningBox extends Component {

    render() {
        return (<Transition
            items={this.props.warning}
            config={{ mass: 1, tension: 250, friction: 15 }}
            from={{ opacity: 0, maxHeight: 0, overflow: 'hidden', transform: 'translate3d(0,100%,0)' }}
            enter={{ opacity: 1, maxHeight: 200, transform: 'translate3d(0,0,0)' }}
            leave={{ opacity: 0, maxHeight: 0, transform: 'translate3d(0,-100%,0)' }}>
            {warning => warning && (props => <div style={props}>
                <Alert variant="danger">
            <Alert.Heading>{this.props.warning}</Alert.Heading>
                    <p>
                        {this.props.subtitle}
                            </p>
                </Alert>
            </div>)}
        </Transition>)
    }
}

export default WarningBox;