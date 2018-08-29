// pages/postman/postman.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expressNum: null,
    expressInfo: null,
    msg: ""

  },
  /**
   * 获取文本数据
   */
  input: function(e) {
    // console.log(e);
    this.setData({
      expressNum: e.detail.value
    })
  },

  /**
   * 点击查询按钮事件
   */
  btnClick: function() {
    // 单号
    var Num = this.data.expressNum;
    var this2 = this;
    // 调用查询快递公司的方法
    app.getExpressFirm(Num, function(data) {
      // console.info(data);
      // 判断传入参数的值,为0时设置msg的值
      if (data == 0) {

        this2.setData({

          msg: "未查询到快递公司信息，请核对快递单号！！",
          expressInfo:null
        })
      } else {
        var Firm = data;
        // 调用查询快递信息的方法
        app.getExpressInfo(Firm, Num, function(data) {
          // console.log(data);
          if(data==0){
            this2.setData({
              msg: "抱歉，你的单号暂无物流记录！！",
              expressInfo: null
            })
          }if(data==1){
          this2.setData({
            msg: "",
            expressInfo: data
          })
          }
        })

      }
    });


    // // 
    // var Firm = this.data.expressFirm;
    // // 调用查询快递信息
    // app.getExpressInfo(Firm, Num, function(data) {
    //   console.log(data);
    //   this2.setData({
    //     expressInfo: data
    //   })
    // })
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