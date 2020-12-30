<template>
	<view class="list-warp">
		<view v-if="orderSearchList && orderSearchList.length > 0">
			<view class="list" hover-class="order-list-hover-style" v-for="(item,index) in orderSearchList" :key="index" @tap="onOrderItemClick(item)">
				<view class="list-top">
					<view class="list-top-left">
						<text>{{'订单号'}}:</text>
						<text>{{item.displayPoNum}}</text>
					</view>
					<view class="list-top-right-botton">
						<text :style="{color: statusCodeColor(item.statusCode)}" class="list-top-right-botton-style">{{ item.statusCodeMeaning }}</text>
					</view>
				</view>
				<view class="list-bottom">
					<view class="list-bottom-entityStore elli">
						<text>{{'地址'}}:</text>
						<text style="margin-left: 20rpx;">{{ item.itemAddress && item.itemAddress }}</text>
					</view>
					<view class="list-bottom-sumDay">
						<view class="list-bottom-sum">
							<text>{{'含税金额'}}:</text>
							<text style="margin-left: 20rpx;">{{ item.taxIncludeAmount }}{{ item.currencyCode }}</text>
						</view>
						<view class="list-bottom-Day">
							<text>{{'发布日期'}}:</text>
							<text style="margin-left: 20rpx;">{{ $moment(item.releasedDate).format('YYYY-MM-DD') }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="emptyStatus" v-else>
			未搜索到数据
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {
		mapState,
		mapMutations,
		mapGetters,
	} from 'vuex';

	export default {
		data() {
			return {
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
			}
		},
		computed: {
			...mapGetters(['orderSearchList', 'status'])
		},

		methods: {
			onOrderItemClick(item) {
				this.$emit('onOrderItemClick', item)
			},
			statusCodeColor(code) {
				if (code === 'PUBLISHED') {
					return '#C2D100'
				}
				if (code === 'CONFIRMED') {
					return '#49A800';
				}
				if (code === 'SUPPLIER_CONFIRMED') {
					return '#DA8A00';
				}
				if (code === 'PUBLISH_CANCEL') {
					return '#8C9420';
				}
				if (code === 'CANCELED') {
					return '#9E9E9E';
				}
				if (code === 'CLOSED') {
					return '#8C9420';
				}
			}

		},
		components: {
			uniLoadMore
		},
	}
</script>

<style lang="scss" scoped>
	.list-warp {
		padding: 10rpx 6rpx 0 6rpx;

		.order-list-hover-style {
			background: #ccc !important;
		}

		.emptyStatus {
			width: 100%;
			text-align: center;
		}

		.elli {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.elli2 {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}

		.elli3 {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
		}

		.list {
			width: 100%;
			min-height: 200rpx;
			display: flex;
			flex-direction: column;
			margin-top: 14rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			border-radius: 8rpx;
			padding: 34rpx 34rpx 24rpx 22rpx;
			box-shadow: 0 3px 6px rgba(10, 16, 20, 0.24), 0 4px 8px rgba(10, 16, 20, 0.12);

			.list-top {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				padding-bottom: 16rpx;
				border-bottom: 2rpx solid #D4D4D4;

				.list-top-left {
					white-space: nowrap;
					text-overflow: ellipsis;

					text {
						color: #474747;
						font-size: 32rpx;
						font-weight: 600;

						&:nth-child(2) {
							margin-left: 20rpx;
						}
					}
				}

				.list-top-right-botton {
					white-space: nowrap;
					text-overflow: ellipsis;

					.list-top-right-botton-style {
						font-size: 40rpx;
					}
				}
			}

			.list-bottom {
				width: 100%;

				.list-bottom-entityStore {
					font-size: 32rpx;
					color: #474747;
					margin-top: 14rpx;
					max-width: 504rpx;
				}
			}

			.list-bottom-sumDay {
				display: flex;
				justify-content: space-between;
				font-size: 32rpx;
				color: #474747;
				padding: 14rpx 0 24rpx 0;
			}

		}
	}
</style>
