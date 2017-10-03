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
import ModalWindow from '../../User interface/modal'

// import './style.scss'


class View extends Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            requestData: []
        }
    }
    
    handleChange(e) {
        ::this.takeData(e.target.value);
        
        const { select_value } = this.props.GeneratorActions;
        select_value(e.target.value);
    }
    
    componentWillMount() {
        ::this.takeData(0)
    }
    
    takeData(value) {
        fetch(`http://192.168.1.103:3000/api/generator?requestValue=${value}`, {
                method: 'POST',
            }
        )
            .then(d => d.json())
            .then(d => {
                this.setState({
                    requestData: d.data
                });
                return d
            })
    }
    
    render() {
        const { options, second_options, value } = this.props.generator;
        const characteristic = second_options[value];
    
        return (
            <div>
                <h3>Выберете то, что нужное отобразить </h3>
                <span>Выберите "измерение":</span>
                <select value={value} onChange={::this.handleChange}>
                    {
                        options.map((item, index) => {
                            return <option value={index} key={index}>{item}</option>
                        })
                    }
                </select>
                <br/>
                {
                    Object.values(this.state.requestData).map((item, index) => {
                        let buff = [];
                        Object.values(item).map((item, index) => {
                            buff.push (
                                <div key = {index}>
                                    {characteristic[index]}: {item}
                                </div>
                            )
                        });
                        buff.push(<hr/>)
                        return buff
                    })
                }
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
 * @returns {{GeneratorActions: (ActionCreator<any> | ActionCreatorsMapObject)}}
 */
function mapDispatchToProps(dispatch) {
    return {
        GeneratorActions: bindActionCreators(GeneratorActions, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(View));