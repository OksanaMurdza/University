import React, { Component, Fragment } from "react";
import { view } from "react-easy-state";

import { store } from "./utils/store";

import Dashboard from "./components/Dashboard";

const ADD_NEW_KNOTS = "add new knots";
const ADD_LINE = "add line";

class App extends Component {
  changeHandleMode = () => {
    const { currentMode } = store;
    store.currentMode =
      currentMode === ADD_NEW_KNOTS ? ADD_LINE : ADD_NEW_KNOTS;
  };

  render() {
    return (
      <Fragment>
        <button onClick={this.changeHandleMode}>Click</button>
        <Dashboard
          addNewPoints={this.addNewPoints}
          editPointPosition={this.editPointPosition}
        />
      </Fragment>
    );
  }
}

export default view(App);
