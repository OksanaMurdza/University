import React, { Component, Fragment } from "react";
import { Circle } from "react-konva";

class Knots extends Component {
  state = {
    radius: 70,
    fill: "red",
    stroke: "black"
  };

  circleHandler = e => {
    e.cancelBubble = true;
  };

  handleDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      },
      scaleX: 1.1,
      scaleY: 1.1
    });
  };

  handleDragEnd = (e, index) => {
    const { editPointPosition } = this.props;

    editPointPosition(e.evt, index);

    e.target.to({
      duration: 0.5,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
  };

  render() {
    const { radius, fill, stroke } = this.state;
    const { points } = this.props;

    return (
      <Fragment>
        {points.map(({ x, y }, index) => {
          return (
            <Circle
              key={index.toString()}
              onClick={this.circleHandler}
              draggable
              onDragStart={this.handleDragStart}
              onDragEnd={e => this.handleDragEnd(e, index)}
              x={x}
              y={y}
              radius={radius}
              fill={fill}
              stroke={stroke}
            />
          );
        })}
      </Fragment>
    );
  }
}

export default Knots;
