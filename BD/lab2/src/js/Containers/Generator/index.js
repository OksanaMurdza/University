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

import './style.scss'


class GeneratorFile extends Component {
    
    handleChange(e) {
        const { select_value } = this.props.GeneratorActions;
        
        select_value(e.target.value);
    }
  
    takeInputData() {
        const { value, options, second_options, data} = this.props.generator;
        const { save_data, make_link } = this.props.GeneratorActions;
        
        let currentOption = options[value];
        let buff = {};
        let newData;
    
        second_options[value].map((item) => {
            buff[`${item}`] = ReactDOM.findDOMNode(this.refs[`${item}`]).value;
            ReactDOM.findDOMNode(this.refs[`${item}`]).value = '';
        });

        
        if (data.length === 0) {
            newData = {[`${currentOption}`]: []};
        }
        else {
            newData = data;
            !data[`${currentOption}`] ? newData[[`${currentOption}`]] = [] : null;
        }
        
        newData[`${currentOption}`].push(buff);
        let  newOption =  'data:' + "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(newData));
        
        save_data(newData);
        make_link(newOption);
    }
    
    
    
    render() {
        const { options, second_options, value, link } = this.props.generator;
        const inputItem = second_options[value];
        
        return (
            <div id="GeneratorView">
                <Link id="Link" to="/view">
                    <button id="nextRoute">
                        Перейти к просмотру измерений
                    </button>
                </Link>
                
                <h3>Генерация файла для загрузки в базу данных</h3>
                <span>Выберите "измерение":</span>
                        <select value={value} onChange={::this.handleChange}>
                            {
                                options.map((item, index) => {
                                    return <option value={index} key={index}>{item}</option>
                                })
                            }
                        </select>
                <br/>
    
                <div className="input">
                    {
                        inputItem.map((item, index) => {
                            return(
                                <div key={index}>
                                    {item}
                                    <input type="text"  ref={item}/>
                                </div>
                            )
                        })
                    }
                </div>
                    <button onClick={::this.takeInputData}>save</button>
                <a href={link} download="data.json">
                    <div id="download">
                        download
                        <img src="../../../assets/img/cloud-computing.svg" alt="download"/>
                    </div>
                </a>
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

    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GeneratorFile));