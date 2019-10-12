webpackJsonp([114],{"91LY":function(e,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=n("tzsN"),r=n("pADA"),o=n("0oES"),i=n("0VOF"),s=n("fCv1"),c=n("AA3o"),l=n.n(c),m=function e(){l()(this,e),this.data={},this.CommCode="IBParameterManagement",this.SceneCode="LockScreen",this.TransServiceCode="mo-afaservices-lock/lockScreenSetQuery"},d=function e(){l()(this,e),this.data={},this.CommCode="IBParameterManagement",this.SceneCode="LockScreen",this.TransServiceCode="mo-afaservices-lock/lockScreenSetUpdate"},u={components:{selectTree:t.a},data:function(){return{lsTimeForm:{branchNum:[],ManSecond:0,CliSecond:0,GaiSecond:0,id:""},leTime:[],brnoList:[],permission:{},loading:!1,rules:{branchNum:[{required:!0,message:"请选择机构号",trigger:"change"}],ManSecond:[{validator:s.f,trigger:"blur"}],CliSecond:[{validator:s.f,trigger:"blur"}],GaiSecond:[{validator:s.f,trigger:"blur"}]}}},created:function(){this.queryBranchNum()},watch:{"lsTimeForm.branchNum":function(){this.parmsCheck()}},methods:{queryBranchNum:function(){var e=this;this.loading=!0;var a=new i.a;a.data.orgno=this.$store.getters.BranchNum,Object(o.a)(a).then(function(a){e.loading=!1,e.branchNum=a.RspInfo.Result||[],e.brnoMap=a.RspInfo.orgMap||{},e.permission=r.a.objArray2Hash(e.branchNum,"orgno"),e.brnoList=r.a.formatTreeData(e.branchNum,"orgno","superno"),e.lsTimeForm.branchNum.push(e.brnoList[0].orgno)}).catch(function(a){e.loading=!1,e.$aui.message.show({type:"warning",message:a.SYS_HEAD.ReturnMessage}),console.error("查询错误",a)})},parmsCheck:function(){var e=this;if(this.loading=!0,this.lsTimeForm.branchNum[0]){var a=new m;a.data.ORG_NO=this.lsTimeForm.branchNum[0],a.data.APP_NO="LMHTS",a.data.DEAL_TYPE="4",Object(o.a)(a).then(function(a){e.loading=!1,a.RspInfo&&a.RspInfo.LockScreenInfoList.length>0&&(e.lsTimeForm.ManSecond=a.RspInfo.LockScreenInfoList[0].MANAG_CLNT_LOCK_SCRN_TM)}).catch(function(a){e.loading=!1,e.lsTimeForm.ManSecond=60,console.log(a)})}else this.loading=!1},submit:function(){var e=this;this.$refs.lsTimeForm.validate(function(a){if(a){e.loading=!0;var n=new d;n.data.ORG_NO=e.lsTimeForm.branchNum[0],n.data.APP_NO="LMHTS",n.data.DEAL_TYPE="5",n.data.MANAG_CLNT_LOCK_SCRN_TM=e.lsTimeForm.ManSecond,Object(o.a)(n).then(function(a){e.loading=!1,e.$aui.message.show({type:"success",message:"维护成功"})}).catch(function(a){e.loading=!1,e.$aui.message.show({type:"error",message:a.SYS_HEAD.ReturnMessage})})}})}}},h={render:function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("aui-card",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[n("div",{attrs:{slot:"header"},slot:"header"},[n("span",{staticStyle:{"font-size":"20px"}},[e._v("参数设置")])]),e._v(" "),n("aui-form",{ref:"lsTimeForm",staticClass:"form",attrs:{model:e.lsTimeForm,rules:e.rules,size:"mini","label-position":"top"}},[n("aui-row",{attrs:{gutter:10}},[n("aui-col",{attrs:{lg:6,md:4}},[n("aui-form-item",{attrs:{label:"机构号",prop:"branchNum"}},[n("select-tree",{staticStyle:{width:"170px"},attrs:{"single-check":!0,props:{id:"orgno",label:"cname",children:"children"},"tree-data":e.brnoList,placeholder:"请选择机构"},model:{value:e.lsTimeForm.branchNum,callback:function(a){e.$set(e.lsTimeForm,"branchNum",a)},expression:"lsTimeForm.branchNum"}})],1)],1),e._v(" "),n("aui-col",{attrs:{lg:6,md:4}},[n("aui-form-item",{attrs:{prop:"ManSecond",label:"锁屏时间(秒)"}},[n("aui-input-number",{attrs:{min:60,max:9999},model:{value:e.lsTimeForm.ManSecond,callback:function(a){e.$set(e.lsTimeForm,"ManSecond",a)},expression:"lsTimeForm.ManSecond"}})],1)],1),e._v(" "),n("aui-col",{staticClass:"searchBtnMarginTop",attrs:{lg:4,md:4}},[n("span",{staticStyle:{color:"red"}},[e._v("提示：锁屏时间不低于60秒")])]),e._v(" "),n("aui-col",{staticClass:"searchBtnMarginTop",attrs:{lg:2,md:3}},[n("aui-button",{attrs:{type:"primary",size:"mini",icon:"aui-icon-check"},on:{click:e.submit}},[e._v("提交")])],1)],1)],1)],1)},staticRenderFns:[]};var g=n("/Xao")(u,h,!1,function(e){n("pi/B")},"data-v-634a4de2",null);a.default=g.exports},"Hh/w":function(e,a,n){(e.exports=n("BkJT")(!1)).push([e.i,"\n.form[data-v-634a4de2] {\n  width: 100%;\n}\n.form-footer[data-v-634a4de2] {\n  text-align: center;\n}\n.item-number[data-v-634a4de2] {\n  width: 120px;\n}\n.aui-button__contain span i[data-v-634a4de2] {\n  margin-right: 20%;\n  margin-left: -10%;\n}\n.aui-row[data-v-634a4de2] {\n  margin-bottom: 20px;\n}\n.aui-col[data-v-634a4de2] {\n  border-radius: 4px;\n}\n\n",""])},"pi/B":function(e,a,n){var t=n("Hh/w");"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);n("8bSs")("b4599122",t,!0)}});