import React, { Component } from "react";
import { Stage, Layer } from "react-konva";

import { view } from "react-easy-state";
import { store } from "../../utils/store";
import Knots from "../Knots";

class Dashboard extends Component {
  stageHandler = e => {
    const { x, y } = e.evt;

    store.knots.push({ x, y });
  };

  render() {
    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={this.stageHandler}
      >
        <Layer>
          <Knots
            points={store.knots}
            editPointPosition={this.editPointPosition}
          />
        </Layer>
      </Stage>
    );
  }
}

export default view(Dashboard);
