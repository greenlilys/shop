const config = require('../../config');
const appInstance = getApp();

Page({
	data: {
		name: "请填写您的姓名",
		tel: "请填写您的联系方式",
		region:[],
		door: "街道门牌信息",
        isDefault: false,
        addressId:null,
	},
    onLoad:function(options){
        this.setData(options);
        this.getAddressInfo();
    },
	/**地址选择器事件 */
	bindRegionChange:function(e){		
		this.setData({
			region: e.detail.value
		})	
	},
	formSubmit: function (e) {		
		var warn = "";
		var self = this;
		var flag = false;
		if (e.detail.value.name == "") {
			warn = "请填写您的姓名！";
		} else if (e.detail.value.tel == "") {
			warn = "请填写您的手机号！";
		} else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.tel))) {
			warn = "手机号格式不正确";
		} else if (e.detail.value.addre == '0') {
			warn = "请选择您的所在区域";
		} else if (e.detail.value.door == "") {
			warn = "请输入您的具体地址";
		}
		else {
			flag = true;
            appInstance.sendRequest({
                url: config.myAddressUrl,
                method:'POST',
                data:{
                    action:'save',
                    formData:e.detail.value,
                    isDefault:self.data.isDefault,
                },
                success:function(res){
                    if(res.data.status == "success"){
                        appInstance.showToast({
                            title: "添加成功！",
                            icon: "success"
                        });
                        setTimeout(function(){
							 appInstance.turnToPage('/pages/myAddress/index');
                        },1000);

                    }
                }
            });
			
		}
		if (flag == false) {
			wx.showModal({
				title: '提示',
				content: warn
			})
		}

	},
    /**
     * 获取地址信息
     */
    getAddressInfo:function() {
        var self = this,addressId = this.data.addressId;
        if(addressId){
            appInstance.sendRequest({
                url:config.myAddressUrl,
                data:{
                    action:'get',
                    addressId:addressId
                },
                success:function(res){
                    if(res.data.status == 'success'){
                        var data = {addressId:addressId},result = res.data.result;
                        data.name = result.realname;
                        data.tel = result.mobile;
                        data.region = [result.province,result.city,result.area];
                        data.door = result.address;
                        data.isDefault = !!result.isdefault;
                        self.setData(data);
                        appInstance.setPageTitle("地址修改");
                    }
                }
            });
        }
    }

});