import React, { Component } from "react";
import { view } from "react-easy-state";

import { store } from "./utils/store";

import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

import "./App.css";

class App extends Component {
  render() {
    const { currentMode } = store;
    return (
      <div className="container">
        <div className="dashboard">
          <div className="dashboard__row">
            <button onClick={store.prettyView}>pretty view</button>
          </div>
          <div className="dashboard__row">
            current mode: {currentMode}
            <button onClick={store.toggleControlMode}>Change mode</button>
          </div>
          <Dashboard />
        </div>
        <div className="aside">
          <Sidebar />
        </div>
      </div>
    );
  }
}

export default view(App);
