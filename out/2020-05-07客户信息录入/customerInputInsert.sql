
-- IB_OM_RULE_INFO insert
INSERT INTO IB_OM_RULE_INFO (RULE_NO,RULE_TYP_CD,HOLI_FLG,RULE_TRI_POSITION,SUIT_CHNL_SCP,SUIT_LPR_SCP,SUIT_ORG_SCP,SUIT_TX_SCP,RULE_COMNT,EFFT_FLG,OPER_TELR_NO,OPER_DT,OPER_RSN) VALUES

('095000','CI','N','1','TE','0000','*,','00508012','批量导入','1','900001','2020-05-07','批量新增'),
('095001','CI','N','1','TE','0000','*,','00508012','批量导入','1','900001','2020-05-07','批量新增'),
('095002','CI','N','1','TE','0000','*,','00101013','批量导入','1','900001','2020-05-07','批量新增'),
('095003','CI','N','1','TE','0000','*,','00201091','批量导入','1','900001','2020-05-07','批量新增'),
('095004','CI','N','1','TE','0000','*,','00201091','批量导入','1','900001','2020-05-07','批量新增'),
('095005','CI','N','1','TE','0000','*,','00604001','批量导入','1','900001','2020-05-07','批量新增'),
('095006','CI','N','1','TE','0000','*,','00604002','批量导入','1','900001','2020-05-07','批量新增'),
('095007','CI','N','1','TE','0000','*,','00604004','批量导入','1','900001','2020-05-07','批量新增'),
('095008','CI','N','1','TE','0000','*,','00604005','批量导入','1','900001','2020-05-07','批量新增'),
('095009','CI','N','1','TE','0000','*,','00604006','批量导入','1','900001','2020-05-07','批量新增'),
('095010','CI','N','1','TE','0000','*,','00604007','批量导入','1','900001','2020-05-07','批量新增'),
('095011','CI','N','1','TE','0000','*,','00604015','批量导入','1','900001','2020-05-07','批量新增'),
('095012','CI','N','1','TE','0000','*,','00604016','批量导入','1','900001','2020-05-07','批量新增'),
('095013','CI','N','1','TE','0000','*,','00201062','批量导入','1','900001','2020-05-07','批量新增'),
('095014','CI','N','1','TE','0000','*,','00201096','批量导入','1','900001','2020-05-07','批量新增'),
('095015','CI','N','1','TE','0000','*,','00201098','批量导入','1','900001','2020-05-07','批量新增'),
('095016','CI','N','1','TE','0000','*,','00101012','批量导入','1','900001','2020-05-07','批量新增'),
('095017','CI','N','1','TE','0000','*,','00101076','批量导入','1','900001','2020-05-07','批量新增'),
('095018','CI','N','1','TE','0000','*,','00101011','批量导入','1','900001','2020-05-07','批量新增');
-- IB_OM_RULECOND_INFO insert
INSERT INTO IB_OM_RULECOND_INFO (OPRTN_COND_NO,DICTRY_NM,OPER_SYM_1,CMPR_VAL,OPER_SYM_2,VALUE2,TRAN_CD,COND_DESCR,OPER_TELR_NO,OPER_DT,OPER_RSN,CMPR_VAL_DATA_DICTRY_FLG,PUB_DICTRY_FLG,DICTRY_DESCR) VALUES

('CI95000','DRAW_MANR','==','1','','','00508012','支取方式','900001','2020-05-07','批量新增','1','0','支取方式'),
('CI95001','MARGN','>=','50000','','','00508012','保证金','900001','2020-05-07','批量新增','1','0','保证金'),
('CI95003','CUST_TYP_CD','!=','0','','','00201091','客户类型','900001','2020-05-07','批量新增','1','0','客户类型'),
('CI95004','CUST_TYP_CD','==','0','','','00201091','客户类型','900001','2020-05-07','批量新增','1','0','客户类型'),
('CI95013','CRTF_TYP','==','0','','','00201062','证件类型','900001','2020-05-07','批量新增','1','0','证件类型'),
('CI95016','TradeData3.WHETHER_AGEN','==','1','','','00101012','是否代理','900001','2020-05-07','批量新增','1','0','是否代理');
-- IB_OM_RULECOND_RLT insert
INSERT INTO IB_OM_RULECOND_RLT (RULE_COND_NO,CMPL_MODE_FLG,OPRTN_RULE_NO) VALUES

