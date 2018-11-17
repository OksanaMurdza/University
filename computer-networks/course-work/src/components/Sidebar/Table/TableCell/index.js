import React, { Component } from "react";
import { view } from "react-easy-state";

import { store } from "../../../../utils/store";

class TableCell extends Component {
  state = {
    editMode: false
  };

  toggleEditMode = () => {
    const { editMode } = this.state;

    this.setState({ editMode: !editMode });
  };

  saveNewValue = (e, field) => {
    const { value } = e.target;
    const { index } = this.props;
    const { edges } = store;

    const oldValue = edges[index];

    let fieldValue = value;

    if (field !== "weight") {
      fieldValue = fieldValue ? +fieldValue - 1 : 0;
    }

    const newObject = { ...oldValue, [field]: fieldValue };

    console.log(newObject);

    store.editEdge(index, newObject);
    this.setState({ editMode: false });
  };

  render() {
    const { weight, index, startKnot, finishKnot } = this.props;
    const { editMode } = this.state;
    return (
      <tr>
        <td>{index}</td>
        <td>
          {editMode ? (
            <input type="number" onBlur={e => this.saveNewValue(e, "weight")} />
          ) : (
            <div onClick={this.toggleEditMode}>{weight}</div>
          )}
        </td>
        <td>
          {editMode ? (
            <input
              type="number"
              onBlur={e => this.saveNewValue(e, "startKnot")}
            />
          ) : (
            <div onClick={this.toggleEditMode}>{+startKnot + 1}</div>
          )}
        </td>
        <td>
          {editMode ? (
            <input
              type="number"
              onBlur={e => this.saveNewValue(e, "finishKnot")}
            />
          ) : (
            <div onClick={this.toggleEditMode}>{+finishKnot + 1}</div>
          )}
        </td>
      </tr>
    );
  }
}

export default view(TableCell);
