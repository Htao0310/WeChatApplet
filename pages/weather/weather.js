// pages/weather/weather.js


const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}
const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowTemp: '20°C',
    nowWeather: '晴天',
    nowWeatherBackground: "",
    hourlyWeather: []
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    this.getNew();
  },
  getNew(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now', //仅为示例，并非真实的接口地址
      data: {
        city: '重庆市',
        y: ''
      },

      success: res => {
        console.log(res.data);
        let result = res.data.result;
        this.setNow(result);
        this.setHourlyWeather(result);

      },
      complete: () => {
        callback && callback();
      },
    
    })
  },
  setNow(result) {
    let temp = result.now.temp
    let weather = result.now.weather
    console.log(temp, weather);
    this.setData({
      nowTemp: temp + "℃",
      nowWeather: weatherMap[weather],
      nowWeatherBackground: "/images/images-weather/" + weather + "-bg.png"
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap[weather],
    })
  },
  setHourlyWeather(result) {
    let nowHour = new Date().getHours();
    let hourlyWeather = [];
    let forecast = result.forecast;
    for (let i = 0; i < 8; i += 1) {
      hourlyWeather.push({
        time: (i * 3 + nowHour) % 24 + "时",
        iconPath: "/images/images-weather/" + forecast[i].weather + "-icon.png",
        temp: forecast[i].temp + '°'
      })
    }
    hourlyWeather[0].time = "现在";
    this.setData({
      hourlyWeather
    })
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
    this.getNew(() => {
      wx.stopPullDownRefresh()
    })
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