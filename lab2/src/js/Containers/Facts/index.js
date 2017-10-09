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
import ReactDOM from 'react-dom'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalWindow from '../../User interface/modal'

import * as GeneratorActions from '../../REDUX/ducks/GeneratorActions'
import * as ViewActions from '../../REDUX/ducks/ViewActions'
import * as FactsActions from '../../REDUX/ducks/FactsActions'

import './style.scss'
import {request_data} from "../../REDUX/ducks/ViewActions";


class View extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            editItem: 0,
            draw: '',
            newItem: ''
        };
        
    }
    
    componentWillMount() {
        ::this.takeData()
    }
    
    takeData() {
        const {take_facts_data} = this.props.FactsActions;
        const {request_data} = this.props.ViewActions;
        
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
            
            fetch(`http://192.168.1.102:3000/api/generator?requestValue=${i}`, {
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
        const {facts_data} = this.props.facts;
        const {take_facts_data} = this.props.FactsActions;
    
    
        let currentItem = this.state.editItem;
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
        const {facts_data} = this.props.facts;
        const {request_data} = this.props.view;
        
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
        
        this.setState({
            editItem: e.target.id,
            draw: draw
        })
    }
    
    delete(e) {
        console.log('e.target.id >>>>', e.target.id);
    }
    
    
    save() {
        const {facts_data} = this.props.facts;
    
        fetch(`http://192.168.1.102:3000/api/delete?requestValue=3`, {
            method: 'POST',
        })
            .catch((err) => console.log(err));

        fetch(`http://192.168.1.102:3000/api/uploadFileData?requestValue=facts&data=${JSON.stringify(facts_data)}`, {
            method: 'POST',
        })
            .then(() => console.log('save >>>>'))
            .catch((err) => console.log(err));
    }
    
    
    render() {
        const {facts_data} = this.props.facts;
        const editItem = this.state.editItem;
        let buff = [];
        let itterationKey = 0;
        // let kek = Object.values(facts_data)
        
        // console.log('kek >>>>', kek);
        
        return (
            <div id="FactsContainer">
                <h5>FactsContainer</h5>
                {
                    Object.values(facts_data).map((i, itter) => {
                        buff = [];
                        let keys = Object.keys(i);
                        
                        Object.values(i).map((item, index) => {
                            buff.push(<p key={itterationKey}>{keys[index]}: {item}</p>);
                            itterationKey++;
                        });
                        
                        buff.push(<button key={itterationKey++} id={itter} onClick={::this.edit}>edit</button>);
                        buff.push(<button key={itterationKey++} id={itter} onClick={::this.delete}>delete</button>);
                        buff.push(<hr/>);
                        
                        return buff;
                    })
                }
                <h3>edit section</h3>
                {this.state.draw}
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