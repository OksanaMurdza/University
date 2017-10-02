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

import './style.scss'


class GeneratorFile extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            value: 0,
            options: ['Аэропорт','Рейс','Самолёт'],
            second_options: [
                ['ID', 'Название', 'Город'],
                ['ID перевозчика','Год основания','Название'],
                ['ID','Модель','Вместимость']
            ],
            allData: '',
            arr: []
        }
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
  
  
    
    takeInputData() {
        let currentOption = this.state.options[this.state.value];
        let buff = {};
        let newData;
    
        
        this.state.second_options[this.state.value].map((item) => {
            let value = ReactDOM.findDOMNode(this.refs[`${item}`]).value;
            buff[`${item}`] = value;
        });

        
        if (this.state.arr.length === 0) {
            newData = {[`${currentOption}`]: []};
        }
        else {
            newData = this.state.arr;
            !this.state.arr[`${currentOption}`] ? newData[[`${currentOption}`]] = [] : null;
        }
        
        newData[`${currentOption}`].push(buff);
        let  newOption =  'data:' + "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(newData));
    
        this.setState({allData: newOption, arr: newData}, () => {});
    
    }
    
    
    
    render() {
        const inputItem = this.state.second_options[this.state.value];
        return (
            <div className="Login__wrapper">
                <h3>Генерация файла для загрузки в базу данных</h3>
                <span>Выберите "измерение":</span>
                        <select value={this.state.value} onChange={::this.handleChange}>
                            {
                                this.state.options.map((item, index) => {
                                    return <option value={index} key={index}>{item}</option>
                                })
                            }
                        </select>
                <br/>
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
                    <button onClick={::this.takeInputData}>press</button>
                <a href={this.state.allData} download="data.json">download</a>
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