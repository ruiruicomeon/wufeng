<template>
	<view class="dateil-warp">
		<view class="header-title">
			<text class="title-block" />
			<text class="title-info">头信息</text>
		</view>
		<view class="detail-title-info-warp">
			<view class="dateil-title-info-item">
				<text class="dateil-title-info-item-title">订单号:</text>
				<text class="dateil-title-info-item-info">{{ orderDateInfo.displayPoNum }}</text>
			</view>
			<view class="dateil-title-info-item">
				<text class="dateil-title-info-item-title">发布日期:</text>
				<text class="dateil-title-info-item-info">{{ $moment(orderDateInfo.releasedDate).format('YYYY-MM-DD') }}</text>
			</view>
			<view class="dateil-title-info-item">
				<text class="dateil-title-info-item-title">采购员:</text>
				<text class="dateil-title-info-item-info">{{ orderDateInfo.agentName }}</text>
			</view>
			<view class="dateil-title-info-item">
				<text class="dateil-title-info-item-title">税率:</text>
				<text class="dateil-title-info-item-info">{{ orderDateInfo.taxRate }}</text>
			</view>
			<view class="dateil-title-info-item">
				<text class="dateil-title-info-item-title">含税总金额：</text>
				<text class="dateil-title-info-item-info">{{ orderDateInfo.taxIncludeAmount }}</text>
			</view>
			<view class="dateil-title-info-item">
				<text class="dateil-title-info-item-title">物流方式：</text>
				<text class="dateil-title-info-item-info">{{ orderDateInfo.itemTransportMeaning }}</text>
			</view>
			<view class="dateil-title-info-item-address">
				<view class="dateil-title-info-item-title">收货地址：</view>
				<text class="dateil-title-info-item-info">{{ orderDateInfo.itemAddress }}</text>
			</view>
		</view>
		<!-- 行信息 -->
		<view class="header-title">
			<text class="title-block" />
			<text class="title-info">行信息：</text>
		</view>
		<view class="detail-line-info-warp" v-for="(item,index) in orderlineList" :key="index">
			<view class="detail-line-fist-title-warp">
				<text class="detail-line-fist-title">{{ item.itemName }}</text>
				<view class="detail-line-fist-info">
					<text>行号:</text>
					<text style="margin-left: 10rpx;">10</text>
				</view>
			</view>
			<view class="dateil-line-content-warp">
				<view class="dateil-line-content-left">
					<text class="dateil-line-left-first">物料编码：</text>
					<text class="dateil-line-left-scond">S210</text>
				</view>
				<view class="dateil-line-content-right">
					<text class="dateil-line-right-first">数量：</text>
					<text class="dateil-line-right-scond">{{ item.originalQuantity }}</text>
				</view>
			</view>
			<view class="dateil-line-content-warp-undeline">
				<view class="dateil-line-content-left">
					<text class="dateil-line-left-first">含税单价：</text>
					<text class="dateil-line-left-scond">{{ item.enteredTaxIncludedPrice }}{{ item.currencyCode }}</text>
				</view>
				<view class="dateil-line-content-right">
					<text class="dateil-line-right-first">单位：</text>
					<text class="dateil-line-right-scond">{{ item.uomName }}</text>
				</view>
			</view>
			<view class="dateil-line-content-warp" v-if="statusCode === 'CONFIRMED'">
				<view class="dateil-line-content-left">
					<text class="dateil-line-left-first">已接受：</text>
					<text class="dateil-line-left-scond">{{ item.receiveQuantity && item.receiveQuantity }}</text>
				</view>
				<view class="dateil-line-content-right">
					<text class="dateil-line-right-first">已入库：</text>
					<text class="dateil-line-right-scond">{{ item.deliverQuantity && item.deliverQuantity }}</text>
				</view>
			</view>
			<view class="dateil-line-content-warp" v-if="statusCode === 'CONFIRMED'">
				<view class="dateil-line-content-left">
					<text class="dateil-line-left-first">已退货：</text>
					<text class="dateil-line-left-scond">{{ item.returnQuantity && item.returnQuantity }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/services/request.service.js';
	import {
		getUserTenantId,
		getOrganizationId,
		getSupplierTenantId
	} from '@/services/auth.service.js';
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				orderDateInfo: {},
				orderlineList: [],
				poHeaderId: '',
				statusCode: ''
			}
		},
		methods: {
			getOrderDateils(poHeaderId) {
				uni.showLoading({
					title: '加载中...'
				})
				const params = {
					camp: 2
				}

				const getHearder = () => {
					return request.get(`/spuc/v1/${getOrganizationId()}/po-header/${poHeaderId}/detail/app`, params)
				}

				const lineMsg = () => {
					return request.get(`/spuc/v1/${getOrganizationId()}/po-line/${poHeaderId}/detail/app`, params)
				}

				return Promise.all([getHearder(), lineMsg()]).then(response => {
					uni.hideLoading()
					if (response && response.length > 0) {
						const [orderDateInfo, orderlineList] = response
						this.orderDateInfo = orderDateInfo
						this.orderlineList = orderlineList && orderlineList.length > 0 ? orderlineList : []
					}
				}).catch((err) => {
					uni.hideLoading()
				})
			}
		},
		onLoad: function(option) {
			this.poHeaderId = option.poHeaderId
			this.statusCode = option.statusCode
			this.getOrderDateils(option.poHeaderId)
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getOrderDateils(this.poHeaderId).then(() => {
				uni.stopPullDownRefresh();
			})
		},
	}
