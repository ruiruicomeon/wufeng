

const mutations = {
	// 
	saveOrderList(state,orderlist){
		const currentOrderList = state.orderList
		state.orderList =currentOrderList.concat(orderlist) 
	},
	// 下拉刷新
	saveOrderNewsList(state,orderList){
		state.orderList = orderList 
	},
	// 分页信息
	saveOrderPage(state,page){
		state.orderPage = page
	},
	// 下拉加载状态
	changeStatue(state,loadingType){
		state.status = loadingType
	},
	// 搜索值
	saveSearchOrderList(state,list){
		state.orderSearchList = list
	}
}

export default mutations