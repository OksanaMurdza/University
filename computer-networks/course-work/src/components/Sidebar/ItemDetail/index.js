import React, { Component } from "react";
import { view } from "react-easy-state";

import { store } from "../../../utils/store";

import "./index.css";

function ItemInfo({ type, item }) {
  switch (type) {
    case "knot":
      return JSON.stringify(item);
    case "edge":
      return (
        <div>
          <div>weight: {item.weight}</div>
          <div>start knot: {item.startKnot}</div>
          <div>finish knot: {item.finishKnot}</div>
        </div>
      );
    default:
      return <div>error</div>;
  }
}

class itemDetail extends Component {
  removeHandler = () => {
    const {
      currentItemDetails: { type, index }
    } = store;

    store.removeEntity(type, index);

    store.removeDetailsItem();
  };

  render() {
    const {
      currentItemDetails: { type, item }
    } = store;
    return (
      <div className="item-detail">
        {type && (
          <div className="item-detail__wrapper">
            <div className="item-detail__row">
              <div className="has-text-success is-size-1-desktop is-capitalized">
                {type}
              </div>
              <button className="button is-danger" onClick={this.removeHandler}>
                Delete
              </button>
            </div>
            <div>
              <ItemInfo type={type} item={item} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default view(itemDetail);
