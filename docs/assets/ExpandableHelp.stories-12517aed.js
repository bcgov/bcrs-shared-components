var h=Object.defineProperty;var v=(a,e,l)=>e in a?h(a,e,{enumerable:!0,configurable:!0,writable:!0,value:l}):a[e]=l;var c=(a,e,l)=>(v(a,typeof e!="symbol"?e+"":e,l),l);import{V as g}from"./vue.esm-b1e57a2f.js";import{C as u,P as x,n as f}from"./_plugin-vue2_normalizer-b11a0120.js";var H=Object.defineProperty,y=Object.getOwnPropertyDescriptor,b=(a,e,l,t)=>{for(var p=t>1?void 0:t?y(e,l):e,o=a.length-1,r;o>=0;o--)(r=a[o])&&(p=(t?r(e,l,p):r(p))||p);return t&&p&&H(e,l,p),p};let s=class extends g{constructor(){super(...arguments);c(this,"helpToggle",!1);c(this,"helpLabel")}};b([x({default:"Show Help"})],s.prototype,"helpLabel",2);s=b([u({})],s);var T=function(){var e=this,l=e._self._c;return e._self._setupProxy,l("div",{staticClass:"expandable-help"},[l("div",{staticClass:"help-btn top mb-8"},[l("v-icon",{attrs:{color:"primary"}},[e._v(" mdi-help-circle-outline ")]),l("span",{staticClass:"pl-2 help-label",on:{click:function(t){e.helpToggle=!e.helpToggle}}},[e._v(e._s(e.helpToggle?"Hide Help":e.helpLabel))])],1),l("v-expand-transition",[l("div",{directives:[{name:"show",rawName:"v-show",value:e.helpToggle,expression:"helpToggle"}],staticClass:"help-section pa-6 my-3 mb-8"},[e._t("content"),l("div",{staticClass:"help-btn bottom text-right d-flex",on:{click:function(t){e.helpToggle=!e.helpToggle}}},[e._v(" Hide Help ")])],2)])],1)},w=[],_=f(s,T,w,!1,null,"326bad48",null,null);const C=_.exports;_.exports.__docgenInfo={exportName:"default",displayName:"ExpandableHelp",description:"",tags:{},props:[{name:"helpLabel",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"'Show Help'"}}],slots:[{name:"content"}],sourceFiles:["/home/severin/repos/bcrs-shared-components/src/components/expandable-help/ExpandableHelp.vue"]};const S={title:"component/ExpandableHelp"},E=(a,{argTypes:e})=>({props:Object.keys(e),components:{ExpandableHelp:C},template:`
    <expandable-help v-bind="$props">
      <template #content>${a.content}</template>
    </expandable-help`,methods:{}}),n=E.bind({});n.args={helpLabel:"Show Sample Help",content:"sample help text"};var d,m,i;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    ExpandableHelp
  },
  // $props comes from args below
  template: \`
    <expandable-help v-bind="$props">
      <template #content>\${args.content}</template>
    </expandable-help\`,
  methods: {}
})`,...(i=(m=n.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};const j=["base"];export{j as __namedExportsOrder,n as base,S as default};
//# sourceMappingURL=ExpandableHelp.stories-12517aed.js.map
