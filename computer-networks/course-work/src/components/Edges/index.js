import React, { Component, Fragment } from "react";
import { Line, Text } from "react-konva";
import { view } from "react-easy-state";

import { store } from "../../utils/store";

class Edges extends Component {
  handleDragEnd = e => {
    this.setState({
      x: e.target.x(),
      y: e.target.y()
    });
  };

  getEdgesFill = edgeIndex => {
    const { edgesWithError } = store;
    const isEdgeWithError = edgesWithError.includes(edgeIndex);

    return isEdgeWithError ? "red" : "green";
  };

  render() {
    const { edges } = this.props;
    return (
      <Fragment>
        {edges.map((item, index) => {
          const [start, finish] = item;
          return (
            <Fragment>
              <Line
                key={index.toString()}
                points={[start.x, start.y, finish.x, finish.y]}
                stroke={this.getEdgesFill(index)}
                strokeWidth={2}
                draggable
                dash={[25]}
              />
              <Text
                fontSize={25}
                text={"kek"}
                x={(start.x + finish.x) / 2}
                y={start.y}
              />
            </Fragment>
          );
        })}
      </Fragment>
    );
  }
}

export default view(Edges);
