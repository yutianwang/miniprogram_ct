// //app.js
// App({
//   onLaunch: function () {
//     // 展示本地存储能力
//     var logs = wx.getStorageSync('logs') || []
//     logs.unshift(Date.now())
//     wx.setStorageSync('logs', logs)

//     // 登录
//     wx.login({
//       success: res => {
//         // 发送 res.code 到后台换取 openId, sessionKey, unionId
//       }
//     })
//     // 获取用户信息
//     wx.getSetting({
//       success: res => {
//         if (res.authSetting['scope.userInfo']) {
//           // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//           wx.getUserInfo({
//             success: res => {
//               // 可以将 res 发送给后台解码出 unionId
//               this.globalData.userInfo = res.userInfo

//               // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//               // 所以此处加入 callback 以防止这种情况
//               if (this.userInfoReadyCallback) {
//                 this.userInfoReadyCallback(res)
//               }
//             }
//           })
//         }
//       }
//     })
//   },
//   globalData: {
//     userInfo: null
//   }
// })


var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./services/user.js');
App({
  onLaunch: function (options) {
    //获取用户的登录信息
    user.checkLogin().then(res => {
      this.globalData.userInfo = wx.getStorageSync('userInfo');
      this.globalData.token = wx.getStorageSync('token');
    }).catch(() => {
    });
    if (!wx.getStorageSync('sessionid')) {
      var that = this;
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: api.login,
              data: {
                code: res.code,
              },
              success: function (res) {
                wx.setStorageSync('sessionid', res.data.sessionid);
                that.globalData.sessionid = res.data.sessionid;
              }
            })
          } else {
            wx.request({
              url: api.login,
              data: {
                code: res.code,
                
              },
              success: function (res) {
                wx.setStorageSync('sessionid', res.data.sessionid);
                that.globalData.sessionid = res.data.sessionid;
              }
            })
          }
        }
      });
    } else {
      var that = this;
      wx.request({
        url: api.checkSession,
        data: {
          sessionid: wx.getStorageSync('sessionid')
        },
        success: function (res) {
          if (res.data != 0) {
            that.globalData.sessionid = wx.getStorageSync('sessionid');
          } else {
            wx.login({
              success: function (res) {
                if (res.code) {
                  //发起网络请求
                  wx.request({
                    url: api.login,
                    data: {
                      code: res.code,
                     
                    },
                    success: function (res) {
                      wx.setStorageSync('sessionid', res.data.sessionid);
                      that.globalData.sessionid = res.data.sessionid;
                    }
                  })
                } else {
                  wx.request({
                    url: api.login,
                    data: {
                      code: res.code,
                     
                    },
                    success: function (res) {
                      wx.setStorageSync('sessionid', res.data.sessionid);
                      that.globalData.sessionid = res.data.sessionid;
                    }
                  })
                }
              }
            });
          }
        }
      })

    }
  },
  globalData: {
    userInfo: {
      nickName: 'Hi,游客',
      userName: '点击去登录',
      avatarUrl: 'http://p9kyr79ne.bkt.clouddn.com/1/20180531/150547696d798c.png'
    },
    token: '',
    sessionid: '',
  }

})