var v=Object.defineProperty;var w=(a,e,t)=>e in a?v(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var n=(a,e,t)=>(w(a,typeof e!="symbol"?e+"":e,t),t);import{A as h}from"./index-c0b19069.js";import{M as _}from"./index-609d875f.js";import{V as y}from"./vue.esm-b1e57a2f.js";import{C,P as i,n as T}from"./_plugin-vue2_normalizer-b11a0120.js";import{V as M}from"./vuetify-abd37748.js";import"./_commonjsHelpers-042e6b4d.js";var x=Object.defineProperty,S=Object.getOwnPropertyDescriptor,l=(a,e,t,r)=>{for(var o=r>1?void 0:r?S(e,t):e,u=a.length-1,c;u>=0;u--)(c=a[u])&&(o=(r?c(e,t,o):c(o))||o);return r&&o&&x(e,t,o),o};let s=class extends y{constructor(){super(...arguments);n(this,"axios");n(this,"isMobile");n(this,"webChatReason");n(this,"webChatStatusUrl");n(this,"webChatUrl");n(this,"openTooltipMessage");n(this,"closedTooltipMessage");n(this,"unavailableTooltipMessage");n(this,"chatStatus","unknown")}get timeZoneOffset(){return new Date().getTimezoneOffset()/60}async mounted(){this.webChatStatusUrl&&(this.chatStatus=await this.axios.get(this.webChatStatusUrl).then(e=>{var t;return((t=e.data)==null?void 0:t.status)||"response error"}).catch(e=>{var t;return console.error("failed to get webchat status, error =",e),((t=e.response)==null?void 0:t.statusText)||"network error"}))}onSubmit(){window.open("about:blank","webchat_window","width=400, height=500")}};l([i({required:!0})],s.prototype,"axios",2);l([i({default:!1})],s.prototype,"isMobile",2);l([i({default:null})],s.prototype,"webChatReason",2);l([i({default:null})],s.prototype,"webChatStatusUrl",2);l([i({default:null})],s.prototype,"webChatUrl",2);l([i({default:"Click here to chat live with Helpdesk staff."})],s.prototype,"openTooltipMessage",2);l([i({default:"We are closed. The Service BC Contact Centre is open Monday through Friday 7:30am – 5:00pm Pacific Time excluding BC statutory holidays."})],s.prototype,"closedTooltipMessage",2);l([i({default:"Webchat is temporarily unavailable."})],s.prototype,"unavailableTooltipMessage",2);s=l([C({})],s);var U=function(){var e=this,t=e._self._c;return e._self._setupProxy,e.webChatUrl&&e.webChatReason?t("div",{attrs:{id:"web-chat-container"}},[t("v-form",{attrs:{id:"webchat",target:"webchat_window",method:"post",action:e.webChatUrl},on:{submit:function(r){return e.onSubmit()}}},[t("input",{attrs:{type:"hidden",name:"Reason"},domProps:{value:e.webChatReason}}),t("input",{attrs:{type:"hidden",name:"UserLanguage",value:"en"}}),t("input",{attrs:{type:"hidden",name:"Parameters[TimeZoneOffset]"},domProps:{value:e.timeZoneOffset}}),t("v-tooltip",{attrs:{top:"","content-class":"top-tooltip","nudge-top":"5",disabled:e.isMobile},scopedSlots:e._u([{key:"activator",fn:function({on:r,attrs:o}){return[t("div",e._g(e._b({attrs:{id:"chat-button-wrapper"}},"div",o,!1),r),[t("v-btn",e._g(e._b({staticClass:"chat-button",attrs:{disabled:e.chatStatus!=="open",large:"",outlined:"",color:"bcgovblue",elevation:"4",type:"submit","aria-label":"Chat with Helpdesk staff"}},"v-btn",o,!1),r),[t("v-icon",{staticClass:"mr-2 ml-n2"},[e._v(" mdi-forum-outline ")]),t("span",{staticClass:"font-weight-bold"},[e._v("Chat")])],1)],1)]}}],null,!1,245779421)},[e.chatStatus==="open"?t("span",{attrs:{id:"open-tooltip-message"}},[e._v(" "+e._s(e.openTooltipMessage)+" ")]):e.chatStatus==="closed"?t("span",{attrs:{id:"closed-tooltip-message"}},[e._v(" "+e._s(e.closedTooltipMessage)+" ")]):t("span",{attrs:{id:"unavailable-tooltip-message"}},[e._v(" "+e._s(e.unavailableTooltipMessage)+" ")])])],1)],1):e._e()},P=[],b=T(s,U,P,!1,null,"c49223a1",null,null);const V=b.exports;b.exports.__docgenInfo={exportName:"default",displayName:"WebChat",description:"",tags:{},props:[{name:"axios",tags:{},type:{name:"any"},required:!0},{name:"isMobile",tags:{},type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"webChatReason",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"webChatStatusUrl",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"webChatUrl",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"openTooltipMessage",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"'Click here to chat live with Helpdesk staff.'"}},{name:"closedTooltipMessage",tags:{},type:{name:"string"},defaultValue:{func:!1,value:`'We are closed. The Service BC Contact Centre is open Monday through ' +\r
  'Friday 7:30am – 5:00pm Pacific Time excluding BC statutory holidays.'`}},{name:"unavailableTooltipMessage",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"'Webchat is temporarily unavailable.'"}}],sourceFiles:["C:/Users/kjazzar/Downloads/repos/bcrs-shared-components/src/components/web-chat/WebChat.vue"]};const H={title:"component/WebChat"},O="WebChatReason",g="https://web-chat-status-url",W="https://web-chat-url",k=new _(h);k.onGet(g).reply(200,{status:"open"});const R=(a,{argTypes:e})=>({vuetify:new M({iconfont:"mdi"}),props:Object.keys(e),components:{WebChat:V},template:'<web-chat v-bind="$props" />'}),p=R.bind({});p.args={axios:h.create(),isMobile:!1,webChatReason:O,webChatStatusUrl:g,webChatUrl:W};var d,m,f;p.parameters={...p.parameters,docs:{...(d=p.parameters)==null?void 0:d.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  vuetify: new Vuetify({
    iconfont: 'mdi'
  }),
  props: Object.keys(argTypes),
  components: {
    WebChat
  },
  template: '<web-chat v-bind="$props" />' // $props comes from args below
})`,...(f=(m=p.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};const Z=["base"];export{Z as __namedExportsOrder,p as base,H as default};
//# sourceMappingURL=WebChat.stories-5706e969.js.map
