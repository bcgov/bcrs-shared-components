var V=Object.defineProperty;var h=(i,a,t)=>a in i?V(i,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[a]=t;var o=(i,a,t)=>(h(i,typeof a!="symbol"?a+"":a,t),t);import{V as D}from"./vue.esm-b1e57a2f.js";import{C as P,P as s,E as b,n as x}from"./_plugin-vue2_normalizer-b11a0120.js";import{W as O}from"./Watch-62f8b699.js";var w=Object.defineProperty,L=Object.getOwnPropertyDescriptor,l=(i,a,t,n)=>{for(var r=n>1?void 0:n?L(a,t):a,p=i.length-1,d;p>=0;p--)(d=i[p])&&(r=(n?d(a,t,r):d(r))||r);return n&&r&&w(a,t,r),r};let e=class extends D{constructor(){super(...arguments);o(this,"contactLabel");o(this,"contactValue");o(this,"showCustodianEmail");o(this,"custodianEmail");o(this,"additionalLabel");o(this,"additionalValue");o(this,"showCompletingParty");o(this,"editableCompletingParty");o(this,"completingPartyEmail");o(this,"documentOptionalEmail");o(this,"invalidSection");o(this,"optionalEmail","");o(this,"entityEmailRules",[t=>!/^\s/g.test(t)||"Invalid spaces",t=>!/\s$/g.test(t)||"Invalid spaces",t=>this.validateEmailFormat(t)||"Enter valid email address"])}mounted(){this.optionalEmail=this.documentOptionalEmail}validateEmailFormat(t){return t?new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(t):!0}onOptionalEmailChanged(t){this.validateEmailFormat(t)?(this.emitOptionalEmail(),this.emitValid(!0)):this.emitValid(!1)}emitOptionalEmail(){return this.optionalEmail}emitValid(t){return t}};l([s({required:!0})],e.prototype,"contactLabel",2);l([s({default:null})],e.prototype,"contactValue",2);l([s({default:!1})],e.prototype,"showCustodianEmail",2);l([s({default:null})],e.prototype,"custodianEmail",2);l([s({default:null})],e.prototype,"additionalLabel",2);l([s({default:null})],e.prototype,"additionalValue",2);l([s({default:!0})],e.prototype,"showCompletingParty",2);l([s({default:!1})],e.prototype,"editableCompletingParty",2);l([s({default:null})],e.prototype,"completingPartyEmail",2);l([s({default:null})],e.prototype,"documentOptionalEmail",2);l([s({default:!1})],e.prototype,"invalidSection",2);l([O("optionalEmail")],e.prototype,"onOptionalEmailChanged",1);l([b("update:optionalEmail")],e.prototype,"emitOptionalEmail",1);l([b("valid")],e.prototype,"emitValid",1);e=l([P({})],e);var A=function(){var a=this,t=a._self._c;return a._self._setupProxy,t("div",{attrs:{id:"document-delivery"}},[t("v-row",{attrs:{"no-gutters":""}},[t("v-col",{staticClass:"pr-4",attrs:{cols:"12",sm:"3"}},[t("label",{staticClass:"title-label"},[a._v(a._s(a.contactLabel))])]),t("v-col",{attrs:{cols:"12",sm:"9"}},[t("span",{attrs:{id:"contact-value"}},[a._v(a._s(a.contactValue||"(Not entered)"))])])],1),a.showCustodianEmail?t("v-row",{staticClass:"pt-5",attrs:{"no-gutters":""}},[t("v-col",{staticClass:"pr-4",attrs:{cols:"12",sm:"3"}},[t("label",{staticClass:"title-label"},[a._v("Custodian of Records")])]),t("v-col",{attrs:{cols:"12",sm:"9"}},[t("span",{attrs:{id:"custodian-email"}},[a._v(a._s(a.custodianEmail||"(Not entered)"))])])],1):a._e(),a.additionalLabel?t("v-row",{staticClass:"pt-5",attrs:{"no-gutters":""}},[t("v-col",{staticClass:"pr-4",attrs:{cols:"12",sm:"3"}},[t("label",{staticClass:"title-label"},[a._v(a._s(a.additionalLabel))])]),t("v-col",{attrs:{cols:"12",sm:"9"}},[t("span",{attrs:{id:"additional-value"}},[a._v(a._s(a.additionalValue||"(Not entered)"))])])],1):a._e(),a.showCompletingParty?t("v-row",{staticClass:"pt-5",attrs:{"no-gutters":""}},[t("v-col",{staticClass:"pr-4",attrs:{cols:"12",sm:"3"}},[t("label",{staticClass:"title-label",class:{"error-text":a.invalidSection}},[a._v(" Completing Party ")])]),a.editableCompletingParty?t("v-col",{attrs:{cols:"12",sm:"9"}},[t("v-text-field",{staticClass:"text-input-field",attrs:{id:"optionalEmail",filled:"","persistent-hint":"","validate-on-blur":"",label:"Client Email Address (Optional)",hint:"Example: name@email.com",rules:a.entityEmailRules},model:{value:a.optionalEmail,callback:function(n){a.optionalEmail=n},expression:"optionalEmail"}})],1):t("v-col",{attrs:{cols:"12",sm:"9"}},[t("span",{attrs:{id:"completing-party-email"}},[a._v(a._s(a.completingPartyEmail||"(Not entered)"))])])],1):a._e()],1)},S=[],E=x(e,A,S,!1,null,"c47bce0d",null,null);const $=E.exports;E.exports.__docgenInfo={exportName:"default",displayName:"DocumentDelivery",description:"",tags:{},props:[{name:"contactLabel",tags:{},type:{name:"string"},required:!0},{name:"contactValue",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"showCustodianEmail",tags:{},type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"custodianEmail",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"additionalLabel",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"additionalValue",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"showCompletingParty",tags:{},type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"editableCompletingParty",tags:{},type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"completingPartyEmail",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"documentOptionalEmail",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"invalidSection",tags:{},description:"Whether to display invalid section styling.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"update:optionalEmail"},{name:"valid"}],sourceFiles:["C:/Users/kjazzar/Downloads/repos/bcrs-shared-components/src/components/document-delivery/DocumentDelivery.vue"]};const z={title:"component/DocumentDelivery"},C=(i,{argTypes:a})=>({props:Object.keys(a),components:{DocumentDelivery:$},template:'<document-delivery v-bind="$props" />'}),m=C.bind({});m.args={contactLabel:"Contact",contactValue:"contact@example.com",editableCompletingParty:!1,completingPartyEmail:"completing.party@example.com",showCustodianEmail:!0,custodianEmail:"custodian@example.com",additionalLabel:"Additional",additionalValue:"additional1@example.com, additional2@example.com",invalidSection:!1};const c=C.bind({});c.args={contactLabel:"Contact",contactValue:"contact@example.com",editableCompletingParty:!0,documentOptionalEmail:"optional@example.com",showCustodianEmail:!0,custodianEmail:"custodian@example.com",additionalLabel:"Additional",additionalValue:"additional1@example.com, additional2@example.com",invalidSection:!1};var u,v,f;m.parameters={...m.parameters,docs:{...(u=m.parameters)==null?void 0:u.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    DocumentDelivery
  },
  template: '<document-delivery v-bind="$props" />' // $props comes from args below
})`,...(f=(v=m.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var y,g,_;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    DocumentDelivery
  },
  template: '<document-delivery v-bind="$props" />' // $props comes from args below
})`,...(_=(g=c.parameters)==null?void 0:g.docs)==null?void 0:_.source}}};const I=["Default","EditableCompletingParty"];export{m as Default,c as EditableCompletingParty,I as __namedExportsOrder,z as default};
//# sourceMappingURL=DocumentDelivery.stories-81a3b4f5.js.map
