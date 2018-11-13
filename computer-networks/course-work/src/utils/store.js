import * as createState from "react-easy-state";

const ADD_NEW_KNOTS = "add new knots";
const ADD_LINE = "add line";

export const store = createState.store({
  // store
  knots: [],
  edges: [],
  currentMode: "add new knots",

  // getters

  get isCurrentModeIsKnots() {
    return store.currentMode === ADD_NEW_KNOTS;
  },

  // methods
  addKnot(x, y) {
    store.knots.push({ x, y });
  },

  addEdge(points) {
    if (!Array.isArray(points)) {
      throw new Error("points - must be array");
    }

    store.edges.push(points);
    console.log(store.edges);
  },

  editKnot(position, index) {
    const { knots } = store;
    const { x, y } = position;

    const newKnotsValue = knots.map((item, knotIndex) =>
      index === knotIndex ? { ...item, x: x, y: y } : { ...item }
    );

    store.knots = [...newKnotsValue];
  },

  toggleControlMode() {
    const { currentMode } = store;

    store.currentMode =
      currentMode === ADD_NEW_KNOTS ? ADD_LINE : ADD_NEW_KNOTS;
  }
});
