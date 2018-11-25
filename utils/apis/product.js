const appInstance = getApp()


function getProducts(resolve) {
    appInstance.request({
        success:resolve,
        fail:function(){}
    })
}


function getProduct(id, resolve) {

}

module.exports = {
    getProducts (resolve) {
        return getProducts(resolve)
    }
}