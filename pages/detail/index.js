const Util = require('../../utils/util');
const config = require('../../config');
const appInstance = getApp();
var WxParse = require('../../vendor/wxParse/wxParse.js');

Page({
	data: {
		isLike: false,
		// banner
		productId:'',//商品ID
		buynum:1,//商品数量
		showModalStatus:false,//是否显示弹窗
		addCartOrBuy:"",//弹窗的确认按钮函数切换
		payUrl:'',
		indicatorDots: true, //是否显示面板指示点
		autoplay: true, //是否自动切换
		interval: 3000, //自动切换时间间隔,3s
		duration: 1000, //  滑动动画时长1s
		winWidth: 0,
		winHeight: 0,
		// tab切换 
		currentTab: 0,
        goodDetail:{

        },//产品详情
        selectModelInfo:{
            specs:[],
            specsDesc:[],
            stock:'',
            price: '',
            buyCount: 1,
            desc:'',
            modelId:''
        },
        oldModelInfo:{},//原始值
		cunid:"0"
	},
	onLoad: function (options) {
		var self = this,productId = options.id;
		wx.getSystemInfo({
			success: function (res) {
                self.setData({
					winWidth: res.windowWidth,
					winHeight: res.windowHeight
				});
			}
		});
        this.setData({"productId":productId});
	},
	onHide:function(){
		console.log('5555');
	},
	onShow:function(){
        this.loadProductDetail(this.data.productId);
	},
	onUnload: function () {
	},
	// 弹窗
	popup: function (e) {
        var dataset = e.target.dataset,buyType=dataset.buyType,
            goodDetail = this.data.goodDetail,
            self = this;
        self.setData({selectModelInfo:self.data.oldModelInfo});

        if(buyType == 'cart'){ //加入购物车
            this.setData(
                {
                    showModalStatus: true,
                    addCartOrBuy: 'addCartConfirm'
                }
            );
        }else if(buyType == 'buy'){//立急购
            if(!goodDetail.has_option){//立急购
                self.navToPay();
                return;
            }
            this.setData(
                {
                    showModalStatus: true,
                    addCartOrBuy: 'navToPay'
                }
            );
        }
        self.showPopup();
	},
    showPopup:function(){
        this._animationHandler(true);
    },
    hidePopup:function(){
        this._animationHandler(false);
    },
    _animationHandler: function(showModalStatus){
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        animation.translateY(300).step();
        this.animation = animation;
        this.setData({
            animationData: animation.export()
        });
        setTimeout(function () {
            animation.translateY(0).step();
            this.setData({
                animationData: animation.export()
            });
            this.setData({showModalStatus: showModalStatus});
        }.bind(this), 200)
    },
	// 加减
	productNum: function (e) {
        //alphaBeta类型：0减，1加
        var buynum;
		if (e.target.dataset.alphaBeta == 0) {
			if (this.data.selectModelInfo.buyCount < 2) {
				buynum = 1
			} else {
                buynum = this.data.selectModelInfo.buyCount - 1;
			};
		} else {
            buynum = this.data.selectModelInfo.buyCount + 1;
		};
		this.setData({"selectModelInfo.buyCount":buynum});
	},
	//确认立即购买
	navToPay:function(){
		var self = this;
        Util.OrderInfo.setData({
            type:'buy',
            goodIds:[self.data.productId],
            optionId: self.data.selectModelInfo.modelId,
            addressId:0,
            num:self.data.selectModelInfo.buyCount
        });
        Util.OrderInfo.save();
        appInstance.turnToPage('/pages/firm_order/index');
	},

    /**
     * 修改产品详细
     * @param res
     */
    modifyGoodDetail: function(res){
        var self = this,
            selectSpecs =[];
        if(res.data.status == 'success'){

             var goodDetail = res.data.goodDetail,
                 selectPrice,selectStock,selectModelId,
                 selectThumb=goodDetail.original_img,
                 specsDesc=[];


             if(goodDetail.has_option && goodDetail.options.length){
                 var items = goodDetail.options,price,allStock=0,i;
                 for(i=0;i<items.length;i++){
                     price = Number(items[i].product_price);
                     if(i == 0){
                         goodDetail.highPrice = price;
                         goodDetail.lowPrice = price;
                         selectPrice = price;
                         selectStock = items[0].stock;
                         selectModelId = items[0].id;
                         selectThumb = items[0].thumb ? items[0].thumb : selectThumb;
                     }else{
                         goodDetail.highPrice = parseFloat(goodDetail.highPrice > price ? goodDetail.highPrice:price).toFixed(2);
                         goodDetail.lowPrice = parseFloat(goodDetail.lowPrice  < price ? goodDetail.lowPrice : price).toFixed(2);
                     }
                     allStock += Number(items[i].stock);
                 }

                 for(var key in goodDetail.specs){
                     var spec = goodDetail.specs[key];
                     specsDesc.push(spec.items[0].title);
                     selectSpecs.push(spec.items[0].id);
                 }
             }else{
                 selectModelId = goodDetail.id;
                 selectPrice = goodDetail.current_price;
                 selectStock = goodDetail.store_count;
             }


             self.setData({
                 goodDetail:goodDetail,
                 'selectModelInfo.specs': selectSpecs,
                 'selectModelInfo.stock': selectStock,
                 'selectModelInfo.price': selectPrice,
                 'selectModelInfo.modelId': selectModelId,
                 'selectModelInfo.thumb': selectThumb,
                 'selectModelInfo.specsDesc': specsDesc,
                 'selectModelInfo.desc':specsDesc.join('、')
             });
             self.setData({oldModelInfo:this.data.selectModelInfo});
             WxParse.wxParse('productDetail', 'html', goodDetail.content, self);
        }
    },
	//确认添加到购物车
	addCartConfirm:function(e){
        var self = this,
            params = {
                action:'create',
                good_id:this.data.productId,
                option_id: this.data.selectModelInfo.modelId || 0,
                num:this.data.selectModelInfo.buyCount
            };

        appInstance.sendRequest({
            url:config.cartUrl,
            method:'POST',
            data:params,
            success: function(res){
                if(res.data.status == "success"){
                    self.popup(e);
                    appInstance.showToast({
                        title: "已加入购物车",
                        icon: "success"
                    });
                    self.hidePopup();
                    return;
                }
            }
        });
	},

	// 获取商品数据
	loadProductDetail: function (productId) {
		var self = this;
        //获取产品信息
        appInstance.sendRequest({
            url:config.productDetailUrl,
            data:{
                action:'get',
                productId:productId
            },
            success: self.modifyGoodDetail,
            error:function(res){
                appInstance.showToast({
                    title: '网络异常！',
                    duration: 2000,
                });
            }
        });

	},
	bindChange: function (e) {
		var that = this;
		that.setData({ currentTab: e.detail.current });
	},
	swichNav: function (e) {
		var that = this;
		if (this.data.currentTab === e.target.dataset.current) {
			return false;
		} else {
			that.setData({
				currentTab: e.target.dataset.current
			})
		}
	},
	//预览图片
	previewImage: function (e) {
		var current = e.target.dataset.src;

		wx.previewImage({
			current: current, // 当前显示图片的http链接  
			urls: this.data.imgUrls // 需要预览的图片http链接列表  
		})
	},
	// 收藏
	addLike:function() {
		var that =this;
		that.setData({
			isLike: !that.data.isLike
		});	
	},
	// 跳到购物车
	toCar() {
		wx.switchTab({
			url: '/pages/cart/index'
		})
	},
	// 立即购买
	immeBuy() {
		wx.showToast({
			title: '购买成功',
			icon: 'success',
			duration: 2000
		});
	},
    /**
     * 处理选择规格项
     * @param e
     */
    selectSpecItem:function(e){
        var dataset = e.target.dataset,
            specIndex = dataset.specIndex,
            specItemIndex = dataset.specItemIndex,
            specItemId = dataset.specItemId,
            specItemTitle = dataset.specItemTitle,
            data={};
        data['selectModelInfo.specs['+specIndex+']'] = specItemId;
        data['selectModelInfo.specsDesc['+specIndex+']'] = specItemTitle;

        this.setData(data);
        this.setData({'selectModelInfo.desc': this.data.selectModelInfo.specsDesc.join('、')});
        this.resetSelectCountPrice();
    },
    resetSelectCountPrice: function(){
        var selectModelIds = this.data.selectModelInfo.specs.join('-'),
            optionItems = this.data.goodDetail.options,
            data = {};

        for (var i = optionItems.length - 1; i >= 0; i--) {
            if(optionItems[i].specs == selectModelIds){
                data['selectModelInfo.stock'] = optionItems[i].stock;
                data['selectModelInfo.price'] = optionItems[i].product_price;
                data['selectModelInfo.modelId'] = optionItems[i].id;
                data['selectModelInfo.buyCount'] = 1;
                break;
            }
        }
        this.setData(data);
    },
    onUnload:function(){
        var self = this;
        if(self.data.likeAction){
            appInstance.sendRequest({
                url:config.userProductFavority,
                method:'POST',
                data:{
                    action:'changeStatus',
                    productId:self.data.productId
                },
                success:function(res){

                },
                error:function(res){
                    console.log(res);
                }
            });
        }
    },
    onHide:function(){
        console.log("onHide");
    },
    onShareAppMessage: function () {
        return {
            title: this.data.goodsDetail.title,
            path: '/pages/detail/index?id=' + this.data.goodsDetail.id,
        }
    }
})