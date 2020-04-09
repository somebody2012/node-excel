
var xlsx = require('node-xlsx');
var fs = require("fs");
var path = require("path");
var config = require("../config");
var utils = require("../utils/index");
var _ = require("underscore");
var db = require("../db/index");
var chalk = require("chalk");


utils.copySrcExcel(config.doubleSrceenExcelName,__dirname);

var excelPath = path.resolve(__dirname,config.doubleSrceenExcelName);
var workSheets = xlsx.parse(fs.readFileSync(excelPath));
var doubleScreenWorkSheet = workSheets.find(v => v.name.includes(config.dsSheetName)).data;
var doubleScreenFieldsWorkSheet = workSheets.find(v => v.name.includes(config.dsSheetNameField)).data;

utils.transformEmpty(doubleScreenWorkSheet);
utils.transformEmpty(doubleScreenFieldsWorkSheet);

doubleScreenWorkSheet = doubleScreenWorkSheet.filter(row => row.length !== 0);
doubleScreenFieldsWorkSheet = doubleScreenFieldsWorkSheet.filter(row => row.length !== 0);
doubleScreenFieldsWorkSheet = doubleScreenFieldsWorkSheet.filter(row => {
  var nullValue = ["",undefined,null]
  console.log(chalk.blue(`${row[0]} 双屏确认字段信息 交易名称 或 推送字段 为空 被过滤`));
  return !nullValue.includes(row[1]) && !nullValue.includes(row[4])
})
class DoubleScreen {
  constructor(){
    this.curDayStr = utils.getCurDateStr(); // 当前日期
    this.startRuleNoFun = utils.generateNo(config.DS_START_NUM);// 规则号
    this.startCondNoFun = utils.generateNo(config.DS_START_NUM);// 条件号
    this.FIELD_SEQ_NO_FUN = utils.generateNo(1);// 模式序号
    /**
     * uniqSheetData 结构
      {
        funcKey1:[[1,2,3],[4,5,6]],
        funcKey2:[[7,8,9]],
      }
     */
    this.uniqSheetData =  _.groupBy(doubleScreenWorkSheet.slice(1),function(row){
      return row[7] + "_" + row[2];
    })
    // 双屏字段表
    this.uniqSheetFieldsData =  _.groupBy(doubleScreenFieldsWorkSheet.slice(1),function(row){
      return row[0] + "_" + row[5];
    })
    // 规则表 IB_OM_RULE_INFO
    this.ruleInfoData = [["RULE_NO","RULE_TYP_CD","HOLI_FLG","RULE_TRI_POSITION","SUIT_CHNL_SCP","SUIT_LPR_SCP","SUIT_ORG_SCP","SUIT_TX_SCP","RULE_COMNT","EFFT_FLG","OPER_TELR_NO","OPER_DT","OPER_RSN"]];
    // 条件表 IB_OM_RULECOND_INFO
    this.condData = [["OPRTN_COND_NO","DICTRY_NM","OPER_SYM_1","CMPR_VAL","OPER_SYM_2","VALUE2","TRAN_CD","COND_DESCR","OPER_TELR_NO","OPER_DT","OPER_RSN","CMPR_VAL_DATA_DICTRY_FLG","PUB_DICTRY_FLG","DICTRY_DESCR"]];
    // 规则条件映射表 IB_OM_RULECOND_RLT
    this.ruleCondData = [["RULE_COND_NO","CMPL_MODE_FLG","OPRTN_RULE_NO"]];
    // 模式表
    this.modeInfo = [["RULE_MODE_NO","FIELD_SEQ_NO","FIELD_NM","FIELD_DICTRY_NM","RULE_MODE_TYP_CD"]];
    // 双屏字段表 TE_PARA_OUTCABINETCFG_INFO
    this.doubleScreenField = [["TRAN_CD","BUNDRY_INDCT_HEDLN_NM","SCRN_NO","SCRN_SORT_SEQ_NO","BUNDRY_INDCT_NM","GT_VAL_SCP_CD","KEY_VAL","ENTR_NM","STUS_CD","REMRK_1"]];
    this.init();
  }
  init(){
    var uniqSheetDataKeys = Object.keys(this.uniqSheetData);
    uniqSheetDataKeys.forEach((key,index) => {
      // 同一条件数据 
      var data = this.uniqSheetData[key];
      var RULE_NO_OBJ = this.startRuleNoFun();
      var OPRTN_COND_NO_OBJ = this.startCondNoFun();
      var RULE_NO = RULE_NO_OBJ.padStart(6);
      var OPRTN_COND_NO = "DS" + OPRTN_COND_NO_OBJ.padStart(5);
      // 生成规则
      this.generateRuleInfoData(RULE_NO,data[0]);
      for(var i=0;i<data.length;i++){
        var curSheetRow = data[i];
        
        // 是否强制条件
        var isForceCond = curSheetRow[8].includes("强制双屏确认");
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
    // 生成双屏字段表
    this.generateDsFields();
  }
  // 生成规则表
  generateRuleInfoData(RULE_NO,curSheetRow){
    var RULE_NO = RULE_NO;
    var RULE_TYP_CD = "DS";
    var HOLI_FLG = "N";
    var RULE_TRI_POSITION = "1";
    var SUIT_CHNL_SCP = "TE";
    var SUIT_LPR_SCP = "0000";
    var SUIT_ORG_SCP = curSheetRow[6];
    var SUIT_TX_SCP = curSheetRow[7];
    var RULE_COMNT = curSheetRow[16];
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
    var DICTRY_NM = curSheetRow[9] ;
    var OPER_SYM_1 = curSheetRow[12] ;
    var CMPR_VAL = curSheetRow[13] ;
    var OPER_SYM_2 = curSheetRow[14] ;
    var VALUE2 = curSheetRow[15] ;
    var TRAN_CD = curSheetRow[7] ;
    var COND_DESCR = curSheetRow[8] ;
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
    
    var RULE_MODE_NO = RULE_MODE_NO;//规则模式编号
    var FIELD_SEQ_NO = this.FIELD_SEQ_NO_FUN().number;//字段序号
    var FIELD_NM = "screenSeqNo";//字段名称   用来存屏幕编号
    var FIELD_DICTRY_NM = curSheetRow[17];//字段字典名称
    var RULE_MODE_TYP_CD = "DS";//规则模式类型代码
    var curRow = [RULE_MODE_NO,FIELD_SEQ_NO,FIELD_NM,FIELD_DICTRY_NM,RULE_MODE_TYP_CD];
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
  // 生成双屏字段表
  generateDsFields(){
    var keys = Object.keys(this.uniqSheetFieldsData);
    keys.forEach((key,index) => {
      var data = this.uniqSheetFieldsData[key];
      for(var i=0;i<data.length;i++){
        var row = data[i];
        var TRAN_CD = row[0]; //交易码
        var BUNDRY_INDCT_HEDLN_NM = row[1]; //界面显示标题名称
        var SCRN_NO = row[5]; //屏幕编号
        var SCRN_SORT_SEQ_NO = row[2]; //屏幕排列序号
        var BUNDRY_INDCT_NM = row[3]; //界面显示名称
        var GT_VAL_SCP_CD = row[6] || "0"; //取值范围代码 0 变量 2 固定值 3 金额
        var KEY_VAL = row[7] || ""; //KEY取值 取值范围位 2 时 用此字段
        var ENTR_NM = row[4]; //条目名称
        var STUS_CD = "1"; //状态代码 1 生效
        var REMRK_1 = ""; //备注1
        var curRow = [TRAN_CD,BUNDRY_INDCT_HEDLN_NM,SCRN_NO,SCRN_SORT_SEQ_NO,BUNDRY_INDCT_NM,GT_VAL_SCP_CD,KEY_VAL,ENTR_NM,STUS_CD,REMRK_1];
        var isExist = this.doubleScreenField.find(v => (v[0] == TRAN_CD && v[2] == SCRN_NO && v[3] == SCRN_SORT_SEQ_NO));
        if(isExist) return;
        this.doubleScreenField.push(curRow);
      }
    });
  }
}









var doubleScreen = new DoubleScreen();

// var buffer = xlsx.build([
//   {name: "规则IB_OM_RULE_INFO", data: doubleScreen.ruleInfoData},
//   {name: "条件IB_OM_RULECOND_INFO", data: doubleScreen.condData},
//   {name: "规则条件映射IB_OM_RULECOND_RLT", data: doubleScreen.ruleCondData},
//   {name: "双屏字段表TE_PARA_OUTCABINETCFG_INFO", data: doubleScreen.authModeData},
// ]); 


var sqlParams = [
  {tableName:"IB_OM_RULE_INFO",data:doubleScreen.ruleInfoData},
  {tableName:"IB_OM_RULECOND_INFO",data:doubleScreen.condData},
  {tableName:"IB_OM_MODE_INFO",data:doubleScreen.modeInfo},
  {tableName:"IB_OM_RULECOND_RLT",data:doubleScreen.ruleCondData},
  {tableName:"TE_PARA_OUTCABINETCFG_INFO",data:doubleScreen.doubleScreenField}
];

var insertSql = utils.genInsertSql(sqlParams);

var deleteSql = utils.genDeleteSql(sqlParams);

let deleteAll = `\n
DELETE FROM IB_OM_RULE_INFO WHERE RULE_TYP_CD = 'DS';
DELETE FROM IB_OM_RULECOND_INFO WHERE OPRTN_COND_NO LIKE 'DS%';
DELETE FROM IB_OM_RULECOND_RLT WHERE RULE_COND_NO LIKE 'DS%';
DELETE FROM IB_OM_MODE_INFO WHERE RULE_MODE_NO LIKE 'DS%';
\n
`;

utils.writeToOutDir("dsInsert.sql",insertSql,"双屏确认");
utils.writeToOutDir("dsDelete.sql",deleteSql,"双屏确认");

let updateVersionSql = [deleteSql,insertSql].join(`\n\n\n\n\n\n`);
utils.writeToOutDir(`刁信瑞-SIT3-双屏确认规则${utils.getCurDateStr()}-.txt`,updateVersionSql,"上版");

// db.dbHandler(sqlParams,"双屏");






