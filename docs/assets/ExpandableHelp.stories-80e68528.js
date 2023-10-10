var b=Object.defineProperty;var v=(a,e,l)=>e in a?b(a,e,{enumerable:!0,configurable:!0,writable:!0,value:l}):a[e]=l;var c=(a,e,l)=>(v(a,typeof e!="symbol"?e+"":e,l),l);import{V as g}from"./vue.esm-b1e57a2f.js";import{C as u,P as f,n as x}from"./_plugin-vue2_normalizer-b11a0120.js";var H=Object.defineProperty,y=Object.getOwnPropertyDescriptor,_=(a,e,l,t)=>{for(var p=t>1?void 0:t?y(e,l):e,o=a.length-1,r;o>=0;o--)(r=a[o])&&(p=(t?r(e,l,p):r(p))||p);return t&&p&&H(e,l,p),p};let s=class extends g{constructor(){super(...arguments);c(this,"helpLabel");c(this,"helpToggle",!1)}};_([f({default:"Show Help"})],s.prototype,"helpLabel",2);s=_([u({})],s);var T=function(){var e=this,l=e._self._c;return e._self._setupProxy,l("div",{staticClass:"expandable-help"},[l("div",{staticClass:"help-btn top",on:{click:function(t){e.helpToggle=!e.helpToggle}}},[l("v-icon",{attrs:{color:"primary"}},[e._v(" mdi-help-circle-outline ")]),l("span",{staticClass:"pl-2 help-label"},[e._v(e._s(e.helpToggle?"Hide Help":e.helpLabel))])],1),l("v-expand-transition",[l("div",{directives:[{name:"show",rawName:"v-show",value:e.helpToggle,expression:"helpToggle"}],staticClass:"help-section mt-3 pa-6"},[e._t("content"),l("div",{staticClass:"d-flex justify-end"},[l("div",{staticClass:"help-btn bottom",on:{click:function(t){e.helpToggle=!e.helpToggle}}},[l("span",[e._v("Hide Help")])])])],2)])],1)},C=[],h=x(s,T,C,!1,null,"d6b17343",null,null);const w=h.exports;h.exports.__docgenInfo={exportName:"default",displayName:"ExpandableHelp",description:"",tags:{},props:[{name:"helpLabel",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"'Show Help'"}}],slots:[{name:"content"}],sourceFiles:["/home/kdeodhar/gitRepo/bcrs-shared-components/src/components/expandable-help/ExpandableHelp.vue"]};const L={title:"component/ExpandableHelp"},E=(a,{argTypes:e})=>({props:Object.keys(e),components:{ExpandableHelp:w},template:`
    <expandable-help v-bind="$props">
      <template #content>${a.content}</template>
    </expandable-help`,methods:{}}),n=E.bind({});n.args={helpLabel:"Show Sample Help",content:"sample help text"};var d,i,m;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`(args, {
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
})`,...(m=(i=n.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const S=["base"];export{S as __namedExportsOrder,n as base,L as default};
//# sourceMappingURL=ExpandableHelp.stories-80e68528.js.map
