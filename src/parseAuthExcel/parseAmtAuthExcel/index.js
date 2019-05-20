var xlsx = require('node-xlsx');
var fs = require("fs");
var path = require("path");
var utils = require("../utils");
var config = require("../../config");
var generateSql = require("../generateSql");
// const workSheets = xlsx.parse(fs.readFileSync(`${__dirname}/src/resources/abc.xlsx`));

// 授权级别	现金起始金额	现金限制金额
var cash = [
  // [0,	0,	50000],
  [2,	50000,	100000],
  [3,	100000,	500000],
  [4,	500000,	2000000],
  [5,	2000000,	20000000],
  [6,	20000000,	50000000],
  [7,	50000000,	100000000],
  [8,	100000000,	200000000],
  [9,	200000000,	400000000],
];
// 授权级别	转账交易限额	转账授权限额
var transfer = [
  // [0,	0,	        50000],
  [2,	50000,	    200000],
  [3,	200000,	    1000000],
  [4,	1000000,	  4000000],
  [5,	4000000,	  40000000],
  [6,	40000000,	  100000000],
  [7,	100000000,	200000000],
  [8,	200000000,	400000000],
  [9,	400000000,	800000000],
];
var generateCondNo = (function(startNumber){
  var OPRTN_COND_NO = startNumber;
  return function(){
    var condNo = OPRTN_COND_NO.toString();
    OPRTN_COND_NO++;
    return "AU" + condNo.padStart(5,"0")
  }
})(1)
/**
 * 核心 C端 币种对应关系
 * 
  01	156	币种-人名币
  156	01	币种-人民币
  840	14	币种-美元
  392	27	币种-日元
  978	38	币种-欧元
  036	29	币种-澳大利亚元
  826	12	币种-英镑
  344	13	币种-香港元
  702	18	币种-新加坡元
  124	28	币种-加元
 */
// "156-人民币","826-英镑","344-港币","840-美元","702-新加坡元","392-日元","124-加元","036-澳大利亚元","978-欧元"
// 币种
// var currency = ["01","12","13","14","18","27","28","29","38"];
var currency = ["156"];// 暂时只有人名币
var currencyMapper = {
  "156":"币种-人民币",
  "840":"币种-美元",
  "392":"币种-日元",
  "978":"币种-欧元",
  "036":"币种-澳大利亚元",
  "826":"币种-英镑",
  "344":"币种-香港元",
  "702":"币种-新加坡元",
  "124":"币种-加元"
};
// 条件数据
var data = [
  ["OPRTN_COND_NO","DICTRY_NM","OPER_SYM_1","CMPR_VAL","OPER_SYM_2","VALUE2","TRAN_CD","COND_DESC","OPER_TELR_NO","OPER_TM","OPER_RSN","CMPR_VAL_DATA_DICTRY_FLG","PUB_DICTRY_FLG","DICTRY_DESC"]
];
// 模式数据
var modeData = [
  ["MODE_NO","AUTH_TYP_CD","AUTH_LVL_CD","REMOTE_AUTH_LVL_CD","AUTH_ORG_TYP_CD","AUTH_ORG_NO","AUTH_POST_NO","UGNT_FLG","AUTH_DESC","HOST_AUTH_FLG","HOST_AUTH_TYP_CD","CNTRTN_AUTH_CENT_NM","CNTRTN_AUTH_LVL_CD","REMRK_1","APP_NO"]
];
/**
  交易类别	金额区间	人脸识别是否通过	授权方式
  现金	   [0,5)	     不判断	         不授权
  现金	   [5,10)	     是	             不授权
  现金	   [5,10)	     否	             远程授权
  现金	   [10,+∞)	   不判断	          远程授权
  转账	   [0,5)	     不判断	          不授权
  转账	   [5,20)	     是	              不授权
  转账	   [5,20)	     否	              远程授权
  转账	   [20,+∞)	   不判断	          远程授权
 */
