var xlsx = require('node-xlsx');
var chalk = require("chalk");
var fs = require("fs");
var path = require("path");
var _ = require("underscore");
var config = require("../config");
var utils = require("../utils/index");
var db = require("../db/index");

utils.copySrcExcel(config.srcExcelName,__dirname);

var { amtCondsObj,amtConds } = require("./genAmtCond.js");
var isFilteredData = []; // 被过滤的数据
var excelPath = path.resolve(__dirname,config.srcExcelName);
var workSheets = xlsx.parse(fs.readFileSync(excelPath));
var curWorkSheet = workSheets.find(v => v.name.includes(config.auSheetName)).data;
curWorkSheet = curWorkSheet.filter(row => row.length != 0);
curWorkSheet = curWorkSheet.filter((v,i) => {
  if(i == 0){
    return true;
  }
  
  if(!v[1] && !v[2] && !v[5] && !v[7] && !(v[6])){
    var msg = `${v[2] || "无交易码"}-${v[3]}-::${chalk.red("数据统计不全")},被过滤`;
    console.log(chalk.blue(`${msg}`));
    isFilteredData.push(msg);
    return false;
  }else{
    if(!v[6]){
      var msg = `${v[2] || "无交易码"}-${v[3]}-::${chalk.red("数据统计不全")},被过滤`;
      console.log(chalk.blue(`${msg}`));
      isFilteredData.push(msg);
      return;
    }else{
      var isForceCond = v[6].includes("是");
      var isEmpty = [v[8],v[10],String(v[11] === 0 ? "0" : v[11])].some(v => !v);
      if(!isForceCond && isEmpty){
        var msg = `${v[2] || "无交易码"}-${v[3]}-::${chalk.red("数据统计不全")},被过滤`;
        console.log(chalk.blue(`${msg}`));
        isFilteredData.push(msg);
        return false;
      }else{
        var isReflex = (v[7] || "").includes("是");
        if(isReflex && !v[8]){
          var msg = `${v[2] || "无交易码"}-${v[3]}-::字段映射为空,被过滤`;
          console.log(chalk.blue(`${msg}`));
        }else{
          return true;
        }
      }
    }
    
  }
});
curWorkSheet.slice(1).forEach(curSheetRow => {
  var CMPR_VAL = curSheetRow[11];	 // 比较值
  var VALUE2 = curSheetRow[13];	 // 比较值2
  if(CMPR_VAL === 0){
    curSheetRow[11] = "0";
  }else{
    curSheetRow[11] = String(curSheetRow[11] || "");
  }
  if(VALUE2 === 0){
    curSheetRow[13] = "0";
  }else{
    curSheetRow[13] = String(curSheetRow[13] || "");
  }
});
class Auth {
  constructor(){
    /**
     * uniqSheetData 结构
      {
        funcKey1:[[1,2,3],[4,5,6]],
        funcKey2:[[7,8,9]],
      }
     */
    this.uniqSheetData = _.groupBy(curWorkSheet.slice(1),function(row){
      return row[5];
    })
    this.amtKeywords = "金额超限";// 判断是否金额授权
    // this.ruleNoObj = utils.generateNo(config.AU_START_NUM);// 规则号生成函数
    this.ruleNoObj = utils.generateNo(amtCondsObj.condNoObj().number);// 规则号生成函数
    // this.condNoObj = utils.generateNo(config.AU_START_NUM);// 条件号生成函数
    this.condNoObj = utils.generateNo(amtCondsObj.condNoObj().number);// 条件号生成函数
    this.curDayStr = utils.getCurDateStr(); // 当前日期
    // 规则表
    this.ruleInfoData = [["RULE_NO","RULE_TYP_CD","HOLI_FLG","RULE_TRI_POSITION","SUIT_CHNL_SCP","SUIT_LPR_SCP","SUIT_ORG_SCP","SUIT_TX_SCP","RULE_COMNT","EFFT_FLG","OPER_TELR_NO","OPER_DT","OPER_RSN"]];
    // 条件表
    this.condData = [["OPRTN_COND_NO","DICTRY_NM","OPER_SYM_1","CMPR_VAL","OPER_SYM_2","VALUE2","TRAN_CD","COND_DESCR","OPER_TELR_NO","OPER_DT","OPER_RSN","CMPR_VAL_DATA_DICTRY_FLG","PUB_DICTRY_FLG","DICTRY_DESCR"]];
    // 规则条件映射表
    this.ruleCondData = [["RULE_COND_NO","CMPL_MODE_FLG","OPRTN_RULE_NO"]];
    // 授权模式表
    this.authModeData =[["MODE_NO","AUTH_TYP_CD","AUTH_LVL_CD","REMOTE_AUTH_LVL_CD","AUTH_ORG_TYP_CD","AUTH_ORG_NO","AUTH_PSTN_NO","UGNT_FLG","AUTH_DESCR","HOST_AUTH_FLG","HOST_AUTH_TYP_CD","CNTRTN_AUTH_CENT_NM","CNTRTN_AUTH_LVL_CD","REMRK_1","APP_NO"]];

    // 字段映射表 TE_PARA_TRANKEYWORDS_INFO  
    this.reflexData = [["TRAN_CD","PUB_DICTRY_NM","PRIV_DICTRY_NM","PULDW_MAPG_DICTRY_NM"]];
    // 字段要素表 IB_PARA_KEYWORDS_INFO 

    this.fieldFactor = [["DICTRY_NM","DICTRY_DESCR","DICTRY_TYP_CD","FIELD_CMPR","DATA_ATTR_DESCR"]];

    // 增加金额条件
    this.condData = this.condData.concat(amtCondsObj.condData.slice(1));
    this.authModeData = this.authModeData.concat(amtCondsObj.authModeData.slice(1));
    // console.log(chalk.green(`金额条件 ${this.condData[1][0]}  -  ${this.condData.slice(-1)[0][0]}`));

    this.init();
  }
  
