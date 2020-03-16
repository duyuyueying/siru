<template>
	<view class="mark" :style="{backgroundColor: theme != null ? theme.bg : '#898989'}" @click.stop="onClick">
		<text class="makt_txt" :style="{color: theme != null ? theme.txt : '#fff'}">{{item.name}}</text>
		<view class="flex_row ml20">
			<text class="makt_txt" :style="{color: theme != null ? theme.txt : '#fff'}">{{start - end}}.75%</text>
			<icons :type="isUp > 0 ? 'up' : 'down'" size="12" :color="theme != null ? theme.txt : '#fff'" >{{icon}}</icons>
		</view>
	</view>
</template>

<script>
	import icons from '@/components/icons.vue';
	import {color} from '@/common/util.js';
	export default {
		data() {
			return {
				theme: null,
			};
		},
		mixins:[color],
		components:{
			icons
		},
		props: {
			item: {
				type: Object,
				default: function() {
					return {}
				}
			},
			// 币的开市价格
			start : {
				type: [Number,String],
				default: 0
			},
			// 币的关市价格
			end: {
				default: 0,
				type: [Number,String],
			}
		},
		created() {
			// 计算币的涨跌颜色
			this.theme = this.color(this.item.startPrice, this.item.endPrice);
		},
		methods:{
			onClick() {
				let symbol = this.item.name || '';
				let exChangeName = this.item.exChange || '';
				uni.navigateTo({
					url: '/pages/coinDetail/coinDetail?symbol='+symbol+'&exChangeName='+exChangeName
				});
			}
		},
		computed: {
			isUp(){
				return (this.end - this.start) > 0;
			}
		}
	}
</script>

<style lang="scss">
	.mark{
		flex:1;
		// min-width: 168upx;
		padding: 10upx;
		justify-content: space-between;
		flex-direction: row;
	}
	.ml20{
		margin-left: $space-base;
	}
	.makt_txt{
		font-size: 20upx;
	}
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
	.iconfont{
		font-family: iconfont;
		font-size: 30upx;
	}
</style>
