var config = require('../../config');
const appInstance = getApp();
Page({
	data: {
		Carousels: [],
		navList: [],
		moduleList: [],
		loveShop: [],
		page: -1,
		isHideLoadMore: true,
		dixian:true,
    inputContent:null,
	},
	onLoad: function (options) {
	},
	onReady: function () {
	
	},
	/**
	* 用户点击右上角分享
	*/
	onShareAppMessage: function (e) {
		let pageRouter = this.page_router,
			pathPath = '/pages/' + pageRouter + '/' + pageRouter;
		let desc = e.target ? e.target.dataset.desc :
			appInstance.globalData.appInfo.appShareMesage || appInstance.globalData.appInfo.appTitle;

		return appInstance.shareAppMessage({
			path: pathPath,
			desc: desc
		});
	},

	onShow: function () {
		var self = this;
		appInstance.sendRequest({
		    url: config.homeInfoUrl,
		    success:function(res){
		 		if(res.data.status == "success"){
                    //console.log(res.data.data.carousels);
                    self.setData({
                        Carousels:res.data.data.carousels,
                        navList:res.data.data.topCates,
                        moduleList:res.data.data.moduleProducts
                    });
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
	onHide: function () {

	},
	onUnload: function () {


	},
    searchInput:function(e){
      console.log(e);
        this.setData({
            inputContent:e.detail.value
        })
    },
    navToArea:function(e){
      console.log(e);
		var types = e.target.dataset.type;
		wx.navigateTo({
			url: '/pages/area/index?type='+types,
		})
	},
    search: function(e){
        if(this.data.inputContent){
            wx.navigateTo({
                url: '/pages/search/index?inputContent='+this.data.inputContent+'&form=goods',
            });
        }
    },
    searchList: function () {
      if (this.data.inputContent) {
        wx.navigateTo({
          url: '/pages/search/index?inputContent=' + this.data.inputContent + '&form=goods',
        });
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
	onReachBottom: function () {
		var that = this;
		var dixian = that.data.dixian;
		if(dixian){
			that.setData({
				isHideLoadMore: false,
			});
			appInstance.sendRequest({
				url: config.guessLikeUrl + "?page=" + (++that.data.page),
				success: function (res) {
					console.log(res.data);
					if (res.data.length == 0) {
						//wx.hideLoading();
						that.setData({
							dixian: false,
							isHideLoadMore: true,
						});
						return;
					}
					that.setData({
						loveShop: that.data.loveShop.concat(res.data)
					});
					//wx.hideLoading();
					that.setData({
						isHideLoadMore: true,
					})
				},
				fail: function (res) {
					console.log(res);					
				}
			});
		}
	
	},

    /**
     * 从服务器获取产品
     */
	getProductsFromServer:function(){
        var self = this;

    }

});
