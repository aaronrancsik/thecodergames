var express = require("express");
var app = express();
var server = app.listen(4000, function () {
    console.log('blabla2 4000');
});

app.use(express.static('../client'));