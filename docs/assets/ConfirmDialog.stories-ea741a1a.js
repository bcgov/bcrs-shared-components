var f=Object.defineProperty;var _=(t,e,n)=>e in t?f(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var a=(t,e,n)=>(_(t,typeof e!="symbol"?e+"":e,n),n);import{V as u}from"./vue.esm-340a2d96.js";import{C as h,P as C,n as y}from"./_plugin-vue2_normalizer-611c6892.js";var x=Object.defineProperty,b=Object.getOwnPropertyDescriptor,g=(t,e,n,o)=>{for(var s=o>1?void 0:o?b(e,n):e,i=t.length-1,r;i>=0;i--)(r=t[i])&&(s=(o?r(e,n,s):r(s))||s);return o&&s&&x(e,n,s),s};let c=class extends u{constructor(){super(...arguments);a(this,"attach");a(this,"dialog",!1);a(this,"resolve",null);a(this,"reject",null);a(this,"title",null);a(this,"message",null);a(this,"options",{width:400,zIndex:200,persistent:!1,yes:"Yes",no:"No",cancel:"Cancel"})}open(n,o,s){return this.dialog=!0,this.title=n,this.message=o,this.options=Object.assign(this.options,s),new Promise((i,r)=>{this.resolve=i,this.reject=r})}onClickYes(){this.resolve(!0),this.dialog=!1}onClickNo(){this.resolve(!1),this.dialog=!1}onClickCancel(){this.reject(),this.dialog=!1}};g([C()],c.prototype,"attach",2);c=g([h({})],c);var k=function(){var e=this,n=e._self._c;return e._self._setupProxy,n("v-dialog",{style:{zIndex:e.options.zIndex},attrs:{"content-class":"confirm-dialog","max-width":e.options.width,persistent:e.options.persistent,attach:e.attach},on:{keydown:function(o){return!o.type.indexOf("key")&&e._k(o.keyCode,"esc",27,o.key,["Esc","Escape"])?null:e.onClickCancel.apply(null,arguments)}},model:{value:e.dialog,callback:function(o){e.dialog=o},expression:"dialog"}},[n("v-card",[n("v-card-title",[e._v(e._s(e.title))]),n("v-card-text",{directives:[{name:"show",rawName:"v-show",value:!!e.message,expression:"!!message"}],staticClass:"pre-wrap",domProps:{innerHTML:e._s(e.message)}}),n("v-divider",{directives:[{name:"show",rawName:"v-show",value:!!e.options.yes||!!e.options.no||!!e.options.cancel,expression:"!!options.yes || !!options.no || !!options.cancel"}],staticClass:"my-0"}),n("v-card-actions",[n("v-spacer"),e.options.yes?n("v-btn",{staticClass:"dialog-yes-btn",attrs:{text:"",color:"primary"},nativeOn:{click:function(o){return e.onClickYes()}}},[e._v(" "+e._s(e.options.yes)+" ")]):e._e(),e.options.no?n("v-btn",{staticClass:"dialog-no-btn",attrs:{text:"",color:"primary"},nativeOn:{click:function(o){return e.onClickNo()}}},[e._v(" "+e._s(e.options.no)+" ")]):e._e(),e.options.cancel?n("v-btn",{staticClass:"dialog-cancel-btn",attrs:{text:"",color:"primary"},nativeOn:{click:function(o){return e.onClickCancel()}}},[e._v(" "+e._s(e.options.cancel)+" ")]):e._e()],1)],1)],1)},w=[],v=y(c,k,w,!1,null,"cbdb618c",null,null);const D=v.exports;v.exports.__docgenInfo={exportName:"default",displayName:"ConfirmDialog",description:"",tags:{},props:[{name:"attach",tags:{},description:"Prop to provide attachment selector.",type:{name:"string"}}],sourceFiles:["/Users/kial/work/bcrs-shared-components/src/components/confirm-dialog/ConfirmDialog.vue"]};const $={title:"component/ConfirmDialog"},O=(t,{argTypes:e})=>({props:Object.keys(e),components:{ConfirmDialog:D},template:'<confirm-dialog v-bind="$props" @hook:mounted="externalMount" />',methods:{async externalMount(){const n=this.$children[0];await u.nextTick(),n.open("Confirm Dialog Title","Confirm dialog message. Ask your confirmation question here.",{width:"30rem",persistent:!0,yes:"Yes",no:"No",cancel:"Cancel"})}}}),l=O.bind({});l.args={};var p,m,d;l.parameters={...l.parameters,docs:{...(p=l.parameters)==null?void 0:p.docs,source:{originalSource:`(args, {
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
