import React, { Component } from "react";
import { Stage, Layer, Text } from "react-konva";
import { view } from "react-easy-state";

import { store } from "../../utils/store";
import Knots from "../Knots";
import Edges from "../Edges";

class Dashboard extends Component {
  state = {
    edgeStart: ""
  };

  stageHandler = e => {
    const { isCurrentModeIsKnots } = store;
    let { x, y } = e.evt;

    // magic ))
    y = y - 44;
    x = x - 5;

    if (isCurrentModeIsKnots) {
      store.addKnot(x, y);
      this.setState({ edgeStart: "" });
      return;
    }

    // add new line mode
    const { edgeStart } = this.state;
    if (!edgeStart) {
      this.setState({ edgeStart: { x, y } });
    } else {
      const newEdges = {
        start: { x: edgeStart.x, y: edgeStart.y },
        finish: { x: x, y: y },
        weight: 0
      };
      store.addEdge(newEdges);
      this.setState({ edgeStart: "" });
    }
  };

  getEdgesInfo = () => {
    const { edgeStart } = this.state;

    if (!edgeStart) return "";
    return `First point: ${edgeStart.x} ${edgeStart.y}`;
  };

  render() {
    const { isCurrentModeIsKnots, knots, edges } = store;
    const text = this.getEdgesInfo();
    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={this.stageHandler}
      >
        <Layer>
          {!isCurrentModeIsKnots && <Text Text={text} />}
          <Knots points={knots} />
          <Edges edges={edges} />
        </Layer>
      </Stage>
    );
  }
}

export default view(Dashboard);
