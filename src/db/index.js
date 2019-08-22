
var chalk = require('chalk');
var axios = require("axios");
var config = require("../config");
var getConnection = require("./connection.js");
var utils = require("../utils/index");


var exeInsert = function(tableName,excelData,whitchEnv){
  return new Promise(async (resolve,reject) => {
    var tableFields = excelData[0].map(field => {
      return `\`${field}\``
    }).join(",");
    if(excelData.length == 1){
      resolve();
      return;
    }
    var sqlStr = `INSERT INTO ${tableName}( ${tableFields} ) VALUES ?`;
    var values = excelData.slice(1);
    var conn = await getConnection(whitchEnv);
    conn.query(sqlStr,[values],(err,ret,fields) => {
      if(err){
        debugger
        console.log(chalk.red(`插入 - ${tableName} - 失败`));
        conn.release();
        reject(err);
      }else{
        console.log(chalk.green(`插入 - ${tableName} - 成功`));
        conn.release();
        resolve(err);
      }
    })
  });
}

var exeDelete = function(tableName,excelData,whitchEnv,isDeleteKeyWords){
  
  return new Promise(async (resolve,reject) => {
    var values = excelData.slice(1).map(row => {
      return `"${row[0]}"`;
    }).join(",");
    if(excelData.length == 1){
      resolve();
      return;
    }
    var sqlStr = `DELETE FROM ${tableName} WHERE ${excelData[0][0]} IN ( ${values} )`;
    var conn = await getConnection(whitchEnv);
    conn.query(sqlStr,(err,ret,fields) => {
      if(err){
        debugger
        console.log(chalk.red(`删除 - ${tableName} - 失败`));
        conn.release();
        reject(err);
      }else{
        console.log(chalk.green(`删除 - ${tableName} - 成功`));
        conn.release();
        resolve(err);
      }
    })
  });
}


var updateCacheVersion = async function(){
  var conn = await getConnection("DEV");
  var selectSqlStr = ``;
  conn.query(selectSqlStr,[],(err,ret,fields) => {
    debugger
  })
}

var refreshCache = function(url,desc){
  return new Promise((resolve,reject) => {
    console.log(chalk.yellow(`开始刷新${desc}缓存`));
    axios.get(url)
      .then(res => {
        console.log(chalk.yellow(`刷新${desc}缓存成功${JSON.stringify(res.data)}`));
        resolve(res);
      })
      .catch(res => {
        console.log(chalk.yellow(`刷新${desc}缓存失败${JSON.stringify(res.data)}`));
        reject(res);
      })
  });
}

var dbHandler = async function(arr,type,needRefresh = true,isDeleteKeyWords){
  // //插入DEV 数据库
  console.log(chalk.red(`${type} - DEV`));
  var deleteAllDev = arr.map(item => exeDelete(item.tableName,item.data,"DEV",isDeleteKeyWords));
  await Promise.all(deleteAllDev);
  var insertAllDev = arr.map(item => exeInsert(item.tableName,item.data,"DEV"));
  await Promise.all(insertAllDev);

  // // // 插入 SIT 数据库
  // console.log(chalk.red(`${type} - SIT`));
  // var deleteAllSit = arr.map(item => exeDelete(item.tableName,item.data,"SIT"));
  // await Promise.all(deleteAllSit);
  // var insertAllSit = arr.map(item => exeInsert(item.tableName,item.data,"SIT"));
  // await Promise.all(insertAllSit);





  
  if(!(String(process.argv[2]) || "").includes("0") && needRefresh){
    await Promise.all([
      // refreshCache(config.refreshRedisUrlDev,"DEV"),
      // refreshCache(config.refreshRedisUrlSit,"SIT")
    ]);
    process.exit();
  }
  
}



module.exports = {
  exeInsert,
  exeDelete,
  dbHandler,
  refreshCache,
  updateCacheVersion
}












