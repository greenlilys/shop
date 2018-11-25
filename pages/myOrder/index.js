var config = require('../../config');
var appInstance = getApp();

Page({
	data: {
		windowWidth: 0,
		windowHeight: 0,		
		currentTab: 0,// tab切换
        orderLists:[//订单列表数据
        ],
        type:null,
        page: 0,
        noMore:false,//是否有更多
	},
	onLoad: function (options) {
		var that = this;
		that.setData({
			currentTab: options.currentTab ? options.currentTab : 0 ,
			type: options.type ? options.type : "all"
		});
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					windowWidth: res.windowWidth,
					windowHeight: res.windowHeight
				});
			}
		});

        this.getOrderList();
	},
    /**
     * 获取订单
     *
     * @param param
     */
    getOrderList: function(param){
        var self = this,
            param = param || {},
            data = {
                page: param.page || this.data.page,
                pageSize: param.pageSize || 15,
                type: param.type || this.data.type
            };


        appInstance.sendRequest({
            url:config.orderListUrl,
            method: 'POST',
            data:data,
            success: function(res){
                var data = {},orders = res.data.orderList.data;
                data['pages'] = self.data.page + 1;
                data['noMore'] = res.data.orderList.last_page == res.data.orderList.current_page  ? true : false;
                if(param.scrollLoad){
                    orders = self.data.orderLists.concat(orders);
                }
                data['orderLists'] = orders;
                self.setData(data);
            }
        });
    },
    /**
     *
     * switch tab
     *
     * @param e
     */
    clickOrderTab: function(e){
        var data = {},
            dataset = e.target.dataset,
            index = dataset.index;

        data.currentTab = index;
        data['page'] = 0;
        data['orderLists'] = [];
        data['noMore'] = false;
        if(dataset.type){
            data.type = dataset.type;
        }

        this.setData(data);
		console.log(data);
		console.log(this.data);
        this.getOrderList({tabIndex:index});
    },

    /**
     * 取消订单
     *
     * @param e
     */
    cancelOrder: function(e){
        var orderId = e.target.dataset.id,
            franchisee = e.target.dataset.franchisee,
            subShopId = franchisee == app.getAppId() ? '' : franchisee,
            that = this;

        app.showModal({
            content: '确定要取消订单？',
            showCancel: true,
            cancelText: '否',
            confirmText: '确定',
            confirm: function(){
                app.sendRequest({
                    url: '/index.php?r=AppShop/cancelOrder',
                    data: {
                        order_id: orderId,
                        sub_shop_app_id: subShopId
                    },
                    success: function(res){
                        var index = that.data.currentTabIndex,
                            data = {};

                        data['pages'] = 1;
                        that.setData(data);
                        that.getOrderList({tabIndex : index});
                    }
                })
            }
        })
    },
	//确认收货
	recOrder: function (e) {
		var that = this;
		var orderId = e.currentTarget.dataset.orderId;
		app.showModal({
			title: '提示',
			content: '你确定已收到宝贝吗？',
			success: function (res) {
				res.confirm && app.sendRequest({
					url: "",
					method: 'POST',
					data: {
						id: orderId,
						type: 'receive',
					},				
					success: function (res) {					
						if (res.data.success) {
							wx.showToast({
								title: '操作成功！',
								duration: 2000
							});
							that.loadOrderList();
						} else {
							wx.showToast({
								title: res.data.err,
								duration: 2000
							});
						}
					},
					fail: function () {
						// fail
						wx.showToast({
							title: '网络异常！',
							duration: 2000
						});
					}
				});

			}
		});
	},

    /**
     * 确定要申请退款
     *
     * @param e
     */
    applyDrawback: function(e){
        var orderId = e.target.dataset.id,
            franchisee = e.target.dataset.franchisee,
            subShopId = franchisee == app.getAppId() ? '' : franchisee,
            that = this;

        app.showModal({
            content: '确定要申请退款？',
            showCancel: true,
            cancelText: '取消',
            confirmText: '确定',
            confirm: function(){
                app.sendRequest({
                    url: '/index.php?r=AppShop/applyRefund',
                    data: {
                        order_id: orderId,
                        sub_shop_app_id: subShopId
                    },
                    success: function(res){
                        var index = that.data.currentTabIndex,
                            data = {};

                        data['pages'] = 1;
                        that.setData(data);
                        that.getOrderList({tabIndex : index});
                    }
                })
            }
        })
    },
	bindChange: function (e) {

		var that = this;
		that.setData({ currentTab: e.detail.current });

	},

	swichNav: function (e) {

		var that = this;

		if (that.data.currentTab === e.target.dataset.current) {
			return false;
		} else {
			that.setData({
				currentTab: e.target.dataset.current,
				isStatus: e.target.dataset.otype,
			});
			//没有数据就进行加载
			switch (that.data.currentTab) {
				case 0:
					!that.data.orderList0.length && that.loadOrderList();
					break;
				case 1:
					!that.data.orderList1.length && that.loadOrderList();
					break;
				case 2:
					!that.data.orderList2.length && that.loadOrderList();
					break;
				case 3:
					!that.data.orderList3.length && that.loadOrderList();
					break;
				case 4:
					that.data.orderList4.length = 0;
					that.loadReturnOrderList();
					break;
			}
		}
	},
    /**
     * 确认收货
     *
     * @param e
     */
    sureReceipt: function(e){
        var orderId = e.target.dataset.id,
            franchisee = e.target.dataset.franchisee,
            subShopId = franchisee == app.getAppId() ? '' : franchisee,
            that = this;

        app.showModal({
            content: '确定已收到货物？',
            showCancel: true,
            cancelText: '取消',
            confirmText: '确定',
            confirm: function(){
                app.sendRequest({
                    url: '/index.php?r=AppShop/comfirmOrder',
                    data: {
                        order_id: orderId,
                        sub_shop_app_id: subShopId
                    },
                    success: function(res){
                        var index = that.data.currentTabIndex,
                            data = {};

                        data['pages'] = 1;
                        that.setData(data);
                        that.getOrderList({tabIndex : index});
                    }
                })
            }
        })
    },
    /**
     * 评论
     *
     * @param e
     */
    makeComment: function(e){
        var orderId = e.target.dataset.id,
            franchiseeId = e.target.dataset.franchisee,
            queryStr = franchiseeId === app.getAppId() ? '' : '&franchisee='+franchiseeId;
        app.turnToPage('/pages/makeComment/makeComment?detail='+orderId+queryStr);
    },
    /**
     * 下拉
     */
    scrollToListBottom: function(){
        var currentTabIndex = this.data.currentTabIndex;
        if(this.data.noMore){
            return;
        }
        this.getOrderList({
            tabIndex: currentTabIndex,
            scrollLoad: true
        });
    }
}) 