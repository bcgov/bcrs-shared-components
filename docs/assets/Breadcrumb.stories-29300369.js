var $=Object.defineProperty;var w=(a,r,e)=>r in a?$(a,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[r]=e;var l=(a,r,e)=>(w(a,typeof r!="symbol"?r+"":r,e),e);import{V as D}from"./vue.esm-b1e57a2f.js";import{C as T,P,n as j}from"./_plugin-vue2_normalizer-b11a0120.js";var k=Object.defineProperty,A=Object.getOwnPropertyDescriptor,O=(a,r,e,t)=>{for(var s=t>1?void 0:t?A(r,e):r,o=a.length-1,c;o>=0;o--)(c=a[o])&&(s=(t?c(r,e,s):c(s))||s);return t&&s&&k(r,e,s),s};let u=class extends D{constructor(){super(...arguments);l(this,"breadcrumbs")}get backUrl(){var t,s,o;const e=this.breadcrumbs.findIndex(c=>{var d,i;return((d=c.to)==null?void 0:d.name)===((i=this.$route)==null?void 0:i.name)});return((t=this.breadcrumbs[e-1])==null?void 0:t.href)||((o=(s=this.breadcrumbs[e-1])==null?void 0:s.to)==null?void 0:o.name)}isActiveCrumb(e){var t,s;return((t=this.$route)==null?void 0:t.name)!==((s=e==null?void 0:e.to)==null?void 0:s.name)}};O([P({default:()=>[]})],u.prototype,"breadcrumbs",2);u=O([T({})],u);var S=function(){var r=this,e=r._self._c;return r._self._setupProxy,e("div",{attrs:{id:"breadcrumb"}},[e("v-container",[e("v-row",{attrs:{"no-gutters":""}},[e("v-col",{attrs:{cols:"auto"}},[e("v-btn",{staticClass:"back-btn",attrs:{id:"breadcrumb-back-btn",exact:"",href:r.backUrl,icon:"",small:"",disabled:r.breadcrumbs.length<=1}},[e("v-icon",{attrs:{color:"primary"}},[r._v(" mdi-arrow-left ")])],1)],1),e("v-divider",{staticClass:"mx-3",attrs:{color:"white",vertical:""}}),e("v-col",{staticClass:"breadcrumb-col",attrs:{cols:"auto"}},[e("v-breadcrumbs",{staticClass:"pa-0 ma-0",attrs:{items:r.breadcrumbs},scopedSlots:r._u([{key:"divider",fn:function(){return[e("v-icon",{staticClass:"mx-n2",attrs:{color:"white"}},[r._v(" mdi-chevron-right ")])]},proxy:!0},{key:"item",fn:function({item:t}){return[e("v-breadcrumbs-item",{attrs:{exact:"",to:t.to,href:t.href}},[e("span",{staticClass:"breadcrumb-text",class:r.isActiveCrumb(t)?"active-crumb":"inactive-crumb"},[r._v(" "+r._s(t.text)+" ")])])]}}])})],1)],1)],1)],1)},I=[],R=j(u,S,I,!1,null,"3ef17b59",null,null);const F=R.exports;R.exports.__docgenInfo={exportName:"default",displayName:"Breadcrumb",description:"",tags:{},props:[{name:"breadcrumbs",tags:{},description:`Breadcrumb meta data.
Example breadcrumb:
{
 text: My Dashboard,
 to: { name: Routes.DASHBOARD }
}`,type:{name:"Array",elements:[{name:"BreadcrumbIF"}]},defaultValue:{func:!0,value:"() => []"}}],sourceFiles:["C:/Users/SHAOTONG/Desktop/Github/bcrs-shared-components/src/components/breadcrumb/Breadcrumb.vue"]};const G={title:"component/Breadcrumb"},p=(a,{argTypes:r})=>({props:Object.keys(r),components:{Breadcrumb:F},template:'<Breadcrumb v-bind="$props" />'}),n=p.bind({});n.args={breadcrumbs:[{text:"BC Registries Dashboard"}]};const m=p.bind({});m.args={breadcrumbs:[{text:"BC Registries Dashboard",to:{name:"/?path=/story/component-breadcrumb--home-route"}},{text:"BC12345678"}]};const b=p.bind({});b.args={breadcrumbs:[{text:"BC Registries Dashboard",to:{name:"component-breadcrumb--navigation-route"}},{text:"BC12345678",to:{name:"/?path=/story/component-breadcrumb--base-route"}},{text:"some route"}]};var v,_,f;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    Breadcrumb
  },
  template: '<Breadcrumb v-bind="$props" />' // $props comes from args below
})`,...(f=(_=n.parameters)==null?void 0:_.docs)==null?void 0:f.source}}};var g,h,x;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    Breadcrumb
  },
  template: '<Breadcrumb v-bind="$props" />' // $props comes from args below
})`,...(x=(h=m.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var y,B,C;b.parameters={...b.parameters,docs:{...(y=b.parameters)==null?void 0:y.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    Breadcrumb
  },
  template: '<Breadcrumb v-bind="$props" />' // $props comes from args below
})`,...(C=(B=b.parameters)==null?void 0:B.docs)==null?void 0:C.source}}};const H=["homeRoute","baseRoute","navigationRoute"];export{H as __namedExportsOrder,m as baseRoute,G as default,n as homeRoute,b as navigationRoute};
//# sourceMappingURL=Breadcrumb.stories-29300369.js.map
