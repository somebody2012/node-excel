webpackJsonp([29],{"/5e8":function(e,t,a){var r=a("j1zr");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("8bSs")("ccc207c0",r,!0)},"2oz7":function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,"",""])},"3VEP":function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,"",""])},"4Flk":function(e,t,a){"use strict";var r=a("AA3o"),i=a.n(r);t.a=function e(){i()(this,e),this.data={Brno:"",BusiOper:"Q",BsIDTp:"3"},this.BusiDataKey="sel_TP_BSTP_BSID",this.TransServiceCode="ib-dbcomm/dbComm"}},D6TH:function(e,t,a){"use strict";var r=a("AA3o"),i=a.n(r);t.a=function e(){i()(this,e),this.data={Brno:"",BusiOper:"Q",CurtPage:1,PageSize:99999,StartRows:0,QueueTpID:""},this.BusiDataKey="selQueueTp1",this.TransServiceCode="ib-dbcomm/dbComm"}},EuZe:function(e,t,a){var r=a("2oz7");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("8bSs")("f4e54956",r,!0)},J5oc:function(e,t,a){var r=a("3VEP");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("8bSs")("29a32d7e",r,!0)},gR1U:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("pADA"),i=a("0oES"),o=a("tzsN"),s=a("fCv1"),n=a("syAl"),u=a("AA3o"),l=a.n(u),c=function e(){l()(this,e),this.data={Brno:"",OperTp:"A",QueueTpName:"",QueueTpPreLetter:"",QueueTpPreNum:"",QueueTpStatus:"",TransferFlag:"",QueueTpPrty:""},this.CommCode="CQParaManage",this.SceneCode="BrachQuCfgMnt",this.TransServiceCode="mg-afaservices-cq/orgQueueManage"},p=function e(){l()(this,e),this.data={Brno:"",OperTp:"M",QueueTpID:"",QueueTpName:"",QueueTpPreLetter:"",QueueTpPreNum:"",QueueTpStatus:"",TransferFlag:"",QueueTpPrty:""},this.CommCode="CQParaManage",this.SceneCode="BrachQuCfgMnt",this.TransServiceCode="mg-afaservices-cq/orgQueueManage"},d={components:{selectTree:o.a},props:{option:Object},data:function(){var e=this;return{loading:!1,appId:[],transferFlagList:[{value:"1",label:"可以"},{value:"0",label:"不可以"}],queueStateList:[],form:{queueTypeId:"",queueName:"",prefixLetter:"",brno:[],prefixNum:"",queueState:"1",transferFlag:"1",queuePrty:""},rules:{brno:[{type:"array",required:!0,message:"请选择机构编号",trigger:"change"}],queueState:[{required:!0,message:"请选择队列状态",trigger:"change"}],queueName:[{required:!0,message:"请输入队列名称",trigger:"blur"},{require:!1,validator:Object(s.h)(30),trigger:"blur"}],transferFlag:[{required:!0,message:"请选择队列转移标志",trigger:"change"}],queuePrty:[{required:!0,message:"请输入队列优先级",trigger:"blur"},{validator:s.f,trigger:"blur"}],prefixLetter:[{validator:function(t,a,r){a||e.form.prefixNum?a&&/(^[a-zA-Z]+$)/.test(a)||e.form.prefixNum&&""==a?r():r(new Error("前缀字母必须是字母!")):r(new Error("前缀字母和前缀数字不能同时为空!"))},trigger:"blur"}],prefixNum:[{validator:function(t,a,r){e.form.prefixLetter||a?a&&/(^\d+$)/.test(a)||e.form.prefixLetter&&""==a?r():r(new Error("前缀数字必须是数字!")):r(new Error("前缀字母和前缀数字不能同时为空!"))},trigger:"blur"}]}}},created:function(){this.queueStateList=r.a.objToArray(n.a.get("state"))},methods:{openUpdate:function(){var e=this;"2"==this.option.mark?this.$nextTick(function(){e.setData()}):this.$refs.form&&(this.$refs.form.clearValidate(),this.$refs.form.resetFields())},setData:function(){this.form.brno.push(this.option.currentRow.Brno),this.form.queueName=this.option.currentRow.QueueTpName,this.form.queuePrty=this.option.currentRow.QueueTpPrty,this.form.transferFlag=this.option.currentRow.TransferFlag,this.form.queueTypeId=this.option.currentRow.QueueTpID,this.form.queueState=this.option.currentRow.QueueTpStatus,this.form.prefixLetter=this.option.currentRow.QueueTpPreLetter,this.form.prefixNum=this.option.currentRow.QueueTpPreNum},closeUpdete:function(){this.$refs.form.resetFields(),this.$refs.form.clearValidate()},ItemUpdate:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return e.$aui.message.show({type:"warning",message:"请输入合法的数据！"}),!1;e.loading=!0;var a="1"==e.option.mark?new c:new p;a.data.Brno=e.form.brno[0],a.data.QueueTpID=e.form.queueTypeId,a.data.QueueTpName=e.form.queueName,a.data.QueueTpPreLetter=e.form.prefixLetter,a.data.QueueTpPreNum=e.form.prefixNum,a.data.QueueTpStatus=e.form.queueState,a.data.TransferFlag=e.form.transferFlag,a.data.QueueTpPrty=e.form.queuePrty,Object(i.a)(a).then(function(t){e.$emit("refreshTable"),e.option.isShow=!1;var a="1"==e.option.mark?"创建":"修改";e.$aui.message.show({type:"success",message:a+"成功!"}),e.loading=!1}).catch(function(t){e.$aui.message.show({type:"error",message:t.SYS_HEAD.ReturnMessage+"!"}),e.loading=!1})})}}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("aui-dialog",{attrs:{title:e.option.title,visible:e.option.isShow,width:"800px","close-on-click-modal":!1},on:{"update:visible":function(t){e.$set(e.option,"isShow",t)},show:e.openUpdate,hide:e.closeUpdete}},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[a("aui-card",[a("aui-form",{ref:"form",attrs:{model:e.form,size:"mini",rules:e.rules,"label-width":"140px","label-position":"right"}},[a("aui-row",{attrs:{gutter:40}},[a("aui-col",{attrs:{span:12}},[a("aui-form-item",{attrs:{label:"机构编号:",prop:"brno"}},[a("select-tree",{staticStyle:{width:"170px"},attrs:{"single-check":!0,props:{id:"orgno",label:"cname",children:"children"},"tree-data":e.option.branchNum,placeholder:"请选择机构",disabled:e.option.isDisabled},model:{value:e.form.brno,callback:function(t){e.$set(e.form,"brno",t)},expression:"form.brno"}})],1)],1),e._v(" "),a("aui-col",{attrs:{span:12}},[e.option.isDisabled?a("aui-form-item",{attrs:{label:"队列类型ID:",prop:"queueTypeId"}},[a("aui-input",{attrs:{disabled:!0},model:{value:e.form.queueTypeId,callback:function(t){e.$set(e.form,"queueTypeId",t)},expression:"form.queueTypeId"}})],1):e._e()],1)],1),e._v(" "),a("aui-row",{attrs:{gutter:40}},[a("aui-col",{attrs:{span:12}},[a("aui-form-item",{attrs:{label:"队列名称:",prop:"queueName"}},[a("aui-input",{attrs:{placeholder:"请输入队列名称"},model:{value:e.form.queueName,callback:function(t){e.$set(e.form,"queueName",t)},expression:"form.queueName"}})],1)],1),e._v(" "),a("aui-col",{attrs:{span:12}},[a("aui-form-item",{attrs:{label:"队列前缀字母:",prop:"prefixLetter"}},[a("aui-input",{attrs:{maxlength:1,placeholder:"请输入队列前缀字母"},model:{value:e.form.prefixLetter,callback:function(t){e.$set(e.form,"prefixLetter",t)},expression:"form.prefixLetter"}})],1)],1)],1),e._v(" "),a("aui-row",{attrs:{gutter:40}},[a("aui-col",{attrs:{span:12}},[a("aui-form-item",{attrs:{label:"队列前缀数字",prop:"prefixNum"}},[a("aui-input",{attrs:{maxlength:1,placeholder:"请输入队列前缀数字"},model:{value:e.form.prefixNum,callback:function(t){e.$set(e.form,"prefixNum",t)},expression:"form.prefixNum"}})],1)],1),e._v(" "),a("aui-col",{attrs:{span:12}},[a("aui-form-item",{attrs:{label:"队列状态:",prop:"queueState"}},[a("aui-select",{attrs:{placeholder:"请选择队列状态"},model:{value:e.form.queueState,callback:function(t){e.$set(e.form,"queueState",t)},expression:"form.queueState"}},e._l(e.queueStateList,function(e){return a("aui-option",{key:e.value,attrs:{label:e.label,value:e.value,disabled:e.disabled}})}))],1)],1)],1),e._v(" "),a("aui-row",{attrs:{gutter:40}},[a("aui-col",{attrs:{span:12}},[a("aui-form-item",{attrs:{label:"队列优先级:",prop:"queuePrty"}},[a("aui-input-number",{attrs:{min:1,max:999,label:"描述文字"},model:{value:e.form.queuePrty,callback:function(t){e.$set(e.form,"queuePrty",t)},expression:"form.queuePrty"}})],1)],1)],1)],1)],1),e._v(" "),a("aui-row",{staticStyle:{margin:"20px 0","text-align":"right"}},[a("aui-button",{attrs:{size:"mini"},on:{click:function(t){e.option.isShow=!1}}},[e._v("返回")]),e._v(" "),a("aui-button",{attrs:{type:"primary",size:"mini"},on:{click:e.ItemUpdate}},[e._v("确定")])],1)],1)])],1)},staticRenderFns:[]};var f=a("/Xao")(d,m,!1,function(e){a("/5e8")},null,null).exports,h=a("4Flk"),g=a("B+2e"),b=function e(){l()(this,e),this.data={Brno:"",QueueTpID:""},this.CommCode="CQParaManage",this.SceneCode="RuleQueueQuy",this.TransServiceCode="mg-afaservices-cq/takeNumRule"},v=function e(){l()(this,e),this.data={Brno:"",QueueTpID:"",BsID:"",CustGrd:"",FeatureCode:""},this.CommCode="CQParaManage",this.SceneCode="RuleGrpdCfg",this.TransServiceCode="mg-afaservices-cq/takeNumRuleSubmit"},y={props:{option:Object},data:function(){return{loading:!1,featureCodeList:[{value:"10",label:"已预约"},{value:"00",label:"未预约"}],custGrdList:[],bsIDList:[],form:{brno:"",queueTypeId:"",featureCode:[],custGrd:[],bsID:[]},rules:{brno:[{required:!0,message:"请选择机构编号",trigger:"change"}],bsID:[{type:"array",required:!0,message:"请选择业务ID",trigger:"change"}],featureCode:[{type:"array",required:!0,message:"请选择是否预约",trigger:"change"}],custGrd:[{type:"array",required:!0,message:"请选择客户类型",trigger:"change"}]}}},created:function(){},methods:{openUpdate:function(){this.bsIDLoad(),this.custGrdLoad(),this.setData()},bsIDLoad:function(){var e=this;this.loading=!0;var t=new h.a;t.data.Brno=this.option.currentRow.Brno,Object(i.a)(t).then(function(t){e.loading=!1,e.bsIDList=t.RspInfo.Result||[]}).catch(function(t){e.$aui.message.show({type:"warning",message:t.SYS_HEAD.ReturnMessage+"!"}),e.loading=!1})},custGrdLoad:function(){var e=this;this.loading=!0;var t=new g.a;t.data.BusiOper="Q1",t.data.DataKey="CustGrd",Object(i.a)(t).then(function(t){e.loading=!1,e.custGrdList=t.RspInfo.Result||[]}).catch(function(t){e.$aui.message.show({type:"warning",message:t.SYS_HEAD.ReturnMessage+"!"}),e.loading=!1})},setData:function(){var e=this;this.loading=!0,this.form.brno=this.option.currentRow.Brno,this.form.queueTypeId=this.option.currentRow.QueueTpID+"-"+this.option.currentRow.QueueTpName;var t=new b;t.data.Brno=this.option.currentRow.Brno,t.data.QueueTpID=this.option.currentRow.QueueTpID,Object(i.a)(t).then(function(t){e.loading=!1,t.RspInfo.FeatureCode&&""!=t.RspInfo.FeatureCode&&(e.form.featureCode=t.RspInfo.FeatureCode.split(",")),t.RspInfo.BsID&&""!=t.RspInfo.BsID&&(e.form.bsID=t.RspInfo.BsID.split(",")),t.RspInfo.CustGrd&&""!=t.RspInfo.CustGrd&&(e.form.custGrd=t.RspInfo.CustGrd.split(","))}).catch(function(t){e.loading=!1,e.$aui.message.show({type:"warning",message:t.SYS_HEAD.ReturnMessage+"!"})})},closeUpdete:function(){this.$refs.form.resetFields(),this.$refs.form.clearValidate()},ItemUpdate:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return e.$aui.message.show({type:"warning",message:"请输入合法的数据！"}),!1;e.loading=!0;var a=new v;a.data.Brno=e.form.brno,a.data.QueueTpID=e.option.currentRow.QueueTpID,a.data.BsID=e.form.bsID.join(","),a.data.CustGrd=e.form.custGrd.join(","),a.data.FeatureCode=e.form.featureCode.join(","),console.log(a),Object(i.a)(a).then(function(t){e.option.isShow=!1,e.$aui.message.show({type:"success",message:t.SYS_HEAD.ReturnMessage+"!"}),e.loading=!1}).catch(function(t){e.$aui.message.show({type:"warning",message:t.SYS_HEAD.ReturnMessage+"!"}),e.loading=!1})})}}},w={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("aui-dialog",{attrs:{title:e.option.title,visible:e.option.isShow,width:"800px","close-on-click-modal":!1},on:{"update:visible":function(t){e.$set(e.option,"isShow",t)},show:e.openUpdate,hide:e.closeUpdete}},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[a("aui-card",[a("aui-form",{ref:"form",attrs:{model:e.form,size:"mini",rules:e.rules,"label-width":"140px","label-position":"right"}},[a("aui-row",{attrs:{gutter:40}},[a("aui-col",{attrs:{span:24}},[a("aui-form-item",{attrs:{label:"机构编号:",prop:"brno"}},[a("aui-select",{attrs:{disabled:!0,filterable:"",placeholder:"请选择机构编号"},model:{value:e.form.brno,callback:function(t){e.$set(e.form,"brno",t)},expression:"form.brno"}},e._l(e.option.branchNum,function(e){return a("aui-option",{key:e.orgno,attrs:{label:e.cname,value:e.orgno,disabled:e.disabled}})}))],1)],1),e._v(" "),a("aui-col",{attrs:{span:24}},[a("aui-form-item",{attrs:{label:"队列类型ID:",prop:"queueTypeId"}},[a("aui-input",{attrs:{disabled:!0},model:{value:e.form.queueTypeId,callback:function(t){e.$set(e.form,"queueTypeId",t)},expression:"form.queueTypeId"}})],1)],1)],1),e._v(" "),a("aui-row",{attrs:{gutter:40}},[a("aui-col",{attrs:{span:12}},[a("aui-form-item",{attrs:{label:"预约标志:",prop:"featureCode"}},[a("aui-select",{attrs:{multiple:"",placeholder:"请选择队列状态"},model:{value:e.form.featureCode,callback:function(t){e.$set(e.form,"featureCode",t)},expression:"form.featureCode"}},e._l(e.featureCodeList,function(e){return a("aui-option",{key:e.value,attrs:{label:e.value+"-"+e.label,value:e.value,disabled:e.disabled}})}))],1)],1),e._v(" "),a("aui-col",{attrs:{span:12}},[a("aui-form-item",{attrs:{label:"客户类型:",prop:"custGrd"}},[a("aui-select",{attrs:{multiple:"",placeholder:"请选择队列状态"},model:{value:e.form.custGrd,callback:function(t){e.$set(e.form,"custGrd",t)},expression:"form.custGrd"}},e._l(e.custGrdList,function(e){return a("aui-option",{key:e.DataKeyVal,attrs:{label:e.DataKeyVal+"-"+e.Meaning,value:e.DataKeyVal,disabled:e.disabled}})}))],1)],1)],1),e._v(" "),a("aui-row",{attrs:{gutter:40}},[a("aui-col",{attrs:{span:12}},[a("aui-form-item",{attrs:{label:"业务ID:",prop:"bsID"}},[a("aui-select",{attrs:{multiple:"",placeholder:"请选择队列状态"},model:{value:e.form.bsID,callback:function(t){e.$set(e.form,"bsID",t)},expression:"form.bsID"}},e._l(e.bsIDList,function(e){return a("aui-option",{key:e.BsID,attrs:{label:e.BsID+"-"+e.BsName,value:e.BsID,disabled:e.disabled}})}))],1)],1)],1)],1)],1),e._v(" "),a("aui-row",{staticStyle:{margin:"20px 0","text-align":"right"}},[a("aui-button",{attrs:{size:"mini"},on:{click:function(t){e.option.isShow=!1}}},[e._v("返回")]),e._v(" "),a("aui-button",{attrs:{type:"primary",size:"mini"},on:{click:e.ItemUpdate}},[e._v("确定")])],1)],1)])],1)},staticRenderFns:[]};var T=a("/Xao")(y,w,!1,function(e){a("EuZe")},null,null).exports,D=a("0VOF"),S=function e(){l()(this,e),this.data={Brno:"",OperTp:"D",QueueTpID:""},this.CommCode="CQParaManage",this.SceneCode="BrachQuCfgMnt",this.TransServiceCode="mg-afaservices-cq/orgQueueManage"},I=a("D6TH"),_={name:"orgQueueManage",components:{selectTree:o.a},data:function(){return{ruleTypeMap:{"01":"叫号规则","02":"排队机界面"},currentRow:[],QueryForm:{branchNum:[],queueId:""},brnoList:[],branchNum:[],stateMap:{},transferMap:{},total:void 0,busiTypeList:[],brnoMap:{},permission:{},loading:!1,isDisabledDel:!1,dialogList:{dialogAdd:f,takeNumRule:T},dialogOptions:{isShow:!1},dialogTakeNumOptions:{isShow:!1},currentPage:1,pageSize:void 0,rules:{branchNum:[{type:"array",required:!0,message:"请选择机构编号",trigger:"change"}]}}},created:function(){this.pageSize=n.a.get("PageSize"),this.stateMap=n.a.get("state"),this.transferMap=n.a.get("transferFlag"),this.queryBranchNum()},watch:{QueryForm:{handler:function(e,t){this.currentPage=1},deep:!0}},computed:{},methods:{queryBranchNum:function(){var e=this;this.loading=!0;var t=new D.a;t.data.orgno=this.$store.getters.BranchNum,Object(i.a)(t).then(function(t){e.loading=!1,e.branchNum=t.RspInfo.Result||[],e.brnoMap=t.RspInfo.orgMap||{},e.permission=r.a.objArray2Hash(e.branchNum,"orgno"),e.brnoList=r.a.formatTreeData(e.branchNum,"orgno","superno"),e.QueryForm.branchNum.push(e.brnoList[0].orgno)}).catch(function(t){e.loading=!1,e.$aui.message.show({type:"warning",message:t.SYS_HEAD.ReturnMessage}),console.error("查询错误",t)})},dataFormat:function(e,t){return"Brno"==t.property?e[t.property]+"-"+e.BrName:"QueueTpStatus"==t.property?this.stateMap[e[t.property]]:"TransferFlag"==t.property?this.transferMap[e[t.property]]:void 0},clickAdd:function(){this.dialogOptions.isShow=!0,this.dialogOptions.title="新增机构队列",this.dialogOptions.mark="1",this.dialogOptions.isDisabled=!1,this.dialogOptions.branchNum=this.brnoList},clickUpdate:function(){this.dialogOptions.isShow=!0,this.dialogOptions.title="修改机构队列",this.dialogOptions.mark="2",this.dialogOptions.isDisabled=!0,this.dialogOptions.currentRow=this.currentRow,this.dialogOptions.branchNum=this.brnoList},checkPermission:function(e){this.permission[this.currentRow.Brno]?"1"==e?this.clickUpdate():"2"==e?this.takeNumRule():this.delBut():this.$aui.message.show({type:"warning",message:"权限不足,无法修改！"})},takeNumRule:function(){this.dialogTakeNumOptions.branchNum=this.branchNum,this.dialogTakeNumOptions.currentRow=this.currentRow,this.dialogTakeNumOptions.isShow=!0},resetForm:function(){this.busiTypeList=[],this.currentPage=1,this.total=0,this.$refs.QueryForm.resetFields()},delBut:function(){var e=this;this.$aui.confirm.show("此操作将永久删除该机构队列, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.orgQueueDel()}).catch(function(){e.$aui.message.show({type:"info",message:"已取消删除"})})},orgQueueDel:function(){var e=this;this.loading=!0;var t=new S;t.data.Brno=this.currentRow.Brno,t.data.QueueTpID=this.currentRow.QueueTpID,Object(i.a)(t).then(function(t){e.loading=!1,e.$aui.message.show({type:"success",message:"业务类型删除成功！"}),e.currentPage=1,e.query()}).catch(function(t){e.$aui.message.show({type:"warning",message:t.SYS_HEAD.ReturnMessage}),e.loading=!1,console.log(t)})},query:function(){var e=this;this.$refs.QueryForm.validate(function(t){if(t){e.loading=!0;var a=new I.a;a.data.Brno=e.QueryForm.branchNum[0],a.data.QueueTpID=e.QueryForm.queueId,a.data.PageSize=e.pageSize+"",a.data.CurtPage=e.currentPage+"",a.data.StartRows=(e.currentPage-1)*e.pageSize+"",Object(i.a)(a).then(function(t){e.loading=!1,e.busiTypeList=t.RspInfo.Result||[],e.total=t.RspInfo.totalNum||0,"0"===e.total&&e.$aui.message.show({type:"warning",message:"无满足条件的记录！"})}).catch(function(t){e.busiTypeList=[],e.total=0,e.$aui.message.show({type:"warning",message:"请求失败，错误码:"+t.SYS_HEAD.ReturnCode+"，错误信息："+t.SYS_HEAD.ReturnMessage}),e.loading=!1})}})},handleCurrentChange:function(e){this.currentPage=e,this.query()},selectList:function(e){1==e.length?(this.isDisabledDel=!0,this.currentRow=e[0]):e.length>1?this.$refs.busiTypeList.toggleRowSelection(e[0]):this.isDisabledDel=!1}}},Q={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"加载中。。。"}},[a("aui-card",[a("aui-form",{ref:"QueryForm",attrs:{model:e.QueryForm,rules:e.rules,size:"mini","label-position":"top"}},[a("aui-row",{attrs:{gutter:10}},[a("aui-col",{attrs:{lg:4,md:6}},[a("aui-form-item",{attrs:{label:"机构编号",prop:"branchNum"}},[a("select-tree",{staticStyle:{width:"170px"},attrs:{"single-check":!0,props:{id:"orgno",label:"cname",children:"children"},"tree-data":e.brnoList,placeholder:"请选择机构"},model:{value:e.QueryForm.branchNum,callback:function(t){e.$set(e.QueryForm,"branchNum",t)},expression:"QueryForm.branchNum"}})],1)],1),e._v(" "),a("aui-col",{attrs:{lg:4,md:6}},[a("aui-form-item",{attrs:{label:"队列类型ID",prop:"queueId"}},[a("aui-input",{attrs:{placeholder:"队列类型ID"},model:{value:e.QueryForm.queueId,callback:function(t){e.$set(e.QueryForm,"queueId",t)},expression:"QueryForm.queueId"}})],1)],1),e._v(" "),a("aui-col",{staticClass:"searchBtnMarginTop",attrs:{lg:2,md:3}},[a("aui-button",{attrs:{type:"primary",size:"mini",icon:"aui-icon-search"},on:{click:e.query}},[e._v("查询")])],1),e._v(" "),a("aui-col",{staticClass:"searchBtnMarginTop",attrs:{lg:2,md:3}},[a("aui-button",{attrs:{type:"warning",size:"mini",icon:"aui-icon-refresh"},on:{click:function(t){e.resetForm("QueryForm")}}},[e._v("重置")])],1)],1)],1)],1),e._v(" "),a("aui-card",{staticStyle:{"margin-top":"10px"}},[a("aui-row",[a("aui-col",{attrs:{lg:2,md:3}},[e.btnPermission("Button_Menu_Add")?a("aui-button",{attrs:{type:"primary",size:"mini",disabled:e.isDisabledDel,icon:"aui-icon-plus"},on:{click:e.clickAdd}},[e._v("新增")]):e._e()],1),e._v(" "),a("aui-col",{attrs:{lg:2,md:3}},[e.btnPermission("Button_Menu_Add")?a("aui-button",{attrs:{type:"primary",disabled:!e.isDisabledDel,size:"mini",icon:"aui-icon-edit"},on:{click:function(t){e.checkPermission("1")}}},[e._v("修改")]):e._e()],1),e._v(" "),a("aui-col",{attrs:{lg:2,md:3}},[e.btnPermission("Button_Menu_Edit")?a("aui-button",{attrs:{type:"danger",disabled:!e.isDisabledDel,size:"mini",icon:"aui-icon-delete"},on:{click:function(t){e.checkPermission()}}},[e._v("删除")]):e._e()],1),e._v(" "),a("aui-col",{attrs:{lg:2,md:3}},[e.btnPermission("Button_Menu_Edit")?a("aui-button",{attrs:{type:"primary",disabled:!e.isDisabledDel,size:"mini",icon:"aui-icon-setting"},on:{click:function(t){e.checkPermission("2")}}},[e._v("取号规则配置")]):e._e()],1)],1),e._v(" "),a("aui-table",{ref:"busiTypeList",staticClass:"tableMarginTop",staticStyle:{"min-height":"390px"},attrs:{data:e.busiTypeList,border:"","header-row-class-name":"tableHeaderClass"},on:{"selection-change":e.selectList}},[a("aui-table-column",{attrs:{type:"selection",width:"40px"}}),e._v(" "),a("aui-table-column",{attrs:{prop:"Brno",formatter:e.dataFormat,label:"机构编号","min-width":"247px"}}),e._v(" "),a("aui-table-column",{attrs:{prop:"QueueTpID",label:"队列类型ID","min-width":"147px"}}),e._v(" "),a("aui-table-column",{attrs:{prop:"QueueTpName",label:"队列名称","min-width":"137px"}}),e._v(" "),a("aui-table-column",{attrs:{prop:"QueueTpPreLetter",label:"队列前缀字母","min-width":"107px"}}),e._v(" "),a("aui-table-column",{attrs:{prop:"QueueTpPreNum",label:"队列前缀数字","min-width":"107px"}}),e._v(" "),a("aui-table-column",{attrs:{prop:"QueueTpStatus",formatter:e.dataFormat,label:"队列状态","min-width":"107px"}}),e._v(" "),a("aui-table-column",{attrs:{prop:"QueueTpPrty",label:"队列优先级","min-width":"107px"}})],1),e._v(" "),a("div",{staticStyle:{"text-align":"right","margin-top":"10px"}},[a("aui-pagination",{attrs:{background:"","current-page":e.currentPage,"page-size":10,layout:"total, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange}})],1)],1)],1),e._v(" "),a("keep-alive",[a(e.dialogList.dialogAdd,{tag:"component",attrs:{option:e.dialogOptions},on:{refreshTable:e.query}})],1),e._v(" "),a("keep-alive",[a(e.dialogList.takeNumRule,{tag:"component",attrs:{option:e.dialogTakeNumOptions}})],1)],1)},staticRenderFns:[]};var x=a("/Xao")(_,Q,!1,function(e){a("J5oc")},"data-v-97a2289e",null);t.default=x.exports},j1zr:function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,"",""])}});