const config = require("../../config");
const appInstance = getApp();
const Util = require("../../utils/util");

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		addressList:[],
        page:1,
        noMore:false,
		firmOrder:false,//检测页面是否从订单页面跳转过来
		defaultAddressId:null,
		newAddressId:0,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			firmOrder: options.firmOrder || false
		})
		this.loadAddressData();		
	},
	/**初始化数据 */
	loadAddressData: function (params) {
		var self = this,params = params || {};	
		appInstance.sendRequest({
			url: config.myAddressUrl,
			data: {
                 action:'list',//create,delete,edit
                 page: self.data.page,
			},
			success: function (res) {
				if (res.data.status == 'success') {
                    var addressList = res.data.listData;
                    if(params.scollLoaded){
                        addressList = self.data.addressList.concat(listData);
                        self.setData({
                            noMore:res.data.noMore
                        });
                    }
                    self.setData({
                        page: ++self.data.page,
                        addressList:addressList						
                    });
				}
			},
		});
	},

	/**删除地址 */
	removeAddress: function (e) {
		var self = this,dataset = e.target.dataset,addressId = dataset.addressId;
			wx.showModal({
				title: '提示',
				content: '你确认移除吗',
				success: function (res) {
					res.confirm && appInstance.sendRequest({
						url: config.myAddressUrl,
						method: 'POST',
						data: {
							action:'delete',
                            addressId:addressId
						},
						success: function (res) {
                            self.setData({page:1});
                            self.loadAddressData();
						},
					});
				},
				fail: function (res) {
					console.log(res);
				}
			});
		
	},
		/**编辑地址 */
	editAddress:function(e){
		var addressId = e.currentTarget.dataset.addressId;
		appInstance.turnToPage('/pages/newAddre/index?addressId='+addressId)
	},
		/**设置默认地址 */
	change:function(e){
		var self = this;		
		var addressList = this.data.addressList;		
		var curType = e.currentTarget.dataset.curtype;
		var addressId = e.currentTarget.dataset.addressId;
		var index = e.currentTarget.dataset.index;
		if (curType == "1"){
			return;
		}else{
			for(var i = 0; i < addressList.length; i++){
				addressList[i].isdefault = 0;
			}
			if (addressList[index].id == addressId){
				addressList[index].isdefault = 1;
			}			
			self.setData({
				addressList: addressList
			})
		}

	},
	/**选择地址 */
	chooseAddress:function(e){
		var firmOrder = this.data.firmOrder,
            addressId = e.currentTarget.dataset.addressId;
		if (firmOrder){
			Util.OrderInfo.setData({
                addressId: addressId
            });
            Util.OrderInfo.save();
			appInstance.turnToPage('/pages/firm_order/index');
		}
		return;
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function (e) {
		this.setData({page:1});
		this.loadAddressData();
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
        this.loadAddressData({scollLoaded:true});
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})