var fs = require("fs");
var path = require("path");
var generateInsertSql = function(filename,arr){
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
  // return sql; 
  fs.writeFileSync(path.resolve(process.cwd(),"out",filename),sql)
  // console.log(sql);
}
var generateDeleteSql = function(filename,arr){
  var delSql = "";
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
  fs.writeFileSync(path.resolve(process.cwd(),"out",filename),delSql)
}
module.exports = {
  generateInsertSql,
  generateDeleteSql
}