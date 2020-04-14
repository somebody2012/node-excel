
-- IB_OM_RULE_INFO insert
INSERT INTO IB_OM_RULE_INFO (RULE_NO,RULE_TYP_CD,HOLI_FLG,RULE_TRI_POSITION,SUIT_CHNL_SCP,SUIT_LPR_SCP,SUIT_ORG_SCP,SUIT_TX_SCP,RULE_COMNT,EFFT_FLG,OPER_TELR_NO,OPER_DT,OPER_RSN) VALUES

('035000','DS','N','1','TE','0000','*,','00302011','强制双屏确认','1','','2020-04-09','批量新增'),
('035001','DS','N','1','TE','0000','*,','00302010','强制双屏确认','1','','2020-04-09','批量新增'),
('035002','DS','N','1','TE','0000','*,','00302008','强制双屏确认','1','','2020-04-09','批量新增'),
('035003','DS','N','1','TE','0000','*,','00302009','强制双屏确认','1','','2020-04-09','批量新增'),
('035004','DS','N','1','TE','0000','*,','00201005','操作标志为挂失','1','','2020-04-09','批量新增'),
('035005','DS','N','1','TE','0000','*,','00301010','强制双屏确认','1','','2020-04-09','批量新增'),
('035006','DS','N','1','TE','0000','*,','00301009','强制双屏确认','1','','2020-04-09','批量新增'),
('035007','DS','N','1','TE','0000','*,','00301017','强制双屏确认','1','','2020-04-09','批量新增'),
('035008','DS','N','1','TE','0000','*,','00301015','强制双屏确认','1','','2020-04-09','批量新增'),
('035009','DS','N','1','TE','0000','*,','00302018','强制双屏确认','1','','2020-04-09','批量新增'),
('035010','DS','N','1','TE','0000','*,','00302007','强制双屏确认','1','','2020-04-09','批量新增'),
('035011','DS','N','1','TE','0000','*,','00302013','强制双屏确认','1','','2020-04-09','批量新增'),
('035012','DS','N','1','TE','0000','*,','00302014','现金取款','1','','2020-04-09','批量新增'),
('035013','DS','N','1','TE','0000','*,','00302014','转账取款','1','','2020-04-09','批量新增'),
('035014','DS','N','1','TE','0000','*,','00302016','对私客户且线上填单','1','','2020-04-09','批量新增'),
('035015','DS','N','1','TE','0000','*,','00301007','强制双屏确认','1','','2020-04-09','批量新增');
-- IB_OM_RULECOND_INFO insert
INSERT INTO IB_OM_RULECOND_INFO (OPRTN_COND_NO,DICTRY_NM,OPER_SYM_1,CMPR_VAL,OPER_SYM_2,VALUE2,TRAN_CD,COND_DESCR,OPER_TELR_NO,OPER_DT,OPER_RSN,CMPR_VAL_DATA_DICTRY_FLG,PUB_DICTRY_FLG,DICTRY_DESCR) VALUES

('DS35004','OPER_FLG_CD','==','1','','','00201005','操作标志为挂失','','2020-04-09','批量新增','1','0',''),
('DS35012','Cash_Tran_Ind','==','0','','','00302014','现金取款','','2020-04-09','批量新增','1','0',''),
('DS35013','Cash_Tran_Ind','==','1','','','00302014','转账取款','','2020-04-09','批量新增','1','0',''),
('DS35014','custtypcd','==','0','','','00302016','对私客户且线上填单','','2020-04-09','批量新增','1','0',''),
('DS35014','inputType','==','1','','','00302016','对私客户且线上填单','','2020-04-09','批量新增','1','0','');
-- IB_OM_MODE_INFO insert
INSERT INTO IB_OM_MODE_INFO (RULE_MODE_NO,FIELD_SEQ_NO,FIELD_NM,FIELD_DICTRY_NM,RULE_MODE_TYP_CD) VALUES

