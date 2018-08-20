// pages/cal/cal.js
var rpn = require("../../utils/rpn.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id1: "clear",
    id2: "back",
    id3: "history",
    id4: "/",
    id5: 7,
    id6: 8,
    id7: 9,
    id8: "*",
    id9: 4,
    id10: 5,
    id11: 6,
    id12: "-",
    id13: 1,
    id14: 2,
    id15: 3,
    id16: "+",
    id17: 0,
    id18: ".",
    id19: "=",

    result: "0",
    dotSign: false
  },
  /*单击按钮输入数据*/
  clickButton: function(e) {
    // 获取点击时id的值
    var btnValue = e.target.id;
    // 获取result默认值
    var res = this.data.result;
    // 获取标识符
    var newDotSign = this.data.dotSign;
    // 判断按钮的值
    if (btnValue >= 0 && btnValue <= 9) {
      var num = btnValue;
      //判断页面显示的值
      if (res == "0" || res == null || res.startsWith("=")) {
        res = num;
      } else {
        res += num;
      }
    } else {
      // 判断小数点
      if (btnValue == ".") {
        if (res.charAt(res.length - 1) == "+" || res.charAt(res.length - 1) == "-" || res.charAt(res.length - 1) == "*" || res.charAt(res.length - 1) == "/") {
          return;
        }
        if (!newDotSign) {
          res += ".";
          newDotSign = true;
        }
        // 点击清除
      } else if (btnValue == "clear") {
        res = "0";
        newDotSign = false;
        // 点击回退
      } else if (btnValue == "back") {
        if (res.length > 2) {
          // substr(start,length)方法截取字符串
          // 123456
          // 12345
          // 1234
          res = res.substr(0, res.length - 1);
          // 使用index()方法判断小数点是否出现，未出现返回-1
          if (res.indexOf(".") == -1) {
            newDotSign = false;
          }
        } else {
          res = "0";
        }

      } else if (btnValue == "+" || btnValue == "-" || btnValue == "*" || btnValue == "/") {
        newDotSign = false;
        var sign;
        switch (btnValue) {
          case "+":
            sign = "+";
            break;
          case "-":
            sign = "-";
            break;
          case "*":
            sign = "*";
            break;
          case "/":
            sign = "/";
            break;
        }
        // 使用charAt() 方法返回指定位置的值
        // isNaN() 函数用于检查其参数是否是非数字值。
        // 当尾部为数字时返回false，取反可以添加符号，否者不能添加
        if (!isNaN(res.charAt(res.length - 1)))
          res += sign;
      }
      // 当头部为“=”时
      if (res.charAt(0) == "=") {
        res = res.substr(1, res.length);
      }
    }
    this.setData({
      result: res,
      dotSign: newDotSign
    });
  },

  equals: function() {
    var res = this.data.result;
    var newDotSign = true;
    console.log(newDotSign);
    res = rpn.calculate(res);

    this.setData({
      result: "=" + res,
      dotSign: newDotSign
    });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})