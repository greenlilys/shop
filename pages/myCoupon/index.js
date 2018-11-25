// pages/coupons/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isHaveConpon: 'true',//用户是否领取有优惠卷
		couponList: [
			{
				type: 0,
				data: '2018-2-1',
				num: '1',
				id: "002",
				price: '100'
			},
			{
				type: 1,
				id: "007",
				data: '2018-2-1',
				num: '1',
				price: '0.8'
			}
		],

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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
		var self = this;
		appInstance.sendRequest({
			url: "",
			success: function (res) {
				//console.log(res);
				if (res.data.success) {
					console.log(res.data.couponList);
					self.setData({
						couponList: res.data.couponList
					})
				}
			}
		});
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

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})