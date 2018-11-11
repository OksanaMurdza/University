import React, { Component, Fragment } from "react";

import { KnotsProvider } from "./utils/knotsContext";
import Dashboard from "./components/Dashboard";

const ADD_NEW_KNOTS = "add new knots";
const ADD_LINE = "add line";

class App extends Component {
  state = {
    knots: [],
    mode: ADD_NEW_KNOTS
  };

  addNewPoints = newPoint => {
    const { knots } = this.state;
    const { x, y } = newPoint;

    knots.push({ x, y });
    this.setState({ knots: knots });
  };

  editPointPosition = (position, index) => {
    const { knots } = this.state;
    const { x, y } = position;

    const newKnotsValue = knots.map((item, knotIndex) =>
      index === knotIndex ? { ...item, x: x, y: y } : { ...item }
    );

    this.setState({ knots: newKnotsValue });
  };

  changeHandleMode = () => {
    const { mode } = this.state;
    this.setState({ mode: mode === ADD_NEW_KNOTS ? ADD_LINE : ADD_NEW_KNOTS });
  };

  // getContextValue = () => {
  //   return {
  //     knots: this.state.knots,
  //     addNewKnots: this.addNewPoints,
  //     editKnots: this.editPointPosition
  //   };
  // };

  render() {
    return (
      <Fragment>
        <button onClick={this.changeHandleMode}>Click</button>
        <Dashboard
          points={this.state.knots}
          addNewPoints={this.addNewPoints}
          editPointPosition={this.editPointPosition}
        />
        {/* <KnotsProvider value={this.getContextValue()}>
        </KnotsProvider> */}
      </Fragment>
    );
  }
}

export default App;
