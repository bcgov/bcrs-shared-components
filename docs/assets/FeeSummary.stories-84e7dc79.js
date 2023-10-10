var W=Object.defineProperty;var Y=(e,t,r)=>t in e?W(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var n=(e,t,r)=>(Y(e,typeof t!="symbol"?t+"":t,r),r);import{V as d}from"./vue.esm-b1e57a2f.js";import{C as L,P as l,E as U,n as S}from"./_plugin-vue2_normalizer-b11a0120.js";import{W as j}from"./Watch-62f8b699.js";import{A as T}from"./index-2b7fa976.js";import{C as q}from"./corp-type-module-8edd1173.js";import"./_commonjsHelpers-de833af9.js";var F=(e=>(e[e.BACK=0]="BACK",e[e.CANCEL=1]="CANCEL",e[e.CONFIRM=2]="CONFIRM",e[e.SAVE_RESUME_LATER=3]="SAVE_RESUME_LATER",e))(F||{}),D=(e=>(e.ADDRESS_CHANGE_BC="BCADD",e.ADDRESS_CHANGE_OT="OTADD",e.AFFIDAVIT="AFDVT",e.ALTERATION="ALTER",e.ALTERATION_BC_TO_ULC="NOALU",e.ANNUAL_REPORT_BC="BCANN",e.ANNUAL_REPORT_OT="OTANN",e.CHANGE_OF_REGISTRATION="FMCHANGE",e.CONSENT_CONTINUATION_OUT="CONTO",e.CONTINUATION_OUT="COUTI",e.CORRECTION="CRCTN",e.DIRECTOR_CHANGE_BC="BCCDR",e.DIRECTOR_CHANGE_OT="OTCDR",e.DISSOLUTION_ADMINISTRATIVE="DIS_ADMIN",e.DISSOLUTION_COURT_ORDERED_LIQUIDATION="DIS_COLQD",e.DISSOLUTION_INVOLUNTARY="DIS_INVOL",e.DISSOLUTION_RESTORED_IN_ERROR="DIS_RSTR",e.DISSOLUTION_VOLUNTARY="DIS_VOL",e.DISSOLUTION_VOLUNTARY_LIQUIDATION="DIS_LQD",e.FM_CHANGE="FMCHANGE",e.FM_CONVERSION="FMCONV",e.FM_CORRECTION="FMCORR",e.FREE_DIRECTOR_CHANGE_BC="BCFDR",e.FREE_DIRECTOR_CHANGE_OT="OTFDR",e.INCORPORATION_BC="BCINC",e.INCORPORATION_BEN="BCINC",e.INCORPORATION_CC="BCINC",e.INCORPORATION_CP="OTINC",e.INCORPORATION_ULC="BCINC",e.REGISTRATION_GP="FRREG",e.REGISTRATION_SP="FRREG",e.RESTORATION_FULL="RESTF",e.RESTORATION_LIMITED="RESTL",e.RESTORATION_LTD_EXTEND="RESXL",e.RESTORATION_LTD_TO_FULL="RESXF",e.SPECIAL_RESOLUTION="SPRLN",e.SPECIAL_RESOLUTION_NAME_CHANGE="OTCON",e))(D||{}),_=(e=>(e.KeyCloakToken="KEYCLOAK_TOKEN",e.KeyCloakRefreshToken="KEYCLOAK_REFRESH_TOKEN",e.KeyCloakIdToken="KEYCLOAK_ID_TOKEN",e.ApiConfigKey="AUTH_API_CONFIG",e.PreventStorageSync="PREVENT_STORAGE_SYNC",e.LaunchDarklyFlags="LD_FLAGS",e.CurrentAccount="CURRENT_ACCOUNT",e.AuthApiUrl="AUTH_API_URL",e.AuthWebUrl="AUTH_WEB_URL",e.StatusApiUrl="STATUS_API_URL",e.WhatsNew="WHATS_NEW",e.SessionSynced="SESSION_SYNCED",e.RegistryHomeUrl="REGISTRY_HOME_URL",e.NameRequestUrl="NAME_REQUEST_URL",e.PprWebUrl="PPR_WEB_URL",e.SiteminderLogoutUrl="SITEMINDER_LOGOUT_URL",e.BusinessIdentifierKey="BUSINESS_ID",e.ExtraProvincialUser="EXTRAPROVINCIAL_USER",e.InvitationToken="INV_TOKEN",e.PaginationOptions="PAGINATION_OPTIONS",e.PaginationNumberOfItems="PAGINATION_NUMBER_OF_ITEMS",e.OrgSearchFilter="ORG_SEARCH_FILTER",e.PendingAccountsSearchFilter="PENDING_ACCOUNTS_SEARCH_FILTER",e.RejectedAccountsSearchFilter="REJECTED_ACCOUNTS_SEARCH_FILTER",e.FasWebUrl="FAS_WEB_URL",e.AffidavitNeeded="AFFIDAVIT_NEEDED",e.GOVN_USER="AUTH_GOVN_USER",e.PayApiUrl="PAY_API_URL",e))(_||{});function u(e){return e?e.trim().replace(/\/+$/,""):""}class O{static addToSession(t,r){sessionStorage.setItem(t,r)}static getFromSession(t){return sessionStorage.getItem(t)}static removeFromSession(t){sessionStorage.removeItem(t)}static clearSession(){sessionStorage.clear()}static getStatusAPIUrl(){return u(sessionStorage.getItem(_.StatusApiUrl)||"")}static getAuthAPIUrl(){return u(sessionStorage.getItem(_.AuthApiUrl)||"")}static getAuthContextPath(){return u(sessionStorage.getItem(_.AuthWebUrl)||"")}static getRegistryHomeURL(){return u(sessionStorage.getItem(_.RegistryHomeUrl)||"")}static getNameRequestURL(){return u(sessionStorage.getItem(_.NameRequestUrl)||"")}static getPprWebURL(){return u(sessionStorage.getItem(_.PprWebUrl)||"")}static setKeycloakConfigUrl(t){this.keycloakConfigUrl=t}static getKeycloakConfigUrl(){return this.keycloakConfigUrl}}n(O,"keycloakConfigUrl","");const A={getFee(e,t){const r=O.getFromSession(_.KeyCloakToken),a=JSON.parse(O.getFromSession(_.CurrentAccount)||"{}").id||0;e.length<1&&Promise.resolve();const s=[];for(const o of e){o.filingTypeCode||Promise.resolve();const i=z(o,t);s.push(T.get(i,{headers:{Authorization:`Bearer ${r}`,"Account-Id":a}}))}return T.all(s).then(T.spread((...o)=>o.map(i=>i.data).map(i=>{const E=e.find(H=>H.filingTypeCode===i.filingTypeCode),x=E&&E.filingDescription?E.filingDescription:i.filingType,w=i.filingFees,G=i.priorityFees||0,$=i.futureEffectiveFees||0,k=i.serviceFees||0,B=i.total||0;return{fee:w,filingType:x,priorityFees:G,futureEffectiveFees:$,serviceFees:k,total:B}}))).catch(o=>{switch(o.response&&o.response.status){case 400:console.log("%c FeeModule-ERROR: Probably fee code mismatch %s","color: red; font-size: 13px",JSON.stringify(e));break;case 500:console.log("%c FeeModule-ERROR: Probably invalid Token %s","color: red; font-size: 13px",JSON.stringify(e));break;default:console.log("%c FeeModule-ERROR: Probably unknown Error %s","color: red; font-size: 13px",JSON.stringify(e))}return[]})}},z=(e,t)=>{const r=[];e.waiveFees&&r.push(`waiveFees=${!!e.waiveFees}`),e.priority&&r.push(`priority=${!!e.priority}`),e.futureEffective&&r.push(`futureEffective=${!!e.futureEffective}`);let a=`${t}fees/${e.entityType}/${e.filingTypeCode}`;return r.length&&(a+=`?${r.join("&")}`),a};var J=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,m=(e,t,r,a)=>{for(var s=a>1?void 0:a?Q(t,r):t,o=e.length-1,i;o>=0;o--)(i=e[o])&&(s=(a?i(t,r,s):i(s))||s);return a&&s&&J(t,r,s),s};let p=class extends d{constructor(){super(...arguments);n(this,"filingData");n(this,"payURL");n(this,"filingLabel");n(this,"fees",[]);n(this,"fetchError","")}mounted(){A.getFee(this.filingData,this.payURL).then(r=>{this.fetchError="",this.fees=r||[],this.fees=this.fees.filter(a=>this.totalFilingFees>0&&a.fee||this.totalFilingFees===0),this.emitTotalFee(this.totalFilingFees)}).catch(r=>{this.fetchError="Error fetching fees"+r})}get totalFilingFees(){return this.fees.reduce((r,a)=>r+a.total,0)}onFilingDataChanged(r,a){A.getFee(this.filingData,this.payURL).then(s=>{this.fetchError="",this.fees=s,this.emitTotalFee(this.totalFilingFees)}).catch(s=>{this.fetchError="Error fetching fees"+s})}emitTotalFee(r){}};m([l({default:()=>[]})],p.prototype,"filingData",2);m([l({default:""})],p.prototype,"payURL",2);m([l()],p.prototype,"filingLabel",2);m([j("filingData")],p.prototype,"onFilingDataChanged",1);m([U("total-fee")],p.prototype,"emitTotalFee",1);p=m([L({})],p);var X=function(){var t=this,r=t._self._c;return t._self._setupProxy,r("v-card",[r("header",{staticClass:"font-weight-bold px-3 py-3"},[t._t("header",function(){return[t._v(" Fee Summary ")]})],2),r("div",{directives:[{name:"show",rawName:"v-show",value:t.fetchError,expression:"fetchError"}]},[r("v-alert",{attrs:{color:"error",icon:"warning",outlined:""}},[t._v(" "+t._s(t.fetchError)+" ")])],1),r("v-slide-y-transition",{directives:[{name:"show",rawName:"v-show",value:!t.fetchError,expression:"!fetchError"}],staticClass:"fee-list",attrs:{group:"",tag:"ul"}},t._l(t.fees,function(a){return r("div",{key:a.filingType},[r("li",{staticClass:"container fee-list__item"},[r("div",{staticClass:"fee-list__item-name"},[t._v(" "+t._s(t.filingLabel?t.filingLabel:a.filingType)+" ")]),a.fee>0?r("div",{staticClass:"fee-list__item-value"},[t._v(" "+t._s(t._f("currency")(a.fee))+" ")]):r("div",{staticClass:"fee-list__item-value"},[t._v(" No Fee ")])]),a.priorityFees?r("li",{key:a.filingType+"-priority",staticClass:"container fee-list__item"},[r("div",{staticClass:"fee-list__item-name pl-3"},[t._v(" Priority Fee ")]),r("div",{staticClass:"fee-list__item-value"},[t._v(" "+t._s(t._f("currency")(a.priorityFees))+" ")])]):t._e(),a.futureEffectiveFees?r("li",{key:a.filingType+"-futureEffective",staticClass:"container fee-list__item"},[r("div",{staticClass:"fee-list__item-name pl-3"},[t._v(" Future Effective Fee ")]),r("div",{staticClass:"fee-list__item-value"},[t._v(" "+t._s(t._f("currency")(a.futureEffectiveFees))+" ")])]):t._e(),a.serviceFees?r("li",{key:a.filingType+"-transaction",staticClass:"container fee-list__item"},[r("div",{staticClass:"fee-list__item-name pl-3"},[t._v(" Service Fee ")]),r("div",{staticClass:"fee-list__item-value"},[t._v(" "+t._s(t._f("currency")(a.serviceFees))+" ")])]):t._e()])}),0),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.fetchError,expression:"!fetchError"}],staticClass:"container fee-total"},[r("div",{staticClass:"fee-total__name"},[t._v(" Total Fees ")]),r("div",{staticClass:"fee-total__currency"},[t._v(" CAD ")]),r("div",{staticClass:"fee-total__value"},[r("v-slide-y-reverse-transition",{attrs:{name:"slide",mode:"out-in"}},[r("div",[t._v(" "+t._s(t._f("currency")(t.totalFilingFees))+" ")])])],1)])],1)},Z=[],b=S(p,X,Z,!1,null,"db9d5a93",null,null);const K=b.exports;b.exports.__docgenInfo={exportName:"default",displayName:"SbcFeeSummary",description:"",tags:{},props:[{name:"filingData",tags:{},type:{name:"Array",elements:[{name:"FilingData"}]},defaultValue:{func:!0,value:"() => []"}},{name:"payURL",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"filingLabel",tags:{},type:{name:"string"}}],events:[{name:"total-fee"}],slots:[{name:"header"}],sourceFiles:["/home/severin/repos/bcrs-shared-components/src/components/fee-summary/SbcFeeSummary.vue"]};var ee=Object.defineProperty,te=Object.getOwnPropertyDescriptor,f=(e,t,r,a)=>{for(var s=a>1?void 0:a?te(t,r):t,o=e.length-1,i;o>=0;o--)(i=e[o])&&(s=(a?i(t,r,s):i(s))||s);return a&&s&&ee(t,r,s),s};let c=class extends d{constructor(){super(...arguments);n(this,"FeeSummaryActions",F);n(this,"filingData");n(this,"payApiUrl");n(this,"hasConflicts");n(this,"isLoading");n(this,"confirmLabel");n(this,"errorMessage");n(this,"isSummaryMode")}emitAction(r){}};f([l({default:()=>[]})],c.prototype,"filingData",2);f([l({default:""})],c.prototype,"payApiUrl",2);f([l({default:!1})],c.prototype,"hasConflicts",2);f([l({default:!1})],c.prototype,"isLoading",2);f([l({default:"Confirm"})],c.prototype,"confirmLabel",2);f([l({default:""})],c.prototype,"errorMessage",2);f([l({default:!1})],c.prototype,"isSummaryMode",2);f([U("action")],c.prototype,"emitAction",1);c=f([L({components:{SbcFeeSummary:K}})],c);var re=function(){var t=this,r=t._self._c;return t._self._setupProxy,r("aside",{attrs:{id:"fee-summary"}},[r("sbc-fee-summary",{attrs:{filingData:[...t.filingData],payURL:t.payApiUrl}}),r("v-row",{attrs:{"no-gutters":""}},[t.isSummaryMode?r("v-col",{staticClass:"pt-3 pr-3"},[r("v-btn",{attrs:{id:"back-btn",large:"",loading:t.isLoading},on:{click:function(a){return t.emitAction(t.FeeSummaryActions.BACK)}}},[r("span",[r("v-icon",[t._v("mdi-chevron-left")]),t._v("Back")],1)])],1):t._e(),r("v-col",{staticClass:"pt-3"},[r("v-btn",{attrs:{id:"cancel-btn",large:"",loading:t.isLoading},on:{click:function(a){return t.emitAction(t.FeeSummaryActions.CANCEL)}}},[r("span",[t._v("Cancel")])])],1),r("v-col",{staticClass:"pt-3"},[r("v-btn",{attrs:{id:"save-resume-later-btn",large:"",loading:t.isLoading},on:{click:function(a){return t.emitAction(t.FeeSummaryActions.SAVE_RESUME_LATER)}}},[r("span",[t._v("Save and Resume Later")])])],1),r("v-col",{staticClass:"pt-3"},[r("v-btn",{attrs:{id:"confirm-btn",large:"",disabled:t.hasConflicts,loading:t.isLoading},on:{click:function(a){return t.emitAction(t.FeeSummaryActions.CONFIRM)}}},[r("span",[t._v(t._s(t.confirmLabel)),r("v-icon",[t._v("mdi-chevron-right")])],1)])],1)],1),t.errorMessage?r("div",{staticClass:"error-msg pre-wrap mt-1",domProps:{innerHTML:t._s(t.errorMessage)}}):t._e()],1)},ae=[],P=S(c,re,ae,!1,null,"f5b2597d",null,null);const se=P.exports;P.exports.__docgenInfo={exportName:"default",displayName:"FeeSummary",description:"",tags:{},props:[{name:"filingData",tags:{},description:"Filing information to calculate fees.",type:{name:"Array",elements:[{name:"FilingDataIF"}]},defaultValue:{func:!0,value:"() => []"}},{name:"payApiUrl",tags:{},description:"URL for Sbc Fee Summary component to get fees.",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"hasConflicts",tags:{},description:"Indicator that something isn't valid.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"isLoading",tags:{},description:"Indicator that there is a request in progress.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"confirmLabel",tags:{},description:"Label for Confirm button.",type:{name:"string"},defaultValue:{func:!1,value:"'Confirm'"}},{name:"errorMessage",tags:{},description:"Message to display if there is an error.",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"isSummaryMode",tags:{},description:"Prop to indicate summary mode.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"action",description:"Emit action event."}],sourceFiles:["/home/severin/repos/bcrs-shared-components/src/components/fee-summary/FeeSummary.vue"]};d.filter("currency",e=>`$${e}`);const me={title:"component/FeeSummary"},M=(e,{argTypes:t})=>({props:Object.keys(t),components:{FeeSummary:se},template:'<div style="max-width: 350px"><fee-summary v-bind="$props" /></div>'}),V=[{filingTypeCode:D.ALTERATION,entityType:q.CORPORATION,priority:!1}],v=M.bind({});v.args={filingData:V,payApiUrl:"https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1/",hasConflicts:!1,isLoading:!1,confirmLabel:"Continue",errorMessage:""};const R=M.bind({});R.args={filingData:V,payApiUrl:"https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1/",hasConflicts:!1,isLoading:!1,confirmLabel:"File and Pay",errorMessage:"",isSummaryMode:!0};var N,y,C;v.parameters={...v.parameters,docs:{...(N=v.parameters)==null?void 0:N.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    FeeSummary
  },
  template: '<div style="max-width: 350px"><fee-summary v-bind="$props" /></div>' // $props comes from args below
})`,...(C=(y=v.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var I,h,g;R.parameters={...R.parameters,docs:{...(I=R.parameters)==null?void 0:I.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    FeeSummary
  },
  template: '<div style="max-width: 350px"><fee-summary v-bind="$props" /></div>' // $props comes from args below
})`,...(g=(h=R.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};const ve=["Default","summaryMode"];export{v as Default,ve as __namedExportsOrder,me as default,R as summaryMode};
//# sourceMappingURL=FeeSummary.stories-84e7dc79.js.map
