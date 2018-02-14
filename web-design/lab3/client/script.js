import $ from "jquery";
import { takeToDoList } from "../api";

$(() => {
  takeToDoList().then(list => buildList(list));
});

function buildList(list) {
  const dealDIV = $("#deal");
  const num = $(".deal-num");
  const content = $(".deal-conent");
  list.forEach((item, index) => {
    const newNode = createBlock(...item, index);
    dealDIV.append(newNode);
  });

  Object.values(num).forEach((item, index) => $(item).click(() => {}));
}

function createBlock(time, deal, descr, num) {
  return `
  <div class= "deal-item">
  <div class="deal-num">
  ${num}
</div>
<div class="deal-content"> <div class="deal-time">
<span>
    <strong>time:</strong>
  ${time}
</span>
</div>
<div class="deal-do">
<p>
    <strong>must do:</strong>
    ${deal}
</p>
</div>
<div class="dial-descr">
<p>
    <strong>descr:</strong>
    ${descr}
    </p>
</div></div>
</div>`;
}
