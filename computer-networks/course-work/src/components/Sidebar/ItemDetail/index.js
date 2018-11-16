import React, { Component } from "react";
import { view } from "react-easy-state";

import { store } from "../../../utils/store";

class itemDetail extends Component {
  render() {
    const {
      currentItemDetails: { type, item }
    } = store;
    return <div>{type}</div>;
  }
}

export default view(itemDetail);
