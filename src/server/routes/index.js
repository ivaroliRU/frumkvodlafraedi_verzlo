const express = require('express');
const fs = require('fs');
const uniqid = require('uniqid');
const repo = require('../productRepository');
var router = express.Router();

//get request on diffirent pages
router.get("/", (req, res) => {
    var scripts = [{ script: 'assets/js/main.min.js' }];
    repo.getProductTypes(function(result){
        res.render('index', {
            products : result,
            scripts: scripts ,
            layout: 'main', 
        });
    });
});
router.get("/cart", (req, res) => {
    var scripts = [{ script: 'assets/js/cart.min.js' }];
    //send the index file of the root "./builds"
    res.render('cart', {layout: 'main', scripts: scripts});
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


router.post("/checkout", (req, res) => {
    id = uniqid.time();
    req.body.id = id;

    repo.insertOrder(req.body, function(result){
        if(result != null){
            res.status(200).send(id);
        }
        else{
            res.status(500).send("");
        }
        console.log(result);
    });
});

module.exports = router