
var xlsx = require('node-xlsx');
var fs = require("fs");
var path = require("path");
var config = require("../config");
var utils = require("../utils/index");
var _ = require("underscore");
var db = require("../db/index");
var chalk = require("chalk");


utils.copySrcExcel(config.ckExcelName,__dirname);

var excelPath = path.resolve(__dirname,config.ckExcelName);
var workSheets = xlsx.parse(fs.readFileSync(excelPath));
// 规则页签
var ckScreenWorkSheet = workSheets.find(v => v.name.includes(config.ckSheetName)).data;
// 字段页签
var ckScreenFieldsWorkSheet = workSheets.find(v => v.name.includes(config.ckSheetNameField)).data;


ckScreenWorkSheet = ckScreenWorkSheet.filter(row => {
  var isEmptyRow = (row.length == 0);
  var nullValue = ["",undefined,null]
  var isEmptyCell = [row[2],row[4]].some(v => nullValue.includes(v));
  var isEmpty = isEmptyRow || isEmptyCell;
  if(isEmpty){
    console.log(chalk.blue(`${row[0]} 复核规则统计被过滤  ${row.toString()}`));
  }
  return !isEmpty;
})
ckScreenFieldsWorkSheet = ckScreenFieldsWorkSheet.filter(row => {
  var isEmptyRow = (row.length == 0);
  var nullValue = ["",undefined,null]
  var isEmptyCell = [row[0],row[1],row[2]].some(v => nullValue.includes(v));
  var isEmpty = isEmptyRow || isEmptyCell;
  if(isEmpty){
    console.log(chalk.blue(`${row[0]} 复核字段统计被过滤  ${row.toString()}`));
  }
  return !isEmpty;
})
class CK {
  constructor(){
    this.curDayStr = utils.getCurDateStr(); // 当前日期
    this.startRuleNoFun = utils.generateNo(config.CK_START_NUM);// 规则号
    this.startCkNoFun = utils.generateNo(config.CK_START_NUM);// 条件号
    /**
     * uniqSheetData 结构
      {
        funcKey1:[[1,2,3],[4,5,6]],
        funcKey2:[[7,8,9]],
      }
     */
    this.uniqSheetData =  _.groupBy(ckScreenWorkSheet.slice(1),function(row){
      return row[4];
    })
    // 复核字段表
    this.uniqSheetFieldsData =  ckScreenFieldsWorkSheet.slice(1);
    // 规则表 IB_OM_RULE_INFO
    this.ruleInfoData = [["RULE_NO","RULE_TYP_CD","HOLI_FLG","RULE_TRI_POSITION","SUIT_CHNL_SCP","SUIT_LPR_SCP","SUIT_ORG_SCP","SUIT_TX_SCP","RULE_COMNT","EFFT_FLG","OPER_TELR_NO","OPER_DT","OPER_RSN"]];
    // 条件表 IB_OM_RULECOND_INFO
    this.condData = [["OPRTN_COND_NO","DICTRY_NM","OPER_SYM_1","CMPR_VAL","OPER_SYM_2","VALUE2","TRAN_CD","COND_DESCR","OPER_TELR_NO","OPER_DT","OPER_RSN","CMPR_VAL_DATA_DICTRY_FLG","PUB_DICTRY_FLG","DICTRY_DESCR"]];
    // 规则条件映射表 IB_OM_RULECOND_RLT
    this.ruleCondData = [["RULE_COND_NO","CMPL_MODE_FLG","OPRTN_RULE_NO"]];
    // 模式表 IB_OM_CHECKMODE_INFO
    // RCHK_MODE_ID	复核模式ID
    // RCHK_PSTN_NO	复核岗位编号
    // RCHK_LVL_CD	复核级别代码
    // PMIT_PRACT_TELR_RCHK_FLG	允许实习柜员复核标志
    // RCHK_RSN_CD	复核原因代码
    // REMRK	备注
    // REMRK_1	备注1
    // APP_NO	应用编号
    this.modeInfo = [["RCHK_MODE_ID","RCHK_PSTN_NO","RCHK_LVL_CD","PMIT_PRACT_TELR_RCHK_FLG","RCHK_RSN_CD","REMRK","REMRK_1","APP_NO"]];
    // 复核字段表 IB_OM_CHECKFIELD_RLT
    // TRAN_CD	交易码
    // LPR_NO	法人编号
    // RCHK_FIELD_NM	复核字段名称
    // RCHK_FIELD_INFO	复核字段信息
    // STUS_CD	状态代码
    this.ckField = [["TRAN_CD","LPR_NO","RCHK_FIELD_NM","RCHK_FIELD_INFO","STUS_CD"]];
    this.init();
  }
  init(){
    var uniqSheetDataKeys = Object.keys(this.uniqSheetData);
    uniqSheetDataKeys.forEach((key,index) => {
      // 同一条件数据 
      var data = this.uniqSheetData[key];
      var RULE_NO_OBJ = this.startRuleNoFun();
      var OPRTN_COND_NO_OBJ = this.startCkNoFun();
      var RULE_NO = RULE_NO_OBJ.padStart(6);
      var OPRTN_COND_NO = "CK" + OPRTN_COND_NO_OBJ.padStart(5);
      // 生成规则
      this.generateRuleInfoData(RULE_NO,data[0]);
      for(var i=0;i<data.length;i++){
        var curSheetRow = data[i];
        
        // 是否强制条件
        var isForceCond = (curSheetRow[5] || "是").includes("是");
        if(!isForceCond){
          // 如果不是强制条件则不生成条件表
          // 生成条件表
          this.generateCondData(OPRTN_COND_NO,curSheetRow);
        }
        var isExistMode = this.modeInfo.find(v => v[0] == OPRTN_COND_NO);
      }
      if(!isExistMode){
        this.generateModeInfo(OPRTN_COND_NO,data[0]);
      }
      // 生成规则条件映射表
      this.generateRuleCondData(RULE_NO,OPRTN_COND_NO,isForceCond);
    });
    // 生成复核字段表
    this.generateCkFields();
  }
  // 生成规则表
  generateRuleInfoData(RULE_NO,curSheetRow){
    var RULE_NO = RULE_NO;
    var RULE_TYP_CD = "CK";
    var HOLI_FLG = "N";
    var RULE_TRI_POSITION = "1";
    var SUIT_CHNL_SCP = "TE";
    var SUIT_LPR_SCP = curSheetRow[13] || "9999";
    var SUIT_ORG_SCP = "*,";
    var SUIT_TX_SCP = curSheetRow[2];
    var RULE_COMNT = curSheetRow[6] || "无规则说明";
    var EFFT_FLG = "1";
    var OPER_TELR_NO = "";
    var OPER_DT = this.curDayStr;  // 操作时间
    var OPER_RSN = "批量新增";
    var curRow = [RULE_NO,RULE_TYP_CD,HOLI_FLG,RULE_TRI_POSITION,SUIT_CHNL_SCP,SUIT_LPR_SCP,SUIT_ORG_SCP,SUIT_TX_SCP,RULE_COMNT,EFFT_FLG,OPER_TELR_NO,OPER_DT,OPER_RSN];
    var isExist = this.ruleInfoData.find(v => v[0] == RULE_NO);
    if(isExist) return;
    this.ruleInfoData.push(curRow);
  }
  // 生成条件表
  generateCondData(OPRTN_COND_NO,curSheetRow){
    var OPRTN_COND_NO = OPRTN_COND_NO ;
    var DICTRY_NM = curSheetRow[7] ;
    var OPER_SYM_1 = curSheetRow[9] ;
    var CMPR_VAL = curSheetRow[10] ;
    var OPER_SYM_2 = curSheetRow[11] ;
    var VALUE2 = curSheetRow[12] ;
    var TRAN_CD = curSheetRow[2] ;
    var COND_DESCR = curSheetRow[6] ;
    var OPER_TELR_NO = "" ;
    var OPER_DT = this.curDayStr;  // 操作时间
    var OPER_RSN = "批量新增" ;
    var CMPR_VAL_DATA_DICTRY_FLG = "1" ;
    var PUB_DICTRY_FLG = "0" ;
    var DICTRY_DESCR = "" ;  
    var curRow = [OPRTN_COND_NO,DICTRY_NM,OPER_SYM_1,CMPR_VAL,OPER_SYM_2,VALUE2,TRAN_CD,COND_DESCR,OPER_TELR_NO,OPER_DT,OPER_RSN,CMPR_VAL_DATA_DICTRY_FLG,PUB_DICTRY_FLG,DICTRY_DESCR];
    this.condData.push(curRow);
  }
  // 生成模式表
  generateModeInfo(RULE_MODE_NO,curSheetRow){
    var RCHK_MODE_ID = RULE_MODE_NO; //	复核模式ID
    var RCHK_PSTN_NO = curSheetRow[14]; //	复核岗位编号
    var RCHK_LVL_CD = curSheetRow[15]; //	复核级别代码
    var PMIT_PRACT_TELR_RCHK_FLG = (curSheetRow[16] || "否").includes("是") ? "1" : "2"; //	允许实习柜员复核标志
    var RCHK_RSN_CD = curSheetRow[6] || "无"; //	复核原因代码
    var REMRK = curSheetRow[6] || "无"; //	备注
    var REMRK_1 = curSheetRow[6] || "无"; //	备注1
    var APP_NO = "TE"; //	应用编号
    var curRow = [RCHK_MODE_ID,RCHK_PSTN_NO,RCHK_LVL_CD,PMIT_PRACT_TELR_RCHK_FLG,RCHK_RSN_CD,REMRK,REMRK_1,APP_NO];
    this.modeInfo.push(curRow);
  }
  // 生成规则条件映射表
  generateRuleCondData(RULE_NO,OPRTN_COND_NO,isForceCond){
    var RULE_COND_NO = OPRTN_COND_NO;
    var CMPL_MODE_FLG = isForceCond ? "0" : "1";
    var OPRTN_RULE_NO = RULE_NO;
    var curRow = [RULE_COND_NO,CMPL_MODE_FLG,OPRTN_RULE_NO];
    this.ruleCondData.push(curRow);
  }
  // 生成复核字段表
  generateCkFields(){
    // var keys = Object.keys(this.uniqSheetFieldsData);
    this.uniqSheetFieldsData.forEach((row,index) => {
      // var data = this.uniqSheetFieldsData[key];
      for(var i=0;i<this.uniqSheetFieldsData.length;i++){
        var row = this.uniqSheetFieldsData[i];
        var TRAN_CD = row[0]; //	交易码
        var LPR_NO = row[1]; //	法人编号
        var RCHK_FIELD_NM = row[2]; //	复核字段名称
        var RCHK_FIELD_INFO = row[3]; //	复核字段信息
        var STUS_CD = "1"; //	状态代码

        var curRow = [TRAN_CD,LPR_NO,RCHK_FIELD_NM,RCHK_FIELD_INFO,STUS_CD];
        var isExist = this.ckField.find(v => (v[0] == curRow[0] && v[1] == curRow[1] & v[2] == curRow[2] & v[3] == curRow[3]));
        if(isExist) return;
        this.ckField.push(curRow);
      }
    });
  }
}









var ck = new CK();


var sqlParams = [
  {tableName:"IB_OM_RULE_INFO",data:ck.ruleInfoData},
  {tableName:"IB_OM_RULECOND_INFO",data:ck.condData},
  {tableName:"IB_OM_CHECKMODE_INFO",data:ck.modeInfo},
  {tableName:"IB_OM_RULECOND_RLT",data:ck.ruleCondData},
  {tableName:"IB_OM_CHECKFIELD_RLT",data:ck.ckField}
];

var insertSql = utils.genInsertSql(sqlParams);

var deleteSql = utils.genDeleteSql(sqlParams);

utils.writeToOutDir("dsInsert.sql",insertSql,"复核");
utils.writeToOutDir("dsDelete.sql",deleteSql,"复核");


db.dbHandler(sqlParams,"复核");






