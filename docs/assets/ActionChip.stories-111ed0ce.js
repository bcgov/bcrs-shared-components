var x=Object.defineProperty;var N=(t,e,o)=>e in t?x(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var d=(t,e,o)=>(N(t,typeof e!="symbol"?e+"":e,o),o);import{V as L}from"./vue.esm-340a2d96.js";import{C as $,P as T}from"./Prop-6f7b3d6a.js";import{n as M}from"./_plugin-vue2_normalizer-2bbd088e.js";import{V as P}from"./vuetify-1b40f931.js";import"./_commonjsHelpers-de833af9.js";var p=(t=>(t.ADDED="ADDED",t.ADDRESS_CHANGED="ADDRESS CHANGED",t.CORRECTED="CORRECTED",t.EDITED="EDITED",t.EMAIL_CHANGED="EMAIL CHANGED",t.NAME_CHANGED="NAME CHANGED",t.REMOVED="REMOVED",t.REPLACED="REPLACED",t))(p||{}),S=Object.defineProperty,j=Object.getOwnPropertyDescriptor,u=(t,e,o,m)=>{for(var n=m>1?void 0:m?j(e,o):e,E=t.length-1,D;E>=0;E--)(D=t[E])&&(n=(m?D(e,o,n):D(n))||n);return m&&n&&S(e,o,n),n};let c=class extends L{constructor(){super(...arguments);d(this,"actionableItem");d(this,"editedLabel");d(this,"ActionTypes",p)}};u([T({default:{}})],c.prototype,"actionableItem",2);u([T({default:"EDITED"})],c.prototype,"editedLabel",2);c=u([$({})],c);var G=function(){var e=this,o=e._self._c;return e._self._setupProxy,o("div",[e.actionableItem.action===e.ActionTypes.ADDED?o("v-chip",{attrs:{id:"added-chip","x-small":"",label:"",color:"primary","text-color":"white"}},[e._v(" ADDED ")]):e._e(),e.actionableItem.action===e.ActionTypes.EDITED?o("v-chip",{attrs:{id:"edited-chip","x-small":"",label:"",color:"primary","text-color":"white"}},[e._v(" "+e._s(e.editedLabel)+" ")]):e._e(),e.actionableItem.action===e.ActionTypes.REMOVED?o("v-chip",{attrs:{id:"removed-chip","x-small":"",label:"",color:"#E0E0E0","text-color":"#212529"}},[e._v(" REMOVED ")]):e._e()],1)},H=[],V=M(c,G,H,!1,null,null,null,null);const F=V.exports;V.exports.__docgenInfo={exportName:"default",displayName:"ActionChip",description:"",tags:{},props:[{name:"actionableItem",tags:{},type:{name:"ActionableItemIF"},defaultValue:{func:!1,value:"{}"}},{name:"editedLabel",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"'EDITED'"}}],sourceFiles:["/Users/kial/work/bcrs-shared-components/src/components/action-chip/ActionChip.vue"]};const X={title:"component/ActionChip"},l=(t,{argTypes:e})=>({vuetify:new P({iconfont:"mdi"}),props:Object.keys(e),components:{ActionChip:F},template:'<action-chip v-bind="$props" />'}),k={action:p.ADDED},z={action:p.REMOVED},w={action:p.EDITED},r=l.bind({});r.args={actionableItem:k};const a=l.bind({});a.args={actionableItem:z};const s=l.bind({});s.args={actionableItem:w,editedLabel:"CHANGED"};const i=l.bind({});i.args={actionableItem:w,editedLabel:"CORRECTED"};var f,b,v;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`(args, {
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
})`,...(v=(b=r.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var _,A,C;a.parameters={...a.parameters,docs:{...(_=a.parameters)==null?void 0:_.docs,source:{originalSource:`(args, {
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
})`,...(C=(A=a.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var g,y,h;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`(args, {
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
})`,...(h=(y=s.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var I,O,R;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`(args, {
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
})`,...(R=(O=i.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};const Y=["added","removed","editedAlteration","editedCorrection"];export{Y as __namedExportsOrder,r as added,X as default,s as editedAlteration,i as editedCorrection,a as removed};
