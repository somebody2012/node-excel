var Sequelize = require("sequelize");
var Model = {
  OPRTN_COND_NO:{ type: Sequelize.STRING,defaultValue: null},
  DICTRY_NM:{ type: Sequelize.STRING,defaultValue: null},
  OPER_SYM_1:{ type: Sequelize.STRING,defaultValue: null},
  CMPR_VAL:{ type: Sequelize.STRING,defaultValue: null},
  OPER_SYM_2:{ type: Sequelize.STRING,defaultValue: null},
  VALUE2:{ type: Sequelize.STRING,defaultValue: null},
  TRAN_CD:{ type: Sequelize.STRING,defaultValue: null},
  COND_DESC:{ type: Sequelize.STRING,defaultValue: null},
  OPER_TELR_NO:{ type: Sequelize.STRING,defaultValue: null},
  OPER_TM:{ type: Sequelize.STRING,defaultValue: null},
  OPER_RSN:{ type: Sequelize.STRING,defaultValue: null},
  CMPR_VAL_DATA_DICTRY_FLG:{ type: Sequelize.STRING,defaultValue: null},
  PUB_DICTRY_FLG:{ type: Sequelize.STRING,defaultValue: null},
  DICTRY_DESC:{ type: Sequelize.STRING,defaultValue: null},
};


module.exports = [
  {
    ...Model
  }
];