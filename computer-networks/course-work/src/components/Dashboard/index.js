import React, { Component } from "react";
import { Stage, Layer } from "react-konva";

import Knots from "../Knots";

class Dashboard extends Component {
  stageHandler = e => {
    const { x, y } = e.evt;
    const { addNewPoints } = this.props;

    addNewPoints({ x, y });
  };

  // need state manager :thinking:
  editPointPosition = (position, index) => {
    const { editPointPosition } = this.props;

    editPointPosition(position, index);
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
          <Knots points={points} editPointPosition={this.editPointPosition} />
        </Layer>
      </Stage>
    );
  }
}

export default Dashboard;
