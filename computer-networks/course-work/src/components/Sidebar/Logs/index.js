import React, { Component } from "react";
import { view } from "react-easy-state";

import { store } from "../../../utils/store";

const getNormalLogs = log => {
  const { type, index, newValue } = log;
  switch (type) {
    case "ADD_KNOT":
      return "Knot has been added";

    case "ADD_EDGE":
      return "Edge has been added";

    case "KNOT_EDIT":
      return `Knot ${index} has been edited`;

    case "EDGE_EDIT":
      return `Edge ${index} has been edited. New data:  ${newValue}`;

    default:
      break;
  }
};

class Logs extends Component {
  render() {
    const { logs } = store;
    return (
      <div className="logs">
        {logs.map((log, index) => {
          return (
            <div className="logs__item" key={index.toString()}>
              {getNormalLogs(log)}
            </div>
          );
        })}
      </div>
    );
  }
}

export default view(Logs);
