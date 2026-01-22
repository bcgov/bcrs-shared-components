import{r as a,m as e,B as f}from"./BaseAddress-6d0aaa3f.js";import{V as B}from"./vuetify-b9fb25b0.js";import"./vue.esm-b1e57a2f.js";import"./params-036f571e.js";import"./_plugin-vue2_normalizer-b11a0120.js";import"./Watch-62f8b699.js";import"./lodash-f6b38868.js";import"./_commonjsHelpers-de833af9.js";import"./validation-mixin-61dc4f18.js";const $={title:"component/BaseAddress"},d={streetAddress:{required:a,maxLength:e(50)},streetAddressAdditional:{maxLength:e(50)},addressCity:{required:a,maxLength:e(40)},addressCountry:{required:a},addressRegion:{maxLength:e(2)},postalCode:{required:a,maxLength:e(15)},deliveryInstructions:{maxLength:e(80)}},o=(b,{argTypes:A})=>({vuetify:new B({iconfont:"mdi"}),props:Object.keys(A),components:{BaseAddress:f},template:'<BaseAddress v-bind="$props" />'}),s=o.bind({});s.args={editing:!0,schema:d,address:{}};const r=o.bind({});r.args={editing:!0,schema:d,address:{streetAddress:"1234 Sesame Street",streetAddressAdditional:"4th Floor",addressCity:"Victoria",addressRegion:"British Columbia",addressCountry:"Canada",postalCode:"V8N 1A1",deliveryInstructions:"Leave at front door"},noPoBox:!0,isInactive:!1};const t=o.bind({});t.args={editing:!0,schema:d,address:{streetAddress:"",streetAddressAdditional:"",addressCity:"",addressRegion:"",addressCountry:"CA",postalCode:"",deliveryInstructions:""},noPoBox:!0,isInactive:!1};var n,i,p;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  vuetify: new Vuetify({
    iconfont: 'mdi'
  }),
  props: Object.keys(argTypes),
  components: {
    BaseAddress
  },
  template: '<BaseAddress v-bind="$props" />' // $props comes from args below
})`,...(p=(i=s.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var m,c,l;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  vuetify: new Vuetify({
    iconfont: 'mdi'
  }),
  props: Object.keys(argTypes),
  components: {
    BaseAddress
  },
  template: '<BaseAddress v-bind="$props" />' // $props comes from args below
})`,...(l=(c=r.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var u,g,y;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  vuetify: new Vuetify({
    iconfont: 'mdi'
  }),
  props: Object.keys(argTypes),
  components: {
    BaseAddress
  },
  template: '<BaseAddress v-bind="$props" />' // $props comes from args below
})`,...(y=(g=t.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};const S=["DefaultBaseAddress","FilledInBaseAddress","FilledCountryInBaseAddress"];export{s as DefaultBaseAddress,t as FilledCountryInBaseAddress,r as FilledInBaseAddress,S as __namedExportsOrder,$ as default};
//# sourceMappingURL=BaseAddress.stories-795303f8.js.map
