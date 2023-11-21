var L=Object.defineProperty;var N=(o,e,t)=>e in o?L(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var n=(o,e,t)=>(N(o,typeof e!="symbol"?e+"":e,t),t);import{V as T}from"./vue.esm-b1e57a2f.js";import{C as S,P as C,E as w,n as j}from"./_plugin-vue2_normalizer-b11a0120.js";import{W as E}from"./Watch-62f8b699.js";var k=Object.defineProperty,D=Object.getOwnPropertyDescriptor,i=(o,e,t,s)=>{for(var r=s>1?void 0:s?D(e,t):e,c=o.length-1,h;c>=0;c--)(h=o[c])&&(r=(s?h(e,t,r):h(r))||r);return s&&r&&k(e,t,r),r};let a=class extends T{constructor(){super(...arguments);n(this,"$refs");n(this,"months");n(this,"maxNumberOfMonths");n(this,"radioValue","");n(this,"inputValue","")}get monthsRules(){return[t=>+t>0&&+t<=this.maxNumberOfMonths||"Must be between 1 and "+this.maxNumberOfMonths,t=>+t%1===0||"Must be a whole number"]}mounted(){[24,18,12,6].includes(this.months)?this.radioValue=this.months.toString():(this.radioValue="customMonths",this.inputValue=this.months.toString())}async onMonthsInput(t){if(t!==null){await this.$nextTick();const s=this.$refs.monthsRef.validate();this.emitValid(s),s&&this.emitMonths(Number(this.inputValue))}}onRadioValueChanged(){this.radioValue!=="customMonths"?(this.$refs.monthsRef.reset(),this.emitMonths(Number(this.radioValue)),this.emitValid(!0)):this.inputValue||this.emitValid(!1)}emitMonths(t){}emitValid(t){}};i([C({required:!0})],a.prototype,"months",2);i([C({default:24})],a.prototype,"maxNumberOfMonths",2);i([E("radioValue")],a.prototype,"onRadioValueChanged",1);i([w("months")],a.prototype,"emitMonths",1);i([w("valid")],a.prototype,"emitValid",1);a=i([S({})],a);var F=function(){var e=this,t=e._self._c;return e._self._setupProxy,t("v-radio-group",{staticClass:"mt-0 pt-0 ml-8",attrs:{mandatory:""},model:{value:e.radioValue,callback:function(s){e.radioValue=s},expression:"radioValue"}},[t("v-radio",{staticClass:"radio-button pt-2",attrs:{id:"radio-24",label:"2 years",value:"24"}}),t("v-radio",{staticClass:"radio-button pt-2",attrs:{id:"radio-18",label:"18 months",value:"18"}}),t("v-radio",{staticClass:"radio-button pt-2",attrs:{id:"radio-12",label:"12 months",value:"12"}}),t("v-radio",{staticClass:"radio-button pt-2",attrs:{id:"radio-6",label:"6 months",value:"6"}}),t("v-row",{staticClass:"ml-0 mt-0 radio-button pt-2"},[t("v-radio",{staticClass:"mt-n4",attrs:{id:"radio-custom",value:"customMonths"}}),t("v-form",{ref:"monthsRef"},[t("v-text-field",{staticClass:"text-field-months",attrs:{id:"text-field-months",type:"number",dense:"",filled:"","hide-spin-buttons":"",rules:e.monthsRules,disabled:e.radioValue!=="customMonths"},on:{input:function(s){return e.onMonthsInput(s)}},model:{value:e.inputValue,callback:function(s){e.inputValue=s},expression:"inputValue"}})],1),t("span",{staticClass:"ml-2 mt-2 month-text"},[e._v("month(s)")])],1)],1)},I=[],$=j(a,F,I,!1,null,"288397b7",null,null);const q=$.exports;$.exports.__docgenInfo={exportName:"default",displayName:"LimitedRestorationPanel",description:"",tags:{},props:[{name:"months",tags:{},type:{name:"number"},required:!0},{name:"maxNumberOfMonths",tags:{},type:{name:"number"},defaultValue:{func:!1,value:"24"}}],events:[{name:"months",description:"Emits the numbed of months selected."},{name:"valid",description:"Emits whether the number of months selected is valid."}],sourceFiles:["/Users/work/repos/bcrs-shared-components/src/components/limited-restoration-panel/LimitedRestorationPanel.vue"]};const G={title:"component/LimitedRestorationPanel"},u=(o,{argTypes:e})=>({props:Object.keys(e),components:{LimitedRestorationPanel:q},template:'<limited-restoration-panel v-bind="$props" />'}),m=u.bind({});m.args={months:0};const l=u.bind({});l.args={months:24};const p=u.bind({});p.args={months:1};const d=u.bind({});d.args={months:36,maxNumberOfMonths:36};var f,b,v;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    LimitedRestorationPanel
  },
  template: '<limited-restoration-panel v-bind="$props" />' // $props comes from args below
})`,...(v=(b=m.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var g,_,y;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    LimitedRestorationPanel
  },
  template: '<limited-restoration-panel v-bind="$props" />' // $props comes from args below
})`,...(y=(_=l.parameters)==null?void 0:_.docs)==null?void 0:y.source}}};var V,M,x;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    LimitedRestorationPanel
  },
  template: '<limited-restoration-panel v-bind="$props" />' // $props comes from args below
})`,...(x=(M=p.parameters)==null?void 0:M.docs)==null?void 0:x.source}}};var R,P,O;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    LimitedRestorationPanel
  },
  template: '<limited-restoration-panel v-bind="$props" />' // $props comes from args below
})`,...(O=(P=d.parameters)==null?void 0:P.docs)==null?void 0:O.source}}};const H=["Default","twentyFourMonths","oneMonth","thirtySixMonths"];export{m as Default,H as __namedExportsOrder,G as default,p as oneMonth,d as thirtySixMonths,l as twentyFourMonths};
//# sourceMappingURL=LimitedRestorationPanel.stories-953dc766.js.map
