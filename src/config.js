module.exports = {
  AU_START_NUM:0,//授权
  CV_START_NUM:20000,// 客户视图
  DS_START_NUM:30000,// 双屏
  NI_START_NUM:40000,// 联网核查
  DH_START_NUM:50000,// 双热线
  BN_START_NUM:60000,// 黑名单
  CK_START_NUM:70000,// 复核
  FE_START_NUM:80000,// 收费
  CI_START_NUM:90000,// 客户信息录入
  // SVN 规则统计目录
  svnStatisticsDir:"E:/work/zantong/SVN/02工程活动/04设计与实现/交易数据统计/交易规则统计/",
  // DEV 刷新redis 缓存地址
  refreshRedisUrlDev:"https://www.baidu.com/home/msg/data/personalcontent?num=8&indextype=manht&_req_seqid=0xcecd2ecf001e1ee9&asyn=1&t=1561285896475&sid=1442_21089_29135_29237_28518_29099_29131_29368_28835_29221_22158",
  // SIT 刷新redis 缓存地址
  refreshRedisUrlSit:"https://www.baidu.com/home/msg/data/personalcontent?num=8&indextype=manht&_req_seqid=0xcecd2ecf001e1ee9&asyn=1&t=1561285896475&sid=1442_21089_29135_29237_28518_29099_29131_29368_28835_29221_22158",
  //授权
  srcExcelName:"授权规则收集表汇总1.0.xlsx",// 资源名字
  // srcExcelName:"授权规则收集表汇总1.0的副本.xlsx",// 资源名字
  auSheetName:"授权规则收集",
  // 双屏
  doubleSrceenExcelName:"双屏确认.xlsx",// 双屏确认资源excel名字
  dsSheetName:"双屏确认",
  dsSheetNameField:"双屏确认字段信息",
  // 客户视图
  customerViewExcelName:"客户视图.xlsx",
  cvSheetName:"客户视图",
  // 客户信息录入
  customerInputExcelName:"客户信息录入.xlsx",
  ciSheetName:"客户信息录入",
  // 黑名单
  blackListExcelName:"黑名单.xlsx",
  balckListSheetName:"Sheet1",
  // 双热线
  doubleLineExcelName:"双热线.xlsx",
  doubleLineSheetName:"双热线",
}