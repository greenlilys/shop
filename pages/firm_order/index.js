const config = require('../../config');
const appInstance = getApp();
const Util = require("../../utils/util");

Page({
    data: {
        // input默认是1  
        num: 1,
        // 使用data数据对象设置样式名  
        minusStatus: 'disabled',
		user:{
			name:"王二小",
			phoneNumber:"13598096793"
		},
		shopName:'百果园',
        addressList:[],
        selectAddress:[],
        productList:[],
        productIds:'',//以`-`隔开的字符串
		leaveMessage:'',
        allMoney:'0.00',//应付价格
        allProductPrice:'0.00',
        allCount:0,
        optionId:0,//规格ID
        type:'cart',//bug,
        freight:'0.00',//运送费
    },
    onLoad: function(options){

    },
	onShow:function(){
        this.getFirmOrderInfo();
	},
    getFirmOrderInfo:function(){
        var self = this,data = Util.OrderInfo.get();
        appInstance.sendRequest({
            url: config.confirmOrderUrl,
            method:'post',
            data:data,
            success:function(res){
                if(res.data.status == 'success'){
                    self._handleAddress(data,res.data.addressList);
                    self._handleProducts(data,res.data.productList);
                }

            }
        });
    },
    /**
     * 处理地址
     * @param data
     * @param addressList
     * @returns {*}
     * @private
     */
    _handleAddress:function(data,addressList){
        var selectAddress;
        for(var i in addressList){
            if(data.addressId && (addressList[i].id ==  data.addressId)){
                selectAddress = addressList[i];
                break;
            }
            if(addressList[i].isdefault){
                selectAddress = addressList[i];
            }
        }
        if(!selectAddress && addressList.length){
            selectAddress = addressList[0];
        }
        if(selectAddress.id != data.addressId){
            Util.OrderInfo.setData({addressId:selectAddress.id});
            Util.OrderInfo.save();
        }
        this.setData({
            selectAddress:selectAddress,
            addressList: addressList,
        });
    },
    /**
     * 处理产品
     *
     * @param data
     * @private
     */
    _handleProducts:function(data,productList){
        var allPrice = 0,list=[],allCount=0;
        if(data.type == 'buy'){
            var product = productList[0],option;
            if(product.has_option && product.options.length) {
                if (!data.optionId) {
                    option = product.options[0];
                } else {
                    for (var j in product.options) {
                        if (product.options[j].id == data.optionId) {
                            option = product.options[j];
                        }
                    }
                }
            }
            allCount += data.num;
            list.push({
                title: product.good_name,
                specName: option ? option.title : '',
                price: allPrice += option ? option.product_price : product.current_price,
                thumb: option  && option.thumb ? option.thumb : product.original_img,
                num:data.num
            });

        }else if(data.type == 'cart'){
            for(var i in productList){
                allCount += productList[i].good_num;
                allPrice += productList[i].good_price * productList[i].good_num;
                list.push({
                    title:productList[i].good_name,
                    price:productList[i].good_price,
                    specName:productList[i].spec_key_name,
                    thumb:productList[i].img,
                    num:productList[i].good_num
                });
            }
        }

        this.setData({
            productList:list,
            allProductPrice:Number(allPrice).toFixed(2),
            allCount:allCount,
            allMoney:Number(allPrice +10).toFixed(2),
        });
    },
    /**
     * 提交订单
     */
    submitForm:function(){
        var self = this,cacheData = Util.OrderInfo.get();
        if(!!cacheData.addressId){
            appInstance.sendRequest({
                url:config.submitOrderUrl,
                method:'POST',
                data:{
                    leaveMessage:self.data.leaveMessage,
                    formData:cacheData
                },
                success:function(res){
                    if(res.data.status == "success"){
                        var orderId = res.data.orderId;
                        if(res.data.code == 'toPay'){
                            var params = res.data.payInfo;
                            params.success = function(){
                                Util.OrderInfo.clear();
                            };
                            params.orderId = orderId;
                            params.type = 'goods';
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
                'title':'地址信息未填写！'
            });
            return;
        }
    },
	/**留言 */
	leaveMessage:function(e){	
		var leaveMessage = e.detail.value;
		this.setData({
			leaveMessage: leaveMessage
		})
	},
    /* 点击减号 */
    bindMinus: function () {
        var num = this.data.num;
        // 如果大于1时，才可以减  
        if (num > 1) {
            num--;
        }
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 将数值与状态写回  
        this.setData({
            num: num,
            minusStatus: minusStatus
        });
    },
    /* 点击加号 */
    bindPlus: function () {
        var num = this.data.num;
        // 不作过多考虑自增1  
        num++;
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        var minusStatus = num < 1 ? 'disabled' : 'normal';
        // 将数值与状态写回  
        this.setData({
            num: num,
            minusStatus: minusStatus
        });
    },
    /* 输入框事件 */
    bindManual: function (e) {
        var num = e.detail.value;
        // 将数值与状态写回  
        this.setData({
            num: num
        });
    }
})  