var F=Object.defineProperty;var D=(o,t,e)=>t in o?F(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var r=(o,t,e)=>(D(o,typeof t!="symbol"?t+"":t,e),e);import{V as g}from"./vue.esm-b1e57a2f.js";import{E as l,C as b,P as i,n as T,m as M}from"./_plugin-vue2_normalizer-b11a0120.js";import{W as v}from"./Watch-62f8b699.js";import{C as R,G as q}from"./corp-type-module-8edd1173.js";import{C as L}from"./ConfirmDialog-9091213f.js";import{N as B}from"./name-request-mixin-a93110d9.js";import"./lodash-bc5bedbb.js";import"./_commonjsHelpers-042e6b4d.js";var _=(o=>(o.CORRECT_NAME="correct-name",o.CORRECT_NAME_TO_NUMBER="correct-name-to-number",o.CORRECT_NEW_NR="correct-new-nr",o))(_||{}),j=Object.defineProperty,U=Object.getOwnPropertyDescriptor,N=(o,t,e,a)=>{for(var n=a>1?void 0:a?U(t,e):t,s=o.length-1,p;s>=0;s--)(p=o[s])&&(n=(a?p(t,e,n):p(n))||n);return a&&n&&j(t,e,n),n};let y=class extends g{constructor(){super(...arguments);r(this,"$refs");r(this,"companyName");r(this,"formType");r(this,"validate");r(this,"formValid",!1);r(this,"textfield",this.companyName)}get companyNameRules(){return[e=>!!e||" A company name is required",e=>e!==this.companyName||" Enter a new company name"]}onSubmit(){this.formType===_.CORRECT_NAME&&(this.emitCompanyName(this.textfield),this.emitSaved(!0))}onValidate(e){e?this.$refs.form.validate():this.$refs.form.resetValidation()}emitValid(){return this.formValid}emitSaved(e){}emitCompanyName(e){}};N([i({required:!0})],y.prototype,"companyName",2);N([i({required:!0})],y.prototype,"formType",2);N([i({required:!0})],y.prototype,"validate",2);N([v("formType")],y.prototype,"onSubmit",1);N([v("validate")],y.prototype,"onValidate",1);N([v("formValid"),l("valid")],y.prototype,"emitValid",1);N([l("saved")],y.prototype,"emitSaved",1);N([l("update:companyName")],y.prototype,"emitCompanyName",1);y=N([b({})],y);var k=function(){var t=this,e=t._self._c;return t._self._setupProxy,e("v-form",{ref:"form",attrs:{id:"correct-company-name-form"},model:{value:t.formValid,callback:function(a){t.formValid=a},expression:"formValid"}},[e("v-row",{attrs:{"no-gutters":""}},[e("v-col",[e("v-text-field",{staticClass:"mb-n3",attrs:{id:"company-name-textfield",filled:"",rules:t.companyNameRules},model:{value:t.textfield,callback:function(a){t.textfield=a},expression:"textfield"}})],1)],1)],1)},W=[],$=T(y,k,W,!1,null,null,null,null);const I=$.exports;$.exports.__docgenInfo={exportName:"default",displayName:"CorrectCompanyName",description:"",tags:{},props:[{name:"companyName",tags:{},type:{name:"string"},required:!0},{name:"formType",tags:{},type:{name:"CorrectNameOptions"},required:!0},{name:"validate",tags:{},type:{name:"boolean"},required:!0}],events:[{name:"saved",description:"Inform parent that the process is complete."},{name:"update:companyName",description:"Inform parent of updated company name."}],sourceFiles:["/home/severin/repos/bcrs-shared-components/src/components/correct-name/CorrectCompanyName.vue"]};var Y=Object.defineProperty,z=Object.getOwnPropertyDescriptor,h=(o,t,e,a)=>{for(var n=a>1?void 0:a?z(t,e):t,s=o.length-1,p;s>=0;s--)(p=o[s])&&(n=(a?p(t,e,n):p(n))||n);return a&&n&&Y(t,e,n),n};let f=class extends g{constructor(){super(...arguments);r(this,"$refs");r(this,"businessId");r(this,"entityType");r(this,"formType");r(this,"validate");r(this,"checkbox",!1);r(this,"formValid",!1)}get numberedName(){var a;const e=((a=this.businessId)==null?void 0:a.substring(2))||"Unknown";switch(this.entityType){case R.BC_ULC_COMPANY:return`${e} B.C. UNLIMITED LIABILITY COMPANY`;case R.BC_CCC:return`${e} B.C. COMMUNITY CONTRIBUTION COMPANY LTD.`;default:return`${e} B.C. LTD.`}}onSubmit(){this.formType===_.CORRECT_NAME_TO_NUMBER&&(this.emitCompanyName(this.numberedName),this.emitSaved(!0))}onValidate(e){e?this.$refs.form.validate():this.$refs.form.resetValidation()}emitValid(){return this.formValid}emitSaved(e){}emitCompanyName(e){}};h([i({required:!0})],f.prototype,"businessId",2);h([i({required:!0})],f.prototype,"entityType",2);h([i({required:!0})],f.prototype,"formType",2);h([i({required:!0})],f.prototype,"validate",2);h([v("formType")],f.prototype,"onSubmit",1);h([v("validate")],f.prototype,"onValidate",1);h([v("formValid"),l("valid")],f.prototype,"emitValid",1);h([l("saved")],f.prototype,"emitSaved",1);h([l("update:companyName")],f.prototype,"emitCompanyName",1);f=h([b({})],f);var G=function(){var t=this,e=t._self._c;return t._self._setupProxy,e("v-form",{ref:"form",attrs:{id:"correct-name-to-number-form"},model:{value:t.formValid,callback:function(a){t.formValid=a},expression:"formValid"}},[e("v-row",{attrs:{"no-gutters":""}},[e("v-col",[e("v-checkbox",{staticClass:"mb-n5",attrs:{id:"correct-name-to-number-checkbox",label:`Change the company name to ${t.numberedName}`,rules:[a=>a]},model:{value:t.checkbox,callback:function(a){t.checkbox=a},expression:"checkbox"}})],1)],1)],1)},Z=[],E=T(f,G,Z,!1,null,"d115bbb7",null,null);const w=E.exports;E.exports.__docgenInfo={exportName:"default",displayName:"CorrectNameToNumber",description:"",tags:{},props:[{name:"businessId",tags:{},type:{name:"string"},required:!0},{name:"entityType",tags:{},type:{name:"CorpTypeCd"},required:!0},{name:"formType",tags:{},type:{name:"CorrectNameOptions"},required:!0},{name:"validate",tags:{},type:{name:"boolean"},required:!0}],events:[{name:"saved",description:"Inform parent that the process is complete."},{name:"update:companyName",description:"Inform parent of updated company name."}],sourceFiles:["/home/severin/repos/bcrs-shared-components/src/components/correct-name/CorrectNameToNumber.vue"]};var K=Object.defineProperty,H=Object.getOwnPropertyDescriptor,d=(o,t,e,a)=>{for(var n=a>1?void 0:a?H(t,e):t,s=o.length-1,p;s>=0;s--)(p=o[s])&&(n=(a?p(t,e,n):p(n))||n);return a&&n&&K(t,e,n),n};let c=class extends M(B){constructor(){super(...arguments);r(this,"$refs");r(this,"businessId");r(this,"entityType");r(this,"fetchAndValidateNr");r(this,"formType");r(this,"nameRequest");r(this,"validate");r(this,"applicantEmail","");r(this,"applicantPhone","");r(this,"formValid",!1);r(this,"nrNumber","");r(this,"nrNumRules",[e=>!!e||"Name Request Number is required",e=>this.isValidNrNumber(e)||"Name Request Number is invalid"]);r(this,"phoneRules",[e=>!/^\s/g.test(e)||"Invalid spaces",e=>!/\s$/g.test(e)||"Invalid spaces",e=>!((e==null?void 0:e.length)>12)||"Phone number is invalid"]);r(this,"emailRules",[e=>!/^\s/g.test(e)||"Invalid spaces",e=>!/\s$/g.test(e)||"Invalid spaces",e=>this.isValidEmail(e)||"Email is invalid"])}get componentValid(){return this.formValid&&!!this.nrNumber&&(!!this.applicantPhone||!!this.applicantEmail)}isValidNrNumber(e){return new RegExp(/^(NR )\d{7}$/).test(e)}isValidEmail(e){return(e==null?void 0:e.length)<1||this.applicantPhone&&e?!0:new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(e)}async onSubmit(){if(this.formType===_.CORRECT_NEW_NR)try{const e=await this.fetchAndValidateNr(this.nrNumber,this.businessId,this.applicantPhone,this.applicantEmail);if(this.entityType!==e.legalType){this.$refs.form.resetValidation(),this.emitSaved(!1);const a=q(e.legalType),n=q(this.entityType),s=`<p class="info-text">This ${a} Name Request does not match the current business type <b>${n}</b>.

The Name Request type must match the business type before you can continue.</p>`;await this.showConfirmDialog(this.$refs.confirm,"Name Request Type Does Not Match Business Type",s)}else this.emitNameRequest(e),this.emitCompanyName(this.getNrApprovedName(e)),this.emitSaved(!0)}catch(e){alert(e.message),this.$refs.form.resetValidation(),this.emitSaved(!1)}}onValidate(e){e?this.$refs.form.validate():this.$refs.form.resetValidation()}emitValid(){return this.componentValid}emitSaved(e){}emitCompanyName(e){}emitNameRequest(e){}async showConfirmDialog(e,a,n){return e.open(a,n,{width:"45rem",persistent:!0,yes:"OK",no:null,cancel:null}).catch(()=>!1)}};d([i({required:!0})],c.prototype,"businessId",2);d([i({required:!0})],c.prototype,"entityType",2);d([i({required:!0})],c.prototype,"fetchAndValidateNr",2);d([i({required:!0})],c.prototype,"formType",2);d([i({required:!0})],c.prototype,"nameRequest",2);d([i({required:!0})],c.prototype,"validate",2);d([v("formType")],c.prototype,"onSubmit",1);d([v("validate")],c.prototype,"onValidate",1);d([v("componentValid"),l("valid")],c.prototype,"emitValid",1);d([l("saved")],c.prototype,"emitSaved",1);d([l("update:companyName")],c.prototype,"emitCompanyName",1);d([l("update:nameRequest")],c.prototype,"emitNameRequest",1);c=d([b({components:{ConfirmDialogShared:L}})],c);var J=function(){var t=this,e=t._self._c;return t._self._setupProxy,e("v-form",{ref:"form",attrs:{id:"correct-name-request-form","lazy-validation":""},model:{value:t.formValid,callback:function(a){t.formValid=a},expression:"formValid"}},[e("ConfirmDialogShared",{ref:"confirm",attrs:{attach:"#app"}}),e("v-row",{attrs:{"no-gutters":""}},[e("v-col",{staticClass:"mt-3",attrs:{cols:"1"}},[e("v-chip",{staticClass:"step-icon",attrs:{outlined:""}},[t._v(" 1 ")])],1),e("v-col",[e("v-text-field",{staticClass:"text-input-field",attrs:{id:"nr-number",filled:"","persistent-hint":"",label:"Enter the NR Number",hint:"Example: NR 1234567",rules:t.nrNumRules},on:{keyup:function(a){t.nrNumber=t.nrNumber.toUpperCase()}},model:{value:t.nrNumber,callback:function(a){t.nrNumber=a},expression:"nrNumber"}})],1)],1),e("v-row",{staticClass:"mt-4 mb-n1",attrs:{"no-gutters":""}},[e("v-col",{staticClass:"mt-3",attrs:{cols:"1"}},[e("v-chip",{staticClass:"step-icon",attrs:{outlined:""}},[t._v(" 2 ")])],1),e("v-col",{attrs:{cols:"5"}},[e("v-text-field",{staticClass:"text-input-field",attrs:{id:"applicant-phone",filled:"","persistent-hint":"",label:"Applicant's Phone Number",hint:"Example: 555-555-5555",type:"tel",rules:t.phoneRules},model:{value:t.applicantPhone,callback:function(a){t.applicantPhone=a},expression:"applicantPhone"}})],1),e("div",{staticClass:"ma-5"},[t._v(" or ")]),e("v-col",[e("v-text-field",{staticClass:"text-input-field",attrs:{id:"applicant-email",filled:"","persistent-hint":"",label:"Applicant's Notification Email",hint:"Example: name@email.com",type:"email",rules:t.emailRules},model:{value:t.applicantEmail,callback:function(a){t.applicantEmail=a},expression:"applicantEmail"}})],1)],1)],1)},Q=[],A=T(c,J,Q,!1,null,"806a6d10",null,null);const P=A.exports;A.exports.__docgenInfo={description:"Mixin that provides some useful Name Request utilities.",tags:{},exportName:"default",displayName:"CorrectNameRequest",props:[{name:"businessId",tags:{},type:{name:"string"},required:!0},{name:"entityType",tags:{},type:{name:"CorpTypeCd"},required:!0},{name:"fetchAndValidateNr",tags:{},type:{name:"TSFunctionType"},required:!0},{name:"formType",tags:{},type:{name:"CorrectNameOptions"},required:!0},{name:"nameRequest",tags:{},type:{name:"NameRequestIF"},required:!0},{name:"validate",tags:{},type:{name:"boolean"},required:!0}],events:[{name:"saved",description:"Inform parent that the process is complete."},{name:"update:companyName",description:"Inform parent of updated company name."},{name:"update:nameRequest",description:"Inform parent of updated name request object."}],sourceFiles:["/home/severin/repos/bcrs-shared-components/src/components/correct-name/CorrectNameRequest.vue","/home/severin/repos/bcrs-shared-components/src/mixins/name-request-mixin.ts"]};var X=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,u=(o,t,e,a)=>{for(var n=a>1?void 0:a?ee(t,e):t,s=o.length-1,p;s>=0;s--)(p=o[s])&&(n=(a?p(t,e,n):p(n))||n);return a&&n&&X(t,e,n),n};let m=class extends g{constructor(){super(...arguments);r(this,"actionTxt");r(this,"businessId");r(this,"companyName");r(this,"correctionNameChoices");r(this,"entityType");r(this,"fetchAndValidateNr");r(this,"formType");r(this,"nameRequest");r(this,"displayedOptions",[]);r(this,"panel",null);r(this,"currentFormType",null);r(this,"isLoading",!1);r(this,"isSubComponentValid",!1);r(this,"validate",!1);r(this,"correctionNameOptions",[{id:_.CORRECT_NAME,title:"Edit the company name",description:"Correct typographical errors in the existing company name.",component:I},{id:_.CORRECT_NAME_TO_NUMBER,title:"Use the incorporation number as the name",description:null,component:w},{id:_.CORRECT_NEW_NR,title:"Use a new name request number",description:"Enter the new Name Request Number (e.g., NR 1234567) and either the applicant phone number OR the applicant email that was used when the name was requested.",component:P}])}mounted(){this.displayedOptions=this.correctionNameOptions.filter(e=>this.correctionNameChoices.includes(e.id)),this.isOneOption&&(this.panel=0,this.currentFormType=this.displayedOptions[0].id)}get isOneOption(){return this.correctionNameChoices.length===1}submitNameCorrection(){this.isSubComponentValid?(this.isLoading=!0,this.emitFormType(this.currentFormType),this.validate=!1):this.validate=!0}identifyForm(e){this.currentFormType=e,this.isSubComponentValid=!1}emitCancel(){this.validate=!1,this.panel=null}emitSaved(e){return this.isLoading=!1,this.emitFormType(null),e&&(this.panel=null),e}emitCompanyName(e){}emitFormType(e){}emitNameRequest(e){}};u([i({default:null})],m.prototype,"actionTxt",2);u([i({required:!0})],m.prototype,"businessId",2);u([i({required:!0})],m.prototype,"companyName",2);u([i({default:()=>[]})],m.prototype,"correctionNameChoices",2);u([i({required:!0})],m.prototype,"entityType",2);u([i({required:!0})],m.prototype,"fetchAndValidateNr",2);u([i({required:!0})],m.prototype,"formType",2);u([i({required:!0})],m.prototype,"nameRequest",2);u([l("cancel")],m.prototype,"emitCancel",1);u([l("saved")],m.prototype,"emitSaved",1);u([l("update:companyName")],m.prototype,"emitCompanyName",1);u([l("update:formType")],m.prototype,"emitFormType",1);u([l("update:nameRequest")],m.prototype,"emitNameRequest",1);m=u([b({components:{CorrectCompanyName:I,CorrectNameToNumber:w,CorrectNameRequest:P}})],m);var te=function(){var t=this,e=t._self._c;return t._self._setupProxy,e("v-container",{staticClass:"pa-0 pr-4",attrs:{id:"correct-name-options"}},[t.isOneOption?t._e():e("p",{staticClass:"info-text mb-5 pb-5 bottom-border"},[t._v(" You can "+t._s(t.actionTxt||"correct the company name")+" in one of the following ways: ")]),e("v-expansion-panels",{staticClass:"bottom-border",attrs:{accordion:""},model:{value:t.panel,callback:function(a){t.panel=a},expression:"panel"}},t._l(t.displayedOptions,function(a,n){return e("v-expansion-panel",{key:n,staticClass:"mb-4",attrs:{id:`x-panel-${a.id}`,disabled:t.isOneOption},on:{click:function(s){return t.identifyForm(a.id)}}},[e("v-expansion-panel-header",{class:{"name-options-header":t.isOneOption},scopedSlots:t._u([{key:"actions",fn:function(){return[e("v-icon",{attrs:{color:"primary"}},[t._v(" mdi-menu-down ")])]},proxy:!0}],null,!0)},[e("span",{staticClass:"names-option-title"},[t._v(t._s(a.title))])]),e("v-expansion-panel-content",{staticClass:"name-options-content pt-4"},[a.description?e("div",{staticClass:"info-text mb-4",attrs:{color:"primary"}},[t._v(" "+t._s(a.description)+" ")]):t._e(),e(a.component,{key:a.id,tag:"component",attrs:{businessId:t.businessId,companyName:t.companyName,entityType:t.entityType,fetchAndValidateNr:t.fetchAndValidateNr,formType:t.formType,nameRequest:t.nameRequest,validate:t.validate},on:{saved:function(s){return t.emitSaved(s)},"update:nameRequest":function(s){return t.emitNameRequest(s)},"update:companyName":function(s){return t.emitCompanyName(s)},valid:function(s){t.isSubComponentValid=s}}})],1)],1)}),1),e("div",{staticClass:"action-btns"},[e("v-btn",{attrs:{id:"done-btn",large:"",color:"primary",loading:t.isLoading},on:{click:function(a){return t.submitNameCorrection()}}},[e("span",[t._v("Done")])]),e("v-btn",{attrs:{id:"cancel-btn",large:"",outlined:"",color:"primary"},on:{click:function(a){return t.emitCancel()}}},[e("span",[t._v("Cancel")])])],1)],1)},ae=[],S=T(m,te,ae,!1,null,"862e35a8",null,null);const re=S.exports;S.exports.__docgenInfo={description:`Operation:
1. To initialize this component option list, pass in an array of id's of the components you want to display.
   I.e., ['correct-new-nr', 'correct-name', 'correct-name-to-number']
2. If this options list is only passed one value the option panel will be open by default.
3. The parent component will have to watch for the 'save' and 'cancel' events and handle them accordingly.`,tags:{},exportName:"default",displayName:"CorrectName",props:[{name:"actionTxt",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"businessId",tags:{},type:{name:"string"},required:!0},{name:"companyName",tags:{},type:{name:"string"},required:!0},{name:"correctionNameChoices",tags:{},type:{name:"Array",elements:[{name:"CorrectNameOptions"}]},defaultValue:{func:!0,value:"() => []"}},{name:"entityType",tags:{},type:{name:"CorpTypeCd"},required:!0},{name:"fetchAndValidateNr",tags:{},type:{name:"TSFunctionType"},required:!0},{name:"formType",tags:{},type:{name:"CorrectNameOptions"},required:!0},{name:"nameRequest",tags:{},type:{name:"NameRequestIF"},required:!0}],events:[{name:"cancel",description:"When Cancel button is clicked, informs parent that name correction is cancelled."},{name:"saved",description:"Inform parent that name correction process is done."},{name:"update:companyName",description:"Inform parent of updated company name."},{name:"update:formType",description:"Inform parent of updated form type."},{name:"update:nameRequest",description:"Inform parent of updated name request object."}],sourceFiles:["/home/severin/repos/bcrs-shared-components/src/components/correct-name/CorrectName.vue"]};const Ne={title:"component/CorrectName"},ne=(o,{argTypes:t})=>({props:Object.keys(t),components:{CorrectName:re},template:'<correct-name v-bind="$props" />'}),C=ne.bind({});C.args={businessId:"BC1234567",entityType:"BC",nameRequest:{},companyName:"Old Company Name",fetchAndValidateNr:()=>{}};var x,O,V;C.parameters={...C.parameters,docs:{...(x=C.parameters)==null?void 0:x.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    CorrectName
  },
  template: '<correct-name v-bind="$props" />' // $props comes from args below
})`,...(V=(O=C.parameters)==null?void 0:O.docs)==null?void 0:V.source}}};const _e=["correctName"];export{_e as __namedExportsOrder,C as correctName,Ne as default};
//# sourceMappingURL=CorrectName.stories-15f77baa.js.map