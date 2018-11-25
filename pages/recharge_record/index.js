// pages/recharge_record/index.js
var config = require('../../config');
const appInstance = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
	  listData:[
	  ],
      page:1,
      noMore:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /*请求数据 */
  loadOrderList:function(params){
	var self = this,params = params || {};
    if(!this.data.noMore){
        appInstance.sendRequest({
            url:config.rechargeUrl,
            data:{page:self.data.page},
            success:function(res){
                if(res.data.status === "success"){
                    var listData = res.data.listData;
                    if(params.scollLoaded){
                        listData = self.data.listData.concat(listData);
                        self.setData({
                            noMore:res.data.noMore
                        });
                    }
                    self.setData({
                        page: ++self.data.page,
                        listData:listData,
                    });
                }
            },
            fail:function(){

            }
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
      this.loadOrderList();
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
      this.loadOrderList({scollLoaded:true});
  },

});