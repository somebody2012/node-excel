var express = require("express");
var shell = require('shelljs');
var fs = require("fs");
var path = require("path");
var app = express();


app.use(express.static(path.resolve(__dirname,"dist")));

// app.get("/",function(req,res){
//   fs.createReadStream(path.resolve(__dirname,"./dist/index.html")).pipe(res)
// })

app.listen(1234,function(){
  console.log(`http://localhost:1234`);
});