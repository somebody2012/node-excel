var xlsx = require('node-xlsx');
var fs = require("fs");
var path = require("path");

var utils = require("./utils.js");
var _ = require("underscore");
var amtAuthData = require("./parseAmtAuthExcel/index");
var generateSql = require("./generateSql");
var config = require("../config");
var excelPath = path.resolve(__dirname,config.srcExcelName);
var workSheets = xlsx.parse(fs.readFileSync(excelPath));
class Auth {
  constructor(){
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
    // 01	156	币种-人名币
    this.minAmtCondNoOfRMB = 1; // 人名币金额 公共条件范围
    this.maxAmtCondNoOfRMB = 16;

    this.amtKeywords = "金额超限";// 判断是否金额授权
    // 条件从200 开始 200 以下给金额授权条件用
    this.generateNo = utils.generateNo(200);
    this.curDayStr = utils.getCurDateStr();
    this.sheet1 = workSheets[0].data;
    // 规则表
    this.ruleInfoData = [["RULE_NO","RULE_TYP_CD","HOLI_FLG","RULE_TRI_POSITION","SUIT_CHNL_SCP","SUIT_LPR_SCP","SUIT_ORG_SCP","SUIT_TX_SCP","RULE_COMNT","EFFT_FLG","OPER_TELR_NO","OPER_TM","OPER_RSN"]];
    // 条件表
    this.condData = [["OPRTN_COND_NO","DICTRY_NM","OPER_SYM_1","CMPR_VAL","OPER_SYM_2","VALUE2","TRAN_CD","COND_DESC","OPER_TELR_NO","OPER_TM","OPER_RSN","CMPR_VAL_DATA_DICTRY_FLG","PUB_DICTRY_FLG","DICTRY_DESC"]];
    // 规则条件映射表
    this.ruleCondData = [["RULE_COND_NO","CMPL_MODE_FLG","OPRTN_RULE_NO"]];
    // 授权模式表
    this.authModeData =[["MODE_NO","AUTH_TYP_CD","AUTH_LVL_CD","REMOTE_AUTH_LVL_CD","AUTH_ORG_TYP_CD","AUTH_ORG_NO","AUTH_POST_NO","UGNT_FLG","AUTH_DESC","HOST_AUTH_FLG","HOST_AUTH_TYP_CD","CNTRTN_AUTH_CENT_NM","CNTRTN_AUTH_LVL_CD","REMRK_1","APP_NO"]];
    // 字段映射表
    this.reflexData = [["TRAN_CD","PUB_DICTRY_NM","PRIV_DICTRY_NM","PULDW_MAPG_DICTRY_NM"]];
    // 字段要素表
    this.fieldFactor = [["DICTRY_NM","DICTRY_DESC","DICTRY_TYP_CD","FIELD_CMPR","DATA_ATTR_DESC"]];
    // 金额条件表
    this.IB_OM_RULECOND_INFO_AMT = [[]];
    // 金额授权模式表
    this.IB_OM_AUTHMODE_INFO_AMT = [[]];
    // 金额授权 条件表 模式表 融合
    this.concatAmtData();
    this.init();
  }
  
