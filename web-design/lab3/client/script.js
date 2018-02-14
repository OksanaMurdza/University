import $ from "jquery";
import { takeToDoList } from "../api";

window.onload = () => {
  const ToDoList = [];

  takeToDoList().then(d => console.log(d));
};
