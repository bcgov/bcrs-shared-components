import{V as s}from"./vue.esm-b1e57a2f.js";import{C as i}from"./ConfirmDialog-8f354af3.js";import"./_plugin-vue2_normalizer-b11a0120.js";const g={title:"component/ConfirmDialog"},m=(c,{argTypes:r})=>({props:Object.keys(r),components:{ConfirmDialog:i},template:'<confirm-dialog v-bind="$props" @hook:mounted="externalMount" />',methods:{async externalMount(){const a=this.$children[0];await s.nextTick(),a.open("Confirm Dialog Title","Confirm dialog message. Ask your confirmation question here.",{width:"30rem",persistent:!0,yes:"Yes",no:"No",cancel:"Cancel"})}}}),e=m.bind({});e.args={};var o,t,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`(args, {
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
})`,...(n=(t=e.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};const u=["base"];export{u as __namedExportsOrder,e as base,g as default};
//# sourceMappingURL=ConfirmDialog.stories-b5b1fb7c.js.map
