import React, { Component } from "react";
import { view } from "react-easy-state";

import { store } from "../../../utils/store";
import TableCell from "./TableCell";

class Table extends Component {
  render() {
    const { edges } = store;
    return (
      <table>
        <thead>
          <tr>
            <th>edge index</th>
            <th>weight</th>
          </tr>
        </thead>
        <tbody>
          {edges.map((item, index) => (
            <TableCell
              weight={item.weight}
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
