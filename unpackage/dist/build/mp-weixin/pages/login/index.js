(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/index"],{1717:function(e,n,t){},1730:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=s(t("f737")),i=s(t("21c8")),r=t("c4a4"),a=s(t("5727")),c=t("2f62");t("46cd");function s(e){return e&&e.__esModule?e:{default:e}}function u(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function f(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?u(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var d={data:function(){return{providerList:[],hasProvider:!1,account:"",password:"",usename:"",positionTop:0,loading:!1,loginType:!0,showEmptyHirtName:!1,showEmptyHirtNamePass:!1,isWatchPass:!1}},methods:f(f({},(0,c.mapMutations)(["saveUserInfo","saveUserTenantId"])),{},{verifyValue:function(e,n){var t=e.detail.value;t||"username"!==n||(this.showEmptyHirtName=!0),t||"pass"!==n||(this.showEmptyHirtNamePass=!0)},watchPass:function(e){this.isWatchPass="watch"===e},initPosition:function(){this.positionTop=e.getSystemInfoSync().windowHeight-100},bindLogin:function(){var n=this;return new Promise((function(t,o){return n.usename?n.password?void t():(e.showToast({icon:"none",title:"请输入密码"}),void o()):(e.showToast({icon:"none",title:"请输入用户名"}),void o())}))},changeLoginType:function(){this.loginType=!this.loginType},formSubmit:function(n){var t=this;this.bindLogin().then((function(){t.loading=!0,e.showLoading({title:"正在登录"});var r=n.detail.value,c=r.usename,s=r.password,u=new a.default;u.setPublicKey(o.default.publicKey);var f=u.encrypt(s),l={grant_type:"password",client_id:"client",client_secret:"secret",source_type:"app",device_id:c,username:c,password:f};i.default.post("/oauth/oauth/token",l,"login").then((function(n){t.loading=!1,e.hideLoading(),n&&"unauthorized"===n.error?e.showModal({icon:"none",title:"提示",content:"用户名或者密码错误",confirmText:"确定",showCancel:!1,mask:!0,confirmColor:"#F99C34",success:function(e){e.confirm}}):n&&n.access_token&&(t.saveUserInfo(n),i.default.get("/iam/hzero/v1/users/self").then((function(n){t.saveUserTenantId(n),e.reLaunch({url:"../orderList/index"})})))})).catch((function(n){e.hideLoading(),t.loading=!1,e.showModal({icon:"none",title:"提示",content:"登录失败",confirmText:"确定",showCancel:!1,mask:!0,confirmColor:"#F99C34"})}))}))}}),onReady:function(){this.initPosition()},onLoad:function(){var n=(0,r.getToken)();n&&e.reLaunch({url:"../orderList/index"})}};n.default=d}).call(this,t("543d")["default"])},"3a22":function(e,n,t){"use strict";var o=t("1717"),i=t.n(o);i.a},"7b4d":function(e,n,t){"use strict";t.r(n);var o=t("8fc6"),i=t("fae2");for(var r in i)"default"!==r&&function(e){t.d(n,e,(function(){return i[e]}))}(r);t("3a22");var a,c=t("f0c5"),s=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,"ca23d28a",null,!1,o["a"],a);n["default"]=s.exports},"8fc6":function(e,n,t){"use strict";var o;t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return o}));var i=function(){var e=this,n=e.$createElement;e._self._c;e._isMounted||(e.e0=function(n){return e.verifyValue(n,"username")},e.e1=function(n){return e.verifyValue(n,"pass")},e.e2=function(n){return e.verifyValue(n,"pass")})},r=[]},a11c:function(e,n,t){"use strict";(function(e){t("1cbc");o(t("66fd"));var n=o(t("7b4d"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},fae2:function(e,n,t){"use strict";t.r(n);var o=t("1730"),i=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=i.a}},[["a11c","common/runtime","common/vendor"]]]);