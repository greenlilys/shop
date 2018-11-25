const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const extend = function extend(target) {
    var sources = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < sources.length; i += 1) {
        var source = sources[i];
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    }

    return target;
};

const array_remove = function(arr,from, to){
    var rest = arr.slice((to || from) + 1 || arr.length);
    arr.length = from < 0 ? arr.length + from : from;
    return arr.push.apply(arr, rest);
};


const ORDER_KEY = 'simple_ship_order_key';
var OrderInfo = {
    data:{
        type:'cart',
        goodIds:[],
        addressId:0,
        num:0,//立急使用
    },
    get: function() {
        return wx.getStorageSync(ORDER_KEY) || null;
    },
    save: function () {
        wx.setStorageSync(ORDER_KEY, this.data);
    },
    clear: function () {
        wx.removeStorageSync(ORDER_KEY);
    },
    setData:function(data) {
        this.data = extend(this.data,data);
    }
};


module.exports = {
    formatTime: formatTime,
    OrderInfo:OrderInfo,
    extend:extend,
    array_remove:array_remove,
};
