import * as createState from "react-easy-state";

const ADD_NEW_KNOTS = "add new knots";
const ADD_LINE = "add line";

function isPointInCircle(point, circleCenter) {
  const { x: xPoint, y: yPoint } = point;
  const { x: xCircle, y: yCircle } = circleCenter;

  const r = (xPoint - xCircle) ** 2 + (yPoint - yCircle) ** 2;

  return Math.sqrt(r) <= 40;
}

export const store = createState.store({
  // store
  knots: [],
  edges: [],
  currentMode: "add new knots",

  logs: [],

  edgesWithError: [],
  // getters

  get isCurrentModeIsKnots() {
    return store.currentMode === ADD_NEW_KNOTS;
  },

  // methods
  addKnot(x, y) {
    store.knots.push({ x, y });
    store.logs.push({ type: "ADD_KNOT" });
  },

  addEdge(points) {
    if (!Array.isArray(points)) {
      throw new Error("points - must be array");
    }

    store.edges.push(points);
    store.logs.push({ type: "ADD_EDGE" });
  },

  editKnot(position, index) {
    const { knots } = store;
    const { x, y } = position;

    const newKnotsValue = knots.map((item, knotIndex) =>
      index === knotIndex ? { ...item, x: x, y: y } : { ...item }
    );

    store.knots = [...newKnotsValue];
    store.logs.push({ type: "KNOT_EDIT" });
  },

  toggleControlMode() {
    const { currentMode } = store;

    store.currentMode =
      currentMode === ADD_NEW_KNOTS ? ADD_LINE : ADD_NEW_KNOTS;
  },

  prettyView() {
    const { edges, knots } = store;
    const edgesWithError = [];
    const prettyEdges = edges.map((item, index) => {
      const [start, finish] = item;
      const prettyItem = [...item];

      const isStartInKnot = knots.find(knot => isPointInCircle(start, knot));
      if (isStartInKnot) {
        prettyItem[0] = { x: isStartInKnot.x, y: isStartInKnot.y };
      } else {
        edgesWithError.push(index);
      }

      const isFinishInKnot = knots.find(knot => isPointInCircle(finish, knot));
      if (isFinishInKnot) {
        prettyItem[1] = { x: isFinishInKnot.x, y: isFinishInKnot.y };
      } else {
        edgesWithError.push(index);
      }

      return prettyItem;
    });
    store.edgesWithError = [...new Set(edgesWithError)];
    store.edges = prettyEdges;
  }
});
