const appInstance = getApp();
Page({
	data:{
		windowHeight:"",
		windowWidth:"",
		shopList:[
			{
				img:"/images/shareimg/test.png",
				name:'手机',
				price:"100"
			},
			{
				img: "/images/shareimg/test.png",
				name: '手机',
				price: "100"
			},
			{
				img: "/images/shareimg/test.png",
				name: '手机',
				price: "100"
			},
			{
				img: "/images/shareimg/test.png",
				name: '手机',
				price: "100"
			}
		],
		titleList:["全部预售","男孩","女孩","春秋"],
		condition: ["销量从高到低", "价格从低到高", "价格从高到低","评价从高到低"],
		active:"active",
		check:"check",
		numIndex:'0',
		isShow:true,
		conIndex:"0"
	},
	onLoad:function(options){
		var self = this;
		wx.getSystemInfo({
			success: function (res) {
				self.setData({
					windowHeight: res.windowHeight,
					windowWidth: res.windowWidth
				});
				console.log(self.data)
			}
			
		});
	},
	clickChoose:function(e){
		console.log(e)
		var numIndex = e.currentTarget.dataset.index;
		this.setData({
			numIndex: numIndex
		})
	},
	popChoose:function(){
		var isShow = this.data.isShow;
		this.setData({
			isShow: !isShow
		})
	},
	chooseCondition:function(e){
		var conIndex = e.currentTarget.dataset.index;
		this.setData({
			conIndex: conIndex
		})
	},
	lower:function(){

	}
})