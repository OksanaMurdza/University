import React, { Component, Fragment } from "react";

import Dashboard from "./components/Dashboard";

class App extends Component {
  state = {
    points: []
  };

  addNewPoints = newPoint => {
    const { points } = this.state;
    const { x, y } = newPoint;

    points.push({ x, y });
    this.setState({ points: points });
  };

  editPointPosition = (position, index) => {
    const { points } = this.state;
    const { x, y } = position;

    points.map((item, el) =>
      el === index ? { ...item } : { ...item, x: x, y: y }
    );

    this.setState({ points: points });
  };

  render() {
    return (
      <Fragment>
        <Dashboard
          points={this.state.points}
          addNewPoints={this.addNewPoints}
          editPointPosition={this.editPointPosition}
        />
      </Fragment>
    );
  }
}

export default App;
