<template>
    <view class="list_item_wrap" @click="click">
		<navigator url="../author/author" class="link_wrapper" hover-class="navigator-hover">
			<view class="img_wrapper">
				<image class="image-list1" src="../../static/temp/avatar.jpeg"></image>
				<view class="icon_v" :style="{backgroundColor: identification != null ? identification.color: '#ccc'}"><text style="color:#fff;font-size: 20upx;">v</text></view>
			</view>
			<view class="content_wrapper">
				<view class="flex_row">
					<text class="list_item_black_title_sm">{{item&&item.name}}</text>
					<text class="list_item_normal_txt" v-if="showIdentification && identification != null" :style="{color:identification != null ? identification.color: '#ccc'}">{{identification.name}}</text>
				</view>
				<slot></slot>
				<text class="list_item_normal_txt" v-if="showDetail">{{item.description}}</text>
			</view>
			<view class="btn_wrapper">
				<view  @tap.stop="focus" class="button" :class="{isFocus: item.isFocus}"><text class="btn_txt" :style="{color: item.isFocus? '#999' :'#f39700' }">{{item.isFocus ? '已关注' : '+  关注'}}</text></view>
			</view>
		</navigator>
    </view>
</template>

<script>
	import  {identification} from '@/common/config.js'
    export default {
		data() {
			return {
				identification: null,
			}
		},
        props: {
            item: Object,
			// 分割线
			showLine: {
				type: Boolean,
				default: false
			},
			// 认证
			showIdentification: {
				type: Boolean,
				default: false,
			},
			// 描述
			showDetail: {
				type: Boolean,
				default: false
			},
			
        },
		mounted() {
			// 这里需要根据接口返回来的关注人的列表判断当前这个人是否被关注过
			this.isFocus = false;
				
			console.log(this.showIdentification,this.item,this.showLine, );
			// console.log(this);
		},
        methods: {
            focus() {
               this.$emit(this.item.id);
            }
        },
		watch:{
			item(data) {
				if(this.showIdentification) {
					this.identification = identification[this.item.identification];
				}
				console.log('xxx',this.identification);
			}
		}
    }
</script>

<style scoped lang="scss">
	@import '../../common/common.scss';
    
	.link_wrapper{
		display: flex;
		flex-direction: row;
		// flex-wrap: wrap;
	}
	// .navigator-hover{
	// 	background-color: #fff;
	// }
	.flex_row{
		display: flex;
		flex-direction: row;
	}
	.img_wrapper {
		width: 80upx;
		height: 80upx;
		margin-right: 15upx;
		position: relative;
		z-index: 10;
		
	}
	.image-list1 {
	    @include circle(80upx);
	}
	.icon_v{
		@include circle(24upx);
		@include center;
		font-size: 16upx;
		color: #fff;
		position: absolute;
		bottom: 0upx;
		right: 0upx;
		z-index: 11;
		background-color: $mainColor;
	}
	.content_wrapper{
		// flex: 1;
		width: 440upx;
		// margin-right: 70upx;
		flex-direction: column;
		justify-content: space-between;
		
	}
	.info-text {
	    margin-right: 20upx;
	    color: #868e96;
	    font-size: 24upx;
		@include more_line_ellipsis(1);
	}
	.title_txt{
		color: #000;
	}
	.btn_wrapper{
		width: 140upx;
		justify-content: center;
	}
	.button {
		background-color: #fff2bb;
		padding: 0;
		border: 0;
		width: 140upx;
		height: 55upx;
		border-radius: 0;
		
	}
	.btn_txt{
		color: #f39700;
		font-size: 24upx;
		text-align: center;
		line-height: 55upx;
	}
	.isFocus{
		background-color: #eee;
		color: #999;
	}
	
</style>
