webpackJsonp([147],{CieZ:function(t,n,e){var a=e("Kvpe");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e("8bSs")("03c69eb9",a,!0)},Kvpe:function(t,n,e){(t.exports=e("BkJT")(!1)).push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},vfVz:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a,i=e("ZLEe"),o=e.n(i),r=e("0oES"),s=e("a3Yh"),l=e.n(s),u=e("syAl"),c=e("AA3o"),p=e.n(c),d=function t(){p()(this,t),this.data={strategy_Id:""},this.TransServiceCode="mg-afaservices-vsn/versionDevinfo"},g=function t(){p()(this,t),this.data={versionCode:"",branchNo:""},this.TransServiceCode="mg-afaservices-vsn/retreatByversionCode"},h=(a={props:{option:Object},data:function(){return{tableTotal:0,pageSize:u.a.get("PageSize"),loading:!1,form:{strategy_Id:"",versionCode:"",applyDate:"",adDescription:"",adStatus:""},dialogFormVisible:!1,tableData:[],currentPage:1}},created:function(){this.queryDevinfoList()},computed:{isShow:{get:function(){return this.option.importTemplateIsShow},set:function(t){this.option.importTemplateIsShow=t}}}},l()(a,"props",{option:Object}),l()(a,"methods",{handleCurrentChange:function(){this.queryDevinfoList()},handleSizeChange:function(){this.queryDevinfoList()},queryDevinfoList:function(){var t=this;this.loading=!0;var n=new d;n.data.strategy_Id=this.form.strategy_Id,n.data.queryrownum=this.pageSize,n.data.querypageno=this.currentPage,Object(r.a)(n).then(function(n){t.loading=!1,t.tableData=n.RspInfo.verRollbackDevInfoList||[],t.tableTotal=Number(n.RspInfo.QueryAllDataCount||t.tableData.length)}).catch(function(n){t.loading=!1,t.$aui.message.show({message:n.SYS_HEAD.ReturnMessage,type:"error"}),console.log("error",n)})},retreatvs:function(){var t=this;this.loading=!0;var n=new g;n.data.versionCode=this.form.versionCode,n.data.branchNo=this.$store.getters.branchNo,Object(r.a)(n).then(function(n){t.loading=!1,t.$aui.message.show({message:"版本回退成功",type:"success"}),t.$parent.queryInfoList(),t.isShow=!1}).catch(function(n){t.$aui.message.show({message:n.SYS_HEAD.ReturnMessage,type:"error"}),t.loading=!1,console.log("error",n)})},openUpdate:function(){for(var t in this.option.currentRow)this.form[t]=this.option.currentRow[t];this.queryDevinfoList(),console.log(this.form)}}),a),m={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("aui-dialog",{attrs:{title:"版本回退",width:"700px","lock-scroll":!1,"close-on-click-modal":!1,visible:t.isShow},on:{"update:visible":function(n){t.isShow=n},show:t.openUpdate}},[e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中"}},[e("aui-card",[e("aui-form",{ref:"form",attrs:{model:t.form,size:"mini","label-width":"80px","label-position":"right"}},[e("aui-row",{attrs:{gutter:10}},[e("aui-col",[e("aui-form-item",{attrs:{label:"版本号"}},[e("span",{domProps:{textContent:t._s(t.form.versionCode)}})])],1),t._v(" "),e("aui-col",[e("aui-form-item",{attrs:{label:"版本描述"}},[e("span",{domProps:{textContent:t._s(t.form.adDescription)}})])],1)],1),t._v(" "),e("aui-table",{attrs:{data:t.tableData,"header-row-class-name":"tableHeaderClass",border:""}},[e("aui-table-column",{attrs:{type:"selection",width:"40"}}),t._v(" "),e("aui-table-column",{attrs:{fixed:"",prop:"devNum",label:"机具编号",width:"120"}}),t._v(" "),e("aui-table-column",{attrs:{prop:"branchNo",label:"机构号",width:"150"}}),t._v(" "),e("aui-table-column",{attrs:{prop:"versionCode",label:"当前版本",width:"120"}}),t._v(" "),e("aui-table-column",{attrs:{prop:"upperVersionCode",label:"上一版本","min-width":"120"}})],1),t._v(" "),e("aui-pagination",{staticStyle:{"text-align":"right","margin-top":"20px"},attrs:{"page-sizes":[10,20,50,100],"page-size":t.pageSize,"current-page":t.currentPage,background:"",layout:"total, prev, pager, next, jumper",total:t.tableTotal},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange,"update:currentPage":function(n){t.currentPage=n}}})],1)],1),t._v(" "),e("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"right"},attrs:{slot:"footer"},slot:"footer"},[e("aui-button",{staticStyle:{"margin-top":"10px"},attrs:{size:"mini"},on:{click:function(n){t.isShow=!1}}},[t._v("取 消")]),t._v(" "),e("aui-button",{staticStyle:{"margin-top":"10px"},attrs:{size:"mini",type:"primary"},on:{click:t.retreatvs}},[t._v("立即回退")])],1)],1)])},staticRenderFns:[]},f=e("/Xao")(h,m,!1,null,null,null).exports,v=(e("4Wfm"),function t(){p()(this,t),this.data={},this.TransServiceCode="mg-afaservices-vsn/versionRetreat"}),b=e("pADA"),y={data:function(){return{tableTotal:0,pageSize:u.a.get("PageSize"),search:"",currentPage:1,loading:!1,tableData:[],dialogList:{importTemplate:f},dialogOptions:{importTemplateIsShow:!1,currentRow:[]},adStatustype:u.a.get("adStatustype")}},computed:{tables:function(){var t=this.search;return t?this.tableData.filter(function(n){return o()(n).some(function(e){return String(n[e]).toLowerCase().indexOf(t)>-1})}):this.tableData}},created:function(){this.queryInfoList()},methods:{Format:function(t,n){return this.adStatustype[t[n.property]]},versionRetreatRow:function(t,n){this.dialogOptions.currentRow=n[t],this.dialogOptions.importTemplateIsShow=!0},handleSizeChange:function(t){this.queryInfoList()},handleCurrentChange:function(t){this.queryInfoList()},dtFormat:function(t,n){return b.a.timeFormat(t[n.property])},queryInfoList:function(){var t=this;this.loading=!0;var n=new v;n.data.queryrownum=this.pageSize,n.data.querypageno=this.currentPage,Object(r.a)(n).then(function(n){t.loading=!1,console.log(n),t.tableData=n.RspInfo.verRollbackBaseInfoList||[],t.tableTotal=Number(n.RspInfo.QueryAllDataCount||t.tableData.length)}).catch(function(n){t.loading=!1,t.$aui.message.show({message:n.SYS_HEAD.ReturnMessage,type:"error"}),console.log("error",n)})}}},w={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中"}},[e("aui-card",[e("aui-row",{attrs:{gutter:10}},[e("aui-col",{attrs:{sm:5,lg:5}},[e("aui-input",{attrs:{size:"mini","suffix-icon":"aui-icon-search",placeholder:"请输入查询信息检索"},model:{value:t.search,callback:function(n){t.search=n},expression:"search"}})],1)],1),t._v(" "),e("aui-table",{staticClass:"tableMarginTop",attrs:{data:t.tables,"header-row-class-name":"tableHeaderClass",border:""}},[e("aui-table-column",{attrs:{fixed:"",prop:"versionCode",label:"版本号",width:"150"}}),t._v(" "),e("aui-table-column",{attrs:{prop:"applyDate",formatter:t.dtFormat,label:"版本发布时间",width:"160"}}),t._v(" "),e("aui-table-column",{attrs:{prop:"adDescription",label:"版本描述","min-width":"160"}}),t._v(" "),e("aui-table-column",{attrs:{prop:"adStatus",formatter:t.Format,label:"发布结果",width:"150"}}),t._v(" "),e("aui-table-column",{attrs:{label:"操作",fixed:"right",width:"100"},scopedSlots:t._u([{key:"default",fn:function(n){return[t.btnPermission("Button_VersionRevert_Revert")?e("aui-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(e){e.preventDefault(),t.versionRetreatRow(n.$index,t.tables)}}},[t._v("\n                立即回退\n              ")]):t._e()]}}])})],1),t._v(" "),e("aui-pagination",{staticStyle:{"text-align":"right","margin-top":"20px"},attrs:{"page-sizes":[10,20,50,100],"page-size":t.pageSize,"current-page":t.currentPage,background:"",layout:"total, prev, pager, next, jumper",total:t.tableTotal},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange,"update:currentPage":function(n){t.currentPage=n}}})],1),t._v(" "),e("keep-alive",[e(t.dialogList.importTemplate,{tag:"component",attrs:{option:t.dialogOptions}})],1)],1)},staticRenderFns:[]};var S=e("/Xao")(y,w,!1,function(t){e("CieZ")},null,null);n.default=S.exports}});