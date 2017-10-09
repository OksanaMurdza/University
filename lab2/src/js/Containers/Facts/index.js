/***
 *  Рейс:
 *      1) ID аэропорта отправки
 *      2) ID аэропорта прилёта
 *      3) ID Самолёта
 *      4) ID перевозчика
 *      5) Статус
 *      6) Дата
 *
 *
 *  Аэропорт:
 *      1) Название
 *      2) ID
 *      3) Город
 *
 *
 *  Перевозчик:
 *      1) Название
 *      2) Год основания
 *      3) ID перевозчика
 *
 *
 *  Самолёт:
 *      1) ID
 *      2) Модель
 *      3)Вместимость
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as GeneratorActions from '../../REDUX/ducks/GeneratorActions'
import * as ViewActions from '../../REDUX/ducks/ViewActions'
import ModalWindow from '../../User interface/modal'

import './style.scss'


class View extends Component {
    
    
    render() {

        return (
            <div id="FactsContainer">
                <h5>FactsContainer</h5>
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
        generator: state.generator,
        view: state.view
    }
}

/**
 * @default - default give access to common action
 * @param dispatch
 * @returns {{GeneratorActions: (ActionCreator<any> | ActionCreatorsMapObject)}}
 */
function mapDispatchToProps(dispatch) {
    return {
        GeneratorActions: bindActionCreators(GeneratorActions, dispatch),
        ViewActions: bindActionCreators(ViewActions, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(View));