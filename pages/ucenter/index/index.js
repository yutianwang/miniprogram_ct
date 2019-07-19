var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
var app = getApp();
Page({
    data: {
        userInfo: {},
        hasMobile: '',
        isAuthorized:true,
      isExistsMemberByUnionid:false,
    },
      onLoad: function (options) {
      let userInfo = wx.getStorageSync('userInfo');
      if (userInfo == null || userInfo==''){
        this.setData({
          isAuthorized:false
        })
      }
     
      let isExistsMemberByUnionid = wx.getStorageSync('isExistsMemberByUnionid');
      if (isExistsMemberByUnionid == 'true' || isExistsMemberByUnionid == true){
        this.setData({
          isExistsMemberByUnionid: true
        })
      }
    },
    onReady: function () {

    },
    onShow: function () {
      let isExistsMemberByUnionid = wx.getStorageSync('isExistsMemberByUnionid');
      if (isExistsMemberByUnionid == 'true' || isExistsMemberByUnionid == true) {
        this.setData({
          isExistsMemberByUnionid: true
        })
      }
        let userInfo = wx.getStorageSync('userInfo');
        let token = wx.getStorageSync('token');
        if (userInfo == null || userInfo == '') {
        this.setData({
          isAuthorized: false
        })
      }else {
          this.setData({
            isAuthorized: true
          })
      }

        // 页面显示
        if (userInfo && token) {
            app.globalData.userInfo = userInfo;
            app.globalData.token = token;
        }

        this.setData({
            userInfo: app.globalData.userInfo,
        });

    },
    onHide: function () {
        // 页面隐藏

    },
    onUnload: function () {
  

    },
  gomyexchange(){
     wx.navigateTo({
       url: '../../ucenter/myexchange/myexchange',
     })
  },
    bindGetUserInfo(e) {
      let userInfo = wx.getStorageSync('userInfo');
      let token = wx.getStorageSync('token');
      if (userInfo && token) {
        return;
      }
        if (e.detail.userInfo){
            //用户按了允许授权按钮
            user.loginByWeixin(e.detail,app.globalData.sessionid).then(res => {
                this.setData({
                    userInfo: res.data.userInfo,
                  isAuthorized:true
                });
                app.globalData.userInfo = res.data.userInfo;
                app.globalData.token = res.data.token;
              let isExistsMemberByUnionid = wx.getStorageSync('isExistsMemberByUnionid');
              if (isExistsMemberByUnionid == 'true' || isExistsMemberByUnionid == true) {
                this.setData({
                  isExistsMemberByUnionid: true
                })
              }
            }).catch((err) => {
             
            });
        } else {
            //用户按了拒绝按钮
          wx.switchTab({
            url: '../../index/index',
          })
        }
    },
    exitLogin: function () {
        wx.showModal({
            title: '',
            confirmColor: '#b4282d',
            content: '退出登录？',
            success: function (res) {
                if (res.confirm) {
                    wx.removeStorageSync('token');
                    wx.removeStorageSync('userInfo');
                    wx.switchTab({
                        url: '/pages/index/index'
                    });
                }
            }
        })
    },
    showTip: function () {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '您已绑定'
      });
      return false;
    }
})