import Vue from 'vue'
import App from './App'
import store from './store/index';

Vue.config.productionTip = false

Vue.prototype.$host = 'https://unidemo.dcloud.net.cn/';

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
