Component({
	data: {
		active: 0,
		list: [
			{
				icon: 'chart-trending-o',
				text: '记录',
				url: '/pages/case/case'
			},
			{
				icon: 'add',
				url: '/pages/recording/recording',
			}
			,
			{
				icon: 'contact',
				text: '我',
				url: '/pages/user/user'
			}
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
