// weixinmao_house/pages/index/report/report.js
var f = getApp()
var util = require('../../../../lib/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    depList:[],
    deparIndex:0,
    date: '请选择日期',
    time: '请选择时间',
    startDate:'2020-05-01',
  },

  getDepart(){
    var that = this
    f.util.request({
      url: 'entry/wxapp/Detail',
      success(res) {
        console.log(res.data)
        that.setData({
          depList: res.data.data.company
        })
      }
    })
  },

  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange(e){
    this.setData({
      time: e.detail.value
    })
  },

  subForm(e){
    var that = this
    e.detail.value.house_id = this.data.depList[this.data.deparIndex].id
    for (let input in e.detail.value){
      if (e.detail.value[input] == ''){
        wx.showToast({
          title: '表单填写不完整',
          icon: 'none',
          duration: 1500
        })
        return
      }
    }
    f.util.request({
      url:'entry/wxapp/Reserve',
      data: e.detail.value,
      success(res){
        console.log(res.data.msg)
        wx.showToast({
          title: res.data.data.msg,
          icon:'none',
          duration:1500
        })
      }
    })
  },

  chooseDepar(e){
    console.log(e)
    this.setData({
      deparIndex: e.detail.value
    })
  },
  
  getCurTime(){
    var date = util.formatTime(new Date)
    // var curDate = date.getDate()
    // var curTime = date.getTime()
    console.log(date)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDepart()
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCurTime()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})