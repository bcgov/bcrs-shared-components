var W=Object.defineProperty;var Y=(r,t,e)=>t in r?W(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var n=(r,t,e)=>(Y(r,typeof t!="symbol"?t+"":t,e),e);import{V as x}from"./vue.esm-b1e57a2f.js";import{c as z,E as l,C as R,P as s,n as q,m as G}from"./_plugin-vue2_normalizer-b11a0120.js";import{W as v}from"./Watch-62f8b699.js";import{C as V,G as O}from"./corp-type-module-8edd1173.js";import{C as K}from"./ConfirmDialog-428577e9.js";import{N as Z}from"./validation-mixin-d9f633af.js";import"./lodash-f6b38868.js";import"./_commonjsHelpers-de833af9.js";function H(r){return typeof r!="function"||!r.managed&&!r.managedReactive}function J(r){var t=function(){var e=this,a=typeof r=="function"?r.call(this):r;a=Object.create(a||null),a[g]=Object.create(this[g]||{});for(var o in t.managed)a[t.managed[o]]=this[o];var i=function(T){a[t.managedReactive[T]]=m[T],Object.defineProperty(a[g],t.managedReactive[T],{enumerable:!0,configurable:!0,get:function(){return e[T]}})},m=this;for(var o in t.managedReactive)i(o);return a};return t.managed={},t.managedReactive={},t}var g="__reactiveInject__";function Q(r){Array.isArray(r.inject)||(r.inject=r.inject||{},r.inject[g]={from:g,default:{}})}function S(r){return z(function(t,e){var a=t.provide;Q(t),H(a)&&(a=t.provide=J(a)),a.managed[e]=r||e})}var _=(r=>(r.CORRECT_NAME="correct-name",r.CORRECT_NAME_TO_NUMBER="correct-name-to-number",r.CORRECT_NEW_NR="correct-new-nr",r))(_||{}),X=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,h=(r,t,e,a)=>{for(var o=a>1?void 0:a?ee(t,e):t,i=r.length-1,m;i>=0;i--)(m=r[i])&&(o=(a?m(t,e,o):m(o))||o);return a&&o&&X(t,e,o),o};let d=class extends x{constructor(){super(...arguments);n(this,"$refs");n(this,"companyName");n(this,"formType");n(this,"validate");n(this,"formValid",!1);n(this,"textfield","")}get companyNameRules(){return[e=>!!e||" A company name is required",e=>e!==this.companyName||" Enter a new company name"]}onCompanyNameChanged(e){this.textfield=e}onSubmit(){this.formType===_.CORRECT_NAME&&(this.emitCompanyName(this.textfield),this.emitSaved(!0))}onValidate(e){e?this.$refs.form.validate():this.$refs.form.resetValidation()}emitValid(){return this.formValid}emitSaved(e){}emitCompanyName(e){}};h([s({required:!0})],d.prototype,"companyName",2);h([s({required:!0})],d.prototype,"formType",2);h([s({required:!0})],d.prototype,"validate",2);h([S()],d.prototype,"formValid",2);h([S()],d.prototype,"textfield",2);h([v("companyName",{immediate:!0})],d.prototype,"onCompanyNameChanged",1);h([v("formType")],d.prototype,"onSubmit",1);h([v("validate")],d.prototype,"onValidate",1);h([v("formValid"),l("valid")],d.prototype,"emitValid",1);h([l("saved")],d.prototype,"emitSaved",1);h([l("update:companyName")],d.prototype,"emitCompanyName",1);d=h([R({})],d);var te=function(){var t=this,e=t._self._c;return t._self._setupProxy,e("v-form",{ref:"form",attrs:{id:"correct-company-name-form"},model:{value:t.formValid,callback:function(a){t.formValid=a},expression:"formValid"}},[e("v-row",{attrs:{"no-gutters":""}},[e("v-col",[e("v-text-field",{staticClass:"mb-n3",attrs:{id:"company-name-textfield",filled:"",rules:t.companyNameRules},model:{value:t.textfield,callback:function(a){t.textfield=a},expression:"textfield"}})],1)],1)],1)},ae=[],F=q(d,te,ae,!1,null,null,null,null);const D=F.exports;F.exports.__docgenInfo={exportName:"default",displayName:"CorrectCompanyName",description:"",tags:{},props:[{name:"companyName",tags:{},type:{name:"string"},required:!0},{name:"formType",tags:{},type:{name:"CorrectNameOptions"},required:!0},{name:"validate",tags:{},type:{name:"boolean"},required:!0}],events:[{name:"saved",description:"Inform parent that the process is complete."},{name:"update:companyName",description:"Inform parent of updated company name."}],sourceFiles:["/home/kdeodhar/gitRepo/bcrs-shared-components/src/components/correct-name/CorrectCompanyName.vue"]};var re=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,N=(r,t,e,a)=>{for(var o=a>1?void 0:a?ne(t,e):t,i=r.length-1,m;i>=0;i--)(m=r[i])&&(o=(a?m(t,e,o):m(o))||o);return a&&o&&re(t,e,o),o};let y=class extends x{constructor(){super(...arguments);n(this,"$refs");n(this,"businessId");n(this,"entityType");n(this,"formType");n(this,"validate");n(this,"checkbox",!1);n(this,"formValid",!1)}get numberedName(){var a;const e=((a=this.businessId)==null?void 0:a.substring(2))||"Unknown";switch(this.entityType){case V.BC_ULC_COMPANY:return`${e} B.C. UNLIMITED LIABILITY COMPANY`;case V.BC_CCC:return`${e} B.C. COMMUNITY CONTRIBUTION COMPANY LTD.`;default:return`${e} B.C. LTD.`}}onSubmit(){this.formType===_.CORRECT_NAME_TO_NUMBER&&(this.emitCompanyName(this.numberedName),this.emitSaved(!0))}onValidate(e){e?this.$refs.form.validate():this.$refs.form.resetValidation()}emitValid(){return this.formValid}emitSaved(e){}emitCompanyName(e){}};N([s({required:!0})],y.prototype,"businessId",2);N([s({required:!0})],y.prototype,"entityType",2);N([s({required:!0})],y.prototype,"formType",2);N([s({required:!0})],y.prototype,"validate",2);N([v("formType")],y.prototype,"onSubmit",1);N([v("validate")],y.prototype,"onValidate",1);N([v("formValid"),l("valid")],y.prototype,"emitValid",1);N([l("saved")],y.prototype,"emitSaved",1);N([l("update:companyName")],y.prototype,"emitCompanyName",1);y=N([R({})],y);var oe=function(){var t=this,e=t._self._c;return t._self._setupProxy,e("v-form",{ref:"form",attrs:{id:"correct-name-to-number-form"},model:{value:t.formValid,callback:function(a){t.formValid=a},expression:"formValid"}},[e("v-row",{attrs:{"no-gutters":""}},[e("v-col",[e("v-checkbox",{staticClass:"mb-n5",attrs:{id:"correct-name-to-number-checkbox",label:`Change the company name to ${t.numberedName}`,rules:[a=>a]},model:{value:t.checkbox,callback:function(a){t.checkbox=a},expression:"checkbox"}})],1)],1)],1)},ie=[],j=q(y,oe,ie,!1,null,"d115bbb7",null,null);const M=j.exports;j.exports.__docgenInfo={exportName:"default",displayName:"CorrectNameToNumber",description:"",tags:{},props:[{name:"businessId",tags:{},type:{name:"string"},required:!0},{name:"entityType",tags:{},type:{name:"CorpTypeCd"},required:!0},{name:"formType",tags:{},type:{name:"CorrectNameOptions"},required:!0},{name:"validate",tags:{},type:{name:"boolean"},required:!0}],events:[{name:"saved",description:"Inform parent that the process is complete."},{name:"update:companyName",description:"Inform parent of updated company name."}],sourceFiles:["/home/kdeodhar/gitRepo/bcrs-shared-components/src/components/correct-name/CorrectNameToNumber.vue"]};var se=Object.defineProperty,me=Object.getOwnPropertyDescriptor,f=(r,t,e,a)=>{for(var o=a>1?void 0:a?me(t,e):t,i=r.length-1,m;i>=0;i--)(m=r[i])&&(o=(a?m(t,e,o):m(o))||o);return a&&o&&se(t,e,o),o};let c=class extends G(Z){constructor(){super(...arguments);n(this,"$refs");n(this,"businessId");n(this,"entityType");n(this,"fetchAndValidateNr");n(this,"formType");n(this,"nameRequest");n(this,"validate");n(this,"applicantEmail","");n(this,"applicantPhone","");n(this,"formValid",!1);n(this,"nrNumber","");n(this,"nrNumRules",[e=>!!e||"Name Request Number is required",e=>this.isValidNrNumber(e)||"Name Request Number is invalid"]);n(this,"phoneRules",[e=>!/^\s/g.test(e)||"Invalid spaces",e=>!/\s$/g.test(e)||"Invalid spaces",e=>!((e==null?void 0:e.length)>12)||"Phone number is invalid"]);n(this,"emailRules",[e=>!/^\s/g.test(e)||"Invalid spaces",e=>!/\s$/g.test(e)||"Invalid spaces",e=>this.isValidEmail(e)||"Email is invalid"])}get componentValid(){return this.formValid&&!!this.nrNumber&&(!!this.applicantPhone||!!this.applicantEmail)}isValidNrNumber(e){return new RegExp(/^(NR )\d{7}$/).test(e)}isValidEmail(e){return(e==null?void 0:e.length)<1||this.applicantPhone&&e?!0:new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(e)}async onSubmit(){if(this.formType===_.CORRECT_NEW_NR)try{const e=await this.fetchAndValidateNr(this.nrNumber,this.businessId,this.applicantPhone,this.applicantEmail);if(this.entityType!==e.legalType){this.$refs.form.resetValidation(),this.emitSaved(!1);const a=O(e.legalType),o=O(this.entityType),i=`<p class="info-text">This ${a} Name Request does not match the current business type <b>${o}</b>.

The Name Request type must match the business type before you can continue.</p>`;await this.showConfirmDialog(this.$refs.confirm,"Name Request Type Does Not Match Business Type",i)}else this.emitNameRequest(e),this.emitCompanyName(this.getNrApprovedName(e)),this.emitSaved(!0)}catch(e){alert(e.message),this.$refs.form.resetValidation(),this.emitSaved(!1)}}onValidate(e){e?this.$refs.form.validate():this.$refs.form.resetValidation()}emitValid(){return this.componentValid}emitSaved(e){}emitCompanyName(e){}emitNameRequest(e){}async showConfirmDialog(e,a,o){return e.open(a,o,{width:"45rem",persistent:!0,yes:"OK",no:null,cancel:null}).catch(()=>!1)}};f([s({required:!0})],c.prototype,"businessId",2);f([s({required:!0})],c.prototype,"entityType",2);f([s({required:!0})],c.prototype,"fetchAndValidateNr",2);f([s({required:!0})],c.prototype,"formType",2);f([s({required:!0})],c.prototype,"nameRequest",2);f([s({required:!0})],c.prototype,"validate",2);f([v("formType")],c.prototype,"onSubmit",1);f([v("validate")],c.prototype,"onValidate",1);f([v("componentValid"),l("valid")],c.prototype,"emitValid",1);f([l("saved")],c.prototype,"emitSaved",1);f([l("update:companyName")],c.prototype,"emitCompanyName",1);f([l("update:nameRequest")],c.prototype,"emitNameRequest",1);c=f([R({components:{ConfirmDialogShared:K}})],c);var pe=function(){var t=this,e=t._self._c;return t._self._setupProxy,e("v-form",{ref:"form",attrs:{id:"correct-name-request-form","lazy-validation":""},model:{value:t.formValid,callback:function(a){t.formValid=a},expression:"formValid"}},[e("ConfirmDialogShared",{ref:"confirm",attrs:{attach:"#app"}}),e("v-row",{attrs:{"no-gutters":""}},[e("v-col",{staticClass:"mt-3",attrs:{cols:"1"}},[e("v-chip",{staticClass:"step-icon",attrs:{outlined:""}},[t._v(" 1 ")])],1),e("v-col",[e("v-text-field",{staticClass:"text-input-field",attrs:{id:"nr-number",filled:"","persistent-hint":"",label:"Enter the NR Number",hint:"Example: NR 1234567",rules:t.nrNumRules},on:{keyup:function(a){t.nrNumber=t.nrNumber.toUpperCase()}},model:{value:t.nrNumber,callback:function(a){t.nrNumber=a},expression:"nrNumber"}})],1)],1),e("v-row",{staticClass:"mt-4 mb-n1",attrs:{"no-gutters":""}},[e("v-col",{staticClass:"mt-3",attrs:{cols:"1"}},[e("v-chip",{staticClass:"step-icon",attrs:{outlined:""}},[t._v(" 2 ")])],1),e("v-col",{attrs:{cols:"5"}},[e("v-text-field",{staticClass:"text-input-field",attrs:{id:"applicant-phone",filled:"","persistent-hint":"",label:"Applicant's Phone Number",hint:"Example: 555-555-5555",type:"tel",rules:t.phoneRules},model:{value:t.applicantPhone,callback:function(a){t.applicantPhone=a},expression:"applicantPhone"}})],1),e("div",{staticClass:"ma-5"},[t._v(" or ")]),e("v-col",[e("v-text-field",{staticClass:"text-input-field",attrs:{id:"applicant-email",filled:"","persistent-hint":"",label:"Applicant's Notification Email",hint:"Example: name@email.com",type:"email",rules:t.emailRules},model:{value:t.applicantEmail,callback:function(a){t.applicantEmail=a},expression:"applicantEmail"}})],1)],1)],1)},ce=[],B=q(c,pe,ce,!1,null,"dafd5a27",null,null);const L=B.exports;B.exports.__docgenInfo={description:"Mixin that provides some useful Name Request utilities.",tags:{},exportName:"default",displayName:"CorrectNameRequest",props:[{name:"businessId",tags:{},type:{name:"string"},required:!0},{name:"entityType",tags:{},type:{name:"CorpTypeCd"},required:!0},{name:"fetchAndValidateNr",tags:{},type:{name:"TSFunctionType"},required:!0},{name:"formType",tags:{},type:{name:"CorrectNameOptions"},required:!0},{name:"nameRequest",tags:{},type:{name:"NameRequestIF"},required:!0},{name:"validate",tags:{},type:{name:"boolean"},required:!0}],events:[{name:"saved",description:"Inform parent that the process is complete."},{name:"update:companyName",description:"Inform parent of updated company name."},{name:"update:nameRequest",description:"Inform parent of updated name request object."}],sourceFiles:["/home/kdeodhar/gitRepo/bcrs-shared-components/src/components/correct-name/CorrectNameRequest.vue","/home/kdeodhar/gitRepo/bcrs-shared-components/src/mixins/name-request-mixin.ts"]};var le=Object.defineProperty,de=Object.getOwnPropertyDescriptor,u=(r,t,e,a)=>{for(var o=a>1?void 0:a?de(t,e):t,i=r.length-1,m;i>=0;i--)(m=r[i])&&(o=(a?m(t,e,o):m(o))||o);return a&&o&&le(t,e,o),o};let p=class extends x{constructor(){super(...arguments);n(this,"actionTxt");n(this,"businessId");n(this,"companyName");n(this,"correctionNameChoices");n(this,"entityType");n(this,"fetchAndValidateNr");n(this,"formType");n(this,"nameRequest");n(this,"displayedOptions",[]);n(this,"panel",null);n(this,"currentFormType",null);n(this,"isLoading",!1);n(this,"isSubComponentValid",!1);n(this,"validate",!1);n(this,"correctionNameOptions",[{id:_.CORRECT_NAME,title:"Edit the company name",description:"Correct typographical errors in the existing company name.",component:D},{id:_.CORRECT_NAME_TO_NUMBER,title:"Use the incorporation number as the name",description:null,component:M},{id:_.CORRECT_NEW_NR,title:"Use a new name request number",description:"Enter the new Name Request Number (e.g., NR 1234567) and either the applicant phone number OR the applicant email that was used when the name was requested.",component:L}])}mounted(){this.displayedOptions=this.correctionNameOptions.filter(e=>this.correctionNameChoices.includes(e.id)),this.isOneOption&&(this.panel=0,this.currentFormType=this.displayedOptions[0].id)}get isOneOption(){return this.correctionNameChoices.length===1}submitNameCorrection(){this.isSubComponentValid?(this.isLoading=!0,this.emitFormType(this.currentFormType),this.validate=!1):this.validate=!0}identifyForm(e){this.currentFormType=e,this.isSubComponentValid=!1}emitCancel(){this.validate=!1,this.panel=null}emitSaved(e){return this.isLoading=!1,this.emitFormType(null),e&&(this.panel=null),e}emitCompanyName(e){}emitFormType(e){}emitNameRequest(e){}};u([s({default:null})],p.prototype,"actionTxt",2);u([s({required:!0})],p.prototype,"businessId",2);u([s({required:!0})],p.prototype,"companyName",2);u([s({default:()=>[]})],p.prototype,"correctionNameChoices",2);u([s({required:!0})],p.prototype,"entityType",2);u([s({required:!0})],p.prototype,"fetchAndValidateNr",2);u([s({required:!0})],p.prototype,"formType",2);u([s({required:!0})],p.prototype,"nameRequest",2);u([l("cancel")],p.prototype,"emitCancel",1);u([l("saved")],p.prototype,"emitSaved",1);u([l("update:companyName")],p.prototype,"emitCompanyName",1);u([l("update:formType")],p.prototype,"emitFormType",1);u([l("update:nameRequest")],p.prototype,"emitNameRequest",1);p=u([R({components:{CorrectCompanyName:D,CorrectNameToNumber:M,CorrectNameRequest:L}})],p);var ue=function(){var t=this,e=t._self._c;return t._self._setupProxy,e("v-container",{staticClass:"pa-0 pr-4",attrs:{id:"correct-name-options"}},[t.isOneOption?t._e():e("p",{staticClass:"info-text mb-5 pb-5 bottom-border"},[t._v(" You can "+t._s(t.actionTxt||"correct the company name")+" in one of the following ways: ")]),e("v-expansion-panels",{staticClass:"bottom-border",attrs:{accordion:""},model:{value:t.panel,callback:function(a){t.panel=a},expression:"panel"}},t._l(t.displayedOptions,function(a,o){return e("v-expansion-panel",{key:o,staticClass:"mb-4",attrs:{id:`x-panel-${a.id}`,disabled:t.isOneOption},on:{click:function(i){return t.identifyForm(a.id)}}},[e("v-expansion-panel-header",{class:{"name-options-header":t.isOneOption},scopedSlots:t._u([{key:"actions",fn:function(){return[e("v-icon",{attrs:{color:"primary"}},[t._v(" mdi-menu-down ")])]},proxy:!0}],null,!0)},[e("span",{staticClass:"names-option-title"},[t._v(t._s(a.title))])]),e("v-expansion-panel-content",{staticClass:"name-options-content pt-4"},[a.description?e("div",{staticClass:"info-text mb-4",attrs:{color:"primary"}},[t._v(" "+t._s(a.description)+" ")]):t._e(),e(a.component,{key:a.id,tag:"component",attrs:{businessId:t.businessId,companyName:t.companyName,entityType:t.entityType,fetchAndValidateNr:t.fetchAndValidateNr,formType:t.formType,nameRequest:t.nameRequest,validate:t.validate},on:{saved:function(i){return t.emitSaved(i)},"update:nameRequest":function(i){return t.emitNameRequest(i)},"update:companyName":function(i){return t.emitCompanyName(i)},valid:function(i){t.isSubComponentValid=i}}})],1)],1)}),1),e("div",{staticClass:"action-btns"},[e("v-btn",{attrs:{id:"done-btn",large:"",color:"primary",loading:t.isLoading},on:{click:function(a){return t.submitNameCorrection()}}},[e("span",[t._v("Done")])]),e("v-btn",{attrs:{id:"cancel-btn",large:"",outlined:"",color:"primary"},on:{click:function(a){return t.emitCancel()}}},[e("span",[t._v("Cancel")])])],1)],1)},fe=[],k=q(p,ue,fe,!1,null,"862e35a8",null,null);const ye=k.exports;k.exports.__docgenInfo={description:`Operation:
1. To initialize this component option list, pass in an array of id's of the components you want to display.
   I.e., ['correct-new-nr', 'correct-name', 'correct-name-to-number']
2. If this options list is only passed one value the option panel will be open by default.
3. The parent component will have to watch for the 'save' and 'cancel' events and handle them accordingly.`,tags:{},exportName:"default",displayName:"CorrectName",props:[{name:"actionTxt",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"businessId",tags:{},type:{name:"string"},required:!0},{name:"companyName",tags:{},type:{name:"string"},required:!0},{name:"correctionNameChoices",tags:{},type:{name:"Array",elements:[{name:"CorrectNameOptions"}]},defaultValue:{func:!0,value:"() => []"}},{name:"entityType",tags:{},type:{name:"CorpTypeCd"},required:!0},{name:"fetchAndValidateNr",tags:{},type:{name:"TSFunctionType"},required:!0},{name:"formType",tags:{},type:{name:"CorrectNameOptions"},required:!0},{name:"nameRequest",tags:{},type:{name:"NameRequestIF"},required:!0}],events:[{name:"cancel",description:"When Cancel button is clicked, informs parent that name correction is cancelled."},{name:"saved",description:"Inform parent that name correction process is done."},{name:"update:companyName",description:"Inform parent of updated company name."},{name:"update:formType",description:"Inform parent of updated form type."},{name:"update:nameRequest",description:"Inform parent of updated name request object."}],sourceFiles:["/home/kdeodhar/gitRepo/bcrs-shared-components/src/components/correct-name/CorrectName.vue"]};const $e={title:"component/CorrectName"},U=(r,{argTypes:t})=>({props:Object.keys(t),components:{CorrectName:ye},template:'<correct-name v-bind="$props" />'}),C=U.bind({});C.args={businessId:"BC1234567",entityType:"BC",nameRequest:{},companyName:"Old Company Name",fetchAndValidateNr:()=>{},correctionNameChoices:["correct-name"]};const b=U.bind({});b.args={businessId:"BC1234567",entityType:"BC",nameRequest:{},companyName:"Old Company Name",fetchAndValidateNr:()=>{},correctionNameChoices:["correct-name-to-number","correct-new-nr"]};var $,I,E;C.parameters={...C.parameters,docs:{...($=C.parameters)==null?void 0:$.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    CorrectName
  },
  template: '<correct-name v-bind="$props" />' // $props comes from args below
})`,...(E=(I=C.parameters)==null?void 0:I.docs)==null?void 0:E.source}}};var w,P,A;b.parameters={...b.parameters,docs:{...(w=b.parameters)==null?void 0:w.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    CorrectName
  },
  template: '<correct-name v-bind="$props" />' // $props comes from args below
})`,...(A=(P=b.parameters)==null?void 0:P.docs)==null?void 0:A.source}}};const Ie=["correctName","correctNameNR"];export{Ie as __namedExportsOrder,C as correctName,b as correctNameNR,$e as default};
//# sourceMappingURL=CorrectName.stories-3c53cc01.js.map
