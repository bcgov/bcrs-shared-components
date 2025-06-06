var w=Object.defineProperty;var R=(s,r,e)=>r in s?w(s,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[r]=e;var l=(s,r,e)=>(R(s,typeof r!="symbol"?r+"":r,e),e);import{V as D}from"./vue.esm-b1e57a2f.js";import{C as S,P,n as T}from"./_plugin-vue2_normalizer-b11a0120.js";var j=Object.defineProperty,k=Object.getOwnPropertyDescriptor,O=(s,r,e,t)=>{for(var a=t>1?void 0:t?k(r,e):r,o=s.length-1,c;o>=0;o--)(c=s[o])&&(a=(t?c(r,e,a):c(a))||a);return t&&a&&j(r,e,a),a};let u=class extends D{constructor(){super(...arguments);l(this,"breadcrumbs")}get backUrl(){var t,a,o;const e=this.breadcrumbs.findIndex(c=>{var p,i;return((p=c.to)==null?void 0:p.name)===((i=this.$route)==null?void 0:i.name)});return((t=this.breadcrumbs[e-1])==null?void 0:t.href)||((o=(a=this.breadcrumbs[e-1])==null?void 0:a.to)==null?void 0:o.name)}isActiveCrumb(e){var t,a;return((t=this.$route)==null?void 0:t.name)!==((a=e==null?void 0:e.to)==null?void 0:a.name)}};O([P({default:()=>[]})],u.prototype,"breadcrumbs",2);u=O([S({})],u);var A=function(){var r=this,e=r._self._c;return r._self._setupProxy,e("div",{attrs:{id:"breadcrumb"}},[e("v-container",[e("v-row",{attrs:{"no-gutters":""}},[e("v-col",{attrs:{cols:"auto"}},[e("v-btn",{staticClass:"back-btn",attrs:{id:"breadcrumb-back-btn",exact:"",href:r.backUrl,icon:"",small:"",disabled:r.breadcrumbs.length<=1}},[e("v-icon",{attrs:{color:"primary"}},[r._v(" mdi-arrow-left ")])],1)],1),e("v-divider",{staticClass:"mx-3",attrs:{color:"white",vertical:""}}),e("v-col",{staticClass:"breadcrumb-col",attrs:{cols:"auto"}},[e("v-breadcrumbs",{staticClass:"pa-0 ma-0",attrs:{items:r.breadcrumbs},scopedSlots:r._u([{key:"divider",fn:function(){return[e("v-icon",{staticClass:"mx-n2",attrs:{color:"white"}},[r._v(" mdi-chevron-right ")])]},proxy:!0},{key:"item",fn:function({item:t}){return[e("v-breadcrumbs-item",{attrs:{exact:"",to:t.to,href:t.href}},[e("span",{staticClass:"breadcrumb-text",class:r.isActiveCrumb(t)?"active-crumb":"inactive-crumb"},[r._v(" "+r._s(t.text)+" ")])])]}}])})],1)],1)],1)],1)},I=[],$=T(u,A,I,!1,null,"92dd3b29",null,null);const F=$.exports;$.exports.__docgenInfo={exportName:"default",displayName:"Breadcrumb",description:"",tags:{},props:[{name:"breadcrumbs",tags:{},description:`Breadcrumb meta data.
Example breadcrumb:
{
 text: My Dashboard,
 to: { name: Routes.DASHBOARD }
}`,type:{name:"Array",elements:[{name:"BreadcrumbIF"}]},defaultValue:{func:!0,value:"() => []"}}],sourceFiles:["/home/severin/repos/bcrs-shared-components/src/components/breadcrumb/Breadcrumb.vue"]};const z={title:"component/Breadcrumb"},d=(s,{argTypes:r})=>({props:Object.keys(r),components:{Breadcrumb:F},template:'<Breadcrumb v-bind="$props" />'}),n=d.bind({});n.args={breadcrumbs:[{text:"Service BC Connect Dashboard"}]};const m=d.bind({});m.args={breadcrumbs:[{text:"Service BC Connect Dashboard",to:{name:"/?path=/story/component-breadcrumb--home-route"}},{text:"BC12345678"}]};const b=d.bind({});b.args={breadcrumbs:[{text:"Service BC Connect Dashboard",to:{name:"component-breadcrumb--navigation-route"}},{text:"BC12345678",to:{name:"/?path=/story/component-breadcrumb--base-route"}},{text:"some route"}]};var v,_,f;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`(args, {
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
})`,...(C=(B=b.parameters)==null?void 0:B.docs)==null?void 0:C.source}}};const H=["homeRoute","baseRoute","navigationRoute"];export{H as __namedExportsOrder,m as baseRoute,z as default,n as homeRoute,b as navigationRoute};
//# sourceMappingURL=Breadcrumb.stories-adfbd8bc.js.map
