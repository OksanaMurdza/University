import React from "react";

const KnotsContext = React.createContext({
  knots: [],
  addNewKnots: () => {},
  editKnots: () => {}
});

export const KnotsProvider = KnotsContext.Provider;
export const KnotsConsumer = KnotsContext.Consumer;
