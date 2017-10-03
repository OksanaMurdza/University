import React, {Component} from 'react'
import * as AuthActions from '../REDUX/ducks/GeneratorActions'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import 'scss/user interface styles/modalWindow.scss';


 class ModalWindow extends Component {

     /**
      * @desc - render function // component render <select /> tag
      * @returns {XML}
      */
    render() {
       
       return(
            <h2>kek</h2>
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
        auth: state.auth
    }
}

/**
 * @default - default give access to common action
 * @param dispatch
 * @returns {{AuthActions: (ActionCreator<any> | ActionCreatorsMapObject)}}
 */
function mapDispatchToProps(dispatch) {
    return {
        AuthActions: bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);