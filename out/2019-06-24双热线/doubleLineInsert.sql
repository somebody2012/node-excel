
SET AUTOCOMMIT=0;
BEGIN;

  
-- IB_OM_RULE_INFO insert
INSERT INTO IB_OM_RULE_INFO (RULE_NO,RULE_TYP_CD,HOLI_FLG,RULE_TRI_POSITION,SUIT_CHNL_SCP,SUIT_LPR_SCP,SUIT_ORG_SCP,SUIT_TX_SCP,RULE_COMNT,EFFT_FLG,OPER_TELR_NO,OPER_DT,OPER_RSN) VALUES

("050000","DH","N","1","TE","001","*,","00201007","无规则说明","1","900001","2019-06-24","批量新增"),
("050001","DH","N","1","TE","001","*,","00401020","无规则说明","1","900001","2019-06-24","批量新增"),
("050002","DH","N","1","TE","001","*,","00302011","客户类型","1","900001","2019-06-24","批量新增"),
("050003","DH","N","1","TE","001","*,","00201014","公私标志","1","900001","2019-06-24","批量新增"),
("050004","DH","N","1","TE","001","*,","00201015","操作标志","1","900001","2019-06-24","批量新增"),
("050005","DH","N","1","TE","001","*,","00201015","操作标志","1","900001","2019-06-24","批量新增"),
("050006","DH","N","1","TE","001","*,","00301005","客户类型","1","900001","2019-06-24","批量新增"),
("050007","DH","N","1","TE","001","*,","00201022","无规则说明","1","900001","2019-06-24","批量新增");
-- IB_OM_RULECOND_INFO insert
INSERT INTO IB_OM_RULECOND_INFO (OPRTN_COND_NO,DICTRY_NM,OPER_SYM_1,CMPR_VAL,OPER_SYM_2,VALUE2,TRAN_CD,COND_DESCR,OPER_TELR_NO,OPER_DT,OPER_RSN,CMPR_VAL_DATA_DICTRY_FLG,PUB_DICTRY_FLG,DICTRY_DESCR) VALUES

("DH50002","custTypeCd","!=","0","","","00302011","转出方账户是对公且交易金额大于等于50万","900001","2019-06-24","批量新增","1","0","0"),
("DH50002","txAmt",">=","500000","","","00302011","转出方账户是对公且交易金额大于等于50万","900001","2019-06-24","批量新增","1","0","500000"),
("DH50003","pubPrivFlgCd","==","1","","","00201014","补开账户对公","900001","2019-06-24","批量新增","1","0","1"),
("DH50004","pageOperFlgCd","==","0","","","00201015","账户对公且设置或重置密码","900001","2019-06-24","批量新增","1","0","0"),
("DH50004","customerType","!=","0","","","00201015","账户对公且设置或重置密码","900001","2019-06-24","批量新增","1","0","0"),
("DH50005","pageOperFlgCd","==","1","","","00201015","账户对公且设置或重置密码","900001","2019-06-24","批量新增","1","0","1"),
("DH50005","customerType","!=","0","","","00201015","账户对公且设置或重置密码","900001","2019-06-24","批量新增","1","0","0"),
("DH50006","custType","!=","0","","","00301005","转出方账户是对公且交易金额大于等于50万","900001","2019-06-24","批量新增","1","0","0"),
("DH50006","txAmt",">=","500000","","","00301005","转出方账户是对公且交易金额大于等于50万","900001","2019-06-24","批量新增","1","0","500000"),
("DH50007","CUST_TYP_CD","!=","0","","","00201022","账号客户类型为对公","900001","2019-06-24","批量新增","1","0","0");
-- IB_OM_RULECOND_RLT insert
INSERT INTO IB_OM_RULECOND_RLT (RULE_COND_NO,CMPL_MODE_FLG,OPRTN_RULE_NO) VALUES

("DH50000","0","050000"),
("DH50001","0","050001"),
("DH50002","1","050002"),
("DH50003","1","050003"),
("DH50004","1","050004"),
("DH50005","1","050005"),
("DH50006","1","050006"),
("DH50007","1","050007");
-- IB_OM_MODE_INFO insert
INSERT INTO IB_OM_MODE_INFO (RULE_MODE_NO,FIELD_SEQ_NO,FIELD_NM,FIELD_DICTRY_NM,RULE_MODE_TYP_CD) VALUES

("DH50000","1","doubleLineField","doubleLineValue","DH"),
("DH50001","2","doubleLineField","doubleLineValue","DH"),
("DH50002","3","doubleLineField","doubleLineValue","DH"),
("DH50002","4","doubleLineField","doubleLineValue","DH"),
("DH50003","5","doubleLineField","doubleLineValue","DH"),
("DH50004","6","doubleLineField","doubleLineValue","DH"),
("DH50004","7","doubleLineField","doubleLineValue","DH"),
("DH50005","8","doubleLineField","doubleLineValue","DH"),
("DH50005","9","doubleLineField","doubleLineValue","DH"),
("DH50006","10","doubleLineField","doubleLineValue","DH"),
("DH50006","11","doubleLineField","doubleLineValue","DH"),
("DH50007","12","doubleLineField","doubleLineValue","DH");
  
COMMIT;