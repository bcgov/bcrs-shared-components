var H=Object.defineProperty;var V=(t,e,s)=>e in t?H(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var l=(t,e,s)=>(V(t,typeof e!="symbol"?e+"":e,s),s);import{V as L}from"./vue.esm-b1e57a2f.js";import{C as A,P as f,E as w,n as I}from"./_plugin-vue2_normalizer-b11a0120.js";import{W as _}from"./Watch-62f8b699.js";var h=(t=>(t.COURT_ORDERED_PARTY="Court Ordered Party",t.DIRECTOR="Director",t.HEIR_LEGAL_REP="Heir or Legal Representative",t.OFFICER="Officer",t.SHAREHOLDER="Shareholder",t))(h||{}),F=Object.defineProperty,$=Object.getOwnPropertyDescriptor,i=(t,e,s,a)=>{for(var r=a>1?void 0:a?$(e,s):e,R=t.length-1,m;R>=0;R--)(m=t[R])&&(r=(a?m(e,s,r):m(r))||r);return a&&r&&F(e,s,r),r};let o=class extends L{constructor(){super(...arguments);l(this,"draftRelationships");l(this,"bgHex");l(this,"showValidationErrors");l(this,"selectedRelationships",[]);l(this,"displayErrorState",!1);l(this,"RelationshipTypes",h)}mounted(){this.draftRelationships.length>0&&this.selectedRelationships.push(...this.draftRelationships),this.emitValidity()}emitChangedRelationships(){return this.selectedRelationships}emitValidity(){return this.selectedRelationships.length>0}setRelationships(){this.displayErrorState=this.showValidationErrors&&this.selectedRelationships.length===0,this.emitChangedRelationships(),this.emitValidity()}};i([f({default:()=>[]})],o.prototype,"draftRelationships",2);i([f({default:"#fff"})],o.prototype,"bgHex",2);i([f({default:!1})],o.prototype,"showValidationErrors",2);i([w("changed")],o.prototype,"emitChangedRelationships",1);i([w("valid")],o.prototype,"emitValidity",1);i([_("selectedRelationships"),_("showValidationErrors")],o.prototype,"setRelationships",1);o=i([A({})],o);var j=function(){var e=this,s=e._self._c;return e._self._setupProxy,s("v-card",{attrs:{id:"relationships-panel",flat:""}},[s("div",{staticClass:"relationship-content",style:{backgroundColor:e.bgHex}},[s("v-row",{staticClass:"align-center mt-5",attrs:{"no-gutters":""}},[s("v-col",{attrs:{cols:"4"}},[s("v-checkbox",{staticClass:"mt-0",attrs:{id:"heir-legal-rep-checkbox",value:e.RelationshipTypes.HEIR_LEGAL_REP,error:e.displayErrorState},scopedSlots:e._u([{key:"label",fn:function(){return[s("span",{staticClass:"checkbox-label"},[e._v(e._s(e.RelationshipTypes.HEIR_LEGAL_REP))])]},proxy:!0}]),model:{value:e.selectedRelationships,callback:function(a){e.selectedRelationships=a},expression:"selectedRelationships"}})],1),s("v-col",{attrs:{cols:"4"}},[s("v-checkbox",{staticClass:"mt-0",attrs:{id:"officer-checkbox",value:e.RelationshipTypes.OFFICER,error:e.displayErrorState},scopedSlots:e._u([{key:"label",fn:function(){return[s("span",{staticClass:"checkbox-label"},[e._v(e._s(e.RelationshipTypes.OFFICER))])]},proxy:!0}]),model:{value:e.selectedRelationships,callback:function(a){e.selectedRelationships=a},expression:"selectedRelationships"}})],1),s("v-col",{attrs:{cols:"4"}},[s("v-checkbox",{staticClass:"mt-0",attrs:{id:"director-checkbox",value:e.RelationshipTypes.DIRECTOR,error:e.displayErrorState},scopedSlots:e._u([{key:"label",fn:function(){return[s("span",{staticClass:"checkbox-label"},[e._v(e._s(e.RelationshipTypes.DIRECTOR))])]},proxy:!0}]),model:{value:e.selectedRelationships,callback:function(a){e.selectedRelationships=a},expression:"selectedRelationships"}})],1),s("v-col",{attrs:{cols:"4"}},[s("v-checkbox",{staticClass:"mt-0",attrs:{id:"shareholder-checkbox",value:e.RelationshipTypes.SHAREHOLDER,error:e.displayErrorState},scopedSlots:e._u([{key:"label",fn:function(){return[s("span",{staticClass:"checkbox-label"},[e._v(e._s(e.RelationshipTypes.SHAREHOLDER))])]},proxy:!0}]),model:{value:e.selectedRelationships,callback:function(a){e.selectedRelationships=a},expression:"selectedRelationships"}})],1),s("v-col",{attrs:{cols:"4"}},[s("v-checkbox",{staticClass:"mt-0",attrs:{id:"court-ordered-party-checkbox",value:e.RelationshipTypes.COURT_ORDERED_PARTY,error:e.displayErrorState},scopedSlots:e._u([{key:"label",fn:function(){return[s("span",{staticClass:"checkbox-label"},[e._v(e._s(e.RelationshipTypes.COURT_ORDERED_PARTY))])]},proxy:!0}]),model:{value:e.selectedRelationships,callback:function(a){e.selectedRelationships=a},expression:"selectedRelationships"}})],1)],1)],1)])},G=[],D=I(o,j,G,!1,null,"a79094ea",null,null);const U=D.exports;D.exports.__docgenInfo={exportName:"default",displayName:"RelationshipsPanel",description:"",tags:{},props:[{name:"draftRelationships",tags:{},description:"Draft restoration relationships",type:{name:"Array",elements:[{name:"RelationshipTypes"}]},defaultValue:{func:!0,value:"() => []"}},{name:"bgHex",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"'#fff'"}},{name:"showValidationErrors",tags:{},type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"changed",description:"Emits the changed relationships array."},{name:"valid",description:"Emits the component validity."}],sourceFiles:["/Users/cameron.bowler/_Never Backup/bcrs-shared-components/src/components/relationships-panel/RelationshipsPanel.vue"]};const q={title:"component/RelationshipsPanel"},u=(t,{argTypes:e})=>({props:Object.keys(e),components:{RelationshipsPanel:U},template:'<relationships-panel v-bind="$props" />'}),n=u.bind({});n.args={bgHex:"#fff",showValidationErrors:!1};const p=u.bind({});p.args={draftRelationships:[h.HEIR_LEGAL_REP,h.SHAREHOLDER]};const c=u.bind({});c.args={bgHex:"#00FF00"};const d=u.bind({});d.args={showValidationErrors:!0};var y,b,v;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    RelationshipsPanel
  },
  template: '<relationships-panel v-bind="$props" />' // $props comes from args below
})`,...(v=(b=n.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var g,E,x;p.parameters={...p.parameters,docs:{...(g=p.parameters)==null?void 0:g.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    RelationshipsPanel
  },
  template: '<relationships-panel v-bind="$props" />' // $props comes from args below
})`,...(x=(E=p.parameters)==null?void 0:E.docs)==null?void 0:x.source}}};var C,k,O;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    RelationshipsPanel
  },
  template: '<relationships-panel v-bind="$props" />' // $props comes from args below
})`,...(O=(k=c.parameters)==null?void 0:k.docs)==null?void 0:O.source}}};var P,T,S;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    RelationshipsPanel
  },
  template: '<relationships-panel v-bind="$props" />' // $props comes from args below
})`,...(S=(T=d.parameters)==null?void 0:T.docs)==null?void 0:S.source}}};const J=["Default","twoRelationshipsSelected","greenBackground","showValidationErrors"];export{n as Default,J as __namedExportsOrder,q as default,c as greenBackground,d as showValidationErrors,p as twoRelationshipsSelected};
//# sourceMappingURL=RelationshipsPanel.stories-476548d5.js.map
