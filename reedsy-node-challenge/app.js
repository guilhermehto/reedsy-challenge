const express = require('express');
const bodyParser = require('body-parser');
const FileQueue = require('./file-queue');

const app = express();
const serverPort = 3000;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

let fileQueue = new FileQueue();


app.get('/', (req, res) => {
    res.sendFile('public/index.html', {root: __dirname});
});

app.post('/upload', (req, res) => {
    //Checks for errors on the request
    if (req.body.type !== 'html' && req.body.type !== 'pdf') {
        res.status(400).send({
            error: 'Wrong file type.'
        });
        return;
    }
    //Adds the requested file to the conversion queue and sends the response
    fileQueue.enqueue(req.body.type);
    res.send({
        message: 'File received and added to processing queue.'
    });
});


app.listen(serverPort, () => {
    console.log(`Server running on port ${serverPort}`);
});