const config = require('../../config');
const appInstance = getApp();


Page({
    /**
     * 页面的初始数据
     */
    data: {
        showResult: false, //搜索结果展示
        itemStyle: 1, //商品列表显示方式 单列显示 1  双列显示 2
        tab: 0,
        direction: 0,
        prevPage: 0,
        pageData: {},
        itemsList: [],
        history: [],
        inputContent: '',
        filterParam: {
            form: 'goods',
            page: 1,
            pageSize: 10,
            sortKey: '',
            sortDirection: '',
            is_integral: '',
            searchValue: '',
            region_id: ''
        },
        filter: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {			
        this.data.filterParam.form = options.form;
        this.setData(options);			
        var _this = this;
        wx.getStorage({
            key: 'history',
            success: function (res) {
                _this.setData({ history: res.data });
            }
        })
        this.initialData();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (this.data.options.param) {
            this.data.filterParam.search_value = '';
            this.initialData();
            this.filterList();
        }
    },

    /**
     * 生命周期函数--监听页面销毁
     */
    onUnload: function () {
        this.setData({options:{}})
    },

    /**
     * 初始化过滤参数
     */
    initFilter: function () {
        this.setData({ tab: 0, prevPage: 0 });
        this.data.filterParam.page = 1;
        this.data.filterParam.sortKey = '';
        this.data.filterParam.sortDirection = '';
        this.data.filterParam.region_id = '';
        this.setData({ currentCategory: '', currentLocation: '' });
    },

    /**
     * 搜索方法
     */
    searchList: function () {
        this.initFilter();
        this.data.filterParam.searchValue = this.data.inputContent;
        this.data.filterParam.page = 1;
        if (this.data.inputContent === '') { return };
        this.initialData();

        let history = this.data.history;
        history.push(this.data.inputContent);
        this.setData({ history: history });
        wx.setStorage({
            key: "history",
            data: history
        })
    },

    /**
     * 快速搜索方法
     */
    quickSearch: function (e) {
        this.initFilter();
        this.data.filterParam.search_value = e.target.dataset.tag;
        this.data.filterParam.page = 1;
        this.setData({ inputContent: e.target.dataset.tag })
        this.initialData();
    },

    /**
     * 初始化数据
     */
    initialData: function () {        
        this.data.filterParam.page = 1;
        this.setData({ prevPage: 0 });
        this.setData({ showResult: true, itemsList: [] });
        this.getProductList();		
		
    },

    /**
     * 获取产品
     *
     * @param param
     */
    getProductList:function(param){
        var self = this;
        param = param || {};

        appInstance.sendRequest({
            url: config.searchUrl,
            method: 'post',
            data: this.data.filterParam,
            success: function (res) {
                var list = res.data.list;
                if(param.scollLoaded){
                    list = self.data.itemsList.concat(list);
                }
                self.setData({ itemsList: list });
                self.setData({ pageData: pageData });
            }
        })
    },
    /**
     * 加载更多数据
     */
    getMoreItems: function (e) {
        let _this = this;
        let curPage = e.target.dataset.curpage;

        if (this.data.prevPage != curPage && this.data.pageData.is_more != 0) {
            _this.data.filterParam.page = _this.data.filterParam.page + 1;
            this.setData({ prevPage: curPage });

            this.getProductList({scollLoaded:true});
        };
    },

    /**
     * 默认排序 tab = 0
     */
    sortByDefault: function (e) {
        this.data.filterParam.sortKey = '';
        this.data.filterParam.sortDirection = 0;
        if (this.data.tab == 0) { return };
        this.initialData();
        this.setData({ tab: 0 });
    },

    /**
     * 按销量排序 tab = 1
     */
    sortBySales: function () {
        this.data.filterParam.sortKey = 'sales_sum';
        this.data.filterParam.sortDirection = 0;
        if (this.data.tab == 1) { return };
        this.initialData();
        this.setData({ tab: 1 });
    },

    /**
     * 按价格排序 tab = 2
     */
    sortByPrice: function (e) {
        let direction = e.currentTarget.dataset.direction;

        this.data.filterParam.sortKey = 'current_price';
        this.data.filterParam.sortDirection = direction;
        this.initialData();
        if (direction == 0) { direction = 1 } else { direction = 0 };
        this.setData({ tab: 2, direction: direction });
    },

    /**
     * 切换显示模式
     */
    switchStyle: function (e) {
        let type = e.currentTarget.dataset.type;
        if (type == 1) { this.setData({ itemStyle: 2 }) } else { this.setData({ itemStyle: 1 }) };
    },

    /**
     * 获取搜索关键词
     */
    bindChange: function (e) {
        this.setData({ inputContent: e.detail.value });
    },

    /**
     * 清空搜索框内容
     */
    clearSearch: function () {
        this.setData({ inputContent: '' });
        this.setData({ showResult: false });
    },

    /**
     * 清空历史搜索记录
     */
    clearHistory: function () {
        let _this = this;
        wx.removeStorage({
            key: 'history',
            success: function (res) {
                _this.setData({ history: [] });
            }
        })
    },

    /**
     * 跳转到详情页
     */
    turnToDetail: function (e) {
        let id = e.currentTarget.dataset.id;
        appInstance.turnToPage('/pages/detail/index?id=' + id);
    },

    /**
     * 返回前一页
     */
    navigateBack: function () {
        wx.navigateBack({
            delta: 1
        })
    },
    /**
     * 确定按照过滤条件搜索
     */
    confirmFilter: function (e) {
        this.initialData();
        this.hideFilter();
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

});