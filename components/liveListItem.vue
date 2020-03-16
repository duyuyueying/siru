<template>
	<view class="list_container ">
		<view class="icon_wrapper">
			<image class="image-list1" src="../../static/temp/avatar.jpeg"></image>
		</view>
		<view class="content_wapper">
			<text class="title_txt">{{title}}</text>
			<text class="txt">{{content}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			title: String,
			content: String,
			icon_name: String,
		}
	}
</script>

<style lang="scss">
@import '@/common/common.scss';
.list_container{
	@include flexRow;
	background-color: #fff;
	
}
.icon_wrapper {
	width: 80upx;
	padding-top: 20upx;
}
.image-list1{
	width: 50upx;
	height: 50upx;
}
.content_wapper{
	border-width: 0upx;
	border-bottom-width: 2upx;
	border-color: #f9f9f9;
	border-style: solid;
	flex: 1;
	padding: 20upx 0upx;
}
.title_txt {
	color: #858585;
	font-size: 24upx;
}
.txt{
	color: #000000;
	font-size: 30upx;
}
</style>
