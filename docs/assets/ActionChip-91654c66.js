var _=Object.defineProperty;var d=(t,e,a)=>e in t?_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var n=(t,e,a)=>(d(t,typeof e!="symbol"?e+"":e,a),a);import{V as m}from"./vue.esm-b1e57a2f.js";import{C as u,P as E,n as v}from"./_plugin-vue2_normalizer-b11a0120.js";var D=(t=>(t.ADDED="ADDED",t.ADDRESS_CHANGED="ADDRESS CHANGED",t.CORRECTED="CORRECTED",t.EDITED="EDITED",t.EMAIL_CHANGED="EMAIL CHANGED",t.NAME_CHANGED="NAME CHANGED",t.REMOVED="REMOVED",t.REPLACED="REPLACED",t))(D||{}),f=Object.defineProperty,A=Object.getOwnPropertyDescriptor,c=(t,e,a,r)=>{for(var o=r>1?void 0:r?A(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(o=(r?s(e,a,o):s(o))||o);return r&&o&&f(e,a,o),o};let l=class extends m{constructor(){super(...arguments);n(this,"actionableItem");n(this,"editedLabel");n(this,"ActionTypes",D)}};c([E({default:{}})],l.prototype,"actionableItem",2);c([E({default:"EDITED"})],l.prototype,"editedLabel",2);l=c([u({})],l);var C=function(){var e=this,a=e._self._c;return e._self._setupProxy,a("div",[e.actionableItem.action===e.ActionTypes.ADDED?a("v-chip",{attrs:{id:"added-chip","x-small":"",label:"",color:"primary","text-color":"white"}},[e._v(" ADDED ")]):e._e(),e.actionableItem.action===e.ActionTypes.EDITED?a("v-chip",{attrs:{id:"edited-chip","x-small":"",label:"",color:"primary","text-color":"white"}},[e._v(" "+e._s(e.editedLabel)+" ")]):e._e(),e.actionableItem.action===e.ActionTypes.REMOVED?a("v-chip",{attrs:{id:"removed-chip","x-small":"",label:"",color:"#E0E0E0","text-color":"#212529"}},[e._v(" REMOVED ")]):e._e()],1)},h=[],p=v(l,C,h,!1,null,null,null,null);const N=p.exports;p.exports.__docgenInfo={exportName:"default",displayName:"ActionChip",description:"",tags:{},props:[{name:"actionableItem",tags:{},type:{name:"ActionableItemIF"},defaultValue:{func:!1,value:"{}"}},{name:"editedLabel",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"'EDITED'"}}],sourceFiles:["/Users/dev/Downloads/Data/Projects/BC/Relationship/bcrs-shared-components/src/components/action-chip/ActionChip.vue"]};export{D as A,N as a};
//# sourceMappingURL=ActionChip-91654c66.js.map
