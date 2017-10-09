import React, {Component} from 'react'
import * as MapActions from '../REDUX/ducks/map'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import 'scss/user interface styles/spinner.scss';
import 'scss/user interface styles/modalWindow.scss';


 class Spinner extends Component {
    componentDidUpdate() {
        let view = this.props.map.spinnerView

        if (!view) {
            this.refs.spinner.classList.add('commonStyle--modal__close')
        }

    }


    render() {
        return (
            <center>
                <div  ref="spinner">
                    <div className="spinner"></div>
                </div>
            </center>
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
        map: state.map
    }
}

/**
 * @default - default give access to common action
 * @param dispatch
 * @returns {{AuthActions: (ActionCreator<any> | ActionCreatorsMapObject)}}
 */
function mapDispatchToProps(dispatch) {
    return {
        MapActions: bindActionCreators(MapActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Spinner);