import React, {Component} from 'react'

import './style.scss'


class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputData: '',
            requestData: '',
        };

    }

    makeRequest() {
        let reqString = this.state.inputData;

        if (reqString.length) {
            fetch(`http://192.168.1.102:3000/api/takeData?reqString=${reqString}`, {
                method: 'POST',
            })
                .then(d => d.json())
                .then(d => {
                    this.setState({
                        requestData: d
                    })
                })
                .catch((err) => console.log(err));

            this.setState({
                inputData: ''
            })
        } else {
            console.error('please, enter request')
        }

    }

    render() {
        const requestData = this.state.requestData;
        let buff = [];
        let drawValue = [];
        let itterKey = 0;


        return (
            <div>
                <p>SELECT * FROM lab</p>
                <p>SELECT id,name FROM lab</p>
                <br/>
                <input
                       type="text"
                       value={this.state.inputData}
                       onChange={e => this.setState({inputData: e.target.value})}
                />
                <br/>
                <button onClick={::this.makeRequest}>press</button>
                {
                    Object.values(requestData).map((i) => {
                         Object.values(i).map((item) => {
                            buff = Object.keys(item);
                            Object.values(item).map((final, index) => {
                                drawValue.push(<p key={itterKey++}>{buff[index]}: {final}</p>);
                            });
                             drawValue.push(<hr key={itterKey++}/>)
                        })
                    })
                }
                {drawValue}
            </div>
        )
    }
}
export default Main