(this.webpackJsonpfliyingcloud=this.webpackJsonpfliyingcloud||[]).push([[0],{371:function(e,t,n){"use strict";n.r(t);var a=n(7),c=(n(0),n(15)),r=n.n(c),i=n(45),o=(n(211),n(32)),s=n(378),l=n(48),u=n(46),d=n(78),j=n(376),h=n(373),b=n(377),f=n(81),p=n(381),O=n(41),m=n(52),x=Object(O.c)({name:"tokenModal",initialState:!1,reducers:{close:function(){return!1},open:function(){return!0}}}),g=Object(O.c)({name:"accuWeatherToken",initialState:null,reducers:{set:function(e,t){return t.payload||e}}}),y=Object(O.c)({name:"tequilaKiwiToken",initialState:null,reducers:{set:function(e,t){return t.payload||e}}}),v=Object(m.c)({modal:x.reducer,accuWeatherToken:g.reducer,tequilaKiwiToken:y.reducer});function k(){var e=Object(i.a)(["\n  position: fixed;\n  bottom: 10px;\n  right: 10px;\n"]);return k=function(){return e},e}var w=Object(l.a)(d.a)(k()),T={labelCol:{span:8},wrapperCol:{span:16}};var _=function(){var e=Object(o.b)(),t=Object(o.c)((function(e){return e.tokens.accuWeatherToken})),n=Object(o.c)((function(e){return e.tokens.tequilaKiwiToken}));return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(j.a,{visible:Object(o.c)((function(e){return e.tokens.modal})),title:"Set tokens",onCancel:function(){e(x.actions.close())},footer:null,children:Object(a.jsxs)(h.a,Object(u.a)(Object(u.a)({},T),{},{name:"basic",onFinish:function(t){e(g.actions.set(t.accuWeatherToken)),e(y.actions.set(t.tequilaKiwiToken)),e(x.actions.close())},onFinishFailed:function(e){console.log("Failed:",e)},size:"large",children:[Object(a.jsx)(h.a.Item,{label:"AccuWeather Token",name:"accuWeatherToken",rules:[{required:!0,message:"Please input your accuWeather token!"}],children:Object(a.jsx)(b.a.Password,{})}),Object(a.jsx)(h.a.Item,{label:"Tequila Kiwi Token",name:"tequilaKiwiToken",rules:[{required:!0,message:"Please input your tequila wiki token!"}],children:Object(a.jsx)(b.a.Password,{})}),Object(a.jsx)(h.a.Item,{children:Object(a.jsx)(d.a,{type:"primary",htmlType:"submit",children:"Save"})})]}))}),Object(a.jsx)(f.a,{title:"set up token keys",placement:"left",children:Object(a.jsx)(w,{danger:!t||!n,type:"primary",shape:"circle",size:"large",icon:Object(a.jsx)(p.a,{}),onClick:function(){e(x.actions.open())}})})]})},S=n(379),F=n(383),q=n(384),C=n(54),I=n.n(C),P=n(153),z=n(130),M=n.n(z),E=n(47),K=n(69),A=n.n(K),W=n(87),Y=n(79),D=n(150),L=n.n(D),B=n(80),G=n.n(B);function R(e){if(e.status>=200&&e.status<300)return e;var t=new Error(e.statusText);throw t.response=e,t}function N(e){return e.json()}var H=Object(O.c)({name:"locationsList",initialState:[],reducers:{set:function(e,t){return t.payload}}}),J=function(e){return function(t,n,a){var c=e.origin,r=e.destinations,i=e.adults,o=e.children,s=c.value.split("/"),l=Object(P.a)(s,1)[0],u={},d=[],j=r.map((function(e){var t=e.value.split("/"),n=Object(P.a)(t,2),a=n[0],c=n[1],r=function(e){var t,n=e.from,a=void 0===n?"FRA":n,c=e.to,r=void 0===c?"LON":c,i=e.adults,o=void 0===i?1:i,s=e.children,l=void 0===s?0:s,u=L()().format("DD/MM/YYYY"),d=L()().add(5,"d").format("DD/MM/YYYY"),j=Object(O.b)("flight/".concat(r,"/fetchByParams"),function(){var e=Object(W.a)(A.a.mark((function e(t,n){var c,i;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=n.getState(),i=c.tokens.tequilaKiwiToken,e.abrupt("return",Object(Y.a)(G()("https://tequila-api.kiwi.com/v2/search").search({fly_from:a,fly_to:r,date_from:u,date_to:d,return_from:d,return_to:d,adults:o,children:l,flight_type:"round",nights_in_dst_from:4,nights_in_dst_to:4,max_stopovers:1,max_sector_stopovers:0,vehicle_type:"aircraft",selected_cabins:"C",mix_with_cabins:"M",conn_on_diff_airport:0,ret_from_diff_airport:0,sort:"price"}),{method:"GET",headers:{accept:"application/json",apikey:i}}).then(R).then(N));case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}());return{asyncThunk:j,slice:Object(O.c)({name:"".concat(r,"_flights"),initialState:{items:[],loading:!1,error:null},reducers:{},extraReducers:(t={},Object(E.a)(t,j.rejected,(function(e,t){e.loading=!1,e.error="".concat(t.payload)})),Object(E.a)(t,j.pending,(function(e,t){e.loading=!0,e.error=null})),Object(E.a)(t,j.fulfilled,(function(e,t){e.loading=!1,e.error=null,e.items=t.payload.data})),t)})}}({from:l,to:a,adults:i,children:o}),s=function(e){var t,n=e.code,a=e.location,c="en-us",r=Object(O.b)("weather/".concat(n,"/fetchByParams"),function(){var e=Object(W.a)(A.a.mark((function e(t,n){var r,i;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.getState(),i=r.tokens.accuWeatherToken,e.abrupt("return",Object(Y.a)(G()("https://dataservice.accuweather.com/locations/v1/cities/geoposition/search").search({apikey:i,q:a,language:c,details:!1,toplevel:!0}),{method:"GET",headers:{accept:"application/json"}}).then(R).then(N).then((function(e){return Object(Y.a)(G()("https://dataservice.accuweather.com/forecasts/v1/daily/5day/".concat(e.Key)).search({apikey:i,language:c,details:!1,metric:!0}),{method:"GET",headers:{accept:"application/json"}}).then(R).then(N)})));case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}());return{asyncThunk:r,slice:Object(O.c)({name:"".concat(n,"_weather_city"),initialState:{data:null,loading:!1,error:null},reducers:{},extraReducers:(t={},Object(E.a)(t,r.rejected,(function(e,t){e.loading=!1,e.error="".concat(t.payload)})),Object(E.a)(t,r.pending,(function(e,t){e.loading=!0,e.error=null})),Object(E.a)(t,r.fulfilled,(function(e,t){e.loading=!1,e.error=null,e.data=t.payload.Headline})),t)})}}({code:a,location:c});return d.push(a),M()(u,a,Object(m.c)({flights:r.slice.reducer,weather:s.slice.reducer,name:function(){return e.label.join("")}})),{flight:r,weather:s}}));t(H.actions.set(d)),a.add("data",Object(m.c)(u)),j.forEach((function(e){t(e.flight.asyncThunk()),t(e.weather.asyncThunk())}))}},U=H.reducer,V=n(205),Q=n(104),X=n(186),Z=n(382),$=n(131),ee=n.n($),te=function(e){var t,n=Object(O.b)("location/".concat(e,"/fetchByParams"),function(){var e=Object(W.a)(A.a.mark((function e(t,n){var a,c,r,i;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.term,c=void 0===a?"fra":a,r=n.getState(),i=r.tokens.tequilaKiwiToken,"en-US","airport",5,!0,e.abrupt("return",Object(Y.a)(G()("https://tequila-api.kiwi.com/locations/query").search({term:c,locale:"en-US",location_types:"airport",limit:5,active_only:true}),{method:"GET",headers:{accept:"application/json",apikey:i}}).then(R).then(N));case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}());return{asyncThunk:n,slice:Object(O.c)({name:"".concat(e,"_locations"),initialState:{items:[],loading:!1,error:null},reducers:{},extraReducers:(t={},Object(E.a)(t,n.rejected,(function(e,t){e.loading=!1,e.error="".concat(t.payload)})),Object(E.a)(t,n.pending,(function(e,t){e.loading=!0,e.error=null})),Object(E.a)(t,n.fulfilled,(function(e,t){e.loading=!1,e.error=null,e.items=t.payload.locations})),t)})}},ne=te("origin"),ae=te("destination"),ce={origins:ne.asyncThunk,destinations:ae.asyncThunk},re=Object(m.c)({locations:Object(m.c)({origins:ne.slice.reducer,destinations:ae.slice.reducer})});function ie(){var e=Object(i.a)(["\n  text-align: 'center';\n"]);return ie=function(){return e},e}var oe=Q.a.Option,se=l.a.div(ie());function le(){return Object(a.jsxs)(se,{children:[Object(a.jsx)(Z.a,{style:{fontSize:20}}),Object(a.jsx)("p",{children:"Destination Not Found"})]})}var ue=function(e){var t=e.searchType,n=void 0===t?"origins":t,c=e.searchMode,r=Object(V.a)(e,["searchType","searchMode"]),i=Object(o.b)(),s=Object(o.c)((function(e){return e.search.locations[n].loading})),l=Object(o.c)((function(e){return e.search.locations[n].error})),d=Object(o.c)((function(e){return e.search.locations[n].items})),j=ee()((function(e){i(ce[n]({term:e}))}),500);return Object(a.jsx)(Q.a,Object(u.a)(Object(u.a)({mode:c,labelInValue:!0,showSearch:!0,loading:s,notFoundContent:s?Object(a.jsx)(X.a,{size:"small"}):l?Object(a.jsx)(le,{}):null,filterOption:!1,onSearch:j},r),{},{children:d.map((function(e){return Object(a.jsxs)(oe,{value:"".concat(e.code,"/").concat(e.location.lat,",").concat(e.location.lon),children:[e.name," - ",e.city.name]},e.code)}))}))},de={labelCol:{xs:{span:24},sm:{span:6}},wrapperCol:{xs:{span:24},sm:{span:16}}},je={wrapperCol:{xs:{offset:0,span:16},sm:{offset:6,span:16}}};var he=function(){var e=Object(o.b)(),t=Object(o.c)((function(e){return I()(e,"locations",[]).some((function(t){return I()(e,"data.".concat(t,".flights.loading"),!1)}))}));return Object(a.jsxs)(h.a,Object(u.a)(Object(u.a)({name:"search",onFinish:function(t){e(J(t))},onFinishFailed:function(e){console.log("Failed:",e)},size:"large"},de),{},{children:[Object(a.jsx)(h.a.Item,{label:"Origin",name:"origin","data-testid":"origin",rules:[{required:!0,message:"Please input your origin!"}],children:Object(a.jsx)(ue,{allowClear:!0,searchType:"origins",placeholder:"Amsterdam"})}),Object(a.jsx)(h.a.Item,{label:"Destinations",name:"destinations","data-testid":"destinations",rules:[{required:!0,message:"Please input your destinations!"}],children:Object(a.jsx)(ue,{allowClear:!0,searchType:"destinations",searchMode:"multiple",placeholder:"Madrid, Paris, London.."})}),Object(a.jsx)(h.a.Item,{label:"Passengers",children:Object(a.jsxs)(b.a.Group,{compact:!0,children:[Object(a.jsx)(h.a.Item,{name:"adults",initialValue:1,"data-testid":"adults",rules:[{required:!0,min:1,max:5,type:"number",message:"Adults are required"}],children:Object(a.jsx)(S.a,{placeholder:"Adults"})}),Object(a.jsx)(h.a.Item,{name:"children","data-testid":"children",rules:[{min:0,max:5,type:"number"}],children:Object(a.jsx)(S.a,{placeholder:"kids"})})]})}),Object(a.jsx)(h.a.Item,Object(u.a)(Object(u.a)({},je),{},{children:Object(a.jsx)(d.a,{"data-testid":"submit-search",type:"primary",htmlType:"submit",disabled:t,icon:t?Object(a.jsx)(F.a,{}):Object(a.jsx)(q.a,{}),children:"Search"})}))]}))},be=n(374),fe=n(56),pe=n(372),Oe=n(375),me=n(380),xe=n(93),ge=n(385),ye=n(386);function ve(){var e=Object(i.a)(["\n  text-align: center;\n  ","\n  padding: 20px;\n"]);return ve=function(){return e},e}function ke(){var e=Object(i.a)(["\n  min-height: 250px;\n  max-height: 250px;\n"]);return ke=function(){return e},e}function we(){var e=Object(i.a)(["\n  width: 100%;\n  max-width: 400px;\n  min-height: 350px;\n  max-height: 350px;\n\n  .ant-card-head-title .ant-typography-secondary {\n    white-space: wrap;\n    font-size: 16px;\n  }\n\n  .ant-card-body {\n    ","\n    padding-right: 20px;\n  }\n\n  .ant-list-pagination {\n    text-align: center;\n  }\n\n  .ant-list-item-action {\n    margin-left: 0;\n  }\n"]);return we=function(){return e},e}function Te(){var e=Object(i.a)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 20px 20px 0 20px;\n"]);return Te=function(){return e},e}var _e=be.a.Title,Se=be.a.Text,Fe=Object(l.a)(fe.a)(Te()),qe=Object(l.a)(pe.a)(we(),(function(e){return e.loading?"":"padding-left: 5px;"})),Ce=Object(l.a)(Oe.b)(ke());function Ie(){return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("p",{children:"Fancy flight"}),Object(a.jsx)("p",{children:"Extra Fancy flight"}),Object(a.jsx)("p",{children:"Cheap flight"})]})}var Pe=l.a.div(ve(),(function(e){return e.white?"color: white;":""}));function ze(){return Object(a.jsxs)(Pe,{white:!0,children:[Object(a.jsx)(Z.a,{style:{fontSize:20}}),Object(a.jsx)("p",{children:"Search some destinations!"})]})}function Me(e){var t=e.code,n=Object(o.c)((function(e){return I()(e,"data.".concat(t,".flights.loading"),[])})),c=Object(o.c)((function(e){return I()(e,"data.".concat(t,".name"),[])})),r=Object(o.c)((function(e){return I()(e,"data.".concat(t,".flights.items"),[])})),i=Object(o.c)((function(e){return I()(e,"data.".concat(t,".weather.data.Category"),"")})),s=Object(o.c)((function(e){return I()(e,"data.".concat(t,".weather.data.Text"),"")}));return Object(a.jsxs)(qe,{title:Object(a.jsxs)(be.a,{children:[Object(a.jsx)(_e,{level:5,ellipsis:!0,children:c}),Object(a.jsx)(Se,{type:"success",ellipsis:!0,children:Object(a.jsxs)(me.a,{overlayStyle:{width:200},arrowPointAtCenter:!0,placement:"bottom",title:i,content:s,children:["Expected weather: ",i," ",Object(a.jsx)(ge.a,{})]})})]}),bordered:!1,loading:n,children:[n?Object(a.jsx)(Ie,{}):0!==r.length&&Object(a.jsx)(Ce,{itemLayout:"horizontal",size:"small",pagination:{size:"small",pageSize:3},dataSource:r,renderItem:function(e){return Object(a.jsx)(Oe.b.Item,{actions:[Object(a.jsx)(d.a,{type:"link",block:!0,icon:Object(a.jsx)(ye.a,{}),target:"_blank",href:e.deep_link,children:"Select"},"select-flight")],children:Object(a.jsx)(_e,{level:4,children:Object.keys(e.conversion).map((function(t){return"".concat(e.conversion[t]," ").concat(t)}))})},e.title)}}),0===r.length&&Object(a.jsxs)(Pe,{children:[Object(a.jsx)(Z.a,{style:{fontSize:20}}),Object(a.jsx)("p",{children:"Sorry no flights for this destination!"})]})]})}var Ee=function(){var e=Object(o.c)((function(e){return e.locations}));return Object(a.jsxs)(xe.a,{gutter:0,justify:"center",wrap:!0,children:[0!==e.length&&e.map((function(e,t){return Object(a.jsx)(Fe,{className:"gutter-row",xl:6,sm:12,xs:24,flex:!0,children:Object(a.jsx)(Me,{code:e},e)},e)})),0===e.length&&Object(a.jsx)(ze,{})]})},Ke=n(197),Ae=n(151),We=n.n(Ae);function Ye(){var e=Object(i.a)(["\n  background-color: white;\n  color: black;\n  width: 100%;\n  margin-top: 20px;\n"]);return Ye=function(){return e},e}function De(){var e=Object(i.a)(["\n  width: 100%;\n"]);return De=function(){return e},e}function Le(){var e=Object(i.a)(["\n  background-color: white;\n  color: black;\n  height: auto;\n  width: 100%;\n  padding-top: 20px;\n"]);return Le=function(){return e},e}function Be(){var e=Object(i.a)(["\n  min-height: 100vh;\n  min-width: calc(100vw - 100px);\n  background-color: #282c34;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n"]);return Be=function(){return e},e}var Ge=s.a.Header,Re=s.a.Footer,Ne=s.a.Content,He=function(){var e=function(e){var t=Object(u.a)({},e),n=Object(m.c)(t),a=[];return{getReducerMap:function(){return t},reduce:function(e,t){if(a.length>0){e=Object(u.a)({},e);var c,r=Object(Ke.a)(a);try{for(r.s();!(c=r.n()).done;){var i=c.value;We()(e,i)}}catch(o){r.e(o)}finally{r.f()}a=[]}return n(e,t)},add:function(e,c){e&&(a=a.filter((function(t){return t!==e})),M()(t,e,c),n=Object(m.c)(t))},remove:function(e){e&&I()(t,e)&&(We()(t,e),a.push(e),n=Object(m.c)(t))}}}({tokens:v,search:re,locations:U});return Object(O.a)({reducer:e.reduce,middleware:function(t){return t({thunk:{extraArgument:e}})}})}(),Je=l.a.div(Be()),Ue=Object(l.a)(Ge)(Le()),Ve=Object(l.a)(Ne)(De()),Qe=Object(l.a)(Re)(Ye());var Xe=function(){return Object(a.jsx)(o.a,{store:He,children:Object(a.jsxs)(Je,{children:[Object(a.jsx)(Ue,{children:Object(a.jsx)(he,{})}),Object(a.jsx)(Ve,{children:Object(a.jsx)(Ee,{})}),Object(a.jsx)(Qe,{children:"Special thanks to the Free API's dudes"}),Object(a.jsx)(_,{})]})})},Ze=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,387)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),r(e),i(e)}))};r.a.render(Object(a.jsx)(Xe,{}),document.getElementById("root")),Ze()}},[[371,1,2]]]);
//# sourceMappingURL=main.0867f9f2.chunk.js.map