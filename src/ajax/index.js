var axiosConfig = require("./axiosConfig");
var fs = require("fs");
var path = require("path");
var axios = require("axios");


var TranCode = process.argv[2] || ""
if(!TranCode) {
  console.log("输入8位交易码");
  process.exit();
}

axiosConfig.params.Body.TranCode = TranCode;

axios.post(axiosConfig.url, axiosConfig.params)
.then(function (res) {
  console.log("success");
  var RuleList = JSON.parse(res.data.result.RuleList)
  fs.writeFileSync(path.resolve(__dirname,"ruleList.txt"),`var a = ${res.data.result.RuleList}`)
})
.catch(function (error) {
  console.log(error);
});

