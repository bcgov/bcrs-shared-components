var f=Object.defineProperty;var _=(s,e,o)=>e in s?f(s,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[e]=o;var a=(s,e,o)=>(_(s,typeof e!="symbol"?e+"":e,o),o);import{V as u}from"./vue.esm-b1e57a2f.js";import{C as h,P as C,n as y}from"./_plugin-vue2_normalizer-b11a0120.js";var x=Object.defineProperty,b=Object.getOwnPropertyDescriptor,v=(s,e,o,t)=>{for(var n=t>1?void 0:t?b(e,o):e,i=s.length-1,r;i>=0;i--)(r=s[i])&&(n=(t?r(e,o,n):r(n))||n);return t&&n&&x(e,o,n),n};let c=class extends u{constructor(){super(...arguments);a(this,"attach");a(this,"dialog",!1);a(this,"resolve",null);a(this,"reject",null);a(this,"title",null);a(this,"message",null);a(this,"options",{width:400,zIndex:200,persistent:!1,yes:"Yes",no:"No",cancel:"Cancel"})}open(o,t,n){return this.dialog=!0,this.title=o,this.message=t,this.options=Object.assign(this.options,n),new Promise((i,r)=>{this.resolve=i,this.reject=r})}onClickYes(){this.resolve(!0),this.dialog=!1}onClickNo(){this.resolve(!1),this.dialog=!1}onClickCancel(){this.reject(),this.dialog=!1}};v([C()],c.prototype,"attach",2);c=v([h({})],c);var k=function(){var e=this,o=e._self._c;return e._self._setupProxy,o("v-dialog",{style:{zIndex:e.options.zIndex},attrs:{"content-class":"confirm-dialog","max-width":e.options.width,persistent:e.options.persistent,attach:e.attach},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"])?null:e.onClickCancel.apply(null,arguments)}},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[o("v-card",[o("v-card-title",[e._v(e._s(e.title))]),o("v-card-text",{directives:[{name:"show",rawName:"v-show",value:!!e.message,expression:"!!message"}],staticClass:"pre-wrap",domProps:{innerHTML:e._s(e.message)}}),o("v-divider",{directives:[{name:"show",rawName:"v-show",value:!!e.options.yes||!!e.options.no||!!e.options.cancel,expression:"!!options.yes || !!options.no || !!options.cancel"}],staticClass:"my-0"}),o("v-card-actions",[o("v-spacer"),e.options.yes?o("v-btn",{staticClass:"dialog-yes-btn",attrs:{text:"",color:"primary"},nativeOn:{click:function(t){return e.onClickYes()}}},[e._v(" "+e._s(e.options.yes)+" ")]):e._e(),e.options.no?o("v-btn",{staticClass:"dialog-no-btn",attrs:{text:"",color:"primary"},nativeOn:{click:function(t){return e.onClickNo()}}},[e._v(" "+e._s(e.options.no)+" ")]):e._e(),e.options.cancel?o("v-btn",{staticClass:"dialog-cancel-btn",attrs:{text:"",color:"primary"},nativeOn:{click:function(t){return e.onClickCancel()}}},[e._v(" "+e._s(e.options.cancel)+" ")]):e._e()],1)],1)],1)},w=[],g=y(c,k,w,!1,null,"cbdb618c",null,null);const D=g.exports;g.exports.__docgenInfo={exportName:"default",displayName:"ConfirmDialog",description:"",tags:{},props:[{name:"attach",tags:{},description:"Prop to provide attachment selector.",type:{name:"string"}}],sourceFiles:["/home/severin/repos/bcrs-shared-components/src/components/confirm-dialog/ConfirmDialog.vue"]};const $={title:"component/ConfirmDialog"},O=(s,{argTypes:e})=>({props:Object.keys(e),components:{ConfirmDialog:D},template:'<confirm-dialog v-bind="$props" @hook:mounted="externalMount" />',methods:{async externalMount(){const o=this.$children[0];await u.nextTick(),o.open("Confirm Dialog Title","Confirm dialog message. Ask your confirmation question here.",{width:"30rem",persistent:!0,yes:"Yes",no:"No",cancel:"Cancel"})}}}),l=O.bind({});l.args={};var p,m,d;l.parameters={...l.parameters,docs:{...(p=l.parameters)==null?void 0:p.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    ConfirmDialog
  },
  template: '<confirm-dialog v-bind="$props" @hook:mounted="externalMount" />',
  methods: {
    async externalMount() {
      const vm = (this as any).$children[0]; // target the component confirm-dialog
      await Vue.nextTick(); // wait that mounted() finished
      vm.open('Confirm Dialog Title', 'Confirm dialog message. Ask your confirmation question here.', {
        width: '30rem',
        persistent: true,
        yes: 'Yes',
        no: 'No',
        cancel: 'Cancel'
      });
    }
  }
})`,...(d=(m=l.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const M=["base"];export{M as __namedExportsOrder,l as base,$ as default};
//# sourceMappingURL=ConfirmDialog.stories-aab25b94.js.map
