
var xlsx = require('node-xlsx');
var fs = require("fs");
var path = require("path");
var _ = require("underscore");
var config = require("../config");
var utils = require("../utils/index");
var db = require("../db/index");
var isStage1 = process.argv[2] == "1";
utils.copySrcExcel(config.customerViewExcelName,__dirname,isStage1);

var excelPath = path.resolve(__dirname,config.customerViewExcelName);
var workSheets = xlsx.parse(fs.readFileSync(excelPath));
var curWorkSheet = workSheets.find(v => v.name.includes(config.cvSheetName)).data;
curWorkSheet = curWorkSheet.filter(row => row.length != 0);
utils.transformEmpty(curWorkSheet);
class CustomerView {
  constructor(){
    /**
     * uniqSheetData 结构
      {
        funcKey1:[[1,2,3],[4,5,6]],
        funcKey2:[[7,8,9]],
      }
     */
    // this.uniqSheetData = curWorkSheet.slice(1);
    this.uniqSheetData = _.groupBy(curWorkSheet.slice(1),function(row){
      return row[7] + row[2];
    })
    this.ruleNoObj = utils.generateNo(isStage1 ? config.CV_START_NUM_STAGE_1 : config.CV_START_NUM);// 规则号生成函数
    this.condNoObj = utils.generateNo(isStage1 ? config.CV_START_NUM_STAGE_1 : config.CV_START_NUM);// 条件号生成函数
    this.FIELD_SEQ_NO_OBJ = utils.generateNo(1);// 模式表FIELD_SEQ_NO 递增
    this.curDayStr = utils.getCurDateStr(); // 当前日期
    // 规则表
    this.ruleInfoData = [["RULE_NO","RULE_TYP_CD","HOLI_FLG","RULE_TRI_POSITION","SUIT_CHNL_SCP","SUIT_LPR_SCP","SUIT_ORG_SCP","SUIT_TX_SCP","RULE_COMNT","EFFT_FLG","EFFT_DT","INVALID_DT","OPER_TELR_NO","OPER_DT","OPER_RSN"]];
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
    // for(var i=0;i<this.uniqSheetData.length;i++){
    //   var curSheetRow = this.uniqSheetData[i];
    //   var RULE_NO = this.ruleNoObj().padStart(6);
    //   var OPRTN_COND_NO = "CV" + this.condNoObj().padStart(5);
    //   this.generateRuleInfoData(RULE_NO,curSheetRow);
    //   this.generateCondData(RULE_NO,OPRTN_COND_NO,curSheetRow);
    // }

    for(var key in this.uniqSheetData){
      if(!this.uniqSheetData.hasOwnProperty(key)) continue;
      var sameCondRows = this.uniqSheetData[key];
      var firstRow = this.uniqSheetData[key];
      var isForceCond = firstRow[0][13].includes("强制");

      var RULE_NO = this.ruleNoObj().padStart(6);
      var OPRTN_COND_NO = "CV" + this.condNoObj().padStart(5);
      this.generateRuleInfoData(RULE_NO,sameCondRows[0]);
      for(var i = 0;i<sameCondRows.length;i++){
        var curSheetRow = sameCondRows[i];
        this.generateCondData(RULE_NO,OPRTN_COND_NO,curSheetRow);
      }
    }

  }
  // 生成规则表
  generateRuleInfoData(RULE_NO,curSheetRow){
    var RULE_NO = RULE_NO // 规则编号;
    var RULE_TYP_CD = "CV";  // 规则类型代码
    var HOLI_FLG = "N";  // 节假日标志
    var RULE_TRI_POSITION = "1";  // 规则触发位置
    var SUIT_CHNL_SCP = "TE";  // 适用渠道范围
    var SUIT_LPR_SCP = "*";  // 适用法人范围
    var SUIT_ORG_SCP = "*,";  // 适用机构范围
    var SUIT_TX_SCP = curSheetRow[7];  // 适用交易范围---
    var RULE_COMNT = curSheetRow[13];  // 规则说明---
    var EFFT_FLG = "1";  // 生效标志
    var OPER_TELR_NO = "900001";  // 操作柜员号
    var OPER_DT = this.curDayStr;  // 操作时间
    var OPER_RSN = "批量新增";  // 操作原因---
    var EFFT_DT = "2020-01-01";
    var INVALID_DT = "2099-12-31";
    var curRow = [RULE_NO,RULE_TYP_CD,HOLI_FLG,RULE_TRI_POSITION,SUIT_CHNL_SCP,SUIT_LPR_SCP,SUIT_ORG_SCP,SUIT_TX_SCP,RULE_COMNT,EFFT_FLG,EFFT_DT,INVALID_DT,OPER_TELR_NO,OPER_DT,OPER_RSN];
    this.ruleInfoData.push(curRow);
  }
    // 生成条件表
  generateCondData(RULE_NO,OPRTN_COND_NO,curSheetRow){
    var OPRTN_COND_NO = OPRTN_COND_NO;	 // 运营条件编号
    var DICTRY_NM = curSheetRow[14];	 // 字典名称
    var OPER_SYM_1 = curSheetRow[17];	 // 运算符号1
    var CMPR_VAL = curSheetRow[18];	 // 比较值
    var OPER_SYM_2 = curSheetRow[19];	 // 运算符号2
    var VALUE2 = curSheetRow[20];	 // 比较值2
    var TRAN_CD = curSheetRow[7];	 // 交易码
    var COND_DESCR = curSheetRow[13];	 // 条件描述
    var OPER_TELR_NO = "900001";	 // 操作柜员号
    var OPER_DT = this.curDayStr;	 // 操作时间
    var OPER_RSN =  "批量新增";	 // 操作原因
    var CMPR_VAL_DATA_DICTRY_FLG = "1";	 // 比较值数据字典标志
    var PUB_DICTRY_FLG = "0";	 // 公共字典标志
    var DICTRY_DESCR = curSheetRow[9];	 // 字典描述
    var curRow = [OPRTN_COND_NO,DICTRY_NM,OPER_SYM_1,CMPR_VAL,OPER_SYM_2,VALUE2,TRAN_CD,COND_DESCR,OPER_TELR_NO,OPER_DT,OPER_RSN,CMPR_VAL_DATA_DICTRY_FLG,PUB_DICTRY_FLG,DICTRY_DESCR];
    var isForceCond = (curSheetRow[13] || "强制触发").includes("强制触发"); //是否强制条件
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
    var CMPL_MODE_FLG = (curSheetRow[13] || "强制触发").includes("强制触发") ? "0" : "1"; //强制条件 0 是 | 1 否
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
    var REF_ROW = [MODE_NO,this.FIELD_SEQ_NO_OBJ().number,"ref",curSheetRow[8],"CV"];
    var CV_ROW = [MODE_NO,this.FIELD_SEQ_NO_OBJ().number,"CV",curSheetRow[9],"CV"];
    var CC_ROW = [MODE_NO,this.FIELD_SEQ_NO_OBJ().number,"CC",curSheetRow[10],"CV"];
    var CF_ROW = [MODE_NO,this.FIELD_SEQ_NO_OBJ().number,"CF",curSheetRow[11],"CV"];
    var IC_ROW = [MODE_NO,this.FIELD_SEQ_NO_OBJ().number,"IC",curSheetRow[12],"CV"];

    this.modeInfo.push(REF_ROW);
    this.modeInfo.push(CV_ROW);
    this.modeInfo.push(CC_ROW);
    this.modeInfo.push(CF_ROW);
    this.modeInfo.push(IC_ROW);
  }

}

