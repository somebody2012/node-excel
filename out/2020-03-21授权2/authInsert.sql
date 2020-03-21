
-- IB_OM_RULE_INFO insert
INSERT INTO IB_OM_RULE_INFO (RULE_NO,RULE_TYP_CD,HOLI_FLG,RULE_TRI_POSITION,SUIT_CHNL_SCP,SUIT_LPR_SCP,SUIT_ORG_SCP,SUIT_TX_SCP,RULE_COMNT,EFFT_FLG,OPER_TELR_NO,OPER_DT,OPER_RSN) VALUES

('005000','AU','N','1','TE','0000','*,','00101001_1','金额超限','1','900001','2020-03-21','批量新增'),
('005001','AU','N','1','TE','0000','*,','00101001_1','联网核查手工通过','1','900001','2020-03-21','批量新增'),
('005002','AU','N','1','TE','0000','*,','00101001_1','人脸识别手工通过','1','900001','2020-03-21','批量新增'),
('005003','AU','N','1','TE','0000','*,','00201014','交易授权','1','900001','2020-03-21','批量新增'),
('005004','AU','N','1','TE','0000','*,','00201014','联网核查手工通过','1','900001','2020-03-21','批量新增'),
('005005','AU','N','1','TE','0000','*,','00201014','人脸识别手工通过','1','900001','2020-03-21','批量新增'),
('005006','AU','N','1','TE','0000','*,','00201014','交易授权','1','900001','2020-03-21','批量新增');
-- IB_OM_RULECOND_INFO insert
INSERT INTO IB_OM_RULECOND_INFO (OPRTN_COND_NO,DICTRY_NM,OPER_SYM_1,CMPR_VAL,OPER_SYM_2,VALUE2,TRAN_CD,COND_DESCR,OPER_TELR_NO,OPER_DT,OPER_RSN,CMPR_VAL_DATA_DICTRY_FLG,PUB_DICTRY_FLG,DICTRY_DESCR) VALUES

('AU05001','chkRslt','==','2','','','00101001_1','联网核查手工通过','900001','2020-03-21','批量新增','1','0','联网核查手工通过'),
('AU05002','faceChkRslt','==','2','','','00101001_1','人脸识别手工通过','900001','2020-03-21','批量新增','1','0','人脸识别手工通过'),
('AU05004','chkRslt','==','2','','','00201014','联网核查手工通过','900001','2020-03-21','批量新增','1','0','联网核查手工通过'),
('AU05005','faceChkRslt','==','2','','','00201014','人脸识别手工通过','900001','2020-03-21','批量新增','1','0','人脸识别手工通过'),
('AU05006','faceChkRslt','==','1','','','00201014','交易授权','900001','2020-03-21','批量新增','1','0','');
-- IB_OM_AUTHMODE_INFO insert
INSERT INTO IB_OM_AUTHMODE_INFO (MODE_NO,AUTH_TYP_CD,AUTH_LVL_CD,REMOTE_AUTH_LVL_CD,AUTH_ORG_TYP_CD,AUTH_ORG_NO,AUTH_PSTN_NO,UGNT_FLG,AUTH_DESCR,HOST_AUTH_FLG,HOST_AUTH_TYP_CD,CNTRTN_AUTH_CENT_NM,CNTRTN_AUTH_LVL_CD,REMRK_1,APP_NO) VALUES

('AU05001','1','1','','','','*','','联网核查手工通过','','','','','',''),
('AU05002','1','1','','','','*','','人脸识别手工通过','','','','','',''),
('AU05003','2','4','','','','*','','交易授权','','','','','李有统计',''),
('AU05004','1','1','','','','*','','联网核查手工通过','','','','','李有统计',''),
('AU05005','1','1','','','','*','','人脸识别手工通过','','','','','李有统计',''),
('AU05006','2','4','','','','*','','交易授权','','','','','李有统计','');
-- IB_OM_RULECOND_RLT insert
INSERT INTO IB_OM_RULECOND_RLT (RULE_COND_NO,CMPL_MODE_FLG,OPRTN_RULE_NO) VALUES

