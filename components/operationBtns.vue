<template>
	<view class="flex_row operation_wrapper">
		<view @click="doGood" class="btn_item"><icons type="chartUp" :color="goodFlag && upTheme != null  ? upTheme.txt : '#a0a0a0' "></icons><text class="txt" :style="{color:goodFlag && upTheme != null  ? upTheme.txt : '#a0a0a0' }">利好  {{goodCount}}</text></view>
		<view @click="doBad" class="btn_item"><icons type="chartDown" :color="badFlag && downTheme != null  ? downTheme.txt : '#a0a0a0'"></icons><text class="txt" :style="{color:badFlag && downTheme != null  ? downTheme.txt : '#a0a0a0' }">利空  {{badCount}}</text></view>
		<view @click="doCommet" class="btn_item"><icons type="commet" color="#a0a0a0"></icons><text class="txt">评论  {{commentCount}}</text></view>
		<view @click="doShare" class="btn_item"><icons type="share" color="#a0a0a0"></icons><text class="txt">分享</text></view>
	</view>
</template>

<script>
	import icons from '@/components/icons.vue';
	import {color} from '@/common/util.js';
	export default {
		data() {
			return {
				goodFlag: false,
				badFlag: false,
				upTheme: null,
				downTheme: null
			}
		},
		props: {
			goodCount: Number,
			badCount: Number,
			commentCount: Number,
			id: Number,
		},
		mixins:[color],
		components:{
			icons,
		},
		created(){
			this.upTheme = this.color(1,2);
			this.downTheme = this.color(2,1);
		},
		methods: {
			// 利好
			doGood(){
				this.goodFlag = !this.goodFlag;
				if(this.goodFlag) {
					this.goodCount++;
				} else {
					this.goodCount--;
				}
			},
			// 利空
			doBad(){
				this.badFlag = !this.badFlag;
				if(this.badFlag) {
					this.badCount++;
				} else {
					this.badCount;
				}
			},
			doCommet() {
				this.$emit('gotoCommet');
			},
			doShare() {
				console.log('xxx');
				this.$emit('share');
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/common.scss';
	.operation_wrapper{
		padding: 20upx;
		background-color: #fff;
		align-items: center;
	}
	.btn_item{
		flex-direction: row;
		flex:1;
		align-items: center;
		justify-content: center;
		padding: $space-sm 0;
	}
	.txt{
		@include txt;
		margin-left: 5upx;
	}
</style>
