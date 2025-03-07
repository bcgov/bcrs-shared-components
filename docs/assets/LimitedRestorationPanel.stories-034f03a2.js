var T=Object.defineProperty;var N=(s,e,t)=>e in s?T(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var n=(s,e,t)=>(N(s,typeof e!="symbol"?e+"":e,t),t);import{V as S}from"./vue.esm-b1e57a2f.js";import{C as j,P as $,E as w,n as E}from"./_plugin-vue2_normalizer-b11a0120.js";import{W as f}from"./Watch-62f8b699.js";var D=Object.defineProperty,F=Object.getOwnPropertyDescriptor,i=(s,e,t,o)=>{for(var r=o>1?void 0:o?F(e,t):e,c=s.length-1,h;c>=0;c--)(h=s[c])&&(r=(o?h(e,t,r):h(r))||r);return o&&r&&D(e,t,r),r};let a=class extends S{constructor(){super(...arguments);n(this,"$refs");n(this,"months");n(this,"maxNumberOfMonths");n(this,"radioValue","");n(this,"inputValue","")}get monthsRules(){return[t=>+t>0&&+t<=this.maxNumberOfMonths||"Must be between 1 and "+this.maxNumberOfMonths,t=>+t%1===0||"Must be a whole number"]}mounted(){[24,18,12,6].includes(this.months)?this.radioValue=this.months.toString():(this.radioValue="customMonths",this.inputValue=this.months.toString())}async onValueChanged(){var t;if(this.radioValue==="customMonths"){await this.$nextTick();const o=(t=this.$refs.monthsRef)==null?void 0:t.validate();this.emitMonths(o?+this.inputValue:null),this.emitValid(o)}else this.$refs.monthsRef.resetValidation(),this.emitMonths(+this.radioValue),this.emitValid(!0)}emitMonths(t){}emitValid(t){}};i([$({required:!0})],a.prototype,"months",2);i([$({default:24})],a.prototype,"maxNumberOfMonths",2);i([f("radioValue"),f("inputValue")],a.prototype,"onValueChanged",1);i([w("months")],a.prototype,"emitMonths",1);i([w("valid")],a.prototype,"emitValid",1);a=i([j({})],a);var k=function(){var e=this,t=e._self._c;return e._self._setupProxy,t("v-radio-group",{staticClass:"mt-0 pt-0 ml-8",attrs:{mandatory:""},model:{value:e.radioValue,callback:function(o){e.radioValue=o},expression:"radioValue"}},[t("v-radio",{staticClass:"radio-button pt-2",attrs:{id:"radio-24",label:"2 years",value:"24"}}),t("v-radio",{staticClass:"radio-button pt-2",attrs:{id:"radio-18",label:"18 months",value:"18"}}),t("v-radio",{staticClass:"radio-button pt-2",attrs:{id:"radio-12",label:"12 months",value:"12"}}),t("v-radio",{staticClass:"radio-button pt-2",attrs:{id:"radio-6",label:"6 months",value:"6"}}),t("v-row",{staticClass:"ml-0 mt-0 radio-button pt-2"},[t("v-radio",{staticClass:"mt-n4",attrs:{id:"radio-custom",value:"customMonths"}}),t("v-form",{ref:"monthsRef"},[t("v-text-field",{staticClass:"text-field-months",attrs:{id:"text-field-months",type:"number",dense:"",filled:"","hide-spin-buttons":"",rules:e.monthsRules,disabled:e.radioValue!=="customMonths"},model:{value:e.inputValue,callback:function(o){e.inputValue=o},expression:"inputValue"}})],1),t("span",{staticClass:"ml-2 mt-2 month-text"},[e._v("month(s)")])],1)],1)},q=[],L=E(a,k,q,!1,null,"847226fb",null,null);const W=L.exports;L.exports.__docgenInfo={exportName:"default",displayName:"LimitedRestorationPanel",description:"",tags:{},props:[{name:"months",tags:{},type:{name:"number"},required:!0},{name:"maxNumberOfMonths",tags:{},type:{name:"number"},defaultValue:{func:!1,value:"24"}}],events:[{name:"months",description:"Emits the number of months selected."},{name:"valid",description:"Emits the component validity."}],sourceFiles:["/home/severin/repos/bcrs-shared-components/src/components/limited-restoration-panel/LimitedRestorationPanel.vue"]};const H={title:"component/LimitedRestorationPanel"},u=(s,{argTypes:e})=>({props:Object.keys(e),components:{LimitedRestorationPanel:W},template:'<limited-restoration-panel v-bind="$props" />'}),m=u.bind({});m.args={months:0};const l=u.bind({});l.args={months:24};const p=u.bind({});p.args={months:1};const d=u.bind({});d.args={months:36,maxNumberOfMonths:36};var b,v,g;m.parameters={...m.parameters,docs:{...(b=m.parameters)==null?void 0:b.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    LimitedRestorationPanel
  },
  template: '<limited-restoration-panel v-bind="$props" />' // $props comes from args below
})`,...(g=(v=m.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var _,y,V;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    LimitedRestorationPanel
  },
  template: '<limited-restoration-panel v-bind="$props" />' // $props comes from args below
})`,...(V=(y=l.parameters)==null?void 0:y.docs)==null?void 0:V.source}}};var x,M,P;p.parameters={...p.parameters,docs:{...(x=p.parameters)==null?void 0:x.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    LimitedRestorationPanel
  },
  template: '<limited-restoration-panel v-bind="$props" />' // $props comes from args below
})`,...(P=(M=p.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var R,O,C;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    LimitedRestorationPanel
  },
  template: '<limited-restoration-panel v-bind="$props" />' // $props comes from args below
})`,...(C=(O=d.parameters)==null?void 0:O.docs)==null?void 0:C.source}}};const J=["Default","twentyFourMonths","oneMonth","thirtySixMonths"];export{m as Default,J as __namedExportsOrder,H as default,p as oneMonth,d as thirtySixMonths,l as twentyFourMonths};
//# sourceMappingURL=LimitedRestorationPanel.stories-034f03a2.js.map
