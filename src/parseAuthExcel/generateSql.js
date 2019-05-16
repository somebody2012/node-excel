var fs = require("fs");
var path = require("path");
var generateSql = function(arr){
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
    sql += `\n-- ${tableName} insert\n`;
    sql += `INSERT INTO (${tableName}(${fields.toString()}) VALUES\n\n${sqlValues.join(",\n")};`;
  }
  sql = `
SET AUTOCOMMIT=0;
BEGIN;\n
  ${sql}
  \nCOMMIT;`;
  // return sql; 
  fs.writeFileSync(path.resolve(process.cwd(),"out","sql.sql"),sql)
  // console.log(sql);
}
module.exports = generateSql