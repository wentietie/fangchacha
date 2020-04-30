// lib/pages/web.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindmessage:'bindmessage',
    bindload:'bindload',
    binderror:'binderror',
    url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = options.url || '';
    this.setData({url:url});
  },
  bindmessage:function(e){
  },
  bindload: function (e) {
  },
  binderror: function (e) {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})