const config = require('../../config');
const appInstance = getApp();
const MONEY_PATTERN = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		account: {
			balance:'100'
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
	
	},
    getUserInfo:function(){
        var self = this;

        appInstance.sendRequest({
            url:config.userBaseInfo,
            success:function(res){
                if(res.data.status == 'success'){
                    self.setData({
                        'account.balance':res.data.result.residue_money
                    });
                }
            }
        });
    },
	/**获得输入金额 */
	getMoney:function(e){		
		this.setData({
			inputMoney: e.detail.value
		})
	},
    formSubmit:function(e){
        var inputMoney = e.detail.value.money;
        if(MONEY_PATTERN.test(inputMoney) && Number(inputMoney) > 0){
            appInstance.sendRequest({
                url:config.submitRechargeUrl,
                method:'POST',
                data:{
                    money:inputMoney
                },
                success:function(res){
                    if(res.data.status == "success"){
                        var orderId = res.data.orderId;
                        if(res.data.code == 'toPay'){
                            var params = res.data.payInfo;
                            params.orderId = orderId;
                            params.type = 'recharge';
                            appInstance.wxPay(params);
                        }
                    }
                },
                fail:function(res){
                    console.log(res);
                }
            });
        }else{
            appInstance.showToast({
                title:'请输入正确要充入金额!',
                icon:'warn'
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
        this.getUserInfo();
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