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

import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as GeneratorActions from '../../REDUX/ducks/GeneratorActions'
import * as ViewActions from '../../REDUX/ducks/ViewActions'
import * as FactsActions from '../../REDUX/ducks/FactsActions'

import './style.scss'


class Facts extends Component {
    
    componentWillMount() {
        ::this.takeData()
    }
    
    takeData() {
        const { take_facts_data } = this.props.FactsActions;
         const { request_data } = this.props.ViewActions;
        
        let buff = [];
        for (let i = 0; i < 4; i++) {
            let reqString = '';
            
            switch (i) {
                case 0:
                    reqString = 'airport';
                    break;
                case 1:
                    reqString = 'carrier';
                    break;
                case 2:
                    reqString = 'plane';
                    break;
                case 3:
                    reqString = 'facts';
                    break;
                
                default:
                    return;
            }
            
            fetch(`http://192.168.1.103:3000/api/generator?requestValue=${i}`, {
                method: 'POST',
            })
                .then(d => d.json())
                .then(d => {
                    if (i === 3) {
                        take_facts_data(d.data)
                    } else {
                        let obj = {};
                        obj[`${reqString}`] = d.data;
                        buff.push(obj);
                    }
                })
                .catch((err) => console.log(err));
            
        }
        request_data(buff);
    }
    
    handleChange(e) {
        const {facts_data, editItem} = this.props.facts;
        const {take_facts_data} = this.props.FactsActions;
    
    
        let currentItem = editItem;
        let buff = [];
        let fieldName = e.target.id;
        let newValue = e.target.value;
        
        for (let i = 0; i < facts_data.length; i++) {
            if (i === +currentItem) {
                let kek = {...facts_data[i],[`${fieldName}`]: newValue};
                // console.log('kek >>>>', kek);
                buff.push(kek);
            }
            else {
                buff.push(facts_data[i]);
            }
        }
    
        take_facts_data(buff);
    }
    
    edit(e) {
        const { draw_facts, edit_item } = this.props.FactsActions;
    
        const { facts_data } = this.props.facts;
        const { request_data } = this.props.view;
       
        
        let itterationKey = 0;
        let keys = Object.keys(facts_data[e.target.id]);
        
        let draw = Object.values(facts_data[e.target.id]).map((i, itter) => {
        let indexView;
            
            let buff = [];
            let keyReq = Object.values(request_data).map((i) => {
                return Object.keys(i)
            });
            buff.push(
                <div key={itter + 1000}>
                    {keys[itter]}: {i}
                    <select onChange={::this.handleChange} id={keys[itter]}>
                        {
                            keyReq.map((item, index) => {
                                if (keys[itter].indexOf(item[0]) != -1) {
                                    return Object.values(request_data[index]).map((i) => {
                                        return Object.values(i).map(huh => {
                                            let kek = Object.keys(huh);
                                            kek.map((item, index) => {
                                                if (item === 'id')
                                                    indexView = index;
                                            });
                                            return Object.values(huh).map((finalItem, index) => {
                                                if (index === indexView) {
                                                    return  Object.keys(huh).map((item) => {
                                                        if (item === 'id') {
                                                            return (
                                                                <option>
                                                                    {finalItem}
                                                                </option>
                                                            )
                                                        }
                                                    });
                                                }
                                            })
                                        })
                                    })
                                }
                            })
                        }
                    </select>
                </div>
            );
            return buff;
        });
        
        draw.push(<button key={itterationKey++} onClick={::this.save}>save</button>);
    
    
        draw_facts(draw);
        edit_item(+e.target.id);
    }
    
