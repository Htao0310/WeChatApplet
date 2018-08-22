//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 判断快递的公司
  getExpressFirm: function(num, cb) {
    wx.request({
      url: 'https://www.kuaidi100.com/autonumber/autoComNum?resultv2=1&text=' + num,
      success: function(res) {
        // console.info(res.data.auto=="");
        /* 判断是否查询到快递信息是否为空，为空时设置回传参数为0*/
        if (res.data.auto == "") {
          // 设置回传的参数为0
          cb(0);
        } else {
          // console.info(res.data.auto["0"].comCode);
          cb(res.data.auto["0"].comCode);
        }


      }
    })
  },
  //查询快递信息
  getExpressInfo: function(eFirm, num, fh) {
    wx.request({
      url: 'https://www.kuaidi100.com/query?type=' + eFirm + '&postid=' + num,
      success: function(res) {
        // debugger;
        console.log(res);
        fh(res.data);
      }
    })

  },

  globalData: {
    userInfo: null,

  }
})