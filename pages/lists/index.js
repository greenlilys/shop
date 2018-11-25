const config = require('../../config');
const appInstance = getApp();
Page({
	data: {
		cateItems: [

		],
		curIndex: 0,//左则索引
        curCateId:null,
        leaf:false,
        currentItems:[]

	},
    onLoad:function(e){
        var self = this;
        //获取分类数据
        appInstance.sendRequest({
            url:config.cateUrl,
            success:function(res){
                self.setData({cateItems:res.data})
                self.handleData();
            }
        })
    },
	//事件处理函数  
	switchRightTab: function (e) {
		// 把点击到的某一项，设为当前index  
		this.setData({
			curIndex: parseInt(e.target.dataset.index),
            curCateId:null,
            leaf:false,
		});
        this.handleData();
	},
    handleData:function(){
        var allCateItems = this.data.cateItems,
            curIndex = this.data.curIndex,
            curCateId = this.data.curCateId,
            currentItems = this.data.currentItems;
        if(curCateId){
            for(let i = 0;i < currentItems.length;i++){
                if(currentItems[i].id == curCateId){
                    currentItems = currentItems[i].children ? currentItems[i].children: [];
                }
            }
        }else{
            console.log(allCateItems);
            currentItems = allCateItems[curIndex].children ? allCateItems[curIndex].children:[];
        }
        this.setData({currentItems:currentItems});
    },
    clickItem:function(e){
        var leaf = this.data.leaf,
            cateId = e.currentTarget.dataset.id;
        if(leaf){
			wx.navigateTo({
				url: '/pages/listsNext/index',
			})
        }else{
            this.setData({curCateId:cateId,leaf:true});
            this.handleData();
        }

    },
    back:function(e){
        this.setData({
            curCateId:null,
            leaf:false,
        });
        this.handleData();
    }

})  