    delete(e) {
        const {take_facts_data} = this.props.FactsActions;
        const {facts_data} = this.props.facts;
        
        const buff = facts_data.filter((item, index) => {
            if (index != e.target.id)
                return item
        });
    
        take_facts_data(buff);
    
        
        fetch(`http://192.168.1.103:3000/api/delete?requestValue=3`, {
            method: 'POST',
        })
            .catch((err) => console.log(err));

        fetch(`http://192.168.1.103:3000/api/uploadFileData?requestValue=facts&data=${JSON.stringify(buff)}`, {
            method: 'POST',
        })
            .then(() => console.log('save >>>>'))
            .catch((err) => console.log(err));
    }
    
    
    save() {
        const {facts_data} = this.props.facts;
        let id_arr = [];
        let flag = true;
        
        Object.values(facts_data).map((i) => {
            let keys = Object.keys(i);
            Object.values(i).map((item, index) => {
                if (keys[index] === 'id_plane')
                    id_arr.push(item);
            })
        });

        
        for (let i = 0; i < id_arr.length; i++)
            for (let j = i + 1; j < id_arr.length; j++)
                id_arr[i] == id_arr[j] ? flag = false : null;

        
        if (flag) {
            fetch(`http://192.168.1.103:3000/api/delete?requestValue=3`, {
                method: 'POST',
            })
                .catch((err) => console.log(err));
    
    
            fetch(`http://192.168.1.103:3000/api/uploadFileData?requestValue=facts&data=${JSON.stringify(facts_data)}`, {
                method: 'POST',
            })
                .then(() => console.log('save >>>>'))
                .catch((err) => console.log(err));
        } else {
            console.error('Нельзя, чтобы самолёт участвовал в нескольких рейсах!')
        }
    }
    
    close() {
        const { edit_item } = this.props.FactsActions;
    
        edit_item(' ');
    }
    
    openInputPanel() {
        const { input_panel } = this.props.FactsActions;
    
        input_panel(true);
    
        ::this.addNewFacts();
    }
    
    closeInputPanel() {
        const { input_panel } = this.props.FactsActions;
    
        input_panel(false);
    }
    
    
    addNewFacts() {
        const { facts_data } = this.props.facts;
        const { take_facts_data } = this.props.FactsActions;
    
        
        let keys = Object.keys(facts_data[0]);
        let buff = {};
        
        keys.map((item) => {
            buff[`${item}`] = ReactDOM.findDOMNode(this.refs[`${item}`]).value;
            ReactDOM.findDOMNode(this.refs[`${item}`]).value = '';
        });

        
        let newData = facts_data;
        newData.push(buff);
    
        take_facts_data(newData);
    
        this.save();
    }
    
    
    render() {
        const {facts_data, draw, editItem, inputPanel} = this.props.facts;
    
        let buff = [];
        let itterationKey = 0;

        
        return (
            <div id="FactsContainer">
                <button id="nextRoute">
                    <Link id="Link" to="/view">Перейти к просмотру измерений</Link>
                </button>
                <br/>
                <button onClick={::this.takeData}>
                    <img src="../../../assets/img/loop.svg" alt="loop update"/>
                </button>
                
                <button onClick={::this.openInputPanel}>
                    <img src="../../../assets/img/plus.svg" alt="loop update"/>
                </button>
                {
                    Object.values(facts_data).map((i, itter) => {
                        buff = [];
                        let keys = Object.keys(i);
                        
                        Object.values(i).map((item, index) => {
                            buff.push(<p key={itterationKey}>{keys[index]}: {item}</p>);
                            itterationKey++;
                        });
                        
                        buff.push(<button key={itterationKey++} className="edit" id={itter} onClick={::this.edit}>edit</button>);
                        buff.push(<button key={itterationKey++} className="delete" id={itter} onClick={::this.delete}>delete</button>);
                        buff.push(<hr/>);
                        
                        return buff;
                    })
                }
                <div className={editItem !== ' ' ? '' : 'hide'}>
                    <button onClick={::this.close}>
                        x
                    </button>
                    <h3>edit section</h3>
                    {draw}
                </div>
                <div className={'hide'}>
                    <button onClick={::this.closeInputPanel}>
                        x
                    </button>
                    {
                        Object.values(facts_data).map((i, itter) => {
                            buff = [];
                            let keys = Object.keys(i);
            
                            if (itter > 0)
                                return;
            
                            Object.values(i).map((item, index) => {
                                buff.push(
                                    <input
                                        key={itterationKey++}
                                        type="text"
                                        ref={keys[index]}
                                        placeholder={keys[index]}
                                    />);
                            });
            
                            return buff;
                        })
                            // ::this.addNewFacts()
                    }
                    <button onClick={::this.addNewFacts}>save</button>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Facts));