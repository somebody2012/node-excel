var express = require("express");
var shell = require('shelljs');
var fs = require("fs");
var path = require("path");
var app = express();

app.use(function(req,res,next){
  res.setTimeout(1000000,function(){
    res.send(408);
  })
  next();
})

app.get("/",(req,res) => {
  console.log("ip:",req.ip);
  var data = {
    date:new Date().toString(),
    ip:req.ip,
    func:req.query.func || "无"
  };
  fs.writeFileSync(path.resolve(__dirname,"../../logs/req.log"),JSON.stringify(data) + "\n",{encoding:"utf-8",flag:"a"});
  var funcCode = [
    {func:"AU",name:"授权"},
    {func:"CK",name:"复核"},
    {func:"DS",name:"双屏"},
    {func:"CV",name:"客户视图"},
    {func:"BN",name:"黑名单"},
    {func:"CI",name:"客户信息录入"},
    {func:"DH",name:"双热线"}
  ];
  var func = req.query.func;

  var sendStr = `<h1>调用方式：http://20.3.7.122:1234?func=BN</h1>
    <h3>func 取值</h3>
    <code>${JSON.stringify(funcCode,null,2)}</code>
  `;
  var errorStr = `<h1 style="color:red;">调用错误 浏览器打开一次就行，不管有没有返回，不用多次刷</h1>`;
  var successStr = `<h1 style="color:green;>刷新 ${(funcCode.find(v => v == func)|| {}).func} 成功</h1>`;
  var str = "";
  if(funcCode.map(v=>v.func).includes(func)){
    var a = shell.exec(`npm run ${func}`);
    str = successStr + sendStr;
  }else{
    str = errorStr + sendStr;
  }
  res.send(str);
})

app.listen(1234,function(){
  console.log(`http://20.3.7.122:1234`);
});