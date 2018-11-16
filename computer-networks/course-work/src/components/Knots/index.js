import React, { Component, Fragment } from "react";
import { Text, Image } from "react-konva";
import { view } from "react-easy-state";

import { store } from "../../utils/store";
import { KNOT_IMG_URL } from "../../utils/getImageUrl";

class Knots extends Component {
  state = {
    radius: 40,
    fill: "green",
    image: ""
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
      shadowOffsetX: 0,
      shadowOffsetY: 0
    });
  };

  componentDidMount() {
    const image = new window.Image();
    image.src = KNOT_IMG_URL;
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }

  test = e => {
    console.log("dblkc");
    e.cancelBubble = true;
  };

  render() {
    const { points } = this.props;

    return (
      <Fragment>
        {points.map(({ x, y }, index) => {
          return (
            <Fragment key={index.toString()}>
              <Image
                image={this.state.image}
                draggable
                onClick={this.circleHandler}
                onDragStart={this.handleDragStart}
                onDragEnd={e => this.handleDragEnd(e, index)}
                x={x}
                y={y}
                offsetX={50}
                offsetY={50}
              />

              <Text
                onClick={this.test}
                width={50}
                height={50}
                x={x}
                y={y}
                text={index + 1}
                fontSize={30}
              />
            </Fragment>
          );
        })}
      </Fragment>
    );
  }
}

export default view(Knots);
