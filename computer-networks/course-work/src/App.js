import React, { Component } from "react";
import { view } from "react-easy-state";

// bulma component
import { Button } from "react-bulma-components/full";

import { store } from "./utils/store";

import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

import "./App.css";

class App extends Component {
  getControlButtonText = () => {
    const { currentMode } = store;

    return currentMode === "add new knots" ? "add new edge" : "add new knots";
  };

  render() {
    const buttonText = this.getControlButtonText();
    return (
      <div className="container-fluid">
        <div className="dashboard box">
          <div className="dashboard__row">
            <Button onClick={store.prettyView} color={"info"}>
              pretty view
            </Button>
          </div>
          <div className="dashboard__row">
            <Button onClick={store.toggleControlMode} color={"success"}>
              {buttonText}
            </Button>
          </div>
          <Dashboard />
        </div>
        <div className="aside box">
          <Sidebar />
        </div>
      </div>
    );
  }
}

export default view(App);
