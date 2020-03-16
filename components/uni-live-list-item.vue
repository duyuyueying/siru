<template>
	<view class="live_item">
		<view class="banner" auto-focus>
			<image class="banner-img" src="https://img.36krcdn.com/20200307/v2_945dcd5d78514102a1e83a016bfbb2a6_img_000" mode="aspectFill"></image>
			<view class="title-area" style="{background-color: detail.status === '未开始' ? '#e44d66': '#aaa' }">
				<text class="title-text">{{item.status}}</text>
			</view>
		</view>
		<view class="u-head">
			<text class="list_item_black_title_base space_title">{{item.title}}</text>
			<text class="list_item_normal_txt">{{startTime(item.time)}}</text>
		</view>
	</view>
</template>

<script>
	import moment from 'moment';
	export default {
		data() {
			return {
				
			};
		},
		props: {
			item: {
				type: Object
			}
		},
		methods:{
			startTime(time) {
				return moment(time).format('YYYY-MM-DD HH:mm:ss');
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/common.scss';
	.live_item{
		margin-bottom: $space-base;
		background-color: $whiteColor;
		padding: $space-lg $space-base;
	}
	.banner-img {
		height: 350upx;
	}
	.banner {
		position: relative;
		flex: 1;
		@extend .banner-img;
	}
	
	.title-area {
		position: absolute;
		right: 0upx;
		top: 0upx;
		width: 126upx;
		height: 56upx;
		background-color: #aaa;
		z-index: 11;
		align-items: center;
		justify-content: center;
		display: flex;
	}
	.title-text {
		font-size: 26upx;
		line-height: 56upx;
		color: #ffffff;
	}
	.u-head{
		@include flex-center(column, $align: flex-start);
		// min-height: 100upx;
	}
	.space_title{
		margin: $space-base 0;
	}
	// .u-head_title{
	// 	color: $uni-text-color;
	// 	font-size: $middle-font;
	// 	line-height: 52upx;
	// }
	.u-head_time {
		color:$whiteTextColor;
		font-size: 20upx;
	}
</style>