('CI95000','1','095000'),
('CI95001','1','095001'),
('CI95002','0','095002'),
('CI95003','1','095003'),
('CI95004','1','095004'),
('CI95005','0','095005'),
('CI95006','0','095006'),
('CI95007','0','095007'),
('CI95008','0','095008'),
('CI95009','0','095009'),
('CI95010','0','095010'),
('CI95011','0','095011'),
('CI95012','0','095012'),
('CI95013','1','095013'),
('CI95014','0','095014'),
('CI95015','0','095015'),
('CI95016','1','095016'),
('CI95017','0','095017'),
('CI95018','0','095018');
-- IB_OM_MODE_INFO insert
INSERT INTO IB_OM_MODE_INFO (RULE_MODE_NO,FIELD_SEQ_NO,FIELD_NM,FIELD_DICTRY_NM,RULE_MODE_TYP_CD) VALUES

('CI95000','1','ref','ACCT_NO','CI'),
('CI95000','2','NI','1','CI'),
('CI95000','3','FR','0','CI'),
('CI95001','4','ref','ACCT_NO','CI'),
('CI95001','5','NI','1','CI'),
('CI95001','6','FR','0','CI'),
('CI95002','7','ref','WHETHER_AGEN','CI'),
('CI95002','8','NI','1','CI'),
('CI95002','9','FR','0','CI'),
('CI95003','10','ref','ACCT_NO','CI'),
('CI95003','11','NI','1','CI'),
('CI95003','12','FR','0','CI'),
('CI95004','13','ref','ACCT_NO','CI'),
('CI95004','14','NI','1','CI'),
('CI95004','15','FR','1','CI'),
('CI95005','16','ref','WHETHER_AGEN','CI'),
('CI95005','17','NI','1','CI'),
('CI95005','18','FR','0','CI'),
('CI95006','19','ref','WHETHER_AGEN','CI'),
('CI95006','20','NI','1','CI'),
('CI95006','21','FR','0','CI'),
('CI95007','22','ref','WHETHER_AGEN','CI'),
('CI95007','23','NI','1','CI'),
('CI95007','24','FR','0','CI'),
('CI95008','25','ref','WHETHER_AGEN','CI'),
('CI95008','26','NI','1','CI'),
('CI95008','27','FR','0','CI'),
('CI95009','28','ref','WHETHER_AGEN','CI'),
('CI95009','29','NI','1','CI'),
('CI95009','30','FR','0','CI'),
('CI95010','31','ref','WHETHER_AGEN','CI'),
('CI95010','32','NI','1','CI'),
('CI95010','33','FR','0','CI'),
('CI95011','34','ref','WHETHER_AGEN','CI'),
('CI95011','35','NI','1','CI'),
('CI95011','36','FR','0','CI'),
('CI95012','37','ref','WHETHER_AGEN','CI'),
('CI95012','38','NI','1','CI'),
('CI95012','39','FR','0','CI'),
('CI95013','40','ref','CRTF_TYP','CI'),
('CI95013','41','NI','1','CI'),
('CI95013','42','FR','0','CI'),
('CI95014','43','ref','CRTF_TYP','CI'),
('CI95014','44','NI','1','CI'),
('CI95014','45','FR','0','CI'),
('CI95015','46','ref','CRTF_TYP','CI'),
('CI95015','47','NI','1','CI'),
('CI95015','48','FR','0','CI'),
('CI95016','49','ref','WHETHER_AGEN','CI'),
('CI95016','50','NI','1','CI'),
('CI95016','51','FR','0','CI'),
('CI95017','52','ref','CARD_NO','CI'),
('CI95017','53','NI','1','CI'),
('CI95017','54','FR','1','CI'),
('CI95018','55','ref','WHETHER_AGEN','CI'),
('CI95018','56','NI','1','CI'),
('CI95018','57','FR','0','CI');