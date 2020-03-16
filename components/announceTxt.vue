<template>
	<view class="announce_wrapper">
		<text class="txt">{{helper.announce2}}</text>
	</view>
</template>

<script>
	import {detailText} from  '@/common/config.js';
	export default {
		data() {
			return {
				helper: detailText 
			};
		}
	}
</script>

<style lang="scss">
@import '@/common/common.scss';
.announce_wrapper{
	margin-top: 10upx;
	padding: 10upx 30upx;
}
.txt{
	@include txt;
}
</style>
