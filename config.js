/**
 * 小程序文件
 */

var host = 'https://www.icloudxcx.com';
var version = 'v1';
var debug = false;

var config = {
    host,
    version,
    debug,

    //首页信息
    homeInfoUrl:`${host}/mini/simple_shop/${version}/home`,

    guessLikeUrl:`${host}/mini/simple_shop/${version}/guess-like`,

    //用户中心数据
    userCenterInfo: `${host}/mini/simple_shop/${version}/user-center-info`,

    //用户基本信息
    userBaseInfo: `${host}/mini/simple_shop/${version}/user-base-info`,

    //用户记录历史
    userProductHistory: `${host}/mini/simple_shop/${version}/user-product-history`,
    userProductFavority: `${host}/mini/simple_shop/${version}/user-product-favority`,
    //产品详情
    productDetailUrl: `${host}/mini/simple_shop/${version}/product-info`,
    //订单列表
    orderListUrl:`${host}/mini/simple_shop/${version}/orders`,
    //
    cartUrl:`${host}/mini/simple_shop/${version}/cart`,
    //更新购物车数量
    updateCartUrl:`${host}/mini/simple_shop/${version}/cart-update`,
    //distributor
    distributorUrl:`${host}/mini/simple_shop/${version}/distributor`,
    //充值记录
    rechargeUrl:`${host}/mini/simple_shop/${version}/recharge`,
    //我的地址
    myAddressUrl:`${host}/mini/simple_shop/${version}/address`,

    //专区产品
    areaProductUrl:`${host}/mini/simple_shop/${version}/product-area`,

    //搜索产品
    searchUrl:`${host}/mini/simple_shop/${version}/search`,

    //分类
    cateUrl:`${host}/mini/simple_shop/${version}/cates`,

    //确认订单
    confirmOrderUrl:`${host}/mini/simple_shop/${version}/confirm-order`,
    submitOrderUrl:`${host}/mini/simple_shop/${version}/submit-order`,

    //支付结果
    paymentResultUrl:`${host}/mini/simple_shop/${version}/payment-result`,

    //充值
    submitRechargeUrl:`${host}/mini/simple_shop/${version}/submit-recharge`,


    //应用信息
    appInfoUrl: `${host}/${version}/mini/appInfo`,



    //登录地址，用于建立会话
    loginUrl: `${host}/mini/userLogin`,

    //门店列表
    storeListUrl: `${host}/${version}/mini/mendian/storeList`,

    //用户和门店信息
    userDianInfoUrl: `${host}/${version}/mini/mendian/userDianInfo`,


    //获取卡设置信息
    cardSettingUrl: `${host}/${version}/mini/mendian/cardSettingInfo`,

    //开卡
    cardOpenUrl: `${host}/${version}/mini/mendian/openCard`,

    //我的卡巻
    myCouponUrl: `${host}/${version}/mini/mendian/myCoupon`,

    //商家巻
    couponUrl: `${host}/${version}/mini/mendian/coupons`,

	couponListUrl: `${host}/${version}/mini/mendian/couponList`,

	couponToMeUrl: `${host}/${version}/mini/mendian/couponToMe`,

    //领取一张卷
    getCouponUrl: `${host}/${version}/mini/mendian/getCoupon`,

    //卡数据
    cardInfoUrl: `${host}/${version}/mini/mendian/cardInfo`,

    //充值
    cardRechargeUrl: `${host}/${version}/mini/mendian/cardRecharge`,

    //充值记录
    rechargeListUrl:`${host}/${version}/mini/mendian/rechargeList`,



    //卡
    cardShowUrl: `${host}/${version}/mini/mendian/cardShow`,

    //scanCode
    scanCodeUrl: `${host}/${version}/mini/mendian/scanCode`,

    //支付获取用户信息
    getPayInfoUrl: `${host}/${version}/mini/mendian/payInfo`,

    //处理支付
    postPayUrl: `${host}/${version}/mini/mendian/payHandler`,

    //去支付
    goPayUrl: `${host}/${version}/mini/mendian/goPay`,



	//设置用户生日
	setMemberBirthdayUrl: `${host}/${version}/mini/mendian/setMemberBirthday`,
};
module.exports = config;
