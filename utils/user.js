/**
 * 用户相关服务
 */

const util = require('../utils/util.js');
const api = require('../config/api.js');
var app = getApp();

/**
 * 调用微信登录
 */
function loginByWeixin(userInfo,sessionid) {
  let code = null;
  return new Promise(function (resolve, reject) {
    return util.login().then((res) => {
      code = res.code;
      return userInfo;
    }).then((userInfo) => {
      wx.getUserInfo({
        success: function (res) {
          console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
          util.request(api.AuthLoginByWeixin, { code: code, userInfo: userInfo, sessionid: sessionid, encryptedData: res.encryptedData, iv: res.iv }, 'POST').then(res => {
            if (res.errno === 0) {
              //存储用户信息
              wx.setStorageSync('userInfo', res.data.userInfo);
              wx.setStorageSync('token', res.data.token);
              wx.setStorageSync('isExistsMemberByUnionid', res.data.isExistsMemberByUnionid);
              resolve(res);
            } else {
              util.showErrorToast(res.errmsg)
              reject(res);
            }
          })
        }});
      //登录远程服务器
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      util.checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });

    } else {
      reject(false);
    }
  });
}


module.exports = {
  loginByWeixin,
  checkLogin,
};











