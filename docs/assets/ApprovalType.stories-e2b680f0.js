var z=Object.defineProperty;var q=(o,t,e)=>t in o?z(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var a=(o,t,e)=>(q(o,typeof t!="symbol"?t+"":t,e),e);import{V as H}from"./vue.esm-b1e57a2f.js";import{C as J,P as n,E as h,n as K}from"./_plugin-vue2_normalizer-b11a0120.js";import{D as L}from"./DatePicker-a975d978.js";import"./Watch-62f8b699.js";import"./validation-mixin-e5d1d708.js";import"./lodash-f6b38868.js";import"./_commonjsHelpers-de833af9.js";var p=(o=>(o.VIA_COURT_ORDER="courtOrder",o.VIA_REGISTRAR="registrar",o))(p||{}),M=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,i=(o,t,e,r)=>{for(var l=r>1?void 0:r?Q(t,e):t,R=o.length-1,T;R>=0;R--)(T=o[R])&&(l=(r?T(t,e,l):T(l))||l);return r&&l&&M(t,e,l),l};let s=class extends H{constructor(){super(...arguments);a(this,"$refs");a(this,"courtOrderNumber");a(this,"approvedByRegistrar");a(this,"filingType");a(this,"isCourtOrderOnly");a(this,"noticeDate");a(this,"applicationDate");a(this,"invalidSection");a(this,"isCourtOrderRadio");a(this,"courtOrderNumberText","");a(this,"valid",!1);a(this,"approvalTypeSelected","");a(this,"noticeDateText","");a(this,"applicationDateText","");a(this,"ApprovalTypes",p);a(this,"datePickerRules",[e=>!!e||"Date is required"]);a(this,"courtOrderNumRules",[e=>!e||!/^\s/g.test(e)||"Invalid spaces",e=>!e||!/\s$/g.test(e)||"Invalid spaces",e=>!e||!(e.length<5)||"Court order number is invalid",e=>!e||!(e.length>20)||"Court order number is invalid",e=>!!e||"A Court Order number is required"])}mounted(){this.approvedByRegistrar?(this.courtOrderNumberText="",this.approvalTypeSelected=p.VIA_REGISTRAR):this.courtOrderNumber?(this.courtOrderNumberText=this.courtOrderNumber,this.approvalTypeSelected=p.VIA_COURT_ORDER):this.radioButtonChanged(""),this.isCourtOrderRadio||(this.approvalTypeSelected=p.VIA_COURT_ORDER)}validate(){if(this.approvalTypeSelected===p.VIA_COURT_ORDER){let e=this.$refs.courtNumRef.validate();return this.$emit("valid",e),e}else if(this.approvalTypeSelected===p.VIA_REGISTRAR){let e=!!this.noticeDateText&&!!this.applicationDateText;return this.$emit("valid",e),e}else return!1}emitValidationError(e){this.$emit("valid",!e)}radioButtonChanged(e){e===p.VIA_REGISTRAR?(this.courtOrderNumberText="",this.courtOrderNumberChanged("")):e===p.VIA_COURT_ORDER?(this.noticeDateChanged(""),this.applicationDateChanged(""),this.$emit("valid",!1)):this.$emit("valid",!1)}courtOrderNumberChanged(e){this.validate()}getRadioText(e){return e===p.VIA_COURT_ORDER&&this.isCourtOrderRadio?`This ${this.filingType} is approved by court order.`:e===p.VIA_COURT_ORDER&&!this.isCourtOrderRadio?"Enter a Court Order number, as the restoration of this company was ordered by the court:":e===p.VIA_REGISTRAR?`This ${this.filingType} is approved by registrar.`:"[error]"}noticeDateChanged(e){return this.noticeDateText=e,this.validate(),e}applicationDateChanged(e){return this.applicationDateText=e,this.validate(),e}};i([n({default:""})],s.prototype,"courtOrderNumber",2);i([n({default:!1})],s.prototype,"approvedByRegistrar",2);i([n({default:"restoration"})],s.prototype,"filingType",2);i([n({default:!1})],s.prototype,"isCourtOrderOnly",2);i([n({default:""})],s.prototype,"noticeDate",2);i([n({default:""})],s.prototype,"applicationDate",2);i([n({default:!1})],s.prototype,"invalidSection",2);i([n({default:!0})],s.prototype,"isCourtOrderRadio",2);i([h("radioButtonChange")],s.prototype,"radioButtonChanged",1);i([h("courtNumberChange")],s.prototype,"courtOrderNumberChanged",1);i([h("update:noticeDate")],s.prototype,"noticeDateChanged",1);i([h("update:applicationDate")],s.prototype,"applicationDateChanged",1);s=i([J({components:{DatePicker:L}})],s);var X=function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{attrs:{id:"approval-type"}},[e("v-row",{attrs:{"no-gutters":""}},[e("v-col",{staticClass:"pr-4",attrs:{cols:"12",sm:"3"}},[e("label",{class:{"error-text":t.invalidSection}},[t._v("Approval Type")])]),e("v-col",{staticClass:"mt-n4",attrs:{cols:"12",sm:"9"}},[e("v-radio-group",{staticClass:"payment-group pt-0",on:{change:t.radioButtonChanged},model:{value:t.approvalTypeSelected,callback:function(r){t.approvalTypeSelected=r},expression:"approvalTypeSelected"}},[t.isCourtOrderRadio?[e("v-radio",{staticClass:"mb-n3",attrs:{id:"court-order-radio",label:t.getRadioText(t.ApprovalTypes.VIA_COURT_ORDER),value:t.ApprovalTypes.VIA_COURT_ORDER}})]:[e("span",{staticClass:"v-label ml-2 mb-2"},[t._v(t._s(t.getRadioText(t.ApprovalTypes.VIA_COURT_ORDER)))])],e("v-form",{ref:"courtNumRef",staticClass:"mt-8 ml-2",attrs:{id:"court-num-form"},model:{value:t.valid,callback:function(r){t.valid=r},expression:"valid"}},[e("v-expand-transition",{staticClass:"pb-0 mb-0"},[t.approvalTypeSelected===t.ApprovalTypes.VIA_COURT_ORDER?e("v-text-field",{attrs:{id:"court-order-number-input",label:"Court Order Number",rules:t.courtOrderNumRules,"hide-details":"auto",filled:""},on:{input:t.courtOrderNumberChanged,"update:error":function(r){return t.emitValidationError(r)}},model:{value:t.courtOrderNumberText,callback:function(r){t.courtOrderNumberText=r},expression:"courtOrderNumberText"}}):t._e()],1)],1),t.isCourtOrderOnly?t._e():e("v-radio",{staticClass:"mb-n5 pt-2",attrs:{id:"registrar-radio",label:t.getRadioText(t.ApprovalTypes.VIA_REGISTRAR),value:t.ApprovalTypes.VIA_REGISTRAR}}),e("v-expand-transition",[t.approvalTypeSelected===t.ApprovalTypes.VIA_REGISTRAR?e("div",{attrs:{flat:""}},[e("div",{staticClass:"ml-8 mt-3"},[e("span",{staticClass:"v-label"},[t._v("Enter the date the Notice of the Application for Restoration was published in the BC Gazette: ")]),e("DatePicker",{ref:"noticeDateRef",staticClass:"mt-2",attrs:{id:"date-picker-notice",title:"Select Date",nudgeRight:150,initialValue:t.noticeDate,inputRules:t.datePickerRules},on:{emitDateSync:function(r){return t.noticeDateChanged(r)}}})],1),e("div",{staticClass:"ml-8"},[e("span",{staticClass:"v-label"},[t._v("Enter the date the Application for Restoration was mailed to the company:")]),e("DatePicker",{ref:"applicationDateRef",staticClass:"mt-2",attrs:{id:"date-picker-application",title:"Select Date",nudgeRight:150,initialValue:t.applicationDate,inputRules:t.datePickerRules},on:{emitDateSync:function(r){return t.applicationDateChanged(r)}}})],1)]):t._e()])],2)],1)],1)],1)},Y=[],F=K(s,X,Y,!1,null,"6d543a84",null,null);const Z=F.exports;F.exports.__docgenInfo={exportName:"default",displayName:"ApprovalType",description:"",tags:{},props:[{name:"courtOrderNumber",tags:{},description:"Draft court order number.",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"approvedByRegistrar",tags:{},description:"Whether approved by the registrar.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"filingType",tags:{},description:"filing name used in radio options.",type:{name:"string"},defaultValue:{func:!1,value:"'restoration'"}},{name:"isCourtOrderOnly",tags:{},description:"Show only the court order option; remove via registrar option.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"noticeDate",tags:{},description:"Draft notice date.",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"applicationDate",tags:{},description:"Draft application date.",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"invalidSection",tags:{},description:"Whether this section is invalid.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"isCourtOrderRadio",tags:{},description:"Whether the display of court order section is a radio button.",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}}],events:[{name:"valid",type:{names:["undefined"]}},{name:"radioButtonChange"},{name:"courtNumberChange"},{name:"update:noticeDate",description:`Emit the date the notice of the application for restoration was published in the BC Gazette.
Validate that a date was successfully selected.`,properties:[{type:{names:["mixed"]},name:"noticeDate",description:"is the date that was selected (if any)"}],tags:[{title:"param",type:{name:"mixed"},name:"noticeDate",description:"is the date that was selected (if any)"}]},{name:"update:applicationDate",description:`Emit the date the application for restoration was mailed to the company.
Validate that a date was successfully selected.`,properties:[{type:{names:["mixed"]},name:"applicationDate",description:"is the date that was selected (if any)"}],tags:[{title:"param",type:{name:"mixed"},name:"applicationDate",description:"is the date that was selected (if any)"}]}],sourceFiles:["/home/severin/repos/bcrs-shared-components/src/components/approval-type/ApprovalType.vue"]};const le={title:"component/ApprovalType"},d=(o,{argTypes:t})=>({props:Object.keys(t),components:{ApprovalType:Z},template:'<approval-type v-bind="$props" />'}),c=d.bind({});c.args={};const u=d.bind({});u.args={isCourtOrderOnly:!0};const m=d.bind({});m.args={filingType:"conversion to full restoration"};const v=d.bind({});v.args={approvedByRegistrar:!0};const f=d.bind({});f.args={courtOrderNumber:"99-1234567"};const y=d.bind({});y.args={approvedByRegistrar:!0,noticeDate:"2023-02-02",applicationDate:"2023-01-15"};const g=d.bind({});g.args={courtOrderNumber:"99-1234567",isExtension:!0,isCourtOrderOnly:!0,isCourtOrderRadio:!1};var O,b,C;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    ApprovalType
  },
  template: '<approval-type v-bind="$props" />' // $props comes from args below
})`,...(C=(b=c.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var _,D,A;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    ApprovalType
  },
  template: '<approval-type v-bind="$props" />' // $props comes from args below
})`,...(A=(D=u.parameters)==null?void 0:D.docs)==null?void 0:A.source}}};var V,x,S;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    ApprovalType
  },
  template: '<approval-type v-bind="$props" />' // $props comes from args below
})`,...(S=(x=m.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var E,I,N;v.parameters={...v.parameters,docs:{...(E=v.parameters)==null?void 0:E.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    ApprovalType
  },
  template: '<approval-type v-bind="$props" />' // $props comes from args below
})`,...(N=(I=v.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var $,w,k;f.parameters={...f.parameters,docs:{...($=f.parameters)==null?void 0:$.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    ApprovalType
  },
  template: '<approval-type v-bind="$props" />' // $props comes from args below
})`,...(k=(w=f.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};var B,P,U;y.parameters={...y.parameters,docs:{...(B=y.parameters)==null?void 0:B.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    ApprovalType
  },
  template: '<approval-type v-bind="$props" />' // $props comes from args below
})`,...(U=(P=y.parameters)==null?void 0:P.docs)==null?void 0:U.source}}};var j,G,W;g.parameters={...g.parameters,docs:{...(j=g.parameters)==null?void 0:j.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    ApprovalType
  },
  template: '<approval-type v-bind="$props" />' // $props comes from args below
})`,...(W=(G=g.parameters)==null?void 0:G.docs)==null?void 0:W.source}}};const de=["Default","defaultCourtOrderOnly","conversionToFullRestoration","draftViaRegistrar","draftViaCourtOrder","draftViaRegistrarWithDates","draftExtensionWithCourtOrder"];export{c as Default,de as __namedExportsOrder,m as conversionToFullRestoration,le as default,u as defaultCourtOrderOnly,g as draftExtensionWithCourtOrder,f as draftViaCourtOrder,v as draftViaRegistrar,y as draftViaRegistrarWithDates};
//# sourceMappingURL=ApprovalType.stories-e2b680f0.js.map
