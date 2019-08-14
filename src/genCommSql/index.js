
var filename = "./菜单.xlsx";
var sheetName = "Sheet1";

var xlsx = require('node-xlsx');
var fs = require("fs");
var path = require("path");
var _ = require("underscore");
var utils = require("../utils/index");
var excelPath = path.resolve(__dirname,filename);
var workSheets = xlsx.parse(fs.readFileSync(excelPath));
var curWorkSheet = workSheets.find(v => v.name.includes(sheetName)).data;


for(var i=0;i<curWorkSheet.length;i++){
  for(var j=0;j<curWorkSheet[i].length;j++){
    var item = curWorkSheet[i][j];
    if(item === 0){
      curWorkSheet[i][j] = '0';
    }else if(!item){
      curWorkSheet[i][j] = '';
    }
  }
}



var oringinData = [
  {tableName:"TEST_TABLE_NAME",data:curWorkSheet.slice(1)}
];

var insertSql = utils.genInsertSql(oringinData)
utils.writeToOutDir("MenueInsert.sql",insertSql,"菜单");

