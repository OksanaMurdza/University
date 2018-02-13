import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./../../../scss/index.scss";

let plane = [
  {
    color: "white",
    code: "sad",
    manufacturer: "USA"
  },
  {
    color: "white",
    code: "boy",
    manufacturer: "USA"
  },
  {
    color: "white",
    code: "roq",
    manufacturer: "USA"
  }
];

let flight = [
  {
    plane: 1,
    from: "UK",
    to: "spain"
  },
  {
    plane: 2,
    from: "UK",
    to: "USA"
  },
  {
    plane: 3,
    from: "UK",
    to: "USA"
  }
];

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plane: plane,
      flight: flight,
      view: "nichogo nemae :c",

      showChoice: true,
      addChoice: true,
      save: true,
      editItem: ""

      // download:
    };
  }

  show() {
    let showChoice = this.refs.showChoice;
    let showButton = this.refs.showButton;

    showChoice.classList.remove("hide");
    showButton.classList.add("hide");
  }

  deleteModel(e) {
    let newModel = [];
    let target = e.target.id.split("_");
    let deleteCode;
    if (target[1] == "plane") {
      let newFlight = [];
      this.state.plane.map((item, index) => {
        if (index != target[0]) newModel.push(item);
        else deleteCode = item.code;
      });
      this.state.flight.map((item, index) => {
        if (item.plane != deleteCode) newFlight.push(item);
      });
      this.setState({
        plane: newModel,
        flight: newFlight
      });
      ::this.showChoice(newModel, "plane");
    } else {
      this.state.flight.map((item, index) => {
        if (index != target[0]) newModel.push(item);
      });
      this.setState({
        flight: newModel
      });
      ::this.showChoice(newModel, "flight");
    }
  }

  edit(e) {
    let target = e.target.id.split("_");
    this.setState({
      save: false,
      editItem: target[0],
      addChoice: false
    });
    this.add(false);
    this.addInput();
  }

  showChoice(model, name) {
    let classname = name === "plane" ? "hide" : "redaction";
    if (model.length > 0) {
      let buffKey = model.map(item => Object.values(item));
      let buff = buffKey.map((item, i) => {
        let res = Object.values(item).map((item, index) => (
          <li key={index}>{item}</li>
        ));
        return (
          <div key={i} className="MainList">
            <button
              onClick={::this.deleteModel}
              className="delete"
              id={`${i}_${name}`}
            >
              Delete
            </button>
            <p onClick={::this.edit} id={`${i}_${name}`} className={classname}>
              Redaction
            </p>
            <ul>{res}</ul>
            <hr />
          </div>
        );
      });
      this.setState({
        view: buff
      });
    } else {
      this.setState({
        view: " "
      });
    }
  }

  back() {
    this.setState({
      view: ""
    });

    let showChoice = this.refs.showChoice;
    let showButton = this.refs.showButton;
    let addChoice = this.refs.add;

    showChoice.classList.add("hide");
    addChoice.classList.add("hide");

    showButton.classList.remove("hide");
  }

  add(save) {
    let addChoice = this.refs.add;
    addChoice.classList.remove("hide");

    if (save) {
      this.setState({
        save: true
      });
    }
  }

  addChoice() {
    let save = this.state.save;
    if (save)
      this.setState({
        addChoice: !this.state.addChoice
      });
  }

  addInput() {
    let choice = this.state.addChoice;
    let save = this.state.save;
    let model;

    choice ? (model = plane) : (model = flight);
    !save ? (model = flight) : null;
    let buffKey = model.map(item => Object.keys(item));
    let buff = buffKey[0].map((item, i) => {
      return (
        <div key={i}>
          {" "}
          <label htmlFor={`input_${item}`}>{item}</label>{" "}
          <input
            type="text"
            className={`input_${item}`}
            ref={`input_${item}`}
          />
        </div>
      );
    });

    return <div>{buff}</div>;
  }

  save() {
    let choice = this.state.addChoice;
    let model;
    choice ? (model = this.state.plane) : (model = this.state.flight);
    let saveData = {};
    let planeCode = [];
    let hack;

    let buffKey = model.map(item => Object.keys(item));
    buffKey[0].map((item, i) => {
      saveData[`${item}`] = ReactDOM.findDOMNode(
        this.refs[`input_${item}`]
      ).value;
      if (item === "plane") {
        hack = "plane";
        planeCode = this.state.plane.filter(i => {
          if (i.code === saveData[`${item}`]) return i;
        });
      }
      ReactDOM.findDOMNode(this.refs[`input_${item}`]).value = "";
    });

    if (this.state.save) {
      if (!planeCode.length && hack == "plane") {
        console.error("please, add plane");
        choice ? ::this.showChoice(this.state.plane, "plane") : null;
      } else {
        model.push(saveData);
        choice
          ? this.setState({ plane: model })
          : this.setState({ flight: model });
        choice
          ? ::this.showChoice(this.state.plane, "plane")
          : ::this.showChoice(this.state.flight, "flight");
      }
    } else {
      let newModel = this.state.flight;
      let index = this.state.editItem;
      newModel[index] = saveData;

      planeCode = this.state.plane.filter(i => {
        if (i.code === newModel[index].plane) return i;
      });
      if (!planeCode.length) {
        console.error("please, add plane");
      } else {
        this.setState({
          flight: newModel
        });
        this.showChoice(newModel, "flight");
      }
    }
  }

  filterShow() {
    let newModel = [];
    this.state.flight.map(item => {
      if (item.to == "spain") newModel.push(item);
    });
    this.showChoice(newModel, "flight");
  }
  // var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(plane));

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <button onClick={::this.show} ref="showButton">
            Show
          </button>
          <button onClick={() => ::this.add(true)}>Add</button>

          <div className="hide" ref="showChoice">
            <div className="choice">
              <button onClick={::this.filterShow}>Filter</button>
              <button
                onClick={() => ::this.showChoice(this.state.plane, "plane")}
              >
                plane
              </button>
              <button
                onClick={() => ::this.showChoice(this.state.flight, "flight")}
              >
                flight
              </button>
            </div>
            {this.state.view}
          </div>
          <div className="hide" ref="add">
            <button onClick={::this.addChoice}>Change Model</button>
            now: <b>{this.state.addChoice ? "plane" : "flight"}</b>
            {::this.addInput()}
            <button onClick={::this.save}>
              {this.state.save ? "Save" : "edit"}
            </button>
          </div>
          <button onClick={::this.back}>Back</button>
          {/*<a href={"data:" + `${data}`} download="data.json"> download </a>*/}
        </div>
      </div>
    );
  }
}

export default Login;
