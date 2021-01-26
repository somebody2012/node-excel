module.exports = {
  //一阶段
  AU_START_NUM_STAGE_1:5668,//授权
  AU_START_NUM_STAGE_1_COND_NUM:5772,

  CV_START_NUM_STAGE_1:20000,// 客户视图
  DS_START_NUM_STAGE_1:30000,// 双屏
  // NI_START_NUM_STAGE_1:40000,// 联网核查
  DH_START_NUM_STAGE_1:50000,// 双热线
  BN_START_NUM_STAGE_1:60000,// 黑名单
  CK_START_NUM_STAGE_1:70000,// 复核
  // FE_START_NUM_STAGE_1:80000,// 收费
  CI_START_NUM_STAGE_1:90000,// 客户信息录入
  CI_START_NUM_STAGE_1_COND_NUM:90000,
  
  //二阶段
  AU_START_NUM:5100,//授权+++++++++++++++++++++++++
  CV_START_NUM:25000,// 客户视图+++++++++++++++++++
  DS_START_NUM:35000,// 双屏+++++++++++++++++++++++
  // NI_START_NUM:40000,// 联网核查
  DH_START_NUM:55000,// 双热线++++++++++++++++++++
  BN_START_NUM:65000,// 黑名单++++++++++++++++++++
  CK_START_NUM:75000,// 复核
  // FE_START_NUM:80000,// 收费
  CI_START_NUM:95190,// 客户信息录入+++++++++++++
  CI_START_NUM_COND_NUM:95190,// 客户信息录入+++++++++++++
  AMT_RULE_NO:"005000",//金额授权规则号
  // SVN 规则统计目录
  // svnStatisticsDir:"/Users/apple/Desktop/二阶段excel",
  // svnStatisticsDir1:"/Users/apple/Desktop/一阶段excel",
  svnStatisticsDir:"E:/work/zantong/SVN/02工程活动/04设计与实现/交易数据统计/交易规则统计/二阶段/",
  svnStatisticsDir1:"E:/work/zantong/SVN/02工程活动/04设计与实现/交易数据统计/交易规则统计/一阶段/",
  // DEV 刷新redis 缓存地址
  // refreshRedisUrlDev:"http://10.16.2.228/abside/abs-te-ib-ownservices/loadCaceAtStap",
  refreshRedisUrlDev:"http://10.16.2.228/abside/abs-te-cacheserver/loadCaceAtStap",
  // SIT 刷新redis 缓存地址
  //refreshRedisUrlSit:"http://10.16.43.90/abside/abs-te-ib-ownservices/loadCaceAtStap",
  refreshRedisUrlSit:"http://10.16.43.182/abside/abs-te-cacheserver/loadCaceAtStap",
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
  balckListSheetName:"黑名单规则统计",
  // 双热线
  doubleLineExcelName:"双热线.xlsx",
  doubleLineSheetName:"双热线",
  // 复核
  ckExcelName:"复核规则统计.xlsx",
  ckSheetName:"复核规则统计",
  ckSheetNameField:"复核字段",
  ckSheetReflectField:"复核字段映射",
  // 输出
  AU_OUT_FILENAME:"刁信瑞-二期-SIT-授权规则-$date.txt",
  CI_OUT_FILENAME:"刁信瑞-二期-SIT-客户信息录入规则-$date.txt",
  CV_OUT_FILENAME:"刁信瑞-二期-SIT-客户视图规则-$date.txt",
  DH_OUT_FILENAME:"刁信瑞-二期-SIT-双热线规则-$date.txt",
  BN_OUT_FILENAME:"刁信瑞-二期-SIT-黑名单规则-$date.txt",
  DS_OUT_FILENAME:"刁信瑞-二期-SIT-双屏确认规则-$date.txt",

  AU_OUT_FILENAME_STAGE_1:"刁信瑞-一期-SIT-授权规则-$date.txt",
  CI_OUT_FILENAME_STAGE_1:"刁信瑞-一期-SIT-客户信息录入规则-$date.txt",
  CV_OUT_FILENAME_STAGE_1:"刁信瑞-一期-SIT-客户视图规则-$date.txt",
  DH_OUT_FILENAME_STAGE_1:"刁信瑞-一期-SIT-双热线规则-$date.txt",
  BN_OUT_FILENAME_STAGE_1:"刁信瑞-一期-SIT-黑名单规则-$date.txt",
  DS_OUT_FILENAME_STAGE_1:"刁信瑞-一期-SIT-双屏确认规则-$date.txt",
}