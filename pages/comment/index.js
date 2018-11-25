// pages/comment/index.js
var config = require('../../config');
const appInstance = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		product: {
			name: "大樱桃",
			color: "红色",
			proType: "三斤装",
			orderNum: '1',
			price: '20',
			id:"007"
		
		},
		imgList: [],//上传图片路径
		lastImg: '',//剩余可上传图片数量
		showText:"",//星评论提示
		content:"",//评论内容
		starList: [
			{
				id: 0,
				img: "/images/comment/grayXing.png",
				showText:"凑合"
			},
			{
				id: 1,
				img: "/images/comment/grayXing.png",
				showText: "一般"
			},
			{
				id: 2,
				img: "/images/comment/grayXing.png",
				showText: "还行"
			},
			{
				id: 3,
				img: "/images/comment/grayXing.png",
				showText: "满意"
			},
			{
				id: 4,
				img: "/images/comment/grayXing.png",
				showText: "非常满意"
			}
		]

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},
	/**提交评论 */
	primary: function () {
		var self = this;
		var content = self.data.content;//评论内容
		var imgList = self.data.imgList;//晒图
		var showText = self.data.showText;//星星对应的文字提示
		var productId = self.data.product.id;//商品id
		appInstance.sendRequest({
			url:'',
			data:{

			},
			method:'POST',
			success:function(res){

			},
			fail:function(res){

			}
		})

	},
	/**点亮星星 */
	lightStar: function (e) {
		var self = this;
		console.log(e);
		var num = e.currentTarget.dataset.num;
		var starList = self.data.starList;
		if (starList[num].img == "/images/comment/grayXing.png") {
			for (var i = 0; i < starList.length; i++) {
				if (i <= num) {
					starList[i].img = "/images/comment/redXing.png"
				} else {
					starList[i].img = "/images/comment/grayXing.png"
				}
			};
			self.setData({				
				showText: starList[num].showText
			})


		} else {
			for (var i = 0; i < starList.length; i++) {
				if (i < num) {
					starList[i].img = "/images/comment/redXing.png"
				} else {
					starList[i].img = "/images/comment/grayXing.png"
				}
			};
			if(num > 0){
				self.setData({
					showText: starList[num - 1].showText
				})
			}else{
				self.setData({
					showText: ""
				})
			}
			

		};

		self.setData({
			starList: starList,			
		})

	},
/**评价内容 */
	getText:function(e){	
		var content = e.detail.value;
		this.setData({
			content: content
		})
	},
	/**上传图片*/
	inputImg:function(){
		var self = this;
		var imgList = self.data.imgList;	
		var numImg = 6 - imgList.length;	
		console.log(numImg)	;
		if (numImg == 0){
			appInstance.showToast({
				title:'最多可上传6张',
				icon:"loading"
			});
			return;
		};
		wx.chooseImage({
			count: numImg, 
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				
				var tempFilePaths = res.tempFilePaths;
				var nowImgList = imgList.concat(tempFilePaths);	
				self.setData({
					imgList: nowImgList,
					lastImg: 6 - nowImgList.length
				 	})					

			}
		})
	},
	deletImg:function(e){
		var self = this;
		var imgIndex = e.currentTarget.dataset.imgindex;
		var imgList = self.data.imgList;
		var lastImg = self.data.lastImg;
		appInstance.showModal({
			content:'确认要删除吗？',
			showCancel:true,
			confirm:function(res){
				console.log(res);
				imgList.splice(imgIndex, 1);
				lastImg++;
				self.setData({
					imgList: imgList,
					lastImg: lastImg
				});
			},
			cancel:function(res){
				console.log(res);
			},
			fail:function(res){

			}
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

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

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})