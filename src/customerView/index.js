
var xlsx = require('node-xlsx');
var fs = require("fs");
var path = require("path");
var _ = require("underscore");
var config = require("../config");
var utils = require("../utils/index");

var excelPath = path.resolve(__dirname,config.customerViewExcelName);
var workSheets = xlsx.parse(fs.readFileSync(excelPath));
var curWorkSheet = workSheets.find(v => v.name.includes("客户视图")).data;
curWorkSheet = curWorkSheet.filter(row => row.length != 0);

class CustomerView {
  constructor(){
    /**
     * uniqSheetData 结构
      {
        funcKey1:[[1,2,3],[4,5,6]],
        funcKey2:[[7,8,9]],
      }
     */
    this.uniqSheetData = _.groupBy(curWorkSheet.slice(1),function(row){
      return row[7] + row[8];
    })
    this.ruleNoObj = utils.generateNo(config.CV_START_NUM);// 规则号生成函数
    this.condNoObj = utils.generateNo(config.CV_START_NUM);// 条件号生成函数
    this.curDayStr = utils.getCurDateStr(); // 当前日期
    // 规则表
    this.ruleInfoData = [["RULE_NO","RULE_TYP_CD","HOLI_FLG","RULE_TRI_POSITION","SUIT_CHNL_SCP","SUIT_LPR_SCP","SUIT_ORG_SCP","SUIT_TX_SCP","RULE_COMNT","EFFT_FLG","OPER_TELR_NO","OPER_TM","OPER_RSN"]];
    // 条件表
    this.condData = [["OPRTN_COND_NO","DICTRY_NM","OPER_SYM_1","CMPR_VAL","OPER_SYM_2","VALUE2","TRAN_CD","COND_DESC","OPER_TELR_NO","OPER_TM","OPER_RSN","CMPR_VAL_DATA_DICTRY_FLG","PUB_DICTRY_FLG","DICTRY_DESC"]];
    // 规则条件映射表
    this.ruleCondData = [["RULE_COND_NO","CMPL_MODE_FLG","OPRTN_RULE_NO"]];
    // 授权模式表
    this.authModeData =[["MODE_NO","AUTH_TYP_CD","AUTH_LVL_CD","REMOTE_AUTH_LVL_CD","AUTH_ORG_TYP_CD","AUTH_ORG_NO","AUTH_POST_NO","UGNT_FLG","AUTH_DESC","HOST_AUTH_FLG","HOST_AUTH_TYP_CD","CNTRTN_AUTH_CENT_NM","CNTRTN_AUTH_LVL_CD","REMRK_1","APP_NO"]];
    this.init();
  }
  
