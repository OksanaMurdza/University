import React, { Component } from "react";
import { view } from "react-easy-state";

import { store } from "../../../../utils/store";

class TableCell extends Component {
  state = {
    editMode: false,
    inputValue: ""
  };

  toggleEditMode = () => {
    const { editMode } = this.state;

    this.setState({ editMode: !editMode });
  };

  saveInputValue = e => {
    const { value } = e.target;
    this.setState({ inputValue: value });
  };

  saveNewValue = () => {
    const { inputValue } = this.state;
    const { index } = this.props;

    store.editEdge(index, inputValue);
    this.setState({ editMode: false });
  };

  render() {
    const { weight, index } = this.props;
    const { editMode } = this.state;
    return (
      <tr>
        <td>{index}</td>
        <td>
          {editMode ? (
            <input onChange={this.saveInputValue} onBlur={this.saveNewValue} />
          ) : (
            <div onClick={this.toggleEditMode}>{weight}</div>
          )}
        </td>
      </tr>
    );
  }
}

export default view(TableCell);
