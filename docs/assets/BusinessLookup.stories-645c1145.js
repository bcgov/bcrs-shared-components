var g=Object.defineProperty;var y=(o,e,s)=>e in o?g(o,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[e]=s;var i=(o,e,s)=>(y(o,typeof e!="symbol"?e+"":e,s),s);import{V as k}from"./vue.esm-b1e57a2f.js";import{C as L,P as u,E as m,n as C}from"./_plugin-vue2_normalizer-b11a0120.js";import{W as h}from"./Watch-62f8b699.js";import{l as S}from"./lodash-bc5bedbb.js";import"./_commonjsHelpers-042e6b4d.js";var N=Object.defineProperty,E=Object.getOwnPropertyDescriptor,r=(o,e,s,t)=>{for(var a=t>1?void 0:t?E(e,s):e,p=o.length-1,c;p>=0;p--)(c=o[p])&&(a=(t?c(e,s,a):c(a))||a);return t&&a&&N(e,s,a),a},B=(o=>(o.INITIAL="initial",o.SEARCHING="searching",o.SHOW_RESULTS="show results",o.NO_RESULTS="no results",o.SUMMARY="summary",o))(B||{});let n=class extends k{constructor(){super(...arguments);i(this,"showErrors");i(this,"businessLookup");i(this,"BusinessLookupServices");i(this,"hasBusinessLookupChanges");i(this,"editableBusinessName");i(this,"searchStatus");i(this,"States",B);i(this,"state","initial");i(this,"searchResults",[]);i(this,"selectedBusiness",null);i(this,"businessLookupRules",[s=>!!s||"Business is required"]);i(this,"businessNameRules",[s=>!!(s!=null&&s.trim())||"Business or corporation name is required",s=>(s==null?void 0:s.length)<=150||"Cannot exceed 150 characters"]);i(this,"onSearchInputDebounced",S.debounce(async(s,t)=>{(t==null?void 0:t.length)>2?(s.state="searching",s.searchResults=await s.BusinessLookupServices.search(t,s.searchStatus).catch(()=>[]),s.state=s.searchResults.length>0?"show results":"no results"):(s.searchResults=[],s.state="initial")},600))}get identifier(){return this.businessLookup.identifier}get businessName(){return this.businessLookup.name}get businessNumber(){return this.businessLookup.bn||""}get haveBusiness(){return!!this.identifier&&(!!this.businessName||this.editableBusinessName)}get isFormValid(){return this.haveBusiness&&this.state==="summary"}setBusinessName(s){const t=s==null?void 0:s.trim();this.onSelectedBusiness({...this.businessLookup,name:t})}onSearchInput(s){this.onSearchInputDebounced(this,s)}onSelectedBusiness(s){s&&(this.setBusiness(s),this.selectedBusiness=null)}onHaveBusinessChanged(s){this.state=s?"summary":"initial"}onIsFormValidChanged(s){this.emitValid(s)}setBusiness(s){}emitUndo(){}emitValid(s){}};r([u({required:!0})],n.prototype,"showErrors",2);r([u({required:!0})],n.prototype,"businessLookup",2);r([u({required:!0})],n.prototype,"BusinessLookupServices",2);r([u({default:!1})],n.prototype,"hasBusinessLookupChanges",2);r([u({default:!1})],n.prototype,"editableBusinessName",2);r([u({default:"ACTIVE"})],n.prototype,"searchStatus",2);r([h("selectedBusiness")],n.prototype,"onSelectedBusiness",1);r([h("haveBusiness",{immediate:!0})],n.prototype,"onHaveBusinessChanged",1);r([h("isFormValid")],n.prototype,"onIsFormValidChanged",1);r([m("setBusiness")],n.prototype,"setBusiness",1);r([m("undoBusiness")],n.prototype,"emitUndo",1);r([m("valid")],n.prototype,"emitValid",1);n=r([L({})],n);var x=function(){var e=this,s=e._self._c;return e._self._setupProxy,s("div",{attrs:{id:"business-lookup"}},[e.state!==e.States.SUMMARY?s("div",[s("v-autocomplete",{staticClass:"mt-5",attrs:{filled:"","no-filter":"","append-icon":"","return-object":"",autocomplete:"chrome-off","menu-props":"{ maxHeight: 380 }",label:"Business or Corporation Name or Incorporation Number","item-text":"identifier",name:Math.random(),rules:e.showErrors?e.businessLookupRules:[],items:e.searchResults,loading:e.state==e.States.SEARCHING,"hide-no-data":e.state!=e.States.NO_RESULTS},on:{"update:search-input":function(t){return e.onSearchInput(t)}},scopedSlots:e._u([{key:"selection",fn:function(){},proxy:!0},{key:"no-data",fn:function(){return[s("v-list-item",[s("div",[e._v("No matches found.")])])]},proxy:!0},{key:"item",fn:function({item:t}){return[s("v-row",{staticClass:"business-lookup-result pt-1"},[s("v-col",{attrs:{cols:"2"}},[s("div",{staticClass:"result-identifier"},[e._v(" "+e._s(t.identifier)+" ")])]),s("v-col",{attrs:{cols:"10"}},[s("div",{staticClass:"result-name"},[e._v(" "+e._s(t.name)+" ")]),s("div",{staticClass:"result-bn"},[e._v(" "+e._s(t.bn)+" ")])])],1)]}}],null,!1,2512664218),model:{value:e.selectedBusiness,callback:function(t){e.selectedBusiness=t},expression:"selectedBusiness"}})],1):e._e(),e.state===e.States.SUMMARY&&e.haveBusiness?s("div",{staticClass:"summary-block mt-5"},[s("v-row",{attrs:{"no-gutters":""}},[s("v-col",{attrs:{cols:"10"}},[s("v-row",{attrs:{"no-gutters":""}},[s("v-col",{attrs:{cols:"12"}},[e.editableBusinessName?s("div",{staticClass:"d-flex align-center"},[s("label",[e._v("Business or Corporation Name:")]),s("v-text-field",{staticClass:"mx-4 mr-md-0",attrs:{id:"organization-name",dense:"",filled:"","hide-details":"auto",rules:e.businessNameRules,value:e.businessName},on:{input:function(t){return e.setBusinessName(t)}}})],1):[s("label",[e._v("Name: ")]),s("span",[e._v(e._s(e.businessName))])]],2)],1),s("v-row",{staticClass:"mt-1",attrs:{"no-gutters":""}},[s("v-col",{attrs:{cols:"12"}},[s("label",[e._v("Incorporation Number: ")]),s("span",[e._v(e._s(e.identifier))])])],1),s("v-row",{staticClass:"mt-1",attrs:{"no-gutters":""}},[s("v-col",{attrs:{cols:"12"}},[s("label",[e._v("Business Number: ")]),s("span",[e._v(e._s(e.businessNumber))])])],1)],1),s("v-col",{attrs:{cols:"2"}},[s("div",{attrs:{id:"bl-more-actions"}},[s("v-btn",{attrs:{id:"bl-undo-btn",text:"",color:"primary"},on:{click:function(t){return e.emitUndo()}}},[s("v-icon",{attrs:{small:""}},[e._v(" mdi-undo ")]),s("span",[e._v("Undo")])],1)],1)])],1)],1):e._e()])},R=[],_=C(n,x,R,!1,null,"d6c0c489",null,null);const w=_.exports;_.exports.__docgenInfo={exportName:"default",displayName:"BusinessLookup",description:"",tags:{},props:[{name:"showErrors",tags:{},description:"Whether to show errors.",type:{name:"boolean"},required:!0},{name:"businessLookup",tags:{},description:"The BusinessLookup object.",type:{name:"BusinessLookupIF"},required:!0},{name:"BusinessLookupServices",tags:{},description:"Class for BusinessLookup services.",type:{name:"any"},required:!0},{name:"hasBusinessLookupChanges",tags:{},description:"Whether to display Change features.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"editableBusinessName",tags:{},description:"Whether to allow editing of business name.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"searchStatus",tags:{},description:"Business status to search for (eg, ACTIVE or HISTORICAL or '' to match all.",type:{name:"string"},defaultValue:{func:!1,value:"'ACTIVE'"}}],events:[{name:"setBusiness",description:"Emits event to update the Business object."},{name:"undoBusiness",description:"Emits event to undo the selected business."},{name:"valid",description:"Emits event to update this component's validity."}],sourceFiles:["/home/severin/repos/bcrs-shared-components/src/components/business-lookup/BusinessLookup.vue"]};const F={title:"component/BusinessLookup"},I=(o,{argTypes:e})=>({props:Object.keys(e),components:{BusinessLookup:w},template:'<business-lookup v-bind="$props" />'}),d={identifier:"BC1234567",name:"Test Business Name"};class V{static async search(e){return Promise.resolve([d])}}const l=I.bind({});l.args={showErrors:!1,businessLookup:{identifier:d.identifier,name:d.name},BusinessLookupServices:V,hasBusinessLookupChanges:!0};var v,f,b;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    BusinessLookup
  },
  template: '<business-lookup v-bind="$props" />' // $props comes from args below
})`,...(b=(f=l.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};const H=["Default"];export{l as Default,H as __namedExportsOrder,F as default};
//# sourceMappingURL=BusinessLookup.stories-645c1145.js.map
