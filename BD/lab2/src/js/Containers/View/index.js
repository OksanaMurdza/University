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
import * as FactsActions from '../../REDUX/ducks/FactsActions'

import './style.scss'


class View extends Component {
    
    
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
    componentDidMount() {
        ::this.takeData(0)
    }
    
    componentWillMount() {
        ::this.takeData(3)
    }
    
    /**
     * @desc: request to dataBase and save REDUX
     * @param: value - table name
     * @redux: save data to --> request_data
     */
    takeData(value) {
        const { request_data } = this.props.ViewActions;
        const { take_facts_data } = this.props.FactsActions;
    
    
        fetch(`http://192.168.1.102:3000/api/generator?requestValue=${value}`, {
                method: 'POST',
            })
            .then(d => d.json())
            .then(d => {
                if (value === 3)
                    take_facts_data(d.data);
                else
                    request_data(d.data);
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
        
        fetch('http://192.168.1.102:3000/api/upload', {
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
            fetch(`http://192.168.1.102:3000/api/delete?requestValue=${i}`, {
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
            fetch(`http://192.168.1.102:3000/api/uploadFileData?requestValue=${keys[index]}&data=${JSON.stringify(item)}`, {
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
        const  requestData  = this.props.ViewActions.request_data;
        const {facts_data} = this.props.facts;
    
        let newData = [];
        let flag = true;
    

        Object.values(request_data[e.target.id]).map((item) => {
            Object.values(item).map((reqData) => {
                Object.values(facts_data).map((item) => {
                    let key = Object.keys(item);
                    Object.values(item).map((item, index) => {
                        if (reqData == item && !!~key[index].indexOf('id')) {
                            flag = false;

                            console.error('Нельзя удалять это измерение :с')
                        }
                    })
                });
            })
        });

        
        if (flag) {
            
            fetch(`http://192.168.1.102:3000/api/delete?requestValue=${value}`, {
                method: 'POST',
            })
                .catch((err) => console.log(err));
    
    
            request_data.map((item, index) => {
                if (index != e.target.id)
                    newData.push(item)
            });
    
            fetch(`http://192.168.1.102:3000/api/uploadFileData?requestValue=${options[value]}&data=${JSON.stringify(newData)}`, {
                method: 'POST',
            })
                .catch((err) => console.log(err));
    
            requestData(newData);
        }
    }
    
    save() {
        const { value, second_options, options } = this.props.generator;
        const { request_data, editItem } = this.props.view;
        const { edit_item } = this.props.ViewActions;
    
        let buff = {};
        let newData = [];
    
        fetch(`http://192.168.1.102:3000/api/delete?requestValue=${value}`, {
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


        fetch(`http://192.168.1.102:3000/api/uploadFileData?requestValue=${options[value]}&data=${JSON.stringify(newData)}`, {
            method: 'POST',
        })
            .then(() => edit_item(''))
            .catch((err) => console.log(err));
    }
    
    update() {
        const { value } = this.props.generator;
    
        this.takeData(value);
    }
    
    close() {
        const { edit_item } = this.props.ViewActions;
    
        edit_item('');
    }
    
    render() {
        const { options, second_options, value } = this.props.generator;
        const { drawData, request_data, editItem } = this.props.view;
        const characteristic = second_options[value];
    
        return (
            <div id="ViewContainer">
                <Link id="Link" to="/generator">
                    <button id="nextRoute">
                        Перейти к генерации JSON файла
                    </button>
                </Link>
                
                <br/>
                <button id="nextRoute">
                    <Link id="Link" to="/">Перейти к просмотру фактов</Link>
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
                <button onClick={::this.update}>
                    <img src="../../../assets/img/loop.svg" alt="loop update"/>
                </button>
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
                       <p  onClick={::this.close}>x</p>
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
                       <button id="saveNewData" onClick={::this.save}>save data</button>
                   </div>
                
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
        view: state.view,
        facts: state.facts
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
        ViewActions: bindActionCreators(ViewActions, dispatch),
        FactsActions: bindActionCreators(FactsActions, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(View));