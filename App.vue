<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			// #ifdef APP-NVUE
			plus.screen.lockOrientation('portrait-primary');

			let appid = plus.runtime.appid;
			if (appid && appid.toLocaleLowerCase() != "hbuilder") {
				uni.request({
					url: 'https://uniapp.dcloud.io/update', //检查更新的服务器地址
					data: {
						appid: plus.runtime.appid,
						version: plus.runtime.version
					},
					success: (res) => {
						console.log('success', res);
						if (res.statusCode == 200 && res.data.isUpdate) {
							let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
							// 提醒用户更新
							uni.showModal({
								title: '更新提示',
								content: res.data.note ? res.data.note : '是否选择更新',
								success: (showResult) => {
									if (showResult.confirm) {
										plus.runtime.openURL(openUrl);
									}
								}
							})
						}
					}
				})
			}

			var domModule = weex.requireModule('dom');
			domModule.addRule('fontFace', {
				'fontFamily': "texticons",
				'src': "url('./static/text-icon.ttf')"
			});
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import 'common/iconfont.css';
	@import '@/common/common.scss';
	/*每个页面公共css */
	.container {
		display: flex;
		flex-direction: column;
		min-height: 100%;
		background-color: $bgColor;
		justify-content: space-between;
		font-family: open sans,PingFang SC,Lantinghei SC,Helvetica Neue,Helvetica,Arial,Microsoft YaHei,"sans-serif";
	}
	.mr20{
		margin-right: $space-base;
	}
	.flex_row{
		display: flex;
		flex-direction: column;
	}
	.pad30{
		padding: 0upx 30upx;
		background-color: #fff;
	}
	.mb20{
		margin-bottom: $space-base;
	}
	
</style>
