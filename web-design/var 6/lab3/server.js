const express = require('express');
const cors = require('cors');
const fs = require('fs');
const parse = require('xml-parser');

const PORT = 3000;

const xml = fs.readFileSync('diaryContent.xml', 'utf8');
const parsedXML = parse(xml);

const JSON = parsedXML.root.children;

// parse topics from xml
const topic = JSON[1].children.map(({ content }) => content);

// parse messages from xml
const messages = JSON[0].children.map(({ children }) => {
	const buff = {};
	children.map(({ content, name }) => (buff[name] = content));

	return buff;
});

const app = express();

app.use(cors());

app.get('/takeDiaryTopic', (req, res) => {
	res.send(topic);
});

app.get('/takeMessages', (req, res) => {
	res.send(messages);
});

app.listen(PORT);

console.log(`backend in startup on ${PORT} port`);
