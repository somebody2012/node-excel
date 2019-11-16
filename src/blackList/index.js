
var xlsx = require('node-xlsx');
var fs = require("fs");
var path = require("path");
var _ = require("underscore");
var config = require("../config");
var utils = require("../utils/index");
var db = require("../db/index");
var chalk = require("chalk");

utils.copySrcExcel(config.blackListExcelName,__dirname);

var excelPath = path.resolve(__dirname,config.blackListExcelName);
var workSheets = xlsx.parse(fs.readFileSync(excelPath));
var curWorkSheet = workSheets.find(v => v.name.includes(config.balckListSheetName)).data;
curWorkSheet = curWorkSheet.filter(row => {
  var isEmpty =( row.length == 0);
  var needCheckRow = [row[0],row[1],row[6],row[7]];
  var isPassedCheck = needCheckRow.some(v => !v);
  if(isPassedCheck){
    console.log(`${row[1]}  数据配置不完整 被过滤`);
  }
  return !(isEmpty || isPassedCheck);
});
utils.transformEmpty(curWorkSheet);
class BlackList {
  constructor(){
    /**
     * uniqSheetData 结构
      {
        funcKey1:[[1,2,3],[4,5,6]],
        funcKey2:[[7,8,9]],
      }
     */
    this.uniqSheetData = curWorkSheet.slice(1);
    this.uniqSheetData = _.groupBy(curWorkSheet.slice(1),function(row){
      return row[7];
    })
    this.ruleNoObj = utils.generateNo(config.BN_START_NUM);// 规则号生成函数
    this.condNoObj = utils.generateNo(config.BN_START_NUM);// 条件号生成函数
    this.FIELD_SEQ_NO_OBJ = utils.generateNo(config.BN_START_NUM);// 模式表FIELD_SEQ_NO 递增
    this.curDayStr = utils.getCurDateStr(); // 当前日期
    // 规则表
    this.ruleInfoData = [["RULE_NO","RULE_TYP_CD","HOLI_FLG","RULE_TRI_POSITION","SUIT_CHNL_SCP","SUIT_LPR_SCP","SUIT_ORG_SCP","SUIT_TX_SCP","RULE_COMNT","EFFT_FLG","OPER_TELR_NO","OPER_DT","OPER_RSN"]];
    // 条件表
    this.condData = [["OPRTN_COND_NO","DICTRY_NM","OPER_SYM_1","CMPR_VAL","OPER_SYM_2","VALUE2","TRAN_CD","COND_DESCR","OPER_TELR_NO","OPER_DT","OPER_RSN","CMPR_VAL_DATA_DICTRY_FLG","PUB_DICTRY_FLG","DICTRY_DESCR"]];
    // 规则条件映射表
    this.ruleCondData = [["RULE_COND_NO","CMPL_MODE_FLG","OPRTN_RULE_NO"]];
    //	规则模式编号 字段序号 字段名称 字段字典名称 规则模式类型代码
    this.modeInfo = [["RULE_MODE_NO","FIELD_SEQ_NO","FIELD_NM","FIELD_DICTRY_NM","RULE_MODE_TYP_CD"]];
    this.init();
  }
  
