import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import cuCustom from './colorui/components/cu-custom.vue'
import { getToken } from '@/services/auth.service.js';
import moment from 'moment'
Vue.component('cu-custom',cuCustom)
Vue.prototype.$store = store
Vue.prototype.$moment = moment;
Vue.config.productionTip = false

// Vue.prototype.$getRsaCode = function(str){ // 注册方法
//   let pubKey = `-----BEGIN PUBLIC KEY-----
//  rerwrwewewewewesssaczdscasdafffvzdxdas-----END PUBLIC KEY-----`;// ES6 模板字符串 引用 rsa 公钥
//   let encryptStr = new JSEncrypt();
//   encryptStr.setPublicKey(pubKey); // 设置 加密公钥
//   let  data = encryptStr.encrypt(str.toString());  // 进行加密
//   return data;
// }

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
