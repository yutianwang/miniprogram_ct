var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    orderInfo: {},
    orderGoods: []

  },
  onLoad: function (options) {

    this.getOrderDetail();
  },
  getOrderDetail() {
    let that = this;
    // util.request(api.OrderDetail, {
    //   orderId: that.data.orderId
    // }).then(function (res) {
    //   if (res.errno === 0) {
    //     that.setData({
    //       orderInfo: res.data.orderInfo,
    //       orderGoods: res.data.orderGoods
    //     });
    //   }
    // });
  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {

 
  }
})