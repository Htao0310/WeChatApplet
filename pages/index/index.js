//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    id1: "postman",
    id2: "cal",
    id3: "weather",
    id4: "making"
  },
  //事件处理函数
  /**
   * 点击view事件
   */

  clickView: function(e) {
    console.log(e);
    var btnValue = e.currentTarget.id;
    
    if (btnValue == "postman") {
      // 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
      wx.navigateTo({
        url: '../../pages/postman/postman'
      })
    } else if (btnValue == "cal") {
      wx.navigateTo({
        url: '../../pages/cal/cal'
      })
    } else if (btnValue == "weather") {
      wx.navigateTo({
        url: '../../pages/weather/weather'
      })
    } else if (btnValue == "making") {
      wx.navigateTo({
        url: '../../pages/index/index'
      })
    } 
  }
})