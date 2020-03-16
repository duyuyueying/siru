const TAB_INDEX = 'TAB_INDEX'; // 记录首页的tabIndex
const SEARCH_TAB_INDEX = 'SEARCH_TAB_INDEX'; // search页面tabIndex

export default {
	[TAB_INDEX](state, tabIndex) {
		state.tabIndex = tabIndex;
	},
	[SEARCH_TAB_INDEX](state, searchTabIndex) {
		state.searchTabIndex = searchTabIndex;
	}
}