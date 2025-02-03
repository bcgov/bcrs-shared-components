var C=Object.defineProperty;var P=(a,e,r)=>e in a?C(a,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[e]=r;var o=(a,e,r)=>(P(a,typeof e!="symbol"?e+"":e,r),r);import{V as A}from"./vue.esm-b1e57a2f.js";import{E as f,C as x,P as m}from"./Prop-817ec8de.js";import{W as n}from"./Watch-c62128e4.js";import{n as R}from"./_plugin-vue2_normalizer-2bbd088e.js";var D=Object.defineProperty,S=Object.getOwnPropertyDescriptor,u=(a,e,r,s)=>{for(var l=s>1?void 0:s?S(e,r):e,c=a.length-1,p;c>=0;c--)(p=a[c])&&(l=(s?p(e,r,l):p(l))||l);return s&&l&&D(e,r,l),l};let t=class extends A{constructor(){super(...arguments);o(this,"$refs");o(this,"draftCourtOrderNumber");o(this,"hasDraftPlanOfArrangement");o(this,"invalidSection");o(this,"displaySideLabels");o(this,"courtOrderNumberRequired");o(this,"courtOrderNumber","");o(this,"courtOrderNumRules",[]);o(this,"planOfArrangement",!1);o(this,"valid",!1)}mounted(){this.draftCourtOrderNumber&&(this.courtOrderNumber=this.draftCourtOrderNumber),this.hasDraftPlanOfArrangement&&(this.planOfArrangement=this.hasDraftPlanOfArrangement)}clearValidations(){this.courtOrderNumRules=[],this.$refs.courtNumRef.resetValidation()}validate(){return this.$refs.courtNumRef.validate()}validateCourtNum(){this.courtOrderNumRules=[r=>!r||!/^\s/g.test(r)||"Invalid spaces",r=>!r||!/\s$/g.test(r)||"Invalid spaces",r=>!r||!(r.length<5)||"Court order number is invalid",r=>!r||!(r.length>20)||"Court order number is invalid"],(this.courtOrderNumberRequired||this.planOfArrangement)&&this.courtOrderNumRules.push(r=>!!r||"A Court Order number is required"),this.$refs.courtNumRef.validate()}emitCourtNumber(){return this.courtOrderNumber}emitPoa(){return this.planOfArrangement}emitValid(){return this.valid}};u([m({default:""})],t.prototype,"draftCourtOrderNumber",2);u([m({default:!1})],t.prototype,"hasDraftPlanOfArrangement",2);u([m({default:!1})],t.prototype,"invalidSection",2);u([m({default:!0})],t.prototype,"displaySideLabels",2);u([m({default:!1})],t.prototype,"courtOrderNumberRequired",2);u([n("planOfArrangement"),n("courtOrderNumber"),n("courtOrderNumberRequired")],t.prototype,"validateCourtNum",1);u([n("courtOrderNumber"),f("emitCourtNumber")],t.prototype,"emitCourtNumber",1);u([n("planOfArrangement"),f("emitPoa")],t.prototype,"emitPoa",1);u([n("valid"),f("emitValid")],t.prototype,"emitValid",1);t=u([x({})],t);var V=function(){var e=this,r=e._self._c;return e._self._setupProxy,r("div",{attrs:{id:"court-order-poa"}},[r("v-row",{attrs:{"no-gutters":""}},[e.displaySideLabels?r("v-col",{staticClass:"pr-4",attrs:{cols:"12",sm:"3"}},[r("label",{class:{"error-text":e.invalidSection},attrs:{id:"court-order-label"}},[e._v("Court Order Number")])]):e._e(),r("v-col",{attrs:{cols:"12",sm:e.displaySideLabels?9:12}},[r("v-form",{ref:"courtNumRef",attrs:{id:"court-num-form"},model:{value:e.valid,callback:function(s){e.valid=s},expression:"valid"}},[r("v-text-field",{attrs:{id:"court-order-number-input",label:"Court Order Number",rules:e.courtOrderNumRules,filled:""},model:{value:e.courtOrderNumber,callback:function(s){e.courtOrderNumber=s},expression:"courtOrderNumber"}})],1)],1)],1),r("v-row",{attrs:{"no-gutters":""}},[e.displaySideLabels?r("v-col",{staticClass:"pr-4",attrs:{cols:"12",sm:"3"}},[r("label",{attrs:{id:"poa-label"}},[e._v("Plan of Arrangement")])]):e._e(),r("v-col",{attrs:{cols:"12",sm:e.displaySideLabels?9:12}},[r("v-checkbox",{staticClass:"mt-0 pt-0",attrs:{id:"plan-of-arrangement-checkbox","hide-details":"",label:"This filing is pursuant to a Plan of Arrangement"},model:{value:e.planOfArrangement,callback:function(s){e.planOfArrangement=s},expression:"planOfArrangement"}})],1)],1)],1)},$=[],h=R(t,V,$,!1,null,"a8c1acf0",null,null);const q=h.exports;h.exports.__docgenInfo={exportName:"default",displayName:"CourtOrderPoa",description:"",tags:{},props:[{name:"draftCourtOrderNumber",tags:{},description:"Draft court order number.",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"hasDraftPlanOfArrangement",tags:{},description:"Draft plan of arrangement.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"invalidSection",tags:{},description:"Prompt Error.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"displaySideLabels",tags:{},description:"Display side labels.",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"courtOrderNumberRequired",tags:{},description:"Whether court order number is required regardless plan of arrangement.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["/Users/cameron.bowler/_Never Backup/bcrs-shared-components/src/components/court-order-poa/CourtOrderPoa.vue"]};const I={title:"component/CourtOrderPoa"},y=(a,{argTypes:e})=>({props:Object.keys(e),components:{CourtOrderPoa:q},template:'<court-order-poa v-bind="$props" />'}),d=y.bind({});d.args={validate:!1};const i=y.bind({});i.args={draftCourtOrderNumber:"1234-56789",hasDraftPlanOfArrangement:!0};var b,O,v;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    CourtOrderPoa
  },
  template: '<court-order-poa v-bind="$props" />' // $props comes from args below
})`,...(v=(O=d.parameters)==null?void 0:O.docs)==null?void 0:v.source}}};var g,N,_;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    CourtOrderPoa
  },
  template: '<court-order-poa v-bind="$props" />' // $props comes from args below
})`,...(_=(N=i.parameters)==null?void 0:N.docs)==null?void 0:_.source}}};const W=["courtOrderPoa","courtOrderPoaDraft"];export{W as __namedExportsOrder,d as courtOrderPoa,i as courtOrderPoaDraft,I as default};
//# sourceMappingURL=CourtOrderPoa.stories-13bca7a4.js.map
