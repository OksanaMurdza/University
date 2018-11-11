import React, { Component } from "react";
import { Stage, Layer, Circle } from "react-konva";

import Knots from "../Knots";

class Dashboard extends Component {
  stageHandler = e => {
    const { x, y } = e.evt;
    const { addNewPoints } = this.props;

    addNewPoints({ x, y });
  };

  render() {
    const { points } = this.props;

    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={this.stageHandler}
      >
        <Layer>
          <Knots points={points} />
        </Layer>
      </Stage>
    );
  }
}

export default Dashboard;
