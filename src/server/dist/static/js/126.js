webpackJsonp([126],{FDOp:function(e,a,t){var r=t("or9R");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);t("8bSs")("07e81e3b",r,!0)},IlSz:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=t("lC5x"),o=t.n(r),n=t("J0Oq"),l=t.n(n),i=t("syAl"),u=t("tzsN"),s=t("0oES"),c=t("AA3o"),m=t.n(c),p=function e(){m()(this,e),this.data={branchLevel:"",branchId:"",orderFlag:"",startTime:"",endTime:"",devType:"",total:""},this.TransServiceCode="AT_ATM_OPEN_SORT"},d=t("A8CQ"),b=t("pADA"),f=t("0VOF"),y=t("n6OB"),v={name:"boot-rate-form-manage",components:{selectTree:u.a},data:function(){return{loading:!1,brno:[],deviceTypeSpinner:[],tableData:[],tableTotal:0,currentPage:1,pageSize:i.a.get("PageSize"),queryForm:{rangeLevel:["2"],branchId:"34060000",sTime:"",eTime:"",rankType:["1"],devType:"atm",total:"10",totalFlag:["1"]}}},created:function(){this.initList()},mounted:function(){this.queryForm.sTime=b.a.getNowTime(90),this.queryForm.eTime=b.a.getNowTime(0)},methods:{initList:function(){var e=this;this.getBranchList();var a=new y.a;Object(s.a)(a).then(function(a){e.deviceTypeSpinner=a.RspInfo.Result||[],e.deviceTypeSpinner.unshift({DataKeyVal:"",Meaning:""})}).catch(function(e){console.error("查询错误",e)})},getBranchList:function(){var e=this;this.loading=!0;var a=new f.a;a.data.branchLevel=this.queryForm.rangeLevel.join(""),Object(s.a)(a).then(function(a){e.loading=!1,e.brno=a.RspInfo&&a.RspInfo.resultSet||[],e.queryForm.branchId=e.brno[1].branchNum}).catch(function(a){e.loading=!1,console.error("查询错误",a)})},clearForm:function(e){this.$refs[""+e].resetFields()},queryModel:function(){var e=this;return l()(o.a.mark(function a(){var t,r;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.loading=!0,(t=new p).data.publicType=e.queryForm.rangeLevel.join(""),t.data.branchId=[e.queryForm.branchId],t.data.startTime=e.queryForm.sTime,t.data.endTime=e.queryForm.eTime,t.data.orderFlag=e.queryForm.rankType.join(""),t.data.devType=e.queryForm.devType,t.data.total=e.queryForm.total,t.data.totalFlag=e.queryForm.totalFlag.join(""),a.next=12,Object(s.a)(t);case 12:r=a.sent,e.loading=!1,console.log(r.RspInfo),"000000"==r.SYS_HEAD.ReturnCode?e.tableData=r.RspInfo.resultSet:e.$aui.message.show({type:"warning",message:"请求失败，错误码:"+r.SYS_HEAD.ReturnCode+"，错误信息："+r.SYS_HEAD.ReturnMessage});case 16:case"end":return a.stop()}},a,e)}))()},getExcel:function(){var e=this;return l()(o.a.mark(function a(){var t,r;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.loading=!0,(t=new d.a).data.branchNo=e.queryForm.branchId.join(","),t.data.startTime=e.queryForm.sTime,t.data.endTime=e.queryForm.eTime,a.next=7,Object(s.a)(t);case 7:r=a.sent,e.loading=!1,"000000"==r.SYS_HEAD.ReturnCode?e.downloadFile(r.RspInfo.fileName):e.$aui.message.show({type:"warning",message:"请求失败，错误码:"+r.SYS_HEAD.ReturnCode+"，错误信息："+r.SYS_HEAD.ReturnMessage});case 10:case"end":return a.stop()}},a,e)}))()},handleSizeChange:function(){this.queryModel()},handleCurrentChange:function(){this.queryModel()}},watch:{"queryForm.rangeLevel":function(){this.getBranchList()}}},g={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"boot-rate-rank-form-manage",attrs:{"element-loading-text":"加载中。。。"}},[t("div",[t("aui-card",{staticClass:"type-info-box-card"},[t("aui-form",{ref:"queryForm",attrs:{model:e.queryForm,size:"mini","label-position":"top"}},[t("aui-row",{attrs:{gutter:10}},[t("aui-col",{attrs:{md:6,lg:4}},[t("aui-form-item",{staticClass:"typeInfo-aui-form-item",attrs:{label:"机构层级",prop:"rangeLevel"}},[t("aui-cascader",{attrs:{name:"",options:[{value:"2",label:"分行"},{value:"3",label:"支行"},{value:"4",label:"网点"}]},model:{value:e.queryForm.rangeLevel,callback:function(a){e.$set(e.queryForm,"rangeLevel",a)},expression:"queryForm.rangeLevel"}})],1)],1),e._v(" "),t("aui-col",{attrs:{lg:4,md:6}},[t("aui-form-item",{attrs:{label:"机构编号 必输 根据层级",prop:"branchId"}},[t("aui-select",{attrs:{filterable:"",placeholder:"请选择所属机构号"},model:{value:e.queryForm.branchId,callback:function(a){e.$set(e.queryForm,"branchId",a)},expression:"queryForm.branchId"}},e._l(e.brno,function(e){return t("aui-option",{key:e.branchNum,attrs:{label:e.branchNum+"-"+e.branchName,value:e.branchNum}})}))],1)],1),e._v(" "),t("aui-col",{attrs:{md:6,lg:4}},[t("aui-form-item",{staticClass:"typeInfo-aui-form-item",attrs:{label:"排序方式",prop:"rankType"}},[t("aui-cascader",{attrs:{name:"",options:[{value:"1",label:"开机率"},{value:"2",label:"离线停机率"},{value:"3",label:"维护停机率"},{value:"4",label:"故障停机率"},{value:"5",label:"暂停停机率"}]},model:{value:e.queryForm.rankType,callback:function(a){e.$set(e.queryForm,"rankType",a)},expression:"queryForm.rankType"}})],1)],1),e._v(" "),t("aui-col",{attrs:{lg:4,md:6}},[t("aui-form-item",{staticClass:"typeInfo-aui-form-item",attrs:{label:"设备类型",prop:"devType"}},[t("aui-select",{attrs:{placeholder:"请选择设备类型"},model:{value:e.queryForm.devType,callback:function(a){e.$set(e.queryForm,"devType",a)},expression:"queryForm.devType"}},e._l(e.deviceTypeSpinner,function(e){return t("aui-option",{key:e.DataKeyVal,attrs:{label:e.DataKeyVal+"-"+e.Meaning,value:e.DataKeyVal,disabled:e.disabled}})}))],1)],1),e._v(" "),t("aui-col",{attrs:{md:6,lg:4}},[t("aui-form-item",{staticClass:"typeInfo-aui-form-item",attrs:{label:"显示方式",prop:"totalFlag"}},[t("aui-cascader",{attrs:{name:"",options:[{value:"1",label:"前10条"},{value:"2",label:"后10条"}]},model:{value:e.queryForm.totalFlag,callback:function(a){e.$set(e.queryForm,"totalFlag",a)},expression:"queryForm.totalFlag"}})],1)],1),e._v(" "),t("aui-col",{attrs:{md:6,lg:4}},[t("aui-form-item",{staticClass:"typeInfo-aui-form-item",attrs:{label:"显示条数",prop:"total"}},[t("aui-input",{model:{value:e.queryForm.total,callback:function(a){e.$set(e.queryForm,"total",a)},expression:"queryForm.total"}})],1)],1),e._v(" "),t("aui-col",{attrs:{md:6,lg:4}},[t("aui-form-item",{staticClass:"typeInfo-aui-form-item",attrs:{label:"开始日期",prop:"sTime"}},[t("aui-date-picker",{attrs:{"value-format":"yyyyMMdd",type:"date",placeholder:"选择日期"},model:{value:e.queryForm.sTime,callback:function(a){e.$set(e.queryForm,"sTime",a)},expression:"queryForm.sTime"}})],1)],1),e._v(" "),t("aui-col",{attrs:{md:6,lg:4}},[t("aui-form-item",{staticClass:"typeInfo-aui-form-item",attrs:{label:"结束日期",prop:"eTime"}},[t("aui-date-picker",{attrs:{"value-format":"yyyyMMdd",type:"date",placeholder:"选择日期"},model:{value:e.queryForm.eTime,callback:function(a){e.$set(e.queryForm,"eTime",a)},expression:"queryForm.eTime"}})],1)],1),e._v(" "),t("aui-col",{staticClass:"searchBtnMarginTop",attrs:{md:3,lg:2}},[t("aui-button",{attrs:{type:"primary",size:"mini",icon:"aui-icon-search"},on:{click:e.queryModel}},[e._v("查询")])],1),e._v(" "),t("aui-col",{staticClass:"searchBtnMarginTop",attrs:{md:3,lg:2}},[t("aui-button",{attrs:{type:"warning",size:"mini",icon:"aui-icon-refresh"},on:{click:function(a){e.clearForm("queryForm")}}},[e._v("重置")])],1)],1)],1)],1),e._v(" "),t("aui-card",{staticClass:"type-info-bottom"},[t("aui-table",{ref:"tableData",staticClass:"tableMarginTop",attrs:{data:e.tableData,"header-row-class-name":"tableHeaderClass",border:""}},[t("aui-table-column",{attrs:{prop:"序号",label:"名次"}}),e._v(" "),t("aui-table-column",{attrs:{prop:"分行名称",label:"分行名称"}}),e._v(" "),t("aui-table-column",{attrs:{prop:"支行名称",label:"支行名称"}}),e._v(" "),e.tableData[0]&&e.tableData[0].设备编号?t("aui-table-column",{attrs:{prop:"设备编号",label:"设备编号"}}):e._e(),e._v(" "),t("aui-table-column",{attrs:{prop:"自助银行名称",label:"网点名称"}}),e._v(" "),t("aui-table-column",{attrs:{prop:"终端编号",label:"终端编号"}}),e._v(" "),t("aui-table-column",{attrs:{prop:"设备类型",label:"设备类型"}}),e._v(" "),t("aui-table-column",{attrs:{prop:"安装地址",label:"安装地址"}}),e._v(" "),t("aui-table-column",{attrs:{prop:"维护停机",label:"维护停机（分钟）",formatter:function(e,a){return Number(e[a.property]).toFixed(2)}}}),e._v(" "),t("aui-table-column",{attrs:{prop:"故障停机",label:"故障停机（分钟）",formatter:function(e,a){return Number(e[a.property]).toFixed(2)}}}),e._v(" "),t("aui-table-column",{attrs:{prop:"通讯停机",label:"通讯停机（分钟）",formatter:function(e,a){return Number(e[a.property]).toFixed(2)}}}),e._v(" "),t("aui-table-column",{attrs:{prop:"暂停停机",label:"暂停停机（分钟）",formatter:function(e,a){return Number(e[a.property]).toFixed(2)}}}),e._v(" "),t("aui-table-column",{attrs:{prop:"合计",label:"合计（分钟）",formatter:function(e,a){return Number(e[a.property]).toFixed(2)}}}),e._v(" "),t("aui-table-column",{attrs:{prop:"正常服务时间",label:"正常服务时间"}}),e._v(" "),t("aui-table-column",{attrs:{prop:"开机率",label:"开机率",formatter:function(e,a){return Number(e.开机率).toFixed(2)+"%"}}}),e._v(" "),t("aui-table-column",{attrs:{prop:"通讯停机率",label:"离线停机率",formatter:function(e,a){return Number(e.通讯停机率).toFixed(2)+"%"}}}),e._v(" "),t("aui-table-column",{attrs:{prop:"维护停机率",label:"维护停机率",formatter:function(e,a){return Number(e.维护停机率).toFixed(2)+"%"}}}),e._v(" "),t("aui-table-column",{attrs:{prop:"故障停机率",label:"故障停机率",formatter:function(e,a){return Number(e.故障停机率).toFixed(2)+"%"}}}),e._v(" "),t("aui-table-column",{attrs:{prop:"暂停停机率",label:"暂停停机率",formatter:function(e,a){return Number(e.暂停停机率).toFixed(2)+"%"}}})],1)],1)],1)])},staticRenderFns:[]};var F=t("/Xao")(v,g,!1,function(e){t("FDOp")},null,null);a.default=F.exports},or9R:function(e,a,t){(e.exports=t("BkJT")(!1)).push([e.i,"\n.type-info-bottom {\n  margin-top: 10px;\n}\n.box {\n  margin-top: 20px;\n  text-align: right;\n}\n.headerClass {\n  background: #f7f7f7 !important;\n}\n.aui-date-editor.aui-input {\n  width: 100% !important;\n}\n.aui-card {\n  overflow: inherit;\n}\n",""])}});