  // 初始化
  init(){
    var uniqFuncKeys = Object.keys(this.uniqSheetData);
    for(var i=0;i<uniqFuncKeys.length;i++){
      var key = uniqFuncKeys[i];
      // 相同条件的数据 且关系
      var sameCondData = this.uniqSheetData[key];
      var curSheetRows = sameCondData;
      var RULE_NO = this.ruleNoObj().padStart(6);
      this.generateRuleInfoData(RULE_NO,sameCondData[0]);
      // 是否需要人脸识别
      var isNeedFaceAuth = (sameCondData[0][14] || "否").includes("是");
      // 是否强制授权
      var isForceCond = (sameCondData[0][6] || "是").includes("是");
      // 是否金额超限
      var isAmtCond = sameCondData[0][4].includes("金额超限");
      if(isNeedFaceAuth){
        // 需要人脸识别 生成两条规则 一条通过规则一条不通过规则，或关系
        // 通过
        var OPRTN_COND_NO_1 = "AU" + this.condNoObj().padStart(5);
        // 生成通过条件
        this.genFaceAuthPassCond(OPRTN_COND_NO_1,curSheetRows);
        var passMethod = curSheetRows[0][17]
        if(passMethod.includes("不改变")){
          this.genAuthData(RULE_NO,OPRTN_COND_NO_1,curSheetRows,isForceCond);
        }else if(passMethod.includes("不授权")){
          // 不生成 
        }else{
          // 本地 远程 异终端
          // 条件
          this.genFacePassCond(OPRTN_COND_NO_1,curSheetRows);
          // 模式
          this.genFacePassMode(OPRTN_COND_NO_1,curSheetRows);
          // 规则条件
          this.genFacePassRuleCond(RULE_NO,OPRTN_COND_NO_1,curSheetRows);
        }


        //不通过
        var OPRTN_COND_NO_2 = "AU" + this.condNoObj().padStart(5);
        // 生成不通过条件
        this.genFaceAuthNotPassCond(OPRTN_COND_NO_2,curSheetRows);
        this.genAuthData(RULE_NO,OPRTN_COND_NO_2,curSheetRows,isForceCond);
      }else{
        // 不需要人脸识别
        
        var OPRTN_COND_NO = "AU" + this.condNoObj().padStart(5);
        if(isForceCond){
          // 是强制条件
          this.genAuthData(RULE_NO,OPRTN_COND_NO,curSheetRows,true);
        }else{
          // 不是强制条件
          if(isAmtCond){
            // 金额超限 只有一条
            this.generateAmtCondData(RULE_NO,curSheetRows[0]);
          }else{
            this.genAuthData(RULE_NO,OPRTN_COND_NO,curSheetRows,false);
          }
        }
      }
    }
  }
  // 生成授权数据
  genAuthData(RULE_NO,OPRTN_COND_NO,curSheetRows,isForceCond){
    // 生成 条件
    this.generateCondData(RULE_NO,OPRTN_COND_NO,curSheetRows,isForceCond);
    // 生成 规则条件 关系
    this.generateRuleCondData(RULE_NO,OPRTN_COND_NO,curSheetRows,isForceCond);
    // 生成 模式
    this.generateAuthModeData(OPRTN_COND_NO,curSheetRows);
  }