  // 初始化
  init(){
    var uniqFuncKeys = Object.keys(this.uniqSheetData);
    for(var i=0;i<uniqFuncKeys.length;i++){
      var key = uniqFuncKeys[i];
      var sameRuleData = this.uniqSheetData[key];
      var RULE_NO = this.ruleNoObj().padStart(6);
      var OPRTN_COND_NO = "CV" + this.condNoObj().padStart(5);
      this.generateRuleInfoData(RULE_NO,sameRuleData[0]);
      for(var j=0;j<sameRuleData.length;j++){
        var curSheetRow = sameRuleData[j];
        this.generateCondData(RULE_NO,OPRTN_COND_NO,curSheetRow);
      }
    }
    debugger
  }
  // 生成规则表
  generateRuleInfoData(RULE_NO,curSheetRow){
    var RULE_NO = RULE_NO // 规则编号;
    var RULE_TYP_CD = "CV";  // 规则类型代码
    var HOLI_FLG = "N";  // 节假日标志
    var RULE_TRI_POSITION = "1";  // 规则触发位置
    var SUIT_CHNL_SCP = "TE";  // 适用渠道范围
    var SUIT_LPR_SCP = "001";  // 适用法人范围
    var SUIT_ORG_SCP = "*,";  // 适用机构范围
    var SUIT_TX_SCP = curSheetRow[2];  // 适用交易范围---
    var RULE_COMNT = curSheetRow[4];  // 规则说明---
    var EFFT_FLG = "1";  // 生效标志
    var OPER_TELR_NO = "900001";  // 操作柜员号
    var OPER_TM = this.curDayStr;  // 操作时间
    var OPER_RSN = "批量新增";  // 操作原因---
    var curRow = [RULE_NO,RULE_TYP_CD,HOLI_FLG,RULE_TRI_POSITION,SUIT_CHNL_SCP,SUIT_LPR_SCP,SUIT_ORG_SCP,SUIT_TX_SCP,RULE_COMNT,EFFT_FLG,OPER_TELR_NO,OPER_TM,OPER_RSN];
    this.ruleInfoData.push(curRow);
  }
    // 生成条件表
  generateCondData(RULE_NO,OPRTN_COND_NO,curSheetRow){
    var OPRTN_COND_NO = OPRTN_COND_NO;	 // 运营条件编号
    var DICTRY_NM = curSheetRow[8];	 // 字典名称
    var OPER_SYM_1 = curSheetRow[10];	 // 运算符号1
    var CMPR_VAL = curSheetRow[11];	 // 比较值
    var OPER_SYM_2 = curSheetRow[12];	 // 运算符号2
    var VALUE2 = curSheetRow[13];	 // 比较值2
    var TRAN_CD = curSheetRow[2];	 // 交易码
    var COND_DESC = curSheetRow[4];	 // 条件描述
    var OPER_TELR_NO = "900001";	 // 操作柜员号
    var OPER_TM = this.curDayStr;	 // 操作时间
    var OPER_RSN =  "批量新增";	 // 操作原因
    var CMPR_VAL_DATA_DICTRY_FLG = "1";	 // 比较值数据字典标志
    var PUB_DICTRY_FLG = "0";	 // 公共字典标志
    var DICTRY_DESC = curSheetRow[9];	 // 字典描述
    var curRow = [OPRTN_COND_NO,DICTRY_NM,OPER_SYM_1,CMPR_VAL,OPER_SYM_2,VALUE2,TRAN_CD,COND_DESC,OPER_TELR_NO,OPER_TM,OPER_RSN,CMPR_VAL_DATA_DICTRY_FLG,PUB_DICTRY_FLG,DICTRY_DESC];
    var isForceCond = (curSheetRow[6] || "0-是").includes("0"); //是否强制条件 0 是 | 1 否
    this.condData.push(curRow);
    // 生成规则条件映射表
    this.generateRuleCondData(RULE_NO,OPRTN_COND_NO,curSheetRow);
    // 生成模式表
    this.generateAuthModeData(OPRTN_COND_NO,curSheetRow);
  }
  // 生成规则条件映射表
  generateRuleCondData(RULE_NO,OPRTN_COND_NO,curSheetRow){
    var RULE_COND_NO = OPRTN_COND_NO; // 条件号
    var CMPL_MODE_FLG = (curSheetRow[6] || "1-否").includes("0") ? "0" : "1"; //强制条件 0 是 | 1 否
    var OPRTN_RULE_NO = RULE_NO; // 规则号
    var curRow = [RULE_COND_NO,CMPL_MODE_FLG,OPRTN_RULE_NO];
    // 一个规则对应多个相同条件的时候只需要写一次条件表
    var isExist = this.ruleCondData.find(v => (v[0] == RULE_COND_NO && v[1] == CMPL_MODE_FLG && v[2] == OPRTN_RULE_NO));
    if(isExist) return;
    this.ruleCondData.push(curRow);
  }
  // 生成模式表
  generateAuthModeData(MODE_NO,curSheetRow){
    var isAmtCond = curSheetRow[4].includes("金额超限");
    if(isAmtCond) return;
    var MODE_NO = MODE_NO; // 模式编号
    var AUTH_TYP_CD = ""; // 授权类型代码
    var AUTH_LVL_CD = curSheetRow[16] || 1; // 授权级别代码
    var REMOTE_AUTH_LVL_CD = ""; // 远程授权级别代码
    var AUTH_ORG_TYP_CD = ""; // 授权机构类型代码
    var AUTH_ORG_NO = ""; // 授权机构号
    var AUTH_POST_NO = "*"; // 授权岗位编号
    var UGNT_FLG = ""; // 加急标志
    var AUTH_DESC = curSheetRow[4]; // 授权描述
    var HOST_AUTH_FLG = ""; // 主机授权标志
    var HOST_AUTH_TYP_CD = ""; // 主机授权类型代码
    var CNTRTN_AUTH_CENT_NM = ""; // 集中授权中心名称
    var CNTRTN_AUTH_LVL_CD = ""; // 集中授权级别代码
    var REMRK_1 = curSheetRow[20] ? `${curSheetRow[20]}统计` : "" ; // 备注1
    var APP_NO = ""; // 应用编号
    var curRow = [MODE_NO,AUTH_TYP_CD,AUTH_LVL_CD,REMOTE_AUTH_LVL_CD,AUTH_ORG_TYP_CD,AUTH_ORG_NO,AUTH_POST_NO,UGNT_FLG,AUTH_DESC,HOST_AUTH_FLG,HOST_AUTH_TYP_CD,CNTRTN_AUTH_CENT_NM,CNTRTN_AUTH_LVL_CD,REMRK_1,APP_NO];
    var isExist = this.authModeData.find(v => v[0] == MODE_NO);
    if(isExist) return;
    this.authModeData.push(curRow);
  }

}

var auth = new CustomerView();

var arr = [
  {tableName:"IB_OM_RULE_INFO",data:auth.ruleInfoData},
  {tableName:"IB_OM_RULECOND_INFO",data:auth.condData},
  {tableName:"IB_OM_RULECOND_RLT",data:auth.ruleCondData},
  {tableName:"IB_OM_AUTHMODE_INFO",data:auth.authModeData}
];
debugger
var insertSql = utils.genInsertSql(arr);
var deleteSql = utils.genDeleteSql(arr);
utils.writeToOutDir("authInsert.sql",insertSql,"客户视图");
utils.writeToOutDir("authDelete.sql",deleteSql,"客户视图");




