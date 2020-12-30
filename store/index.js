import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { saveUserInfo , saveUserTenantId} from '@/services/auth.service.js';
import orderList from './orderList/index.js';
import getters from './getters.js'

const gobalState = {
	usrtInfo : {},
    userTenantId:''
}

const mutations = {
	saveUserInfo(state,userinfo){
		state.usrtInfo = userinfo
		saveUserInfo(userinfo)
	},
	saveUserTenantId(state,TenantId){
		state.userTenantId = TenantId
		saveUserTenantId(TenantId)
	}
}

const actions = {
	
}


const store = new Vuex.Store({
    state: gobalState,
    mutations,
    actions,
	getters,
	modules:{
		orderList
	}
})
export default store