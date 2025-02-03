var E=Object.defineProperty;var x=(i,e,t)=>e in i?E(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var a=(i,e,t)=>(x(i,typeof e!="symbol"?e+"":e,t),t);import{V as L}from"./vue.esm-b1e57a2f.js";import{E as f,C as S,P as l,n as $}from"./_plugin-vue2_normalizer-b11a0120.js";import{W as V}from"./Watch-62f8b699.js";var A=Object.defineProperty,O=Object.getOwnPropertyDescriptor,n=(i,e,t,o)=>{for(var r=o>1?void 0:o?O(e,t):e,m=i.length-1,p;m>=0;m--)(p=i[m])&&(r=(o?p(e,t,r):p(r))||r);return o&&r&&A(e,t,r),r};let s=class extends L{constructor(){super(...arguments);a(this,"initialValue");a(this,"originalValue");a(this,"hideActions");a(this,"editLabel");a(this,"editedLabel");a(this,"invalidSection");a(this,"isEditing",!1);a(this,"formValid",!1);a(this,"folioNumber","");a(this,"dropdown",!1);a(this,"rules",[t=>!t||t.length<=30||"Maximum 30 characters reached"])}get hasFolioNumberChanged(){const t=this.folioNumber||null,o=this.originalValue||null;return t!==o}onUndoClicked(){this.folioNumber=this.originalValue,this.emitNewFolioNumber(),this.emitHaveChanges(),this.isEditing=!1}onFormSubmit(){this.formValid&&(this.emitNewFolioNumber(),this.emitHaveChanges(),this.isEditing=!1)}onCancelClicked(){this.folioNumber=this.initialValue,this.isEditing=!1}onInitialValueChanged(){this.folioNumber=this.initialValue}emitNewFolioNumber(){return this.folioNumber}emitHaveChanges(){return this.hasFolioNumberChanged}emitIsEditing(t){}};n([l({default:null})],s.prototype,"initialValue",2);n([l({default:null})],s.prototype,"originalValue",2);n([l({default:!1})],s.prototype,"hideActions",2);n([l()],s.prototype,"editLabel",2);n([l()],s.prototype,"editedLabel",2);n([l({default:!1})],s.prototype,"invalidSection",2);n([V("initialValue",{deep:!0,immediate:!0})],s.prototype,"onInitialValueChanged",1);n([f("newFolioNumber")],s.prototype,"emitNewFolioNumber",1);n([f("haveChanges")],s.prototype,"emitHaveChanges",1);n([V("isEditing"),f("isEditing")],s.prototype,"emitIsEditing",1);s=n([S({})],s);var P=function(){var e=this,t=e._self._c;return e._self._setupProxy,t("div",{attrs:{id:"folio-number"}},[e.isEditing?t("v-form",{attrs:{id:"edit-folio-number"},on:{submit:function(o){return o.preventDefault(),e.onFormSubmit()}},model:{value:e.formValid,callback:function(o){e.formValid=o},expression:"formValid"}},[t("v-row",{attrs:{"no-gutters":""}},[t("v-col",{attrs:{cols:"3"}},[t("label",{class:{"error-text":e.invalidSection}},[t("strong",[e._v("Business Folio or"),t("br"),e._v("Reference Number")])])]),t("v-col",{attrs:{cols:"9"}})],1),t("v-row",{attrs:{"no-gutters":""}},[t("v-col",{attrs:{cols:"3"}}),t("v-col",{staticClass:"my-4",attrs:{cols:"9"}},[t("p",[e._v(" This is the Folio or Reference Number for this business for your own tracking purposes. There is no fee to change this number. Any changes made will be applied immediately. ")])])],1),t("v-row",{attrs:{"no-gutters":""}},[t("v-col",{attrs:{cols:"3"}}),t("v-col",{attrs:{cols:"9"}},[t("v-text-field",{attrs:{id:"folio-number-input",filled:"","persistent-hint":"",autocomplete:"chrome-off",label:"Folio or Reference Number (Optional)",name:Math.random(),rules:e.rules},model:{value:e.folioNumber,callback:function(o){e.folioNumber=o},expression:"folioNumber"}})],1)],1),t("v-row",{attrs:{"no-gutters":""}},[t("v-col",[t("div",{staticClass:"form-actions"},[t("v-btn",{staticClass:"save-button",attrs:{large:"",color:"primary",type:"submit",value:"Submit"}},[t("span",[e._v("Save")])]),t("v-btn",{staticClass:"cancel-button",attrs:{large:"",outlined:"",color:"primary"},on:{click:function(o){return e.onCancelClicked()}}},[t("span",[e._v("Cancel")])])],1)])],1)],1):t("v-row",{attrs:{id:"display-folio-number","no-gutters":""}},[t("v-col",{attrs:{cols:"3"}},[t("label",{staticClass:"reference-number-label"},[t("div",[e._v("Business Folio or"),t("br"),e._v("Reference Number")]),e.hasFolioNumberChanged?t("v-chip",{attrs:{"x-small":"",label:"",color:"primary","text-color":"white"}},[e._v(" "+e._s(e.editedLabel)+" ")]):e._e()],1)]),t("v-col",{attrs:{cols:e.hideActions?"9":"7"}},[t("div",{attrs:{id:"folio-number-readonly"}},[e._v(" "+e._s(e.folioNumber?e.folioNumber:"None")+" ")])]),e.hideActions?e._e():t("v-col",{staticClass:"mt-n2",attrs:{cols:"2"}},[t("div",{staticClass:"edit-actions mr-4"},[e.hasFolioNumberChanged?t("v-btn",{staticClass:"undo-button",attrs:{text:"",color:"primary"},on:{click:function(o){return e.onUndoClicked()}}},[t("v-icon",{attrs:{small:""}},[e._v(" mdi-undo ")]),t("span",[e._v("Undo")])],1):t("v-tooltip",{attrs:{top:"","nudge-right":"3","content-class":"top-tooltip",transition:"fade-transition"},scopedSlots:e._u([{key:"activator",fn:function({on:o}){return[t("v-btn",e._g({staticClass:"edit-button",attrs:{text:"",color:"primary"},on:{click:function(r){e.isEditing=!0}}},o),[t("v-icon",{attrs:{small:""}},[e._v(" mdi-pencil ")]),t("span",[e._v(e._s(e.editLabel))])],1)]}}],null,!1,3261953394)},[t("span",[e._v("No fee to change")])]),e.hasFolioNumberChanged?t("span",{staticClass:"drop-down-actions"},[t("v-menu",{attrs:{"offset-y":"",left:"","nudge-bottom":"4"},scopedSlots:e._u([{key:"activator",fn:function({on:o}){return[t("v-btn",e._g({staticClass:"more-button",attrs:{text:"",small:"",color:"primary"}},o),[t("v-icon",[e._v(e._s(e.dropdown?"mdi-menu-up":"mdi-menu-down"))])],1)]}}],null,!1,3067832248),model:{value:e.dropdown,callback:function(o){e.dropdown=o},expression:"dropdown"}},[t("v-list",[t("v-list-item",{staticClass:"v-list-item change-button",on:{click:function(o){e.isEditing=!0,e.dropdown=!1}}},[t("v-list-item-subtitle",[t("v-icon",{attrs:{small:"",color:"primary"}},[e._v("mdi-pencil")]),t("span",{staticClass:"drop-down-action ml-1"},[e._v("Change")])],1)],1)],1)],1)],1):e._e()],1)])],1)],1)},T=[],k=$(s,P,T,!1,null,"27d9dbbd",null,null);const D=k.exports;k.exports.__docgenInfo={exportName:"default",displayName:"FolioNumber",description:"",tags:{},props:[{name:"initialValue",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"originalValue",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"hideActions",tags:{},type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"editLabel",tags:{},type:{name:"string"}},{name:"editedLabel",tags:{},type:{name:"string"}},{name:"invalidSection",tags:{},type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"newFolioNumber",description:"Informs parent of new folio number."},{name:"haveChanges",description:"Informs parent whether we have changes."}],sourceFiles:["/Users/dev/Downloads/Data/Projects/BC/Relationship/bcrs-shared-components/src/components/folio-number/FolioNumber.vue"]};const U={title:"component/FolioNumber"},b=(i,{argTypes:e})=>({props:Object.keys(e),components:{FolioNumber:D},template:`
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
})`,...(F=(w=d.parameters)==null?void 0:w.docs)==null?void 0:F.source}}};const W=["folioNumberNoProps","folioNumberWithData","folioNumberHideActions"];export{W as __namedExportsOrder,U as default,d as folioNumberHideActions,c as folioNumberNoProps,u as folioNumberWithData};
//# sourceMappingURL=FolioNumber.stories-fea2822a.js.map
