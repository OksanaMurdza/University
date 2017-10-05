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
    
    handleChange(e) {
        ::this.takeData(e.target.value);
        
        const { select_value } = this.props.GeneratorActions;
        select_value(e.target.value);
    }
    
    componentWillMount() {
        ::this.takeData(0)
    }
    
    takeData(value) {
        const { request_data } = this.props.ViewActions;
        
        fetch(`http://192.168.1.103:3000/api/generator?requestValue=${value}`, {
                method: 'POST',
            }
        )
            .then(d => d.json())
            .then(d => {
                request_data(d.data)
            })
            .catch((err) => console.log(err))
    }
    
    uploadFile(e) {
        const { data_from_file } = this.props.ViewActions;
        const file = e.target.files[0];
    
        let data;
        
        if (!file)
            return;
        
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        
        fetch('http://192.168.1.103:3000/api/upload', {
            method: 'POST',
            body: formData,
        })
            .then(d => d.json())
            .then(d => {
                data = JSON.parse(d.dataFile);
                data_from_file(data);
                this.draw();
            })
            .catch(err => console.log('err >>>>', err))
    }
    
    draw() {
        const { view_data } = this.props.ViewActions;
        let data = this.props.view.dataFromFile;
        let buff = [];
        let itterationKey = 0;
        

        let keys = Object.keys(data);
        Object.values(data).map((i, index) => {
            buff.push(<h5 key={itterationKey}>{keys[index]}</h5>);
            itterationKey++;
            Object.values(i).map((item) => {
                let second_keys = Object.keys(item);
                Object.values(item).map((el, index) => {
                    buff.push(<p key = {itterationKey} id = {!(index % 4) ? 'second' : ''}>{second_keys[index]}: {el}</p>);
                    itterationKey++;
                });
            });
            buff.push(<hr key = {itterationKey}/>);
            itterationKey++;
        });
    
        view_data(buff);
    }
    
    
    saveToDataBase() {
        console.log('saveToDataBase');
    }
    
    

    render() {
        const { options, second_options, value } = this.props.generator;
        const { drawData, request_data } = this.props.view;
        const characteristic = second_options[value];
    
        return (
            <div>
                 <button>
                     <Link to="/generator">Перейти к генерации JSON файла</Link>
                 </button>
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
                    Object.values(request_data).map((item, index) => {
                        let buff = [];
                        Object.values(item).map((item, index) => {
                            buff.push (
                                <div key = {index}>
                                    {characteristic[index]}: {item}
                                </div>
                            )
                        });
                        buff.push(<hr/>);
                        return buff
                    })
                }
    
                <div>
                    <input id='file-input' type='file' accept='.json'
                           onChange={::this.uploadFile}
                    />
                    <div>
                        <button onClick={::this.saveToDataBase}>Загрузить JSON данные</button>
                    </div>
                </div>
                {drawData}
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