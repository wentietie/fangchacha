// weixinmao_house/pages/index/report/report.js
var f = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    depList:[],
    deparIndex:0,
    
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

  subForm(e){
    var that = this
    f.util.request({
      url:'entry/wxapp/Reserve',
      data: e.detail.value,
      success(res){
        console.log(res.data)
      }
    })
  },

  chooseDepar(e){
    console.log(e)
    this.setData({
      deparIndex: e.detail.value
    })
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