import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Transition, Trail } from 'react-spring/renderprops'
import { UI_MODES } from '../../utils/constants';
import AccessForm from './../access-form'
import { Button, Container } from 'react-bootstrap';
import { setUiMode } from '../../redux/actions';
import { centerFlexBox} from '../../Styles'

class UiController extends Component {

    uiMap = {
        [UI_MODES.LOGIN]: (<AccessForm />),
        [UI_MODES.LOADING]: (<h1><Button onClick={() => { this.props.dispatch(setUiMode(UI_MODES.LOGIN))}}>Hello</Button></h1>)
    }

    render() {
        return(
            <div style={ centerFlexBox }>
        <Transition
            config={{mass:1, tension: 250, friction: 15}}
            items={this.props.uiMode}
            from={{ position: 'absolute', width: '100%', opacity: 0, transform: 'translate3d(0,-50%,0)' }}
            enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
            leave={{ position: 'absolute', opacity: 0, transform: 'translate3d(0,50%,0)' }}
            >
            {mode =>
                    props => <div style={props}>{this.uiMap[mode]}</div>
            }
        </Transition>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        uiMode: state.uiMode
    }
}

export default connect(mapStateToProps)(UiController);