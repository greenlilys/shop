// pages/distributorMyTeam/index.js
var config = require('../../config');
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  personList:[
		  {
			  niName:'angus',
			  data:'2018-10-5',
			  num:'5'
		  },
		  {
			  niName: 'angus',
			  data: '2018-10-5'
		  },
		  {
			  niName: 'angus',
			  data: '2018-10-5'
		  },
		  {
			  niName: 'angus',
			  data: '2018-10-5'
		  },
		  {
			  niName: 'angus',
			  data: '2018-10-5'
		  },
		  {
			  niName: 'angus',
			  data: '2018-10-5'
		  }
	  ],
	  tapBun:'3',
	  ranks:"rank-three",	  
	  leavlBtn:[
		  {
			  backgroundContral:"orange",
			  classLeavl:"一级(1)",

		  },
		  {
			  backgroundContral: "gray",
			  classLeavl: "一级(2)",

		  },
		  {
			  backgroundContral: "gray",
			  classLeavl: "一级(3)",

		  }
	  ],
	  isHideLoadMore: true,
	  dixian: true,
	  page:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  //this.loadPersonData();

  },
    /**选项卡切换 */
  clickBtn: function (e) {
	  console.log(e)
	  var leavlBtn = this.data.leavlBtn;
	  var num = e.currentTarget.dataset.currentbtn;
	  for (var i = 0; i < leavlBtn.length;i++){
		  leavlBtn[i].backgroundContral = "gray"
	  }
	  leavlBtn[num].backgroundContral = "orange";	  
	  this.setData({
		  leavlBtn: leavlBtn
	  });
	  //this.updatePerson();//更新数据

  },

  /**初始化数据 */
  loadPersonData: function () {
	  var self = this;
	  appInstance.sendRequest({
		  url: '',
		  data: {

		  },
		  success: function (res) {
			  if (res.data.status == 'success') {
				  self.setData({
					//判断团队级别1或2或3  赋值级别数给 tapBun 根据tapBun设置leavlBtn ranks
					//更新personList
				  });
			  }
		  },
	  });
  },
  /**更新数据 */
  updatePerson: function () {
	  var self = this;
	  appInstance.sendRequest({
		  url: '',
		  data: {

		  },
		  success: function (res) {
			  if (res.data.status == 'success') {
				  self.setData({					  
					  //更新personList
				  });
			  }
		  },
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
			  url: '',
			  success: function (res) {
				  console.log(res.data);
				  if (res.data.length == 0) {
					  
					  that.setData({
						  dixian: false,
						  isHideLoadMore: true,
					  });
					  return;
				  }
				  that.setData({
					  personList: that.data.personList.concat(res.data)
				  });
				
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
  //下拉刷新
  onPullDownRefresh: function () {	 
	  wx.showNavigationBarLoading();//在标题栏中显示加载
	  //模拟加载
	  setTimeout(function () {
		  // complete
		  wx.hideNavigationBarLoading() //完成停止加载
		  wx.stopPullDownRefresh() //停止下拉刷新
	  }, 1500);
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