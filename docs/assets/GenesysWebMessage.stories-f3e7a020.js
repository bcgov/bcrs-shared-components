var K=Object.defineProperty;var w=(t,s,e)=>s in t?K(t,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[s]=e;var l=(t,s,e)=>(w(t,typeof s!="symbol"?s+"":s,e),e);import{V as R}from"./vue.esm-b1e57a2f.js";import{C as G,P as i}from"./Prop-817ec8de.js";import{n as P}from"./_plugin-vue2_normalizer-2bbd088e.js";var M=Object.defineProperty,U=Object.getOwnPropertyDescriptor,y=(t,s,e,n)=>{for(var r=n>1?void 0:n?U(s,e):s,p=t.length-1,a;p>=0;p--)(a=t[p])&&(r=(n?a(s,e,r):a(r))||r);return n&&r&&M(s,e,r),r};let o=class extends R{constructor(){super(...arguments);l(this,"genesysURL");l(this,"environmentKey");l(this,"deploymentKey")}mounted(){this.genesysURL&&this.environmentKey&&this.deploymentKey!=="0"&&this.initWebMsg(window,"Genesys",this.genesysURL,{environment:this.environmentKey,deploymentId:this.deploymentKey},null)}beforeDestroy(){localStorage.removeItem("_actmu")}initWebMsg(e,n,r,p,a){e._genesysJs=n,e[n]=e[n]||function(){(e[n].q=e[n].q||[]).push(arguments)},e[n].t=new Date().getTime(),e[n].c=p,a=document.createElement("script"),a.async=1,a.src=r,a.charset="utf-8",document.head.appendChild(a),localStorage.removeItem("_actmu")}};y([i({default:null})],o.prototype,"genesysURL",2);y([i({default:null})],o.prototype,"environmentKey",2);y([i({default:"0"})],o.prototype,"deploymentKey",2);o=y([G({})],o);var W=function(){var s=this,e=s._self._c;return s._self._setupProxy,e("div",{staticClass:"d-none"})},L=[],_=P(o,W,L,!1,null,null,null,null);const O=_.exports;_.exports.__docgenInfo={description:"",tags:{property:[{title:"property",type:{name:"string"},name:"genesysURL",description:"the URL to the genesys library"},{title:"property",type:{name:"string"},name:"environmentKey",description:"the environment key (ID)"},{title:"property",type:{name:"string"},name:"deploymentKey",description:"the deployment key (ID)"}]},exportName:"default",displayName:"GenesysWebMessage",props:[{name:"genesysURL",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"environmentKey",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"deploymentKey",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"'0'"}}],sourceFiles:["/Users/cameron.bowler/_Never Backup/bcrs-shared-components/src/components/genesys-web-message/GenesysWebMessage.vue"]};const S={title:"component/GenesysWebMessage"},h=(t,{argTypes:s})=>({props:Object.keys(s),components:{GenesysWebMessage:O},template:'<genesys-web-message v-bind="$props" />'}),m=h.bind({});m.args={genesysURL:"https://apps.cac1.pure.cloud/genesys-bootstrap/genesys.min.js",environmentKey:"cac1",deploymentKey:"5c012aaa-1f17-4d0b-8da2-bea9c1133d5d"};const c=h.bind({});c.args={genesysURL:"https://apps.cac1.pure.cloud/genesys-bootstrap/genesys.min.js",environmentKey:"cac1",deploymentKey:"42ed05f4-d545-436b-ba2c-94b66ed3396f"};var d,u,g;m.parameters={...m.parameters,docs:{...(d=m.parameters)==null?void 0:d.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    GenesysWebMessage
  },
  template: '<genesys-web-message v-bind="$props" />' // $props comes from args below
})`,...(g=(u=m.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var f,b,v;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    GenesysWebMessage
  },
  template: '<genesys-web-message v-bind="$props" />' // $props comes from args below
})`,...(v=(b=c.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};const T=["nameRequest","SPGP"];export{c as SPGP,T as __namedExportsOrder,S as default,m as nameRequest};
//# sourceMappingURL=GenesysWebMessage.stories-f3e7a020.js.map
