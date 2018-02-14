const express = require("express");
const cors = require("cors");
const fs = require("fs");
const parse = require("xml-parser");

const PORT = 3000;

const xml = fs.readFileSync("to-do-list.xml", "utf8");
const parsedXML = parse(xml);

const uglyArrayWithToDo = parsedXML.root.children;

const prettyArray = uglyArrayWithToDo.map(({ children }) =>
  children.map(({ content }) => content)
);

const app = express();

app.use(cors());

app.get("/takeToDoList", (req, res) => {
  res.send(prettyArray);
});

app.listen(PORT);

console.log(`backend in startup on ${PORT} port`);
