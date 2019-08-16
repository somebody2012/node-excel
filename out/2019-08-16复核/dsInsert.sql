
SET AUTOCOMMIT=0;
BEGIN;

  
-- IB_OM_RULE_INFO insert
INSERT INTO IB_OM_RULE_INFO (RULE_NO,RULE_TYP_CD,HOLI_FLG,RULE_TRI_POSITION,SUIT_CHNL_SCP,SUIT_LPR_SCP,SUIT_ORG_SCP,SUIT_TX_SCP,RULE_COMNT,EFFT_FLG,OPER_TELR_NO,OPER_DT,OPER_RSN) VALUES

('070000','CK','N','1','TE','9999','*,','00302016','需要复核','1','','2019-08-16','批量新增'),
('070001','CK','N','1','TE','9999','*,','00302017','需要复核','1','','2019-08-16','批量新增'),
('070002','CK','N','1','TE','9999','*,','00306004','需要复核','1','','2019-08-16','批量新增'),
('070003','CK','N','1','TE','9999','*,','00306006','需要复核','1','','2019-08-16','批量新增'),
('070004','CK','N','1','TE','9999','*,','00306001','需要复核','1','','2019-08-16','批量新增');
-- IB_OM_RULECOND_INFO insert
INSERT INTO IB_OM_RULECOND_INFO (OPRTN_COND_NO,DICTRY_NM,OPER_SYM_1,CMPR_VAL,OPER_SYM_2,VALUE2,TRAN_CD,COND_DESCR,OPER_TELR_NO,OPER_DT,OPER_RSN,CMPR_VAL_DATA_DICTRY_FLG,PUB_DICTRY_FLG,DICTRY_DESCR) VALUES

('CK70000','isCheck','==','1','','','00302016','需要复核','','2019-08-16','批量新增','1','0',''),
('CK70001','isCheck','==','1','','','00302017','需要复核','','2019-08-16','批量新增','1','0',''),
('CK70002','isCheck','==','1','','','00306004','需要复核','','2019-08-16','批量新增','1','0',''),
('CK70003','isCheck','==','1','','','00306006','需要复核','','2019-08-16','批量新增','1','0',''),
('CK70004','isCheck','==','1','','','00306001','需要复核','','2019-08-16','批量新增','1','0','');
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

('00302017','9999','recriverNum,custom-input_5','收款人账号','1'),
('00302017','9999','remitAmount,custom-txAmt','金额','1'),
('00302016','9999','Recvr_Acct_Num,custom-input_acc','收款人账号','1'),
('00302016','9999','TX_Amt,custom-input_txAm','汇款金额','1');
-- TE_PARA_TRANKEYWORDS_INFO insert
INSERT INTO TE_PARA_TRANKEYWORDS_INFO (TRAN_CD,PUB_DICTRY_NM,PRIV_DICTRY_NM,PULDW_MAPG_DICTRY_NM) VALUES

('00302017','recriverNumXX','recriverNum','收款人账号');
-- IB_PARA_KEYWORDS_INFO insert
INSERT INTO IB_PARA_KEYWORDS_INFO (DICTRY_NM,DICTRY_DESCR,DICTRY_TYP_CD,FIELD_CMPR,DATA_ATTR_DESCR) VALUES

('recriverNumXX','收款人账号','','','收款人账号');
  
COMMIT;