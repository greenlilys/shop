var app = getApp()

Page({
	data: {
		totalList: [
			{
				img: "/images/test.png",
				name: '猪骨头棒新鲜生鲜肉制品猪大骨头筒骨熬汤佳品500g',
				price: 50,
				id: 0
			},
			{
				img: "/images/test.png",
				name: '猪骨头棒新鲜生鲜肉制品猪大骨头筒骨熬汤佳品500g',
				price: 50,
				id: 1
			},
			{
				img: "/images/test.png",
				name: '猪骨头棒新鲜生鲜肉制品猪大骨头筒骨熬汤佳品500g',
				price: 50,
				id: 2
			},
			{
				img: "/images/test.png",
				name: '猪骨头棒新鲜生鲜肉制品猪大骨头筒骨熬汤佳品500g',
				price: 50,
				id: 3
			},
			{
				img: "/images/test.png",
				name: '猪骨头棒新鲜生鲜肉制品猪大骨头筒骨熬汤佳品500g',
				price: 50,
				id: 4
			},
			{
				img: "/images/test.png",
				name: '猪骨头棒新鲜生鲜肉制品猪大骨头筒骨熬汤佳品500g',
				price: 50,
				id: 5
			}
		],
		winWidth: 0,
		winHeight: 0,
		// tab切换 
		currentTab: 0,
		srollHeight: 300,
	},

	onLoad: function () {
		var that = this;
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					winWidth: res.windowWidth,
					winHeight: res.windowHeight
				});
				console.log(that.data.winHeight);
			}
		});
	},
	addCart: function (e) {
		var that = this;	
		for (var i in that.data.totalList) {
			// 列表中某一项item的id == 点击事件传递过来的id。则是被点击的项  
			if (that.data.totalList[i].id == e.currentTarget.dataset.id) {
				// 给goodsList数组的当前项添加count元素，值为1，用于记录添加到购物车的数量  
				that.data.totalList[i].count = 1;
				// 获取购物车的缓存数组（没有数据，则赋予一个空数组）  
				var arr = wx.getStorageSync('cart') || [];
				// 如果购物车有数据  
				if (arr.length > 0) {
					// 遍历购物车数组  
					for (var j in arr) {
						// 判断购物车内的item的id，和事件传递过来的id，是否相等  
						if (arr[j].id == e.currentTarget.dataset.id) {
							// 相等的话，给count+1（即再次添加入购物车，数量+1）  
							arr[j].count += 1;
							// 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  
							try {
								wx.setStorageSync('cart', arr);
								app.showToast({
									title: "已加入购物车",
									icon: "success"
								})
							} catch (e) {
								console.log(e)
							};							  
							return;
						}
					}
					// 遍历完购物车后，没有对应的item项，把totalList的当前项放入购物车数组
					arr.push(that.data.totalList[i]);
				}
				// 购物车没有数据，把item项push放入当前数据（第一次存放时）  
				else {
					arr.push(that.data.totalList[i]);
				}
				// 最后，把购物车数据，存放入缓存  
				try {
					wx.setStorageSync('cart', arr);
					app.showToast({
						title: "已加入购物车",
						icon: "success"
					});
					 
					return;
				} catch (e) {
					console.log(e)
				}
			}
		};	
	},
	bindChange: function (e) {
		var that = this;
		that.setData({ currentTab: e.detail.current });
	},
	swichNav: function (e) {
		var that = this;
		if (this.data.currentTab === e.target.dataset.current) {
			return false;
		} else {
			that.setData({
				currentTab: e.target.dataset.current
			})
		}
	}
})
