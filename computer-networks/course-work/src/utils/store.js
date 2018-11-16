import * as createState from "react-easy-state";

const ADD_NEW_KNOTS = "add new knots";
const ADD_LINE = "add line";

function isPointInCircle(point, circleCenter) {
  const { x: xPoint, y: yPoint } = point;
  const { x: xCircle, y: yCircle } = circleCenter;

  const r = (xPoint - xCircle) ** 2 + (yPoint - yCircle) ** 2;

  return Math.sqrt(r) <= 60;
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
    store.edges.push(points);
    store.logs.push({ type: "ADD_EDGE" });
    store.prettyView();
  },

  editKnot(position, index) {
    const { knots } = store;
    const { x, y } = position;

    store.knots = knots.map((item, knotIndex) =>
      index === knotIndex ? { ...item, x: x, y: y } : { ...item }
    );

    store.logs.push({ type: "KNOT_EDIT", index: index });
  },

  editEdge(index, weight) {
    const { edges } = store;

    this.edges = edges.map((item, edgeIndex) =>
      index === edgeIndex ? { ...item, weight: weight } : { ...item }
    );

    store.logs.push({ type: "EDGE_EDIT", index: index, weight: weight });
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
      const { start, finish } = item;
      let knotIndex = "";

      const isStartInKnot = knots.find((knot, indexKnot) => {
        knotIndex = indexKnot;
        return isPointInCircle(start, knot);
      });

      if (isStartInKnot) {
        item.start = { x: isStartInKnot.x, y: isStartInKnot.y };
        item.startKnot = knotIndex;
      } else {
        edgesWithError.push(index);
      }

      const isFinishInKnot = knots.find((knot, indexKnot) => {
        knotIndex = indexKnot;
        return isPointInCircle(finish, knot);
      });
      if (isFinishInKnot) {
        item.finish = { x: isFinishInKnot.x, y: isFinishInKnot.y };
        item.finishKnot = knotIndex;
      } else {
        edgesWithError.push(index);
      }

      return item;
    });
    store.edgesWithError = [...new Set(edgesWithError)];
    store.edges = prettyEdges;
  }
});
