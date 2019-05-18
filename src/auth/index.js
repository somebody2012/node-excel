var a = {
	"AU": {
		"000001": {
			"staticCondition": [],
			"dynamicCondition": [
        ["AU00001", "txAmt", ">=", "50000", "txAmt", "", "", "0"],
        ["AU00001", "txAmt1", ">=", "50000", "txAmt", "", "", "0"],
        ["AU00002", "txAmt3", ">=", "50000", "txAmt", "", "", "0"]
      ],
			"modeList": {
        "AU00001": [["2", "4", "", "", "", "*", "金额超限触发授权", "", "", "", "", "", ""]],
        "AU00002": [["2", "4", "", "", "", "*", "金额超限触发授权22", "", "", "", "", "", ""]]
			}
    },
    "000001": {
      result:true,
			// "staticCondition": [],
			// "dynamicCondition": [
      //   ["AU00001", "txAmt", ">=", "50000", "txAmt", "", "", "0"],
      //   ["AU00001", "txAmt1", ">=", "50000", "txAmt", "", "", "0"],
      //   ["AU00002", "txAmt3", ">=", "50000", "txAmt", "", "", "0"]
      // ],
			"modeList": {
        "AU00001": [["2", "4", "", "", "", "*", "金额超限触发授权", "", "", "", "", "", ""]],
        "AU00002": [["2", "4", "", "", "", "*", "金额超限触发授权22", "", "", "", "", "", ""]]
			}
		}
	}
}


var ruleResult = [
  {
    ruleNo:"000001",
    conditionList:[
      {
        passed:false,
        conditionNo:"AU00001",
        conditionList:[
          ["AU00001", "txAmt", ">=", "50000", "txAmt", "", "", "0","value"],
          ["AU00001", "txAmt1", ">=", "50000", "txAmt", "", "", "0","value"],
        ],
        modes:[["2", "4", "", "", "", "*", "金额超限触发授权", "", "", "", "", "", ""]]
      },
      {
        passed:false,
        conditionNo:"AU00002",
        conditionList:[
          ["AU00002", "txAmt3", ">=", "50000", "txAmt", "", "", "0","value"]
        ],
        modes:[["2", "4", "", "", "", "*", "金额超限触发授权22", "", "", "", "", "", ""]]
      }
    ],
    staticCondition:[
      {
        passed:true,
        conditionNo:"AU00001",
        conditionList:[
          ["AU00001", "txAmt", ">=", "50000", "txAmt", "", "", "0","value"],
          ["AU00001", "txAmt1", ">=", "50000", "txAmt", "", "", "0","value"],
        ],
        modes:[["2", "4", "", "", "", "*", "金额超限触发授权22", "", "", "", "", "", ""]]
      }
    ]
  }
];

var obj = {
  handleRuleList(ruleList){
    var ruleTypes = Object.keys(ruleList);
    var transedRuleList= [];
    for(var i=0;i<ruleTypes.length;i++){
      var ruleType = ruleTypes[i];// AU CK DS
      switch(ruleType){
        case "AU":
            var rules = ruleList[ruleType];
            var ruleNos = Object.keys(rules);
            // 去重
            for(var i=0;i<ruleNos.length;i++){
              var curRule = rules[ruleNos[i]];
              var ruleItem = {
                ruleNo:ruleNos[i],
                conditionList:[],
                staticCondition:[]
              }
              var dynamicCondition = curRule.dynamicCondition;
              var condNos = dynamicCondition.map((v,i) => v[0]).filter(v => Boolean(v));
              var uniqConds = condNos.filter((v,i) => condNos.indexOf(v) === i);
            }
          break;
        default:
          console.error("不支持类型::",ruleType);
      }
    }
  }
}