  // 初始化
  init(){


    var uniqFuncKeys = Object.keys(this.uniqSheetData);
    for(var i=0;i<uniqFuncKeys.length;i++){
      var key = uniqFuncKeys[i];
      var sameRuleData = this.uniqSheetData[key];
      var RULE_NO = this.ruleNoObj().padStart(6);
      var OPRTN_COND_NO = "BN" + this.condNoObj().padStart(5);
      this.generateRuleInfoData(RULE_NO,sameRuleData[0]);
      for(var j=0;j<sameRuleData.length;j++){
        var curSheetRow = sameRuleData[j];
        this.generateCondData(RULE_NO,OPRTN_COND_NO,curSheetRow);
      }
    }




    // for(var i=0;i<this.uniqSheetData.length;i++){
    //   var curSheetRow = this.uniqSheetData[i];
    //   var RULE_NO = this.ruleNoObj().padStart(6);
    //   var OPRTN_COND_NO = "BN" + this.condNoObj().padStart(5);
    //   this.generateRuleInfoData(RULE_NO,curSheetRow);
    //   this.generateCondData(RULE_NO,OPRTN_COND_NO,curSheetRow);
    // }
  }
  // 生成规则表
  generateRuleInfoData(RULE_NO,curSheetRow){
    var RULE_NO = RULE_NO // 规则编号;
    var RULE_TYP_CD = "BN";  // 规则类型代码
    var HOLI_FLG = "N";  // 节假日标志
    var RULE_TRI_POSITION = "1";  // 规则触发位置
    var SUIT_CHNL_SCP = "TE";  // 适用渠道范围
    var SUIT_LPR_SCP = curSheetRow[4] || "0000";  // 适用法人范围
    var SUIT_ORG_SCP = curSheetRow[5] || "*,";  // 适用机构范围
    var SUIT_TX_SCP = curSheetRow[6];  // 适用交易范围---
    var RULE_COMNT = curSheetRow[9];  // 规则说明---
    var EFFT_FLG = "1";  // 生效标志
    var OPER_TELR_NO = "900001";  // 操作柜员号
    var OPER_DT = this.curDayStr;  // 操作时间
    var OPER_RSN = "批量新增";  // 操作原因---
    var curRow = [RULE_NO,RULE_TYP_CD,HOLI_FLG,RULE_TRI_POSITION,SUIT_CHNL_SCP,SUIT_LPR_SCP,SUIT_ORG_SCP,SUIT_TX_SCP,RULE_COMNT,EFFT_FLG,OPER_TELR_NO,OPER_DT,OPER_RSN];
    this.ruleInfoData.push(curRow);
  }
    // 生成条件表
  generateCondData(RULE_NO,OPRTN_COND_NO,curSheetRow){
    var OPRTN_COND_NO = OPRTN_COND_NO;	 // 运营条件编号
    var DICTRY_NM = curSheetRow[10];	 // 字典名称
    var OPER_SYM_1 = curSheetRow[12];	 // 运算符号1
    var CMPR_VAL = curSheetRow[13];	 // 比较值
    var OPER_SYM_2 = curSheetRow[14];	 // 运算符号2
    var VALUE2 = curSheetRow[15];	 // 比较值2
    var TRAN_CD = curSheetRow[6];	 // 交易码
    var COND_DESCR = curSheetRow[9];	 // 条件描述
    var OPER_TELR_NO = "900001";	 // 操作柜员号
    var OPER_DT = this.curDayStr;	 // 操作时间
    var OPER_RSN =  "批量新增";	 // 操作原因
    var CMPR_VAL_DATA_DICTRY_FLG = "1";	 // 比较值数据字典标志
    var PUB_DICTRY_FLG = "0";	 // 公共字典标志
    var DICTRY_DESCR = curSheetRow[9];	 // 字典描述
    var curRow = [OPRTN_COND_NO,DICTRY_NM,OPER_SYM_1,CMPR_VAL,OPER_SYM_2,VALUE2,TRAN_CD,COND_DESCR,OPER_TELR_NO,OPER_DT,OPER_RSN,CMPR_VAL_DATA_DICTRY_FLG,PUB_DICTRY_FLG,DICTRY_DESCR];
    var isForceCond = (curSheetRow[8] || "是").includes("是"); //是否强制条件
    if(!isForceCond) {
      this.condData.push(curRow);
    };
    // 生成规则条件映射表
    this.generateRuleCondData(RULE_NO,OPRTN_COND_NO,curSheetRow);
    // 生成模式表
    this.generateAuthModeData(OPRTN_COND_NO,curSheetRow);
  }
  // 生成规则条件映射表
  generateRuleCondData(RULE_NO,OPRTN_COND_NO,curSheetRow){
    var RULE_COND_NO = OPRTN_COND_NO; // 条件号
    var CMPL_MODE_FLG = (curSheetRow[8] || "是").includes("是") ? "0" : "1"; //强制条件 0 是 | 1 否
    var OPRTN_RULE_NO = RULE_NO; // 规则号
    var curRow = [RULE_COND_NO,CMPL_MODE_FLG,OPRTN_RULE_NO];
    // 一个规则对应多个相同条件的时候只需要写一次条件表
    var isExist = this.ruleCondData.find(v => (v[0] == RULE_COND_NO && v[1] == CMPL_MODE_FLG && v[2] == OPRTN_RULE_NO));
    if(isExist) return;
    this.ruleCondData.push(curRow);
  }
  // 生成模式表
  generateAuthModeData(MODE_NO,curSheetRow){
    //规则模式编号 字段序号 字段名称 字段字典名称 规则模式类型代码
    var row1 = [MODE_NO,this.FIELD_SEQ_NO_OBJ().number,"blockCodeStr",String(curSheetRow[17] || ""),"BN"];
    var row2 = [MODE_NO,this.FIELD_SEQ_NO_OBJ().number,"checkFields",String(curSheetRow[18] || ""),"BN"];
    var isExist = this.modeInfo.find(v => v[0] == MODE_NO);
    if(!isExist){
      this.modeInfo.push(row1);
      this.modeInfo.push(row2);
    }
  }
}

var auth = new BlackList();

var arr = [
  {tableName:"IB_OM_RULE_INFO",data:auth.ruleInfoData},
  {tableName:"IB_OM_RULECOND_INFO",data:auth.condData},
  {tableName:"IB_OM_RULECOND_RLT",data:auth.ruleCondData},
  {tableName:"IB_OM_MODE_INFO",data:auth.modeInfo}
];
var insertSql = utils.genInsertSql(arr);
var deleteSql = utils.genDeleteSql(arr);


let deleteAll = `\n
DELETE FROM IB_OM_RULE_INFO WHERE RULE_TYP_CD = 'BN';
DELETE FROM IB_OM_RULECOND_INFO WHERE OPRTN_COND_NO LIKE 'BN%';
DELETE FROM IB_OM_RULECOND_RLT WHERE RULE_COND_NO LIKE 'BN%';
DELETE FROM IB_OM_MODE_INFO WHERE RULE_MODE_NO LIKE 'BN%';
\n
`;



utils.writeToOutDir("blackListInsert.sql",insertSql,"黑名单");
utils.writeToOutDir("blackListDelete.sql",deleteSql + "\n" + deleteAll,"黑名单");

let updateVersionSql = [deleteAll,insertSql].join(`\n\n\n\n\n\n`);
utils.writeToOutDir(`刁信瑞-SIT3-黑名单规则${utils.getCurDateStr()}-.txt`,updateVersionSql,"上版");

db.dbHandler(arr,"黑名单");