('DS35000','1','screenSeqNo','001','DS'),
('DS35001','2','screenSeqNo','001','DS'),
('DS35002','3','screenSeqNo','001','DS'),
('DS35003','4','screenSeqNo','001','DS'),
('DS35004','5','screenSeqNo','001','DS'),
('DS35005','6','screenSeqNo','001','DS'),
('DS35006','7','screenSeqNo','001','DS'),
('DS35007','8','screenSeqNo','001','DS'),
('DS35008','9','screenSeqNo','001','DS'),
('DS35009','10','screenSeqNo','001','DS'),
('DS35010','11','screenSeqNo','001','DS'),
('DS35011','12','screenSeqNo','001','DS'),
('DS35012','13','screenSeqNo','001','DS'),
('DS35013','14','screenSeqNo','002','DS'),
('DS35014','15','screenSeqNo','001','DS'),
('DS35015','16','screenSeqNo','001','DS');
-- IB_OM_RULECOND_RLT insert
INSERT INTO IB_OM_RULECOND_RLT (RULE_COND_NO,CMPL_MODE_FLG,OPRTN_RULE_NO) VALUES

('DS35000','0','035000'),
('DS35001','0','035001'),
('DS35002','0','035002'),
('DS35003','0','035003'),
('DS35004','1','035004'),
('DS35005','0','035005'),
('DS35006','0','035006'),
('DS35007','0','035007'),
('DS35008','0','035008'),
('DS35009','0','035009'),
('DS35010','0','035010'),
('DS35011','0','035011'),
('DS35012','1','035012'),
('DS35013','1','035013'),
('DS35014','1','035014'),
('DS35015','0','035015');
-- TE_PARA_OUTCABINETCFG_INFO insert
INSERT INTO TE_PARA_OUTCABINETCFG_INFO (TRAN_CD,BUNDRY_INDCT_HEDLN_NM,SCRN_NO,SCRN_SORT_SEQ_NO,BUNDRY_INDCT_NM,GT_VAL_SCP_CD,KEY_VAL,ENTR_NM,STUS_CD,REMRK_1) VALUES

