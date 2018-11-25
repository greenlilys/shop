const config = require('../../config');
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
    data: {
        promptType:'success',
        payment:'支付成功',
        price:'100',
        orderId:null,
        type:null,
        result:null,
    },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        this.setData(options);
    },
    getPaymentResult:function(){
        var self = this,orderId = this.options.orderId,type=this.options.type;
        if(orderId && type){
            appInstance.sendRequest({
                url:config.paymentResultUrl,
                data:{orderId:orderId,type:type},
                success:function(res){
                    if(res.data.status == 'success'){
                        var result = res.data.result,
                            title ="订单支付",
                            promptType='success',
                            payment="支付成功！";
                        if(type === 'recharge'){
                            title ='充值支付';
                        }
                        if(result.status === 0){
                            payment ="支付失败！";
                            promptType='warn';
                        }
                        appInstance.setPageTitle(title);
                        self.setData({result:result,promptType:promptType,payment:payment});
                    }
                }
            });
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
      this.getPaymentResult();
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