const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		commission:'200000',//可提现佣金,
		commissioned:'200',//成功提现佣金
		totalCommission:'1200',//累计佣金
		applyCommission:'300',//已申请佣金
		passCommission: '100',//待打款佣金
		frozenCommission:'100',//未结算佣金
		someDay:'3',//几天后可以提现
		getMoney:'10',//佣金提现最低额度
		buttonColor:'#CC3431'

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},
	/**初始化数据 */
	loadCommissionData: function () {
		var self = this;
		appInstance.sendRequest({
			url: '',
			data: {

			},
			success: function (res) {
				if (res.data.status == 'success') {
					self.setData({

					});
				}
			},
		});
	},
	/**提现 */
	getOutMoney:function(){
		var commission = this.data.commission;
		//可提现佣金大于10元  发起提现 否则提示用户
		if (commission > 10){

		}else{
			app.showToast({
				title:'无法提现',
				icon:'loading'
			})
		}
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

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})