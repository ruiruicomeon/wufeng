(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/order-list/list-item"],{"20b6":function(t,e,n){"use strict";n.r(e);var r=n("9374"),o=n.n(r);for(var c in r)"default"!==c&&function(t){n.d(e,t,(function(){return r[t]}))}(c);e["default"]=o.a},"78c4":function(t,e,n){"use strict";var r=n("7f00"),o=n.n(r);o.a},"7f00":function(t,e,n){},9365:function(t,e,n){"use strict";n.r(e);var r=n("af16"),o=n("20b6");for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);n("78c4");var u,i=n("f0c5"),a=Object(i["a"])(o["default"],r["b"],r["c"],!1,null,"06bd6f2c",null,!1,r["a"],u);e["default"]=a.exports},9374:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n("2f62");function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){u(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var i=function(){n.e("components/uni-load-more/uni-load-more").then(function(){return resolve(n("3c37"))}.bind(null,n)).catch(n.oe)},a={data:function(){return{contentText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}},computed:c({},(0,r.mapGetters)(["orderList","status"])),methods:{clickLoadMore:function(){this.$emit("loadMore")},onOrderItemClick:function(t){this.$emit("onOrderItemClick",t)},statusCodeColor:function(t){return"PUBLISHED"===t?"#C2D100":"CONFIRMED"===t?"#49A800":"SUPPLIER_CONFIRMED"===t?"#DA8A00":"PUBLISH_CANCEL"===t?"#8C9420":"CANCELED"===t?"#9E9E9E":"CLOSED"===t?"#8C9420":void 0}},components:{uniLoadMore:i}};e.default=a},af16:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return r}));var r={uniLoadMore:function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"3c37"))}},o=function(){var t=this,e=t.$createElement,n=(t._self._c,t.orderList&&t.orderList.length>0?t.__map(t.orderList,(function(e,n){var r=t.__get_orig(e),o=t.statusCodeColor(e.statusCode),c=t.$moment(e.releasedDate).format("YYYY-MM-DD");return{$orig:r,m0:o,g0:c}})):null);t.$mp.data=Object.assign({},{$root:{l0:n}})},c=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/order-list/list-item-create-component',
    {
        'components/order-list/list-item-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9365"))
        })
    },
    [['components/order-list/list-item-create-component']]
]);
