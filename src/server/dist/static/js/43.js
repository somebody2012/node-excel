webpackJsonp([43],{"15C6":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("0oES"),r=a("syAl"),n=a("FspY"),o=a("fCv1"),s={props:{createtype:Object},data:function(){return{loading:!1,addType:{brandNo:"",typeName:"",typeNum:""},rules:{typeNum:[{required:!0,message:"请输入设备类型编号",trigger:"blur"},{validator:o.l,trigger:"blur"},{validator:function(e,t,a){""!==t&&3==t.length||a(new Error("请输入三位字符串"));/^[0-9a-zA-Z]*$/.test(t)?a():a(new Error("请输入三位字符串"))},trigger:"blur"}],typeName:[{required:!0,message:"请输入设备类型名称",trigger:"blur"},{validator:Object(o.h)(30),trigger:"blur"},{validator:o.l,trigger:"blur"}],brandNo:[{required:!0,message:"请输入设备品牌名称",trigger:"blur"},{validator:Object(o.h)(30),trigger:"blur"},{validator:o.l,trigger:"blur"}]}}},computed:{},methods:{openType:function(){"2"==this.createtype.mark&&(this.addType.brandNo=this.createtype.currentRow.equip_brand_no,this.addType.typeNum=this.createtype.currentRow.equip_typ_no,this.addType.typeName=this.createtype.currentRow.equip_typ_nm),this.oldtypeName=this.createtype.currentRow.equip_typ_nm},closetype:function(){this.addType={brandNo:"",typeNum:"",typeName:""},this.$refs.addType.clearValidate()},typeAdd:function(){var e=this;console.log(this.oldtypeName+"  "+this.addType.typeName+"  "+this.oldtypeName==this.addType.typeName),this.$refs.addType.validate(function(t){if(!t)return e.$aui.message.show({type:"warning",message:"请输入合法的数据！"}),!1;if("2"==e.createtype.mark&&e.oldtypeName==e.addType.typeName)return e.createtype.isShow=!1,e.$emit("refreshTable"),void e.$aui.message.show({type:"success",message:"修改设备类型成功!"});var a=new n.a;e.loading=!0,a.data.equip_brand_no=e.addType.brandNo,a.data.equip_typ_no=e.addType.typeNum,a.data.equip_typ_nm=e.addType.typeName,a.data.OperType="1"==e.createtype.mark?"A":"M";var r="1"==e.createtype.mark?"创建":"修改";Object(i.a)(a).then(function(t){e.$emit("refreshTable"),e.$aui.message.show({type:"success",message:r+"设备类型成功!"}),e.createtype.isShow=!1,e.loading=!1}).catch(function(t){e.$aui.message.show({type:"warning",message:t.SYS_HEAD.ReturnMessage}),e.loading=!1})})}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("aui-dialog",{attrs:{visible:e.createtype.isShow,title:e.createtype.title,width:"800px","close-on-click-modal":!1},on:{"update:visible":function(t){e.$set(e.createtype,"isShow",t)},hide:e.closetype,show:e.openType}},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[a("aui-card",[a("aui-form",{ref:"addType",attrs:{model:e.addType,size:"mini",rules:e.rules,"label-position":"right","label-width":"125px"}},[a("aui-row",{attrs:{gutter:20}},[a("aui-col",{attrs:{span:12}},[a("aui-form-item",{attrs:{label:"设备品牌",prop:"brandNo"}},[a("aui-select",{attrs:{filterable:"",placeholder:"请选择设备品牌",disabled:e.createtype.isDisabled},model:{value:e.addType.brandNo,callback:function(t){e.$set(e.addType,"brandNo",t)},expression:"addType.brandNo"}},e._l(e.createtype.paramTypeList,function(e){return a("aui-option",{key:e.serv_pro_no,attrs:{label:e.serv_pro_no+"-"+e.serv_pro_nm,value:e.serv_pro_no}})}))],1)],1),e._v(" "),a("aui-col",{attrs:{span:12}},[a("aui-form-item",{attrs:{label:"设备类型编号",prop:"typeNum"}},[a("aui-input",{attrs:{placeholder:"请输入设备类型编号",disabled:e.createtype.isDisabled},model:{value:e.addType.typeNum,callback:function(t){e.$set(e.addType,"typeNum",t)},expression:"addType.typeNum"}})],1)],1),e._v(" "),a("aui-col",{attrs:{span:12}},[a("aui-form-item",{attrs:{label:"设备类型名称",prop:"typeName"}},[a("aui-input",{attrs:{placeholder:"请输入设备类型名称"},model:{value:e.addType.typeName,callback:function(t){e.$set(e.addType,"typeName",t)},expression:"addType.typeName"}})],1)],1)],1)],1)],1),e._v(" "),a("aui-row",{staticStyle:{margin:"20px 0","text-align":"right"}},[a("aui-button",{attrs:{size:"mini"},on:{click:function(t){e.createtype.isShow=!1}}},[e._v("取消")]),e._v(" "),a("aui-button",{attrs:{type:"primary",size:"mini"},on:{click:e.typeAdd}},[e._v("确认")])],1)],1)])],1)},staticRenderFns:[]};var d=a("/Xao")(s,p,!1,function(e){a("TYHl")},"data-v-2ba3ad14",null).exports,l=a("olAs"),u={data:function(){return{deviceBrandSpinner:[],dialogList:{createtypeInfo:d},dialogOptions:{isShow:!1,isDisabled:"",currentRow:[]},devtypeMgrQueryForm:{typeName:void 0},TypeInfoList:[],addtype:{},loading:!1,currentPage:1,checkedUser:!1,currentRow:[],pageSize:void 0,totalRcrdNum:0,rules:{}}},mounted:function(){this.pageSize=r.a.get("PageSize"),this.brandQuery()},watch:{devtypeMgrQueryForm:{handler:function(e,t){this.currentPage=1},deep:!0}},methods:{brandQuery:function(){var e=this,t=new l.a;Object(i.a)(t).then(function(t){console.log("======",t),e.deviceBrandSpinner=t.RspInfo.Result||[]}).catch(function(e){console.error("查询错误",e)}),this.$nextTick(function(){this.typeQuery()})},dataFormat:function(e,t){var a=e[t.property];if("equip_brand_no"==t.property)return a+"-"+e.serv_pro_nm},typeDel:function(){var e=this,t=new n.a;this.loading=!0,t.data.equip_brand_no=this.currentRow.equip_brand_no,t.data.equip_typ_no=this.currentRow.equip_typ_no,t.data.equip_typ_nm=this.currentRow.equip_typ_nm,t.data.OperType="D",Object(i.a)(t).then(function(t){e.loading=!1,e.$aui.message.show({type:"success",message:"删除成功"}),e.typeQuery()}).catch(function(t){e.loading=!1,e.$aui.message.show({type:"warning",message:t.SYS_HEAD.ReturnMessage})})},delDialogShow:function(){var e=this;this.$aui.confirm.show("此操作将永久删除该品牌类型, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",closeOnClickModal:!1}).then(function(){e.typeDel()}).catch(function(){e.$aui.message.show({type:"info",message:"已取消删除"})})},handleCurrentChangeTable:function(e){this.currentRow=e[0],1==e.length?this.checkedUser=!0:e.length>1?this.$refs.dataTypeInfo.toggleRowSelection(e[0]):this.checkedUser=!1},typeAdd:function(){this.dialogOptions.isShow=!0,this.dialogOptions.mark="1",this.dialogOptions.isDisabled=!1,this.dialogOptions.title="新增类型",this.dialogOptions.paramTypeList=this.deviceBrandSpinner},typeUpdate:function(){this.dialogOptions.isShow=!0,this.dialogOptions.isDisabled=!0,this.dialogOptions.currentRow=this.currentRow,this.dialogOptions.mark="2",this.dialogOptions.title="修改类型",this.dialogOptions.paramTypeList=this.deviceBrandSpinner},clearForm:function(e){this.$refs[""+e].resetFields()},handleCurrentChange:function(e){this.currentPage=e,this.typeQuery()},typeQuery:function(){var e=this,t=new n.a;this.loading=!0,t.data.equip_brand_no=this.devtypeMgrQueryForm.brandNo,t.data.equip_typ_no=this.devtypeMgrQueryForm.typeNum,t.data.equip_typ_nm=this.devtypeMgrQueryForm.typeName,t.data.start=this.currentPage+"",t.data.length=this.pageSize+"",t.data.OperType="Q",console.log(this.currentPage+" "+this.pageSize),Object(i.a)(t).then(function(t){console.log(t),e.loading=!1,e.TypeInfoList=t.RspInfo.pageList||[],e.totalRcrdNum=t.RspInfo.recordsTotal||0}).catch(function(t){e.loading=!1,e.TypeInfoList=[],e.$aui.message.show({type:"warning",message:t.SYS_HEAD.ReturnMessage})})}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"dev-type-manage",attrs:{"element-loading-text":"加载中。。。"}},[a("aui-card",[a("aui-form",{ref:"devtypeMgrQueryForm",attrs:{model:e.devtypeMgrQueryForm,size:"mini","label-position":"top",rules:e.rules}},[a("aui-row",{attrs:{gutter:10}},[a("aui-col",{attrs:{lg:4,md:6}},[a("aui-form-item",{attrs:{label:"设备品牌",prop:"brandNo"}},[a("aui-select",{attrs:{filterable:"",placeholder:"请选择设备品牌"},model:{value:e.devtypeMgrQueryForm.brandNo,callback:function(t){e.$set(e.devtypeMgrQueryForm,"brandNo",t)},expression:"devtypeMgrQueryForm.brandNo"}},e._l(e.deviceBrandSpinner,function(e){return a("aui-option",{key:e.serv_pro_no,attrs:{label:e.serv_pro_no+"-"+e.serv_pro_nm,value:e.serv_pro_no}})}))],1)],1),e._v(" "),a("aui-col",{attrs:{lg:4,md:6}},[a("aui-form-item",{attrs:{label:"设备类型编号",prop:"typeNum"}},[a("aui-input",{attrs:{placeholder:"请输入设备类型编号"},model:{value:e.devtypeMgrQueryForm.typeNum,callback:function(t){e.$set(e.devtypeMgrQueryForm,"typeNum",t)},expression:"devtypeMgrQueryForm.typeNum"}})],1)],1),e._v(" "),a("aui-col",{attrs:{lg:4,md:6}},[a("aui-form-item",{attrs:{label:"设备类型名称",prop:"typeName"}},[a("aui-input",{attrs:{placeholder:"请输入设备类型名称"},model:{value:e.devtypeMgrQueryForm.typeName,callback:function(t){e.$set(e.devtypeMgrQueryForm,"typeName",t)},expression:"devtypeMgrQueryForm.typeName"}})],1)],1),e._v(" "),a("aui-col",{staticClass:"searchBtnMarginTop",attrs:{lg:2,md:3}},[a("aui-button",{attrs:{type:"primary",size:"mini",icon:"aui-icon-search"},on:{click:e.typeQuery}},[e._v("查询")])],1),e._v(" "),a("aui-col",{staticClass:"searchBtnMarginTop",attrs:{lg:2,md:3}},[a("aui-button",{attrs:{type:"warning",size:"mini",icon:"aui-icon-refresh"},on:{click:function(t){e.clearForm("devtypeMgrQueryForm")}}},[e._v("重置")])],1)],1)],1)],1),e._v(" "),a("aui-card",{staticStyle:{"margin-top":"10px"}},[a("aui-row",[a("aui-col",{attrs:{lg:2,md:3}},[e.btnPermission("Button_Devtype_Add")?a("aui-button",{attrs:{type:"primary",size:"mini",icon:"aui-icon-plus",disabled:e.checkedUser},on:{click:function(t){e.typeAdd()}}},[e._v("新增")]):e._e()],1),e._v(" "),a("aui-col",{attrs:{lg:2,md:3}},[e.btnPermission("Button_Devtype_Edit")?a("aui-button",{attrs:{type:"primary",size:"mini",icon:"aui-icon-edit",disabled:!e.checkedUser},on:{click:function(t){e.typeUpdate()}}},[e._v("修改")]):e._e()],1),e._v(" "),a("aui-col",{attrs:{lg:2,md:3}},[e.btnPermission("Button_Devtype_Delete")?a("aui-button",{staticClass:"b-button",attrs:{type:"danger",size:"mini",icon:"aui-icon-delete",disabled:!e.checkedUser},on:{click:e.delDialogShow}},[e._v("删除")]):e._e()],1)],1),e._v(" "),a("aui-table",{ref:"dataTypeInfo",staticClass:"tableMarginTop",attrs:{data:e.TypeInfoList,border:"","max-height":"400",width:"100%","header-row-class-name":"tableHeaderClass","highlight-current-row":""},on:{"selection-change":e.handleCurrentChangeTable}},[a("aui-table-column",{attrs:{type:"selection",width:"40px"}}),e._v(" "),a("aui-table-column",{attrs:{prop:"equip_brand_no",formatter:e.dataFormat,label:"设备品牌"}}),e._v(" "),a("aui-table-column",{attrs:{prop:"equip_typ_no",label:"设备类型编号"}}),e._v(" "),a("aui-table-column",{attrs:{prop:"equip_typ_nm",label:"设备类型名称"}})],1),e._v(" "),a("div",{staticStyle:{"text-align":"right","margin-top":"20px"}},[a("aui-pagination",{attrs:{background:"","current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalRcrdNum},on:{"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),a("keep-alive",[a(e.dialogList.createtypeInfo,{tag:"component",attrs:{createtype:e.dialogOptions},on:{refreshTable:e.typeQuery}})],1)],1)},staticRenderFns:[]};var y=a("/Xao")(u,c,!1,function(e){a("RtQY")},"data-v-3dd685d8",null);t.default=y.exports},"1FXP":function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,"",""])},FspY:function(e,t,a){"use strict";var i=a("AA3o"),r=a.n(i);t.a=function e(){r()(this,e),this.data={equip_brand_no:"",equip_typ_no:"",equip_typ_nm:"",OperType:""},this.CommCode="IBDeviceManagement",this.SceneCode="DeviceTypeMnt",this.TransServiceCode="mg-afaservices-dev/deviceBrandInfoIncreased"}},RtQY:function(e,t,a){var i=a("vKnC");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("8bSs")("3e9dde7c",i,!0)},TYHl:function(e,t,a){var i=a("1FXP");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("8bSs")("0e76b7c3",i,!0)},olAs:function(e,t,a){"use strict";var i=a("AA3o"),r=a.n(i);t.a=function e(){r()(this,e),this.data={},this.BusiDataKey="SelectDeviceSupploer",this.TransServiceCode="ib-dbcomm/dbComm"}},vKnC:function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,"\n.aui-form-item[data-v-3dd685d8] {\n  margin-bottom: 5px;\n}\n",""])}});