var config = require('config');
var ywsapp = require('./vendor/sintall-wechat-app-clent-sdk/index');

App({
	globalData: {
		userInfo: null,
        tabBarPagePathArr:[
            "/pages/home/index",
            "/pages/order/index",
            "/pages/card/index",
            "/pages/my/index",
            "/pages/distributor/index"
        ],
		extConfig: null,
		appInfo: null,//应用的信息
		copyRight: ''//版权声明
	},

	onLaunch: function () {
        ywsapp.setLoginUrl(config.loginUrl);
	},
	showToast: function (param) {
		wx.showToast({
			title: param.title,
			icon: param.icon,
			image: param.image,
			duration: param.duration || 1500,
			success: function (res) {
				typeof param.success == 'function' && param.success(res);
			},
			fail: function (res) {
				typeof param.fail == 'function' && param.fail(res);
			},
			complete: function (res) {
				typeof param.complete == 'function' && param.complete(res);
			}
		})
	},
	/**
	 * 隐藏消信
	 */
	hideToast: function () {
		wx.hideToast()
	},
	showModal: function (param) {
		wx.showModal({
			title: param.title || '提示',
			content: param.content,
			showCancel: param.showCancel || false,
			cancelText: param.cancelText || '取消',
			cancelColor: param.cancelColor || '#000000',
			confirmText: param.confirmText || '确定',
			confirmColor: param.confirmColor || '#3CC51F',
			success: function (res) {
				if (res.confirm) {
					typeof param.confirm == 'function' && param.confirm(res)
				} else {
					typeof param.cancel == 'function' && param.cancel(res);
				}
			},
			fail: function (res) {
				typeof param.fail == 'function' && param.fail(res);
			},
			complete: function (res) {
				typeof param.complete == 'function' && param.complete(res);
			}
		})
	},
	sendRequest(params) {
		let self = this,
			data = params.data || {},
			header = params.header

		if (params.method) {
			if (params.method.toLowerCase() == 'post') {
				data = self.modifyPostParam(data);
				header = header || {
					'content-type': 'application/x-www-form-urlencoded;',
				}
			}
			params.method = params.method.toUpperCase()
		}
		ywsapp.request(params);
	},
	turnToPage: function (url, isRedirect) {
		var tabBarPagePathArr = this.getTabPagePathArr()
		// tabBar中的页面改用switchTab跳转
		if (tabBarPagePathArr.indexOf(url) != -1) {
			this.switchToTab(url, isRedirect)
			return
		}
		if (!isRedirect) {
			wx.navigateTo({
				url: url
			})
		} else {
			wx.redirectTo({
				url: url
			})
		}
	},
	shareAppMessage: function (options) {
		var self = this;
		return {
			title: options.title || this.getAppTitle() || "云微商智慧小店",
			desc: options.desc || this.getAppDescription() || '最好的应用小店',
			path: options.path,
			success: function () {

			}
		}
	},
	switchToTab: function (url, isRedirect) {
		if (!isRedirect) {
			wx.switchTab({
				url: url
			});
		} else {
			wx.switchTab({
				url: url,
				success: function (e) {
					var page = getCurrentPages().pop();
					if (page == undefined || page == null) return;
					page.onShow();
				}
			});
		}

	},
    getTabPagePathArr: function(){
        return this.globalData.tabBarPagePathArr
    },
	turnBack: function (options) {
		wx.navigateBack({
			delta: options ? (options.delta || 1) : 1
		});
	},
	/**
   * 设置页面标题
   *
   * @param title
   */
	setPageTitle: function (title) {
		wx.setNavigationBarTitle({
			title: title
		});
	},
	/**
	* 系统信息
	*
	*/
	getSystemInfo: function () {
		var that = this;
		wx.getSystemInfo({
			success: function (res) {
				that.systemInfo = res;
			}
		});
	},
	/**
	 * 修改post参数
	 *
	 * @param obj
	 */
	modifyPostParam: function (obj) {
		let query = '', i, name, value, fullSubName, subName, subValue, innerObj

		for (name in obj) {
			value = obj[name];

			if (value instanceof Array) {
				for (i = 0; i < value.length; ++i) {
					subValue = value[i];
					fullSubName = name + '[' + i + ']';
					innerObj = {};
					innerObj[fullSubName] = subValue;
					query += this.modifyPostParam(innerObj) + '&';
				}
			}
			else if (value instanceof Object) {
				for (subName in value) {
					subValue = value[subName];
					fullSubName = name + '[' + subName + ']';
					innerObj = {};
					innerObj[fullSubName] = subValue;
					query += this.modifyPostParam(innerObj) + '&';
				}
			}
			else if (value !== undefined && value !== null) {
				query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
			}
		}
		return query.length ? query.substr(0, query.length - 1) : query;
	},
	/**
   * 微信支付
   * @param params
   * https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-pay.html#wxrequestpaymentobject
   */
	wxPay: function (params) {
		var self = this;
		wx.requestPayment({
			'timeStamp': params.timeStamp,
			'nonceStr': params.nonceStr,
			'package': params.package,
			'signType': 'MD5',
			'paySign': params.paySign,
			success: function (res) {
				self.wxPaySuccess(params);
				typeof params.success == 'function' && params.success()
			},
			fail: function (res) {
				if (res.errMsg === 'requestPayment:fail cancel') {
                    res.errMsg = '未支付';
				}
				if (res.errMsg === 'requestPayment:fail') {
					res.errMsg = '支付失败';
				}
				self.wxPayFail(params, res.errMsg);
				typeof params.fail === 'function' && params.fail();
			},
			complete: function (res) {
				typeof params.complete == 'function' && params.complete(res);
			}
		})
	},
    /**
     * 微信支付功
     *
     * @param params
     */
	wxPaySuccess: function (params) {
        this.turnToPage('/pages/payment_result/index?orderId=' + params.orderId +'&type=' + params.type);
	},
    wxPayFail: function(params, errMsg){
        return this.turnToPage('/pages/payment_result/index?orderId=' + params.orderId +'&type=' + params.type);
    },
	/**
     * 设置剪板数据
     *
     * @param options
     */
	setClipboardData: function (options) {
		wx.setClipboardData({
			data: options.data || '',
			success: options.success,
			fail: options.fail,
			complete: options.complete
		})
	},
    /**
     * 获取剪板数据
     *
     * @param options
     */
	getClipboardData: function (options) {
		wx.getClipboardData({
			success: options.success,
			fail: options.fail,
			complete: options.complete
		})
	},
    /**
     * 扫码
     *
     * @param options
     */
	scanCode: function (options) {
		options = options || {};
		wx.scanCode({
			onlyFromCamera: options.onlyFromCamera || false,
			success: options.success,
			fail: options.fail,
			complete: options.complete
		})
	},
    /**
     * 当前应用页面
     *
     * @returns {*}
     */
	getAppCurrentPage: function () {
		var pages = getCurrentPages();
		return pages[pages.length - 1];
	},
	setExtConfig: function () {
		var self = this;

		if (wx.getExtConfig) {
			wx.getExtConfig({
				success: function (res) {
					console.log(res);
					self.globalData.extConfig = res.extConfig;
				}
			})
		} else {
			throw new Error('不支持');
		}
	},
    /**
     * 拨打电话
     */
	makePhoneCall: function (number, callback) {
		if (number.currentTarget) {
			var dataset = number.currentTarget.dataset;

			number = dataset.number;
		}
		wx.makePhoneCall({
			phoneNumber: number,
			success: callback
		})
	},
    /**
     * 获取地理位置
     *
     * @param options
     */
	getLocation: function (options) {
		wx.getLocation({
			type: 'wgs84',
			success: options.success,
			fail: options.fail
		})
	},
	shareAppMessage: function (options) {
		var self = this;
		return {
			title: options.title || this.getAppTitle() || "云微商智慧小店",
			desc: options.desc || this.getAppDescription() || '最好的应用小店',
			path: options.path,
			success: function () {

			}
		}
	},
	showShareMenu: function (options) {
		options = options || {};
		wx.showShareMenu({
			withShareTicket: options.withShareTicket || false,
			success: options.success,
			fail: options.fail,
			complete: options.complete
		});
	},
    /**
     * 图片preview
     *
     * @param options
     */
	previewImage: function (options) {
		wx.previewImage({
			current: options.current || '',
			urls: options.urls || [options.current]
		})
	},
	formatMoney: function ($value) {
		return parseFloat($value || 0).toFixed(2);
	},
	setApplicationCopyright: function (copyRight) {
		if (true) {
			wx.setStorage({
				key: 'copyRight',
				data: copyRight
			})
		} else {
			wx.setStorage({
				key: 'copyRight',
				data: '©云微商提供技术支持'
			})
		}

	},
})