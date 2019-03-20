const express = require('express');
const fs = require('fs');
const uniqid = require('uniqid');
const repo = require('../productRepository');
var router = express.Router();

//get request on diffirent pages
router.get("/", (req, res) => {
    var scripts = [];
    repo.getProductTypes(function(result){
        res.render('dashboard', {
            products : result,
            scripts: scripts ,
            layout: 'main', 
        });
    });
});

//get request on javascript files
// Ex. /js/main.min.js
router.get("/assets/:file", (req, res) => {
    var file = req.params.file;

    //if file exists then send it with the status 200
    if(fs.existsSync(files+ "assets/" +file)){
        res.status(200).sendFile("assets/"+file, {root: files});
    }
    //if not, only send status 404
    else{
        res.status(404).end();
    }
});

module.exports = router