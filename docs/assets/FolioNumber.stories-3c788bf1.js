var E=Object.defineProperty;var x=(i,e,o)=>e in i?E(i,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[e]=o;var s=(i,e,o)=>(x(i,typeof e!="symbol"?e+"":e,o),o);import{V as L}from"./vue.esm-b1e57a2f.js";import{E as f,C as S,P as l}from"./Prop-817ec8de.js";import{W as V}from"./Watch-c62128e4.js";import{n as $}from"./_plugin-vue2_normalizer-2bbd088e.js";var A=Object.defineProperty,O=Object.getOwnPropertyDescriptor,n=(i,e,o,t)=>{for(var r=t>1?void 0:t?O(e,o):e,m=i.length-1,p;m>=0;m--)(p=i[m])&&(r=(t?p(e,o,r):p(r))||r);return t&&r&&A(e,o,r),r};let a=class extends L{constructor(){super(...arguments);s(this,"initialValue");s(this,"originalValue");s(this,"hideActions");s(this,"editLabel");s(this,"editedLabel");s(this,"invalidSection");s(this,"isEditing",!1);s(this,"formValid",!1);s(this,"folioNumber","");s(this,"dropdown",!1);s(this,"rules",[o=>!o||o.length<=30||"Maximum 30 characters reached"])}get hasFolioNumberChanged(){const o=this.folioNumber||null,t=this.originalValue||null;return o!==t}onUndoClicked(){this.folioNumber=this.originalValue,this.emitNewFolioNumber(),this.emitHaveChanges(),this.isEditing=!1}onFormSubmit(){this.formValid&&(this.emitNewFolioNumber(),this.emitHaveChanges(),this.isEditing=!1)}onCancelClicked(){this.folioNumber=this.initialValue,this.isEditing=!1}onInitialValueChanged(){this.folioNumber=this.initialValue}emitNewFolioNumber(){return this.folioNumber}emitHaveChanges(){return this.hasFolioNumberChanged}emitIsEditing(o){}};n([l({default:null})],a.prototype,"initialValue",2);n([l({default:null})],a.prototype,"originalValue",2);n([l({default:!1})],a.prototype,"hideActions",2);n([l()],a.prototype,"editLabel",2);n([l()],a.prototype,"editedLabel",2);n([l({default:!1})],a.prototype,"invalidSection",2);n([V("initialValue",{deep:!0,immediate:!0})],a.prototype,"onInitialValueChanged",1);n([f("newFolioNumber")],a.prototype,"emitNewFolioNumber",1);n([f("haveChanges")],a.prototype,"emitHaveChanges",1);n([V("isEditing"),f("isEditing")],a.prototype,"emitIsEditing",1);a=n([S({})],a);var P=function(){var e=this,o=e._self._c;return e._self._setupProxy,o("div",{attrs:{id:"folio-number"}},[e.isEditing?o("v-form",{attrs:{id:"edit-folio-number"},on:{submit:function(t){return t.preventDefault(),e.onFormSubmit()}},model:{value:e.formValid,callback:function(t){e.formValid=t},expression:"formValid"}},[o("v-row",{attrs:{"no-gutters":""}},[o("v-col",{attrs:{cols:"3"}},[o("label",{class:{"error-text":e.invalidSection}},[o("strong",[e._v("Business Folio or"),o("br"),e._v("Reference Number")])])]),o("v-col",{attrs:{cols:"9"}})],1),o("v-row",{attrs:{"no-gutters":""}},[o("v-col",{attrs:{cols:"3"}}),o("v-col",{staticClass:"my-4",attrs:{cols:"9"}},[o("p",[e._v(" This is the Folio or Reference Number for this business for your own tracking purposes. There is no fee to change this number. Any changes made will be applied immediately. ")])])],1),o("v-row",{attrs:{"no-gutters":""}},[o("v-col",{attrs:{cols:"3"}}),o("v-col",{attrs:{cols:"9"}},[o("v-text-field",{attrs:{id:"folio-number-input",filled:"","persistent-hint":"",autocomplete:"chrome-off",label:"Folio or Reference Number (Optional)",name:Math.random(),rules:e.rules},model:{value:e.folioNumber,callback:function(t){e.folioNumber=t},expression:"folioNumber"}})],1)],1),o("v-row",{attrs:{"no-gutters":""}},[o("v-col",[o("div",{staticClass:"form-actions"},[o("v-btn",{staticClass:"save-button",attrs:{large:"",color:"primary",type:"submit",value:"Submit"}},[o("span",[e._v("Save")])]),o("v-btn",{staticClass:"cancel-button",attrs:{large:"",outlined:"",color:"primary"},on:{click:function(t){return e.onCancelClicked()}}},[o("span",[e._v("Cancel")])])],1)])],1)],1):o("v-row",{attrs:{id:"display-folio-number","no-gutters":""}},[o("v-col",{attrs:{cols:"3"}},[o("label",{staticClass:"reference-number-label"},[o("div",[e._v("Business Folio or"),o("br"),e._v("Reference Number")]),e.hasFolioNumberChanged?o("v-chip",{attrs:{"x-small":"",label:"",color:"primary","text-color":"white"}},[e._v(" "+e._s(e.editedLabel)+" ")]):e._e()],1)]),o("v-col",{attrs:{cols:e.hideActions?"9":"7"}},[o("div",{attrs:{id:"folio-number-readonly"}},[e._v(" "+e._s(e.folioNumber?e.folioNumber:"None")+" ")])]),e.hideActions?e._e():o("v-col",{staticClass:"mt-n2",attrs:{cols:"2"}},[o("div",{staticClass:"edit-actions mr-4"},[e.hasFolioNumberChanged?o("v-btn",{staticClass:"undo-button",attrs:{text:"",color:"primary"},on:{click:function(t){return e.onUndoClicked()}}},[o("v-icon",{attrs:{small:""}},[e._v(" mdi-undo ")]),o("span",[e._v("Undo")])],1):o("v-tooltip",{attrs:{top:"","nudge-right":"3","content-class":"top-tooltip",transition:"fade-transition"},scopedSlots:e._u([{key:"activator",fn:function({on:t}){return[o("v-btn",e._g({staticClass:"edit-button",attrs:{text:"",color:"primary"},on:{click:function(r){e.isEditing=!0}}},t),[o("v-icon",{attrs:{small:""}},[e._v(" mdi-pencil ")]),o("span",[e._v(e._s(e.editLabel))])],1)]}}],null,!1,3261953394)},[o("span",[e._v("No fee to change")])]),e.hasFolioNumberChanged?o("span",{staticClass:"drop-down-actions"},[o("v-menu",{attrs:{"offset-y":"",left:"","nudge-bottom":"4"},scopedSlots:e._u([{key:"activator",fn:function({on:t}){return[o("v-btn",e._g({staticClass:"more-button",attrs:{text:"",small:"",color:"primary"}},t),[o("v-icon",[e._v(e._s(e.dropdown?"mdi-menu-up":"mdi-menu-down"))])],1)]}}],null,!1,3067832248),model:{value:e.dropdown,callback:function(t){e.dropdown=t},expression:"dropdown"}},[o("v-list",[o("v-list-item",{staticClass:"v-list-item change-button",on:{click:function(t){e.isEditing=!0,e.dropdown=!1}}},[o("v-list-item-subtitle",[o("v-icon",{attrs:{small:"",color:"primary"}},[e._v("mdi-pencil")]),o("span",{staticClass:"drop-down-action ml-1"},[e._v("Change")])],1)],1)],1)],1)],1):e._e()],1)])],1)],1)},T=[],k=$(a,P,T,!1,null,"27d9dbbd",null,null);const I=k.exports;k.exports.__docgenInfo={exportName:"default",displayName:"FolioNumber",description:"",tags:{},props:[{name:"initialValue",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"originalValue",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"hideActions",tags:{},type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"editLabel",tags:{},type:{name:"string"}},{name:"editedLabel",tags:{},type:{name:"string"}},{name:"invalidSection",tags:{},type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"newFolioNumber",description:"Informs parent of new folio number."},{name:"haveChanges",description:"Informs parent whether we have changes."}],sourceFiles:["/Users/cameron.bowler/_Never Backup/bcrs-shared-components/src/components/folio-number/FolioNumber.vue"]};const W={title:"component/FolioNumber"},b=(i,{argTypes:e})=>({props:Object.keys(e),components:{FolioNumber:I},template:`
    <div class="pa-4" style="background-color: #f1f3f5">
      <folio-number v-bind="$props" class="pa-4" style="background-color: white" />
    </div>
  `}),c=b.bind({});c.args={editLabel:"Edit",editedLabel:"Edited"};const u=b.bind({});u.args={editLabel:"Edit",editedLabel:"Edited",initialValue:"ABC-123",originalValue:"DEF-456"};const d=b.bind({});d.args={editLabel:"Edit",editedLabel:"Edited",hideActions:!0};var v,g,h;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    FolioNumber
  },
  // $props comes from args below
  template: \`
    <div class="pa-4" style="background-color: #f1f3f5">
      <folio-number v-bind="$props" class="pa-4" style="background-color: white" />
    </div>
  \`
})`,...(h=(g=c.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var _,y,N;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    FolioNumber
  },
  // $props comes from args below
  template: \`
    <div class="pa-4" style="background-color: #f1f3f5">
      <folio-number v-bind="$props" class="pa-4" style="background-color: white" />
    </div>
  \`
})`,...(N=(y=u.parameters)==null?void 0:y.docs)==null?void 0:N.source}}};var C,w,F;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    FolioNumber
  },
  // $props comes from args below
  template: \`
    <div class="pa-4" style="background-color: #f1f3f5">
      <folio-number v-bind="$props" class="pa-4" style="background-color: white" />
    </div>
  \`
})`,...(F=(w=d.parameters)==null?void 0:w.docs)==null?void 0:F.source}}};const M=["folioNumberNoProps","folioNumberWithData","folioNumberHideActions"];export{M as __namedExportsOrder,W as default,d as folioNumberHideActions,c as folioNumberNoProps,u as folioNumberWithData};
//# sourceMappingURL=FolioNumber.stories-3c788bf1.js.map
