<template>
	<view>
		<text>我的政策</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:''
			}
		},
		onLoad(e){
			this.type = e.type;
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.txt{
		@include txt(30upx, #000);
		line-height: 45upx;
	}
</style>