  // 初始化
  init(){
    var sheet1 = this.sheet1.filter(row => row.length !== 0);
    var startParseRowIndex = 1;
    /**
     * uniqSheetData 结构
      {
        funcKey1:[[1,2,3],[4,5,6]],
        funcKey2:[[7,8,9]],
      }
     */
    var uniqSheetData =  _.groupBy(sheet1.slice(startParseRowIndex),function(row){
      return row[5];
    })
    var uniqFuncKeys = Object.keys(uniqSheetData);
    for(var i=0;i<uniqFuncKeys.length;i++){
      var curFuncKey = uniqFuncKeys[i];
      var noObj = this.generateNo();
      // 相同的功能码数组
      var sameCondNoDatas = uniqSheetData[curFuncKey];
      var RULE_NO = noObj.padStart(6);
      var MODE_NO = "AU" + noObj.padStart(5);
      var OPRTN_COND_NO = "";//一个条件号多条数据 对应一个模式
      // 生成规则
      this.generateRuleInfoData(RULE_NO,sameCondNoDatas[0]);

      for(var j=0;j<sameCondNoDatas.length;j++){
        var curSheetRow = sameCondNoDatas[j];
        // 生成条件
        OPRTN_COND_NO = "AU" + noObj.padStart(5);
        this.generateCondData(OPRTN_COND_NO,curSheetRow);
        // 生成映射表
        this.generateReflexData(curSheetRow);
      }
      // 生成规则条件映射
      this.generateRuleCondData(RULE_NO,OPRTN_COND_NO,sameCondNoDatas[0]);
      // 为金额映射时 规则 映射 AU00001 - AU00162 条件
      //金额超限
      var authCondition = sameCondNoDatas[0][4];
      if(authCondition.includes(this.amtKeywords)){
        this.generateAmtRuleCondData(RULE_NO,sameCondNoDatas[0]);
      }
      
      // 生成模式
      this.generateAuthModeData(MODE_NO,sameCondNoDatas[0]);
    }
  }
  concatAmtData(){
    // 金额授权 条件表 模式表 融合
    this.IB_OM_RULECOND_INFO_AMT = amtAuthData.IB_OM_RULECOND_INFO;
    this.IB_OM_AUTHMODE_INFO_AMT = amtAuthData.IB_OM_AUTHMODE_INFO;
    // this.condData = this.condData.concat(amtAuthData.IB_OM_RULECOND_INFO.slice(1));
    // this.authModeData = this.authModeData.concat(amtAuthData.IB_OM_AUTHMODE_INFO.slice(1));
  }
  // 生成规则表
  generateRuleInfoData(RULE_NO,curSheetRow){
    var RULE_NO = RULE_NO // 规则编号;
    var RULE_TYP_CD = "AU";  // 规则类型代码
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
  generateCondData(OPRTN_COND_NO,curSheetRow){
    // 是否金额条件
    var isAmtCond = curSheetRow[4].includes("金额超限");
    if(isAmtCond) {
      console.log("金额条件::",curSheetRow[2],OPRTN_COND_NO);
      return;
    }
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
    this.condData.push(curRow);
  }
  // 生成规则条件映射表
  generateRuleCondData(RULE_NO,OPRTN_COND_NO,curSheetRow){
    var isAmtCond = curSheetRow[4].includes("金额超限");
    if(isAmtCond) return;
    var RULE_COND_NO = OPRTN_COND_NO; // 条件号
    var CMPL_MODE_FLG = (curSheetRow[6] || "1-否").includes("0") ? "0" : "1"; //强制条件 0 是 | 1 否
    var OPRTN_RULE_NO = RULE_NO; // 规则号
    var curRow = [RULE_COND_NO,CMPL_MODE_FLG,OPRTN_RULE_NO];
    this.ruleCondData.push(curRow);
  }
  // 生成 金额 规则条件映射表
  generateAmtRuleCondData(RULE_NO,curSheetRow){
    for(var i=this.minAmtCondNoOfRMB;i<=this.maxAmtCondNoOfRMB;i++){
      var OPRTN_COND_NO = "AU" + String(i).padStart(5,"0");
      var RULE_COND_NO = OPRTN_COND_NO; // 条件号
      var CMPL_MODE_FLG = (curSheetRow[6] || "1-否").includes("0") ? "0" : "1"; //强制条件 0 是 | 1 否
      var OPRTN_RULE_NO = RULE_NO; // 规则号
      var curRow = [RULE_COND_NO,CMPL_MODE_FLG,OPRTN_RULE_NO];
      this.ruleCondData.push(curRow);
    }
  }
  getAuthType(name){
    name = name || "本地授权";
    //授权模式 AUTH_TYP_CD  "1"->LocalAuth| "2"->RemoteAuth|"3"->DifTermAuth|"4"->CentAuth|5->RemoteAuth LocalAuth|6->CentAuth LocalAuth
    var AUTH_TYP_CD = "1";
    if(name.includes("本地授权")){
      AUTH_TYP_CD = "1";
    }
    if(name.includes("远程授权")){
      AUTH_TYP_CD = "2";
    }
    if(name.includes("异终端授权")){
      AUTH_TYP_CD = "3";
    }
    return AUTH_TYP_CD;
  }
  // 生成模式表
  generateAuthModeData(MODE_NO,curSheetRow){
    var isAmtCond = curSheetRow[4].includes("金额超限");
    if(isAmtCond) return;
    var MODE_NO = MODE_NO; // 模式编号
    var AUTH_TYP_CD = this.getAuthType(curSheetRow[15]); // 授权类型代码
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
    this.authModeData.push(curRow);
  }
  // 生成字段映射表
  generateReflexData(curSheetRow){
    var isAmtCond = curSheetRow[4].includes("金额超限");
    var isNeedReflex = curSheetRow[7].includes("是");
    var pubVar = [
      {field:"txAmt",name:"金额"},
      {field:"TnNwSn",name:"现转标志"},
      {field:"Ccy",name:"币种"},
      // {field:"AFRresult",name:"人脸识别结果"},
    ];
    if(isAmtCond){
      // 金额超限
      if(isNeedReflex){
        // 需要映射字段
        for(var i=0;i<pubVar.length;i++){
          var curPubVar = pubVar[i];
  
          var TRAN_CD = curSheetRow[2]; //	交易码
          var PUB_DICTRY_NM = curPubVar.field; //	公共字典名称
          var PRIV_DICTRY_NM = ""; //	私有字典名称
          var PULDW_MAPG_DICTRY_NM = ""; //	下拉映射字典名称
          if(curPubVar.field == "txAmt"){
            PRIV_DICTRY_NM = curSheetRow[8] || "txAmt";
            PULDW_MAPG_DICTRY_NM = curSheetRow[9] || "金额";
            utils.assert("交易字段(txAmt映射字段)","字段说明(字段说明)",curSheetRow[8],curSheetRow[9]);
          }else if(curPubVar.field == "TnNwSn"){
            PRIV_DICTRY_NM = curSheetRow[10] || "TnNwSn";
            PULDW_MAPG_DICTRY_NM = curSheetRow[11] || "现转标志";
            utils.assert("比较符1(TnNwSn映射字段)","比较值1(字段说明)",curSheetRow[10],curSheetRow[11]);
          }else if(curPubVar.field == "Ccy"){
            PRIV_DICTRY_NM = curSheetRow[12] || "Ccy";
            PULDW_MAPG_DICTRY_NM = curSheetRow[13] || "币种";
            utils.assert("比较符2(Ccy映射字段)","比较值2(字段说明)",curSheetRow[12],curSheetRow[13]);
          }
          var curRow = [TRAN_CD,PUB_DICTRY_NM,PRIV_DICTRY_NM,PULDW_MAPG_DICTRY_NM];
          var isExist = this.reflexData.find(v => v[0] == TRAN_CD && v[1] == PUB_DICTRY_NM);
          if(!isExist){
            this.reflexData.push(curRow);
          }
          // 生成字典要素表
          this.generateFieldFactorData(curRow,curSheetRow);
        }
      }else{
        // 不需要映射字段
        for(var i=0;i<pubVar.length;i++){
          var curPubVar = pubVar[i];
  
          var TRAN_CD = curSheetRow[2]; //	交易码
          var PUB_DICTRY_NM = curPubVar.field; //	公共字典名称
          var PRIV_DICTRY_NM = ""; //	私有字典名称
          var PULDW_MAPG_DICTRY_NM = ""; //	下拉映射字典名称
          if(curPubVar.field == "txAmt"){
            PRIV_DICTRY_NM = "txAmt";
            PULDW_MAPG_DICTRY_NM = "金额";
          }else if(curPubVar.field == "TnNwSn"){
            PRIV_DICTRY_NM = "TnNwSn";
            PULDW_MAPG_DICTRY_NM = "现转标志";
          }else if(curPubVar.field == "Ccy"){
            PRIV_DICTRY_NM = "Ccy";
            PULDW_MAPG_DICTRY_NM = "币种";
          }
          var curRow = [TRAN_CD,PUB_DICTRY_NM,PRIV_DICTRY_NM,PULDW_MAPG_DICTRY_NM];
          var isExist = this.reflexData.find(v => v[0] == TRAN_CD && v[1] == PUB_DICTRY_NM);
          if(!isExist){
            this.reflexData.push(curRow);
          }
          // 生成字典要素表
          this.generateFieldFactorData(curRow,curSheetRow);
        }
      }
    }else{
      // 非金额超限
      if(isNeedReflex){
        // 需要映射--嵌套结构
        
        var TRAN_CD = curSheetRow[2]; //	交易码
        var PUB_DICTRY_NM = curSheetRow[8]; //	公共字典名称
        var PRIV_DICTRY_NM = curSheetRow[10]; //	私有字典名称
        var PULDW_MAPG_DICTRY_NM = curSheetRow[9]; //	下拉映射字典名称
        var curRow = [TRAN_CD,PUB_DICTRY_NM,PRIV_DICTRY_NM,PULDW_MAPG_DICTRY_NM];
        utils.assert("交易字段,比较符1(映射字段a.b),字段说明" + TRAN_CD,PUB_DICTRY_NM,PRIV_DICTRY_NM,PULDW_MAPG_DICTRY_NM);
        var isExist = this.reflexData.find(v => v[0] == TRAN_CD && v[1] == PUB_DICTRY_NM);
          if(!isExist){
            this.reflexData.push(curRow);
          }
        // 生成字典要素表
        this.generateFieldFactorData(curRow,curSheetRow);
      }
    }
  }
  // 生成字典要素表
  generateFieldFactorData(curRow,curSheetRow){
    var DICTRY_NM = curRow[1]; //	字典名称
    var DICTRY_DESC = curRow[3]; //	字典描述
    var DICTRY_TYP_CD = "text"; //	字典类型代码
    var FIELD_CMPR = "in"; //	字段比较符
    var DATA_ATTR_DESC = curRow[3]; //	数据属性描述
    var curRow = [DICTRY_NM,DICTRY_DESC,DICTRY_TYP_CD,FIELD_CMPR,DATA_ATTR_DESC];
    var isExist = this.fieldFactor.find(v => (v[0] == DICTRY_NM && v[2] == DICTRY_TYP_CD && v[3] == FIELD_CMPR));
    if(isExist) return;
    this.fieldFactor.push(curRow);
  }
}

var auth = new Auth();
var buffer = xlsx.build([
  {name: "规则IB_OM_RULE_INFO", data: auth.ruleInfoData},
  {name: "条件IB_OM_RULECOND_INFO", data: auth.condData},
  {name: "规则条件映射IB_OM_RULECOND_RLT", data: auth.ruleCondData},
  {name: "授权模式IB_OM_AUTHMODE_INFO", data: auth.authModeData},
  {name: "字段映射TE_PARA_TRANKEYWORDS_INFO", data: auth.reflexData},
  {name: "字典要素IB_PARA_KEYWORDS_INFO", data: auth.fieldFactor},
]); 
var sqlParams = [
  {tableName:"IB_OM_RULE_INFO",data:auth.ruleInfoData},
  {tableName:"IB_OM_RULECOND_INFO",data:auth.condData},
  {tableName:"IB_OM_RULECOND_RLT",data:auth.ruleCondData},
  {tableName:"IB_OM_AUTHMODE_INFO",data:auth.authModeData},
  {tableName:"TE_PARA_TRANKEYWORDS_INFO",data:auth.reflexData},
  {tableName:"IB_PARA_KEYWORDS_INFO",data:auth.fieldFactor},
];

generateSql.generateInsertSql(`auth_${utils.getCurDateStr()}.sql`,sqlParams);

generateSql.generateDeleteSql(`authDel_${utils.getCurDateStr()}.sql`,sqlParams);


utils.writeToOutDir(`授权表_${utils.getCurDateStr()}.xlsx`,buffer,config.authSuffix);


