import configService from './config.service.js'
import {
	clearAllStore,
	getToken
} from './auth.service.js' 

let apiUrl = configService.apiUrl

let loginUrl = configService.loginUrl

let token = getToken()

function requestType(type, url, params, resolve, reject) {
	uni.request({
		url, //仅为示例，并非真实接口地址。
		method: type,
		data: params,
		header: {
			'Authorization': getToken() || "",
			"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
		},
		success: function(res) {
			if (res.statusCode === 401) { 
				if (token) {
					clearAllStore();
					uni.reLaunch({
						url: '/pages/login/index'
					})
				}
			}
			resolve(res.data)
		},
		fail: function(res) {
			reject(res)
		}
	});
}

const request = {
	get(url, params) {
		return new Promise((resolve, reject) => {
			requestType('GET', apiUrl + url, params, resolve, reject)
		})
	},
	post(url, params, type) {
		if (type && type === 'login') {
			return new Promise((resolve, reject) => {
				requestType('POST', loginUrl + url, params, resolve, reject)
			})
		}
		return new Promise((resolve, reject) => {
			requestType('POST', apiUrl + url, params, resolve, reject)
		})
	},
	delete(url, params) {
		return new Promise((resolve, reject) => {
			requestType('DELETE', apiUrl + url, params, resolve, reject)
		})
	},
}

export default request
