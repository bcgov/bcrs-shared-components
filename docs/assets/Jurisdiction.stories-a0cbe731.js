var y=Object.defineProperty;var N=(n,e,a)=>e in n?y(n,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):n[e]=a;var S=(n,e,a)=>(N(n,typeof e!="symbol"?e+"":e,a),a);import{C as p,P as i,E as m,n as h,m as I}from"./_plugin-vue2_normalizer-b11a0120.js";import{V as b}from"./vue.esm-b1e57a2f.js";import{C as B}from"./validation-mixin-aefd6a63.js";import"./lodash-f6b38868.js";import"./_commonjsHelpers-de833af9.js";var u=(n=>(n.BC="BC",n.CA="CA",n.FD="FD",n.IN="IN",n.US="US",n.INFO="INFO",n))(u||{}),G=Object.defineProperty,P=Object.getOwnPropertyDescriptor,v=(n,e,a,t)=>{for(var l=t>1?void 0:t?P(e,a):e,r=n.length-1,s;r>=0;r--)(s=n[r])&&(l=(t?s(e,a,l):s(l))||l);return t&&l&&G(e,a,l),l};let o=class extends b{constructor(){super(...arguments);S(this,"label");S(this,"menuItems");S(this,"errorMessages");S(this,"hideDetails");S(this,"value");S(this,"maxHeight");S(this,"readonly");S(this,"showAppendIcon");S(this,"activeActionGroup",NaN)}get items(){return this.menuItems.filter(a=>(a.isHeader||(a.disabled=a.group!==this.activeActionGroup),!0))}get menuProps(){return this.maxHeight?{bottom:!0,offsetY:!0,maxHeight:this.maxHeight}:{bottom:!0,offsetY:!0,auto:!0}}toggleActionGroup(a){this.activeActionGroup=this.activeActionGroup===a?NaN:a}emitChangeEvent(a){}};v([i({default:"Select an item"})],o.prototype,"label",2);v([i()],o.prototype,"menuItems",2);v([i()],o.prototype,"errorMessages",2);v([i()],o.prototype,"hideDetails",2);v([i({default:null})],o.prototype,"value",2);v([i()],o.prototype,"maxHeight",2);v([i({default:!1})],o.prototype,"readonly",2);v([i({default:!0})],o.prototype,"showAppendIcon",2);v([m("change")],o.prototype,"emitChangeEvent",1);o=v([p({})],o);var w=function(){var e=this,a=e._self._c;return e._self._setupProxy,a("v-select",{staticClass:"nested-select",attrs:{"item-value":"[group,value]","return-object":"",filled:"","append-icon":e.showAppendIcon?"mdi-menu-down":"","error-messages":e.errorMessages,"hide-details":e.hideDetails,items:e.items,label:e.label,"menu-props":e.menuProps,readonly:e.readonly,value:e.value},on:{change:function(t){return e.emitChangeEvent(t)}},scopedSlots:e._u([{key:"item",fn:function({item:t}){return[t.isHeader?a("v-list-item",{staticClass:"group-header border-top mx-4 py-4",on:{click:function(l){return l.stopPropagation(),e.toggleActionGroup(t.group)}}},[a("div",{staticClass:"d-flex justify-space-between align-center"},[a("div",[t.icon?a("v-icon",{staticClass:"mr-2",attrs:{color:"primary"}},[e._v(" "+e._s(t.icon)+" ")]):e._e(),a("span",{staticClass:"mb-0 mr-4 font-weight-bold",class:{"app-blue":t.group===e.activeActionGroup}},[e._v(" "+e._s(t.text)+" ")])],1),a("v-icon",{attrs:{color:"primary"}},[e._v(" "+e._s(t.group===e.activeActionGroup?"mdi-chevron-up":"mdi-chevron-down")+" ")])],1)]):a("v-list-item-content",{staticClass:"group-item mx-4 pl-4 py-4",class:{"hide-me":t.disabled,"border-top":t.separator}},[t.subtext?[a("div",{staticClass:"font-size-16 font-weight-bold"},[e._v(" "+e._s(t.text)+" ")]),a("div",{staticClass:"font-size-14"},[e._v(" "+e._s(t.subtext)+" ")])]:[a("div",{staticClass:"font-size-16"},[e._v(" "+e._s(t.text)+" ")])]],2)]}}])})},V=[],g=h(o,w,V,!1,null,"065c9805",null,null);const F=g.exports;g.exports.__docgenInfo={exportName:"default",displayName:"NestedSelect",description:"",tags:{},props:[{name:"label",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"'Select an item'"}},{name:"menuItems",tags:{},type:{name:"Array",elements:[{name:"any"}]}},{name:"errorMessages",tags:{},type:{name:"string"}},{name:"hideDetails",tags:{},type:{name:"union",elements:[{name:"boolean"},{name:'"auto"'}]}},{name:"value",tags:{},type:{name:"any"},defaultValue:{func:!1,value:"null"}},{name:"maxHeight",tags:{},type:{name:"string"}},{name:"readonly",tags:{},type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"showAppendIcon",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"true"}}],events:[{name:"change"}],sourceFiles:["/home/severin/repos/bcrs-shared-components/src/components/jurisdiction/NestedSelect.vue"]};const K=[{value:"AB",SHORT_DESC:"AB",text:"Alberta"},{value:u.BC,SHORT_DESC:"BC",text:"British Columbia"},{value:"MB",SHORT_DESC:"MB",text:"Manitoba"},{value:"NB",SHORT_DESC:"NB",text:"New Brunswick"},{value:"NF",SHORT_DESC:"NF",text:"Newfoundland And Labrador"},{value:"NT",SHORT_DESC:"NT",text:"Northwest Territories"},{value:"NS",SHORT_DESC:"NS",text:"Nova Scotia"},{value:"NU",SHORT_DESC:"NU",text:"Nunavut"},{value:"ON",SHORT_DESC:"ON",text:"Ontario"},{value:"PE",SHORT_DESC:"PE",text:"Prince Edward Island"},{value:"QC",SHORT_DESC:"QC",text:"Quebec"},{value:"SK",SHORT_DESC:"SK",text:"Saskatchewan"},{value:"YT",SHORT_DESC:"YT",text:"Yukon"},{value:u.FD,SHORT_DESC:"FED",text:"Federal"}],U=[{value:u.CA,SHORT_DESC:"Canada",text:"Canada"},{value:u.US,SHORT_DESC:"United States",text:"United States"}],L=[{value:"TM",SHORT_DESC:"Turkmenistan",text:"Turkmenistan"},{value:"TC",SHORT_DESC:"Turks And Caico",text:"Turks And Caicos Islands"},{value:"TV",SHORT_DESC:"Tuvalu",text:"Tuvalu"},{value:"UG",SHORT_DESC:"Uganda",text:"Uganda"},{value:"UA",SHORT_DESC:"Ukraine",text:"Ukraine"},{value:"AE",SHORT_DESC:"United Arab Emi",text:"United Arab Emirates"},{value:"GB",SHORT_DESC:"United Kingdom",text:"United Kingdom"},{value:"UM",SHORT_DESC:"United States M",text:"United States Minor Outlying Islands"},{value:"UY",SHORT_DESC:"Uruguay",text:"Uruguay"},{value:"ME",SHORT_DESC:"Montenegro",text:"Montenegro"},{value:"RS",SHORT_DESC:"Serbia",text:"Serbia"},{value:"IM",SHORT_DESC:"Isle Of Man",text:"Isle Of Man"},{value:"GG",SHORT_DESC:"Guernsey",text:"Guernsey"},{value:"JE",SHORT_DESC:"Jersey",text:"Jersey"},{value:"BQ",SHORT_DESC:"Bonaire",text:"Bonaire"},{value:"CW",SHORT_DESC:"Curacao",text:"Curacao"},{value:"SX",SHORT_DESC:"St Maar DP",text:"Sint Maarten(Dutch Part)"},{value:"SS",SHORT_DESC:"Sth Sudan",text:"South Sudan"},{value:"MF",SHORT_DESC:"St Mart FP",text:"Saint Martin(French Part)"},{value:"AX",SHORT_DESC:"Aland Islands",text:"Aland Islands"},{value:"BL",SHORT_DESC:"Saint Barthelem",text:"Saint Barthelemy"},{value:"TA",SHORT_DESC:"Tristan Da Cunh",text:"Tristan Da Cunha"},{value:"XZ",SHORT_DESC:"Kosovo",text:"Kosovo"},{value:"UZ",SHORT_DESC:"Uzbekistan",text:"Uzbekistan"},{value:"VU",SHORT_DESC:"Vanuatu",text:"Vanuatu"},{value:"VE",SHORT_DESC:"Venezuela",text:"Venezuela"},{value:"VN",SHORT_DESC:"Viet Nam",text:"Viet Nam"},{value:"VI",text:"Virgin Islands, U.S.",SHORT_DESC:"Virgin Islands, U.S."},{value:"VG",text:"Virgin Islands, British",SHORT_DESC:"Virgin Islands, British"},{value:"WF",SHORT_DESC:"Wallis And Futu",text:"Wallis And Futuna"},{value:"EH",SHORT_DESC:"Western Sahara",text:"Western Sahara"},{value:"YE",SHORT_DESC:"Yemen",text:"Yemen"},{value:"YU",SHORT_DESC:"Yugoslavia",text:"Yugoslavia"},{value:"ZM",SHORT_DESC:"Zambia",text:"Zambia"},{value:"ZW",SHORT_DESC:"Zimbabwe",text:"Zimbabwe"},{value:"AF",SHORT_DESC:"Afghanistan",text:"Afghanistan"},{value:"AL",SHORT_DESC:"Albania",text:"Albania"},{value:"DZ",SHORT_DESC:"Algeria",text:"Algeria"},{value:"AS",SHORT_DESC:"American Samoa",text:"American Samoa"},{value:"AD",SHORT_DESC:"Andorra",text:"Andorra"},{value:"AO",SHORT_DESC:"Angola",text:"Angola"},{value:"AI",SHORT_DESC:"Anguilla",text:"Anguilla"},{value:"AQ",SHORT_DESC:"Antarctica",text:"Antarctica"},{value:"AG",SHORT_DESC:"Antigua And Bar",text:"Antigua And Barbuda"},{value:"AR",SHORT_DESC:"Argentina",text:"Argentina"},{value:"AM",SHORT_DESC:"Armenia",text:"Armenia"},{value:"AW",SHORT_DESC:"Aruba",text:"Aruba"},{value:"AU",SHORT_DESC:"Australia",text:"Australia"},{value:"AT",SHORT_DESC:"Austria",text:"Austria"},{value:"AZ",SHORT_DESC:"Azerbaijan",text:"Azerbaijan"},{value:"BS",SHORT_DESC:"Bahamas",text:"Bahamas"},{value:"BH",SHORT_DESC:"Bahrain",text:"Bahrain"},{value:"BD",SHORT_DESC:"Bangladesh",text:"Bangladesh"},{value:"BB",SHORT_DESC:"Barbados",text:"Barbados"},{value:"BY",SHORT_DESC:"Belarus",text:"Belarus"},{value:"BE",SHORT_DESC:"Belgium",text:"Belgium"},{value:"BZ",SHORT_DESC:"Belize",text:"Belize"},{value:"BJ",SHORT_DESC:"Benin",text:"Benin"},{value:"BM",SHORT_DESC:"Bermuda",text:"Bermuda"},{value:"BT",SHORT_DESC:"Bhutan",text:"Bhutan"},{value:"BO",SHORT_DESC:"Bolivia",text:"Bolivia"},{value:"BA",SHORT_DESC:"Bosnia And Herz",text:"Bosnia And Herzegovina"},{value:"BW",SHORT_DESC:"Botswana",text:"Botswana"},{value:"BV",SHORT_DESC:"Bouvet Island",text:"Bouvet Island"},{value:"BR",SHORT_DESC:"Brazil",text:"Brazil"},{value:"IO",SHORT_DESC:"British Indian ",text:"British Indian Ocean Territory"},{value:"BN",SHORT_DESC:"Brunei Darussal",text:"Brunei Darussalam"},{value:"BG",SHORT_DESC:"Bulgaria",text:"Bulgaria"},{value:"BF",SHORT_DESC:"Burkina Faso",text:"Burkina Faso"},{value:"BI",SHORT_DESC:"Burundi",text:"Burundi"},{value:"KH",SHORT_DESC:"Cambodia",text:"Cambodia"},{value:"CM",SHORT_DESC:"Cameroon",text:"Cameroon"},{value:"CV",SHORT_DESC:"Cape Verde",text:"Cape Verde"},{value:"KY",SHORT_DESC:"Cayman Islands",text:"Cayman Islands"},{value:"CF",SHORT_DESC:"Central African",text:"Central African Republic"},{value:"TD",SHORT_DESC:"Chad",text:"Chad"},{value:"CL",SHORT_DESC:"Chile",text:"Chile"},{value:"CN",SHORT_DESC:"China",text:"China"},{value:"CX",SHORT_DESC:"Christmas Islan",text:"Christmas Island"},{value:"CC",SHORT_DESC:"Cocos (Keeling)",text:"Cocos (Keeling) Islands"},{value:"CO",SHORT_DESC:"Colombia",text:"Colombia"},{value:"KM",SHORT_DESC:"Comoros",text:"Comoros"},{value:"CG",SHORT_DESC:"Congo",text:"Congo"},{value:"CK",SHORT_DESC:"Cook Islands",text:"Cook Islands"},{value:"CR",SHORT_DESC:"Costa Rica",text:"Costa Rica"},{value:"CI",SHORT_DESC:"Cote D'Ivoire",text:"Cote D'Ivoire"},{value:"HR",SHORT_DESC:"Croatia",text:"Croatia"},{value:"CU",SHORT_DESC:"Cuba",text:"Cuba"},{value:"CY",SHORT_DESC:"Cyprus",text:"Cyprus"},{value:"CZ",SHORT_DESC:"Czech Republic",text:"Czech Republic"},{value:"DK",SHORT_DESC:"Denmark",text:"Denmark"},{value:"DJ",SHORT_DESC:"Djibouti",text:"Djibouti"},{value:"DM",SHORT_DESC:"Dominica",text:"Dominica"},{value:"DO",SHORT_DESC:"Dominican Repub",text:"Dominican Republic"},{value:"EC",SHORT_DESC:"Ecuador",text:"Ecuador"},{value:"EG",SHORT_DESC:"Egypt",text:"Egypt"},{value:"SV",SHORT_DESC:"El Salvador",text:"El Salvador"},{value:"GQ",SHORT_DESC:"Equatorial Guin",text:"Equatorial Guinea"},{value:"ER",SHORT_DESC:"Eritrea",text:"Eritrea"},{value:"EE",SHORT_DESC:"Estonia",text:"Estonia"},{value:"ET",SHORT_DESC:"Ethiopia",text:"Ethiopia"},{value:"FK",SHORT_DESC:"Falkland Island",text:"Falkland Islands (Malvinas)"},{value:"FO",SHORT_DESC:"Faroe Islands",text:"Faroe Islands"},{value:"FJ",SHORT_DESC:"Fiji",text:"Fiji"},{value:"FI",SHORT_DESC:"Finland",text:"Finland"},{value:"FR",SHORT_DESC:"France",text:"France"},{value:"GF",SHORT_DESC:"French Guiana",text:"French Guiana"},{value:"PF",SHORT_DESC:"French Polynesi",text:"French Polynesia"},{value:"TF",SHORT_DESC:"French Southern",text:"French Southern Territories"},{value:"GA",SHORT_DESC:"Gabon",text:"Gabon"},{value:"GM",SHORT_DESC:"Gambia",text:"Gambia"},{value:"GE",SHORT_DESC:"Georgia",text:"Georgia"},{value:"DE",SHORT_DESC:"Germany",text:"Germany"},{value:"GH",SHORT_DESC:"Ghana",text:"Ghana"},{value:"GI",SHORT_DESC:"Gibraltar",text:"Gibraltar"},{value:"GR",SHORT_DESC:"Greece",text:"Greece"},{value:"GL",SHORT_DESC:"Greenland",text:"Greenland"},{value:"GD",SHORT_DESC:"Grenada",text:"Grenada"},{value:"GP",SHORT_DESC:"Guadeloupe",text:"Guadeloupe"},{value:"GU",SHORT_DESC:"Guam",text:"Guam"},{value:"GT",SHORT_DESC:"Guatemala",text:"Guatemala"},{value:"GN",SHORT_DESC:"Guinea",text:"Guinea"},{value:"GW",SHORT_DESC:"Guinea-Bissau",text:"Guinea-Bissau"},{value:"GY",SHORT_DESC:"Guyana",text:"Guyana"},{value:"HT",SHORT_DESC:"Haiti",text:"Haiti"},{value:"HM",SHORT_DESC:"Heard Island An",text:"Heard Island And McDonald Islands"},{value:"VA",SHORT_DESC:"Holy See (Vatic",text:"Holy See (Vatican City State)"},{value:"HN",SHORT_DESC:"Honduras",text:"Honduras"},{value:"HK",SHORT_DESC:"Hong Kong",text:"Hong Kong"},{value:"HU",SHORT_DESC:"Hungary",text:"Hungary"},{value:"IS",SHORT_DESC:"Iceland",text:"Iceland"},{value:"IN",SHORT_DESC:"India",text:"India"},{value:"ID",SHORT_DESC:"Indonesia",text:"Indonesia"},{value:"IR",SHORT_DESC:"Iran",text:"Iran"},{value:"IQ",SHORT_DESC:"Iraq",text:"Iraq"},{value:"IE",SHORT_DESC:"Ireland",text:"Ireland"},{value:"IL",SHORT_DESC:"Israel",text:"Israel"},{value:"IT",SHORT_DESC:"Italy",text:"Italy"},{value:"JM",SHORT_DESC:"Jamaica",text:"Jamaica"},{value:"JP",SHORT_DESC:"Japan",text:"Japan"},{value:"JO",SHORT_DESC:"Jordan",text:"Jordan"},{value:"KZ",SHORT_DESC:"Kazakhstan",text:"Kazakhstan"},{value:"KE",SHORT_DESC:"Kenya",text:"Kenya"},{value:"KI",SHORT_DESC:"Kiribati",text:"Kiribati"},{value:"KP",SHORT_DESC:"Korea",text:"Democratic People's Republic Of Korea"},{value:"KR",SHORT_DESC:"Korea",text:"South Korea"},{value:"KW",SHORT_DESC:"Kuwait",text:"Kuwait"},{value:"KG",SHORT_DESC:"Kyrgyzstan",text:"Kyrgyzstan"},{value:"LA",SHORT_DESC:"Laos",text:"Lao People's Democratic Republic"},{value:"LV",SHORT_DESC:"Latvia",text:"Latvia"},{value:"LB",SHORT_DESC:"Lebanon",text:"Lebanon"},{value:"LS",SHORT_DESC:"Lesotho",text:"Lesotho"},{value:"LR",SHORT_DESC:"Liberia",text:"Liberia"},{value:"LY",SHORT_DESC:"Libya",text:"Libya"},{value:"LI",SHORT_DESC:"Liechtenstein",text:"Liechtenstein"},{value:"LT",SHORT_DESC:"Lithuania",text:"Lithuania"},{value:"LU",SHORT_DESC:"Luxembourg",text:"Luxembourg"},{value:"MO",SHORT_DESC:"Macao",text:"Macao"},{value:"MK",SHORT_DESC:"Macedonia",text:"Macedonia"},{value:"MG",SHORT_DESC:"Madagascar",text:"Madagascar"},{value:"MW",SHORT_DESC:"Malawi",text:"Malawi"},{value:"MY",SHORT_DESC:"Malaysia",text:"Malaysia"},{value:"MV",SHORT_DESC:"Maldives",text:"Maldives"},{value:"ML",SHORT_DESC:"Mali",text:"Mali"},{value:"MT",SHORT_DESC:"Malta",text:"Malta"},{value:"MH",SHORT_DESC:"Marshall Island",text:"Marshall Islands"},{value:"MQ",SHORT_DESC:"Martinique",text:"Martinique"},{value:"MR",SHORT_DESC:"Mauritania",text:"Mauritania"},{value:"MU",SHORT_DESC:"Mauritius",text:"Mauritius"},{value:"YT",SHORT_DESC:"Mayotte",text:"Mayotte"},{value:"MX",SHORT_DESC:"Mexico",text:"Mexico"},{value:"FM",SHORT_DESC:"Micronesia",text:"Micronesia"},{value:"MD",SHORT_DESC:"Moldova",text:"Moldova"},{value:"MC",SHORT_DESC:"Monaco",text:"Monaco"},{value:"MN",SHORT_DESC:"Mongolia",text:"Mongolia"},{value:"MS",SHORT_DESC:"Montserrat",text:"Montserrat"},{value:"MA",SHORT_DESC:"Morocco",text:"Morocco"},{value:"MZ",SHORT_DESC:"Mozambique",text:"Mozambique"},{value:"MM",SHORT_DESC:"Myanmar",text:"Myanmar"},{value:"NA",SHORT_DESC:"Namibia",text:"Namibia"},{value:"NR",SHORT_DESC:"Nauru",text:"Nauru"},{value:"NP",SHORT_DESC:"Nepal",text:"Nepal"},{value:"AN",SHORT_DESC:"Netherlands Ant",text:"Netherlands Antilles"},{value:"NL",SHORT_DESC:"Netherlands",text:"Netherlands"},{value:"NC",SHORT_DESC:"New Caledonia",text:"New Caledonia"},{value:"NZ",SHORT_DESC:"New Zealand",text:"New Zealand"},{value:"NI",SHORT_DESC:"Nicaragua",text:"Nicaragua"},{value:"NE",SHORT_DESC:"Niger",text:"Niger"},{value:"NG",SHORT_DESC:"Nigeria",text:"Nigeria"},{value:"NU",SHORT_DESC:"Niue",text:"Niue"},{value:"NF",SHORT_DESC:"Norfolk Island",text:"Norfolk Island"},{value:"MP",SHORT_DESC:"Northern Marian",text:"Northern Mariana Islands"},{value:"NO",SHORT_DESC:"Norway",text:"Norway"},{value:"OM",SHORT_DESC:"Oman",text:"Oman"},{value:"PK",SHORT_DESC:"Pakistan",text:"Pakistan"},{value:"PW",SHORT_DESC:"Palau",text:"Palau"},{value:"PS",SHORT_DESC:"Palestinian Ter",text:"Palestinian Territory"},{value:"PA",SHORT_DESC:"Panama",text:"Panama"},{value:"PG",SHORT_DESC:"Papua New Guine",text:"Papua New Guinea"},{value:"PY",SHORT_DESC:"Paraguay",text:"Paraguay"},{value:"PE",SHORT_DESC:"Peru",text:"Peru"},{value:"PH",SHORT_DESC:"Philippines",text:"Philippines"},{value:"PN",SHORT_DESC:"Pitcairn",text:"Pitcairn"},{value:"PL",SHORT_DESC:"Poland",text:"Poland"},{value:"PT",SHORT_DESC:"Portugal",text:"Portugal"},{value:"PR",SHORT_DESC:"Puerto Rico",text:"Puerto Rico"},{value:"QA",SHORT_DESC:"Qatar",text:"Qatar"},{value:"RE",SHORT_DESC:"Reunion",text:"Reunion"},{value:"RO",SHORT_DESC:"Romania",text:"Romania"},{value:"RU",SHORT_DESC:"Russian Federat",text:"Russian Federation"},{value:"RW",SHORT_DESC:"Rwanda",text:"Rwanda"},{value:"SH",SHORT_DESC:"Saint Helena",text:"Saint Helena"},{value:"KN",SHORT_DESC:"Saint Kitts And",text:"Saint Kitts And Nevis"},{value:"LC",SHORT_DESC:"Saint Lucia",text:"Saint Lucia"},{value:"PM",SHORT_DESC:"Saint Pierre An",text:"Saint Pierre And Miquelon"},{value:"VC",SHORT_DESC:"Saint Vincent A",text:"Saint Vincent And The Grenadines"},{value:"WS",SHORT_DESC:"Samoa",text:"Samoa"},{value:"SM",SHORT_DESC:"San Marino",text:"San Marino"},{value:"ST",SHORT_DESC:"Sao Tome And Pr",text:"Sao Tome And Principe"},{value:"SA",SHORT_DESC:"Saudi Arabia",text:"Saudi Arabia"},{value:"SN",SHORT_DESC:"Senegal",text:"Senegal"},{value:"SC",SHORT_DESC:"Seychelles",text:"Seychelles"},{value:"SL",SHORT_DESC:"Sierra Leone",text:"Sierra Leone"},{value:"SG",SHORT_DESC:"Singapore",text:"Singapore"},{value:"SK",SHORT_DESC:"Slovakia",text:"Slovakia"},{value:"SI",SHORT_DESC:"Slovenia",text:"Slovenia"},{value:"SB",SHORT_DESC:"Solomon Islands",text:"Solomon Islands"},{value:"SO",SHORT_DESC:"Somalia",text:"Somalia"},{value:"ZA",SHORT_DESC:"South Africa",text:"South Africa"},{value:"GS",SHORT_DESC:"South Georgia a",text:"South Georgia and the South Sandwich Isl"},{value:"ES",SHORT_DESC:"Spain",text:"Spain"},{value:"LK",SHORT_DESC:"Sri Lanka",text:"Sri Lanka"},{value:"SD",SHORT_DESC:"Sudan",text:"Sudan"},{value:"SR",SHORT_DESC:"Suriname",text:"Suriname"},{value:"SJ",SHORT_DESC:"Svalbard And Ja",text:"Svalbard And Jan Mayen"},{value:"SZ",SHORT_DESC:"Swaziland",text:"Swaziland"},{value:"SE",SHORT_DESC:"Sweden",text:"Sweden"},{value:"CH",SHORT_DESC:"Switzerland",text:"Switzerland"},{value:"SY",SHORT_DESC:"Syrian Arab Rep",text:"Syrian Arab Republic"},{value:"TW",SHORT_DESC:"Taiwan",text:"Taiwan"},{value:"TJ",SHORT_DESC:"Tajikistan",text:"Tajikistan"},{value:"TZ",SHORT_DESC:"Tanzania",text:"Tanzania, United Republic Of"},{value:"TH",SHORT_DESC:"Thailand",text:"Thailand"},{value:"TL",SHORT_DESC:"Timor-Leste",text:"Timor-Leste"},{value:"TG",SHORT_DESC:"Togo",text:"Togo"},{value:"TK",SHORT_DESC:"Tokelau",text:"Tokelau"},{value:"TO",SHORT_DESC:"Tonga",text:"Tonga"},{value:"TT",SHORT_DESC:"Trinidad And To",text:"Trinidad And Tobago"},{value:"TN",SHORT_DESC:"Tunisia",text:"Tunisia"},{value:"TR",SHORT_DESC:"Turkey",text:"Turkey"}],k=L.sort((n,e)=>{if(n.text>=e.text)return 1;if(n.text<=e.text)return-1;if(n.text===e.text)return 0}),J=U.concat(k),z=[{value:"AL",SHORT_DESC:"AL",text:"Alabama"},{value:"AK",SHORT_DESC:"AK",text:"Alaska"},{value:"AZ",SHORT_DESC:"AZ",text:"Arizona"},{value:"AR",SHORT_DESC:"AR",text:"Arkansas"},{value:"CA",SHORT_DESC:"CA",text:"California"},{value:"CO",SHORT_DESC:"CO",text:"Colorado"},{value:"CT",SHORT_DESC:"CT",text:"Connecticut"},{value:"DE",SHORT_DESC:"DE",text:"Delaware"},{value:"FL",SHORT_DESC:"FL",text:"Florida"},{value:"GA",SHORT_DESC:"GA",text:"Georgia"},{value:"HI",SHORT_DESC:"HI",text:"Hawaii"},{value:"ID",SHORT_DESC:"ID",text:"Idaho"},{value:"IL",SHORT_DESC:"IL",text:"Illinois"},{value:"IN",SHORT_DESC:"IN",text:"Indiana"},{value:"IA",SHORT_DESC:"IA",text:"Iowa"},{value:"KS",SHORT_DESC:"KS",text:"Kansas"},{value:"KY",SHORT_DESC:"KY",text:"Kentucky"},{value:"LA",SHORT_DESC:"LA",text:"Louisiana"},{value:"ME",SHORT_DESC:"ME",text:"Maine"},{value:"MD",SHORT_DESC:"MD",text:"Maryland"},{value:"MA",SHORT_DESC:"MA",text:"Massachusetts"},{value:"MI",SHORT_DESC:"MI",text:"Michigan"},{value:"MN",SHORT_DESC:"MN",text:"Minnesota"},{value:"MS",SHORT_DESC:"MS",text:"Mississippi"},{value:"MO",SHORT_DESC:"MO",text:"Missouri"},{value:"MT",SHORT_DESC:"MT",text:"Montana"},{value:"NE",SHORT_DESC:"NE",text:"Nebraska"},{value:"NV",SHORT_DESC:"NV",text:"Nevada"},{value:"NH",SHORT_DESC:"NH",text:"New Hampshire"},{value:"NJ",SHORT_DESC:"NJ",text:"New Jersey"},{value:"NM",SHORT_DESC:"NM",text:"New Mexico"},{value:"NY",SHORT_DESC:"NY",text:"New York"},{value:"NC",SHORT_DESC:"NC",text:"North Carolina"},{value:"ND",SHORT_DESC:"ND",text:"North Dakota"},{value:"OH",SHORT_DESC:"OH",text:"Ohio"},{value:"OK",SHORT_DESC:"OK",text:"Oklahoma"},{value:"OR",SHORT_DESC:"OR",text:"Oregon"},{value:"PA",SHORT_DESC:"PA",text:"Pennsylvania"},{value:"RI",SHORT_DESC:"RI",text:"Rhode Island"},{value:"SC",SHORT_DESC:"SC",text:"South Carolina"},{value:"SD",SHORT_DESC:"SD",text:"South Dakota"},{value:"TN",SHORT_DESC:"TN",text:"Tennessee"},{value:"TX",SHORT_DESC:"TX",text:"Texas"},{value:"UT",SHORT_DESC:"UT",text:"Utah"},{value:"VT",SHORT_DESC:"VT",text:"Vermont"},{value:"VA",SHORT_DESC:"VA",text:"Virginia"},{value:"WA",SHORT_DESC:"WA",text:"Washington"},{value:"WV",SHORT_DESC:"WV",text:"West Virginia"},{value:"WI",SHORT_DESC:"WI",text:"Wisconsin"},{value:"WY",SHORT_DESC:"WY",text:"Wyoming"}];var j=Object.defineProperty,W=Object.getOwnPropertyDescriptor,T=(n,e,a,t)=>{for(var l=t>1?void 0:t?W(e,a):e,r=n.length-1,s;r>=0;r--)(s=n[r])&&(l=(t?s(e,a,l):s(l))||l);return t&&l&&j(e,a,l),l};let C=class extends I(B){constructor(){super(...arguments);S(this,"label");S(this,"errorMessages");S(this,"showUsaJurisdictions");S(this,"initialValue");S(this,"readonly");S(this,"showAppendIcon");S(this,"jurisdiction",null)}created(){this.initialValue&&this.setInitialValue()}setInitialValue(){const a=this.initialValue.country,t=this.initialValue.region||"";let l=NaN,r="",s="";if(a===u.CA?l=0:a===u.US?l=1:l=2,t)if(t==="FEDERAL")r="Federal",s=u.FD;else{const _=this.getCountryRegions(a).find(f=>f.short===t);r=_==null?void 0:_.name,s=_==null?void 0:_.short}else r=this.getCountryName(a),s=a;this.jurisdiction={group:l,text:r,value:s}}get jurisdictionOptions(){const a=[];return a.push({isHeader:!0,group:0,text:"Canadian"}),K.filter(t=>t.value!==u.BC).forEach(t=>a.push({group:0,text:t.text,value:t.value,separator:t.value===u.FD})),this.showUsaJurisdictions&&(a.push({isHeader:!0,group:1,text:"United States"}),z.forEach(t=>a.push({group:1,text:t.text,value:t.value,separator:!1}))),a.push({isHeader:!0,group:2,text:"International"}),J.filter(t=>this.excludeJurisdictions(t.value)).forEach(t=>a.push({group:2,text:t.text,value:t.value,separator:t.value===u.IN})),a}excludeJurisdictions(a){return!(a===u.CA||this.showUsaJurisdictions&&a===u.US)}emitChangeEvent(a){}};T([i({default:"Select the home jurisdiction"})],C.prototype,"label",2);T([i()],C.prototype,"errorMessages",2);T([i({default:!1})],C.prototype,"showUsaJurisdictions",2);T([i({default:null})],C.prototype,"initialValue",2);T([i({default:!1})],C.prototype,"readonly",2);T([i({default:!0})],C.prototype,"showAppendIcon",2);T([m("change")],C.prototype,"emitChangeEvent",1);C=T([p({components:{NestedSelect:F}})],C);var Y=function(){var e=this,a=e._self._c;return e._self._setupProxy,a("NestedSelect",{attrs:{label:e.label,errorMessages:e.errorMessages,hideDetails:"auto",menuItems:e.jurisdictionOptions,readonly:e.readonly,showAppendIcon:e.showAppendIcon,value:e.jurisdiction},on:{change:function(t){return e.emitChangeEvent(t)}}})},Z=[],A=h(C,Y,Z,!1,null,null,null,null);const $=A.exports;A.exports.__docgenInfo={description:"Mixin that allows VM access to useful country/province data and functions.",tags:{link:[{description:"https://www.npmjs.com/package/country-list",title:"link"}],lint:[{description:"https://www.npmjs.com/package/provinces",title:"lint"}]},exportName:"default",displayName:"Jurisdiction",props:[{name:"label",tags:{},type:{name:"string"},defaultValue:{func:!1,value:"'Select the home jurisdiction'"}},{name:"errorMessages",tags:{},type:{name:"string"}},{name:"showUsaJurisdictions",tags:{},type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"initialValue",tags:{},type:{name:"ForeignJurisdictionIF"},defaultValue:{func:!1,value:"null"}},{name:"readonly",tags:{},type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"showAppendIcon",tags:{},type:{name:"boolean"},defaultValue:{func:!1,value:"true"}}],events:[{name:"change"}],sourceFiles:["/home/severin/repos/bcrs-shared-components/src/components/jurisdiction/Jurisdiction.vue","/home/severin/repos/bcrs-shared-components/src/mixins/countries-provinces-mixin.ts"]};const Se={title:"component/Jurisdiction"},M=(n,{argTypes:e})=>({props:Object.keys(e),components:{Jurisdiction:$},template:'<jurisdiction v-bind="$props" />'}),D=M.bind({});D.args={showUsaJurisdictions:!1};const E=M.bind({});E.args={showUsaJurisdictions:!1,initialValue:{country:"CA",region:"FD"}};var x,O,R;D.parameters={...D.parameters,docs:{...(x=D.parameters)==null?void 0:x.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    Jurisdiction
  },
  template: '<jurisdiction v-bind="$props" />' // $props comes from args below
})`,...(R=(O=D.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var H,d,c;E.parameters={...E.parameters,docs:{...(H=E.parameters)==null?void 0:H.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    Jurisdiction
  },
  template: '<jurisdiction v-bind="$props" />' // $props comes from args below
})`,...(c=(d=E.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};const ie=["Default","JurisdictionInitialValue"];export{D as Default,E as JurisdictionInitialValue,ie as __namedExportsOrder,Se as default};
//# sourceMappingURL=Jurisdiction.stories-a0cbe731.js.map
