var path = require("path");
var fs = require("fs");
var config = require("../config");
var shell = require('shelljs');
var chalk = require("chalk");

function generateNo(startNumber){
  var number = startNumber;
  return function(){
    var condNo = number;
    number++;
    return {
      number:condNo,
      padStart(padLength){
        return String(condNo).padStart(padLength,"0")
      }
    }
  }
}



function getCurDateStr(){
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  year = '' + year;
  month = month < 10 ? ('0' + month) : ('' + month);
  day = day < 10 ? ('0' + day) : ('' + day);
  var arr = [year,month,day];
  return arr.join("-");
}
/**
 * 
 * @param {String} filename 
 * 
 * @param {*} arr 
 * 结构
  [
    {tableName:"IB_OM_RULECOND_INFO",data:data}
  ]
 */
var genInsertSql = function(arr){
  var sql = "";
  for(var i=0;i<arr.length;i++){
    var curTableInfo = arr[i];
    var tableName = curTableInfo.tableName;
    var data = curTableInfo.data;
    var fields = data[0];
    var tableData = data.slice(1);
    var sqlValues = tableData.map(row => {
      row = row.map(v => `"${String(v || '').trim()}"`);
      return `(${row.toString()})`.replace(/\"/g,"\'").replace(/\'/g,"\'");
    });
    if(tableData.length > 0){
      sql += `\n-- ${tableName} insert\n`;
      var transFields = fields.map(v => `\`${v}\``).join(",")
      if(tableName == "TE_PARA_OUTCABINETCFG_INFO"){
        sql += `INSERT INTO   \`pub_db\`.\`${tableName}\` (${transFields}) VALUES\n${sqlValues.join(",\n")};\n`;
      }else{
        sql += `INSERT INTO   \`pub_db\`.\`${tableName}\` (${transFields}) VALUES\n${sqlValues.join(",\n")};\n`;
      }
    }
    
  }
  sql = `${sql}` + "\n";
  // utils.writeToOutDir(filename,sql,config.authSuffix);
return sql;
}
var genDeleteSql = function(arr){
  var delSql = "";
  for(var i=0;i<arr.length;i++){
    var curTableInfo = arr[i];
    var tableName = curTableInfo.tableName;
    var data = curTableInfo.data;
    var tableData = data.slice(1);
    var keyWord = data[0][0];
    if(curTableInfo.tableName == 'IB_OM_RULECOND_RLT'){
      delSql +=tableData.map(v => `DELETE FROM \`pub_db\`.\`${tableName}\` WHERE \`RULE_COND_NO\`='${v[0]}' AND \`CMPL_MODE_FLG\`='${v[1]}' AND \`OPRTN_RULE_NO\`='${v[2]}';`).join("\n")+"\n";
      continue;
    }
    var inValues = tableData.map(v => `"${String(v[0])}"`.replace(/\"/g,"\'").replace(/\'/g,"\'"));
    if(tableData.length > 0){
      if(curTableInfo.tableName == 'TE_PARA_OUTCABINETCFG_INFO'){
        delSql += `DELETE FROM \`pub_db\`.\`${tableName}\` WHERE \`${keyWord}\` IN ( ${inValues.join(",")} );\n\n`;
      }else{
        delSql += `DELETE FROM \`pub_db\`.\`${tableName}\` WHERE \`${keyWord}\` IN ( ${inValues.join(",")} );\n\n`;
      }
    }
  }
  // delSql += "\n";
  return delSql;
}
// 删除字段转换表
var genDeleteTransWordSql = function(arr){
  var delSql = "";
  for(var i=0;i<arr.length;i++){
    var curTableInfo = arr[i];
    var tableName = curTableInfo.tableName;
    var data = curTableInfo.data;
    var tableData = data.slice(1);
    var keyWord0 = data[0][0];
    var keyWord1 = data[0][1];

    delSql += (data.slice(1).map((value,index) => {
      var sqlItem = `DELETE FROM ${tableName} WHERE ${keyWord0}='${value[0]}' AND ${keyWord1}='${value[1]}';\n`;
      return sqlItem
    }).join(""))
  }
  // delSql += "\n";
  return delSql;
}

var writeToOutDir = function(filename,buffer,suffix){
  suffix = suffix || "";
  var dir = path.resolve(__dirname,process.cwd(),"out",this.getCurDateStr() + suffix);
  var isDirExists = fs.existsSync(dir);
  if(!isDirExists){
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(path.resolve(dir,filename),buffer);
}
var svnUpdate = function(){
  try{
    console.log(chalk.green("SVN 开始更新"));
    var cwdPath = process.cwd();
    shell.cd(config.svnStatisticsDir);
    var a = shell.exec("svn update");
    console.log(chalk.green("SVN 更新完成"));
    shell.cd(cwdPath);
  }catch(e){
    console.log(chalk.red("svn update 出错"));
  } 
}
var copySrcExcel = function(srcFileName,distDirname){
  svnUpdate();
  // var src = path.resolve(process.cwd(),"../../../","work/zantong/SVN/02工程活动/04设计与实现/交易数据统计/交易规则统计/" + srcFileName);
  var src = path.resolve(config.svnStatisticsDir,srcFileName);
  var dist = path.resolve(distDirname,srcFileName);
  var isExist = fs.existsSync(src);
  if(isExist){
    fs.copyFileSync(src,dist);
  }else{
    console.log(chalk.red(`不存在文件${src}`));
  }
}
var transformEmpty = function(curWorkSheet){
  for(var i=0;i<curWorkSheet.length;i++){
    var curRow = curWorkSheet[i];
    for(var j=0;j<curRow.length;j++){
      var curValue = curRow[j];
      if(!curValue){
        if(curValue === 0){
          curRow[j] = "0";
        }else{
          curRow[j] = "";
        }
      }else{
        curRow[j] = String(curValue).trim();
      }
    }
  }
}
var checkCond = function(condArr){
  var b = condArr.filter((v1,i1) => {
    var b = condArr.filter(v2 => v2[0] == v1[0] && v2[1] == v1[1])
    return b.length != 1
  })
  if(b.length > 0){
    console.info("条件重复",b);
  }
}


module.exports = {
  generateNo,
  getCurDateStr,
  genInsertSql,
  genDeleteSql,
  writeToOutDir,
  copySrcExcel,
  genDeleteTransWordSql,
  transformEmpty,
  checkCond
}