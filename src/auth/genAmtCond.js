var utils = require("../utils/index.js");
var config = require("../config.js");
var currencyCond = require("./genAmtCond_2.js").currencyCond

class GenAmtCond{
  constructor(){
    this.curDayStr = utils.getCurDateStr();
    this.condNoObj = utils.generateNo(0);// 条件号生成函数
    // 条件
    this.condData = [["OPRTN_COND_NO","DICTRY_NM","OPER_SYM_1","CMPR_VAL","OPER_SYM_2","VALUE2","TRAN_CD","COND_DESCR","OPER_TELR_NO","OPER_DT","OPER_RSN","CMPR_VAL_DATA_DICTRY_FLG","PUB_DICTRY_FLG","DICTRY_DESCR"]];
    // 模式
    this.authModeData =[["MODE_NO","AUTH_TYP_CD","AUTH_LVL_CD","REMOTE_AUTH_LVL_CD","AUTH_ORG_TYP_CD","AUTH_ORG_NO","AUTH_PSTN_NO","UGNT_FLG","AUTH_DESCR","HOST_AUTH_FLG","HOST_AUTH_TYP_CD","CNTRTN_AUTH_CENT_NM","CNTRTN_AUTH_LVL_CD","REMRK_1","APP_NO"]];
    this.init();
  }
  init(){
    this.generateAmtCondData();
  }
  // 生成金额条件表
  generateAmtCondData(){

    var TnNwSn = "CASH_TRAN_FLG";
    var txAmt = "TX_AMT";
    var Ccy =  "CUR_CD";
    // var TnNwSn = "TnNwSn";
    // var txAmt = "txAmt";
    // var Ccy =  "Ccy";
    for(var i=0;i<currencyCond.length;i++){
      var curItem = currencyCond[i];
      for(var j=0;j<curItem.cash.length;j++){
        let cashOper1 = ">";
        let cashOper2 = "<=";
        if(j == 0) cashOper1 = ">=";

        var cash = curItem.cash;
        var curCondNo = "AU" + this.condNoObj().padStart(5);
        var tnNwSnCond = [ curCondNo,TnNwSn,"==","0","","","","现金支付触发授权","",this.curDayStr,"批量新增","1","0","现金支付" ];
        var txAmtCond = [ curCondNo,txAmt,cashOper1,cash[j][1],cashOper2,cash[j][2],"","金额超限触发授权","",this.curDayStr,"批量新增","1","0","交易金额" ];
        var ccyCond = [ curCondNo,Ccy,  "==",curItem.Ccy,"",  "",       "","币种授权","",this.curDayStr,"批量新增","1","0",curItem.name ];
        var mode = [curCondNo,"2",cash[j][0],"","","","*","",`${curItem.name},现金,金额在范围${cashOper1==">"?"(":"["}${cash[j][1]}-${cash[j][2]}${cashOper2=="<="?"]":")"}内，触发授权`,"","","","","现金金额超限模式",""];
        // 生成条件
        this.generateAmtCondDataInner(tnNwSnCond);
        this.generateAmtCondDataInner(txAmtCond);
        this.generateAmtCondDataInner(ccyCond);
        // 生成模式
        this.generateAmtAuthModeData(mode);
        if(curItem.cashFaceNotPassedIndex.includes(j)){
          // 现金 只有 5w-10w 需要人脸识别规则，转账20w-50w 需要人脸识别规则
          //faceRecognitionRow 人脸识别为 "" 表示未通过 或未成功 "1" 成功 三个条件且关系 不通过就远程授权
          // 只判断50000,	100000 区间 不通过则判断 金额 和 币种
          // var faceReCond = [ curCondNo,"faceChkRslt",  "==","0","","","","人脸识别授权","",this.curDayStr,"批量新增","1","0","人脸识别" ];
          var faceReCond = [ curCondNo,"faceChkRslt",  "in","2,","","","",`现金金额${cashOper1==">"?"(":"["}50000-100000${cashOper2=="<="?"]":")"} 人脸识别未通过授权`,"",this.curDayStr,"批量新增","1","0","人脸识别" ];
          // 生成条件
          this.generateAmtCondDataInner(faceReCond);
        }
      }
      for(var j=0;j<curItem.transfer.length;j++){
        let cashOper1 = ">";
        let cashOper2 = "<=";
        if(j == 0) cashOper1 = ">=";


        var transfer = curItem.transfer;
        var curCondNo = "AU" + this.condNoObj().padStart(5);
        var tnNwSnCond = [ curCondNo,TnNwSn,"==","1","","","","转账触发授权","",this.curDayStr,"批量新增","1","0","转账标识" ];
        var txAmtCond = [ curCondNo,txAmt,cashOper1,transfer[j][1],cashOper2,transfer[j][2],"","金额超限触发授权","",this.curDayStr,"批量新增","1","0","交易金额" ];
        var ccyCond = [ curCondNo,Ccy,"==",curItem.Ccy,"","","","币种授权","",this.curDayStr,"批量新增","1","0",curItem.name];
        var mode = [curCondNo,"2",transfer[j][0],"","","","*","",`${curItem.name},转账,金额在范围${cashOper1==">"?"(":"["}${transfer[j][1]}-${transfer[j][2]}${cashOper2=="<="?"]":")"}内，触发授权`,"","","","","转账金额超限模式",""];
        // 生成条件
        this.generateAmtCondDataInner(tnNwSnCond);
        this.generateAmtCondDataInner(txAmtCond);
        this.generateAmtCondDataInner(ccyCond);
        // 生成模式
        this.generateAmtAuthModeData(mode);
        if(curItem.transferFaceNotPassedIndex.includes(j)){
          //faceRecognitionRow 人脸识别为 "" 表示未通过 或未成功 "1" 成功 三个条件且关系 不通过就远程授权
          // 只判断50000,	  200000 区间 不通过则判断 金额 和 币种
          // var faceReCond = [ curCondNo,"faceChkRslt",  "==","0","","","","人脸识别授权","",this.curDayStr,"批量新增","1","0","人脸识别" ];
          var faceReCond = [ curCondNo,"faceChkRslt",  "in","2,","","","",`转账金额${cashOper1==">"?"(":"["}50000-200000${cashOper2=="<="?"]":")"} 人脸识别未通过授权`,"",this.curDayStr,"批量新增","1","0","人脸识别" ];
          // 生成条件
          this.generateAmtCondDataInner(faceReCond);
        }
      }
    }
  }
  // 生成金额 条件表
  generateAmtCondDataInner(condRow){
    this.condData.push(condRow);
  }
  // 生成金额 模式表
  generateAmtAuthModeData(modeRow){
    this.authModeData.push(modeRow);
  }
}

var amtCondsObj = new GenAmtCond();

var amtConds = amtCondsObj.condData.slice(1).map(v => v[0]);

amtCondsObj.condNoObj = utils.generateNo(config.AU_START_NUM_STAGE_1);// 条件号生成函数

module.exports = {
  amtCondsObj,
  amtConds,
  currencyCond
}