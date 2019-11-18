
-- IB_OM_RULE_INFO insert
INSERT INTO IB_OM_RULE_INFO (RULE_NO,RULE_TYP_CD,HOLI_FLG,RULE_TRI_POSITION,SUIT_CHNL_SCP,SUIT_LPR_SCP,SUIT_ORG_SCP,SUIT_TX_SCP,RULE_COMNT,EFFT_FLG,OPER_TELR_NO,OPER_DT,OPER_RSN) VALUES

('070000','CK','N','1','TE','0000','*,','00302016','需要复核','1','','2019-11-16','批量新增'),
('070001','CK','N','1','TE','0000','*,','00302017','需要复核','1','','2019-11-16','批量新增'),
('070002','CK','N','1','TE','0000','*,','00306004','需要复核','1','','2019-11-16','批量新增'),
('070003','CK','N','1','TE','0000','*,','00306006','需要复核','1','','2019-11-16','批量新增'),
('070004','CK','N','1','TE','0000','*,','00306001','需要复核','1','','2019-11-16','批量新增');
-- IB_OM_RULECOND_INFO insert
INSERT INTO IB_OM_RULECOND_INFO (OPRTN_COND_NO,DICTRY_NM,OPER_SYM_1,CMPR_VAL,OPER_SYM_2,VALUE2,TRAN_CD,COND_DESCR,OPER_TELR_NO,OPER_DT,OPER_RSN,CMPR_VAL_DATA_DICTRY_FLG,PUB_DICTRY_FLG,DICTRY_DESCR) VALUES

('CK70000','isCheck','==','1','','','00302016','需要复核','','2019-11-16','批量新增','1','0',''),
('CK70001','isCheck','==','1','','','00302017','需要复核','','2019-11-16','批量新增','1','0',''),
('CK70002','isCheck','==','1','','','00306004','需要复核','','2019-11-16','批量新增','1','0',''),
('CK70003','isCheck','==','1','','','00306006','需要复核','','2019-11-16','批量新增','1','0',''),
('CK70004','isCheck','==','1','','','00306001','需要复核','','2019-11-16','批量新增','1','0','');
-- IB_OM_CHECKMODE_INFO insert
INSERT INTO IB_OM_CHECKMODE_INFO (RCHK_MODE_ID,RCHK_PSTN_NO,RCHK_LVL_CD,PMIT_PRACT_TELR_RCHK_FLG,RCHK_RSN_CD,REMRK,REMRK_1,APP_NO) VALUES

('CK70000','1','1','2','需要复核','需要复核','需要复核','TE'),
('CK70001','1','1','2','需要复核','需要复核','需要复核','TE'),
('CK70002','1','1','2','需要复核','需要复核','需要复核','TE'),
('CK70003','1','1','2','需要复核','需要复核','需要复核','TE'),
('CK70004','1','1','2','需要复核','需要复核','需要复核','TE');
-- IB_OM_RULECOND_RLT insert
INSERT INTO IB_OM_RULECOND_RLT (RULE_COND_NO,CMPL_MODE_FLG,OPRTN_RULE_NO) VALUES

('CK70000','1','070000'),
('CK70001','1','070001'),
('CK70002','1','070002'),
('CK70003','1','070003'),
('CK70004','1','070004');
-- IB_OM_CHECKFIELD_RLT insert
INSERT INTO IB_OM_CHECKFIELD_RLT (TRAN_CD,LPR_NO,RCHK_FIELD_NM,RCHK_FIELD_INFO,STUS_CD) VALUES

('00302017','0000','recriverNum,custom-input_5','收款人账号','1'),
('00302017','0000','remitAmount,custom-txAmt','金额','1'),
('00302016','0000','Recvr_Acct_Num,custom-input_acc','收款人账号','1'),
('00302016','0000','TX_Amt,custom-input_txAm','汇款金额','1');
-- TE_PARA_TRANKEYWORDS_INFO insert
INSERT INTO TE_PARA_TRANKEYWORDS_INFO (TRAN_CD,PUB_DICTRY_NM,PRIV_DICTRY_NM,PULDW_MAPG_DICTRY_NM) VALUES

('00302017','PAYMT_REMITWY_CD','payRemitWay','支付汇路'),
('00302017','CNTPTY_RW_BNKNO','beneficiaryNumber','对方行行号'),
('00302017','CNTPTY_CARD_NO_OR_ACCT_NO','recriverNum','对手账号'),
('00302017','CNTPTY_ACCT_NM','recriverName','对手户名'),
('00302016','PAYMT_REMITWY_CD','Pay_Path_Cd','支付汇路'),
('00302016','CNTPTY_RW_BNKNO','Recvr_Open_Acct_Bank_Bank_Id','对方行行号'),
('00302016','CNTPTY_CARD_NO_OR_ACCT_NO','Recvr_Acct_Num','对手账号'),
('00302016','CNTPTY_ACCT_NM','Recvr_Nm','对手户名');
-- IB_PARA_KEYWORDS_INFO insert
INSERT INTO IB_PARA_KEYWORDS_INFO (DICTRY_NM,DICTRY_DESCR,DICTRY_TYP_CD,FIELD_CMPR,DATA_ATTR_DESCR) VALUES

('PAYMT_REMITWY_CD','支付汇路','','','支付汇路'),
('CNTPTY_RW_BNKNO','对方行行号','','','对方行行号'),
('CNTPTY_CARD_NO_OR_ACCT_NO','对手账号','','','对手账号'),
('CNTPTY_ACCT_NM','对手户名','','','对手户名');