for(var i=0;i<currency.length;i++){
  for(var j=0;j<cash.length;j++){
    var curCondNo = generateCondNo();
    var curRowTnNwSn = [ curCondNo,"TnNwSn","==","0","","","","现金支付触发授权","","","批量新增","1","0","现金支付" ];
    var curRow1 = [ curCondNo,"txAmt",">=",cash[j][1],"<=",cash[j][2],"","金额超限触发授权","","","批量新增","1","0","交易金额" ];
    var curRow2 = [ curCondNo,"Ccy",  "==",currency[i],"",  "",       "","币种授权","","","批量新增","1","0","币种" ];
    var curModeRow = [curCondNo,"2",cash[j][0],"","","","*","",`${currencyMapper[currency[i]]},现金,金额在范围【${cash[j][1]}-${cash[j][2]}】内，触发授权`,"","","","","",""];
    data.push(curRow1);
    data.push(curRow2);
    data.push(curRowTnNwSn);
    modeData.push(curModeRow);
    if(j === 0){
      // 现金 只有 5w-10w 需要人脸识别规则，转账20w-50w 需要人脸识别规则
      //faceRecognitionRow 人脸识别为 "0" 表示未通过 或未成功 "1" 成功 三个条件且关系 不通过就远程授权
      // 只判断50000,	100000 区间 不通过则判断 金额 和 币种
      var faceRecognitionRow = [ curCondNo,"faceRecognition",  "==","0","","","","人脸识别授权","","","批量新增","1","0","人脸识别" ];
      data.push(faceRecognitionRow);
    }
    
  }
  for(var j=0;j<transfer.length;j++){
    var curCondNo = generateCondNo();
    var curRowTnNwSn = [ curCondNo,"TnNwSn","==","1","","","","转账触发授权","","","批量新增","1","0","转账标识" ];
    var curRow3 = [ curCondNo,"txAmt",">=",transfer[j][1],"<=",transfer[j][2],"","金额超限触发授权","","","批量新增","1","0","交易金额" ];
    var curRow4 = [ curCondNo,"Ccy","==",currency[i],"","","","币种授权","","","批量新增","1","0","币种"];
    var curModeRow = [curCondNo,"2",transfer[j][0],"","","","*","",`${currencyMapper[currency[i]]},转账,金额在范围【${transfer[j][1]}-${transfer[j][2]}】内，触发授权`,"","","","","",""];
    data.push(curRow3);
    data.push(curRow4);
    data.push(curRowTnNwSn);
    modeData.push(curModeRow);
    if(j === 0){
      //faceRecognitionRow 人脸识别为 "0" 表示未通过 或未成功 "1" 成功 三个条件且关系 不通过就远程授权
      // 只判断50000,	  200000 区间 不通过则判断 金额 和 币种
      var faceRecognitionRow = [ curCondNo,"faceRecognition",  "==","0","","","","人脸识别授权","","","批量新增","1","0","人脸识别" ];
      data.push(faceRecognitionRow);
    }
  }
}





var buffer = xlsx.build([
  {name: "条件表", data: data},
  {name: "模式表", data: modeData},
]); 

var amtSqlParams = [
  {tableName:"IB_OM_RULECOND_INFO",data:data},
  {tableName:"IB_OM_AUTHMODE_INFO",data:modeData}
];
generateSql.generateInsertSql(`amtAuth_${utils.getCurDateStr()}.sql`,amtSqlParams);
generateSql.generateDeleteSql(`amtAuthDel_${utils.getCurDateStr()}.sql`,amtSqlParams);

utils.writeToOutDir(`金额授权条件模式表_${utils.getCurDateStr()}.xlsx`,buffer,config.authSuffix);

module.exports = {
  IB_OM_RULECOND_INFO:data, // 条件表数据
  IB_OM_AUTHMODE_INFO:modeData // 模式表数据
}