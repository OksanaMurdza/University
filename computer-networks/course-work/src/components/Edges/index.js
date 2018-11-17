import React, { Component, Fragment } from "react";
import { Line, Text } from "react-konva";
import { view } from "react-easy-state";

import { store } from "../../utils/store";

class Edges extends Component {
  getEdgesFill = edgeIndex => {
    const { edgesWithError } = store;
    const isEdgeWithError = edgesWithError.includes(edgeIndex);

    return isEdgeWithError ? "red" : "green";
  };

  getEdgesPoints = item => {
    const { start, finish, startKnot, finishKnot } = item;
    const { knots } = store;

    let edgeStart = start;
    let edgeFinish = finish;

    if (startKnot !== null) {
      edgeStart = knots.find((_, index) => +startKnot === +index);
    }

    if (finishKnot !== null) {
      edgeFinish = knots.find((_, index) => +finishKnot === +index);
    }

    return [edgeStart.x, edgeStart.y, edgeFinish.x, edgeFinish.y];
  };

  getEdgeLabelPosition = (coord, item) => {
    // ochen` krutoy kod, opasno)
    const r = this.getEdgesPoints(item);

    let start;
    let finish;

    switch (coord) {
      case "x":
        start = r[0];
        finish = r[2];
        return +(start + finish) / 2;
      case "y":
        start = r[1];
        finish = r[3];
        return +(start + finish) / 2;
      default:
        throw Error("x || y!");
    }
  };

  render() {
    const { edges } = this.props;
    return (
      <Fragment>
        {edges.map((item, index) => {
          const { weight } = item;
          return (
            <Fragment key={index.toString()}>
              <Line
                points={this.getEdgesPoints(item)}
                stroke={this.getEdgesFill(index)}
                strokeWidth={2}
                draggable
                dash={[25]}
              />
              <Text
                fontSize={15}
                text={`weight: ${weight}, index: ${index}`}
                x={this.getEdgeLabelPosition("x", item)}
                y={this.getEdgeLabelPosition("y", item)}
              />
            </Fragment>
          );
        })}
      </Fragment>
    );
  }
}

export default view(Edges);
