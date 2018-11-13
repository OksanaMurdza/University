import * as createState from "react-easy-state";

const ADD_NEW_KNOTS = "add new knots";
const ADD_LINE = "add line";

function isPointInCircle(point, circleCenter) {
  const { x: xPoint, y: yPoint } = point;
  const { x: xCircle, y: yCirlce } = circleCenter;

  const r = (xPoint - xCircle) ** 2 + (yPoint - yCirlce) ** 2;

  return Math.sqrt(r) <= 40;
}

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
  },

  prettyView() {
    const { edges, knots } = store;
    const prettyEdges = edges.map(item => {
      const [start, finish] = item;
      const prettyItem = [...item];

      const isStartInKnot = knots.find(knot => isPointInCircle(start, knot));
      if (isStartInKnot) {
        prettyItem[0] = { x: isStartInKnot.x, y: isStartInKnot.y };
      }

      const isFinishInKnot = knots.find(knot => isPointInCircle(finish, knot));
      if (isFinishInKnot) {
        prettyItem[1] = { x: isFinishInKnot.x, y: isFinishInKnot.y };
      }

      return prettyItem;
    });
    store.edges = prettyEdges;
  }
});
