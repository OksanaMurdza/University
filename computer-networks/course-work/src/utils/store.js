import * as createState from "react-easy-state";

export const store = createState.store({
  knots: [],
  currentMode: "add new knots",

  addKnot(x, y) {
    store.knots.push({ x, y });
  },

  editKnot(position, index) {
    const { knots } = store;
    const { x, y } = position;

    const newKnotsValue = knots.map((item, knotIndex) =>
      index === knotIndex ? { ...item, x: x, y: y } : { ...item }
    );

    store.knots = [...newKnotsValue];
  }
});
