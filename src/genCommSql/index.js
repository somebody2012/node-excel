
var filename = "./1326修改个人客户信息_in.xlsx";
var sheetName = "Sheet2";

var xlsx = require('node-xlsx');
var fs = require("fs");
var path = require("path");
var _ = require("underscore");
var utils = require("../utils/index");
var excelPath = path.resolve(__dirname,filename);
var workSheets = xlsx.parse(fs.readFileSync(excelPath));
var curWorkSheet = workSheets.find(v => v.name.includes(sheetName)).data;
utils.transformEmpty(curWorkSheet);




var oringinData = [
  {tableName:"TP_CIP_INTERFACECOLMAP",data:curWorkSheet}
];

var insertSql = utils.genInsertSql(oringinData)
utils.writeToOutDir("MenueInsert.sql",insertSql,"菜单");

