var xlsx = require('node-xlsx');
var fs = require("fs");
const workSheets = xlsx.parse(fs.readFileSync(`${__dirname}/src/resources/abc.xlsx`));



const data = [
  ["name", "age", "school"],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
];
var buffer = xlsx.build([
  {name: "mySheetName", data: data}
]); 


fs.writeFileSync("./test.xlsx",buffer);


