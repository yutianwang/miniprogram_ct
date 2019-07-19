var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    ticket_number:'',
    ticket_secret:''
  },
  bindinputNumber:function(event){
    var ticket_number_value = event.detail.value;
    this.setData({
      ticket_number: ticket_number_value,
    });
  }, 
  bindinputSecret: function (event) {
    var ticket_secret_value = event.detail.value;
    this.setData({
      ticket_secret: ticket_secret_value,
    });
  }, 
  exchange:function(){
    if (this.data.ticket_number == '') {
      util.showWarnModal('卡券编号为空');
      return false;
    }
    if (this.data.ticket_number.length !=10) {
      util.showWarnModal('卡券编号长度不正确');
      return false;
    }
    if (this.data.ticket_secret == '') {
      util.showWarnModal('卡券密码为空');
      return false;
    }
    if (this.data.ticket_secret.length !=6) {
      util.showWarnModal('卡券密码长度不正确');
      return false;
    }
    let that = this;
    wx.navigateTo({
      url: '../exchange/exchange',
    })
    // util.request(api.commitTicketNumberAndSecret, {
    // }, 'POST').then(function (res) {
    //   wx.hideLoading();
    //   if (res.errno != 0) {
    //     util.showErrorToast(res.info);
    //     return false;
    //   }
    // }); 
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
})
