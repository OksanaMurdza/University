import React, { Component } from "react";
import { view } from "react-easy-state";

import Logs from "./Logs";
import Table from "./Table";
import ItemDetail from "./ItemDetail";

const LOGS = "LOGS";
const TABLE = "TABLE";

class Sidebar extends Component {
  state = {
    sidebarMode: LOGS
  };

  getSidebarHeader = () => {
    const { sidebarMode } = this.state;

    return sidebarMode === LOGS ? "Show table with weights" : "Show logs";
  };

  toggleMode = () => {
    const { sidebarMode } = this.state;

    let newState = sidebarMode === LOGS ? TABLE : LOGS;

    this.setState({ sidebarMode: newState });
  };

  render() {
    const { sidebarMode } = this.state;
    const title = this.getSidebarHeader();
    return (
      <div className="sidebar">
        <div className="sidebar__header">
          <button onClick={this.toggleMode}>{title}</button>
        </div>
        <div className="sidebar__content">
          <div className="sidebar__content-part">
            {sidebarMode === LOGS ? <Logs /> : <Table />}
          </div>
          <div className="sidebar__content-part">
            <ItemDetail />
          </div>
        </div>
      </div>
    );
  }
}

export default view(Sidebar);
