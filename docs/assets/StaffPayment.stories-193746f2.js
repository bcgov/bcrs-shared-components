var O=Object.defineProperty;var S=(n,t,e)=>t in n?O(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var i=(n,t,e)=>(S(n,typeof t!="symbol"?t+"":t,e),e);import{V as h}from"./vue.esm-b1e57a2f.js";import{C as F,P as p,E as N,n as D}from"./_plugin-vue2_normalizer-b11a0120.js";import{W as c}from"./Watch-62f8b699.js";import{F as _}from"./FolioNumberInput-9cd9fa5e.js";var o=(n=>(n[n.NONE=-1]="NONE",n[n.NO_FEE=0]="NO_FEE",n[n.FAS=1]="FAS",n[n.BCOL=2]="BCOL",n))(o||{}),C=Object.defineProperty,g=Object.getOwnPropertyDescriptor,r=(n,t,e,a)=>{for(var l=a>1?void 0:a?g(t,e):t,m=n.length-1,f;m>=0;m--)(f=n[m])&&(l=(a?f(t,e,l):f(l))||l);return a&&l&&C(t,e,l),l};let s=class extends h{constructor(){super(...arguments);i(this,"$refs");i(this,"StaffPaymentOptions",o);i(this,"displaySideLabel");i(this,"displayPriorityCheckbox");i(this,"validate");i(this,"invalidSection");i(this,"staffPaymentData");i(this,"paymentOption",o.NONE);i(this,"fasFormValid",!1);i(this,"bcolFormValid",!1);i(this,"isMounted",!1);i(this,"routingSlipNumberRules",[e=>!!e||"Enter FAS Routing Slip Number",e=>/^\d{9}$/.test(e)||"Routing Slip Number must be 9 digits"]);i(this,"bcolAccountNumberRules",[e=>!!e||"Enter BC Online Account Number",e=>/^\d{6}$/.test(e)||"BC Online Account Number must be 6 digits"]);i(this,"datNumberRules",[e=>!!e||"Enter DAT Number",e=>/^[A-Z]{1}[0-9]{7,9}$/.test(e)||"DAT Number must be in standard format (eg, C1234567)"])}async mounted(){await this.$nextTick(),this.isMounted=!0}onPaymentOptionChanged(e){switch(e){case o.FAS:this.$refs.bcolForm.resetValidation(),this.$refs.folioNumberInputRef.resetFolioNumberValidation(),this.$refs.fasForm.validate(),this.emitStaffPaymentData({option:o.FAS});break;case o.BCOL:this.$refs.fasForm.resetValidation(),this.$refs.bcolForm.validate(),this.emitStaffPaymentData({option:o.BCOL});break;case o.NO_FEE:this.$refs.fasForm.resetValidation(),this.$refs.bcolForm.resetValidation(),this.$refs.folioNumberInputRef.resetFolioNumberValidation(),this.emitStaffPaymentData({option:o.NO_FEE,isPriority:!1});break}}onFasFormValid(e){this.isMounted&&this.emitValid()}onBcolFormValid(e){this.isMounted&&this.emitValid()}async onStaffPaymentDataChanged(e){this.paymentOption=e.option,await this.$nextTick(),this.emitValid()}emitStaffPaymentData({option:e=this.staffPaymentData.option,routingSlipNumber:a=this.staffPaymentData.routingSlipNumber||"",bcolAccountNumber:l=this.staffPaymentData.bcolAccountNumber||"",datNumber:m=this.staffPaymentData.datNumber||"",folioNumber:f=this.staffPaymentData.folioNumber||"",isPriority:d=this.staffPaymentData.isPriority||!1}){switch(e){case o.FAS:return{option:e,routingSlipNumber:a,isPriority:d};case o.BCOL:return{option:e,bcolAccountNumber:l,datNumber:m,folioNumber:f,isPriority:d};case o.NO_FEE:return{option:e}}}emitValid(){return this.fasFormValid||this.bcolFormValid&&this.$refs.folioNumberInputRef.validateFolioNumber()||this.staffPaymentData.option===o.NO_FEE}};r([p({default:!0})],s.prototype,"displaySideLabel",2);r([p({default:!0})],s.prototype,"displayPriorityCheckbox",2);r([p({default:!1})],s.prototype,"validate",2);r([p({default:!1})],s.prototype,"invalidSection",2);r([p({default:()=>({option:o.NONE,routingSlipNumber:null,bcolAccountNumber:null,datNumber:null,folioNumber:null,isPriority:!1})})],s.prototype,"staffPaymentData",2);r([c("paymentOption")],s.prototype,"onPaymentOptionChanged",1);r([c("fasFormValid")],s.prototype,"onFasFormValid",1);r([c("bcolFormValid")],s.prototype,"onBcolFormValid",1);r([c("staffPaymentData",{deep:!0,immediate:!0})],s.prototype,"onStaffPaymentDataChanged",1);r([N("update:staffPaymentData")],s.prototype,"emitStaffPaymentData",1);r([N("valid")],s.prototype,"emitValid",1);s=r([F({components:{FolioNumberInput:_}})],s);var E=function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{attrs:{id:"staff-payment-container"}},[e("v-row",{attrs:{"no-gutters":""}},[t.displaySideLabel?e("v-col",{staticClass:"pr-4 pb-4",attrs:{cols:"12",sm:"3"}},[e("label",{staticClass:"title-label",class:{"error-text":t.invalidSection}},[t._v("Payment")])]):t._e(),e("v-col",{attrs:{cols:"12",sm:t.displaySideLabel?9:12}},[e("v-radio-group",{staticClass:"payment-group",model:{value:t.paymentOption,callback:function(a){t.paymentOption=a},expression:"paymentOption"}},[e("v-radio",{staticClass:"mb-0",attrs:{id:"fas-radio",label:"Cash or Cheque",value:t.StaffPaymentOptions.FAS}}),e("v-form",{ref:"fasForm",staticClass:"mt-4 ml-8",model:{value:t.fasFormValid,callback:function(a){t.fasFormValid=a},expression:"fasFormValid"}},[e("v-text-field",{attrs:{id:"routing-slip-number-textfield",filled:"",label:"Routing Slip Number",value:t.staffPaymentData.routingSlipNumber,rules:t.validate?t.routingSlipNumberRules:[],disabled:t.paymentOption===t.StaffPaymentOptions.BCOL||t.paymentOption===t.StaffPaymentOptions.NO_FEE},on:{keyup:function(a){t.staffPaymentData.routingSlipNumber=t.staffPaymentData.routingSlipNumber.trim()},focus:function(a){t.paymentOption=t.StaffPaymentOptions.FAS},input:function(a){return t.emitStaffPaymentData({option:t.StaffPaymentOptions.FAS,routingSlipNumber:a})}}})],1),e("v-radio",{staticClass:"mb-0 pt-2",attrs:{id:"bcol-radio",label:"BC Online",value:t.StaffPaymentOptions.BCOL}}),e("v-form",{ref:"bcolForm",staticClass:"mt-4 ml-8",model:{value:t.bcolFormValid,callback:function(a){t.bcolFormValid=a},expression:"bcolFormValid"}},[e("v-text-field",{attrs:{id:"bcol-account-number-textfield",filled:"",label:"BC Online Account Number",value:t.staffPaymentData.bcolAccountNumber,rules:t.validate?t.bcolAccountNumberRules:[],disabled:t.paymentOption===t.StaffPaymentOptions.FAS||t.paymentOption===t.StaffPaymentOptions.NO_FEE},on:{keyup:function(a){t.staffPaymentData.bcolAccountNumber=t.staffPaymentData.bcolAccountNumber.trim()},focus:function(a){t.paymentOption=t.StaffPaymentOptions.BCOL},input:function(a){return t.emitStaffPaymentData({option:t.StaffPaymentOptions.BCOL,bcolAccountNumber:a})}}}),e("v-text-field",{attrs:{id:"dat-number-textfield",filled:"",label:"DAT Number",value:t.staffPaymentData.datNumber,rules:t.validate?t.datNumberRules:[],disabled:t.paymentOption===t.StaffPaymentOptions.FAS||t.paymentOption===t.StaffPaymentOptions.NO_FEE},on:{keyup:function(a){t.staffPaymentData.datNumber=t.staffPaymentData.datNumber.trim()},focus:function(a){t.paymentOption=t.StaffPaymentOptions.BCOL},input:function(a){return t.emitStaffPaymentData({option:t.StaffPaymentOptions.BCOL,datNumber:a})}}}),e("FolioNumberInput",{ref:"folioNumberInputRef",attrs:{folioNumber:t.staffPaymentData.folioNumber,disabled:t.paymentOption===t.StaffPaymentOptions.FAS||t.paymentOption===t.StaffPaymentOptions.NO_FEE,validate:"true"},on:{focus:function(a){t.paymentOption=t.StaffPaymentOptions.BCOL},emitFolioNumber:function(a){t.paymentOption===t.StaffPaymentOptions.BCOL&&t.emitStaffPaymentData({option:t.StaffPaymentOptions.BCOL,folioNumber:a})}}})],1),e("v-radio",{staticClass:"mb-0 pt-2",attrs:{id:"no-fee-radio",label:"No Fee",value:t.StaffPaymentOptions.NO_FEE}}),t.displayPriorityCheckbox?[e("v-divider",{staticClass:"mt-6"}),e("v-checkbox",{staticClass:"priority-checkbox mt-6 pt-0",attrs:{id:"priority-checkbox",label:"Priority (add $100.00)","hide-details":"","input-value":t.staffPaymentData.isPriority,disabled:t.paymentOption===t.StaffPaymentOptions.NO_FEE},on:{change:function(a){return t.emitStaffPaymentData({isPriority:!!a})}}})]:t._e()],2)],1)],1)],1)},V=[],v=D(s,E,V,!1,null,"5f730265",null,null);const A=v.exports;v.exports.__docgenInfo={exportName:"default",displayName:"StaffPayment",description:"",tags:{},props:[{name:"displaySideLabel",tags:{},description:"Whether to display side label.",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"displayPriorityCheckbox",tags:{},description:"Whether to display priority checkbox.",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"validate",tags:{},description:"Whether to validate the fields.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"invalidSection",tags:{},description:"Whether to show invalid section styling (label only).",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"staffPaymentData",tags:{},description:"Staff Payment Data prop.",type:{name:"StaffPaymentIF"},defaultValue:{func:!0,value:`() => {
  return {
    option: StaffPaymentOptions.NONE,
    routingSlipNumber: null,
    bcolAccountNumber: null,
    datNumber: null,
    folioNumber: null,
    isPriority: false
  }
}`}}],events:[{name:"update:staffPaymentData",description:"Emits an event to update the Staff Payment Data prop."},{name:"valid",description:"Emits an event indicating whether or not this component is valid."}],sourceFiles:["/Users/dev/Downloads/Data/Projects/BC/Relationship/bcrs-shared-components/src/components/staff-payment/StaffPayment.vue"]};const T={title:"component/StaffPayment"},x=(n,{argTypes:t})=>({props:Object.keys(t),components:{StaffPayment:A},template:'<staff-payment v-bind="$props" />'}),$={option:o.NONE,routingSlipNumber:null,bcolAccountNumber:null,datNumber:null,folioNumber:null,isPriority:!1},u=x.bind({});u.args={staffPaymentData:$};var y,b,P;u.parameters={...u.parameters,docs:{...(y=u.parameters)==null?void 0:y.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    StaffPayment
  },
  template: '<staff-payment v-bind="$props" />' // $props comes from args below
})`,...(P=(b=u.parameters)==null?void 0:b.docs)==null?void 0:P.source}}};const W=["Default"];export{u as Default,W as __namedExportsOrder,T as default};
//# sourceMappingURL=StaffPayment.stories-193746f2.js.map
