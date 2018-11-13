import React, { Component, Fragment } from "react";
import { view } from "react-easy-state";

import { store } from "./utils/store";

import Dashboard from "./components/Dashboard";

class App extends Component {
  render() {
    const { currentMode } = store;
    return (
      <Fragment>
        <button onClick={store.prettyView}>pretty view</button>
        current mode: {currentMode}
        <button onClick={store.toggleControlMode}>Change mode</button>
        <Dashboard />
      </Fragment>
    );
  }
}

export default view(App);
