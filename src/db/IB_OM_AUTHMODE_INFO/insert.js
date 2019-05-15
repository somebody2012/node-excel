var { IB_OM_AUTHMODE_INFO } = require("./define.js");

var initialData = [
  { 
    "OPRTN_COND_NO":"AU00003","DICTRY_NM":"txAmt","OPER_SYM_1":"==","CMPR_VAL":"50000","OPER_SYM_2":"00102001","VALUE2":"","TRAN_CD":"80003940","COND_DESC":"","OPER_TELR_NO":"","OPER_TM":"","OPER_RSN":"","CMPR_VAL_DATA_DICTRY_FLG":"","PUB_DICTRY_FLG":"","DICTRY_DESC":""
  }
];
var fn = async () => {
  // await IB_OM_AUTHMODE_INFO.sync({force:true});
  //await IB_OM_AUTHMODE_INFO.sync({alter:true});
  // await IB_OM_AUTHMODE_INFO.truncate({force:true});
  
  await IB_OM_AUTHMODE_INFO.bulkCreate(initialData);
}
fn();