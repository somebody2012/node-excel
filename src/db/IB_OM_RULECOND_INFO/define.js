var sequelize = require("../connection.js");
var model = require("./model.js");





var IB_OM_AUTHMODE_INFO = sequelize.define("IB_OM_AUTHMODE_INFO",...model);

module.exports = {
  IB_OM_AUTHMODE_INFO
}