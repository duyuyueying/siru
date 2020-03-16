<template>
	<view class="container">
		<view class="bg_wrapper">
			<view :style="{ height: (iStatusBarHeight+44)+ 'px'}">
			  <!-- 这里是状态栏 /44的navbar-->
			</view>
		
			<view class="section">
				<text class="txt">#{{data.name}}#</text>
				<view class="btn"><text class="desc_txt">+ 关注</text></view>
			</view>
		</view>
		<view class="import_news_list_wrapper">
			<news-item :newsItem="item" v-for="(item, index) in listData" :key="index"></news-item>
		</view>
	</view>
</template>

<script>
	import {focusAuthor} from '@/mock/data.js';
	import newsItem from '@/pages/home/news-item.nvue';
	import { newItem} from '../../mock/data';
	export default {
		data() {
			return {
				data: focusAuthor,
				iStatusBarHeight: 0,
				listData: [],
			}
		},
		components:{
			newsItem
		},
		onLoad() {
			this.iStatusBarHeight  = uni.getSystemInfoSync().statusBarHeight;
			this.listData = newItem;
		}
	}
</script>

<style lang="scss">
	@import '@/common/common.scss';
	.bg_wrapper{
		height: 480upx;
		background-color: #f0f0f0;
		align-items: center;
		justify-content: center;
	}
	.txt{
		line-height: 56upx;
		@include txt(28upx, #fff);
	}
	.desc_txt{
		@include txt(28upx, #000);
		// line-height: 42upx;
		text-align: center;
	}
	.section{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 380upx;
		flex: 1;
	}
	.btn{
		width: 140upx;
		height: 56upx;
		border-radius: 30upx;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20upx;
	}
</style>
