var path = require("path");
var fs = require("fs");


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
      return `(${row.toString()})`;
    });
    if(tableData.length > 0){
      sql += `\n-- ${tableName} insert\n`;
      sql += `INSERT INTO ${tableName} (${fields.toString()}) VALUES\n\n${sqlValues.join(",\n")};`;
    }
    
  }
  sql = `
SET AUTOCOMMIT=0;
BEGIN;\n
  ${sql}
  \nCOMMIT;`;
  // utils.writeToOutDir(filename,sql,config.authSuffix);
return sql;
}
var genDeleteSql = function(arr){
  var delSql = "SET AUTOCOMMIT=0;\nBEGIN;\n\n";
  for(var i=0;i<arr.length;i++){
    var curTableInfo = arr[i];
    var tableName = curTableInfo.tableName;
    var data = curTableInfo.data;
    var tableData = data.slice(1);
    var keyWord = data[0][0]
    var inValues = tableData.map(v => `"${String(v[0])}"`);
    if(tableData.length > 0){
      delSql += `DELETE FROM ${tableName} WHERE ${keyWord} IN ( ${inValues.join(",")} );\n`;
    }
  }
  delSql += "\nCOMMIT;";
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




module.exports = {
  generateNo,
  getCurDateStr,
  genInsertSql,
  genDeleteSql,
  writeToOutDir
}