/**
 * 过滤掉对象的空值
 * @param {Object} ob
 * @return {Object} 新的对象
 */
export function delUndefined(ob) {
	for (let e in ob) {
		if (typeof(ob[e]) === 'undefined' || ob[e] === null || ob[e] === '') {
			delete ob[e];
		} else if (ob[e].constructor === Object) {
			if (Object.keys(ob[e]).length === 0) {
				delete ob[e];
			} else {
				delUndefined(ob[e]);
			}
		} else if (ob[e].constructor === Array) {
			ob[e].map(function(seg) {
				if (typeof(seg) === 'object') {
					delUndefined(seg);
				}
			});
		}
	}
	return ob;
}




/**
 * 
 * @param {Object} fn 防抖函数
 * @param {Object} delay
 */
export function debounce(fn, delay) {
	var handle = null;
	return function() {
		if (handle) {
			clearTimeout(handle)
		}
		handle = setTimeout(function() {
			fn()
		}, delay)
	}
}



/**
 * 获取客户端唯一id
 * 
 * **/
export function getClientId() {
	uni.login({
		provider: 'weixin',
		success: function(res) {
			let appid = 'wx45dbe58c6be3295e'
			let secret = '5108b49269b91a70017bba3c5040b340'
			let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' +
				res.code + '&grant_type=authorization_code';
			uni.request({
				url,
				success: result => {
					uni.setStorageSync('openid', result.data.openid);
					return result.data.openid
				},
			});
		}
	});
}