('AU00000','1','005000'),
('AU00001','1','005000'),
('AU00002','1','005000'),
('AU00003','1','005000'),
('AU00004','1','005000'),
('AU00005','1','005000'),
('AU00006','1','005000'),
('AU00007','1','005000'),
('AU00008','1','005000'),
('AU00009','1','005000'),
('AU00010','1','005000'),
('AU00011','1','005000'),
('AU00012','1','005000'),
('AU00013','1','005000'),
('AU00014','1','005000'),
('AU00015','1','005000'),
('AU00016','1','005000'),
('AU00017','1','005000'),
('AU00018','1','005000'),
('AU00019','1','005000'),
('AU00020','1','005000'),
('AU00021','1','005000'),
('AU00022','1','005000'),
('AU00023','1','005000'),
('AU00024','1','005000'),
('AU00025','1','005000'),
('AU00026','1','005000'),
('AU00027','1','005000'),
('AU00028','1','005000'),
('AU00029','1','005000'),
('AU00030','1','005000'),
('AU00031','1','005000'),
('AU00032','1','005000'),
('AU00033','1','005000'),
('AU00034','1','005000'),
('AU00035','1','005000'),
('AU00036','1','005000'),
('AU00037','1','005000'),
('AU00038','1','005000'),
('AU00039','1','005000'),
('AU00040','1','005000'),
('AU00041','1','005000'),
('AU00042','1','005000'),
('AU00043','1','005000'),
('AU00044','1','005000'),
('AU00045','1','005000'),
('AU00046','1','005000'),
('AU00047','1','005000'),
('AU00048','1','005000'),
('AU00049','1','005000'),
('AU00050','1','005000'),
('AU00051','1','005000'),
('AU00052','1','005000'),
('AU00053','1','005000'),
('AU00054','1','005000'),
('AU00055','1','005000'),
('AU00056','1','005000'),
('AU00057','1','005000'),
('AU00058','1','005000'),
('AU00059','1','005000'),
('AU00060','1','005000'),
('AU00061','1','005000'),
('AU00062','1','005000'),
('AU00063','1','005000'),
('AU00064','1','005000'),
('AU00065','1','005000'),
('AU00066','1','005000'),
('AU00067','1','005000'),
('AU00068','1','005000'),
('AU00069','1','005000'),
('AU00070','1','005000'),
('AU00071','1','005000'),
('AU00072','1','005000'),
('AU00073','1','005000'),
('AU00074','1','005000'),
('AU00075','1','005000'),
('AU00076','1','005000'),
('AU00077','1','005000'),
('AU00078','1','005000'),
('AU00079','1','005000'),
('AU00080','1','005000'),
('AU00081','1','005000'),
('AU00082','1','005000'),
('AU00083','1','005000'),
('AU00084','1','005000'),
('AU00085','1','005000'),
('AU00086','1','005000'),
('AU00087','1','005000'),
('AU00088','1','005000'),
('AU00089','1','005000'),
('AU00090','1','005000'),
('AU00091','1','005000'),
('AU00092','1','005000'),
('AU00093','1','005000'),
('AU00094','1','005000'),
('AU00095','1','005000'),
('AU00096','1','005000'),
('AU00097','1','005000'),
('AU00098','1','005000'),
('AU00099','1','005000'),
('AU00100','1','005000'),
('AU00101','1','005000'),
('AU00102','1','005000'),
('AU00103','1','005000'),
('AU00104','1','005000'),
('AU00105','1','005000'),
('AU00106','1','005000'),
('AU00107','1','005000'),
('AU00108','1','005000'),
('AU00109','1','005000'),
('AU00110','1','005000'),
('AU00111','1','005000'),
('AU00112','1','005000'),
('AU00113','1','005000'),
('AU00114','1','005000'),
('AU00115','1','005000'),
('AU00116','1','005000'),
('AU00117','1','005000'),
('AU00118','1','005000'),
('AU00119','1','005000'),
('AU00120','1','005000'),
('AU00121','1','005000'),
('AU00122','1','005000'),
('AU00123','1','005000'),
('AU00124','1','005000'),
('AU00125','1','005000'),
('AU00126','1','005000'),
('AU00127','1','005000'),
('AU00128','1','005000'),
('AU00129','1','005000'),
('AU00130','1','005000'),
('AU00131','1','005000'),
('AU00132','1','005000'),
('AU00133','1','005000'),
('AU00134','1','005000'),
('AU00135','1','005000'),
('AU00136','1','005000'),
('AU00137','1','005000'),
('AU00138','1','005000'),
('AU00139','1','005000'),
('AU00140','1','005000'),
('AU00141','1','005000'),
('AU00142','1','005000'),
('AU00143','1','005000'),
('AU00144','1','005000'),
('AU00145','1','005000'),
('AU05001','1','005001'),
('AU05002','1','005002'),
('AU05003','0','005003'),
('AU05004','1','005004'),
('AU05005','1','005005'),
('AU05006','1','005006');
-- TE_PARA_TRANKEYWORDS_INFO insert
INSERT INTO TE_PARA_TRANKEYWORDS_INFO (TRAN_CD,PUB_DICTRY_NM,PRIV_DICTRY_NM,PULDW_MAPG_DICTRY_NM) VALUES

('00101001_1','TX_AMT','openAcctAmt','金额'),
('00101001_1','CASH_TRAN_FLG','FundSourceCdFlg','现转标志'),
('00101001_1','CUR_CD','curCd','币种');
-- IB_PARA_KEYWORDS_INFO insert
INSERT INTO IB_PARA_KEYWORDS_INFO (DICTRY_NM,DICTRY_DESCR,DICTRY_TYP_CD,FIELD_CMPR,DATA_ATTR_DESCR) VALUES

('TX_AMT','金额','','','金额'),
('CASH_TRAN_FLG','现转标志','','','现转标志'),
('CUR_CD','币种','','','币种');