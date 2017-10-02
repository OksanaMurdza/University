import React, {Component} from 'react'
import * as MapActions from '../REDUX/ducks/map';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import 'scss/user interface styles/modalWindow.scss';
import 'scss/user interface styles/button.scss';


class InformationWindow extends Component {
    componentDidUpdate() {
        const view = this.props.map.modalInformation.view;

        if (!view) {
            this.refs.modal.classList.remove('commonStyle--modal__open');
            this.refs.modal.classList.add('commonStyle--modal__close');
        }
        else {
            this.refs.modal.classList.remove('commonStyle--modal__close');
            this.refs.modal.classList.add('commonStyle--modal__open');
        }
    }

    closeModal() {
        const { modal_information_view } = this.props.MapActions;
        this.refs.modal.classList.remove('commonStyle--modal__open');
        this.refs.modal.classList.add('commonStyle--modal__close');
        modal_information_view(false)
    }

    toEdit() {
        const {change_page} = this.props.MapActions;
        change_page("point");

        this.closeModal();
    }

    render() {
        let status = this.props.map.modalInformation.status;
        const descr = this.props.map.modalInformation.descr;
        let colorStatus;

        switch(status) {
            case 0:
                colorStatus = 'pending';
                status = 'Додана';
            break;
            case 1:
                colorStatus = 'disapprove';
                status = 'Непідтверджено';
            break;
            case 2:
                console.log('2')
                colorStatus = 'approve';
                status = 'Підтверджено';
            break;
        }

        return (
                <div className="commonStyle--modal__close" ref="modal">
                    <div className="commonStyle--modalInformation__header">
                        <p id="modalInformation--p__status" className={colorStatus}>{status}</p>
                        
                        <div className="commonStyle--modalInformation__header___img-container">
                            <img onClick={::this.closeModal} src="./../../assets/img/ico_close.svg" alt="X" width="15"
                                 height="15"/>
                        </div>
                    </div>
                    <div className="commonStyle--modalInformation__body ml20">
                        <p>{descr}</p>
                    </div>
                    {/*<div className="commonStyle--modal__footer">*/}
                        {/*<button className="commonStyle--button__green ml20" onClick={::this.toEdit}>Редагувати</button>*/}
                    {/*</div>*/}
                </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        map: state.map
    }
}

function mapDispatchToProps(dispatch) {
    return {
        MapActions: bindActionCreators(MapActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(InformationWindow);