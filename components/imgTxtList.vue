<template>
    <view class="media-item view" @click="click">
		<view class="img_wrapper">
			<image class="image-list1" src="../../static/temp/avatar.jpeg"></image>
		</view>
		<view class="content_wrapper">
			<text class="info-text title_txt">{{item&&item.name}}</text>
			<text class="info-text">{{item.position}}</text>
		</view>
    </view>
</template>

<script>
    export default {
        props: {
            item: Object,
        },
    }
</script>

<style scoped lang="scss">
	@import '@/common/common.scss';
    .media-item {
        flex: 1;
        flex-direction: row;
        justify-content: space-between;
		display: flex;
		padding: 16upx 0upx;
    }
	.img_wrapper {
		width: 80upx;
		height: 80upx;
		margin-right: 15upx;
	}
	.image-list1 {
	    @include circle(80upx);
	}
	.content_wrapper{
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
	}
	.info-text {
	    color: #868e96;
	    font-size: 24upx;
	}
	.title_txt{
		color: #000;
	}
</style>