('00301009','母子账户活期子账户现金存款','001','1','交易名','0','','tranName','1',''),
('00301009','母子账户活期子账户现金存款','001','2','账号','0','','accnum','1',''),
('00301009','母子账户活期子账户现金存款','001','3','账户名称','0','','subNm','1',''),
('00301009','母子账户活期子账户现金存款','001','4','币种','0','','currencyC','1',''),
('00301009','母子账户活期子账户现金存款','001','5','交易金额','0','','txAmt','1',''),
('00301010','借记卡零整子账户现金续存','001','1','交易名','0','','tranName','1',''),
('00301010','借记卡零整子账户现金续存','001','2','账号','0','','custAcctNo','1',''),
('00301010','借记卡零整子账户现金续存','001','3','账户名称','0','','acctnm','1',''),
('00301010','借记卡零整子账户现金续存','001','4','交易金额','0','','txAmt','1',''),
('00201005','挂失解挂','001','7','产品','0','','PROD_NO','1',''),
('00201005','挂失解挂','001','6','凭证种类','0','','vouchTypCdPrint','1',''),
('00201005','挂失解挂','001','5','证件号码','0','','crtfNbr','1',''),
('00201005','挂失解挂','001','4','证件类型','0','','crtfTypCd','1',''),
('00201005','挂失解挂','001','3','户名','0','','custNm','1',''),
('00201005','挂失解挂','001','1','交易名','0','','transName','1',''),
('00201005','挂失解挂','001','2','账号','0','','CARD_NO_OR_ACCT_NO','1',''),
('00301011','结算卡现金存款','001','1','交易名','0','','tranName','1',''),
('00301011','结算卡现金存款','001','2','账号','0','','accNo','1',''),
('00301011','结算卡现金存款','001','3','账户名称','0','','acctnm','1',''),
('00301011','结算卡现金存款','001','4','交易金额','0','','txAmt','1',''),
('00302008','存折活期转账取款','001','1','交易名','0','','tranName','1',''),
('00302008','存折活期转账取款','001','2','付款人账号','0','','accnum','1',''),
('00302008','存折活期转账取款','001','3','付款人户名','0','','acctnm','1',''),
('00302008','存折活期转账取款','001','4','交易金额','0','','txAmt','1',''),
('00302008','存折活期转账取款','001','5','收款人账号','0','','recvrAcctNo','1',''),
('00302008','存折活期转账取款','001','6','收款人户名','0','','recvrAcctnm','1',''),
('00302009','母子账户活期子账户转账取款','001','1','交易名','0','','tranName','1',''),
('00302009','母子账户活期子账户转账取款','001','2','付款人账号','0','','accNum','1',''),
('00302009','母子账户活期子账户转账取款','001','3','付款人户名','0','','acctNm','1',''),
('00302009','母子账户活期子账户转账取款','001','4','币种','0','','currencyC','1',''),
('00302009','母子账户活期子账户转账取款','001','5','钞汇标志','0','','monRemFlagC','1',''),
('00302009','母子账户活期子账户转账取款','001','6','交易金额','0','','txAmt','1',''),
('00302009','母子账户活期子账户转账取款','001','7','收款人账号','0','','recvrAcctNo','1',''),
('00302009','母子账户活期子账户转账取款','001','8','收款人户名','0','','recvrAcctNm','1',''),
('00302010','借记卡转账取款','001','1','交易名','0','','tranName','1',''),
('00302010','借记卡转账取款','001','2','付款人账号','0','','accNum','1',''),
('00302010','借记卡转账取款','001','3','付款人户名','0','','acctNm','1',''),
('00302010','借记卡转账取款','001','4','币种','0','','currencyC','1',''),
('00302010','借记卡转账取款','001','5','钞汇标志','0','','monRemFlagC','1',''),
('00302010','借记卡转账取款','001','6','交易金额','0','','txAmt','1',''),
('00302010','借记卡转账取款','001','7','收款人账号','0','','recvrAcctNo','1',''),
('00302010','借记卡转账取款','001','8','收款人户名','0','','recvrAcctNm','1',''),
('00302011','支票活期转账取款','001','1','交易名','0','','tranName','1',''),
('00302011','支票活期转账取款','001','2','付款人账号','0','','accNo','1',''),
('00302011','支票活期转账取款','001','3','付款人户名','0','','acctnm','1',''),
('00302011','支票活期转账取款','001','4','币种','0','','currencyC','1',''),
('00302011','支票活期转账取款','001','5','钞汇标志','0','','monRemFlagC','1',''),
('00302011','支票活期转账取款','001','6','交易金额','0','','txAmt','1',''),
('00302011','支票活期转账取款','001','7','收款人账号','0','','recvrAcctNo','1',''),
('00302011','支票活期转账取款','001','8','收款人户名','0','','recvrAcctnm','1',''),
('00301017','借记卡存本零取子账户现金取款','001','1','交易名','0','','tranName','1',''),
('00301017','借记卡存本零取子账户现金取款','001','2','账号','0','','custAcctNo','1',''),
('00301017','借记卡存本零取子账户现金取款','001','3','户名','0','','acctnm','1',''),
('00301017','借记卡存本零取子账户现金取款','001','4','交易金额','0','','txAmt','1',''),
('00301015','支票活期现金取款','001','1','交易名','0','','tranName','1',''),
('00301015','支票活期现金取款','001','2','账号','0','','custAcctNo','1',''),
('00301015','支票活期现金取款','001','3','户名','0','','acctnm','1',''),
('00301015','支票活期现金取款','001','4','币种','0','','currencyC','1',''),
('00301015','支票活期现金取款','001','5','交易金额','0','','txAmt','1',''),
('00302018','通知存款转账部支','001','1','交易名','0','','tranName','1',''),
('00302018','通知存款转账部支','001','2','付款人账号','0','','custAcctNo','1',''),
('00302018','通知存款转账部支','001','3','付款人户名','0','','acctnm','1',''),
('00302018','通知存款转账部支','001','4','币种','0','','currencyC','1',''),
('00302018','通知存款转账部支','001','5','钞汇标志','0','','monRemFlagC','1',''),
('00302018','通知存款转账部支','001','6','部支金额','0','','txAmt','1',''),
('00302018','通知存款转账部支','001','7','利息','0','','intrest','1',''),
('00302018','通知存款转账部支','001','8','收款人账号','0','','recvrAcctNo','1',''),
('00302018','通知存款转账部支','001','9','收款人户名','0','','recvrAcctNm','1',''),
('00302007','借记卡存本零取子账户转账取款','001','1','交易名称','0','','tranName','1',''),
('00302007','借记卡存本零取子账户转账取款','001','2','付款人账号','0','','custAcctNo','1',''),
('00302007','借记卡存本零取子账户转账取款','001','3','付款人户名','0','','acctnm','1',''),
('00302007','借记卡存本零取子账户转账取款','001','4','交易金额','0','','txAmt','1',''),
('00302007','借记卡存本零取子账户转账取款','001','5','收款人账号','0','','recvrAcctNo','1',''),
('00302007','借记卡存本零取子账户转账取款','001','6','收款人户名','0','','recvrAcctNm','1',''),
('00302013','定期一本通现金部支','001','1','交易名','0','','tranName','1',''),
('00302013','定期一本通现金部支','001','2','账号','0','','custAcctNo','1',''),
('00302013','定期一本通现金部支','001','3','户名','0','','acctnm','1',''),
('00302013','定期一本通现金部支','001','4','部支金额','0','','partyAmt','1',''),
('00302013','定期一本通现金部支','001','5','利息','0','','intAmt','1',''),
('00302014','跨行现金取款','001','1','交易名','0','','tranName','1',''),
('00302014','跨行现金取款','001','2','账号','0','','Acct_Num','1',''),
('00302014','跨行现金取款','001','3','户名','0','','ACCTNM','1',''),
('00302014','跨行现金取款','001','4','交易金额','0','','TX_Amt','1',''),
('00302014','跨行现金取款','001','5','付款行行名','0','','Payr_Bank_Num_Nm','1',''),
('00302014','跨行现金取款','002','1','交易名','0','','tranName','1',''),
('00302014','跨行现金取款','002','2','付款人账号','0','','Acct_Num','1',''),
('00302014','跨行现金取款','002','3','付款人户名','0','','ACCTNM','1',''),
('00302014','跨行现金取款','002','4','交易金额','0','','TX_Amt','1',''),
('00302014','跨行现金取款','002','5','收款人账号','0','','sAcct_Num','1',''),
('00302014','跨行现金取款','002','6','收款人户名','0','','sACCTNM','1',''),
('00302014','跨行现金取款','002','7','收款行行号','0','','Payr_Bank_Num_Nm','1',''),
('00302016','网内汇兑','001','1','交易名','0','','tranName','1',''),
('00302016','网内汇兑','001','2','付款人账号','0','','Payr_Acct_Num','1',''),
('00302016','网内汇兑','001','3','付款人户名','0','','Payr_Nm','1',''),
('00302016','网内汇兑','001','4','汇款金额','0','','TX_Amt','1',''),
('00302016','网内汇兑','001','5','收款人账号','0','','Recvr_Acct_Num','1',''),
('00302016','网内汇兑','001','6','收款人户名','0','','Recvr_Nm','1',''),
('00301007','存折活期现金取款','001','1','交易名','0','','tranName','1',''),
('00301007','存折活期现金取款','001','2','账号','0','','bankAcctNo','1',''),
('00301007','存折活期现金取款','001','3','户名','0','','acctnm','1',''),
('00301007','存折活期现金取款','001','4','币种','0','','currencyC','1',''),
('00301007','存折活期现金取款','001','5','交易金额','0','','txAmt','1',''),
('00301002','母子账户活期子账户现金取款','001','1','交易名','0','','tranName','1',''),
('00301002','母子账户活期子账户现金取款','001','2','账号','0','','custAcctNo','1',''),
('00301002','母子账户活期子账户现金取款','001','3','户名','0','','acctnm','1',''),
('00301002','母子账户活期子账户现金取款','001','4','币种','0','','currencyC','1',''),
('00301002','母子账户活期子账户现金取款','001','5','交易金额','0','','txAmt','1',''),
('00301005','结算卡转账取款','001','1','交易名','0','','tranName','1',''),
('00301005','结算卡转账取款','001','2','结算卡卡号','0','','custAcctNo','1',''),
('00301005','结算卡转账取款','001','3','持卡人','0','','crdhldNm','1',''),
('00301005','结算卡转账取款','001','4','主账户账号','0','','mainAcctAcctNo','1',''),
('00301005','结算卡转账取款','001','5','主账户户名','0','','acctnm','1',''),
('00301005','结算卡转账取款','001','6','交易金额','0','','txAmt','1',''),
('00301005','结算卡转账取款','001','7','收款人账号','0','','recvrAcctNo','1',''),
('00301005','结算卡转账取款','001','8','收款人户名','0','','recvrAcctNm','1',''),
('00301016','借记卡现金取款','001','1','交易名','0','','tranName','1',''),
('00301016','借记卡现金取款','001','2','账号','0','','custAcctNo','1',''),
('00301016','借记卡现金取款','001','3','户名','0','','acctnm','1',''),
('00301016','借记卡现金取款','001','4','币种','0','','curCdC','1',''),
('00301016','借记卡现金取款','001','5','交易金额','0','','txAmt','1',''),
('00301018','结算卡现金取款','001','1','交易名','0','','tranName','1',''),
('00301018','结算卡现金取款','001','2','结算卡卡号','0','','custAcctNo','1',''),
('00301018','结算卡现金取款','001','3','持卡人','0','','crdhldNm','1',''),
('00301018','结算卡现金取款','001','4','主账户账号','0','','mainAcctAcctNo','1',''),
('00301018','结算卡现金取款','001','5','主账户户名','0','','acctnm','1',''),
('00301018','结算卡现金取款','001','6','交易金额','0','','txAmt','1',''),
('00302004','母子账户活期子账户互转','001','1','交易名','0','','tranName','1',''),
('00302004','母子账户活期子账户互转','001','2','付款人账号','0','','custAcctNo','1',''),
('00302004','母子账户活期子账户互转','001','3','付款人户名','0','','acctnm','1',''),
('00302004','母子账户活期子账户互转','001','4','交易金额','0','','txAmt','1',''),
('00302004','母子账户活期子账户互转','001','5','收款人账号','0','','recvrAcctNo','1',''),
('00302004','母子账户活期子账户互转','001','6','收款人户名','0','','recvrAcctNm','1',''),
('00301003','借记卡现金存款','001','1','交易名','0','','tranName','1',''),
('00301003','借记卡现金存款','001','2','账号','0','','custAcctNo','1',''),
('00301003','借记卡现金存款','001','3','户名','0','','acctnm','1',''),
('00301003','借记卡现金存款','001','4','币种','0','','curCdC','1',''),
('00301003','借记卡现金存款','001','5','交易金额','0','','txAmt','1',''),
('00301003','借记卡现金存款','002','1','交易名','0','','tranName','1',''),
('00301003','借记卡现金存款','002','2','账号','0','','custAcctNo','1',''),
('00301003','借记卡现金存款','002','3','户名','0','','acctnm','1',''),
('00301003','借记卡现金存款','002','4','币种','0','','curCdC','1',''),
('00301003','借记卡现金存款','002','5','交易金额','0','','txAmt','1',''),
('00301003','借记卡现金存款','002','6','账户性质','0','','ACCT_ACCT_CHARC_CD_M','1',''),
('00301004','存折零整现金续存','001','1','交易名','0','','tranName','1',''),
('00301004','存折零整现金续存','001','2','账号','0','','accnum','1',''),
('00301004','存折零整现金续存','001','3','户名','0','','acctnm','1',''),
('00301004','存折零整现金续存','001','4','交易金额','0','','txAmt','1',''),
('00302002','结算卡卡内账户转账','001','1','交易名','0','','tranName','1',''),
('00302002','结算卡卡内账户转账','001','2','结算卡卡号','0','','custAcctNo','1',''),
('00302002','结算卡卡内账户转账','001','3','持卡人','0','','crdhldNm','1',''),
('00302002','结算卡卡内账户转账','001','4','付款人账号','0','','payAcctNo','1',''),
('00302002','结算卡卡内账户转账','001','5','付款人户名','0','','payAcctNm','1',''),
('00302002','结算卡卡内账户转账','001','6','交易金额','0','','txAmt','1',''),
('00302002','结算卡卡内账户转账','001','7','收款人账号','0','','recvrAcctNo','1',''),
('00302002','结算卡卡内账户转账','001','8','收款人户名','0','','recvrAcctNm','1',''),
('00302003','借记卡子账户现金部支','001','1','交易名','0','','tranName','1',''),
('00302003','借记卡子账户现金部支','001','2','账号','0','','accNum','1',''),
('00302003','借记卡子账户现金部支','001','3','户名','0','','acctNm','1',''),
('00302003','借记卡子账户现金部支','001','4','部支金额','0','','partAmt','1',''),
('00302003','借记卡子账户现金部支','001','5','利息','0','','repayInt','1',''),
('00302006','存折存本零取转账取款','001','1','交易名','0','','tranName','1',''),
('00302006','存折存本零取转账取款','001','2','付款人账号','0','','accnum','1',''),
('00302006','存折存本零取转账取款','001','3','付款人户名','0','','acctnm','1',''),
('00302006','存折存本零取转账取款','001','4','交易金额','0','','txAmt','1',''),
('00302006','存折存本零取转账取款','001','5','收款人账号','0','','recvrAcctNo','1',''),
('00302006','存折存本零取转账取款','001','6','收款人户名','0','','recvrAcctnm','1',''),
('00301006','存折存本零取现金取款','001','1','交易名','0','','tranName','1',''),
('00301006','存折存本零取现金取款','001','2','账号','0','','accnum','1',''),
('00301006','存折存本零取现金取款','001','3','户名','0','','acctnm','1',''),
('00301006','存折存本零取现金取款','001','4','交易金额','0','','txAmt','1',''),
('00201024','强制扣划','001','1','交易名','0','','tranName','1',''),
('00201024','强制扣划','001','2','账/卡号','0','','accNum','1',''),
('00201024','强制扣划','001','3','户名','0','','acctnm','1',''),
('00201024','强制扣划','001','4','扣划金额','0','','dctAmt','1',''),
('00201024','强制扣划','001','5','收款人账号','0','','recvrAcctNo','1',''),
('00201024','强制扣划','001','6','收款人户名','0','','recvrAcctNm','1',''),
('00302021','行内转账（同业存放部分提前支取）','001','1','交易名','0','','tranName','1',''),
('00302021','行内转账（同业存放部分提前支取）','001','2','付款人账号','0','','accNum','1',''),
('00302021','行内转账（同业存放部分提前支取）','001','3','付款人户名','0','','acctNm','1',''),
('00302021','行内转账（同业存放部分提前支取）','001','4','部支金额','0','','partAmt','1',''),
('00302021','行内转账（同业存放部分提前支取）','001','5','利息','0','','repayInt','1',''),
('00302021','行内转账（同业存放部分提前支取）','001','6','关联方账号','0','','RELA_PTY_ACCT_NO','1',''),
('00302021','行内转账（同业存放部分提前支取）','001','7','关联方账号户名','0','','RELA_PTY_ACCT_NM','1',''),
('00302021','行内转账（同业存放部分提前支取）','001','8','收款人账号','0','','recvrAcctNo','1',''),
('00302021','行内转账（同业存放部分提前支取）','001','9','收款人户名','0','','recvrAcctnm','1',''),
('00302022','行内转账（借记卡子账户转账部支）','001','1','交易名','0','','tranName','1',''),
('00302022','行内转账（借记卡子账户转账部支）','001','2','付款人账号','0','','accNum','1',''),
('00302022','行内转账（借记卡子账户转账部支）','001','3','付款人户名','0','','acctNm','1',''),
('00302022','行内转账（借记卡子账户转账部支）','001','4','币种','0','','currencyC','1',''),
('00302022','行内转账（借记卡子账户转账部支）','001','5','钞汇标志','0','','monRemFlagC','1',''),
('00302022','行内转账（借记卡子账户转账部支）','001','6','部支金额','0','','partAmt','1',''),
('00302022','行内转账（借记卡子账户转账部支）','001','7','利息','0','','repayInt','1',''),
('00302022','行内转账（借记卡子账户转账部支）','001','8','收款人账号','0','','recvrAcctNo','1',''),
('00302022','行内转账（借记卡子账户转账部支）','001','9','收款人户名','0','','recvrAcctnm','1',''),
('00303005','农信银存款','001','1','交易名','0','','tranName','1',''),
('00303005','农信银存款','001','2','账号','0','','CUST_ACCT_NO','1',''),
('00303005','农信银存款','001','3','户名','0','','ACCTNM','1',''),
('00303005','农信银存款','001','4','交易金额','0','','tran_amt','1',''),
('00303005','农信银存款','001','5','收款行行号（行号+行名）','0','','sendBankno_nm','1',''),
('00303005','农信银存款','002','1','交易名','0','','tranName','1',''),
('00303005','农信银存款','002','2','付款人账号','0','','Payr_Acct_Num','1',''),
('00303005','农信银存款','002','3','付款人户名','0','','Payr_Nm','1',''),
('00303005','农信银存款','002','4','交易金额','0','','tran_amt','1',''),
('00303005','农信银存款','002','5','收款人账号','0','','Recvr_Acct_Num','1',''),
('00303005','农信银存款','002','6','收款人户名','0','','Recvr_Nm','1',''),
('00303005','农信银存款','002','7','收款行行号（行号+行名）','0','','sendBankno_nm','1',''),
('00302017','跨行汇兑','001','1','交易名','0','','tranName','1',''),
('00302017','跨行汇兑','001','2','付款人账号','0','','draweeAccNo','1',''),
('00302017','跨行汇兑','001','3','付款人户名','0','','draweeName','1',''),
('00302017','跨行汇兑','001','4','汇款金额','0','','remitAmount','1',''),
('00302017','跨行汇兑','001','5','收款人账号','0','','recriverNum','1',''),
('00302017','跨行汇兑','001','6','收款人户名','0','','recriverName','1',''),
('00302017','跨行汇兑','001','7','收款行行号','0','','beneficiaryNumber1','1',''),
('00302017','跨行汇兑','002','1','交易名','0','','tranName','1',''),
('00302017','跨行汇兑','002','2','付款人账号','0','','draweeAccNo','1',''),
('00302017','跨行汇兑','002','3','付款人户名','0','','draweeName','1',''),
('00302017','跨行汇兑','002','4','汇款金额','0','','remitAmount','1','');