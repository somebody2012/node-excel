webpackJsonp([110],{"5Jmr":function(e,a,t){var n=t("aH3L");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);t("8bSs")("190a5d9c",n,!0)},Op18:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=t("tzsN"),r=t("pADA"),o=t("0oES"),i=t("syAl"),l=t("fCv1"),u=t("0VOF"),s=t("B+2e"),c=t("AA3o"),m=t.n(c),d=function e(){m()(this,e),this.data={BusiOper:"Q"},this.BusiDataKey="moduleInfoQuery",this.TransServiceCode="ib-dbcomm/dbComm"},p={components:{selectTree:n.a},data:function(){return{loading:!1,currentPage:1,pageSize:void 0,tableData3:[],tableTotal:0,formInline:{devNum:"",moduleType:"",branchNum:[]},brnoList:[],moduleTypeList:[],rules:{devNum:[{require:!1,validator:Object(l.h)(10),trigger:"blur"}]}}},watch:{formInline:{handler:function(e,a){this.currentPage=1},deep:!0}},created:function(){this.pageSize=i.a.get("PageSize"),this.NoticPrty(),this.initBrno()},methods:{initBrno:function(){var e=this;this.loading=!0;var a=new u.a;a.data.orgno=this.$store.getters.BranchNum,Object(o.a)(a).then(function(a){e.loading=!1,e.branchNum=a.RspInfo.Result||[],e.permission=r.a.objArray2Hash(e.branchNum,"orgno"),e.brnoMap=a.RspInfo.orgMap||{},e.brnoList=r.a.formatTreeData(e.branchNum,"orgno","superno"),e.formInline.branchNum.push(e.brnoList[0].orgno),e.queryInfoList()}).catch(function(a){e.loading=!1,e.$aui.message.show({type:"warning",message:a.SYS_HEAD.ReturnMessage}),console.error("查询错误",a)})},NoticPrty:function(){var e=this;this.loading=!0;var a=new s.a;a.data.DataKey="DeviceModule",Object(o.a)(a).then(function(a){e.loading=!1,e.moduleTypeList=a.RspInfo.Result||[]}).catch(function(a){e.loading=!1,console.log(a)})},typeFormat:function(e,a){return this.moduleTypeList[e[a.property]]},handleCurrentChange:function(e){console.log("当前页: "+e),this.queryInfoList()},resetForm:function(e){this.$refs[e].resetFields()},queryInfoList:function(){var e=this;this.$refs.formInline.validate(function(a){if(a){e.loading=!0;var t=new d;t.data.branchNum=e.formInline.branchNum[0],t.data.devNum=e.formInline.devNum,t.data.moduleType=e.formInline.moduleType,t.data.CurtPage=e.currentPage+"",t.data.PageSize=e.pageSize+"",t.data.StartRows=(e.currentPage-1)*e.pageSize+"",Object(o.a)(t).then(function(a){"000000"==a.SYS_HEAD.ReturnCode?(e.tableData3=a.RspInfo.Result||[],e.tableTotal=a.RspInfo.totalNum||0,e.loading=!1):(e.loading=!1,e.tableData3=[],e.tableTotal=0,e.$aui.message.show({type:"warning",message:a.SYS_HEAD.ReturnMessage}))}).catch(function(a){e.$aui.message.show({type:"error",message:"请求失败，错误码:"+a.SYS_HEAD.ReturnCode+"，错误信息："+a.SYS_HEAD.ReturnMessage}),e.loading=!1,e.tableData3=[],e.tableTotal=0,console.error("查询错误",a)})}})}}},g={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中"}},[t("aui-card",{staticStyle:{"margin-bottom":"10px",overflow:"visible"}},[t("aui-form",{ref:"formInline",attrs:{model:e.formInline,"label-position":"top",size:"mini",rules:e.rules}},[t("aui-row",{attrs:{gutter:10}},[t("aui-col",{attrs:{md:6,lg:4}},[t("aui-form-item",{attrs:{label:"设备编号",prop:"devNum"}},[t("aui-input",{attrs:{placeholder:"请选择设备编号"},model:{value:e.formInline.devNum,callback:function(a){e.$set(e.formInline,"devNum",a)},expression:"formInline.devNum"}})],1)],1),e._v(" "),t("aui-col",{attrs:{md:6,lg:4}},[t("aui-form-item",{attrs:{label:"模块类型",prop:"moduleType"}},[t("aui-select",{attrs:{placeholder:"请选择模块类型"},model:{value:e.formInline.moduleType,callback:function(a){e.$set(e.formInline,"moduleType",a)},expression:"formInline.moduleType"}},e._l(e.moduleTypeList,function(e){return t("aui-option",{key:e.DataKeyVal,attrs:{label:e.DataKeyVal+"-"+e.Meaning,value:e.DataKeyVal}})}))],1)],1),e._v(" "),t("aui-col",{attrs:{md:6,lg:4}},[t("aui-form-item",{attrs:{label:"机构",prop:"branchNum"}},[t("select-tree",{staticStyle:{width:"170px"},attrs:{"single-check":!0,props:{id:"orgno",label:"cname",children:"children"},"tree-data":e.brnoList,placeholder:"请选择机构"},model:{value:e.formInline.branchNum,callback:function(a){e.$set(e.formInline,"branchNum",a)},expression:"formInline.branchNum"}})],1)],1),e._v(" "),t("aui-col",{staticClass:"searchBtnMarginTop",attrs:{md:3,lg:2}},[t("aui-form-item",[t("aui-button",{attrs:{type:"primary",icon:"aui-icon-search"},on:{click:e.queryInfoList}},[e._v("查询")])],1)],1),e._v(" "),t("aui-col",{staticClass:"searchBtnMarginTop",attrs:{lg:2,md:3}},[t("aui-form-item",[t("aui-button",{attrs:{type:"warning",icon:"aui-icon-refresh"},on:{click:function(a){e.resetForm("formInline")}}},[e._v("重置")])],1)],1)],1)],1)],1),e._v(" "),t("aui-card",[t("aui-table",{attrs:{data:e.tableData3,height:"390","header-row-class-name":"tableHeaderClass",border:""}},[t("aui-table-column",{attrs:{prop:"devicenum",label:"设备编号"}}),e._v(" "),t("aui-table-column",{attrs:{prop:"devicetype",label:"设备型号"}}),e._v(" "),t("aui-table-column",{attrs:{prop:"module",label:"模块产商"}}),e._v(" "),t("aui-table-column",{attrs:{prop:"moduletype",label:"模块类型",formatter:e.typeFormat}}),e._v(" "),t("aui-table-column",{attrs:{prop:"modulenum",label:"模块序列号"}}),e._v(" "),t("aui-table-column",{attrs:{prop:"date",label:"维护日期"}}),e._v(" "),t("aui-table-column",{attrs:{prop:"orgname",label:"机构名称"}})],1),e._v(" "),t("aui-pagination",{staticStyle:{"text-align":"right","margin-top":"20px"},attrs:{"current-page":e.currentPage,background:"",layout:"total, prev, pager, next, jumper",total:e.tableTotal},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(a){e.currentPage=a}}})],1)],1)},staticRenderFns:[]};var f=t("/Xao")(p,g,!1,function(e){t("5Jmr")},null,null);a.default=f.exports},aH3L:function(e,a,t){(e.exports=t("BkJT")(!1)).push([e.i,"\n.aui-date-editor.aui-input,\n.aui-date-editor.el-input__inner {\n  width: 100%;\n}\n\n",""])}});