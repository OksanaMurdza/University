import $ from "jquery";
import { takeToDoList } from "../api";

$(() => takeToDoList().then(list => buildList(list)));

function buildList(list) {
  const dealDIV = $("#deal");
  list.forEach(item => {
    const [time, deal, descr] = item;
  });
}
