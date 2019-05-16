var xlsx = require('node-xlsx');
var fs = require("fs");
var path = require("path");
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
// 币种
var currency = ["01","12","13","14","18","27","28","29","38"];
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
    var curRow1 = [ curCondNo,"txAmt",">=",cash[j][1],"<=",cash[j][2],"","金额超限触发授权","","","批量新增","1","0","交易金额" ];
    var curRow2 = [ curCondNo,"Ccy",  "==",currency[i],"",  "",       "","币种授权","","","批量新增","1","0","币种" ];
    //faceRecognitionRow 人脸识别为 "0" 表示未通过 或未成功 "1" 成功 三个条件且关系 不通过就远程授权
    var curModeRow = [curCondNo,"2",cash[j][0],"","","","*","",`币种${currency[i]},金额在范围【${cash[j][1]}-${cash[j][2]}】内，触发授权`,"","","","","",""];
    data.push(curRow1);
    data.push(curRow2);
    modeData.push(curModeRow);
    if(j === 0){
      // 只判断50000,	100000 区间 不通过则判断 金额 和 币种
      var faceRecognitionRow = [ curCondNo,"faceRecognition",  "==","0","","","","人脸识别授权","","","批量新增","1","0","人脸识别" ];
      data.push(faceRecognitionRow);
    }
    
  }
  for(var j=0;j<transfer.length;j++){
    var curCondNo = generateCondNo();
    var curRow3 = [ curCondNo,"TnNwSn",">=",transfer[j][1],"<=",transfer[j][2],"","金额超限触发授权","","","批量新增","1","0","交易金额" ];
    var curRow4 = [ curCondNo,"Ccy","==",currency[i],"","","","币种授权","","","批量新增","1","0","币种"];
    //faceRecognitionRow 人脸识别为 "0" 表示未通过 或未成功 "1" 成功 三个条件且关系 不通过就远程授权
    var curModeRow = [curCondNo,"2",transfer[j][0],"","","","*","",`币种${currency[i]},金额在范围【${transfer[j][1]}-${transfer[j][2]}】内，触发授权`,"","","","","",""];
    data.push(curRow3);
    data.push(curRow4);
    modeData.push(curModeRow);
    if(j === 0){
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
fs.writeFileSync(path.resolve(__dirname,process.cwd(),"out","金额授权条件模式表.xlsx"),buffer);

module.exports = {
  IB_OM_RULECOND_INFO:data, // 条件表数据
  IB_OM_AUTHMODE_INFO:modeData // 模式表数据
}