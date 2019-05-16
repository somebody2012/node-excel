module.exports = {
  generateNo:function(startNumber){
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
  },
  getCurDateStr:function(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    year = '' + year;
    month = month < 10 ? ('0' + month) : ('' + month);
    day = day < 10 ? ('0' + day) : ('' + day);
    return year + month + day;
  },
  assert:function(){
    var arr = [...arguments];
    var nullValue = ["",null,undefined];
    var nullValues = arr.filter(v => nullValue.includes(v));
    if(nullValues.length !== 0){
      console.error(arr.toString());
    }
  }
}