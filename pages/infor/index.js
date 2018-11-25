const appInstance = getApp();
Page({
	data: {
		items: [
			{ name: 'M', value: '男', checked: 'true' },
			{ name: 'W', value: '女', },
		],
		region: ['河南省','郑州市','二七区'],
		date: '2017-12-21',
		customItem: '全部',
		personData:{
			name:"",
			gender:"M",
			genders:[],
			birthday:"",
			mobNum:"",
			wxNum:"",
			address:""
		}
	},

	onLoad: function (options) {
	

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
		var personData = wx.getStorageSync('personData');
		if (personData)	{
			this.setData({
				personData: personData
			})
		} 
	},
	/**初始化数据 */
	loadPersonData: function () {
		var self = this;
		appInstance.sendRequest({
			url: '',
			data: {

			},
			success: function (res) {
				if (res.data.status == 'success') {
					self.setData({

					});
				}
			},
		});
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
		//离开页面时把个人资料数据发给数据库
		appInstance.sendRequest({
			url:'',
			data:{

			},
			method:'POST',
			success:function(){

			},
			fail:function(){

			}
		})
	},
	/**确认修改 把数据存在*/

	primary:function(){
		console.log(this.data.personData);
		try {
			wx.setStorageSync('personData', this.data.personData)
		} catch (e) {
			console.log(e)
		};
		app.showToast({
			title:"保存成功",
			duration:10000,
			icon:"success",
			success:function(){
				wx.navigateBack({
					url: '/pages/my/index',
				})
			}
		})
	},
	getName:function(e){		
		var name = e.detail.value;
		var personData = this.data.personData;
		personData.name = name;
		this.setData({
			personData:personData
		});		
	},
	getMobNum:function(e){
		console.log(e.detail.value);
		var mobNum = e.detail.value;
		var personData = this.data.personData;
		personData.mobNum = mobNum;
		this.setData({
			personData: personData
		})
	},
	getWxNum:function(e){
		console.log(e.detail.value);
		var wxNum = e.detail.value;
		var personData = this.data.personData;
		personData.wxNum = wxNum;
		this.setData({
			personData: personData
		})
	},
	/*获得当前设置生日数据*/
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
		var birthday = e.detail.value;
		var personData = this.data.personData;
		personData.birthday = birthday;
        this.setData({
			personData: personData
        })
    },
	/*获得当前设置地址数据*/
    bindRegionChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
		var address = e.detail.value;
		var personData = this.data.personData;
		personData.address = address;
        this.setData({
			personData: personData
        })
    },
	/*获得当前设置性别数据*/
	radioChange: function (e){
		//console.log(this.data.items);
		var gender = e.detail.value;
		var personData = this.data.personData;		
		personData.gender = gender;	
		var genders = [
			{ name: 'M', value: '男', },
			{ name: 'W', value: '女', },
		];
		if (e.detail.value == "M"){
			genders[0].checked = 'true';
			genders[1].checked = '';
		} else if (e.detail.value == "W"){
			genders[0].checked = '';
			genders[1].checked = 'true';
		};
		personData.genders = genders;
		this.setData({
			personData: personData			
		});	
		console.log(this.data.personData)	
	},
})
