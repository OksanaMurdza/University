import React, { Component, Fragment } from "react";
import { Line, Text } from "react-konva";
import { view } from "react-easy-state";

class Edges extends Component {
  handleDragEnd = e => {
    this.setState({
      x: e.target.x(),
      y: e.target.y()
    });
  };

  render() {
    const { edges } = this.props;
    return (
      <Fragment>
        {edges.map((item, index) => {
          const [start, finish] = item;
          return (
            <Line
              key={index.toString()}
              points={[start.x, start.y, finish.x, finish.y]}
              stroke="green"
              strokeWidth={2}
              draggable
              dash={[25]}
            />
          );
        })}
      </Fragment>
    );
  }
}

export default view(Edges);
