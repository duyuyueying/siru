<template>
	<view style="flex: 1;">
		<scroll-view ref="tabbar1" scroll-x="true" class="nav" scroll-with-animation :show-scrollbar="false">
			<view class="cu-item" v-for="(item,index) in navbar" :ref="'tabitem'+index" :key="index" @tap="ontabtap(index)" :data-id="index">
				<text class="cu-item-txt" :class="index==tabIndex?'cu-item-txt_curr':''">{{item.name}}</text>
				<text v-if="item.icon_name">fire</text>
			</view>
		</scroll-view>
		<swiper class="tab-box" ref="swiper1" :current="tabIndex" :duration="300" @change="onswiperchange" @transition="onswiperscroll"
		 @animationfinish="animationfinish">
			<slot></slot>
		 </swiper>
	</view>
	
</template>

<script>
	// #ifdef APP-PLUS
	const dom = weex.requireModule('dom');
	// #endif
	import {mapState, mapMutations} from 'vuex';
	const TAB_PRELOAD_OFFSET = 1;
	export default {
		data(){
			return {
				tabIndex: 0, // 当前tab
				isTap: false, // 防止重复触发scroll事件的flag
			}
		},
		props: {
			navbar: {
				type: Array,
				default: function(e) {
					return []
				}
			},
			defaultIndex: Number, 
		},
		created() {
			
			console.log(this.defaultIndex);
		},
		mounted() {
			this.swiperWidth = 0;
			this.tabListSize = {};
			this._touchTabIndex = 0;
			this._lastTabIndex = 0;
			if(this.defaultIndex) {
				this.tabIndex = this.defaultIndex
			}
			this.getTabbarItemsSize();
			// dom渲染完成后，操作子元素回调
			this.$nextTick(()=>{
				this.$emit('init');
			})
			
		},
		methods:{
			ontabtap(index) {
				this.changeTab(index);
				this.$emit('tab-tap', index);
			},
			changeTab(index) {
				this.tabIndex = index;
				this.scrollTabTo(index);
			},
			// 滚动到相应的位置
			scrollTabTo(index) {
				const el = this.$refs['tabitem' + index][0];
				let offset = 0;
				// TODO fix ios offset
				if (index > 0) {
					offset = this.tabbarWidth / 2 - this.tabListSize[index].width / 2;
					if (this.tabListSize[index].right < this.tabbarWidth / 2) {
						offset = this.tabListSize[0].width;
					}
				}
				dom.scrollToElement(el, {
					offset: -offset
				});
			},
			// 获取swiper的宽度，和每一个tabItem的boundingClientRect信息
			getTabbarItemsSize() {
				// #ifdef APP-NVUE
				dom.getComponentRect(this.$refs.tabbar1, res => {
					this.tabbarWidth = res.size.width;
				});
				dom.getComponentRect(this.$refs['swiper1'], res => {
					this.swiperWidth = res.size.width;
				});
				for (var i = 0; i < this.navbar.length; i++) {
					this.getElementSize(dom, this.$refs['tabitem' + i][0], i);
				}
				// #endif
				// #ifdef MP-WEIXIN || H5 || MP-QQ
				uni.createSelectorQuery().in(this).select('.tab-box').fields({
					dataset: true,
					size: true,
				}, (res) => {
					this.swiperWidth = res.width;
				}).exec();
				uni.createSelectorQuery().in(this).selectAll('.cu-item').boundingClientRect((rects) => {
					rects.forEach((rect) => {
						this.tabListSize[rect.dataset.id] = rect;
					})
				}).exec();
				// #endif
			},
			getElementSize(dom, ref, id) {
				dom.getComponentRect(ref, res => {
					this.tabListSize[id] = res.size;
				});
			},
			onswiperchange(e) {
				// 注意：百度小程序会触发2次
				// #ifndef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
				let index = e.target.current || e.detail.current;
				this.switchTab(index);
				// #endif
			},
			onswiperscroll(e) {
				if (this.isTap) {
					return;
				}
				var offsetX = e.detail.dx;
				var preloadIndex = this._lastTabIndex;
				if (offsetX > TAB_PRELOAD_OFFSET) {
					preloadIndex++;
				} else if (offsetX < -TAB_PRELOAD_OFFSET) {
					preloadIndex--;
				}
				if (preloadIndex === this._lastTabIndex || preloadIndex < 0) {
					return;
				}
				this.$emit('changeTab', preloadIndex);
				// #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
				var percentage = Math.abs(this.swiperWidth / offsetX);
				var currentSize = this.tabListSize[this._lastTabIndex];
				var preloadSize = this.tabListSize[preloadIndex];
				var lineL = currentSize.left + (preloadSize.left - currentSize.left) / percentage;
				var lineW = currentSize.width + (preloadSize.width - currentSize.width) / percentage;
				// #endif
			},
			animationfinish(e) {
				// #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
				let index = e.detail.current;
				if (this._touchTabIndex === index) {
					this.isTap = false;
				}
				this._lastTabIndex = index;
				this.switchTab(index);
				// #endif
			},
			// 加载pagelist的第一页数据，并将index的tab设置为当前选中的tab，对缓存的tab做相应的操作
			switchTab(index) {
				this.$emit('changeTab', index);
				if (this.tabIndex === index) {
					return;
				}
				this.changeTab(index);
			},
			
		},
	}
</script>

<style lang="scss">
	@import '@/common/common.scss';
	.nav{
		height: 60upx;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		background-color: #fffff;
	}
	.cu-item{
		padding: 0 20upx;
		display: inline-block;
		height: 70upx;
	}
	.cu-item-txt{
		font-size: 32upx;
		color: #777;
		
		line-height: 70upx;
	}
	.cu-item-txt_curr{
		font-size: 34upx;
		color: $mainColor;
	}
	.tab-box {
		flex: 1;
	}
	.swiper-item {
		flex: 1;
		flex-direction: column;
	}
</style>
