

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Nideshop-Token': wx.getStorageSync('token'),
        'Cookie': 'JSESSIONID=' + wx.getStorageSync('sessionid')
      },
      success: function (res) {
        console.log("success");
        if (res.statusCode == 200) {

          // if (res.data.errno == 401) {
          //   //需要登录后才可以操作
          //   wx.showModal({
          //       title: '',
          //       content: '请先登录',
          //       success: function (res){
          //           if (res.confirm) {
          //               wx.switchTab({
          //                   url: '/pages/ucenter/index/index'
          //               });
          //           }else {
          //             wx.switchTab({
          //                   url: '/pages/index/index'
          //             });
          //           }
          //       }
          //   });
          // } else 
          {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
  });
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  });
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //登录远程服务器
          console.log(res)
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

function showWarnModal(msg){
  wx.showModal({
    title: '提示',
    content: msg,
    showCancel:false,
    success(res) {
      if (res.confirm) {
       
      } else if (res.cancel) {
       
      }
    }
  })
}
function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}

function showSuccessToast(msg) {
  wx.showToast({
    title: msg,
  })
}

function showLoading(message) {
  if (wx.showLoading) {
    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.showLoading({
      title: message,
      mask: true
    });
  } else {
    // 低版本采用Toast兼容处理并将时间设为20秒以免自动消失
    wx.showToast({
      title: message,
      icon: 'loading',
      mask: true,
      duration: 20000
    });
  }
}
 
function hideLoading() {
  if (wx.hideLoading) {
    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.hideLoading();
  } else {
    wx.hideToast();
  }
}


module.exports = {
  formatTime,
  request,
  redirect,
  showErrorToast,
  showSuccessToast,
  checkSession,
  login,
  showLoading,
  hideLoading,
  showWarnModal,
}


