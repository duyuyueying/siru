<template>
	<view class="timeline">
		<view class="timeline_item" v-for="(item, index) in items" :key="index" :style="{marginBottom: (index+1) == items.length ? '40upx': '0upx'}">
			<view class="line"></view>
			<view class="block"></view>
			<view class="time_wrapper">
				<text class="time_txt">{{timeFun(item.time)}}</text>
			</view>
			<view v-if="type === 'live'">
				<view class="sort_btn" @click="sort" v-if="index == 0"><text class='sort_txt'>倒叙</text></view>
				<view class="content_wrapper">
					<text class="con_txt">{{item.content}}</text>
				</view>
				<view class="flex_row">
					<image class="image-list1 mr20" src="../../static/temp/avatar.jpeg"></image>
					<text class="info-text title_txt mr20">{{item.speaker.name}}</text>
					<text class="info-text indenfication_txt mr20" :style="{color:identificationFun(item.speaker.identification) ? identificationFun(item.speaker.identification).color: '#ccc'}">{{item.speaker.position}}</text>
				</view>
			</view>
			<view v-if="type === 'fastNews'">
				<view class="head_wrapper" @click="goPage(item.id)"><text class="head_txt">{{item.title}}</text></view>
				<view class="desc_wrapper"><text class="content_txt">{{item.detail}}</text></view>
				<view v-if="item.coins && item.coins.length > 0" class="flex_row coin_wrapper">
					<view v-for="(subItem, index) in item.coins" :key="index" class="mark_wrapper" :style="{width:markViewWidth}">
						<mark-view
							:end="subItem.endPrice"
							:start="subItem.startPrice"
							:item = "subItem"
							
							></mark-view >
					</view>
				</view>
				<view class="border" :style="{width:markViewWidth}" @click="goCoinDetailPage('ETH', '')">
					<text style="line-height: 50upx;font-size: 30upx;">ETH</text>
					<text style="line-height: 50upx;font-size: 30upx;">$198.14</text>
					<text class="time_txt">2MIN涨幅</text>
					<text style="font-weight: 600;" :class="theme ==='greenUp' ? 'greenColor' : 'redColor'">+1.65%</text>
				</view>
				<operation-btns :goodCount="item.goodCount" :badCount="item.badCount" :commentCount="item.comment" @share="doShare" @gotoCommet="goPage(item.id)"></operation-btns>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {identification} from '@/common/config.js';
	import moment from 'moment';
	import markView from '@/components/markView.vue';
	import operationBtns from '@/components/operationBtns.vue';
	export default {
		data() {
			return {
				screenWidth: 0
				// itemWatchFlag: false, // 用来监听
			}
		},
		props: {
			items: Array,
			type: {
				require: true,
				type: String
			}
		},
		components:{
			markView,
			operationBtns
		},
		created() {
			console.log(this.items);
			this.theme = uni.getStorageSync('markTheme') || 'greenUp';
			let _this = this;
			uni.getSystemInfo({
				success(res) {
					_this.screenWidth = res.screenWidth;
				}
			})
		},
		methods:{
			identificationFun(data) {
				return identification[data];
			},
			timeFun(time) {
				return moment(time).format('YYYY/MM/DD HH:mm:ss');
			},
			sort(){
				console.log('sort===')
				this.items = ([].concat(this.items)).reverse();
				console.log(this.items);
			},
			doShare() {
				uni.showToast({
					icon:'none',
					title: '去分享'
				})
			},
			goPage(id) {
				uni.navigateTo({
					url: '/pages/detail/fastNewsDetail?id='+id
				})
			},
			goCoinDetailPage(symbol, exChangeName){
				uni.navigateTo({
					url: '/pages/coinDetail/coinDetail?symbol='+symbol+'&exChangeName='+exChangeName
				});
			}
		},
		computed:{
			markViewWidth(){
				return (this.screenWidth - 70)/2
			}
			// itemWatchFlag() 
		}
	}
</script>

<style lang="scss">
	@import '@/common/common.scss';
	.timeline{
		// margin-left: 40upx;
		// border-style: solid;
		// border-color: #f5f5f5;
		// border-width: 0upx;
		// border-left-width: 2upx;
		// padding-left: 24upx;
		
	}
	.timeline_item{
		padding: 40upx 30upx 0upx 64upx;
		// padding-left: 64upx;
		// padding-top: 40upx;
		position: relative;
	}
	.block{
		width: 16upx;
		height: 16upx;
		position: absolute;
		top: 44upx;
		left: 32upx;
		z-index: 11;
		background-color: $mainColor;
	}
		
	.line{
		width: 4upx;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 38upx;
		z-index: 10;
		background-color: #f5f5f5;
	}
	.coin_wrapper{
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.mark_wrapper{
		margin-bottom: $space-base;
	}
	.time_txt{
		@include txt(26upx);
	}
	.con_txt{
		@include txt(30upx, #000);
		line-height: 50upx;
	}
	.content_wrapper{
		margin-top: 10upx;
		margin-bottom: 10upx;
		padding-right: 20upx;
	}
	.title_txt{
		@include txt(24upx, #000);
	}
	.indenfication_txt{
		font-size: 24upx;
	}
	.image-list1{
		width: 32upx;
		height: 32upx;
	}
	.sort_btn{
		background-color: #f5f5f5;
		width: 110upx;
		height: 40upx;
		position: absolute;
		right: 30upx;
		top: -30upx;
		align-items: center;
		justify-content: center;
	}
	.sort_txt{
		@include txt(20upx, #333);
	}
	.desc_wrapper{
		margin-bottom: 10upx;
	}
	.content_txt{
		@include txt(30upx, #797979);
		line-height: 44upx;
	}
	.head_txt{
		@include txt(34upx, #000);
		font-weight: 600;
		line-height: 50upx;
	}
	.border{
		border-width: 1upx;
		border-color: #a0a0a0;
		border-style: solid;
		padding: 30upx 20upx;
		margin-top: 10upx;
		width: 50%;
	},
	.greenBg {
		background-color: #d7f0db;
	}
	.greenColor {
		color: #39b54a;
	}
	.redBg{
		background-color: #fadbd9
	}
	.redColor {
		color: #e54d42
	}
</style>
