<template>
		<view class="media-item" >
			<view class="link_wrapper" v-for="(item, index) in items" :key="index" @tap="gotoDetail">
				<view class="content_wrapper">
					<text class="list_item_black_title_base right_space_base">{{item.name}}</text>
					<text class="tag">热</text>
				</view>
				<view class="btn_wrapper">
					<text  @tap.stop="focus" :class="{isFocus}">{{isFocus ? '-' : '+'}}</text>
				</view>
			</view>
		</view>
    
</template>

<script>
    export default {
		data() {
			return {
				isFocus: false
			}
		},
        props: {
            items: {
                type: Array,
                default: function(e) {
                    return []
                }
            }
        },
		created() {
			// 这里需要根据接口返回来的关注人的列表判断当前这个人是否被关注过
			this.isFocus = false;
		},
        methods: {
            focus() {
               this.isFocus = !this.isFocus 
            },
            close(e) {
                e.stopPropagation();
                this.$emit('close');
            },
			gotoDetail() {
				uni.navigateTo({
					url: '../tagPage/tagPage'
				})
			}
        }
    }
</script>

<style scoped lang="scss">
	@import '@/common/common.scss';
    .media-item {
        flex: 1;
        flex-direction: row;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
    }
	.link_wrapper{
		display: flex;
		flex-direction: row;
		padding: 25upx;
		border-width: 1px;
		border-style: solid;
		border-color: #eee;
		border-radius: 8upx;
		margin-bottom: 30upx;
		width: 320upx;
	}
	.content_wrapper{
		flex: 1;
		flex-direction: row;
		align-items: center;
	}
	.tag {
		display: inline-block;
		background-color: $mainColor;
		color: #fff;
		font-size: 18upx;
		padding: 6upx;
	}
	.btn_wrapper{
		width: 50upx;
		align-items: flex-end;
		justify-content: center;	
	}
</style>
