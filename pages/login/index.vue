<template>
	<view class="content">
		<!-- <image src="../../static/img/bg.jpg" mode=""></image> -->
		<form @submit="formSubmit">
			<view class="login-content">
				<view v-if="loginType">
					<image src="../../static/header_logo.png" mode=""></image>
					<view class="input-view cuIcon-friend">
						<input class="uni-input" name="usename" v-model="usename" placeholder="用户名" @blur="(e)=>verifyValue(e,'username')" />
					</view>
					<view class="hirt-usernam" v-if="showEmptyHirtName && !usename">账户名称不能为空</view>
					<view class="input-view cuIcon-lock">
						<input v-if="!isWatchPass" class="uni-input" name="password" type="password" v-model="password" placeholder="密码"
						 @blur="(e)=>verifyValue(e,'pass')" />
						<input v-else class="uni-input" name="password" type="text" v-model="password" placeholder="密码" @blur="(e)=>verifyValue(e,'pass')" />
						<text v-if="!isWatchPass" class="cuIcon-attentionforbid attention-position" @touchstart="watchPass('watch')" />
						<text v-else class="cuIcon-attention attention-position" @touchstart="watchPass('nowatch')" />
					</view>
					<view class="hirt-usernam" v-if="showEmptyHirtNamePass && !password">密码不能为空</view>
				</view>
				<view v-if="!loginType">
					<view class="input-view padding-sm solids radius"> <input class="uni-input" placeholder="请输入手机号" /></view>
					<view>
						<m-input class="m-input yan" type="number" clearable v-model="password" placeholder="请输入验证码"></m-input>
						<text class="yan-btn">获取验证码</text>
					</view>
				</view>
				<view class="btn-row">
					<button :loading="loading" form-type="submit" class="cu-btn block bg-yellow margin-tb-sm lg">登录</button>
				</view>
				<!-- <view class="login-type" @tap="changeLoginType">{{ loginType ? '手机密码登录' : '用户密码登录' }} ></view> -->
			</view>
		</form>
	</view>
</template>

<script>
	import configService from '@/services/config.service.js';
	import request from '@/services/request.service.js';
	import {
		getToken
	} from '@/services/auth.service.js';
	import JSEncrypt from 'jsencrypt';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import { getClientId } from '@/utils/index.js'
	// 联想（北京）有限公司  2019Ecp#sz
	//  uni-simple-router 路由守卫
	export default {
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				usename: '',
				positionTop: 0,
				loading: false,
				loginType: true,
				showEmptyHirtName: false,
				showEmptyHirtNamePass: false,
				isWatchPass: false
			};
		},

		methods: {
			...mapMutations(['saveUserInfo', 'saveUserTenantId']),
			verifyValue(e, type) {
				const {
					value
				} = e.detail
				if (!value && type === 'username') {
					this.showEmptyHirtName = true
				}
				if (!value && type === 'pass') {
					this.showEmptyHirtNamePass = true
				}
			},
			watchPass(type) {
				if (type === 'watch') {
					this.isWatchPass = true
				} else {
					this.isWatchPass = false
				}
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				return new Promise((resove, reject) => {
					if (!this.usename) {
						uni.showToast({
							icon: 'none',
							title: '请输入用户名'
						});
						reject()
						return;
					}
					if (!this.password) {
						uni.showToast({
							icon: 'none',
							title: '请输入密码'
						});
						reject()
						return;
					}
					resove()
				})
			},
			changeLoginType() {
				this.loginType = !this.loginType;
			},
			formSubmit: function(e) {
				this.bindLogin().then(() => {
					this.loading = true
					uni.showLoading({
						title: '正在登录'
					})
					const formdata = e.detail.value;
					const {
						usename,
						password
					} = formdata;
					const sen = new JSEncrypt();
					sen.setPublicKey(configService.publicKey);
					const encrypted = sen.encrypt(password);
					const params = {
						grant_type: 'password',
						client_id: 'client',
						client_secret: 'secret',
						source_type: 'app',
						device_id: uni.getStorageSync('openid'),
						username: usename,
						password: encrypted,
						// user_type: 用户类型，中台用户-P/C端用户-C
					}
					request.post(`/oauth/oauth/token`, params, 'login').then((res) => {
						this.loading = false
						uni.hideLoading()
						if (res && res.error === 'unauthorized') {
							uni.showModal({
								icon: 'none',
								title: '提示',
								content: '用户名或者密码错误',
								confirmText: '确定',
								showCancel: false,
								mask: true,
								confirmColor: '#F99C34',
								success: (res) => {
									if (res.confirm) { }
								}
							})
							return
						}
						if (res && res.access_token) {
							// 同步执行 储存token信息
							this.saveUserInfo(res)
							request.get('/iam/hzero/v1/users/self').then((tenantId) => {
								this.saveUserTenantId(tenantId)
								uni.reLaunch({
									url: '../orderList/index'
								})
							})
						}
					}).catch(err => {
						uni.hideLoading()
						this.loading = false
						uni.showModal({
							icon: 'none',
							title: '提示',
							content: '登录失败',
							confirmText: '确定',
							showCancel: false,
							mask: true,
							confirmColor: '#F99C34',
						})
					})
				})
			}
		},
		onReady() {
			this.initPosition();
		},
		onLoad() {
			getClientId()
			const token = getToken();
			if (token) {
				uni.reLaunch({
					url: '../orderList/index'
				})
			}
		}

	};
</script>

<style lang="scss" scoped>
	.content {
		position: relative;
		height: 100%;
		width: 100%;

		.login-content {
			position: absolute;
			top: 30%;
			left: 50%;
			width: 80%;
			transform: translate(-50%, -20%);

			.hirt-usernam {
				color: #FF0000;
				padding-left: 20rpx;
				font-size: 24rpx;
				font-weight: bold;
				margin-bottom: 16rpx;
			}

			image {
				width: 252px;
				height: 124px;
			}

			.input-view {
				margin-bottom: 10px;
				position: relative;

				.attention-position {
					position: absolute;
					font-size: 28rpx;
					right: 30rpx;
					bottom: 19rpx;
					z-index: 11;
				}

				.uni-input {
					padding-left: 38px;
					padding-right: 80rpx;
					border-radius: 14px;
					background: #FFFFFF;
					border: 1rpx solid #707070 !important;
					height: 38px;
					font-size: 15px;
				}

				@media screen and (-webkit-min-device-pixel-ratio: 2) {
					.uni-input {
						border: 0.5px solid #707070
					}
				}

				@media screen and (-webkit-min-device-pixel-ratio: 3) {
					.uni-input {
						border: 0.333333px solid #707070
					}
				}
			}

			.yan-btn {
				width: 30%;
				display: inline-block;
				text-align: center;
				padding: 10px 5px;
				border: 1px solid #0faeff;
				border-radius: 5px;
				margin-left: 10px;
			}

			.m-input {
				padding: 7px 3px;
				border: 1px solid #eee;
				border-radius: 6rpx;

				&.yan {
					width: 56%;
					display: inline-block;
				}
			}
		}

		.login-type {
			text-align: center;
		}
	}
</style>
