var config = require('../../config');
const appInstance = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {		
		page: -1,
		checkedItem:[],
        goodList:[],
		isHideLoadMore: true,
		dixian: true

	},
	checkboxChange: function (e) {  		
		this.setData({ checkedItem: e.detail.value});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.getSystemInfo(
			
		)
        this.getNextPageProducts();		
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},
	//下拉刷新
	onPullDownRefresh: function () {
		wx.showNavigationBarLoading() ;//在标题栏中显示加载
		//模拟加载
		setTimeout(function () {
			// complete
			wx.hideNavigationBarLoading() //完成停止加载
			wx.stopPullDownRefresh() //停止下拉刷新
		}, 1500);
	},
    /**
     * 下一页产品数据
     */
	getNextPageProducts:function(){
        var self = this;
        appInstance.sendRequest({
            url: config.userProductHistory+"?page="+(++self.data.page),
            data:{action:'list'},
            success:function(res){
                if(res.data.length == 0){
                    wx.hideLoading();
					self.setData({
                        dixian: false,
                        isHideLoadMore: true,
                    });
                    return;
                }
                self.setData({
                    goodList: self.data.goodList.concat(res.data)
                });
                wx.hideLoading();
                self.setData({
                    isHideLoadMore: false,
                })

            },
            fail:function(res){
                console.log(res);
                console.log('11')
            }
        });
    },
	//上拉加载
	onReachBottom: function () {
		var that = this;
		var dixian = that.data.dixian;
		if (dixian) {
			that.setData({
				isHideLoadMore: false,
			});
			appInstance.sendRequest({
				url: config.userProductHistory + "?page=" + (++that.data.page),
				success: function (res) {
					console.log(res.data);
					if (res.data.length == 0) {
						//wx.hideLoading();
						that.setData({
							dixian: false,
							isHideLoadMore: true,
						});
						return;
					}
					that.setData({
						goodList: that.data.goodList.concat(res.data)
					});
					//wx.hideLoading();
					that.setData({
						isHideLoadMore: true,
					})
				},
				fail: function (res) {
					console.log(res);
					console.log('11')
				}
			});
		}

	},

	/**删除足迹 */
	removeFoot: function (e) {
		var that = this;
		if (that.data.checkedItem.length) {
			wx.showModal({
				title: '提示',
				content: '你确认移除吗',
				success: function (res) {
					res.confirm && appInstance.sendRequest({
						url: config.userProductHistory,
						method: 'POST',
						data: {
							action: 'delete',
							productIds: that.data.checkedItem.join(','),
						},
						success: function (res) {
							console.log(res);
							if (res.data.status == 'success') {
								var checkedItem = that.data.checkedItem;
								var goodList = that.data.goodList;
								for (var i = 0; i < checkedItem.length; i++) {
									for (var j = 0; j < goodList.length; j++) {
										if (checkedItem[i] == goodList[j].id) {
											goodList.splice(j, 1);
										};
									
									}
								};
								that.setData({
									goodList: goodList
								})
							}
						},
					});
				},
				fail: function (res) {
					console.log(res);
				}
			});
		} else {
			appInstance.showToast({
				title: '未选中商品',
				icon: 'loading'
			})
		}
	},
})