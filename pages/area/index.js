// pages/area/index.js
const appInstance = getApp();
var config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  type:"news",
	  page:1,
	  products: [],
	  isHideLoadMore: true,	  
      noMore:false,
	  windowHeight:'',
	  windowWidth:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  var self = this;
	  self.setData({
		  type: options.type
	  });
	  wx.getSystemInfo({
		  success: function (res) {
			  self.setData({
				  windowHeight: res.windowHeight,
				  windowWidth: res.windowWidth
			  });

		  }
	  });
     
	  self.getProductList();
  },
  /*请求数据 */
  getProductList: function (params) {
	  var self = this;
      params = params || {};
	  self.setData({
		  isHideLoadMore:false
	  });
      appInstance.sendRequest({
		  url: config.areaProductUrl,
		  data: {			  
			  type: self.data.type,
			  page: self.data.page,
		  },
		  success: function (res) {
              if(res.data.status == "success"){
				  self.setData({
					  isHideLoadMore: true
				  });
                  var data = {},list = res.data.list;
				  if(res.data.list.length == 0){
					  self.setData({
						  dixian: false
					  });
				  }
                  if(params.scrollLoad){
                      list = self.data.products.concat(list);
                  }
                  appInstance.setPageTitle(res.data.title);
                  data['products'] = list;
                  data['page'] = self.data.page + 1;
                  data['noMore'] = res.data.noMore;
				  console.log(res)
                  self.setData(data);
              }
		  },
		  fail: function () {			
              appInstance.showToast({
				  title: '网络异常！',
				  duration: 2000
			  });
		  },

	  })
  },
  lower:function(){
	 if(!this.data.noMore) {
		 this.getProductList({ scrollLoad: true });	
	 }	  
  },
  //下拉刷新
  onPullDownRefresh: function () {
	  wx.showNavigationBarLoading() //在标题栏中显示加载

	  //模拟加载
	  setTimeout(function () {
		  // complete
		  wx.hideNavigationBarLoading() //完成停止加载
		  wx.stopPullDownRefresh() //停止下拉刷新
	  }, 1500);
  },
  //上拉加载
  onReachBottom: function (){	  
	 
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
	  if(!this.data.noMore){
		  this.getProductList({ scrollLoad: true });
	  }
   
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