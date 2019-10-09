var utils = require("../utils/index.js");
var config = require("../config.js");


class GenAmtCond{
  constructor(){
    this.curDayStr = utils.getCurDateStr();
    this.condNoObj = utils.generateNo(config.AU_START_NUM);// 条件号生成函数
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
  //  交易类别	金额区间	人脸识别是否通过	授权方式
  //   现金	   [0,5)	   不判断	         不授权
  //   现金	   [5,10)	   是	             不授权
  //   现金	   [5,10)	   否	             远程授权
  //   现金	   [10,+∞)	 不判断	         远程授权
  //   转账	   [0,5)	   不判断	          不授权
  //   转账	   [5,20)	   是	              不授权
  //   转账	   [5,20)	   否	             远程授权
  //   转账	   [20,+∞)	 不判断	         远程授权

    var currencyCond = [
      {
        Ccy:"156",
        name:"币种-人民币",
        // 人脸识别不通过 生成条件  
        cashFaceNotPassedIndex:[0],
        // 现金 授权级别	现金起始金额	现金限制金额
        cash:[
          // [0,	0,	50000],
          [2,	50000,	100000],
          [3,	100000,	500000],
          [4,	500000,	2000000],
          [5,	2000000,	20000000],
          [6,	20000000,	50000000],
          [7,	50000000,	100000000],
          [8,	100000000,	200000000],
          [9,	200000000,	400000000],
        ],
        // 人脸识别不通过 生成条件
        transferFaceNotPassedIndex:[0],
        // 转账 授权级别	现金起始金额	现金限制金额
        transfer:[
          // [0,	0,	        50000],
          [2,	50000,	    200000],
          [3,	200000,	    1000000],
          [4,	1000000,	  4000000],
          [5,	4000000,	  40000000],
          [6,	40000000,	  100000000],
          [7,	100000000,	200000000],
          [8,	200000000,	400000000],
          [9,	400000000,	800000000],
        ]
      },
      {
        Ccy:"840",
        name:"币种-美元",
        // 人脸识别不通过 生成条件  
        cashFaceNotPassedIndex:[],
        // 现金 授权级别	现金起始金额	现金限制金额
        cash:[
          [3,1000,5000],
          [4,5000,20000],
          [5,20000,200000],
          [6,200000,500000],
          [7,500000,1000000],
          [8,1000000,20000000],
          [9,20000000,40000000]
        ],
        // 人脸识别不通过 生成条件
        transferFaceNotPassedIndex:[],
        // 转账 授权级别	现金起始金额	现金限制金额
        transfer:[
          [3,5000,10000],
          [4,10000,40000],
          [5,40000,400000],
          [6,400000,1000000],
          [7,1000000,2000000],
          [8,2000000,40000000],
          [9,40000000,80000000],

        ]
      },
      {
        Ccy:"392",
        name:"币种-日元",
        // 人脸识别不通过 生成条件  
        cashFaceNotPassedIndex:[],
        // 现金 授权级别	现金起始金额	现金限制金额
        cash:[
          [3,100000,500000],
          [4,500000,2000000],
          [5,2000000,20000000],
          [6,20000000,50000000],
          [7,50000000,100000000],
          [8,100000000,2000000000],
          [9,2000000000,4000000000]
        ],
        // 人脸识别不通过 生成条件
        transferFaceNotPassedIndex:[],
        // 转账 授权级别	现金起始金额	现金限制金额
        transfer:[
          [3,500000,1000000],
          [4,1000000,4000000],
          [5,4000000,40000000],
          [6,40000000,100000000],
          [7,100000000,200000000],
          [8,200000000,4000000000],
          [9,4000000000,8000000000]
        ]
      },
      {
        Ccy:"978",
        name:"币种-欧元",
        // 人脸识别不通过 生成条件  
        cashFaceNotPassedIndex:[],
        // 现金 授权级别	现金起始金额	现金限制金额
        cash:[
          [3,1000,5000],
          [4,5000,20000],
          [5,20000,200000],
          [6,200000,500000],
          [7,500000,1000000],
          [8,1000000,20000000],
          [9,20000000,40000000]

        ],
        // 人脸识别不通过 生成条件
        transferFaceNotPassedIndex:[],
        // 转账 授权级别	现金起始金额	现金限制金额
        transfer:[
          [3,5000,10000],
          [4,10000,40000],
          [5,40000,400000],
          [6,400000,1000000],
          [7,1000000,2000000],
          [8,2000000,40000000],
          [9,40000000,80000000]
        ]
      },
      {
        Ccy:"036",
        name:"币种-澳大利亚元",
        // 人脸识别不通过 生成条件  
        cashFaceNotPassedIndex:[],
        // 现金 授权级别	现金起始金额	现金限制金额
        cash:[
          [3,1000,5000],
          [4,5000,20000],
          [5,20000,200000],
          [6,200000,500000],
          [7,500000,1000000],
          [8,1000000,20000000],
          [9,20000000,40000000]
        ],
        // 人脸识别不通过 生成条件
        transferFaceNotPassedIndex:[],
        // 转账 授权级别	现金起始金额	现金限制金额
        transfer:[
          [3,5000,10000],
          [4,10000,40000],
          [5,40000,400000],
          [6,400000,1000000],
          [7,1000000,2000000],
          [8,2000000,40000000],
          [9,40000000,80000000]
        ]
      },
      {
        Ccy:"826",
        name:"币种-英镑",
        // 人脸识别不通过 生成条件  
        cashFaceNotPassedIndex:[],
        // 现金 授权级别	现金起始金额	现金限制金额
        cash:[
          [3,1000,5000],
          [4,5000,20000],
          [5,20000,200000],
          [6,200000,500000],
          [7,500000,1000000],
          [8,1000000,20000000],
          [9,20000000,40000000]
        ],
        // 人脸识别不通过 生成条件
        transferFaceNotPassedIndex:[],
        // 转账 授权级别	现金起始金额	现金限制金额
        transfer:[
          [3,5000,10000],
          [4,10000,40000],
          [5,40000,400000],
          [6,400000,1000000],
          [7,1000000,2000000],
          [8,2000000,40000000],
          [9,40000000,80000000]
        ]
      },
      {
        Ccy:"344",
        name:"币种-香港元",
        // 人脸识别不通过 生成条件  
        cashFaceNotPassedIndex:[],
        // 现金 授权级别	现金起始金额	现金限制金额
        cash:[
          [3,10000,50000],
          [4,50000,200000],
          [5,200000,2000000],
          [6,2000000,5000000],
          [7,5000000,10000000],
          [8,10000000,200000000],
          [9,200000000,400000000]

        ],
        // 人脸识别不通过 生成条件
        transferFaceNotPassedIndex:[],
        // 转账 授权级别	现金起始金额	现金限制金额
        transfer:[
          [3,50000,100000],
          [4,100000,400000],
          [5,400000,4000000],
          [6,4000000,10000000],
          [7,10000000,20000000],
          [8,20000000,400000000],
          [9,400000000,800000000]
        ]
      },
      {
        Ccy:"702",
        name:"币种-新加坡元",
        // 人脸识别不通过 生成条件  
        cashFaceNotPassedIndex:[],
        // 现金 授权级别	现金起始金额	现金限制金额
        cash:[
          [3,1000,5000],
          [4,5000,20000],
          [5,20000,200000],
          [6,200000,500000],
          [7,500000,1000000],
          [8,1000000,20000000],
          [9,20000000,40000000]
        ],
        // 人脸识别不通过 生成条件
        transferFaceNotPassedIndex:[],
        // 转账 授权级别	现金起始金额	现金限制金额
        transfer:[
          [3,5000,10000],
          [4,10000,40000],
          [5,40000,400000],
          [6,400000,1000000],
          [7,1000000,2000000],
          [8,2000000,40000000],
          [9,40000000,80000000]
        ]
      },
      {
        Ccy:"124",
        name:"币种-加元",
        // 人脸识别不通过 生成条件  
        cashFaceNotPassedIndex:[],
        // 现金 授权级别	现金起始金额	现金限制金额
        cash:[
          [3,1000,5000],
          [4,5000,20000],
          [5,20000,200000],
          [6,200000,500000],
          [7,500000,1000000],
          [8,1000000,20000000],
          [9,20000000,40000000]
        ],
        // 人脸识别不通过 生成条件
        transferFaceNotPassedIndex:[],
        // 转账 授权级别	现金起始金额	现金限制金额
        transfer:[
          [3,5000,10000],
          [4,10000,40000],
          [5,40000,400000],
          [6,400000,1000000],
          [7,1000000,2000000],
          [8,2000000,40000000],
          [9,40000000,80000000]
        ]
      },
    ];
    
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

module.exports = {
  amtCondsObj,
  amtConds
}