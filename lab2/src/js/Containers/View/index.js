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
    
    constructor(props) {
        super(props);
        
        this.state = {
            editItem: ''
        }
    }
    
    /**
     * @desc: select in dropdown
     * @param: e
     * @redux: save data to --> value
     */
    handleChange(e) {
        ::this.takeData(e.target.value);
        
        const { select_value } = this.props.GeneratorActions;
        select_value(e.target.value);
    }
    
    /**
     * @desc: default request to dataBase and save first option select
     */
    componentWillMount() {
        ::this.takeData(0)
    }
    
    /**
     * @desc: request to dataBase and save REDUX
     * @param: value - table name
     * @redux: save data to --> request_data
     */
    takeData(value) {
        const { request_data } = this.props.ViewActions;
        
        fetch(`http://192.168.1.100:3000/api/generator?requestValue=${value}`, {
                method: 'POST',
            })
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
        
        fetch('http://192.168.1.100:3000/api/upload', {
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
        const { value } = this.props.generator;
    
        // clear dataBase
        for (let i = 0; i < 3; i++) {
            fetch(`http://192.168.1.100:3000/api/delete?requestValue=${i}`, {
                method: 'POST',
            })
                .then(d => d.json())
                .then(d => {
                    ::this.takeData(i)
                })
                .catch((err) => console.log(err));
        }

        // upload new data to dataBase
        let data = this.props.view.dataFromFile;
        let keys = Object.keys(data);
        Object.values(data).map((item, index) => {
            fetch(`http://192.168.1.100:3000/api/uploadFileData?requestValue=${keys[index]}&data=${JSON.stringify(item)}`, {
                    method: 'POST',
                })
                    .then(d => d.json())
                    .then(d => {
                        ::this.takeData(value)
                    })
                    .catch((err) => console.log(err));
        });
    }
    
    edit(e) {
        const { edit_item } = this.props.ViewActions;
    
        edit_item(e.target.id);
    }
    
    
    delete(e) {
        const { value, options } = this.props.generator;
        const { request_data } = this.props.view;
    
        let newData = [];
    
        fetch(`http://192.168.1.100:3000/api/delete?requestValue=${value}`, {
            method: 'POST',
        })
            .catch((err) => console.log(err));
    
    
        request_data.map((item, index) => {
            if (index != e.target.id)
                newData.push(item)
        });
    
        fetch(`http://192.168.1.100:3000/api/uploadFileData?requestValue=${options[value]}&data=${JSON.stringify(newData)}`, {
            method: 'POST',
        })
            // .then(() => this.update())
            .catch((err) => console.log(err));
    }
    
    save() {
        const { value, second_options, options } = this.props.generator;
        const { request_data, editItem } = this.props.view;
        const { edit_item } = this.props.ViewActions;
    
        let buff = {};
        let newData = [];
    
            fetch(`http://192.168.1.100:3000/api/delete?requestValue=${value}`, {
                method: 'POST',
            })
                .catch((err) => console.log(err));
        
        second_options[value].map((item) => {
            buff[`${item}`] = ReactDOM.findDOMNode(this.refs[`${item}`]).value;
            ReactDOM.findDOMNode(this.refs[`${item}`]).value = '';
        });

        request_data.map((item, index) => {
            if (index != editItem) {
                newData.push(item)
            } else {
                newData.push(buff)
            }
        });


        fetch(`http://192.168.1.100:3000/api/uploadFileData?requestValue=${options[value]}&data=${JSON.stringify(newData)}`, {
            method: 'POST',
        })
            .then(() => edit_item(''))
            .catch((err) => console.log(err));
    }
    
    update() {
        const { value } = this.props.generator;
    
        this.takeData(value);
    }
    
    render() {
        const { options, second_options, value } = this.props.generator;
        const { drawData, request_data, editItem } = this.props.view;
        const characteristic = second_options[value];
    
        return (
            <div id="ViewContainer">
                 <button id="nextRoute">
                     <Link id="Link" to="/generator">Перейти к генерации JSON файла</Link>
                 </button>
                <button onClick={::this.update}>
                    <img src="../../../assets/img/loop.svg" alt="loop update"/>
                </button>
                <br/>
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
                        buff.push(<button id={index} className="edit" onClick={::this.edit}>press to edit </button>);
                        buff.push(<button id={index} className="delete" onClick={::this.delete}>press to delete </button>);
                        Object.values(item).map((item, index) => {
                            buff.push (
                                <div key = {index}>
                                    <span id="colorField">{characteristic[index]}</span>: {item}
                                </div>
                            )
                        });
                        buff.push(<hr/>);
                        return buff
                    })
                }
    
                <br/>
                
                
                   <div className={editItem != '' ? "input" : "hide"}>
                       {
                           characteristic.map((item, index) => {
                               return(
                                   <div key={index}>
                                       {item}
                                       <input type="text"  ref={item}/>
                                   </div>
                               )
                           })
                       }
                   </div>
                
                
                <button onClick={::this.save}>save data</button>
                
                
                <div id="newData">
                    <input id='file-input' type='file' accept='.json'
                           onChange={::this.uploadFile}
                    />
                    <div>
                        <button id="save" onClick={::this.saveToDataBase}>Загрузить JSON данные</button>
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