  // 生成规则表
  generateRuleInfoData(RULE_NO,curSheetRow){
    var RULE_NO = RULE_NO // 规则编号;
    var RULE_TYP_CD = "AU";  // 规则类型代码
    var HOLI_FLG = "N";  // 节假日标志
    var RULE_TRI_POSITION = "1";  // 规则触发位置
    var SUIT_CHNL_SCP = "TE";  // 适用渠道范围
    var SUIT_LPR_SCP = "9999";  // 适用法人范围
    var SUIT_ORG_SCP = "*,";  // 适用机构范围
    var SUIT_TX_SCP = curSheetRow[2];  // 适用交易范围---
    var RULE_COMNT = curSheetRow[4];  // 规则说明---
    var EFFT_FLG = "1";  // 生效标志
    var OPER_TELR_NO = "900001";  // 操作柜员号
    var OPER_DT = this.curDayStr;  // 操作时间
    var OPER_RSN = "批量新增";  // 操作原因---
    var curRow = [RULE_NO,RULE_TYP_CD,HOLI_FLG,RULE_TRI_POSITION,SUIT_CHNL_SCP,SUIT_LPR_SCP,SUIT_ORG_SCP,SUIT_TX_SCP,RULE_COMNT,EFFT_FLG,OPER_TELR_NO,OPER_DT,OPER_RSN];
    this.ruleInfoData.push(curRow);
  }
    // 生成条件表
  generateCondData(RULE_NO,OPRTN_COND_NO,curSheetRows,isForceCond){
    // 强制条件不生成条件
    if(isForceCond) return;
    for(var i=0;i<curSheetRows.length;i++){
      var curSheetRow = curSheetRows[i];

      var OPRTN_COND_NO = OPRTN_COND_NO;	 // 运营条件编号
      var DICTRY_NM = curSheetRow[8];	 // 字典名称
      var OPER_SYM_1 = curSheetRow[10];	 // 运算符号1
      var CMPR_VAL = curSheetRow[11];	 // 比较值
      var OPER_SYM_2 = curSheetRow[12];	 // 运算符号2
      var VALUE2 = curSheetRow[13];	 // 比较值2
      var TRAN_CD = curSheetRow[2];	 // 交易码
      var COND_DESCR = curSheetRow[4];	 // 条件描述
      var OPER_TELR_NO = "900001";	 // 操作柜员号
      var OPER_DT = this.curDayStr;	 // 操作时间
      var OPER_RSN =  "批量新增";	 // 操作原因
      var CMPR_VAL_DATA_DICTRY_FLG = "1";	 // 比较值数据字典标志
      var PUB_DICTRY_FLG = "0";	 // 公共字典标志
      var DICTRY_DESCR = curSheetRow[9];	 // 字典描述
      var curRow = [OPRTN_COND_NO,DICTRY_NM,OPER_SYM_1,CMPR_VAL,OPER_SYM_2,VALUE2,TRAN_CD,COND_DESCR,OPER_TELR_NO,OPER_DT,OPER_RSN,CMPR_VAL_DATA_DICTRY_FLG,PUB_DICTRY_FLG,DICTRY_DESCR];
      this.condData.push(curRow);
    }
  }
  // 生成规则条件映射表
  generateRuleCondData(RULE_NO,OPRTN_COND_NO,curSheetRows,isForceCond){
    for(var i=0;i<curSheetRows.length;i++){
      var curSheetRow = curSheetRows[i];

      var RULE_COND_NO = OPRTN_COND_NO; // 条件号
      var CMPL_MODE_FLG = isForceCond ? "0" : "1"; //强制条件 0 是 | 1 否
      var OPRTN_RULE_NO = RULE_NO; // 规则号
      var curRow = [RULE_COND_NO,CMPL_MODE_FLG,OPRTN_RULE_NO];
      // 一个规则对应多个相同条件的时候只需要写一次条件表
      var isExist = this.ruleCondData.find(v => (v[0] == RULE_COND_NO && v[1] == CMPL_MODE_FLG && v[2] == OPRTN_RULE_NO));
      if(isExist) return;
      this.ruleCondData.push(curRow);
    }
  }
  // 生成模式表
  generateAuthModeData(MODE_NO,curSheetRows){
    for(var i=0;i<curSheetRows.length;i++){
      var curSheetRow = curSheetRows[i];

      var MODE_NO = MODE_NO; // 模式编号
      var AUTH_TYP_CD = this.getAuthType(curSheetRow[15]); // 授权类型代码
      var AUTH_LVL_CD = curSheetRow[16] || 1; // 授权级别代码
      var REMOTE_AUTH_LVL_CD = ""; // 远程授权级别代码
      var AUTH_ORG_TYP_CD = ""; // 授权机构类型代码
      var AUTH_ORG_NO = ""; // 授权机构号
      var AUTH_PSTN_NO = "*"; // 授权岗位编号
      var UGNT_FLG = ""; // 加急标志
      var AUTH_DESCR = curSheetRow[4]; // 授权描述
      var HOST_AUTH_FLG = ""; // 主机授权标志
      var HOST_AUTH_TYP_CD = ""; // 主机授权类型代码
      var CNTRTN_AUTH_CENT_NM = ""; // 集中授权中心名称
      var CNTRTN_AUTH_LVL_CD = ""; // 集中授权级别代码
      var REMRK_1 = curSheetRow[20] ? `${curSheetRow[20]}统计` : "" ; // 备注1
      var APP_NO = ""; // 应用编号
      var curRow = [MODE_NO,AUTH_TYP_CD,AUTH_LVL_CD,REMOTE_AUTH_LVL_CD,AUTH_ORG_TYP_CD,AUTH_ORG_NO,AUTH_PSTN_NO,UGNT_FLG,AUTH_DESCR,HOST_AUTH_FLG,HOST_AUTH_TYP_CD,CNTRTN_AUTH_CENT_NM,CNTRTN_AUTH_LVL_CD,REMRK_1,APP_NO];
      var isExist = this.authModeData.find(v => v[0] == MODE_NO);
      if(isExist) return;
      this.authModeData.push(curRow);
    }
  }
  // 生成金额条件表
  generateAmtCondData(RULE_NO,curSheetRow){
    // 生成规则条件映射表
    for(var i = 0;i < amtConds.length;i++){
      var RULE_COND_NO = amtConds[i]; // 条件号
      var CMPL_MODE_FLG = "1"; //强制条件 0 是 | 1 否
      var OPRTN_RULE_NO = RULE_NO; // 规则号
      var curRow = [RULE_COND_NO,CMPL_MODE_FLG,OPRTN_RULE_NO];
      var isExist = this.ruleCondData.find(v => v[0] == RULE_COND_NO && v[1] == CMPL_MODE_FLG && v[2] == OPRTN_RULE_NO);
      if(!isExist){
        this.ruleCondData.push(curRow);
      }
    }
    // 生成字段映射
    var txAmt = curSheetRow[8] || "txAmt";
    var TnNwSn = curSheetRow[10] || "TnNwSn";
    var Ccy = curSheetRow[12] || "Ccy";
    if(txAmt != "txAmt"){
      // 需要映射
      var TRAN_CD = curSheetRow[2];
      var PUB_DICTRY_NM = "txAmt";
      var PRIV_DICTRY_NM = txAmt;
      var PULDW_MAPG_DICTRY_NM = "金额";
      var curRow1 = [TRAN_CD,PUB_DICTRY_NM,PRIV_DICTRY_NM,PULDW_MAPG_DICTRY_NM];
      
      var DICTRY_NM = "txAmt";
      var DICTRY_DESCR = "金额";
      var DICTRY_TYP_CD = "";
      var FIELD_CMPR = "";
      var DATA_ATTR_DESCR = "金额";
      var curRow2 = [DICTRY_NM,DICTRY_DESCR,DICTRY_TYP_CD,FIELD_CMPR,DATA_ATTR_DESCR];

      var isExist1 = this.reflexData.find(v => (v[0] == TRAN_CD && v[1] == PUB_DICTRY_NM));
      if(!isExist1){
        this.reflexData.push(curRow1);
      }
      var isExist2 = this.fieldFactor.find(v => (v[0] == DICTRY_NM && v[1] == DICTRY_DESCR));
      if(!isExist2){
        this.fieldFactor.push(curRow2);
      }
    }
    if(TnNwSn != "TnNwSn"){
      // 需要映射
      var TRAN_CD = curSheetRow[2];
      var PUB_DICTRY_NM = "TnNwSn";
      var PRIV_DICTRY_NM = TnNwSn;
      var PULDW_MAPG_DICTRY_NM = "现转标志";
      var curRow1 = [TRAN_CD,PUB_DICTRY_NM,PRIV_DICTRY_NM,PULDW_MAPG_DICTRY_NM];
      
      var DICTRY_NM = "TnNwSn";
      var DICTRY_DESCR = "现转标志";
      var DICTRY_TYP_CD = "";
      var FIELD_CMPR = "";
      var DATA_ATTR_DESCR = "现转标志";
      //DICTRY_DESCR  DATA_ATTR_DESCR
      var curRow2 = [DICTRY_NM,DICTRY_DESCR,DICTRY_TYP_CD,FIELD_CMPR,DATA_ATTR_DESCR];

      var isExist1 = this.reflexData.find(v => (v[0] == TRAN_CD && v[1] == PUB_DICTRY_NM));
      if(!isExist1){
        this.reflexData.push(curRow1);
      }
      var isExist2 = this.fieldFactor.find(v => (v[0] == DICTRY_NM && v[1] == DICTRY_DESCR));
      if(!isExist2){
        this.fieldFactor.push(curRow2);
      }
    }
    if(Ccy != "Ccy"){
      // 需要映射
      var TRAN_CD = curSheetRow[2];
      var PUB_DICTRY_NM = "Ccy";
      var PRIV_DICTRY_NM = Ccy;
      var PULDW_MAPG_DICTRY_NM = "币种";
      var curRow1 = [TRAN_CD,PUB_DICTRY_NM,PRIV_DICTRY_NM,PULDW_MAPG_DICTRY_NM];
      
      var DICTRY_NM = "Ccy";
      var DICTRY_DESCR = "币种";
      var DICTRY_TYP_CD = "";
      var FIELD_CMPR = "";
      var DATA_ATTR_DESCR = "币种";
      var curRow2 = [DICTRY_NM,DICTRY_DESCR,DICTRY_TYP_CD,FIELD_CMPR,DATA_ATTR_DESCR];

      var isExist1 = this.reflexData.find(v => (v[0] == TRAN_CD && v[1] == PUB_DICTRY_NM));
      if(!isExist1){
        this.reflexData.push(curRow1);
      }
      var isExist2 = this.fieldFactor.find(v => (v[0] == DICTRY_NM && v[1] == DICTRY_DESCR));
      if(!isExist2){
        this.fieldFactor.push(curRow2);
      }
    }
  }
  // 生成金额 条件表
  generateAmtCondDataInner(condRow,curSheetRow){
    var isForceCond = (curSheetRow[6] || "0-是").includes("0"); //是否强制条件 0 是 | 1 否
    if(!isForceCond){
      this.condData.push(condRow);
    }
  }
  // 生成金额 条件规则映射表
  generateAmtCondRuleData(condRule){
    this.ruleCondData.push(condRule);
  }
  // 生成金额 模式表
  generateAmtAuthModeData(modeRow){
    this.authModeData.push(modeRow);
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
  // 生成人脸识别 不通过 条件
  genFaceAuthNotPassCond(OPRTN_COND_NO,curSheetRows){
    var curSheetRow = curSheetRows[0];

    var OPRTN_COND_NO = OPRTN_COND_NO;	 // 运营条件编号
    var DICTRY_NM = "faceRecognition";	 // 字典名称
    var OPER_SYM_1 = "==";	 // 运算符号1
    var CMPR_VAL = "0";	 // 比较值
    var OPER_SYM_2 = "";	 // 运算符号2
    var VALUE2 = "";	 // 比较值2
    var TRAN_CD = curSheetRow[2];	 // 交易码
    var COND_DESCR = "人脸识别不通过";	 // 条件描述
    var OPER_TELR_NO = "900001";	 // 操作柜员号
    var OPER_DT = this.curDayStr;	 // 操作时间
    var OPER_RSN =  "批量新增";	 // 操作原因
    var CMPR_VAL_DATA_DICTRY_FLG = "1";	 // 比较值数据字典标志
    var PUB_DICTRY_FLG = "0";	 // 公共字典标志
    var DICTRY_DESCR = "人脸识别标识";	 // 字典描述
    var curRow = [OPRTN_COND_NO,DICTRY_NM,OPER_SYM_1,CMPR_VAL,OPER_SYM_2,VALUE2,TRAN_CD,COND_DESCR,OPER_TELR_NO,OPER_DT,OPER_RSN,CMPR_VAL_DATA_DICTRY_FLG,PUB_DICTRY_FLG,DICTRY_DESCR];
    this.condData.push(curRow);
  }
  // 生成人脸识别 通过 条件
  genFaceAuthPassCond(OPRTN_COND_NO,curSheetRows){
    var curSheetRow = curSheetRows[0];

    var OPRTN_COND_NO = OPRTN_COND_NO;	 // 运营条件编号
    var DICTRY_NM = "faceRecognition";	 // 字典名称
    var OPER_SYM_1 = "==";	 // 运算符号1
    var CMPR_VAL = "1";	 // 比较值
    var OPER_SYM_2 = "";	 // 运算符号2
    var VALUE2 = "";	 // 比较值2
    var TRAN_CD = curSheetRow[2];	 // 交易码
    var COND_DESCR = "人脸识别通过";	 // 条件描述
    var OPER_TELR_NO = "900001";	 // 操作柜员号
    var OPER_DT = this.curDayStr;	 // 操作时间
    var OPER_RSN =  "批量新增";	 // 操作原因
    var CMPR_VAL_DATA_DICTRY_FLG = "1";	 // 比较值数据字典标志
    var PUB_DICTRY_FLG = "0";	 // 公共字典标志
    var DICTRY_DESCR = "人脸识别标识";	 // 字典描述
    var curRow = [OPRTN_COND_NO,DICTRY_NM,OPER_SYM_1,CMPR_VAL,OPER_SYM_2,VALUE2,TRAN_CD,COND_DESCR,OPER_TELR_NO,OPER_DT,OPER_RSN,CMPR_VAL_DATA_DICTRY_FLG,PUB_DICTRY_FLG,DICTRY_DESCR];
    this.condData.push(curRow);
  }
  // 人脸识别通过后 转换 授权方式
  // 条件
  genFacePassCond(OPRTN_COND_NO,curSheetRows){
    // 人脸识别通过后 是强制授权还是 带上 以前的条件?
    for(var i=0;i<curSheetRows.length;i++){
      var curSheetRow = curSheetRows[i];

      var OPRTN_COND_NO = OPRTN_COND_NO;	 // 运营条件编号
      var DICTRY_NM = curSheetRow[8];	 // 字典名称
      var OPER_SYM_1 = curSheetRow[10];	 // 运算符号1
      var CMPR_VAL = curSheetRow[11];	 // 比较值
      var OPER_SYM_2 = curSheetRow[12];	 // 运算符号2
      var VALUE2 = curSheetRow[13];	 // 比较值2
      var TRAN_CD = curSheetRow[2];	 // 交易码
      var COND_DESCR = curSheetRow[4];	 // 条件描述
      var OPER_TELR_NO = "900001";	 // 操作柜员号
      var OPER_DT = this.curDayStr;	 // 操作时间
      var OPER_RSN =  "批量新增";	 // 操作原因
      var CMPR_VAL_DATA_DICTRY_FLG = "1";	 // 比较值数据字典标志
      var PUB_DICTRY_FLG = "0";	 // 公共字典标志
      var DICTRY_DESCR = curSheetRow[9];	 // 字典描述
      var curRow = [OPRTN_COND_NO,DICTRY_NM,OPER_SYM_1,CMPR_VAL,OPER_SYM_2,VALUE2,TRAN_CD,COND_DESCR,OPER_TELR_NO,OPER_DT,OPER_RSN,CMPR_VAL_DATA_DICTRY_FLG,PUB_DICTRY_FLG,DICTRY_DESCR];
      this.condData.push(curRow);
    }
  }
  // 模式
  genFacePassMode(MODE_NO,curSheetRows){
    var curSheetRow = curSheetRows[0];

    var MODE_NO = MODE_NO; // 模式编号
    var AUTH_TYP_CD = this.getAuthType(curSheetRow[17]); // 授权类型代码
    var AUTH_LVL_CD = curSheetRow[19] || 1; // 授权级别代码
    var REMOTE_AUTH_LVL_CD = ""; // 远程授权级别代码
    var AUTH_ORG_TYP_CD = ""; // 授权机构类型代码
    var AUTH_ORG_NO = ""; // 授权机构号
    var AUTH_PSTN_NO = "*"; // 授权岗位编号
    var UGNT_FLG = ""; // 加急标志
    var AUTH_DESCR = curSheetRow[4]; // 授权描述
    var HOST_AUTH_FLG = ""; // 主机授权标志
    var HOST_AUTH_TYP_CD = ""; // 主机授权类型代码
    var CNTRTN_AUTH_CENT_NM = ""; // 集中授权中心名称
    var CNTRTN_AUTH_LVL_CD = ""; // 集中授权级别代码
    var REMRK_1 = curSheetRow[20] ? `${curSheetRow[20]}统计` : "" ; // 备注1
    var APP_NO = ""; // 应用编号
    var curRow = [MODE_NO,AUTH_TYP_CD,AUTH_LVL_CD,REMOTE_AUTH_LVL_CD,AUTH_ORG_TYP_CD,AUTH_ORG_NO,AUTH_PSTN_NO,UGNT_FLG,AUTH_DESCR,HOST_AUTH_FLG,HOST_AUTH_TYP_CD,CNTRTN_AUTH_CENT_NM,CNTRTN_AUTH_LVL_CD,REMRK_1,APP_NO];
    var isExist = this.authModeData.find(v => v[0] == MODE_NO);
    if(isExist) return;
    this.authModeData.push(curRow);
  }
  // 规则条件映射
  genFacePassRuleCond(RULE_NO,OPRTN_COND_NO,curSheetRows){
    var curSheetRow = curSheetRows[0];

    var RULE_COND_NO = OPRTN_COND_NO; // 条件号
    var CMPL_MODE_FLG = "1"; //强制条件 0 是 | 1 否
    var OPRTN_RULE_NO = RULE_NO; // 规则号
    var curRow = [RULE_COND_NO,CMPL_MODE_FLG,OPRTN_RULE_NO];
    // 一个规则对应多个相同条件的时候只需要写一次条件表
    var isExist = this.ruleCondData.find(v => (v[0] == RULE_COND_NO && v[1] == CMPL_MODE_FLG && v[2] == OPRTN_RULE_NO));
    if(isExist) return;
    this.ruleCondData.push(curRow);
  }
  




}

var auth = new Auth();

var arr = [
  {tableName:"IB_OM_RULE_INFO",data:auth.ruleInfoData},
  {tableName:"IB_OM_RULECOND_INFO",data:auth.condData},
  {tableName:"IB_OM_RULECOND_RLT",data:auth.ruleCondData},
  {tableName:"IB_OM_AUTHMODE_INFO",data:auth.authModeData},
];
var arr1 = [
  {tableName:"TE_PARA_TRANKEYWORDS_INFO",data:auth.reflexData},
  {tableName:"IB_PARA_KEYWORDS_INFO",data:auth.fieldFactor},
];
var insertSql = utils.genInsertSql(arr.concat(arr1));
var deleteSql = utils.genDeleteSql(arr.concat(arr1));
utils.writeToOutDir("authInsert.sql",insertSql,"授权");
utils.writeToOutDir("authDelete.sql",deleteSql,"授权");
utils.writeToOutDir("被过滤的数据.txt",isFilteredData.join("\n"),"授权");

// db.dbHandler(arr1.concat(arr),"授权-参数映射",false);
db.dbHandler(arr.concat(arr1),"授权",true);

