import React, { Component, Fragment } from "react";
import { Circle, Text } from "react-konva";
import { view } from "react-easy-state";

import { store } from "../../utils/store";

class Knots extends Component {
  state = {
    radius: 40,
    fill: "green"
  };

  circleHandler = e => {
    // e.cancelBubble = true;
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
    store.editKnot(e.evt, index);

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
            <Fragment key={index.toString()}>
              <Circle
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
              <Text x={x} y={y} text={index + 1} fontSize={30} />
            </Fragment>
          );
        })}
      </Fragment>
    );
  }
}

export default view(Knots);
