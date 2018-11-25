
const config = require('../../config');
const appInstance = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: {},
		memberGrade:'一级',//会员等级
		Referee:'总店',//推荐人
		contralPage:'distributor',//根据这个标记判断需要显示的页面类型
		disData: {
			totalCommission: 1000,//累计佣金
			withdrawCash: 200,//可提现佣金
			distributionCommission: 100,//分销佣金
			distributionOrder: 6,//分销订单
			myTeam: "3",//我得团队
			meconsumer: "10"//我的客户

		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var self = this;
        self.getDistributorData();
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
		//如果页面是提示填写信息，执行自动跳转
		var contralPage = this.data.contralPage;
		if (contralPage == 'fillInfomation'){
			setTimeout(function () {
				wx.navigateTo({
					url: '/pages/infor/index'
				})
			}, 2000)
		};
		//如果类面类型是分销商页面，请求获取分销商相关数据
		appInstance.sendRequest({

		})
		
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

	},
    getDistributorData: function(){
        var self = this;
        appInstance.sendRequest({
            url:config.distributorUrl,
            success:function(res){
                if(res.data.status === "success"){
                    self.setData({
                        userInfo:res.data.userInfo
                    })
                }
            }
        });
    }
})