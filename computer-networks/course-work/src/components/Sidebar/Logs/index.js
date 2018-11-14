import React, { Component } from "react";
import { view } from "react-easy-state";

import { store } from "../../../utils/store";

const getNormalLogs = type => {
  switch (type) {
    case "ADD_KNOT":
      return "Knot has been added";

    case "ADD_EDGE":
      return "Edge has been added";

    case "KNOT_EDIT":
      return "Knot has been edited";

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
              {JSON.stringify(log)}
            </div>
          );
        })}
      </div>
    );
  }
}

export default view(Logs);
