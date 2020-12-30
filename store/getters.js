
const getters = {
	// 列表页面数据
	orderList : state => state.orderList.orderList,
	// 列表页面分页
    orderPage : state => state.orderList.orderPage,
	// 加载状态
	status : state => state.orderList.status,
	// 列表页面搜索值
	orderSearchList: state => state.orderList.orderSearchList
}


export default getters;