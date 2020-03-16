import moment from 'moment';
// 时间转换工具
const friendlyDate = {
	methods: {
		friendlyDate(timestamp) {
			var formats = {
				'year': '%n% 年前',
				'month': '%n% 月前',
				'day': '%n% 天前',
				'hour': '%n% 小时前',
				'minute': '%n% 分钟前',
				'second': '%n% 秒前',
			};
		
			var now = Date.now();
			var seconds = Math.floor((now - timestamp) / 1000);
			var minutes = Math.floor(seconds / 60);
			var hours = Math.floor(minutes / 60);
			var days = Math.floor(hours / 24);
			var months = Math.floor(days / 30);
			var years = Math.floor(months / 12);
		
			var diffType = '';
			var diffValue = 0;
			if (years > 0) {
				diffType = 'year';
				diffValue = years;
				return moment(timestamp).format('YYYY-MM-DD');
			} else {
				if (months > 0) {
					diffType = 'month';
					diffValue = months;
					return moment(timestamp).format('YYYY-MM-DD');
				} else {
					if (days > 0) {
						diffType = 'day';
						diffValue = days;
						return moment(timestamp).format('YYYY-MM-DD');
					} else {
						if (hours > 0) {
							diffType = 'hour';
							diffValue = hours;
						} else {
							if (minutes > 0) {
								diffType = 'minute';
								diffValue = minutes;
							} else {
								diffType = 'second';
								diffValue = seconds === 0 ? (seconds = 1) : seconds;
							}
						}
					}
				}
			}
			return formats[diffType].replace('%n%', diffValue);
		}
	}
}
// 计算币的涨跌颜色
const color = {
	methods: {
		color(start, end) {
			let colors = {
				greenUp: {txt: '#39b54a', bg: '#d7f0db'},
				greenDown: {txt: '#e54d42', bg: '#fadbd9'}
			}
			let theme = uni.getStorageSync('markTheme');
			if(!theme) {
				uni.setStorageSync('markTheme', 'greenUp');
				theme = 'greenUp'
			}
			let isUp = end - start > 0;
			if(isUp) {
				if(theme == 'greenUp'){
					return colors.greenUp
				} else {
					return colors.greenDown
				}
			} else {
				if(theme == 'greenUp'){
					return colors.greenDown
				} else {
					return colors.greenUp
				}
			}
		}
	}
}


export {
	friendlyDate,
	color
}
