import React, { Component } from "react";
import { view } from "react-easy-state";

import { store } from "../../../utils/store";
import TableCell from "./TableCell";

class Table extends Component {
  render() {
    const { edges } = store;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>edge</th>
            <th>weight</th>
            <th>knot(1)</th>
            <th>knot(2)</th>
          </tr>
        </thead>
        <tbody>
          {edges.map((item, index) => (
            <TableCell
              weight={item.weight}
              startKnot={item.startKnot}
              finishKnot={item.finishKnot}
              index={index}
              key={index.toString()}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default view(Table);
