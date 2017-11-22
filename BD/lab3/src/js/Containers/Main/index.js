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
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MainActions from '../../REDUX/ducks/MainActions'

import { RaisedButton, Paper, FloatingActionButton, SelectField, MenuItem, IconButton } from 'material-ui';

import ContentAdd from 'material-ui/svg-icons/content/add';
import Autorenew from 'material-ui/svg-icons/action/autorenew';
import GetApp from 'material-ui/svg-icons/action/get-app';

import './style.scss'

const style = {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    marginBottom: '20px',
    Width: '200px',
    padding: '20px'
};

const saveChange = {
    position: 'fixed',
    top: 20,
    right: 20,
    zIndex: 100000
};

const hideStyle = {
    visibility: 'hidden'
};

const floatRight = {
    float: 'right'
};

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            facts: {},
            factsTable: [],
            airport: [],
            plane: [],
            carrier: [],

            //    UI STATE
            tableChoiceItem: '',
            selectSector: false,
            planeChoice: '',
            airportChoice: '',
            carrierChoice: ''
        }
    };

    componentDidMount() {
        ::this.setupRequest();
    };

    setupRequest() {
        fetch('http://192.168.1.104:3000/api/')
            .then(d => d.json())
            .then((d) => {
                this.setState({ facts: d })
            })
    }

    deleteClick( val ) {
        const { facts } = this.state;

        let newFacts = facts.filter((item, index) => val !== index);
        this.setState({facts: newFacts, tableChoiceItem: val});
    };

    saveFacts() {
        const { facts } = this.state;

        fetch(`http://192.168.1.104:3000/api/update?newData=${JSON.stringify(facts)}`)
            .then(d => d.json())
            .then(d => console.log(d))

    };


    addNew() {
        const { selectSector } = this.state;

        fetch(`http://192.168.1.104:3000/api/takeMeasure`)
            .then(d => d.json())
            .then(d => {
                const [ airport,  plane, carrier] = d;

                this.setState({
                    airport: airport,
                    plane: plane,
                    carrier: carrier
                }, () => this.setState({selectSector: !selectSector}))
            });
    };

    saveNewFacts() {
        const { plane, planeChoice, carrier, carrierChoice, airport, airportChoice } = this.state;

        let newFact = [{id_airport: airport[airportChoice].id, id_carrier: carrier[carrierChoice].id, id_plane: plane[planeChoice].id}];

        fetch(`http://192.168.1.104:3000/api/addNew?newData=${JSON.stringify(newFact)}`)
            .then(d => d.json())
            .then(d => console.log('d >>>>>', d))
    };




    /*********  HANDLER **********/
    handleChangeAirport(e, index, value) {
        this.setState({airportChoice: value})
    }

    handleChangePlane(e, index, value) {
        this.setState({planeChoice: value})
    }

    handleChangeCarrier(e, index, value) {
        this.setState({carrierChoice: value})
    }


    render() {
        const { facts, tableChoiceItem, airport,
            plane, carrier, airportChoice,
            carrierChoice, planeChoice, selectSector
        } = this.state;

        let itterKey = 0;


        let ButtonStyle = tableChoiceItem === '' ? hideStyle : saveChange;
        return (
            <div id="MainView">

                <Link id="Link" to="/generator">
                    <GetApp/>
                </Link>

                <h4>Таблица фактов</h4>

                {
                     Object.values(facts).map((i, firstIndex) => {

                         let buff = [];
                         let key = Object.keys(i);
                         Object.values(i).map((item, index ) => {
                                buff.push(<p key={index + ++itterKey}>{key[index]} : { item }</p>)
                             }
                         );
                         buff.push(<RaisedButton label="Delete" secondary={true} id={firstIndex} key={++itterKey} onClick={() => ::this.deleteClick(firstIndex)} />);

                         return <Paper key={++itterKey}  zDepth={2} rounded={true} style={style}>{ buff }</Paper>
                     })
                 }
                <FloatingActionButton style={floatRight} onClick={::this.addNew}>
                    <ContentAdd />
                </FloatingActionButton>

                <FloatingActionButton  onClick={::this.setupRequest}>
                    <Autorenew />
                </FloatingActionButton>



                <div className={!selectSector ? 'hide' : 'addPanel'}>
                  <SelectField
                      floatingLabelText="Airport"
                      value={ airportChoice }
                      onChange={::this.handleChangeAirport}
                  >
                      {
                          Object.values(airport).map((item, index) =>
                              <MenuItem value={index} key={index} primaryText={item.id} />
                          )
                      }
                  </SelectField>

                  <SelectField
                      floatingLabelText="Plane"
                      value={ planeChoice }
                      onChange={::this.handleChangePlane}
                  >
                      {
                          Object.values(plane).map((item, index) =>
                              <MenuItem value={index} key={index} primaryText={item.id} />
                          )
                      }
                  </SelectField>

                  <SelectField
                      floatingLabelText="Carrier"
                      value={ carrierChoice }
                      onChange={::this.handleChangeCarrier}
                  >
                      {
                          Object.values(carrier).map((item, index) =>
                              <MenuItem value={index} key={index} primaryText={item.id} />
                          )
                      }
                  </SelectField>

                  <RaisedButton label="Add New" onClick={::this.saveNewFacts} secondary={true}  />


              </div>

                <RaisedButton label="Save" secondary={true}  key={++itterKey} style = { ButtonStyle } onClick={::this.saveFacts} />
            </div>
        )
    };
}












/**
 * @default - default give access to redux
 * @param state
 * @returns {{auth: {common, with auth, reducer} }}
 */
function mapStateToProps(state) {
    return {
        main: state.main
    }
}

/**
 * @default - default give access to common action
 * @param dispatch
 * @returns {{GeneratorActions: (ActionCreator<any> | ActionCreatorsMapObject)}}
 */
function mapDispatchToProps(dispatch) {
    return {
        MainActions: bindActionCreators(MainActions, dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));