</script>

<style lang="scss" scoped>
	.dateil-warp {
		width: 100%;
		background-color: #EEEEEE;
		padding: 0 8rpx 40rpx;

		.header-title {
			display: flex;
			align-items: center;
			padding: 12rpx 12rpx;

			.title-block {
				width: 14rpx;
				height: 38rpx;
				display: inline-block;
				background-color: #003F9D;
				margin-right: 22rpx;
			}

			.title-info {
				color: #000000;
				font-size: 32rpx;
				font-weight: 500;
			}
		}

		.detail-title-info-warp {
			background-color: #FFFFFF;
			border-radius: 24rpx;
			width: 100%;
			min-height: 712rpx;
			padding: 0 60rpx 0 24rpx;
			box-shadow: 0 3px 6px rgba(10, 16, 20, 0.24), 0 4px 8px rgba(10, 16, 20, 0.12);

			.dateil-title-info-item {
				position: relative;
				display: flex;
				justify-content: space-between;
				align-items: center;
				line-height: 60rpx;
				padding-top: 30rpx;
				overflow: hidden;

				.dateil-title-info-item-title {
					color: #808080;
					font-size: 32rpx;
					font-weight: bold;
				}

				.dateil-title-info-item-info {
					color: #333;
					font-size: 32rpx;
					font-weight: bolder;
				}

				&::after {
					content: "";
					display: block;
					position: absolute;
					bottom: 0;
					text-align: center;
					left: 130rpx;
					width: 100%;
					height: 1rpx;
					background: #ccc;
					margin-top: 14rpx;
				}
			}

			.dateil-title-info-item-address {
				line-height: 60rpx;
				padding-top: 30rpx;

				.dateil-title-info-item-title {
					color: #808080;
					font-size: 32rpx;
					font-weight: bold;
				}

				.dateil-title-info-item-info {
					color: #333;
					font-size: 32rpx;
					font-weight: bolder;
				}
			}
		}

		.detail-line-info-warp {
			background-color: #FFFFFF;
			border-radius: 24rpx;
			width: 100%;
			min-height: 300rpx;
			padding: 0 60rpx 0 24rpx;
			margin-bottom: 40rpx;
			box-shadow: 0 3px 6px rgba(10, 16, 20, 0.24), 0 4px 8px rgba(10, 16, 20, 0.12);

			.detail-line-fist-title-warp {
				position: relative;
				display: flex;
				justify-content: space-between;
				line-height: 60rpx;
				padding-top: 30rpx;

				.detail-line-fist-title {
					color: #000000;
					font-size: 18px;
					font-weight: bold;
					flex: 1;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.detail-line-fist-info {
					color: #CCCCCC;
					font-size: 16px;
				}

				&::after {
					content: "";
					display: block;
					position: absolute;
					bottom: 0;
					left: 10rpx;
					width: 100%;
					height: 1rpx;
					background: #ccc;
					margin-top: 14rpx;
				}
			}

			.dateil-line-content-warp {
				display: flex;
				justify-content: space-between;
				margin: 12rpx 0;

				.dateil-line-content-left {
					width: 50%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-right: 28rpx;

					.dateil-line-left-first {
						color: #808080;
						font-size: 32rpx;
					}

					.dateil-line-left-scond {
						color: #151515;
						font-size: 32rpx;
					}
				}

				.dateil-line-content-right {
					width: 50%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-left: 28rpx;

					.dateil-line-right-first {
						color: #808080;
						font-size: 32rpx;
					}

					.dateil-line-right-scond {
						color: #151515;
						font-size: 32rpx;
					}
				}
			}

			.dateil-line-content-warp-undeline {
				display: flex;
				justify-content: space-between;
				margin: 12rpx 0;
				position: relative;
				padding-bottom: 20rpx;

				.dateil-line-content-left {
					width: 50%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-right: 28rpx;

					.dateil-line-left-first {
						color: #808080;
						font-size: 32rpx;
					}

					.dateil-line-left-scond {
						color: #151515;
						font-size: 32rpx;
					}
				}

				.dateil-line-content-right {
					width: 50%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-left: 28rpx;

					.dateil-line-right-first {
						color: #808080;
						font-size: 32rpx;
					}

					.dateil-line-right-scond {
						color: #151515;
						font-size: 32rpx;
					}
				}

				&::after {
					content: "";
					display: block;
					position: absolute;
					bottom: 0;
					left: 10rpx;
					width: 100%;
					height: 1rpx;
					background: #ccc;
				}
			}

		}
	}
</style>
