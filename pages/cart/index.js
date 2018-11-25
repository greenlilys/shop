const config = require('../../config');
var Util = require('../../utils/util');
const appInstance = getApp();
Page({
	data: {
		carted:[],
		goodsList: [],//数据
		selectList: [], //选中产品数据ID
		total: 0, //总金额  
		goodsCount: 0, //数量
        editSelectAll: false,
        selectAll:false,
        editing: false,
        isFromBack: false,
		isHideLoadMore:true,
        goodsCountToPay:0,
        selectedNum:0,
        priceToPay:'0.00',
        editData:[],
	},
    onLoad: function(options){
        this.getShoppingCartData();
    },
	onShow: function () {
		// console.log(this.data.goodsList)
        if(this.data.isFromBack){
            this.getShoppingCartData();
            this.setData({
               selectAll: false,
            });
        }else{
            this.setData({
                isFromBack: true
            });
        }
	},
    reset:function(){
        this.setData({
            carted:[],
            goodsList: [],//数据
            selectList: [], //选中产品数据ID
            total: 0, //总金额
            goodsCount: 0, //数量
            editSelectAll: false,
            selectAll:false,
            editing: false,
            isFromBack: false,
            isHideLoadMore:true,
            goodsCountToPay:0,
            selectedNum:0,
            priceToPay:'0.00',
            editData:[],
        });
    },
    switchToEdit: function(){
        this.setData({
            editing: true
        })
    },
    editComplete: function(){
        var editData = this.data.editData,self = this;

        if(editData.length){
            appInstance.sendRequest({
                url:config.cartUrl,
                method:'POST',
                data:{action:'update',data:editData},
                success:function(res){
                    if(res.data.status == 'success'){
                        self.setData({
                            editing: false,
                        });
                        self.recalculateCountPrice();
                    }else{
                        appInstance.showToast({
                            title:res.data.msg
                        });
                    }

                }
            })
        }
    },
    submitCartOrder:function(){
        var goodIds = [],goodList = this.data.goodsList;
        if(this.data.editing){
            return;
        }
        for(let i in goodList){
            if(goodList[i].selected){
                goodIds.push(goodList[i].id);
            }
        }
        if(goodIds.length){
            Util.OrderInfo.setData({
                goodIds: goodIds,
                num:0,
                type:'cart',
                addressId:0
            });
            Util.OrderInfo.save();
            appInstance.turnToPage('/pages/firm_order/index');
        }
    },
    /**
     * 选择所有
     */
    clickSelectAll: function(){
        var alreadySelect = this.data.selectAll,
            list = this.data.goodsList;

        if(alreadySelect){
            for (var i = list.length - 1; i >= 0; i--) {
                list[i].selected = false;
            }
        } else {
            for (var i = list.length - 1; i >= 0; i--) {
                list[i].selected = true;
            }
        }
        this.setData({
            selectAll: !alreadySelect,
            goodsList: list,
            selectedNum: alreadySelect ? 0:list.length
        });
        this.recalculateCountPrice();
    },
    /**
     * 选择
     * @param e
     */
    clickSelectGoods: function(e){
        var index = e.currentTarget.dataset.index,
            list = this.data.goodsList,
            selectAll = true,selectedNum=0;

        list[index].selected = !list[index].selected;
        for (var i = 0;i < list.length; i++) {
            if(!list[i].selected){
                selectAll = false;
                break;
            }else{
                console.log(1);
                selectedNum++;
            }

        }
        this.setData({
            goodsList: list,
            selectAll: selectAll,
            selectedNum: selectedNum

        });
        this.recalculateCountPrice();
    },
    /**
     * 计算数量价格
     */
    recalculateCountPrice: function(){
        var list = this.data.goodsList,
            totalCount = 0,
            price = 0;

        for (var i = list.length - 1; i >= 0; i--) {
            var good = list[i];
            if(good.selected){
                totalCount += +good.good_num;
                price += +good.good_price * +good.good_num;
            }
        }

        this.setData({
            goodsCountToPay: totalCount,
            priceToPay: price.toFixed(2)
        })
    },
    deleteGoods:function(){
        this.handleGoods('delete');
    },
    removeFav:function(){
        this.handleGoods('fav');
    },
    handleGoods: function(type){
        var goodIds = [],self = this,goodList = this.data.goodsList;
        if(this.data.editing){
            return;
        }

        for(let i in goodList){
            if(goodList[i].selected){
                goodIds.push(goodList[i].id);
            }
        }

        if(!goodIds.length) { return; }

        appInstance.sendRequest({
            url : config.cartUrl,
            method: 'post',
            data: {
                type:type,
                action:'batch',
                goodIds:goodIds
            },
            success: function(res){
                if(res.data.status == 'success'){
                    self.reset();
                    self.getShoppingCartData();
                }else{
                    appInstance.showToast({
                        title:res.data.msg
                    });
                }

            }
        });
    },
    /**
     * 减数量事件
     *
     * @param e
     */
    clickMinusButton: function(e){
        var index = e.currentTarget.dataset.index,goodsList = this.data.goodsList,
            num = goodsList[index].good_num,

            self = this;
        if(num-1 <= 0){
            appInstance.showModal({
                content: '确定从购物车删除该商品？',
                showCancel: true,
                confirm: function () {
                    self.changeGoodsNum(index, 'minus');
                    Util.array_remove(goodsList,index);
                    self.setData({goodsList:goodsList});
                }
            });
            return;
        }
        this.changeGoodsNum(index, 'minus');
    },
    clickPlusButton: function(e){
        var index = e.currentTarget.dataset.index;
        this.changeGoodsNum(index, 'plus');
    },
    /**
     * 改变数量
     *
     * @param index
     * @param type
     */
    changeGoodsNum:function(index,type){
        var good = this.data.goodsList[index],currentNum = +good.good_num,editData = this.data.editData,
            targetNum = type == 'plus' ? currentNum + 1 : currentNum - 1,data={};
        data['goodsList['+index+'].good_num'] = targetNum;
        var inEdit = false;
        for(var i in editData){
            if(editData[i].goodId == good.id){
                editData[i].num = targetNum;
                inEdit = true;
            }
        }
        data['editData'] = !inEdit ? editData.concat({goodId:good.id,num:targetNum}):editData;
        this.setData(data);
        this.recalculateCountPrice();
    },
	onHide:function(){
	},
    getShoppingCartData: function(){
        var self  = this;
        appInstance.sendRequest({
            url: config.cartUrl,
            data:{
                action:'list',
                page:1,
                pageSize:100
            },
            success:function(res){
                self.setData({                   
                    goodsList: res.data,					
                });
            }
        });
    }
});