var auth = new CustomerView();

var arr = [
  {tableName:"IB_OM_RULE_INFO",data:auth.ruleInfoData},
  {tableName:"IB_OM_RULECOND_INFO",data:auth.condData},
  {tableName:"IB_OM_MODE_INFO",data:auth.modeInfo},
  {tableName:"IB_OM_RULECOND_RLT",data:auth.ruleCondData},
];
var insertSql = utils.genInsertSql(arr);
var deleteSql = utils.genDeleteSql(arr);



let deleteAll = `\n
DELETE FROM \`pub_db\`.\`IB_OM_RULE_INFO\` WHERE \`RULE_NO\` BETWEEN '025000' AND '029000';
DELETE FROM \`pub_db\`.\`IB_OM_RULECOND_INFO\` WHERE \`OPRTN_COND_NO\` BETWEEN 'CV25000' AND 'CV29000';
DELETE FROM \`pub_db\`.\`IB_OM_MODE_INFO\` WHERE \`RULE_MODE_NO\` BETWEEN 'CV25000' AND 'CV29000';
DELETE FROM \`pub_db\`.\`IB_OM_RULECOND_RLT\` WHERE \`OPRTN_RULE_NO\` BETWEEN '025000' AND '029000';
\n
`;
if(isStage1){
  deleteAll = `\n
DELETE FROM \`pub_db\`.\`IB_OM_RULE_INFO\` WHERE \`RULE_NO\` BETWEEN '020000' AND '024999';
DELETE FROM \`pub_db\`.\`IB_OM_RULECOND_INFO\` WHERE \`OPRTN_COND_NO\` BETWEEN 'CV20000' AND 'CV24999';
DELETE FROM \`pub_db\`.\`IB_OM_MODE_INFO\` WHERE \`RULE_MODE_NO\` BETWEEN 'CV20000' AND 'CV24999';
DELETE FROM \`pub_db\`.\`IB_OM_RULECOND_RLT\` WHERE \`OPRTN_RULE_NO\` BETWEEN '020000' AND '024999';
\n
`;
}


utils.writeToOutDir("customerViewInsert.sql",insertSql,"客户视图");
utils.writeToOutDir("customerViewDelete.sql",deleteSql,"客户视图");

let updateVersionSql = [deleteAll,insertSql].join(`\n`);
// utils.writeToOutDir(`刁信瑞-SIT3-客户视图规则${utils.getCurDateStr()}-.txt`,updateVersionSql,"上版");
utils.writeToOutDir((isStage1 ? config.CV_OUT_FILENAME_STAGE_1 : config.CV_OUT_FILENAME).replace("$date",utils.getCurDateStr()),updateVersionSql,"上版");

db.dbHandler(arr,"客户视图");

