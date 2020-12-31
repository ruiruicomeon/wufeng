<template>
	<view class="warp-content">
		<!-- 搜索框 -->
		<view class="header-search">
			<view class="input-content">
				<view class="input-warp">
					<icon type="search" class="ex-search" size="16" color="#BBBBBB" @click="onInputSearch" />
					<input :value="searchInputValue" class="search-input" auto-blur focus placeholder="搜索订单号" placeholder-style="color='#9C9C9C';font-szie=11px;margin-left=10px"
					 @input="(e)=>onIput(e)" @confirm="onConfirmsearch" />
					<icon type="clear" v-if="searchInputValue" class="clear-icon" size="16" color="#BBBBBB" @click="onCancelClick('clear')" />
				</view>
				<text class="cancle" @click="onCancelClick('cancel')">取消</text>
			</view>
		</view>
		<!-- 列表  -->
		<view class="list-warp" v-if="!searchInputValue">
			<orderList @onOrderItemClick="onOrderItemClick" @loadMore="clickLoadMore" />
		</view>
		<view class="list-warp" v-if="searchInputValue">
			<orderSearchList @onOrderItemClick="onOrderItemClick" />
		</view>
	</view>
</template>

<script>
	import orderList from '../../components/order-list/list-item.vue'
	import orderSearchList from '../../components/order-list/list-item-search'
	import {
		getUserTenantId,
		getOrganizationId,
		getSupplierTenantId
	} from '@/services/auth.service.js';
	import request from '@/services/request.service.js';
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	import {
		delUndefined,
		debounce
	} from '@/utils/index.js'
	let self = this
	export default {

		data() {
			return {
				searchInputValue: '',
				handleTimer : null
			};
		},
		computed: {
			...mapGetters(['orderList', 'orderPage', 'status'])
		},
		methods: {
			...mapMutations('orderList', ['saveOrderList', 'saveOrderPage', 'changeStatue', 'saveOrderNewsList',
				'saveSearchOrderList'
			]),
			onInputSearch(e) {
				// this.getOrderList()
			},
			onOrderItemClick(item) {
				uni.navigateTo({
					url: `../orderdateil/index?poHeaderId=${item.poHeaderId}&statusCode=${item.statusCode}&statusCodeMeaning=${item.statusCodeMeaning}`
				});
			},
			onIput: function(e) {
				const value = e.target.value;
				this.searchInputValue = value;
				const that = this
				if (this.handleTimer) {
					clearTimeout(this.handleTimer)
				}
				this.handleTimer = setTimeout(function() {
					that.getOrderList()
				}, 500)
			},

			onCancelClick(type) {
				if (type === 'clear') {
					this.searchInputValue = '';
				}
				if (type === 'cancel') {
					this.saveSearchOrderList([])
					this.searchInputValue = '';
				}
			},
			onConfirmsearch(event) {
				const {
					value
				} = event.detail;
				console.log(value)
			},
			getOrderList(type) {
				let params = {
					page: type && type === 'more' ? this.orderPage.page + 1 : 0,
					size: this.orderPage.size,
					statusCodes: 'PUBLISHED,DELIVERY_DATE_REVIEW,DELIVERY_DATE_REJECT,CONFIRMED,PUBLISH_CANCEL,CANCELED,CLOSED',
					supplierTenantId: getSupplierTenantId(),
					displayPoNum: this.searchInputValue,
				}
				params = delUndefined(params)
				uni.showLoading({
					title: '加载中...'
				})

				if (type === 'more') {
					this.changeStatue('loading')
				}

				return request.get(`/spuc/v1/${getOrganizationId()}/po-header/supplier/app`, params).then(response => {
					uni.hideLoading()
					if (response.size * response.number >= response.totalElements) {
						this.changeStatue('nomore')
					} else {
						this.changeStatue('more')
					}
					if (response && response.content && response.content.length > 0) {
						const page = {
							size: response.size,
							page: response.number,
							total: response.totalElements,
							totalPage: response.totalPages,
						}
						if (type === 'refresh') {
							this.saveOrderNewsList(response.content)
							this.saveOrderPage(page)
							return
						} else if (this.searchInputValue) {
							this.saveSearchOrderList(response.content)
						} else {
							this.saveOrderList(response.content)
							this.saveOrderPage(page)
						}

					}
				})
			},
			clickLoadMore() {
				if (this.status === 'nomore') {
					return false;
				}
				this.getOrderList('more')
			}
		},
		components: {
			orderList,
			orderSearchList
		},
		onLoad() {
			this.getOrderList()
		},
		onReady() {
			uni.hideHomeButton()
		},

		// 下拉刷新
		onPullDownRefresh() {
			this.getOrderList('refresh').then(() => {
				uni.stopPullDownRefresh();
			})
		},

		onReachBottom: function() {
			if (this.status === 'nomore') {
				return false;
			}
			this.getOrderList('more')

		},

	}
</script>

<style lang="scss" scoped>
	.warp-content {
		width: 100%;
		height: 101%;
		overflow-y: scroll;
		background-color: #EEEEEE;

		.header-search {
			width: 100%;
			height: 76rpx;
			padding: 12rpx 0rpx 14rpx 26rpx;
			background-color: #F4F2EF;
			position: fixed;
			box-sizing: border-box;
			border-bottom: 2rpx solid #DDDDDD;

			.input-content {
				.input-warp {
					position: relative;
				}

				width: 100%;
				display: flex;
				align-items: center;

				.ex-search {
					position: absolute;
					top: 7.24rpx;
					left: 7.24rpx;
					display: inline-block;
					z-index: 10;
				}

				.clear-icon {
					position: absolute;
					top: 8rpx;
					right: 36rpx;
					display: inline-block;
					z-index: 10;
				}

				.search-input {
					background-color: #FFFFFF;
					width: 606.88rpx;
					height: 46rpx;
					border-radius: 10.86rpx;
					padding-left: 40rpx;
					padding-right: 100rpx;
				}

				.cancle {
					color: #585858;
					font-size: 28rpx;
					margin-left: 28.98rpx;
					font-weight: bold;
				}

			}
		}

		.list-warp {
			margin-top: 76rpx;

		}
	}
</style>
