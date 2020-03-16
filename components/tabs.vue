<template>
	<view class="tab_wrapper">
		<view v-for="(item, index) in tabs" :key="index" class="tab_item" @tap="choiceTab(index)">
			<text :class="{isCurr: defaultTab == index}" class="tab_txt">{{item}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tabs: {
				type: Array
			},
			defaultTab: Number
		},
		created() {
			this.currTab = this.defaultTab;
		},
		methods:{
			choiceTab(index) {
				this.$emit('changeTab', index);
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/common.scss';
	.tab_wrapper{
		@include flexRow;
		height: 80upx;
		align-items: center;
		background-color: #fff;
		border-style: solid;
		border-bottom-width: 2upx;
		border-bottom-color: #f9f9f9;
	}
	.tab_item{
		flex: 1;
		align-items: center;
	}
	.tab_txt{
		color: #333;
		font-size: 28upx;
	}
	.isCurr{
		color: $mainColor
	}
</style>
