import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as GeneratorActions from '../../REDUX/ducks/GeneratorActions'
import ModalWindow from '../../User interface/modal'

import './style.scss'

class GeneratorFile extends Component {
    
    render() {
        console.log('this >>>>', this);
        return (
            <div className="Login__wrapper">
               kek
            </div>
        )
    }
}

    /**
        * @default - default give access to redux
        * @param state
        * @returns {{auth: {common, with auth, reducer} }}
    */
    function mapStateToProps(state) {
    return {
        generator: state.generator
    }
}

    /**
        * @default - default give access to common action
        * @param dispatch
        * @returns {{AuthActions: (ActionCreator<any> | ActionCreatorsMapObject)}}
     */
    function mapDispatchToProps(dispatch) {
    return {
        AuthActions: bindActionCreators(GeneratorActions, dispatch)
    }
}

    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GeneratorFile));