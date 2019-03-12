const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');
const repo = require('./productRepository');
const app = express();

//location of all static files such as "index.html"
var files = path.normalize("./dist");

//setup
//app is able to get static files such as CSS files
app.use('/', express.static(files));
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//get request on the index page
//localhost:3000 or https://tictactoe-hugb.herokuapp.com/
app.get("/", (req, res) => {
    //send the index file of the root "./builds"
    res.status(200).sendfile("index.html", {root: files});
});


//get request on javascript files
// Ex. /js/main.min.js
app.get("/:file", (req, res) => {
    var file = req.params.file;

    //if file exists then send it with the status 200
    if(fs.existsSync(files+ "/" +file)){
        res.status(200).sendFile(file, {root: files});
    }
    //if not, only send status 404
    else{
        res.status(404).end();
    }
});

app.post("/checkout", (req, res) => {
    id = uniqid.time();
    req.body.id = id;

    repo.insertOrder(req.body, function(result){
        console.log(result);
    });

    res.status(200).send(id);
});

module.exports = app;