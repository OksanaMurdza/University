import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as GeneratorActions from '../../REDUX/ducks/GeneratorActions'
import * as ViewActions from '../../REDUX/ducks/ViewActions'
import * as FactsActions from '../../REDUX/ducks/FactsActions'

import './style.scss'


class Search extends Component {
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
    
    componentWillMount() {
        this.takeData();
    }
    
    handleChange(e) {
        const { select_value } = this.props.GeneratorActions;
        
        select_value(e.target.value);
    }
    
    render() {
        const { options, second_options, value } = this.props.generator;
        const inputItem = second_options[value];
    
    
        return (
            <div id="ViewContainer">
                <span>Выберите "измерение":</span>
                <select value={value} onChange={::this.handleChange}>
                    {
                        options.map((item, index) => {
                            return <option value={index} key={index}>{item}</option>
                        })
                    }
                </select>
    
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));