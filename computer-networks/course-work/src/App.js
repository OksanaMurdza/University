import React, { Component } from "react";
import { view } from "react-easy-state";

import { store } from "./utils/store";

import Dashboard from "./components/Dashboard";
import "./App.css";

class App extends Component {
  render() {
    const { currentMode } = store;
    return (
      <div className="container">
        <div className="dashboard">
          <button onClick={store.prettyView}>pretty view</button>
          current mode: {currentMode}
          <button onClick={store.toggleControlMode}>Change mode</button>
          <Dashboard />
        </div>
        <div className="aside">
          <h5>mda</h5>
        </div>
      </div>
    );
  }
}

export default view(App);
