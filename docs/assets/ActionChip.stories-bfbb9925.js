var x=Object.defineProperty;var N=(t,e,o)=>e in t?x(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var m=(t,e,o)=>(N(t,typeof e!="symbol"?e+"":e,o),o);import{V as L}from"./vue.esm-b1e57a2f.js";import{C as $,P as T,n as M}from"./_plugin-vue2_normalizer-b11a0120.js";import{V as P}from"./vuetify-b9fb25b0.js";import"./_commonjsHelpers-de833af9.js";var p=(t=>(t.ADDED="ADDED",t.ADDRESS_CHANGED="ADDRESS CHANGED",t.CORRECTED="CORRECTED",t.EDITED="EDITED",t.EMAIL_CHANGED="EMAIL CHANGED",t.NAME_CHANGED="NAME CHANGED",t.REMOVED="REMOVED",t.REPLACED="REPLACED",t))(p||{}),S=Object.defineProperty,j=Object.getOwnPropertyDescriptor,u=(t,e,o,d)=>{for(var r=d>1?void 0:d?j(e,o):e,E=t.length-1,D;E>=0;E--)(D=t[E])&&(r=(d?D(e,o,r):D(r))||r);return d&&r&&S(e,o,r),r};let n=class extends L{constructor(){super(...arguments);m(this,"actionableItem");m(this,"editedLabel");m(this,"ActionTypes",p)}};u([T({default:{}})],n.prototype,"actionableItem",2);u([T({default:"EDITED"})],n.prototype,"editedLabel",2);n=u([$({})],n);var G=function(){var e=this,o=e._self._c;return e._self._setupProxy,o("div",[e.actionableItem.action===e.ActionTypes.ADDED?o("v-chip",{attrs:{id:"added-chip","x-small":"",label:"",color:"primary","text-color":"white"}},[e._v(" ADDED ")]):e._e(),e.actionableItem.action===e.ActionTypes.EDITED?o("v-chip",{attrs:{id:"edited-chip","x-small":"",label:"",color:"primary","text-color":"white"}},[e._v(" "+e._s(e.editedLabel)+" ")]):e._e(),e.actionableItem.action===e.ActionTypes.REMOVED?o("v-chip",{attrs:{id:"removed-chip","x-small":"",label:"",color:"#E0E0E0","text-color":"#212529"}},[e._v(" REMOVED ")]):e._e()],1)},H=[],V=M(n,G,H,!1,null,null,null,null);const F=V.exports;V.exports.__docgenInfo={exportName:"default",displayName:"ActionChip",description:"",tags:{},props:[{name:"actionableItem",tags:{},type:{name:"ActionableItemIF"},defaultValue:{func:!1,value:"{}"}},{name:"editedLabel",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"'EDITED'"}}],sourceFiles:["/home/severin/repos/bcrs-shared-components/src/components/action-chip/ActionChip.vue"]};const W={title:"component/ActionChip"},l=(t,{argTypes:e})=>({vuetify:new P({iconfont:"mdi"}),props:Object.keys(e),components:{ActionChip:F},template:'<action-chip v-bind="$props" />'}),z={action:p.ADDED},k={action:p.REMOVED},w={action:p.EDITED},a=l.bind({});a.args={actionableItem:z};const s=l.bind({});s.args={actionableItem:k};const i=l.bind({});i.args={actionableItem:w,editedLabel:"CHANGED"};const c=l.bind({});c.args={actionableItem:w,editedLabel:"CORRECTED"};var f,b,v;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  vuetify: new Vuetify({
    iconfont: 'mdi'
  }),
  props: Object.keys(argTypes),
  components: {
    ActionChip
  },
  template: '<action-chip v-bind="$props" />' // $props comes from args below
})`,...(v=(b=a.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var _,A,C;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  vuetify: new Vuetify({
    iconfont: 'mdi'
  }),
  props: Object.keys(argTypes),
  components: {
    ActionChip
  },
  template: '<action-chip v-bind="$props" />' // $props comes from args below
})`,...(C=(A=s.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var g,h,y;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  vuetify: new Vuetify({
    iconfont: 'mdi'
  }),
  props: Object.keys(argTypes),
  components: {
    ActionChip
  },
  template: '<action-chip v-bind="$props" />' // $props comes from args below
})`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var I,O,R;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  vuetify: new Vuetify({
    iconfont: 'mdi'
  }),
  props: Object.keys(argTypes),
  components: {
    ActionChip
  },
  template: '<action-chip v-bind="$props" />' // $props comes from args below
})`,...(R=(O=c.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};const X=["added","removed","editedAlteration","editedCorrection"];export{X as __namedExportsOrder,a as added,W as default,i as editedAlteration,c as editedCorrection,s as removed};
//# sourceMappingURL=ActionChip.stories-bfbb9925.js.map
