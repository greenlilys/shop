var config = require('../../config');
const appInstance = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo:{}
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
            url: config.userCenterInfo,
            success:function(res){
                if(res.data.status == "success"){
                    self.setData({
                        'userInfo': res.data.userInfo
                    });
                    console.log(self.data);
                }else{
                    if(res.data.type || res.data.type === "system_error"){
                        appInstance.turnToPage("/pages/error/index");
                        return;
                    }
                }

            },
            fail:function(res){

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