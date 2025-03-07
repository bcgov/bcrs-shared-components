var m=Object.defineProperty;var y=(o,e,a)=>e in o?m(o,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[e]=a;var l=(o,e,a)=>(y(o,typeof e!="symbol"?e+"":e,a),a);import{m as h,E as u,C as g,P as r,n as v}from"./_plugin-vue2_normalizer-b11a0120.js";import{W as p}from"./Watch-62f8b699.js";import{D as x}from"./validation-mixin-aefd6a63.js";var b=Object.defineProperty,k=Object.getOwnPropertyDescriptor,n=(o,e,a,i)=>{for(var s=i>1?void 0:i?k(e,a):e,d=o.length-1,c;d>=0;d--)(c=o[d])&&(s=(i?c(e,a,s):c(s))||s);return i&&s&&b(e,a,s),s};let t=class extends h(x){constructor(){super(...arguments);l(this,"$refs");l(this,"attach");l(this,"title");l(this,"errorMsg");l(this,"inputRules");l(this,"disablePicker");l(this,"initialValue");l(this,"showCurrent");l(this,"minDate");l(this,"maxDate");l(this,"nudgeTop");l(this,"nudgeBottom");l(this,"nudgeRight");l(this,"nudgeLeft");l(this,"hint");l(this,"persistentHint");l(this,"clearable");l(this,"appendIcon");l(this,"dateText",null);l(this,"displayPicker",!1)}clearDate(){this.dateText="",this.displayPicker=!1}validateForm(){return this.$refs.form.validate()}isDateValid(){var a,i;return(i=(a=this.$refs)==null?void 0:a.dateTextField)==null?void 0:i.valid}created(){this.dateText=this.initialValue}get displayDate(){return this.yyyyMmDdToPacificDate(this.dateText,!0)}get enableSelector(){return!this.displayPicker&&!this.disablePicker}emitDate(a){this.displayPicker=!1}emitCancel(){this.clearDate()}emitClear(){this.clearDate()}emitDateSync(){return this.dateText}hidePicker(){this.displayPicker=!1}};n([r({default:null})],t.prototype,"attach",2);n([r({default:""})],t.prototype,"title",2);n([r({default:null})],t.prototype,"errorMsg",2);n([r({default:()=>[]})],t.prototype,"inputRules",2);n([r({default:!1})],t.prototype,"disablePicker",2);n([r({default:null})],t.prototype,"initialValue",2);n([r({default:!0})],t.prototype,"showCurrent",2);n([r({default:""})],t.prototype,"minDate",2);n([r({default:""})],t.prototype,"maxDate",2);n([r({default:null})],t.prototype,"nudgeTop",2);n([r({default:null})],t.prototype,"nudgeBottom",2);n([r({default:null})],t.prototype,"nudgeRight",2);n([r({default:null})],t.prototype,"nudgeLeft",2);n([r({default:""})],t.prototype,"hint",2);n([r({default:!1})],t.prototype,"persistentHint",2);n([r({default:!1})],t.prototype,"clearable",2);n([r({default:"mdi-calendar"})],t.prototype,"appendIcon",2);n([u("emitDate")],t.prototype,"emitDate",1);n([u("emitCancel")],t.prototype,"emitCancel",1);n([u("emitClear")],t.prototype,"emitClear",1);n([p("dateText"),u("emitDateSync")],t.prototype,"emitDateSync",1);n([p("$route")],t.prototype,"hidePicker",1);t=n([g({})],t);var D=function(){var e=this,a=e._self._c;return e._self._setupProxy,a("v-form",{ref:"form",staticClass:"date-picker-form",attrs:{attach:e.attach}},[a("v-menu",{attrs:{"close-on-click":!1,"close-on-content-click":!1,"nudge-top":e.nudgeTop,"nudge-bottom":e.nudgeBottom,"nudge-left":e.nudgeLeft,"nudge-right":e.nudgeRight,transition:"scale-transition","offset-y":"",bottom:"","min-width":"290"},scopedSlots:e._u([{key:"activator",fn:function({on:i}){return[a("span",e._g({class:{"date-text-field-pointer":e.enableSelector}},e.enableSelector&&i),[a("v-text-field",{ref:"dateTextField",class:{"disable-picker":e.disablePicker},attrs:{id:"date-text-field","append-icon":e.appendIcon,autocomplete:"chrome-off",clearable:e.clearable,"error-messages":e.errorMsg,error:!!e.errorMsg,value:e.displayDate,label:e.title,name:Math.random(),rules:e.inputRules,hint:e.hint,"persistent-hint":e.persistentHint,"hide-details":"auto",readonly:"",filled:""},on:{"click:clear":function(s){return e.emitClear()},keydown:function(s){return s.preventDefault()},keyup:function(s){return!s.type.indexOf("key")&&e._k(s.keyCode,"enter",13,s.key,"Enter")?null:e.emitDate(e.dateText)}}})],1)]}}]),model:{value:e.displayPicker,callback:function(i){e.displayPicker=i},expression:"displayPicker"}},[a("v-date-picker",{attrs:{id:"date-picker-calendar",width:"490","show-current":e.showCurrent,min:e.minDate,max:e.maxDate},scopedSlots:e._u([{key:"default",fn:function(){return[a("div",[a("v-btn",{attrs:{id:"btn-done",text:"",color:"primary"},on:{click:function(i){return e.emitDate(e.dateText)}}},[a("span",{staticClass:"font-weight-bold"},[e._v("OK")])]),a("v-btn",{attrs:{id:"btn-cancel",text:"",color:"primary"},on:{click:function(i){return e.emitCancel()}}},[a("span",[e._v("Cancel")])])],1)]},proxy:!0}]),model:{value:e.dateText,callback:function(i){e.dateText=i},expression:"dateText"}})],1)],1)},_=[],f=v(t,D,_,!1,null,"f834ee33",null,null);const S=f.exports;f.exports.__docgenInfo={description:`This is a local, minimal mixin containing only the methods needed for the shared
components when they run within this project (ie, in Storybook).

When imported into an app project, the shared components should use the mixins
local to that project.`,tags:{},exportName:"default",displayName:"DatePicker",props:[{name:"attach",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"title",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"errorMsg",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"inputRules",tags:{},type:{name:"Array",elements:[{name:"TSFunctionType"}]},defaultValue:{func:!0,value:"() => []"}},{name:"disablePicker",tags:{},type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"initialValue",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"showCurrent",tags:{},type:{name:"union",elements:[{name:"boolean"},{name:"string"}]},defaultValue:{func:!1,value:"true"}},{name:"minDate",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"maxDate",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"nudgeTop",tags:{},type:{name:"number"},defaultValue:{func:!1,value:"null"}},{name:"nudgeBottom",tags:{},type:{name:"number"},defaultValue:{func:!1,value:"null"}},{name:"nudgeRight",tags:{},type:{name:"number"},defaultValue:{func:!1,value:"null"}},{name:"nudgeLeft",tags:{},type:{name:"number"},defaultValue:{func:!1,value:"null"}},{name:"hint",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"persistentHint",tags:{},type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"clearable",tags:{},type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"appendIcon",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"'mdi-calendar'"}}],events:[{name:"emitDate",description:"Emit date to add or remove."},{name:"emitCancel",description:"Emit cancel event and clear the date."},{name:"emitClear",description:"Emit clear event and clear the date."}],sourceFiles:["/home/severin/repos/bcrs-shared-components/src/components/date-picker/DatePicker.vue","/home/severin/repos/bcrs-shared-components/src/mixins/date-mixin.ts"]};export{S as D};
//# sourceMappingURL=DatePicker-7efa3707.js.map
