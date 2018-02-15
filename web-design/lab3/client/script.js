import $ from "jquery";
import { takeToDoList } from "../api";

const nearDeal = "";

$(() => {
  takeToDoList()
    .then(list => sortDealTime(list))
    .then(list => buildList(list));
});

function buildList(list) {
  const dealDIV = $("#deal");
  const num = $(".deal-num");
  list.forEach((item, index) => {
    const newNode = createBlock(...item, index);
    dealDIV.append(newNode);
  });
  const content = Object.values($(".deal-content"));

  Object.values(num).forEach((item, index) =>
    $(item).click(e => $(content[e.target.id]).toggle())
  );
}

function createBlock(time, deal, descr, num) {
  return `
  <div class= "deal-item">
  <div class="deal-num" id="${num}">
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

const prettyView = string => +string.replace(":", "");

// hardcode ;c
function sortDealTime(list) {
  return list.sort((a, b) => {
    if (prettyView(a[0]) > prettyView(b[0])) return 1;

    if (prettyView(a[0]) < prettyView(b[0])) return -1;

    return 0;
  });
}
