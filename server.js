let projectData = {};

const express = require('express');
let app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

app.get('/data', (req, res) => {
    res.send(projectData);
});

app.post('/', (req, res) => {
    const data = req.body;
    projectData['date'] = data.date;
    projectData['temp'] = data.temp;
    projectData['content'] = data.content;
})
const port = 8000;
app.listen(port, () => {
    console.log(`Server runing at localhost:${port}`);
})